package com.example.jpa_demo.service.surveys;

import com.example.jpa_demo.domain.surveys.Surveys;
import com.example.jpa_demo.domain.surveys.SurveysRepository;
import com.example.jpa_demo.service.members.MemberService;
import com.example.jpa_demo.util.exceptionhandler.BizException;
import com.example.jpa_demo.util.exceptionhandler.MemberExceptionType;
import com.example.jpa_demo.web.dto.members.MemberRespDTO;
import com.example.jpa_demo.web.dto.surveys.SurveysRequestDto;
import com.example.jpa_demo.web.dto.surveys.SurveysResponseDto;
import com.example.jpa_demo.web.dto.surveys.SurveysUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SurveyService {
    private final SurveysRepository surveysRepository;
    private final MemberService memberService;

    @Transactional
    public Integer save(SurveysRequestDto requestDto) {
        return surveysRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional
    public Integer update(int id, SurveysUpdateRequestDto requestDto){
        Surveys surveys = surveysRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 없습니다. id =" + id));

        surveys.update(requestDto.getSvyTitle(),
                requestDto.getSvyIntro(),
                requestDto.getSvyContent(),
                requestDto.getSvyStartDt(),
                requestDto.getSvyEndDt(),
                requestDto.getUpdDt(),
                requestDto.getSvyEndMsg(),
                requestDto.getSvyRespCount(),
                requestDto.getSvyRespMax());
        return id;
    }

    public SurveysResponseDto findById(int id){
        Surveys entity = surveysRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 설문이 없습니다. id ="+ id));

        System.out.println(entity);
        return new SurveysResponseDto(entity);}

    @Transactional
    public String remove(int id){
        Surveys entity = surveysRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 설문이 없습니다. id ="+ id));

        surveysRepository.deleteById(id);
        return entity.getSvyTitle();}


    public List<SurveysResponseDto> findAll() {
        // 설문이 있는지 없는지 확인
        List<Surveys> list = surveysRepository.findAllByEmail(memberService.getMyInfo().getEmail());
        // 소팅 조건
//        Sort sort = Sort.by(Sort.Direction.DESC, "id", "regDt");
//        List<Surveys> list = surveysRepository.findAll(sort);

        return list.stream().map(SurveysResponseDto::new).collect(Collectors.toList());
    }
}
