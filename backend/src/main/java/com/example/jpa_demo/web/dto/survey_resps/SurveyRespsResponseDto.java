package com.example.jpa_demo.web.dto.survey_resps;

import com.example.jpa_demo.domain.survey_resps.SurveyResps;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * A DTO for the {@link SurveyResps} entity
 */
@Getter
@NoArgsConstructor
public class SurveyRespsResponseDto {
    private Integer id;
    private Integer svyId;
    private Instant svyRespDt;
    private List<Map<String, Object>> svyRespContent;


    public SurveyRespsResponseDto(SurveyResps entity){
        this.id = entity.getId();
        this.svyId = entity.getSvyId();
        this.svyRespDt = entity.getSvyRespDt();
        this.svyRespContent = entity.getSvyRespContent();
    }
}