package com.example.jpa_demo.web.controller;

import com.example.jpa_demo.web.dto.jwt.TokenDTO;
import com.example.jpa_demo.web.dto.jwt.TokenReqDTO;
import com.example.jpa_demo.web.dto.login.LoginReqDTO;
import com.example.jpa_demo.web.dto.members.MemberReqDTO;
import com.example.jpa_demo.web.dto.members.MemberRespDTO;
import com.example.jpa_demo.service.auth.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
/**
 * AuthController 설명 : auth controller
 * @author jowonjun
 * @version 1.0.0
 * 작성일 : 2022/02/14
 **/
@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthApisController {

    private final AuthService authService;

    @PostMapping("/signup")
    public MemberRespDTO signup(@RequestBody MemberReqDTO memberRequestDto) {
        log.debug("memberRequestDto = {}",memberRequestDto);
        return authService.signup(memberRequestDto);
    }

    @PostMapping("/login")
    public TokenDTO login(@RequestBody LoginReqDTO loginReqDTO) {
        return authService.login(loginReqDTO);
    }

    //로그아웃 만들기

    @PostMapping("/reissue")
    public TokenDTO reissue(@RequestBody TokenReqDTO tokenRequestDto) {
        return authService.reissue(tokenRequestDto);
    }
}
