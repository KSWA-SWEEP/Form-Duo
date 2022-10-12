package com.example.jpa_demo.config;

import com.example.jpa_demo.util.exceptionhandler.JwtAccessDeniedHandler;
import com.example.jpa_demo.util.exceptionhandler.JwtAuthenticationEntryPoint;
import com.example.jpa_demo.jwt.CustomEmailPasswordAuthProvider;
import com.example.jpa_demo.jwt.JwtFilter;
import com.example.jpa_demo.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


@EnableWebSecurity // 기본적인 웹보안을 사용하겠다는 것
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true) // @PreAuthorize 사용을 위함
public class SecurityConfig { // WebSecurityConfigurerAdapter 를 확장하면 보안 관련된 설정을 커스터마이징 할 수 있음
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final CustomEmailPasswordAuthProvider customEmailPasswordAuthProvider;


    /*
     * AuthenticationManager를 주입받기 위해서 빈으로 등록한다.
     * */
    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }


//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.authenticationProvider(customEmailPasswordAuthProvider);
//    }

    //    @Bean
//    public AuthenticationManagerBuilder
    // h2 database 테스트가 원활하도록 관련 API 들은 전부 무시
//    @Override
//    public void configure(WebSecurity web) {
//        web.ignoring()
//                .antMatchers("/api/v1/auth/**", "/swagger-ui/**", "/api-docs/**", "/favicon.ico");
////    }


    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/api/v1/auth/**", "/swagger-ui/**", "/api-docs/**");
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3001"));
//        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
//        configuration.setAllowCredentials(true);
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.cors();
//        // CSRF 설정 Disable
//        http.csrf().disable()
//
//                // exception handling 할 때 우리가 만든 클래스를 추가
//                .exceptionHandling()
//                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
//                .accessDeniedHandler(jwtAccessDeniedHandler)
//
//                /* iframe 관련 설정이고 X-frame-Options Click Jaking 공격을 기본적으로 막는걸로 설정되어있는데
//                 이를 풀기위한 설정을 하려면 아래의 설정을 추가하면 됨 */
////                .and()
////                 .headers()
////                 .frameOptions()
////                 .sameOrigin()
//
//                // 시큐리티는 기본적으로 세션을 사용
//                // 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//
//                // 로그인, 회원가입 API 는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll 설정
//                .and()
//                .authorizeRequests() // http servletRequest 를 사용하는 요청들에 대한 접근제한을 설정
////                .antMatchers("").permitAll()
//                .antMatchers( "/api-docs/**", "/swagger-ui/**").permitAll() // swagger3
//
//                .anyRequest().authenticated()   // 나머지 API 는 전부 인증 필요
//
//                // JwtFilter 를 등록한다.
//                // UsernamePasswordAuthenticationFilter 앞에 등록하는 이유는 딱히 없지만
//                // SecurityContext를 사용하기 때문에 앞단의 필터에서 SecurityContext가 설정되고 난뒤 필터를 둔다.
//                .and()
//                .addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .authorizeRequests()
                .antMatchers("/api/v1/auth/**").permitAll()
                .anyRequest().authenticated()

                .and()
                .formLogin()
                .disable()
                .csrf()
                .disable()
                .cors()
//                .disable()

                .and()
                .headers()
                .disable()
                .httpBasic()
                .disable()
                .rememberMe()
                .disable()
                .logout()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)


                .and()
                .addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(customEmailPasswordAuthProvider);

        return http.build();
    }
}
