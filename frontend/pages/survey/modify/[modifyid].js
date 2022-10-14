import PageTitle from "../../../components/ui/PageTitle";
import SurveyGridList from "../../../components/ui/survey/SurveyGridList";
import { useRouter } from 'next/router'


const m = () => {

    return (
        <>
            <h1>{surveyId}번 설문 수정</h1>
        </>
    );
};

export default SurveyModify;
