import Link from "next/link"
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Dialog, Menu, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect } from "react"
import svyThumbnail from '../../../public/img/svyThumbnail01.png'
import axios from "axios"
import Image from "next/image"
import Router, { useRouter } from "next/router"
import ReactDOM from 'react-dom';
import QR from "qrcode.react";
import { getCookie, getCookies } from "cookies-next"
import Loading from "../../common/Loading"

// 진행중 설문 세부 메뉴
const activeSurveyMenu = [
  { name: '설문 수정', href: '/survey/modify/' },
  { name: '설문 분석', href: '/survey/result/' },
  { name: '설문 삭제', href: 'deleteSvy' },
  { name: '설문 공유', href: 'shareSvy' },
  { name: '설문 미리보기', href: '/survey/preview/' },
  // { name: '설문 옵션 설정', href: '#' },
]

// 마감 설문 세부 메뉴
const closedSurveyMenu = [
  { name: '설문 분석', href: '/survey/result/' },
  { name: '설문 삭제', href: '#' },
  { name: '설문 미리보기', href: '/survey/preview/' },
]

export default function SurveyGridList() {
  const router = useRouter(); 
  const currentURL = router.asPath;
  const [svyList, setSvyList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isFailModalOpen, setIsFailModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [selectedSvyId, setSelectedSvyId] = useState()
  const [shareUrl, setShareUrl] = useState("")
  const [showQr, setShowQr] = useState(false)
  const [showCopyMsg, setShowCopyMsg] = useState(false)
  const [isTokenExist, setIsTokenExist] =useState("")
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // getSvyList()
    setIsTokenExist(getCookies("accessToken"))
  }, [])

  useEffect(() => {
    if((isTokenExist != "")&&(isTokenExist !== undefined)){
      getSvyList()
    }
  }, [isTokenExist])

  if (isLoading) return <Loading/>
  if (svyList.length == 0) return <div className="flex justify-center mt-20"><p>표시할 설문 목록이 없습니다</p></div>

  async function getSvyList(){
    try{
        axios.defaults.headers = {
          'Content-Type': "application/json",
          "Authorization": "Bearer " + getCookie("accessToken"),
        };
        const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys');
        setSvyList(result.data)
        setLoading(false)
    }catch (e) {
        console.log(e);
    }
  }

  function openDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  function openShareModal() {
    setIsShareModalOpen(true)
  }

  function closeShareModal() {
    setIsShareModalOpen(false)
  }

  function openFailModal() {
      setIsFailModalOpen(true)
  }

  function closeFailModal() {
      setIsFailModalOpen(false)
      location.reload();
  }

  function openSuccessModal() {
      setIsSuccessModalOpen(true)
  }

  function closeSuccessModal() {
      setIsSuccessModalOpen(false)
      location.reload();
  }

  function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
  }

  function showModal(type, svyId) {
    setSelectedSvyId(svyId);

    if(type == "설문 삭제") {
      openDeleteModal();
    }
    else if (type == "설문 공유"){
      // 수정 필요 - table 에 svy 타입 (duo / basic) 구분하는 column 가져오기
      console.log(">>>>>>>>>>>>>")
      console.log(process.env.NEXT_PUBLIC_BASE_URL+"/survey/share/basic/"+svyId);
      setShareUrl(process.env.NEXT_PUBLIC_BASE_URL+"/survey/share/basic/"+svyId)
      openShareModal();
    }
  }

  function deleteSvy(svyId){
    deleteSelected(svyId).then(r => {
      console.log(r);
      closeDeleteModal();
      openSuccessModal();
    });
  } 
  
  async function deleteSelected(svyId){
    try{
        const result = await axios.delete(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys/'+svyId);
        return result;
    }catch (e) {
        closeDeleteModal();
        openFailModal();
    }
  } 

  const downloadQr = (svyId) => {
    console.log(svyId)
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(shareUrl)
    setShowCopyMsg(showCopyMsg => !showCopyMsg)
  }
  
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">surveys</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {svyList.map((survey) => (
              <div key={survey.id} className="duration-200 rounded-2xl bg-neutral-100">
                  <div>
                      <div className="w-full overflow-hidden rounded-t-lg bg-neutral-200 aspect-w-16 aspect-h-9 xl:aspect-w-16 xl:aspect-h-9">
                          <Link
                              href={{
                                  pathname: '/survey/result/'+survey.id
                                  }} 
                              className="group"
                              >
                              <div>
                                <Image
                                  className="object-cover object-center w-full h-full"
                                  src={svyThumbnail}
                                  alt="Form Duo"
                                />
                              </div>
                          </Link>
                      </div>
                      <div className="flex justify-between m-4">
                          <div className="w-3/4">
                              <p className="text-base font-bold text-gray-900 truncate">{survey.svyTitle}</p>
                              <div className="mt-2">
                                <span className={( survey.svySt == "closed" ? "text-red-800 bg-red-100 dark:bg-red-200 dark:text-red-800" : "text-blue-800 bg-blue-100 dark:bg-blue-200 dark:text-blue-800") + " text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-lg"}>
                                    {survey.svySt == "closed"
                                        ? "마감"
                                        : "진행중"
                                    }
                                </span>
                                <span className="text-xs text-gray-700">{(survey.svyRegDt).substr(0, 10)} 생성됨</span>
                              </div>
                          </div>
                          <div>
                              <Menu as="div" className="relative ml-3">
                                  <div>
                                      <Menu.Button className="flex max-w-xs text-sm focus:outline-none">
                                          <EllipsisVerticalIcon className="block w-6 h-6"/>
                                      </Menu.Button>
                                  </div>
                                  <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                  >
                                  <Menu.Items className="absolute right-0 z-10 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      {(survey.svySt == "closed" ? closedSurveyMenu : activeSurveyMenu).map((item) => (
                                          <Menu.Item key={item.name}>
                                                  {
                                                    item.href.includes('/') 
                                                    ?
                                                    ({ active }) => (
                                                      <Link
                                                      href={{ pathname: item.href === '/survey/preview/' ? item.href + "basic" : item.href + survey.id, query: { svyId: survey.id, preURL: currentURL } }}
                                                    >
                                                      <div className={classNames(
                                                        active ? 'bg-neutral-100' : '',
                                                        'block px-4 py-2 text-sm  text-gray-700 border-b-2 border-gray-100'
                                                      )}>
                                                        {item.name}
                                                      </div>
                                                    </Link>
                                                    )
                                                    :
                                                    <a
                                                          onClick={() => showModal(item.name, survey.id)}
                                                          className='block px-4 py-2 text-sm text-gray-700 border-b-2 border-gray-100 hover:bg-neutral-100'
                                                          >
                                                          {item.name}
                                                      </a>
                                                  }
                                          </Menu.Item>
                                      ))}
                                  </Menu.Items>
                                  </Transition>
                              </Menu>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
        </div>
        
                    
        <Transition appear show={isDeleteModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
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
                     설문 삭제
                  </Dialog.Title>
                  <div className="mt-3">
                      <p className="text-sm text-gray-500">
                      설문을 삭제하시겠습니까?
                      </p>
                      <p className="mt-1 text-xs text-red-500">
                      🚨 삭제한 설문은 다시 복구할 수 없습니다.
                      </p>
                  </div>

                  <div className="flex justify-center mt-4">
                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                          onClick={closeDeleteModal}
                          >
                          닫기
                      </button>

                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none "
                          onClick={() => deleteSvy(selectedSvyId)}
                          >
                          설문 삭제하기
                      </button>
                  </div>
                  </Dialog.Panel>
              </Transition.Child>
              </div>
          </div>
          </Dialog>
        </Transition>

               
        <Transition appear show={isShareModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeShareModal}>
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
                     설문 공유
                  </Dialog.Title>

                  <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        QR코드나 링크를 통해 설문을 공유할 수 있습니다.
                      </p>

                      <div className="flex mt-2 rounded-md shadow-sm">
                        <input
                          type="text"
                          className="flex-1 block w-full text-xs text-gray-600 border-gray-300 rounded-none rounded-l-md focus:border-gray-300 focus:ring-0"
                          placeholder="경로"
                          value={shareUrl}
                          readOnly
                        />
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 hover:text-gray-600" onClick={() => copyUrl()}>
                          복사
                        </span>
                      </div>
                      {/* <p className="m-1 text-xs text-fdblue">
                        복사되었습니다.
                      </p> */}
                      { showCopyMsg 
                        ? 
                        <p className="m-1 text-xs text-fdblue">
                          복사되었습니다.
                        </p>
                        : 
                        null 
                      }
                  </div>

                  <div className="flex justify-center mt-4">
                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                          onClick={closeShareModal}
                          >
                          닫기
                      </button>

                      <button
                        type="button"
                        className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none " onClick={() => setShowQr(showQr => !showQr)}
                        >
                        QR코드 보기
                      </button>
                        
                  </div>
                  <div className="mx-5 mt-10 mb-5 w-100">
                    { showQr 
                      ? 
                      // <div className="flex place-content-between">
                      //   <QR
                      //       id="qr-gen"
                      //       value={shareUrl}
                      //       size={200}
                      //       imageSettings={{ src: shareUrl, width: 100, height: 100 }} //사이즈
                      //       level={"H"}
                      //       includeMargin={false} //QR 테두리 여부
                      //       bgColor={"#FFFFFF"} //배경색
                      //       fgColor={"#575757"} //QR색
                      //   />
                        
                      //   <div className="flex items-center h-100">
                      //     <button
                      //       type="button"
                      //       className="px-2 py-2 mx-2 text-xs font-semibold text-green-900 bg-green-100 border border-transparent rounded-md h-fit hover:bg-green-200 focus:outline-none " onClick={() => downloadQr(selectedSvyId)}
                      //       >
                      //       QR코드 다운로드
                      //     </button>
                      //   </div>
                      // </div>
                      <div className="flex justify-center">
                        <QR
                          id="qr-gen"
                          value={shareUrl}
                          size={200}
                          imageSettings={{ src: shareUrl, width: 100, height: 100 }} //사이즈
                          level={"H"}
                          includeMargin={false} //QR 테두리 여부
                          bgColor={"#FFFFFF"} //배경색
                          fgColor={"#575757"} //QR색
                          className="p-0 m-0"
                        />
                      </div>
                      
                      : 
                      null 
                    }
                  </div>
                  </Dialog.Panel>
              </Transition.Child>
              </div>
          </div>
          </Dialog>
        </Transition>

        
        
        <Transition appear show={isSuccessModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeSuccessModal}>
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
                        설문 삭제 성공
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        설문이 성공적으로 삭제되었습니다 
                        </p>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-green-700 bg-green-200 border border-transparent rounded-md hover:bg-green-300 focus:outline-none "
                            onClick={closeSuccessModal}
                            >
                            확인
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
                        오류 발생
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        오류가 발생하였습니다. 잠시후 다시 시도해주세요
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
  )
}
