import Checkbox from "./Checkbox";
import Date from "./Date";
import Dropbox from "./Dropbox";
import File from "./File";
import Objective from "./Objective";
import Rating from "./Rating";
import Subjective from "./Subjective";

const ShowQuestionListItem = ({ qId, qTitle, qInfo, qType, qImage, qVideo, qisMulti, qContents }) => {

    function questionAsType() {
        switch (qType) {
            case 'checkbox':
                return <Checkbox qId={qId} qTitle={qTitle} qInfo={qInfo} qContents={qContents}/>
            case 'date':
                return <Date qId={qId} qTitle={qTitle} qInfo={qInfo} />
            case 'dropbox':
                return <Dropbox qId={qId} qTitle={qTitle} qInfo={qInfo} qContents={qContents}/>
            case 'file':
                return <File qId={qId} qTitle={qTitle} qInfo={qInfo}/>
            case 'objective':
                return <Objective qId={qId} qTitle={qTitle} qInfo={qInfo} qContents={qContents}/>
            case 'rating':
                return <Rating qId={qId} qTitle={qTitle} qInfo={qInfo} />
            case 'subjective':
                return <Subjective qId={qId} qTitle={qTitle} qInfo={qInfo} />
        }
    }

    return (
        <div>
            {questionAsType()}
        </div>
    )
};
export default ShowQuestionListItem;