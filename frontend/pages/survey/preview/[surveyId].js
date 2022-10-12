import { useRouter } from 'next/router'

const SurveyPreview = () => {
    const router = useRouter();
    const { surveyId } = router.query

    return (
        <>
            <h1>SurveyPreview : {surveyId}</h1>
        </>
    );
};

export default SurveyPreview;

