import { useState } from "react";
import { useRecoilState } from "recoil";
import { respState } from "../../../../atoms/resp";
import { qIdState } from "../../../../atoms/qId";
import { qContentIdState } from "../../../../atoms/qContentId";

export default function Checkbox(props) {


  const [resp, setResp] = useRecoilState(respState);
  const [qId, setQId] = useRecoilState(qIdState);
  const [qContentId, setQContentId] = useRecoilState(qContentIdState);

  // console.log("@@@ " + JSON.stringify(props.svyRespContents));

  const [checked, setChecked] = useState([]);
  const handleCheck = (event) => {
    const updatedList = [...checked];
    const index = props.svyRespContents.findIndex((svyRespContent) => svyRespContent.qId === props.qId);

    if (event.target.checked) {
      updatedList = [...checked, event.target.value];

      const ansVal = {
        qContentId: qContentId,
        resp: resp,
      };

      // console.log("created ansVal: " + JSON.stringify(ansVal));
      let tempRespContents = [...(props.svyRespContents)];
      let tempAnsVal = tempRespContents[index].ansVal;
      // console.log("tempAnsVal before " + JSON.stringify(tempAnsVal));
      Array.from(tempAnsVal).concat(ansVal);
      // tempAnsVal = [...tempAnsVal, ansVal];
      // console.log("tempAnsVal after " + JSON.stringify(tempAnsVal));
      // props.setSvyRespContents((props.svyRespContents[index].ansVal).concat(ansVal));
       
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }

    setChecked(updatedList);
    setQContentId(event.target.value);
    setQId(props.qId);
    setResp(props.qContents[event.target.value-1].qContentVal);
  }

  return (
    <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl">
      <div className="text-lg bg-fdyellowbright text-gray-900 indent-3">
        Question. {props.qId}
      </div>
      <div className="overflow-hidden shadow rounded-2xl">
        <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
          <fieldset>
            <legend className="contents text-base font-medium text-gray-900">{props.qTitle}</legend>
            <p className="text-sm text-gray-500">{props.qInfo}</p>
            <div className="mt-4 space-y-4">
              {props.qContents && props.qContents.map((qContent) => {
                return (
                  <div key={qContent.qContentId}>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded text-fdblue focus:ring-fdblue"
                          onChange={handleCheck}
                          value={qContent.qContentId}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="comments" className="font-medium text-gray-700">
                          {qContent.qContentVal}
                        </label>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
