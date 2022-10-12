package com.example.jpa_demo.web.dto.users;

import com.example.jpa_demo.domain.users.Users;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.Instant;

/**
 * A DTO for the {@link com.example.jpa_demo.domain.users.Users} entity
 */
@Data
public class UsersResponseDto implements Serializable {

    private final String email;
    private final Instant regDt;

    @Builder
    public UsersResponseDto(Users entity){
        this.email = entity.getEmail();
        this.regDt = entity.getRegDt();
    }
}