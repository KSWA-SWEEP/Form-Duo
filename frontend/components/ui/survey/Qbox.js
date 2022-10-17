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
                qTitle: '객관식 입니다.',
                qInfo: '설명',
                qType: 'Objective',
                name: '객관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '객관식1',
                },{
                    qContentId: 1,
                    qContentVal: '객관식2',
                }],
            },
            {
                qId: 2,
                qTitle: '주관식 입니다.',
                qInfo: '설명',
                qType: 'Subjective',
                name: '주관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: false,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '',
                }],
            },
            {
                qId: 3,
                qTitle: '체크박스 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 4,
                qTitle: '체크박스 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 5,
                qTitle: '체크박스 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 6,
                qTitle: '체크박스 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 7,
                qTitle: '체크박스 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 8,
                qTitle: '체크박스 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 9,
                qTitle: '체크박스 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 10,
                qTitle: '체크박스 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },
        ],
        내가했던질문: [
            {
                qId: 1,
                qTitle: '객관식2 입니다.',
                qInfo: '설명',
                qType: 'Objective',
                name: '객관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '객관식1',
                },{
                    qContentId: 1,
                    qContentVal: '객관식2',
                }],
            },
            {
                qId: 2,
                qTitle: '주관식2 입니다.',
                qInfo: '설명',
                qType: 'Subjective',
                name: '주관식',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: false,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '',
                }],
            },
            {
                qId: 3,
                qTitle: '체크박스2 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 4,
                qTitle: '체크박스3 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 5,
                qTitle: '체크박스4 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 6,
                qTitle: '체크박스5 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 7,
                qTitle: '체크박스6 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 8,
                qTitle: '체크박스7 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 9,
                qTitle: '체크박스8 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },{
                qId: 10,
                qTitle: '체크박스9 입니다.',
                qInfo: '설명',
                qType: 'Checkbox',
                name: '체크박스',
                qImage: '',
                qVideo: '',
                qMulti: '',
                contentYn: true,
                qContents: [{
                    qContentId: 0,
                    qContentVal: '체크1',
                },{
                    qContentId: 1,
                    qContentVal: '체크2',
                }],
            },
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