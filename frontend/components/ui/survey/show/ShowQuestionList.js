import SVY_CONTENT_1 from "../../../../public/temp/SVY_CONTENT_1.json"
import ShowQuestionListItem from "./ShowQuestionListItem";

const ShowQuestionList = () => {

    return(
        <div>
            {SVY_CONTENT_1.svyContents.map((question) => (
                <ShowQuestionListItem key={question.qId}
                qId={question.qId}
                qTitle={question.qTitle}
                qInfo={question.qInfo}
                qType={question.qType}
                qImage={question.qImage}
                qVideo={question.qVideo}
                qIsMulti={question.isMulti}
                qContents={question.qContents} />
                
            ))}
        </div>
    );
};
export default ShowQuestionList;