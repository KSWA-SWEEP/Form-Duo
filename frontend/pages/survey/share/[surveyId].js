import { useRouter } from 'next/router'
import PageTitle from '../../../components/ui/PageTitle';
import SurveyResponse from "../../../components/ui/survey/SurveyResponse";

// 설문 참여 페이지
const Survey = () => {
    const router = useRouter();
    const { surveyId } = router.query

    return (
        <>
            <PageTitle title="설문 참여하기"/>
            <h1>Survey : {surveyId}</h1>
            <SurveyResponse svyId={surveyId} />
        </>
    );
};

export default Survey;
