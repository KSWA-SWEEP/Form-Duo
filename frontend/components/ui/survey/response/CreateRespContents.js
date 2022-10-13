import { useEffect, useRef } from "react";
import SVY_CONTENT_1 from "../../../../public/temp/SVY_CONTENT_1.json"
import UpdateRespContents from "./UpdateRespContents"

export default function CreateRespContents(props) {

    const resContent = useRef([]);

    const initResContents = () => {
        const newList = [];
        SVY_CONTENT_1.svyContents.map(question => {
            resContent.current = { "qId": question.qId, "qType": question.qType, "ansVal": { "qContentId": "", "resp": "" } }
            newList = [...newList, resContent.current];
        });

        props.setSvyRespContents(newList);
    }

    useEffect(() => {
        initResContents();
    }, []);


    return (
        <UpdateRespContents svyRespContents={props.svyRespContents} setSvyRespContents={props.setSvyRespContents} />
    )
}