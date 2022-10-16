import React, { Fragment, useState, useRef, useEffect, useCallback } from "react";
import ShowQuestionList from "./show/ShowQuestionList";
import ReactDOM from "react-dom";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import { useRouter } from 'next/router'
import SurveyTitleShow from "./SurveyTitleShow";

export default function SurveyResponse(props) {

    const router = useRouter()
    const [svyRespDt, setSvyRespDt] = useState("")
    const [svyRespContents, setSvyRespContents] = useState([])
    const [svyRespEmail, setSvyRespEmail] = useState("")
    const [svyContents, setSvyContents] = useState([])
    const [svyId, setSvyId] = useState(props.svyId)
    const [svyTitle, setSvyTitle] = useState("")
    const [svyIntro, setSvyIntro] = useState("")
    const [initContent, setInitContent] = useState("false");
    const [emailInfoMsg, setEmailInfoMsg] = useState("이메일 주소");
    const [checked, setChecked] = useState(false);

    const onRespEmailChange = (e) => {
        setSvyRespEmail(e.target.value)
    };

    const handleCheck = (event) => {
        if (event.target.checked) {
            setChecked(true);
        }
        else {
            setChecked(false);
        }

    }

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
    const [isFailModalOpen, setIsFailModalOpen] = useState(false)
    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false)

    const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/

    useEffect(() => {
        setSvyId(props.svyId);
    }, [props]);

    useEffect(() => {
        if (svyId !== undefined) {
            setSvyId(props.svyId);
            getSurvey();
        }
    }, [svyId]);

    async function getSurvey() {
        console.log(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys/' + props.svyId)
        try {
            const svyContents = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys/' + props.svyId);
            setSvyContents(svyContents.data);
            setSvyTitle(svyContents.data.svyTitle);
            setSvyIntro(svyContents.data.svyIntro);
            return svyContents;
        } catch (e) {
            console.log(e);
        }
    }

    function openSaveModal() {
        setIsSaveModalOpen(true)
    }

    function closeSaveModal() {
        setIsSaveModalOpen(false)
    }

    function openFailModal() {
        setIsFailModalOpen(true)
    }

    function closeFailModal() {
        setIsFailModalOpen(false)
    }

    function openSettingModal() {
        setIsSaveModalOpen(false)
        setIsSettingModalOpen(true)
    }

    function closeSettingModal() {
        setIsSettingModalOpen(false)
    }

    // 설문 응답 포맷 초기화
    const resContent = useRef([]);
    const initResContents = () => {

        const newList = [];
        svyContents.svyContent && svyContents.svyContent.map(question => {
            resContent.current = { qId: question.qId, qType: question.qType, ansVal: [{ qContentId: "", resp: "" }] }
            newList = [...newList, resContent.current];
        });
        setSvyRespContents(newList);
    }

    useEffect(() => {
        console.log("Changed svyRespContents: " + JSON.stringify(svyRespContents));
        if (svyRespContents.length != 0) {
            setInitContent("true");
        }
    }, [svyRespContents]);

    useEffect(() => {
        initResContents();
    }, [svyTitle, svyIntro]);

    function isValidEmail() {
        if (checked && !emailRegex.test(svyRespEmail)) {
            setEmailInfoMsg("올바른 이메일 형식으로 입력해 주세요.");
            return false;
        }
        return true;
    }

    function submitBasicSurvey() {

        if (isValidEmail()) {
            // 유효한 이메일인 경우 제출 허용
            closeSettingModal;

            const data = new Object();
            data.svyId = svyId;
            data.svyRespContent = svyRespContents;
            console.log("제출되는 설문 응답" + svyRespContents);
            makeResp(data);
        }
    }

    async function makeResp(data) {
        try {
            const result = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/v1/resp', data);
            setIsSettingModalOpen(false)
            router.push('/survey/share/finish', undefined, { shallow: true })
        } catch (e) {
            console.log(e);
            openFailModal();
        }
    }

    return (
        <div>
            {/* 제목 입력 */}
            <SurveyTitleShow bgColor="bg-fdyellowbright"
                svyTitle={svyTitle}
                svyIntro={svyIntro}
            />

            {initContent === "true" ? <ShowQuestionList svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} svyContents={svyContents} /> : <h1>세팅전</h1>}

            <div className="flex justify-center mx-2 rounded-md m-7 ">
                <a
                    onClick={openSaveModal}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-400 border border-transparent rounded-md hover:bg-blue-500"
                >
                    설문 제출하기
                </a>
                <Transition appear show={isSaveModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeSaveModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-extrabold leading-6 text-gray-900"
                                        >
                                            설문 제출
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                작성한 설문을 제출하시겠습니까?
                                            </p>
                                        </div>

                                        <div className="flex justify-center mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                                onClick={closeSaveModal}
                                            >
                                                이전
                                            </button>

                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none "
                                                onClick={openSettingModal}
                                            >
                                                제출
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition appear show={isSettingModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setIsSettingModalOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-extrabold leading-6 text-gray-900"
                                        >
                                            응답 내역 받기
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                이메일을 입력해 주시면 설문 응답 내역을 보내드립니다😚
                                            </p>
                                        </div>
                                        <div className="px-2 py-5 bg-white">
                                            <div className="\">
                                                <div className="flex">
                                                    {/* 이메일 수신 여부 체크박스 */}
                                                    <input
                                                        id="email"
                                                        type="checkbox"
                                                        className="w-4 h-4 mr-2 border-gray-300 rounded text-fdblue focus:ring-fdblue"
                                                        onChange={handleCheck}
                                                    />
                                                    <div className="w-4/5">
                                                        <p className="text-xs text-gray-500">
                                                            메일로 받기
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <label htmlFor="svyRespEmail" className="mt-6 block text-xs font-medium text-gray-500">
                                                        {emailInfoMsg}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="svyRespEmail"
                                                        id="svyRespEmail"
                                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        onChange={onRespEmailChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                                onClick={closeSettingModal}
                                            >
                                                이전
                                            </button>

                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none "
                                                onClick={submitBasicSurvey}
                                            >
                                                저장하기
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition appear show={isFailModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeFailModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-extrabold leading-6 text-gray-900"
                                        >
                                            설문 제출 실패
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                설문 제출에 실패하였습니다. 잠시후 다시 시도해주세요
                                            </p>
                                        </div>

                                        <div className="flex justify-center mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                                onClick={closeFailModal}
                                            >
                                                닫기
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

            </div>
        </div>


    );
};


