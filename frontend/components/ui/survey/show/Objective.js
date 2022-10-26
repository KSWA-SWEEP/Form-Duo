import { useEffect, useState } from "react";

export default function Objective(props) {

  const index = props.svyRespContents.findIndex((svyRespContent) => svyRespContent.qId === props.qId);

  const [tempAnsVal, setTempAnsVal] = useState(
      props.svyRespContents[index].ansVal[0].qContentId === "" && props.svyRespContents[index].ansVal[0].resp === ""
          ? [{
            qContentId: "",
            resp: "",
          }] : props.svyRespContents.ansVal);

  useEffect(() => {
        if (props.isModify)
          updatedSvyRespContents();
      },
      [tempAnsVal]
  );

  // console.log("### qContents: " + JSON.stringify(props.qContents));

  const updatedSvyRespContents = () => {
    console.log("## tempAnsVal: " + JSON.stringify(tempAnsVal));
    const newList = replaceItemAtIndex(props.svyRespContents, index, {
      ...props.svyRespContents[index],
      ansVal: tempAnsVal,
    });
    props.setSvyRespContents(newList);
  }

  function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  if (props.isModify) {

    const onChange = (event) => {
      setTempAnsVal([{ qContentId: event.target.value, resp: props.qContents[event.target.value - 1].qContentVal }]);
    }

    return (

        <div className="mt-5 border-2 border-gray-100 rounded-2xl shadow-lg">
          <div className="text-lg bg-fdyellowbright text-gray-900 indent-3">
            Question. {props.qNumber}
          </div>
          <div className="overflow-hidden shadow rounded-2xl">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <fieldset>
                <legend className="contents text-base font-medium text-gray-900">{props.qTitle}</legend>
                <p className="text-sm text-gray-500">{props.qInfo}</p>
                <div className="mt-4 space-y-4">

                  {props.qContents && props.qContents.map((qContent) => {
                    return (
                        <div key={qContent.qContentId}>
                          <div className="flex items-center">
                            <input
                                id="push-everything"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={onChange}
                                value={qContent.qContentId}
                            />
                            <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                              {qContent.qContentVal}
                            </label>
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
  else {
    console.log(props);
    return (
        <div className="mt-5 border-2 border-gray-100 rounded-2xl shadow-lg">
          <div className="text-lg bg-fdyellowbright text-gray-900 indent-3">
              Question. {props.qNumber}
          </div>
          <div className="overflow-hidden shadow rounded-2xl">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <fieldset>
                <legend className="contents text-base font-medium text-gray-900">{props.qTitle}</legend>
                <p className="text-sm text-gray-500">{props.qInfo}</p>
                <div className="mt-4 space-y-4">

                  {props.qContents && props.qContents.map((qContent, idx) => {
                    // console.log(idx.toString(), props.svyRespContents[index].ansVal[0].qContentId)
                    return (

                        <div key={qContent.qContentId}>
                          <div className="flex items-center">
                            <input
                                id="push-everything"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                checked={(idx+1).toString() === props.svyRespContents[index].ansVal[0].qContentId}
                                readOnly={true}
                                value={qContent.qContentId}
                            />
                            {/* {JSON.stringify(qContent)} */}
                            <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                              {qContent.qContentVal}
                            </label>
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
