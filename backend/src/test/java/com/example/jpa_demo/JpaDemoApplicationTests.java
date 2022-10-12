package com.example.jpa_demo;

import com.example.jpa_demo.domain.auth.MemberAuth;
import com.example.jpa_demo.domain.auth.Authority;
import com.example.jpa_demo.domain.auth.AuthorityRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JpaDemoApplicationTests {

    @Autowired
    AuthorityRepository authorityRepository;

    @Test
    void contextLoads() {
        authorityRepository.save(new Authority(MemberAuth.ROLE_USER));
        authorityRepository.save(new Authority(MemberAuth.ROLE_ADMIN));
    }

}
