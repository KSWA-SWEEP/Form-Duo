package com.example.jpa_demo.service.auth;

import com.example.jpa_demo.domain.auth.MemberAuth;
import com.example.jpa_demo.domain.auth.Authority;
import com.example.jpa_demo.domain.auth.AuthorityRepository;
import com.example.jpa_demo.domain.members.Members;
import com.example.jpa_demo.domain.members.MemberRepository;
import com.example.jpa_demo.service.members.CustomUserDetailsService;
import com.example.jpa_demo.web.dto.jwt.TokenDTO;
import com.example.jpa_demo.web.dto.jwt.TokenReqDTO;
import com.example.jpa_demo.web.dto.login.LoginReqDTO;
import com.example.jpa_demo.web.dto.members.MemberReqDTO;
import com.example.jpa_demo.web.dto.members.MemberRespDTO;
import com.example.jpa_demo.util.exceptionhandler.AuthorityExceptionType;
import com.example.jpa_demo.util.exceptionhandler.BizException;
import com.example.jpa_demo.util.exceptionhandler.JwtExceptionType;
import com.example.jpa_demo.util.exceptionhandler.MemberExceptionType;
import com.example.jpa_demo.jwt.CustomEmailPasswordAuthToken;
import com.example.jpa_demo.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;
    private final AuthorityRepository authorityRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
//    private final RefreshTokenRepository refreshTokenRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final RedisService redisService;
    @Value("${jwt.refresh-token-expire-time}")
    private Long rtkLive;


    @Transactional
    public MemberRespDTO signup(MemberReqDTO memberRequestDto) {
        if (memberRepository.existsByEmail(memberRequestDto.getEmail())) {
            throw new BizException(MemberExceptionType.DUPLICATE_USER);
        }

        // DB 에서 ROLE_USER를 찾아서 권한으로 추가한다.
        Authority authority = authorityRepository
                .findByAuthorityName(MemberAuth.ROLE_USER).orElseThrow(()->new BizException(AuthorityExceptionType.NOT_FOUND_AUTHORITY));

        Set<Authority> set = new HashSet<>();
        set.add(authority);


        Members members = memberRequestDto.toMember(passwordEncoder,set);
        log.debug("member = {}", members);
        return MemberRespDTO.of(memberRepository.save(members));
    }

    @Transactional
    public TokenDTO login(LoginReqDTO loginReqDTO) {
        CustomEmailPasswordAuthToken customEmailPasswordAuthToken = new CustomEmailPasswordAuthToken(loginReqDTO.getEmail(),loginReqDTO.getPassword());
        Authentication authenticate = authenticationManager.authenticate(customEmailPasswordAuthToken);
        String email = authenticate.getName();
        Members members = customUserDetailsService.getMember(email);
//        System.out.println(email + members.toString());

        String accessToken = tokenProvider.createAccessToken(email, members.getAuthorities());
        String refreshToken = tokenProvider.createRefreshToken(email, members.getAuthorities());

//        System.out.println(accessToken);
//        System.out.println(refreshToken);

        //redis에 refresh token 저장
        redisService.setValues(email, refreshToken, Duration.ofMillis(rtkLive));
//        System.out.println("redis " + redisService.getValues(email));

        //mysql에 refresh token 저장
//        refreshTokenRepository.save(
//                RefreshToken.builder()
//                        .email(email)
//                        .value(refreshToken)
//                        .build()
//        );

        return tokenProvider.createTokenDTO(accessToken,refreshToken);

    }

    @Transactional
    public TokenDTO reissue(TokenReqDTO tokenRequestDto) {
        /*
         *  accessToken 은 JWT Filter 에서 검증되고 옴
         * */
        String originAccessToken = tokenRequestDto.getAccessToken();
        String originRefreshToken = tokenRequestDto.getRefreshToken();

        // refreshToken 검증
        int refreshTokenFlag = tokenProvider.validateToken(originRefreshToken);

        log.debug("refreshTokenFlag = {}", refreshTokenFlag);

        //refreshToken 검증하고 상황에 맞는 오류를 내보낸다.
        if (refreshTokenFlag == -1) {
            throw new BizException(JwtExceptionType.BAD_TOKEN); // 잘못된 리프레시 토큰
        } else if (refreshTokenFlag == 2) {
            throw new BizException(JwtExceptionType.REFRESH_TOKEN_EXPIRED); // 유효기간 끝난 토큰
        }

        // 2. Access Token 에서 Member Email 가져오기
        Authentication authentication = tokenProvider.getAuthentication(originAccessToken);

        log.debug("Authentication = {}",authentication);

//        // 3. 저장소에서 Member Email 를 기반으로 Refresh Token 값 가져옴
//        RefreshToken refreshToken = refreshTokenRepository.findByEmail(authentication.getName())
//                .orElseThrow(() -> new BizException(MemberExceptionType.LOGOUT_MEMBER)); // 로그 아웃된 사용자

        // Redis에서 mail기반으로 refresh token을 가져옴.
        String rtkInRedis = redisService.getValues(authentication.getName());

        if (!rtkInRedis.equals(originRefreshToken)) {
            throw new BizException(JwtExceptionType.BAD_TOKEN); // 토큰이 일치하지 않습니다.
        }

//        // 4. Refresh Token 일치하는지 검사
//        if (!refreshToken.getValue().equals(originRefreshToken)) {
//            throw new BizException(JwtExceptionType.BAD_TOKEN); // 토큰이 일치하지 않습니다.
//        }

        // 5. 새로운 토큰 생성
        String email = tokenProvider.getMemberEmailByToken(originAccessToken);
        Members members = customUserDetailsService.getMember(email);

        String newAccessToken = tokenProvider.createAccessToken(email, members.getAuthorities());
        String newRefreshToken = tokenProvider.createRefreshToken(email, members.getAuthorities());
        TokenDTO tokenDto = tokenProvider.createTokenDTO(newAccessToken, newRefreshToken);

        log.debug("refresh Origin = {}",originRefreshToken);
        log.debug("refresh New = {} ",newRefreshToken);

        // 6. Redis 정보 업데이트
        redisService.setValues(email, newRefreshToken, Duration.ofMillis(rtkLive));

//        System.out.println(redisService.getValues(email));
//        System.out.println(newRefreshToken);
//
//        // 6. 저장소 정보 업데이트 (dirtyChecking으로 업데이트)
//        refreshToken.updateValue(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }
}
