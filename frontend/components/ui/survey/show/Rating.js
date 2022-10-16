import { useState } from "react";

export default function Rating(props) {

    const [answer, setAnswer] = useState(1);
    const onChange = (event) => {
        setAnswer(event.target.value);
    }

    return (
        <div className="mt-5 border-2 border-gray-100 rounded-2xl shadow-lg">
            <div className="text-lg bg-fdyellowbright text-gray-900 indent-3">
                Question. {props.qNumber}
            </div>
            <div className="overflow-hidden shadow rounded-2xl">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <legend className="contents text-base font-medium text-gray-900">{props.qTitle}</legend>
                    <p className="text-sm text-gray-500">{props.qInfo}</p>
                    <h2>Rating 입력 추가 예정</h2>
                </div>
            </div>
        </div>
    )
}
