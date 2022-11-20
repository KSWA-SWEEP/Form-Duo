import axios from "axios";
import {getCookie} from "cookies-next";

export default async function handler(req, res) {
    const data = new Object();

    let token = req.body.token;
    const isLogin = req.body.isLogin;
    const expTime = req.body.expTime;

    // 현재 시간
    const today = new Date()
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);

    const now = year + '-' + month  + '-' + day+'T'+ hours + ':' + minutes  + ':' + seconds;

    console.log(token)
    console.log(isLogin)
    console.log(expTime)
    //token 값이 비어있거나 만료 시간이 지났으면, reissue
    if(token = "" || token == "undefined" || now > expTime){
        console.log("~~~~")
        if(isLogin == "true"){
            const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/reissue"
            try {
                const response = await axios.post(url);
                console.log(">> "+JSON.stringify(response));
                res.status(200).json(JSON.stringify(response.data));
            } catch (err) {
                res.status(500).end();
            }
        } else {
            res.status(500).end();
        }
    } else {
        let data = new Object();
        data.accessToken = req.token;
        data.expTime = expTime;
        console.log(">>>>> "+JSON.stringify(response));
        res.status(200).json(JSON.stringify(data));
    }

}