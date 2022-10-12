package com.example.jpa_demo.web.dto.members;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberIsMyPwDTO {
    private String email;
    private String password;
}
