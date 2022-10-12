import { useRouter } from 'next/router'

// 설문 참여 페이지
const Survey = () => {
    const router = useRouter();
    const { surveyId } = router.query

    return (
        <>
            <div>
                
            </div>
            <h1>Survey : {surveyId}</h1>
            
        </>
    );
};

export default Survey;
