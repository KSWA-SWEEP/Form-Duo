import {getCookie, setCookie} from "cookies-next";
import {customAxios} from "../../utils/customAxios";
import axios, { AxiosResponse } from "axios";
import {useMemo, useState} from "react";

const SignIn = () => {
    setCookie("user_token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJramhAZ21haWwuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImlhdCI6MTY2NTU3OTc2MywiZXhwIjoxNjY1NTgxNTYzfQ.M8hUiwZHysWG786sJ-2SJdmQIsbN215gMeg_rb7fmF-w7u9Zg4UAicvyOAFx-GYuOAiPQFtQlRHp-6zCEytw2A")
    console.log(getCookie("user_token"))

    const [email, setEmail] = useState("kjh@gmail.com");
    const [password, setPass] = useState("test1234");
    const data = new Object();
    data.email = email;
    data.password = password;
    async function axiosRun(){
        try{
            const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/member');
            console.log("Result : " + JSON.stringify(result.data));
            return result;
        }catch(e){
            console.log(e);
        }
    }
    axiosRun().then(r => {console.log("Result : " + JSON.stringify(r.data));});

    // customAxios.post(process.env.NEXT_PUBLIC_API_URL+'/api/v1/auth/login', data)
    //     .then(res => {
    //         console.log("Login : " + JSON.stringify(res.data));
    //     })
    //

    // customAxios.get(process.env.NEXT_PUBLIC_API_URL+'/api/v1/member').then(res=>{
    //     console.log("Member : "+JSON.stringify(res.data))
    // })
    // const res = customAxios.get('/api/v1/member');
    // console.log("Response : "+ res);

    return (
        <>
            <h1>SignIn</h1>
        </>
    );
};

export default SignIn;
