import PageTitle from "../../../components/ui/PageTitle";
import SurveyGridList from "../../../components/ui/survey/SurveyGridList";
import { useRouter } from 'next/router'
import SurveyModify from '../../../components/ui/survey/SurveyModify'


const ModifySurvey = () => {
    
    const router = useRouter();
    const { surveyId } = router.query
    
    return (
        <>
            <PageTitle title="설문 수정하기"/>
            <SurveyModify/>
        </>
    );
};

export default ModifySurvey;
