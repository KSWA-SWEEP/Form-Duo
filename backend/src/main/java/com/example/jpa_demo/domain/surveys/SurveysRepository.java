package com.example.jpa_demo.domain.surveys;

import com.example.jpa_demo.domain.members.Members;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SurveysRepository extends JpaRepository<Surveys, Integer> {

    List<Surveys> findAllByEmail(String email);
}