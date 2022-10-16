import { useRouter } from 'next/router'
import SurveyResults from "../../../components/ui/survey/result/SurveyResults";
import { Button } from '@mui/material';
import SurveyAnalysis from "../../../components/ui/survey/result/SurveyAnalysis";
import {useEffect, useState} from "react";
import axios from "axios";

const SurveyResult = () => {

    const router = useRouter();
    // const { surveyId } = router.query;
    const surveyId = 206;
    console.log(" " + surveyId);

    // 설문 전체 데이터
    const [data, setData] = useState(null)

    // 설문 응답자 수
    const [resPeople, setResPeople] = useState(0);

    const [isLoading, setLoading] = useState(false)
    const [viewChart, setViewChart] = useState(true);

    useEffect(() => {
        setLoading(true)
        axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys/' + surveyId + '/reps')
            // .then((res) => res.json())
            .then((res) => {
                setData(res.data)
                setResPeople(Object.values(res.data).length);
                setLoading(false)
            })
    }, []);
    // alert(message + " " + surveyId);

    if (isLoading) return <p> Loading...</p>
    if (!data) return <p> 아직 응답이 없구만유</p>

    if(data) {
        console.log(data);
        console.log(typeof data);
        // console.log(Object.values(data));
        // const dataPreprocess = (data) => {
        //     // setResPeople(Object.values(data).length);
        //     Object.values(data).map((item) => console.log(item));
        // }

        // dataPreprocess(data);


        return (
            <div>
                <div>
                    <div><h1>총 응답 수 : {resPeople}</h1></div>
                    <br/>
                    <div align="center">
                    {viewChart ? (
                        <>
                            <button onClick={() => setViewChart(true)}
                                    className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105">
                                개별 응답 조회
                            </button>
                            <button onClick={() => setViewChart(false)}
                                    className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105">
                                설문 데이터 분석
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setViewChart(true)}
                                    className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105">
                                개별 응답 조회
                            </button>
                            <button onClick={() => setViewChart(false)}
                                    className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105">
                                설문 데이터 분석
                            </button>
                        </>
                    )}
                    </div>
                </div>
                <div>
                    {viewChart ?  <SurveyResults resPeople = {resPeople} resContents = {Object.values(data)} />: <SurveyAnalysis resContents = {Object.values(data)} />}
                </div>
            </div>
        );
    }
    ;
}

export default SurveyResult;

