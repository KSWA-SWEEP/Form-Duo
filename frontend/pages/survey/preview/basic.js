import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import PageTitle from '../../../components/ui/PageTitle';
import SurveyPreview from "../../../components/ui/survey/SurveyPreview";
import axios from "axios";

// 설문 참여 페이지
const BasicPreview = () => {
    const router = useRouter();
    const [query, setQuery] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [svyContents, setSvyContents] = useState(null);
    const [svyResContents, setSvyResContents] = useState(null);
    const [isModify, setIsModify] = useState(false);

    useEffect(() => {
        setLoading(true)
        // 쿼리 가져오기
        getQuery()
    }, [query])

    if(isLoading) return <div>Loading</div>;
    if(query === undefined) return <div>Loading</div>;
    if(!svyContents) return <div>Loading</div>;


    async function getQuery(){
        try{
            console.log("###### query: " + JSON.stringify(router.query));
            setQuery(router.query);
            if(query){
                if (Object.keys(query)[0] === "svyId" && Object.keys(query).length === 1) {
                    // 설문 목록에서 실행한 미리보기인 경우
                    await getSurvey(query.svyId);
                    console.log("목록 미리보기인 경우");
                    setLoading(false);
                } else if (Object.keys(query)[1] === "svyResId") {
                    // 설문 결과에서 실행한 미리보기인 경우
                    await getSurvey(query.svyId);
                    setSvyResContents(JSON.parse(query.svyResContents));
                    console.log(query.svyResContents);
                    console.log("결과분석인 경우");
                    setLoading(false);
                } else {
                    // 설문 생성에서 실행한 미리보기인 경우
                    setSvyContents({svyContent: JSON.parse(query.svyContents)});
                    console.log("생성에서 미리보기인 경우");
                    setLoading(false);
                    setIsModify(true);
                }
            }
            setLoading(false);

        }catch (e) {
            console.log(e);
        }
      } 

    async function getSurvey(svyId) {
        try {
            const svyContents = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys/' + svyId);
            setSvyContents(svyContents.data);
            setLoading(false);
            return svyContents;
        } catch (e) {
            console.log(e);
        }
    }
    // //설문 목록
    // async function getSurveyRes(resId) {
    //     try {
    //         const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys/reps/' + resId);
    //         // console.log(result.data);
    //         setSvyResContents(result.data);
    //         // console.log(svyResContents);
    //         setLoading(false);
    //         return svyResContents;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    console.log(svyResContents);
    return (
        <>
            <PageTitle title="설문 미리보기"/>
            {/* <h1>svyContents : {JSON.stringify(svyContents)}</h1>
            <h1>query: {JSON.stringify(query)}</h1>
            <h1>key: {Object.keys(query)}</h1>

            <h1>콘텐츠: {JSON.stringify(query.svyContents)}</h1>
            <h1>아이디: {JSON.stringify(query.svyId)}</h1> */}
            <SurveyPreview svyContents={svyContents} svyResContents = {svyResContents} isModify ={isModify}/>

        </>
    );
};

export default BasicPreview;
