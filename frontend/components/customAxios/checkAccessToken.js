import { getCookie, setCookie } from "cookies-next";

async function checkAccessToken(token) {
    let acctoken = token
    let isLogin = getCookie("isLogin")
    let expTime = getCookie("expTime")
    // let isLogin = sessionStorage.getItem("isLogin")
    // let expTime = sessionStorage.getItem("expTime")

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
    if(token == "" || token == "undefined" || now > expTime){
        const response = await fetch('/api/auth/reissue', {
            method: 'POST',
            body: JSON.stringify({ token: acctoken, isLogin : sessionStorage.getItem("isLogin"), expTime : sessionStorage.getItem("expTime") }),
            headers: {
                'Content-type': 'application/json',
            }
        });

        const data = await response.json();
        let jsonData = JSON.parse(data);

        // 만료 시간 sessionStorage에 저장
        // sessionStorage.setItem("expTime",jsonData.expTime);

        // 만료 시간 cookie에 저장
        setCookie("expTime",jsonData.expTime)

        return jsonData.accessToken;
    }
    return token
}
export default checkAccessToken