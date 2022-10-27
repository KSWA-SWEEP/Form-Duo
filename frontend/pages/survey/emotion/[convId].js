import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil';
import Conversation from '../../../components/ui/survey/emotion/Conversation';
import PageTitle from '../../../components/ui/PageTitle';

export default function ConversationAnalysis() {
    const router = useRouter();
    const { convid } = router.query;

    return (
        <>
            <Conversation cvid = {convid}/>
        </>
    );
};
