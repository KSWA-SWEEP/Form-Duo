import Checkbox from "./Checkbox";
import Date from "./Date";
import Dropbox from "./Dropbox";
import File from "./File";
import Objective from "./Objective";
import Rating from "./Rating";
import Subjective from "./Subjective";
import Video from "./Video";
import Voice from "./Voice";

const ShowQuestionListItem = ({ qId, qTitle, qInfo, qType, qImage, qVideo, qisMulti, qContents, svyRespContents, setSvyRespContents, qNumber }) => {

    function questionAsType() {
        switch (qType) {
            case 'Checkbox':
                return <Checkbox qId={qId} qTitle={qTitle} qInfo={qInfo} qContents={qContents} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber}/>
            case 'Date':
                return <Date qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber}/>
            case 'Dropbox':
                return <Dropbox qId={qId} qTitle={qTitle} qInfo={qInfo} qContents={qContents} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber}/>
            case 'File':
                return <File qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber}/>
            case 'Objective':
                return <Objective qId={qId} qTitle={qTitle} qInfo={qInfo} qContents={qContents} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber}/>
            case 'Rating':
                return <Rating qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber}/>
            case 'Subjective':
                return <Subjective qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} qNumber={qNumber}/>
            case 'Voice':
                return <Voice qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents}/>
            case 'Video':
                return <Video qId={qId} qTitle={qTitle} qInfo={qInfo} svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents}/>
        }
    }

    return (
        <div>
            {questionAsType()}
        </div>
    )
};
export default ShowQuestionListItem;