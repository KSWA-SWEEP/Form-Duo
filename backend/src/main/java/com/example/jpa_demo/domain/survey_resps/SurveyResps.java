package com.example.jpa_demo.domain.survey_resps;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@Entity
@TypeDef(name = "json", typeClass = JsonType.class)
@Table(name = "TB_SVY_RESP")
public class SurveyResps {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "SVY_RESP_ID", nullable = false)
    private Integer id;

    @Column(name = "SVY_ID", nullable = false)
    private Integer svyId;

    @Column(name = "SVY_RESP_DT")
    private Instant svyRespDt;

    @Type(type="json")
    @Column(name = "SVY_RESP_CONTENT", nullable = false, columnDefinition = "json")
    private List<Map<String, Object>> svyRespContent;

    @Builder
    public SurveyResps(int svyId, Instant svyRespDt,
                       List<Map<String, Object>> svyRespContent)
    {
        this.svyId = svyId;
        this.svyRespDt = svyRespDt;
        this.svyRespContent = svyRespContent;
    }


}