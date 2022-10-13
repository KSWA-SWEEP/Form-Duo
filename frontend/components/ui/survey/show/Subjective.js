import { list } from "postcss";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { respState } from "../../../../atoms/resp";
import { qIdState } from "../../../../atoms/qId";
import { qContentIdState } from "../../../../atoms/qContentId";

export default function Subjective(props) {

    const [answer, setAnswer] = useState("");
    const onChange = (event) => {
        setAnswer(event.target.value);
        setResp(event.target.value);
        setQId(props.qId);
        setQContentId("");
    }
    const [resp, setResp] = useRecoilState(respState);
    const [qId, setQId] = useRecoilState(qIdState);
    const [qContentId, setQContentId] = useRecoilState(qContentIdState);

    return (
        <div className="mt-5 border-2 border-gray-100 rounded-2xl shadow-lg">
            <div className="text-lg bg-fdyellowbright text-gray-900 indent-3">
                Question. {props.qId}
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
