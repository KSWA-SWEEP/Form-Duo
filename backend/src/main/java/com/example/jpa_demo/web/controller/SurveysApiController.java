package com.example.jpa_demo.web.controller;


import com.example.jpa_demo.service.surveys.SurveyRespService;
import com.example.jpa_demo.service.surveys.SurveyService;
import com.example.jpa_demo.web.dto.posts.PostsSaveRequestDto;
import com.example.jpa_demo.web.dto.survey_resps.SurveyRespsRequestDto;
import com.example.jpa_demo.web.dto.survey_resps.SurveyRespsResponseDto;
import com.example.jpa_demo.web.dto.surveys.SurveysRequestDto;
import com.example.jpa_demo.web.dto.surveys.SurveysResponseDto;
import com.example.jpa_demo.web.dto.surveys.SurveysUpdateRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.annotation.processing.SupportedOptions;
import java.util.List;

@Tag(name = "설문", description = "설문 관련 api 입니다.")
@RequiredArgsConstructor
@RequestMapping("/api/v1/surveys")
@RestController
public class SurveysApiController {

    private final SurveyService surveyService;
    private final SurveyRespService surveyRespService;

    @Operation(summary = "설문 생성 요청", description = "설문이 생성됩니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(schema = @Schema(implementation = SurveysResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("")
    public int save(@RequestBody SurveysRequestDto requestDto) {
        return surveyService.save(requestDto);
    }



    @Operation(summary = "설문 수정 요청", description = "설문이 수정됩니다.")
    @PutMapping("{id}")
    public int update(@PathVariable Integer id, @RequestBody SurveysUpdateRequestDto requestDto){
        return surveyService.update(id, requestDto);
    }

    @Operation(summary = "설문 조회 요청", description = "해당 아이디의 설문이 조회됩니다.")
    @GetMapping("{id}")
    public SurveysResponseDto findSurveyById (@PathVariable Integer id) {
        return surveyService.findById(id);
    }

    @Operation(summary = "설문 삭제 요청", description = "해당 아이디의 설문이 삭제됩니다.")
    @DeleteMapping("{id}")
    public String remove (@PathVariable Integer id) {
        return surveyService.remove(id);
    }

    @Operation(summary = "자신의 모든 설문 요청", description = "해당 아이디의 모든 설문이 조회됩니다.")
    @GetMapping("")
    public List<SurveysResponseDto> getAllMySurveys () {
        return surveyService.findAll();
    }



}
