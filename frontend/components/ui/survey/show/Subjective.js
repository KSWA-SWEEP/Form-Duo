import { useState, useEffect } from "react";

export default function Subjective(props) {

    const index = props.svyRespContents.findIndex((svyRespContent) => svyRespContent.qId === props.qId);


    // console.log(props)
    if (props.isModify){
        const [answer, setAnswer] = useState();

    const [tempAnsVal, setTempAnsVal] = useState([
        {
            qContentId: "",
            resp: "",
        }
    ]);

    useEffect(() => {
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
        setAnswer(event.target.value);
        setTempAnsVal({ resp: event.target.value });
    }


        return (
            <div className="mt-5 border-2 border-gray-100 rounded-2xl shadow-lg">
                <div className="text-lg bg-fdyellowbright text-gray-900 indent-3">
                    Question.{props.qNumber}
                </div>
                <div className="overflow-hidden shadow rounded-2xl">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <legend className="contents text-base font-medium text-gray-900">{props.qTitle}</legend>
                        <p className="text-sm text-gray-500">{props.qInfo}</p>
                        <div className="mt-1">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="you@example.com"
                                    value={answer}
                                    onChange={onChange}
                                />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="mt-5 border-2 border-gray-100 rounded-2xl shadow-lg">
                <div className="text-lg bg-fdyellowbright text-gray-900 indent-3">
                    Question.{props.qId}
                </div>
                <div className="overflow-hidden shadow rounded-2xl">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <legend className="contents text-base font-medium text-gray-900">{props.qTitle}</legend>
                        <p className="text-sm text-gray-500">{props.qInfo}</p>
                        <div className="mt-1">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="you@example.com"
                                        value={props.svyRespContents[index].ansVal[0].resp}
                                        readOnly={true}
                                    />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}






