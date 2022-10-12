package com.example.jpa_demo.web.controller;

import com.example.jpa_demo.web.dto.members.MemberRemoveDTO;
import com.example.jpa_demo.web.dto.members.MemberRespDTO;
import com.example.jpa_demo.web.dto.members.MemberUpdateDTO;
import com.example.jpa_demo.service.members.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "멤버", description = "멤버 관련 api 입니다.")
@RequestMapping("api/v1/member")
public class MembersApiController {
    private final MemberService memberService;

    @Operation(summary = "자신 정보 조회", description = "자신의 정보를 요청합니다.")
    @GetMapping("")
    public MemberRespDTO getMyInfo() {
        return memberService.getMyInfo();
    }

    @Operation(summary = "이메일 정보 조회", description = "해당 이메일의 정보를 요청합니다.")
    @GetMapping("/{email}")
    public MemberRespDTO getMemberInfo(@PathVariable String email) {
        return memberService.getMemberInfo(email);
    }

    @Operation(summary = "유저 정보 업데이트 요청", description = "유저 정보 업데이트를 요청합니다.")
    @PutMapping("")
    public void updateMember(@RequestBody MemberUpdateDTO dto) {
        memberService.updateMemberInfo(dto);
    }

    @Operation(summary = "유저 삭제 요청", description = "유저 정보가 생성됩니다.")
    @DeleteMapping("{email}")
    public String remove(@PathVariable MemberRemoveDTO dto) {
        return memberService.remove(dto);
    }

//    /**
//     * @PreAuthorize 는 ControllerAdvice에 의해 에러핸들링됨
//     * @return
//     */
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    @GetMapping("/admintest")
//    public String adminTest() {
//        return "ADMIN OK!";
//    }
}