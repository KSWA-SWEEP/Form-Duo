import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Loading from "../../common/Loading";
import userBasicImg from "../../../public/img/userBasicImg.png"
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import {accToken} from '../../../atoms/accToken'
import {useRecoilState} from "recoil";


export default function UserInfo() {
  const [userData, setUserData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const [userPwd, setUserPwd] = useState("")
  const [userPwdCheck, setUserPwdCheck] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  
  const [isFailModalOpen, setIsFailModalOpen] = useState(false)
  const [isUserInfoChgModalOpen, setIsUserInfoChgModalOpen] = useState(false)

  const [pwdCheckState, setPwdCheckState] = useState(false);
  
  const [btnState, setBtnState] = useState(false);

  const [acctoken,setAcctoken] = useRecoilState(accToken);
  
  useEffect(() => {
    setLoading(true)
    getUserInfo()
    setPwdCheckState(false)
  }, [])

  useEffect(() => {
    // console.log((userName.length > 0)+" / "+(userEmail.length > 0)+" / "+(!pwdCheckState))
    if((userEmail.length > 0)&&(userName.length > 0)&&(pwdCheckState))
    {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [userEmail, userName, pwdCheckState])

  useEffect(() => {
    pwdCheck();
  }, [userPwd, userPwdCheck])

  function openUserInfoChgModal() {
    setIsUserInfoChgModalOpen(true)
  }

  function closeUserInfoChgModal() {
    setBtnState(false)
    setIsUserInfoChgModalOpen(false)
  }

  function openFailModal() {
      setIsFailModalOpen(true)
  }

  function closeFailModal() {
      setIsFailModalOpen(false)
  }

  function updateUserInfo() {
      closeUserInfoChgModal();

      const data = new Object();
      data.email = userEmail;
      data.username = userName;
      data.password = userPwd;
      updateUser(data);
  }

  async function updateUser(data){
      try{
          const result = await axios.put(process.env.NEXT_PUBLIC_API_URL + '/api/v1/members',data);
          setIsUserInfoChgModalOpen(false)
          location.reload();
      }catch (e) {
          console.log(e);
          openFailModal();
      }
  }

  if (isLoading) return <Loading/>
  if (!userData) return <div className="flex justify-center mt-20"><p>유저 정보가 없습니다.</p></div>

  async function getUserInfo(){
    try{
        const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/members', {
          headers: {
            'Authorization': `Bearer ${acctoken}`
          }});
        setUserData(result.data)
        setLoading(false)
        setUserEmail(result.data.email)
        setUserName(result.data.username)
    }catch (e) {
        console.log(e);
    }
  }
  
  function pwdCheck() {
    if(userPwd == userPwdCheck) {
      setPwdCheckState(true);
    } else {
      setPwdCheckState(false)
    }
  }  

  return (
    <div className="flex items-center justify-center bg-white mt-28">
      <div className="flex overflow-hidden rounded-full h-36 w-36 custom-profile-position bg-neutral-300">
        <Image
          src={userBasicImg}
          className="w-100 h-100"/>
      </div>
      <div className="flex items-center justify-start w-1/3 bg-white ml-14 md:h-56">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-2xl" data-testid="name">
            {userData.username}
          </h1>
          <p className="mt-2 text-base text-gray-500 sm:mx-auto sm:mt-2 sm:max-w-xl sm:text-base md:mt-2 md:text-lg lg:mx-0">
            {userData.email}
          </p>
          <div className="mt-5 sm:mt-5 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                onClick={openUserInfoChgModal}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white border border-transparent rounded-md bg-neutral-400 hover:bg-neutral-500 md:py-2 md:px-3 md:text-sm"
              >
                개인정보 수정
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Transition appear show={isUserInfoChgModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeUserInfoChgModal}>
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
                      data-testid="modify"
                  >
                      개인정보 수정
                  </Dialog.Title>
                  <div className="px-2 py-5 bg-white">
                      <div className="grid grid-cols-6 gap-2">
                          <div className="col-span-6">
                          <label htmlFor="userName" className="block text-xs font-medium text-gray-500">
                              이름 
                          </label>
                          <input
                              type="text"
                              name="userName"
                              id="userName"
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                              onChange={(e) => setUserName(e.target.value)}
                              defaultValue={userName}
                              data-testid="nameModify"
                          />
                          </div>

                          <div className="col-span-6 mt-2">
                          <label htmlFor="userEmail" className="block text-xs font-medium text-gray-500">
                              이메일
                          </label>
                          <input
                              type="text"
                              name="userEmail"
                              id="userEmail"
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                              onChange={(e) => setUserEmail(e.target.value)}
                              value={userEmail}
                              readOnly
                          />
                          </div>

                          <div className="col-span-3 mt-2">
                          <label htmlFor="userPwd" className="block text-xs font-medium text-gray-500">
                              비밀번호
                          </label>
                          <input
                              type="password"
                              name="userPwd"
                              id="userPwd"
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                              onChange={(e) => setUserPwd(e.target.value)}
                          />
                          </div>
                          
                          <div className="col-span-3 mt-2">
                          <label htmlFor="userPwdCheck" className="block text-xs font-medium text-gray-500">
                              비밀번호 확인
                          </label>
                          <input
                              type="password"
                              name="userPwdCheck"
                              id="userPwdCheck"
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-fdyellow focus:ring-fdyellow sm:text-sm"
                              onChange={(e) => setUserPwdCheck(e.target.value)}
                          />
                          </div>

                          {
                            !pwdCheckState
                            ? 
                            <div className="col-span-6">
                              <p className="text-xs text-red-600">비밀번호와 일치한 비밀번호 확인을 입력하세요</p>
                            </div>
                            :
                            <></>
                          }

                      </div>
                  </div>

                  <div className="flex justify-center mt-4">
                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                          onClick={closeUserInfoChgModal}
                          >
                          닫기
                      </button>

                      <button
                          type="button"
                          className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md disabled:bg-neutral-200 disabled:text-neutral-300 hover:bg-blue-200 focus:outline-none "
                          onClick={updateUserInfo}
                          disabled={!btnState}
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
                      사용자 정보 수정 실패
                  </Dialog.Title>
                  <div className="mt-2">
                      <p className="text-sm text-gray-500">
                      사용자 정보 수정에 실패하였습니다. 잠시후 다시 시도해주세요
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
  )
}
  