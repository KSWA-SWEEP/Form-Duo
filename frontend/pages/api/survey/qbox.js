import axios from "axios";

export default async function handler(req, res) {  
    
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/qbox"

    // spring gateway 사용시
    // const url = process.env.NEXT_PUBLIC_API_URL + "/survey/api/v1/qbox"

    let data = new Object();

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
            console.log(JSON.stringify(err));
            res.status(500).end();
        }
    } 
    else if (req.method === 'GET') {
        data = req.body;
        try {
            const response = await axios.put(url, data, {
                headers: {
                    withCredentials: true,
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${req.body.accessToken}`
                }
            });
            res.status(200).json(JSON.stringify(response.data))
        } catch (err) {
            console.log(JSON.stringify(err));
            res.status(500).end();
        }
    } 
    else if (req.method === 'PUT') {
    } 
    else if (req.method === 'DELETE') {

    }
}