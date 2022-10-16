import React, { useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import { useRouter } from 'next/router'
import ShowQuestionList from "./show/ShowQuestionList";

export default function SurveyPreview(contents) {

    const [svyContents, setSvyContents] = useState([]);
    const [svyRespContents, setSvyRespContents] = useState([])
    const [svyTitle, setSvyTitle] = useState(svyContents.svyTitle)
    const [svyIntro, setSvyIntro] = useState(svyContents.svyIntro)
    const [preURL, setPreURL] = useState("");
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    // useEffect(() => {
    //     location.reload();   
    // }, []);

    useEffect(() => {
        setLoading(true)
        initSvyContents();
    }, [svyContents])

    useEffect(() => {
        setLoading(true)
        initPreURL();
    }, [preURL])

    useEffect(() => {
        try {
            initResContents();
        } catch (e) {
            console.log(e);
        }
    }, [svyTitle, svyIntro]);

    if (isLoading) return <div>Loading</div>;
    if (svyContents.length === 0) return <div>Loading</div>;
    if (preURL === undefined) return <div>Loading</div>;

    // 설문 응답 포맷 초기화
    // const resContent = useRef([]);
    var resContent = [];
    const initResContents = () => {

        const newList = [];
        svyContents.svyContent && svyContents.svyContent.map(question => {
            resContent = { qId: question.qId, qType: question.qType, ansVal: [{ qContentId: "", resp: "" }] }
            newList = [...newList, resContent];
        });
        setSvyRespContents(newList);
    }

    function initSvyContents() {
        setSvyContents(contents.svyContents);
        setLoading(false);
    }

    function initPreURL() {
        setPreURL(contents.preURL);
        setLoading(false);
    }

    return (
        <div>
            <h1>******* 설문 내용: {JSON.stringify(svyContents)}</h1>
            <h1>******* 이전 URL: {preURL}</h1>
            
            <h1>설문 제목: {svyContents.svyTitle}</h1>
            <h1>설문 인트로: {svyContents.svyIntro}</h1>
            <ShowQuestionList svyContents={svyContents} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} />

            <div className="flex justify-center m-7 mx-2 rounded-md ">
                <a onClick={ () => router.push({pathname: preURL, query: JSON.stringify(svyContents)})}   // TODO: router.push({pathname: 이전페이지, query: svyContents})
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-400 border border-transparent rounded-md hover:bg-blue-500"
                >
                    뒤로가기
                </a>
            </div>
        </div>
    );
};


