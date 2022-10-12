import { useRouter } from 'next/router'

const SurveyResult = () => {
    const router = useRouter();
    const { surveyId } = router.query

    return (
        <>
            <h1>SurveyResult : {surveyId}</h1>
        </>
    );
};

export default SurveyResult;

