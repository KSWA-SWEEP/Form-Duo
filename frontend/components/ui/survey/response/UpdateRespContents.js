import { useEffect, useState} from "react";
import { useRecoilValue } from "recoil";
import { respState } from "../../../../atoms/resp"
import { qIdState } from "../../../../atoms/qId";
import { qContentIdState } from "../../../../atoms/qContentId";

export default function UpdateRespContents(props) {

    const resp = useRecoilValue(respState);
    const qId = useRecoilValue(qIdState);
    const qContentId = useRecoilValue(qContentIdState);

    useEffect(() => {
        console.log("qId: " + qId + ", qContentId: " + qContentId + ", resp: " + resp);
        props.setSvyRespContents(props.svyRespContents && props.svyRespContents.map(svyRespContent => {
            return svyRespContent.qId === qId ? { ...svyRespContent, ansVal: { "qContentId": qContentId, "resp": resp }} : svyRespContent
        }));

    }, [resp, qId, qContentId])

    const [ansValList, setAnsValList] = useState();

    useEffect(() => {
        const ansVal = {
            qContentId: qContentId,
            resp: resp,
        };
        // console.log("ansVal.qContentId: " + ansVal.qContentId);
    }, [resp, qId, qContentId])

}