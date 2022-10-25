import { useRouter } from 'next/router'
import SurveyResults from "../../../components/ui/survey/result/SurveyResults";
import {Box, Button} from '@mui/material';
import SurveyAnalysis from "../../../components/ui/survey/result/SurveyAnalysis";
import {useEffect, useState} from "react";
import axios from "axios";
import {Slider} from "../../../components/ui/survey/result/chart/Slider";

const SurveyResult = () => {

    const router = useRouter();
    // const { surveyId } = router.query;
    const [surveyId, setSurveyId] = useState(null);
    // 설문 전체 데이터
    const [data, setData] = useState(null);
    // 설문 응답자 수
    const [isLoading, setLoading] = useState(false)
    const [viewChart, setViewChart] = useState(true);

    // console.log(router.query)
    // if (!isLoading) getContents(Object.values(router.query))


    useEffect(() => {
        //
        if(!router.isReady) return;
        else {
            setSurveyId(Object.values(router.query)[0]);
            // getContents(surveyId).then(r => setLoading(false));
            console.log(router.query)
        }
    }, [router.isReady]);
    // alert(message + " " + surveyId);

    useEffect(() => {
        if (surveyId) getContents(surveyId);
    }, [surveyId])


    async function getContents(surveyId) {
        try {
            const svyContents = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys/' + surveyId + '/resp')
            setData(svyContents.data);
            console.log(svyContents.data);
            // setLoading(false);
            // return svyContents;
        } catch (e) {
            console.log(e);
        }
    }

    if (!surveyId) return <p> Loading ...</p>
    if (isLoading) return <p> Loading...</p>
    if (!data) return <p> 아직 응답이 없구만유</p>

    if(data) {


        console.log(parseInt((data.length/data[0].svyRespsMax*100).toString()))
        return (
            <div>
                <div
                >
                    <div className="py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-30 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                        <h1>설문 참여율 : {data.length} / {data[0].svyRespsMax}</h1>
                        <Slider data = {parseInt((data.length/data[0].svyRespsMax*100).toString())}/>

                    </div>

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
                    {viewChart ?  <SurveyResults resPeople = {data.length} maxResPeople ={data[0].svyRespsMax} resContents = {Object.values(data)}
                                                />
                        :
                        <SurveyAnalysis resPeople = {data.length} maxResPeople ={data[0].svyRespsMax} resContents = {Object.values(data)} />}
                </div>
            </div>
        );
    }
    ;
}

export default SurveyResult;

