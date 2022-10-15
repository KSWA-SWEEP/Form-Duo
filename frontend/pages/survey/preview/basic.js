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

    if (isLoading) return <div>Loading</div>;
    if (query == undefined) return <div>Loading</div>;
    if (svyContents === undefined || svyContents.length === 0) return <div>Loading</div>;

    async function getQuery() {
        try {
            // 쿼리 가져오기
            console.log("###### query: " + JSON.stringify(router.query));
            console.log("###### svyContents: " + JSON.stringify(router.query.svyContents));
            
            setQuery(router.query);

            if (Object.keys(query) == "svyId") {
                // 설문 목록에서 실행한 미리보기인 경우
                getSurvey(query.svyId);
                console.log("목록인 경우");
                setLoading(false);
            }
            else {
                // 설문 생성에서 실행한 미리보기인 경우
                getCreateSurvey();
                console.log("미리보기인 경우");
                setLoading(false);
            }
            setLoading(false);
        } catch (e) {
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

    async function getCreateSurvey() {
        try {
            setSvyContents(JSON.parse(JSON.parse(JSON.stringify(query)).svyContent));
            setLoading(false);
            return svyContents;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <PageTitle title="설문 미리보기" />
            {/* <h1>svyContent : {JSON.stringify(svyContents)}</h1> */}
            <SurveyPreview svyContents={svyContents} />
        </>
    );
};

export default BasicPreview;
