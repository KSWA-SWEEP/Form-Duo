import axios from "axios";

export default async function handler(req, res) {
    const data = new Object();
    data.email = req.body.email;
    data.password = req.body.password;
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/login"

    try {
        const response = await axios.post(url, data);
        res.status(200).json(JSON.stringify(response.data))
    } catch (err) {
        res.status(500).end();
    }
}