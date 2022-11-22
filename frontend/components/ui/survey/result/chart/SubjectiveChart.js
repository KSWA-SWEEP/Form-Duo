import { useRecoilState } from "recoil";
import { subjAnsState } from "../../../../../atoms/subjAns"
import { useState } from "react";

export default function SubjectiveChart() {

    const [subjAns, setSubjAns] = useRecoilState(subjAnsState);
    let answer = [];

    function extractSubj() {
        JSON.parse(
            subjAns,
            (key, value) =>
                // typeof(JSON.stringify(value)) !== 'object' ?  // value가 JSON 형식이 아니라면, 주관식 답변
                // answer = [...answer, value] : ""
                console.log("~~~ " + typeof(value))
        );
        
        // console.log("~~~ " + answer);
    }

    extractSubj();

    return (
        <div>
            TODO: 주관식 답변만 뽑아서 chart로 출력
            <br/>
            {JSON.parse(JSON.stringify(subjAns))}
            
        </div>
    )
}