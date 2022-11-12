import {getCookie} from "cookies-next";
import axios from "axios";

async function CheckAxiosToken(token) {
    let acctoken = token
    //token 값이 비어있다면, reissue
    if(!token){
        // console.log("isLogin : " + getCookie("isLogin"))
        if(getCookie("isLogin") == "true" || getCookie("isLogin") == true){
            const result = await axios.post(process.env.NEXT_PUBLIC_API_URL+"/api/v1/auth/reissue");

            acctoken = result.data["accessToken"];
            // console.log("## Reissue ## : " + acctoken)
            return acctoken;
        }
    }
    return acctoken
}
export default CheckAxiosToken