import axios from "axios";
import {useRecoilValue} from "recoil";
import {refToken} from "../../atoms/refToken";

async function AxiosWithToken(type, url, data) {
    let [token, setToken] = useRecoilValue(refToken)
    let result
    if (data == null || data == undefined) {
        data = {}
    }
    switch (type) {
        case 'get' :
            console.log("##GETTING##  " +token+ "  " + "   " + url)
            result = await axios.get(process.env.NEXT_PUBLIC_API_URL + url, {
                headers: {
                    withCredentials: true,
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            return result;
        case 'put' :
            console.log("##PUTTING##")
            result = await axios.put(process.env.NEXT_PUBLIC_API_URL + url, data, {
                headers: {
                    withCredentials: true,
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });

            return result;
        case 'post' :
            console.log("##POSTTING##")
            result = await axios.post(process.env.NEXT_PUBLIC_API_URL + url, data, {
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

}

export default AxiosWithToken