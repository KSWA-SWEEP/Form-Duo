import Link from "next/link"
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Menu, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect } from "react"
import svyThumbnail from '../../../public/img/svyThumbnail01.png'
import axios from "axios"
import Image from "next/image"
import Router, { useRouter } from "next/router"
// 진행중 설문 세부 메뉴

const activeSurveyMenu = [
  { name: '설문 수정', href: '/survey/create/' },
  { name: '설문 분석', href: '/survey/result/' },
  { name: '설문 삭제', href: '#' },
  { name: '설문 공유', href: '#' },
  { name: '설문 미리보기', href: '/survey/preview/' },
  { name: '설문 옵션 설정', href: '#' },
]

// 마감 설문 세부 메뉴
const closedSurveyMenu = [
  { name: '설문 분석', href: '/survey/result/' },
  { name: '설문 삭제', href: '#' },
  { name: '설문 미리보기', href: '/survey/preview/' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
  
export default function SurveyGridList() {
  const router = useRouter(); 
  const [svyList, setSvyList] = useState([]);

  useEffect(() => {
    return () => {
      getSvyList().then(r => {
        setSvyList(r.data)
      });
     }
   }, []);
   

  async function getSvyList(){
    try{
        const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys');
        return result;
    }catch (e) {
        console.log(e);
    }
  } 

  
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">surveys</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {svyList.map((survey) => (
              <div key={survey.id} className="duration-200 rounded-2xl bg-neutral-50 hover:opacity-70 hover:scale-105">
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
                                <span className="text-xs text-gray-700">20XX. XX. XX 생성</span>
                                {/* <span className="text-xs text-gray-700">{survey.regDt}</span> */}
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
                                          <Menu.Item key={item.name} className="absolute">
                                                {({ active }) => (
                                                <a
                                                    href={item.href + survey.id}
                                                    className={classNames(
                                                    active ? 'bg-neutral-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700 border-b-2 border-gray-100'
                                                    )}
                                                >
                                                    {item.name}
                                                </a>
                                              )}
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
      </div>
    </div>
  )
}
