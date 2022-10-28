import { useState, useEffect } from "react";

export default function Dropdox(props) {

  const index = props.svyRespContents.findIndex((svyRespContent) => svyRespContent.qId === props.qId);

  const [tempAnsVal, setTempAnsVal] = useState(
      props.svyRespContents[index].ansVal[0].qContentId === "" && props.svyRespContents[index].ansVal[0].resp === ""
          ? [{
            qContentId: "",
            resp: "",
          }] : props.svyRespContents.ansVal);

  useEffect(() => {
          if (props.isModify)
            updatedSvyRespConents();
  },
    [tempAnsVal]
  );

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

  const onChange = (event) => {

    var idx = event.target.selectedIndex;
    setTempAnsVal([{ qContentId: event.target.value, resp: event.target[idx].text }]);
  }


  if (props.isModify) {

    return (
      <div className="mt-5 border-2 border-gray-100 rounded-2xl shadow-lg">
        <div className="text-lg bg-fdyellowbright text-gray-900 indent-3">
          Question. {props.qNumber}
        </div>
        <div className="overflow-hidden shadow rounded-2xl">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div className="col-span-6 sm:col-span-3">
              <legend className="contents text-base font-medium text-gray-900">{props.qTitle}</legend>
              <p className="text-sm text-gray-500">{props.qInfo}</p>
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                onChange={onChange}
              >
                <option value="">선택지를 선택해주세요</option>
                {props.qContents && props.qContents.map((qContent) => {
                  return (
                    <option key={qContent.qContentId} value={qContent.qContentId} >{qContent.qContentVal}</option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {

    return (

      <div className="mt-5 border-2 border-gray-100 rounded-2xl shadow-lg">
        <div className="text-lg bg-fdyellowbright text-gray-900 indent-3">
          Question. {props.qNumber}
        </div>
        <div className="overflow-hidden shadow rounded-2xl">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div className="col-span-6 sm:col-span-3">
              <legend className="contents text-base font-medium text-gray-900">{props.qTitle}</legend>
              <p className="text-sm text-gray-500">{props.qInfo}</p>
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue={props.svyRespContents[index].ansVal[0].qContentId}
                disabled={true}
              >
                {props.qContents && props.qContents.map((qContent, idx) => {
      
                  return (
                    <option key={qContent.qContentId} value={qContent.qContentId} selected={props.svyRespContents[index].ansVal[0].qContentId === (idx+1).toString()} >{qContent.qContentVal}</option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
