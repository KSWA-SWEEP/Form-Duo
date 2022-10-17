import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DateInput(props) {

    const index = props.svyRespContents.findIndex((svyRespContent) => svyRespContent.qId === props.qId);
    const Today = new Date();
    const [answer, setAnswer] = useState(Today);
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


    const onChange = (date) => {
        setAnswer(date);
        setTempAnsVal([{ resp: date.toISOString()}]);
    }

    return (
        <div className="mt-5 border-2 border-gray-100 shadow-lg rounded-2xl">
            <div className="text-lg text-gray-900 bg-fdyellowbright indent-3">
                Question. {props.qNumber}
            </div>
            <div className="overflow-hidden shadow rounded-2xl">
                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                    <legend className="text-base font-medium text-gray-900 contents">{props.qTitle}</legend>
                    <p className="text-sm text-gray-500">{props.qInfo}</p>
                    <DatePicker
                        selected={answer}
                        onChange={onChange}
                        dateFormat="yyyy-MM-dd"
                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                    />
                </div>
            </div>
        </div>
    )
}
