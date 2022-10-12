package com.example.jpa_demo.web.dto.members;

import com.example.jpa_demo.domain.members.Members;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberRespDTO {

    private String email;

    public static MemberRespDTO of(Members members) {
        return new MemberRespDTO(members.getEmail());
    }
}