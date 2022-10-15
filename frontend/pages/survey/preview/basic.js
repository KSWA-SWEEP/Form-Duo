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
    const [svyContents, setSvyContents] = useState([]);

    useEffect(() => {
        setLoading(true)
        getQuery();
    }, [query])

    if(isLoading) return <div>Loading</div>;
    if(query == undefined) return <div>Loading</div>;
    if(svyContents.length === 0) return <div>Loading</div>;

    async function getQuery(){
        try{
            // 쿼리 가져오기
            console.log("###### query: " + JSON.stringify(router.query));
            setQuery(router.query);

            if(Object.keys(query) == "svyId") {
                // 설문 목록에서 실행한 미리보기인 경우
                getSurvey(query.svyId);
                console.log("목록인 경우");
                setLoading(false);
            }
            else {
                // 설문 생성에서 실행한 미리보기인 경우
                setSvyContents(query.svyContents);
                console.log("미리보기인 경우");
                setLoading(false);
            }
            setLoading(false);
        }catch (e) {
            console.log(e);
        }
      } 

    async function getSurvey() {
        try {
            const svyContents = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys/' + query.svyId);
            setSvyContents(svyContents.data);
            setLoading(false);
            return svyContents;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <PageTitle title="설문 미리보기"/>
            <h1>svyContents : {JSON.stringify(svyContents)}</h1>
            <h1>query: {JSON.stringify(query)}</h1>
            <h1>key: {Object.keys(query)}</h1>

            <h1>콘텐츠: {JSON.stringify(query.svyContents)}</h1>
            <h1>아이디: {JSON.stringify(query.svyId)}</h1>
            {/* <SurveyPreview svyContents={svyContents} /> */}

        </>
    );
};

export default BasicPreview;
