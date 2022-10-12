package com.example.jpa_demo.domain.users;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Integer> {

    public Users findByEmail(String email);
}