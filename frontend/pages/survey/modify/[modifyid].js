import { useRouter } from 'next/router'
import SurveyModify from '../../../components/ui/survey/SurveyModify'


const Modify = () => {
    
    const router = useRouter();
    const { modifyid } = router.query
    
    return (
        <>
            <PageTitle title="설문 수정하기"/>
            <SurveyModify surveyId={modifyid} />
        </>
    );
};

export default Modify;