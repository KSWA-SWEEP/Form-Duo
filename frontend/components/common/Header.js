import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Image from 'next/future/image';
import logoMixed from '../../public/img/mixed@3x.png'
import logoIcon from '../../public/img/icon@3x.png'
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"

import { Bars3Icon, DocumentTextIcon, MicrophoneIcon, XMarkIcon } from '@heroicons/react/24/outline'

// 임시 사용자 id
const userId = 'user001';

// 로그인 상태


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { name: '폼듀란?', href: '/about/formduo', current: false },
  { name: '설문 목록', href: '/survey/list/mySurvey', current: false },
  { name: '설문 제작', href: '/', current: false },
  { name: '설문 분석', href: '/survey/result/list', current: false },
  { name: '고객 지원', href: '/', current: false },
]

const navigationBeforeLogin = [
  { name: '폼듀란?', href: '/about/formduo', current: true },
  { name: '고객 지원', href: '/', current: false },
]

const userNavigation = [
  { name: '마이 페이지', href: '/mypage/'+userId},
  { name: '로그아웃', href: '/' },
]

const svyType = [
  { name: '일반 설문', href: '/survey/create/basic', icon: 'DocumentTextIcon' },
  { name: '듀오 설문', href: '/survey/create/duo', icon: 'MicrophoneIcon' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { data: session} = useSession()
  console.log(session);
  if(session){
    return (
      <>
        <div className="min-h-full mt-5">
          <Disclosure as="nav">
            {({ open }) => (
              <>
                <div className="px-4 mx-auto border-b-2 border-gray-100 max-w-7xl sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-24">
  
                    {/* logo */}
                    <div className="flex items-center duration-200 hover:scale-105">
                      <div className="flex-shrink-0">
                      <Link 
                          href={{
                              pathname: '/'
                          }} 
                      > 
                        <div className="flex items-center">
                          <Image
                            className="w-auto h-12 mr-3"
                            src={logoIcon}
                            alt="Form Duo"
                          />
                          <Image
                            className="w-auto h-10"
                            src={logoMixed}
                            alt="Form Duo"
                          />
                        </div>
                      </Link>
                      </div>
                    </div>
                    
                    {/* menu */}
                    <div className="flex items-center">
                      <div className="hidden md:block">
                        <div className="flex items-baseline space-x-6">
                          {navigation.map((item) => (
                            (
                              item.name == "설문 제작"
                              ?
                              // 설문 제작의 경우 바로 페이지로 넘어가지 않고 일반/듀오 선택
                              <Menu as="div" className="relative ml-3" key={item.name}>
                                    <div>
                                        <Menu.Button>
                                          <a
                                            className={classNames(
                                              item.current
                                                ? 'text-fdblue'
                                                : 'text-gray-700 hover:bg-fdbluelight hover:opacity-70 hover:text-white',
                                              'px-3 py-2 rounded-lg text-base font-semibold hover:scale-105 duration-200'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                          >
                                            {item.name}
                                          </a>
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
                                    <Menu.Items className="absolute z-10 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {svyType.map((item) => (
                                            <Menu.Item key={item.name}>
                                                  {({ active }) => (
                                                  <a
                                                      href={item.href}
                                                      className={classNames(
                                                      active ? 'bg-neutral-100' : '',
                                                      'content-center block px-4 py-2 text-sm font-bold text-gray-700 border-b-2 border-gray-100'
                                                      )}
                                                  >
                                                      <div className='flex items-center'>
                                                        {/* 타입에 따라 icon 변경 */}
                                                        {
                                                            {
                                                              'DocumentTextIcon': <DocumentTextIcon className='w-4 h-4 mr-2'/>,
                                                              'MicrophoneIcon': <MicrophoneIcon className='w-4 h-4 mr-2'/>,
                                                            }[item.icon]
                                                        }
                                                        {item.name}
                                                      </div>
                                                  </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                    </Transition>
                                </Menu>
                              :
                                <Link
                                  key={item.name}
                                  href={{
                                      pathname: item.href
                                    }} 
                                  className={classNames(
                                    item.current
                                      ? 'text-fdblue'
                                      : 'text-gray-700 hover:bg-fdbluelight hover:opacity-70 hover:text-white',
                                    'px-3 py-2 rounded-lg text-base font-semibold hover:scale-105 duration-200'
                                  )}
                                  aria-current={item.current ? 'page' : undefined}
                                  >
                                  {item.name}
                                </Link>
                              )
                          ))}
                        </div>
                      </div>
                    </div>
  
                    <>
                        Hello, {session.user.name} <br/>
                        <button onClick={() => signOut()}>Sign out</button>
                    </>
                    
                    <div className="flex -mr-2 md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-fdblue hover:bg-fdbluelight hover:text-fdblue focus:outline-none focus:ring-2 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
  
                <Disclosure.Panel className="md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-fdblue text-white' : 'text-gray-500 hover:bg-fdblue hover:text-white',
                          'block px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="pt-5 pb-3 border-t border-gray-500 border-opacity-40">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="w-10 h-10 rounded-full" src={user.imageUrl} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium leading-none text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <div className="px-2 mt-3 space-y-1">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:bg-neutral-500 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="min-h-full mt-5">
        <Disclosure as="nav">
          {({ open }) => (
            <>
              <div className="px-4 mx-auto border-b-2 border-gray-100 max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">

                  {/* logo */}
                  <div className="flex items-center duration-200 hover:scale-105">
                    <div className="flex-shrink-0">
                    <Link 
                        href={{
                            pathname: '/'
                        }} 
                    > 
                      <div className="flex items-center">
                        <Image
                          className="w-auto h-12 mr-3"
                          src={logoIcon}
                          alt="Form Duo"
                        />
                        <Image
                          className="w-auto h-10"
                          src={logoMixed}
                          alt="Form Duo"
                        />
                      </div>
                    </Link>
                    </div>
                  </div>
                  
                  {/* menu */}
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="flex items-baseline space-x-6">
                        {navigation.map((item) => (
                          (
                            item.name == "설문 제작"
                            ?
                            // 설문 제작의 경우 바로 페이지로 넘어가지 않고 일반/듀오 선택
                            <Menu as="div" className="relative ml-3" key={item.name}>
                                  <div>
                                      <Menu.Button>
                                        <a
                                          className={classNames(
                                            item.current
                                              ? 'text-fdblue'
                                              : 'text-gray-700 hover:bg-fdbluelight hover:opacity-70 hover:text-white',
                                            'px-3 py-2 rounded-lg text-base font-semibold hover:scale-105 duration-200'
                                          )}
                                          aria-current={item.current ? 'page' : undefined}
                                        >
                                          {item.name}
                                        </a>
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
                                  <Menu.Items className="absolute z-10 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      {svyType.map((item) => (
                                          <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                    active ? 'bg-neutral-100' : '',
                                                    'content-center block px-4 py-2 text-sm font-bold text-gray-700 border-b-2 border-gray-100'
                                                    )}
                                                >
                                                    <div className='flex items-center'>
                                                      {/* 타입에 따라 icon 변경 */}
                                                      {
                                                          {
                                                            'DocumentTextIcon': <DocumentTextIcon className='w-4 h-4 mr-2'/>,
                                                            'MicrophoneIcon': <MicrophoneIcon className='w-4 h-4 mr-2'/>,
                                                          }[item.icon]
                                                      }
                                                      {item.name}
                                                    </div>
                                                </a>
                                              )}
                                          </Menu.Item>
                                      ))}
                                  </Menu.Items>
                                  </Transition>
                              </Menu>
                            :
                              <Link
                                key={item.name}
                                href={{
                                    pathname: item.href
                                  }} 
                                className={classNames(
                                  item.current
                                    ? 'text-fdblue'
                                    : 'text-gray-700 hover:bg-fdbluelight hover:opacity-70 hover:text-white',
                                  'px-3 py-2 rounded-lg text-base font-semibold hover:scale-105 duration-200'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                                >
                                {item.name}
                              </Link>
                            )
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center ml-4 md:ml-6">
                      <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
                          <button onClick={() => signIn("kakao")} className="text-sm font-normal text-gray-500 duration-200 whitespace-nowrap hover:text-fdbluedark hover:scale-105">
                            Sign In with Kakao
                          </button>
                          <div className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105">
                            Sign Up
                          </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="flex -mr-2 md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-fdblue hover:bg-fdbluelight hover:text-fdblue focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-fdblue text-white' : 'text-gray-500 hover:bg-fdblue hover:text-white',
                        'block px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-5 pb-3 border-t border-gray-500 border-opacity-40">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="w-10 h-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium leading-none text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="px-2 mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 text-sm font-medium text-gray-500 rounded-md hover:bg-neutral-500 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}
