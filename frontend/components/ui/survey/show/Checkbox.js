import { useState, useEffect } from "react";

export default function Checkbox(props) {
  // console.log("svyrespcont: "  + JSON.stringify(props.svyRespContents));
  const index = props.svyRespContents.findIndex((svyRespContent) => svyRespContent.qId === props.qId);



  if (props.isModify) {
    const [tempAnsVal, setTempAnsVal] = useState([]);

    useEffect(() => {
          updatedSvyRespConents();
        },
        [tempAnsVal]
    );

    const insertAnsVal = (tempQContentId, tempResp) => {
      const ansVal = {
        qContentId: tempQContentId,
        resp: tempResp,
      };
      setTempAnsVal(tempAnsVal.concat(ansVal));
    };

    const deleteAnsVal = (tempQContentId) => {
      setTempAnsVal(tempAnsVal.filter(temp => temp.qContentId !== tempQContentId));
    }

    const updatedSvyRespConents = () => {
      const newList = replaceItemAtIndex(props.svyRespContents, index, {
        ...props.svyRespContents[index],
        ansVal: tempAnsVal,
      });
      props.setSvyRespContents(newList);
    }

    function replaceItemAtIndex(arr, index, newValue) {
      return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
    }

    const [checked, setChecked] = useState([]);
    const handleCheck = (event) => {
      const updatedList = [...checked];

      console.log("value: " + event.target.value);

      if (event.target.checked) {
        updatedList = [...checked, event.target.value];
        var idx = event.target.value;
        var targetIdx = props.qContents.findIndex((content) => content.qContentId === idx);

        console.log("idx: " + idx);
        console.log("targetIdx: " + targetIdx);
        // insertAnsVal(event.target.value, props.qContents[event.target.value - 1].qContentVal);
        insertAnsVal(event.target.value, props.qContents[targetIdx].qContentVal);
      } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
        deleteAnsVal(event.target.value);
      }

      setChecked(updatedList);
    }

  return (
    <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl">
      <div className="text-lg bg-fdyellowbright text-gray-900 indent-3">
        Question. {props.qNumber}
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
                        <label id="qContent" htmlFor="comments" className="font-medium text-gray-700">
                          {qContent.qContentVal}
                        </label>
                      </div>
                    </div>
                  </div>
                )
              })}
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
                              <label id="qContent" htmlFor="comments" className="font-medium text-gray-700">
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
  } else {
    console.log(props);
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
                                  // onChange={handleCheck}
                                  readOnly={true}
                                  checked = {qContent.qContentId === props.svyRespContents[index].ansVal[0].qContentId}
                                  value={qContent.qContentId}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label id="qContent" htmlFor="comments" className="font-medium text-gray-700">
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
}
