import React, { useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import { useRouter } from 'next/router'
import ShowQuestionList from "./show/ShowQuestionList";

export default function SurveyPreview(props) {

    const [svyContents, setSvyContents] = useState(props.svyContents);
    const [svyRespContents, setSvyRespContents] = useState(null); // props.svyResContents.svyRespContent
    // const svyRespContents = svyResContents.svyRespContent;
    // const [svyTitle, setSvyTitle] = useState(svyContents.svyTitle);
    // const [svyIntro, setSvyIntro] = useState(svyContents.svyIntro);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    console.log(svyRespContents);
    console.log(svyContents)

    useEffect( () => {
        if (!props.svyResContents) {
            initResContents();
        }
        else {
            setSvyRespContents(props.svyResContents);
        }
    }, [])


    function initResContents() {
        let resContent = [];
        let newList = [];
        console.log(svyContents);
        svyContents.svyContent && svyContents.svyContent.map(question => {
            resContent = {qId: question.qId, qType: question.qType, ansVal: [{qContentId: "", resp: ""}]}
            newList = [...newList, resContent];
        setSvyRespContents(newList);
        })
        console.log(svyRespContents);
    }

    // function getResContents() {
    //     let resContent = [];
    //     let newList = [];
    //     svyContents.svyContent && svyContents.svyContent.map(question => {
    //         resContent = {qId: question.qId, qType: question.qType, ansVal: [{qContentId: "", resp: ""}]}
    //         newList = [...newList, resContent];
    //         setSvyRespContents(newList);
    //     })
    // }


    // console.log(props.svyResContents);
    // console.log(props.svyContents);
    // useEffect(() => {
    //     location.reload();   
    // }, []);

    // useEffect(() => {
    //     setLoading(true)
    //     initSvyContents();
    // }, [svyContents, svyRespContents])
    //
    // useEffect(() => {
    //     try {
    //         // initResContents();
    //         setSvyRespContents(props.svyResContents.svyRespContent);
    //         console.log(props.svyRespContents)
    //         console.log(props.resContents);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, []);  // svyTitle, svyIntro

    // if (isLoading) return <div>Loading</div>;
    if (!svyContents || !svyRespContents) return <div>Data is not exist.</div>;

    // 설문 응답 포맷 초기화
    // const resContent = useRef([]);


    // function initSvyContents() {
    //     setSvyContents(props.svyContents.svyContents);
    //     setLoading(false);
    // }

    return (
        <div>
            {/* <h1>******* contents: {JSON.stringify(svyContents)}</h1>
            <h1>******* 설문 내용: {JSON.stringify(svyContents)}</h1>
            <h1>******* 설문 제목: {svyContents.svyTitle}</h1>
            <h1>******* 설문 인트로: {svyContents.svyIntro}</h1> */}
            <ShowQuestionList svyContents={svyContents} svyRespContents={svyRespContents}
                              setSvyRespContents={setSvyRespContents} isModify={props.isModify}/>

            <div className="flex justify-center m-7 mx-2 rounded-md ">
                <a onClick={() => router.back()}
                   className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-400 border border-transparent rounded-md hover:bg-blue-500"
                >
                    뒤로가기
                </a>
            </div>
        </div>
    );
}


