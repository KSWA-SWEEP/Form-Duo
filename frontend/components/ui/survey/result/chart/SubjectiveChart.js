import { useRecoilState } from "recoil";
import { subjAnsState } from "../../../../../atoms/subjAns"
import { Suspense, useState, useEffect } from "react";
import SubjectiveTable from "./SubjectiveTable";

export default function SubjectiveChart() {

    const [subjAns, setSubjAns] = useRecoilState(subjAnsState);

    return (
        <div>
            {/* {JSON.stringify(subjAns)} */}
            <h1>주관식 답변 출력</h1>
            <div>
                {typeof(JSON.parse(JSON.stringify(subjAns))) != 'object' && Object.keys(JSON.parse(JSON.parse(JSON.stringify(subjAns)))).map(key => {
                    console.log("This is key: " + key)
                    console.log("This is  value: " + JSON.parse(JSON.parse(JSON.stringify(subjAns)))[key])
                    return JSON.parse(JSON.parse(JSON.stringify(subjAns)))[key] != "" ?
                        <SubjectiveTable num={key} value={JSON.parse(JSON.parse(JSON.stringify(subjAns)))[key]} />
                        : <></>
                    }
                )}
            </div>
        </div>
    )
}