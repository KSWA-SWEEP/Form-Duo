package com.example.jpa_demo.service.surveys;

import com.example.jpa_demo.domain.survey_resps.SurveyResps;
import com.example.jpa_demo.domain.survey_resps.SurveyRespsRepository;
import com.example.jpa_demo.domain.surveys.Surveys;
import com.example.jpa_demo.domain.surveys.SurveysRepository;
import com.example.jpa_demo.service.members.MemberService;
import com.example.jpa_demo.web.dto.survey_resps.SurveyRespsRequestDto;
import com.example.jpa_demo.web.dto.survey_resps.SurveyRespsResponseDto;
import com.example.jpa_demo.web.dto.surveys.SurveysResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SurveyRespService {
    private final SurveysRepository surveysRepository;
    private final SurveyRespsRepository surveyRespsRepository;



    @Transactional
    public Integer save(SurveyRespsRequestDto requestDto) {

        // 설문이 있는지 없는지 확인
        Surveys surveys = surveysRepository.findById(requestDto.getSvyId())
                .orElseThrow(() -> new IllegalArgumentException("해당 설문이 없습니다. id =" + requestDto.getSvyId()));

        // 기간이 지났는지 확인
        // 응답수가 최대 수를 넘었는지 확인

        return surveyRespsRepository.save(requestDto.toEntity()).getId();
    }

    public SurveyRespsResponseDto findById(int id){
        SurveyResps entity = surveyRespsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 응답이 없습니다. id ="+ id));
        return new SurveyRespsResponseDto(entity);}

    public List<SurveyRespsResponseDto> findAll(int svyId) {
        // 설문이 있는지 없는지 확인
        Surveys surveys = surveysRepository.findById(svyId)
                .orElseThrow(() -> new IllegalArgumentException("해당 설문이 없습니다. 설문 id =" + svyId));
        Sort sort = Sort.by(Sort.Direction.DESC, "id", "svyRespDt");
        List<SurveyResps> list = surveyRespsRepository.findAll(sort);
        return list.stream().map(SurveyRespsResponseDto::new).collect(Collectors.toList());
    }
}
