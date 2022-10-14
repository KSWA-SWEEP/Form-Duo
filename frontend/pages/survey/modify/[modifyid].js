import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil';
import SurveyModify from '../../../components/ui/survey/SurveyModify'
import { modifySvyID } from '../../../atoms/modifySvyID';
import PageTitle from '../../../components/ui/PageTitle';

export default function Modify() {
    const router = useRouter();
    const { modifyid } = router.query;
   
    
    return (
        <>
            <PageTitle title="설문 수정하기"/>
            <SurveyModify svyID = {modifyid} />
        </>
    );
};
