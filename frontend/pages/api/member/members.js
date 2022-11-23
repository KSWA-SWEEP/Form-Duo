import axios from "axios";
import { useRecoilValue } from "recoil";

export default async function handler(req, res) {  
    
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/members"
    const data = new Object();

    if (req.method === 'POST') {
        try {
            const response = await axios.post(url, data, {
                headers: {
                    withCredentials: true,
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${req.body.accessToken}`
                }
            });
            res.status(200).json(JSON.stringify(response.data))
        } catch (err) {
            res.status(500).end();
        }
    } 
    else if (req.method === 'GET') {
    } 
    else if (req.method === 'PUT') {

    } 
    else if (req.method === 'DELETE') {

    }
}