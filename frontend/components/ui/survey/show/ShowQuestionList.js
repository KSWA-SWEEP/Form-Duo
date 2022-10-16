import ShowQuestionListItem from "./ShowQuestionListItem";

const ShowQuestionList = (props) => {

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
                    setSvyRespContents={props.setSvyRespContents}
                    isModify = {props.isModify}/>
            ))}
        </div>
    );
};
export default ShowQuestionList;