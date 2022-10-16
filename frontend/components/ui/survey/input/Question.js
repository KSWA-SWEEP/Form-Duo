import React, { useState, useRef, useCallback, useEffect } from 'react';
import ContentList from './ContentList';

import { CheckIcon, ChevronDoubleDownIcon, MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/20/solid';
import { PencilSquareIcon, StarIcon, ListBulletIcon, DocumentIcon, CalendarDaysIcon, TrashIcon } from "@heroicons/react/24/outline";


const Question = ({onRemoveQuestion, qId, name, qType, contentYn, svyContents, setSvyContents}) => {

    const [qTitle, setQTitle] = useState("");
    const [qInfo, setQInfo] = useState("");
    const index = svyContents.findIndex((svyContent) => svyContent.qId === qId);

    
    // qContentId 값으로 사용 될 id - ref 를 사용하여 변수 담기
    const nextId = useRef(1);

    const [qContents, setQContents] = useState([
        {
        qContentId: nextId.current,
        qContentVal: ""
        }
    ]);

    useEffect(() => {
        updateSvyContents();
    },
    [qContents]
    );

    const onInsert = useCallback(    
        e => {
        nextId.current += 1;
        const qContent = {
            qContentId: nextId.current,
            qContentVal: "",
        };
        setQContents(qContents.concat(qContent));
        e.preventDefault();
        },
        [qContents],
    );

    const updateSvyContents = () => {
        const newList = replaceItemAtIndex(svyContents, index, {
            ...svyContents[index],
            qContents: qContents,
        });
        setSvyContents(newList);
    }
        
    function replaceItemAtIndex(arr, index, newValue){
        return [...arr.slice(0, index), newValue, ...arr.slice(index+1)];
    }
    
    const onUpdate = qContentId => e => {
        
        const idx = qContents.findIndex((qContent) => qContent.qContentId === qContentId);
        let tempContents = [...qContents]; 
        tempContents[idx].qContentVal = e.target.value; 

        setQContents(tempContents);
    }
    
    const onRemoveContent = useCallback(
        qContentId => {
        setQContents(qContents.filter(qContent => qContent.qContentId !== qContentId));
        },
        [qContents],
    );
    
    const onChangeTitle = (e) => { 
        setQTitle(e.target.value)

        const newList = replaceItemAtIndex(svyContents, index, {
            ...svyContents[index],
            qTitle: qTitle,
        });
        setSvyContents(newList);
    };
    
    const onChangeInfo = (e) => { 
        setQInfo(e.target.value)

        const newList = replaceItemAtIndex(svyContents, index, {
            ...svyContents[index],
            qInfo: qInfo,
        });
        setSvyContents(newList);
    };

    return (
        <div className="mt-3 border-2 border-gray-100 shadow-lg rounded-2xl">
            <div className="overflow-hidden shadow rounded-2xl">
                <div className="px-4 py-5 bg-white sm:px-6 sm:pb-5">
                    <div className='flex items-center mx-2 mb-4 place-content-between'>
                        <div className='flex items-center text-fdblue'>
                            {/* 타입에 따라 icon 변경 */}
                            {
                                {
                                'Objective': <ListBulletIcon className='w-4 h-4'/>,
                                'Subjective': <PencilSquareIcon className='w-4 h-4'/>,
                                'Checkbox': <CheckIcon className='w-4 h-4'/>,
                                'Dropbox': <ChevronDoubleDownIcon className='w-4 h-4'/>,
                                'Date': <CalendarDaysIcon className='w-4 h-4'/>,
                                'Rating': <StarIcon className='w-4 h-4'/>,
                                'File': <DocumentIcon className='w-4 h-4'/>,
                                'Voice': <MicrophoneIcon className='w-4 h-4'/>,
                                'Video': <VideoCameraIcon className='w-4 h-4'/>
                                }[qType]
                            }
                            <p className='ml-2 text-xs'>
                                {name}
                            </p>
                        </div>
                        <div className='p-2 bg-red-100 rounded-md hover:bg-red-200'>
                            <TrashIcon className='w-4 h-4 text-red-700'  onClick={() => onRemoveQuestion(qId)}/>
                        </div>
                                                
                    </div>

                    {/* 질문 입력 */}
                    <input
                        type="text"
                        id="qTitle"
                        placeholder="질문을 입력하세요"
                        className="block w-full font-semibold border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-md"
                        onChange={onChangeTitle}
                    />

                    {/* 설명 입력 */}
                    <textarea
                        id="qInfo"
                        rows={2}
                        className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:border-gray-300 focus:ring-gray-300 sm:text-sm"
                        placeholder="문항에 대한 설명을 입력하세요 (생략 가능)"
                        defaultValue={''}
                        onChange={onChangeInfo}
                    />
                    
                    {/* content 입력 부분이 필요할 경우 */}
                    {
                        contentYn &&
                            <div>
                                <div className="mt-4 space-y-4">
                                <ContentList qContents={qContents} onRemoveContent={onRemoveContent} onUpdate={onUpdate}/>
                                </div>
                                <div className='flex justify-center'>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-3 py-2 mt-4 text-sm font-medium text-white duration-200 border border-transparent rounded-md shadow-sm sm:col-span-1 bg-neutral-400 hover:bg-neutral-500 hover:scale-105"
                                    onClick={onInsert}
                                >
                                    선택지 추가하기
                                </button>
                                </div>
                            </div>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Question;
  