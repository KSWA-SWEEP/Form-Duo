import {getCookie} from "cookies-next";
import axios from "axios";

async function checkAccessToken(token) {
    let acctoken = token

    // 현재 시간
    const today = new Date()
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);

    const now = year + '-' + month  + '-' + day+'T'+ hours + ':' + minutes  + ':' + seconds;
    // console.log("now : " + now + "  exp : " + getCookie("expTime").split('.')[0])
    // console.log(now < getCookie("expTime"))

    //token 값이 비어있거나 만료 시간이 지났으면, reissue
    if(!token || now > getCookie("expTime")){
        // console.log("isLogin : " + getCookie("isLogin"))
        if(sessionStorage.getItem("isLogin") == "true" || sessionStorage.getItem("isLogin") == true){
        //if(getCookie("isLogin") == "true" || getCookie("isLogin") == true){
            const result = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/api/v1/auth/reissue");

            acctoken = result.data["accessToken"];
            // console.log("## Reissue ## : " + acctoken)
            return acctoken;
        }
    }
    return acctoken
}
export default checkAccessToken