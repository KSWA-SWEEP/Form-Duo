import React, {Fragment, useEffect, useState} from 'react'
import { Tab, Dialog, Transition, Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Question from "./input/Question";
import QboxQuestion from "./input/QboxQuestion";
import { Pagination } from "@mui/material";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Qbox = ({show, onHide, setSvyContents, svyContents, questionId}) => {
    //Test용 샘플 데이터
    let [sampleQsts] = useState({
        QBox: [
            {
                qId: 1,
                qTitle: '본인의 직업은 무엇입니까?',
                qInfo: '',
                qType: 'Objective',
                name: '객관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '학생',
                },{
                    qContentId: 2,
                    qContentVal: '주부',
                },{
                    qContentId: 3,
                    qContentVal: '회사원',
                },{
                    qContentId: 4,
                    qContentVal: '자영업자',
                },{
                    qContentId: 5,
                    qContentVal: '농부',
                },{
                    qContentId: 6,
                    qContentVal: '공무원',
                },{
                    qContentId: 7,
                    qContentVal: '엔지니어',
                },{
                    qContentId: 8,
                    qContentVal: '무직',
                }],
            },
            {
                qId: 2,
                qTitle: '나이를 입력하세요',
                qInfo: '설명',
                qType: 'Subjective',
                name: '주관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: false,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '',
                }],
            },
            {
                qId: 3,
                qTitle: '생일을 입력하세요.',
                qInfo: '',
                qType: 'Date',
                name: '날짜',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: false,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '',
                }],
            },{
                qId: 4,
                qTitle: '이메일을 입력하세요',
                qInfo: 'ex) test@gmail.com',
                qType: 'Subjective',
                name: '주관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '',
                }],
            },{
                qId: 5,
                qTitle: '오늘 점심 메뉴는?',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '한식',
                },{
                    qContentId: 2,
                    qContentVal: '양식',
                },{
                    qContentId: 3,
                    qContentVal: '중식',
                },{
                    qContentId: 4,
                    qContentVal: '일식',
                }],
            },{
                qId: 6,
                qTitle: '본인의 소속을 선택하세요.',
                qInfo: '정확히 일치하는 대학명이 없다면, 비슷한 계열의 대학을 선택하세요.',
                qType: 'Dropbox',
                name: '드롭박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '경영대학',
                },{
                    qContentId: 2,
                    qContentVal: '사회과학대학',
                },{
                    qContentId: 3,
                    qContentVal: '법과대학',
                },{
                    qContentId: 4,
                    qContentVal: 'IT융합대학',
                },{
                    qContentId: 5,
                    qContentVal: '사회과학대학',
                },{
                    qContentId: 6,
                    qContentVal: '예술체육대학',
                },{
                    qContentId: 7,
                    qContentVal: '공과대학',
                },{
                    qContentId: 8,
                    qContentVal: '의과대학',
                },{
                    qContentId: 9,
                    qContentVal: '인문대학',
                },],
            },{
                qId: 7,
                qTitle: '본인의 직책을 선택하세요.',
                qInfo: '객관식',
                qType: 'Objective',
                name: '객관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '사장',
                },{
                    qContentId: 2,
                    qContentVal: '부사장',
                },{
                    qContentId: 3,
                    qContentVal: '전무',
                },{
                    qContentId: 4,
                    qContentVal: '상무',
                },{
                    qContentId: 5,
                    qContentVal: '이사',
                },{
                    qContentId: 6,
                    qContentVal: '부장',
                },{
                    qContentId: 7,
                    qContentVal: '차장',
                },{
                    qContentId: 8,
                    qContentVal: '과장',
                },{
                    qContentId: 9,
                    qContentVal: '대리',
                },{
                    qContentId: 10,
                    qContentVal: '주임',
                },{
                    qContentId: 11,
                    qContentVal: '사원',
                },{
                    qContentId: 12,
                    qContentVal: '인턴',
                }],
            },{
                qId: 8,
                qTitle: '본인의 MBTI를 선택하세요.',
                qInfo: '',
                qType: 'Subjective',
                name: '주관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: 'INFJ',
                },{
                    qContentId: 2,
                    qContentVal: 'INFP',
                },{
                    qContentId: 3,
                    qContentVal: 'INTJ',
                },{
                    qContentId: 4,
                    qContentVal: 'INTP',
                },{
                    qContentId: 5,
                    qContentVal: 'ISFJ',
                },{
                    qContentId: 6,
                    qContentVal: 'ISFP',
                },{
                    qContentId: 7,
                    qContentVal: 'ISTJ',
                },{
                    qContentId: 8,
                    qContentVal: 'ISTP',
                },{
                    qContentId: 9,
                    qContentVal: 'ENFJ',
                },{
                    qContentId: 10,
                    qContentVal: 'ENFP',
                },{
                    qContentId: 11,
                    qContentVal: 'ENTJ',
                },{
                    qContentId: 12,
                    qContentVal: 'ENTP',
                },{
                    qContentId: 13,
                    qContentVal: 'ESFJ',
                },{
                    qContentId: 14,
                    qContentVal: 'ESFP',
                },{
                    qContentId: 15,
                    qContentVal: 'ESTJ',
                },{
                    qContentId: 16,
                    qContentVal: 'ESTP',
                }],
            },
        ],
        내가했던질문: [
            {
                qId: 1,
                qTitle: '오늘 내가 작성한 질문1',
                qInfo: '첫 설문 질문1',
                qType: 'Objective',
                name: '객관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '선택지 1번',
                },{
                    qContentId: 2,
                    qContentVal: '선택지 2번',
                }],
            },
            {
                qId: 2,
                qTitle: '오늘 내가 작성한 질문2',
                qInfo: '첫 설문 질문2',
                qType: 'Subjective',
                name: '주관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: false,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '',
                }],
            },
            {
                qId: 3,
                qTitle: '오늘 내가 작성한 질문3',
                qInfo: '첫 설문 질문3',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '선택지 1번',
                },{
                    qContentId: 2,
                    qContentVal: '선택지 2번',
                }],
            },{
                qId: 4,
                qTitle: '점심 메뉴 조사',
                qInfo: '오늘 점심 메뉴는?',
                qType: 'Objective',
                name: '객관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '한식',
                },{
                    qContentId: 2,
                    qContentVal: '양식',
                },{
                    qContentId: 3,
                    qContentVal: '중식',
                },{
                    qContentId: 4,
                    qContentVal: '일식',
                }],
            },{
                qId: 5,
                qTitle: '어제 저녁 메뉴는?',
                qInfo: '',
                qType: 'Subjective',
                name: '주관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: false,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '',
                }],
            },{
                qId: 6,
                qTitle: '장소를 선택해주세요',
                qInfo: '',
                qType: 'Objective',
                name: '객관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '한강',
                },{
                    qContentId: 2,
                    qContentVal: '롯데월드',
                },{
                    qContentId: 3,
                    qContentVal: '성수',
                },{
                    qContentId: 4,
                    qContentVal: '집콕',
                },{
                    qContentId: 5,
                    qContentVal: '학교',
                }],
            },{
                qId: 7,
                qTitle: '체크체크체크',
                qInfo: '',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '111',
                },{
                    qContentId: 2,
                    qContentVal: '222',
                },{
                    qContentId: 3,
                    qContentVal: '333',
                },{
                    qContentId: 4,
                    qContentVal: '444',
                }],
            },{
                qId: 8,
                qTitle: '주말에 먹고 싶은 메뉴',
                qInfo: '신중하게 답변해 주세요',
                qType: 'Subjective',
                name: '주관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: false,
                qContents: [{
                    qContentId: 1,
                    qContentVal: '',
                }],
            }
        ],
    })
    //페이지 설정
    const [nowTab, setNowTab] = useState("Qbox");
    const QLAST_PAGE = sampleQsts.QBox.length % 5 === 0 ?
        sampleQsts.QBox.length / 5 : sampleQsts.QBox.length / 5 + 1; // 마지막 페이지
    const MyLAST_PAGE = sampleQsts.내가했던질문.length % 5 === 0 ?
        sampleQsts.내가했던질문.length / 5 : sampleQsts.내가했던질문.length / 5 + 1; // 마지막 페이지
    const [page, setPage] = useState(1); // 처음 페이지는 1이다.
    const [Qdata, setData] = useState(sampleQsts.QBox.slice(5 * (page - 1)));

    useEffect(() => {
        // setData(/* fetch(또는 전체 데이터에서 slice)로 현재 page의 데이터를 가져온다. */);
        // 한 페이지에 5개씩 보여준다.
        if(nowTab === '내가했던질문') {
            if(page === MyLAST_PAGE){ // 마지막 페이지는 데이터가 5개보다 부족할 수도 있다.
                setData(sampleQsts.내가했던질문.slice(5 * (page - 1)));
            } else {
                setData(sampleQsts.내가했던질문.slice(5 * (page - 1), 5 * (page - 1) + 5));
            }
        }else{
            if(page === QLAST_PAGE){ // 마지막 페이지는 데이터가 5개보다 부족할 수도 있다.
                setData(sampleQsts.QBox.slice(5 * (page - 1)));
            } else {
                setData(sampleQsts.QBox.slice(5 * (page - 1), 5 * (page - 1) + 5));
            }
        }
    }, [page,nowTab]);

    useEffect(()=>{
        setPage(1)
        setNowTab('QBox')
    },[show])

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        console.log("Now Page : "+ event.target.getLabelText)
        console.log("Now Page : "+nowPageInt)
        setPage(nowPageInt);
    }


    const tabChanged = (e) => {
        console.log("tab change : " + e.target.name)
        setNowTab(e.target.name);
        setPage(1);
    }
    return (
        //Qbox 팝업
        <Transition appear show={show} onHide={onHide} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onHide}>
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div  className="w-full max-w-md px-2 py-16 sm:px-0">
                                <Tab.Group>
                                    {/*탭 상단 설정*/}
                                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                                        {Object.keys(sampleQsts).map((questions) => (
                                            <Tab
                                                key={questions}
                                                name = {questions}
                                                onClick={(e) => tabChanged(e)}
                                                className={({ selected }) =>
                                                    classNames(
                                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-fdbluedark',
                                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-fdbluelight focus:outline-none focus:ring-2',
                                                        selected
                                                            ? 'bg-white shadow'
                                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                    )
                                                }
                                            >
                                                {questions}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                    {/*탭 내부 페이지 설정*/}
                                    <Tab.Panels className="mt-2">
                                        {Object.values(sampleQsts).map((questions, idx) => (
                                            <Tab.Panel
                                                key={idx}
                                                className={classNames(
                                                    'rounded-xl bg-white p-3',
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-fdbluelight focus:outline-none focus:ring-2'
                                                )}
                                            >
                                                <ul>
                                                    {
                                                        Qdata.map((question) => (
                                                            <li
                                                                key={question.qId}
                                                                className="relative rounded-md p-2 hover:bg-gray-100"
                                                            >
                                                                {/*드롭다운을 통해 Question 내용 보여주기*/}
                                                                <Disclosure>
                                                                    {({ open }) => (
                                                                        <>
                                                                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-fdbluelight px-4 py-2 text-left text-sm font-medium text-gray-800 hover:bg-fdblue focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                                                <h3 className="text-sm font-medium leading-7 float-left">
                                                                                    {question.qTitle}
                                                                                </h3>
                                                                                <ul className="mt-2 flex float-right space-x-2 text-xs font-normal leading-4 text-gray-500">
                                                                                    <li>{question.name}</li>
                                                                                </ul>
                                                                                <ChevronUpIcon
                                                                                    className={`${
                                                                                        open ? 'rotate-180 transform' : ''
                                                                                    } h-5 w-5 text-gray-800`}
                                                                                />
                                                                            </Disclosure.Button>
                                                                            <Disclosure.Panel className="px-2 pt-2 pb-2 text-sm text-gray-500">
                                                                                {/*선택 된 Question 데이터 넣어서 보여주기*/}
                                                                                <QboxQuestion
                                                                                    qId={question.qId}
                                                                                    qTitle={question.qTitle}
                                                                                    qInfo={question.qInfo}
                                                                                    qType={question.qType}
                                                                                    qImage={question.qImage}
                                                                                    qVideo={question.qVideo}
                                                                                    qMulti={question.qMulti}
                                                                                    qContents={question.qContents}
                                                                                    name={question.name}
                                                                                    comp={question.qType}
                                                                                    contentYn={question.contentYn}
                                                                                    svyContents={svyContents}
                                                                                    setSvyContents={setSvyContents}
                                                                                    questionId={questionId}
                                                                                />
                                                                            </Disclosure.Panel>
                                                                        </>
                                                                    )}
                                                                </Disclosure>
                                                            </li>
                                                        ))}
                                                    <Pagination count={nowTab==='내가했던질문'?MyLAST_PAGE:QLAST_PAGE} defaultPage={1} boundaryCount={2}
                                                                sx={{margin: 2}} onChange={(e) => handlePage(e)}
                                                                className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap  hover:scale-105"/>
                                                    <div className="flex justify-center mt-2">
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                                            onClick={onHide}
                                                        >
                                                            닫기
                                                        </button>
                                                    </div>
                                                </ul>
                                            </Tab.Panel>
                                        ))}
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Qbox