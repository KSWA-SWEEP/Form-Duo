import { useRouter } from 'next/router'

const SurveyModify = () => {
    const router = useRouter();
    let {modifyid} = router.query;

    return (
        <>
            <h1>{modifyid}번 설문 수정</h1>
        </>
    );
};

export default SurveyModify;
