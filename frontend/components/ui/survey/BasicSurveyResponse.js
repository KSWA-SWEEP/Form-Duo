import ShowQuestionList from "./show/ShowQuestionList";
import React, { Fragment, useState, useRef, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { useRecoilValue } from "recoil";
import { ansValState } from "../../../atoms/ansVal";
import { qIdState } from "../../../atoms/qId";
import CreateRespContents from "./response/CreateRespContents";


export default function BasicSurveyResponse() {

    const [svyRespDt, setSvyRespDt] = useState("")
    const [svyRespContents, setSvyRespContents] = useState([])

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false)

    const ansVal = useRecoilValue(ansValState);
    const qId = useRecoilValue(qIdState);

    function openSaveModal() {
        setIsSaveModalOpen(true)
    }

    function closeSaveModal() {
        setIsSaveModalOpen(false)
    }

    function openSettingModal() {
        setIsSaveModalOpen(false)
        setIsSettingModalOpen(true)
    }

    function closeSettingModal() {
        setIsSettingModalOpen(false)
    }

    function submitBasicSurvey() {

        closeSettingModal;

        const data = new Object();
        data.svyRespDt = svyRespDt;
        data.svyRespContents = svyRespContents;
        console.log("제출되는 설문응답: " + JSON.stringify(data));

        // axios.post('/api/v1/surveys', data)
        // .then(res => {
        //     console.log(res);
        // })

        // API.post(
        //         '/api/v1/surveys',
        //         data,
        //     )
        //     .then((response) => {
        //         console.log(response.status);
        //         console.log(response.data);
        //     })
        //     .catch((e) => console.log('something went wrong :(', e));
    }

    return (
        <div>
            <CreateRespContents svyRespContents={svyRespContents} setSvyRespContents={setSvyRespContents} />
            <ShowQuestionList />
            <div className="flex justify-center m-7 mx-2 rounded-md ">
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
                                                onClick={submitBasicSurvey}
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
            </div>
        </div>


    );
};


