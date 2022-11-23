import axios from "axios";
import Cookies from 'cookies'

export default async function handler(req, res) {
    const data = new Object();
    data.email = req.body.email;
    data.password = req.body.password;
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/login"

    try {
        const response = await axios.post(url, data);

        const setCookie = response.headers['set-cookie']

        let header = [''];
        for (const i in setCookie) {

            var split = setCookie[i].split('=');
            
            const cookies = new Cookies(req, res)
            // Set a cookie
            cookies.set(`${split[0]}`, `${split[1]}`, {
                httpOnly: true // true by default
            })
        }
        

        res.status(200).json(JSON.stringify(response.data))
    } catch (err) {
        res.status(500).end();
    }
}