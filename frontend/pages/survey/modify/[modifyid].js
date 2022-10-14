import { useRouter } from 'next/router'
import SurveyModify from '../../../components/ui/survey/SurveyModify'

<<<<<<< HEAD

const Modify = () => {
    
    const router = useRouter();
    const { modifyid } = router.query
    
    return (
        <>
            <PageTitle title="설문 수정하기"/>
            <SurveyModify surveyId={modifyid} />
=======
const SurveyModify = () => {
    const router = useRouter();
    let {modifyid} = router.query;

    return (
        <>
            <h1>{modifyid}번 설문 수정</h1>
>>>>>>> def522682b2c9b795299ec654f7f374331c070bb
        </>
    );
};

export default Modify;