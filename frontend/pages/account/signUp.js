import { LockClosedIcon } from '@heroicons/react/20/solid'
import Image from 'next/future/image';
import logoIcon from '../../public/img/mixed.png'
import axios from "axios";
import {useRouter} from "next/router";
import {Fragment, useRef} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useState} from "react";

const SignUp = () =>{
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
        router.push('/account/signIn');
    }
    function openModal() {
        setIsOpen(true)
    }
    const router = useRouter();
    const userName = useRef("");
    const userEmail = useRef("");
    const userPw = useRef("");

    const onNameChange = (e) => {
        userName.current = e.target.value;
        console.log("userPw : "+userName.current);
    };
    const onEmailChange = (e) => {
        userEmail.current = e.target.value;
        console.log("Email : "+userEmail.current);
    };
    const onPwChange = (e) => {
        userPw.current = e.target.value;
        console.log("userPw : "+userPw.current);
    };

    async function reqSignup(){
        if(!userName.current){
            alert("이름을 입력해주세요.");
            return <SignUp></SignUp>;
        } else if(!userEmail.current){
            alert("이메일을 입력해주세요.");
            return <SignUp></SignUp>;
        } else if(!userPw.current){
            alert("비밀번호를 입력해주세요.");
            return <SignUp></SignUp>;
        }

        console.log("SignUp Request");
        const data = new Object();
        console.log("userName : " + userName.current);
        console.log("userEmail : " + userEmail.current);
        console.log("userPw : " + userPw.current);
        data.username = userName.current;
        data.email = userEmail.current;
        data.password = userPw.current;
        try{
            // const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/members');
            // const result = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/auth/reissue',data);
            const result = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/api/v1/auth/signup", data);

            console.log("Result : " + JSON.stringify(result.data));
            console.log("email : "+ result.data["email"]);
            openModal();
            return <></>;
        }catch(e){
            console.log(e);
        }finally {
        }
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <Image
                            className="w-40 h-auto mx-auto"
                            src={logoIcon}
                            alt="FormDuo"
                        />
                        <h2 className="mt-5 text-center text-1xl font-bold tracking-tight text-fdblue">
                            회원 가입
                        </h2>
                    </div>
                    <form className="mt-8 space-y-4" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="ml-2 block text-sm text-gray-900">
                                    사용자 이름
                                </label>
                                <input
                                    id="user-name"
                                    name="username"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-b-md rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="User name"
                                    onChange={onNameChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="ml-2 block text-sm text-gray-900">
                                    이메일 주소
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-b-md rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={onEmailChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="ml-2 block text-sm text-gray-900">
                                    비밀번호
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    onChange={onPwChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick ={reqSignup}
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-fdbluedark py-2 px-4 text-sm font-medium text-white hover:bg-fdblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-fdbluelight group-hover:text-fdbluedark" aria-hidden="true" />
                </span>
                                회원가입
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/*  signUp Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        회원 가입
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            회원가입이 완료되었습니다. 로그인 해주세요☺️
                                        </p>
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-2 py-2 mx-2 text-xs font-semibold border border-transparent rounded-md text-neutral-700 bg-neutral-200 hover:bg-neutral-300 focus:outline-none "
                                            onClick={closeModal}
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
        </>
    )
}
export  default SignUp;