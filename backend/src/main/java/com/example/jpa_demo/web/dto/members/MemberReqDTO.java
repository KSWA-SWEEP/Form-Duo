package com.example.jpa_demo.web.dto.members;

import com.example.jpa_demo.domain.auth.Authority;
import com.example.jpa_demo.domain.members.Members;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberReqDTO {
    private String email;
    private String password;
    private String username;


    public Members toMember(PasswordEncoder passwordEncoder, Set<Authority> authorities) {
        return Members.builder()
                .email(email)
                .username(username)
                .password(passwordEncoder.encode(password))
                .reg_dt(Instant.now())
                .upd_dt(Instant.now())
                .activated(false)
                .delYn('N')
                .authorities(authorities)
                .build();
    }


}
