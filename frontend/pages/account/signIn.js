import { LockClosedIcon } from '@heroicons/react/20/solid'
import Image from 'next/future/image';
import logoIcon from '../../public/img/mixed.png'
import Link from "next/link";
import {useRecoilState} from "recoil";
import {useState} from "react";
import {useRef} from "react";
import axios from "axios";
import {accToken} from '../../atoms/accToken'
import {refToken} from '../../atoms/refToken'
import {signOut} from "next-auth/react";
import MainPage from "../../components/ui/MainPage";

import { useRouter } from 'next/router'

const SignIn =()=> {
    const router = useRouter();
    const userEmail = useRef("");
    const userPw = useRef("");
    const [acctoken,setAcctoken] = useRecoilState(accToken);
    const [reftoken,setReftoken] = useRecoilState(refToken);

    const onEmailChange = (e) => {
        userEmail.current = e.target.value;
        console.log("Email : "+userEmail.current);
    };
    const onPwChange = (e) => {
        userPw.current = e.target.value;
        console.log("userPw : "+userPw.current);
    };

    async function reqLogin(){
        console.log("userEmail : " + userEmail.current);
        console.log("userPw : " + userPw.current);
        if(!userEmail.current){
            alert("이메일을 입력해주세요.");
            return <SignIn></SignIn>;
        }else if(!userPw.current){
            alert("비밀번호를 입력해주세요.");
            return <SignIn></SignIn>;
        }
        console.log("Login Request");
        const data = new Object();
        console.log("userEmail : " + userEmail.current);
        console.log("userPw : " + userPw.current);
        data.email = userEmail.current;
        data.password = userPw.current;
        try{
            // const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/members');
            // const result = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/auth/reissue',data);
            const result = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/api/v1/auth/login", data);

            console.log("Result : " + JSON.stringify(result.data));
            console.log("accessToken : "+ result.data["accessToken"]);
            console.log("refreshToken : "+ result.data["refreshToken"]);

            setAcctoken(result.data["accessToken"]);
            // console.log("req : "+ acctoken);

            setReftoken(result.data["refreshToken"]);
            // console.log("res : "+ useRecoilValue(refToken));

            await router.push('/');
            return <></>;
        }catch(e){
            console.log(e);
        }
    }

    // function reqLogin() {
    //     console.log("Login Request")
    //     login().then(r => {console.log("Result : " + JSON.stringify(r.data));});
    //     return <Link href='/'></Link>
    // }
    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <Image
                            className="w-60 h-auto mx-auto"
                            src={logoIcon}
                            alt="FormDuo"
                        />
                        <h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-fdblue">
                            로그인
                        </h2>
                    </div>
                    <form className="mt-8 space-y-4" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                    onChange={onEmailChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                    onChange={onPwChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center float-right justify-between">
                            {/*<div className="flex items-center">*/}
                            {/*    <input*/}
                            {/*        id="remember-me"*/}
                            {/*        name="remember-me"*/}
                            {/*        type="checkbox"*/}
                            {/*        className="h-4 w-4 rounded border-fdblue text-fdblue focus:ring-fdblue"*/}
                            {/*    />*/}
                            {/*    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">*/}
                            {/*        Remember me*/}
                            {/*    </label>*/}
                            {/*</div>*/}

                            <div className="text-sm">
                                <Link
                                    href="/account/signUp"
                                >
                                <a className="font-bold text-fdbluedark hover:text-fdblue">
                                    회원가입
                                </a>
                                </Link>
                            </div>
                        </div>

                        <div>
                                <button
                                    type="button"
                                    onClick={() => reqLogin()}
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-fdbluedark py-2 px-4 text-sm font-medium text-white hover:bg-fdblue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-fdbluelight group-hover:text-fdbluedark" aria-hidden="true" />
                </span>
                                    로그인
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};
export  default SignIn;