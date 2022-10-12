import Link from "next/link"
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"

// 임시 survey data
const surveys = [
    {
      surveyId: 1,
      title: '설문 001',
      state: 'closed',
      regDt: '2022. 04. 07',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'survey thumbnail',
    },
    {
      surveyId: 2,
      title: '설문 002',
      state: 'opened',
      regDt: '2022. 08. 11',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'survey thumbnail',
    },
    {
      surveyId: 3,
      title: '설문 003',
      state: 'closed',
      regDt: '2022. 09. 02',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'survey thumbnail',
    },
    {
      surveyId: 4,
      title: '제목이 긴 설문 000001',
      state: 'closed',
      regDt: '2022. 10. 03',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'survey thumbnail',
    },
]

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
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">surveys</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {surveys.map((survey) => (
              <div key={survey.surveyId} className="duration-200 rounded-2xl bg-neutral-50 hover:opacity-70 hover:scale-105">
                  <div>
                      <div className="w-full overflow-hidden bg-neutral-200 rounded-t-lg aspect-w-4 aspect-h-3 xl:aspect-w-4 xl:aspect-h-3">
                          <Link
                              href={{
                                  pathname: '/survey/result/'+survey.surveyId
                                  }} 
                              className="group"
                              >
                              <img
                              src={survey.imageSrc}
                              alt={survey.imageAlt}
                              className="object-cover object-center w-full h-full"
                              />
                          </Link>
                      </div>
                      <div className="flex justify-between m-4">
                          <div className="w-2/3">
                              <p className="text-base font-bold text-gray-900 truncate">{survey.title}</p>
                              <div className="mt-2">
                                <span className={( survey.state == "closed" ? "text-red-800 bg-red-100 dark:bg-red-200 dark:text-red-800" : "text-blue-800 bg-blue-100 dark:bg-blue-200 dark:text-blue-800") + " text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-lg"}>
                                    {survey.state == "closed"
                                        ? "마감"
                                        : "진행중"
                                    }
                                </span>
                                <span className="text-xs text-gray-700">{survey.regDt}</span>
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
                                      {(survey.state == "closed" ? closedSurveyMenu : activeSurveyMenu).map((item) => (
                                          <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                <a
                                                    href={item.href + survey.surveyId}
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
