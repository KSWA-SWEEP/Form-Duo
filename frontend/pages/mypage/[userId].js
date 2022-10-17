import { useRouter } from 'next/router'

const MyPage = () => {
    const router = useRouter();
    const { userId } = router.query;

    return (
        <>
            <h1>MyPage : {userId}</h1>
        </>
    );
};

export default MyPage;

