import axios from "axios";
import {getCookie} from "cookies-next";

async function CustomAxios(type, url, token, data) {
    let result
    if (data == null || data == undefined) {
        data = {}
    }

    if(getCookie("isLogin") == true && token !== ""){
        switch (type) {
            case 'get' :
                // console.log("##GETTING##  " + token + "  " + "   " + url)
                result = await axios.get(process.env.NEXT_PUBLIC_API_URL + url, {
                    headers: {
                        withCredentials: true,
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                });
                return result;
            case 'put' :
                // console.log("##PUTTING##")
                result = await axios.put(process.env.NEXT_PUBLIC_API_URL + url, data, {
                    headers: {
                        withCredentials: true,
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                });

                return result;
            case 'post' :
                // console.log("##POSTTING##"+ token + "  " + "   " + url)
                result = await axios.post(process.env.NEXT_PUBLIC_API_URL + url, data, {
                    headers: {
                        withCredentials: true,
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                });
                return result
            case 'delete' :
                // console.log("##POSTTING##"+ token + "  " + "   " + url)
                result = await axios.delete(process.env.NEXT_PUBLIC_API_URL + url, {
                    headers: {
                        withCredentials: true,
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                });
                return result
            default:
                return {}
        }
    }else{
        switch (type) {
            case 'get' :
                // console.log("##GETTING##  " + "   " + url)
                result = await axios.get(process.env.NEXT_PUBLIC_API_URL + url, {
                    headers: {
                        withCredentials: true,
                        'Content-Type': "application/json"
                    }
                });
                return result;
            case 'put' :
                // console.log("##PUTTING##")
                result = await axios.put(process.env.NEXT_PUBLIC_API_URL + url, data, {
                    headers: {
                        withCredentials: true,
                        'Content-Type': "application/json"
                    }
                });

                return result;
            case 'post' :
                // console.log("##POSTTING##"+ "   " + url)
                result = await axios.post(process.env.NEXT_PUBLIC_API_URL + url, data, {
                    headers: {
                        withCredentials: true,
                        'Content-Type': "application/json"
                    }
                });
                return result
            default:
                return {}
        }
    }
}

export default CustomAxios