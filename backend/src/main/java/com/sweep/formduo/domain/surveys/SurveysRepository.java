package com.sweep.formduo.domain.surveys;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SurveysRepository extends JpaRepository<Surveys, Integer> {
    List<Surveys> findAllByEmail(String email);
}