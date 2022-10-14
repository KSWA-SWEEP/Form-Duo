import SVY_CONTENT_1 from "../../../../public/temp/SVY_CONTENT_1.json"
import ShowQuestionListItem from "./ShowQuestionListItem";

const ShowQuestionList = (props) => {

    console.log("####svyContents: " + JSON.stringify(props.svyRespContents));

    return (
        <div>
            {props.svyContents.svyContent && props.svyContents.svyContent.map((question) => (
                <ShowQuestionListItem key={question.qId}
                    qId={question.qId}
                    qTitle={question.qTitle}
                    qInfo={question.qInfo}
                    qType={question.qType}
                    qImage={question.qImage}
                    qVideo={question.qVideo}
                    qIsMulti={question.isMulti}
                    qContents={question.qContents}
                    svyRespContents={props.svyRespContents}
                    setSvyRespContents={props.setSvyRespContents} />
            ))}
        </div>
    );
};
export default ShowQuestionList;