import axios from "axios";

export default async function handler(req, res) {
    // const email = req.body.email;
    // const password = req.body.password;

    const data = new Object();
    data.email = req.body.email;
    data.password = req.body.password;
    const url = process.env.NEXT_PUBLIC_API_URL + "/api/v1/auth/login"

    try {
        const result = await axios.post(url, data);
        console.log(JSON.stringify(result.data))
        res.status(200).json(result.data)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: 'failed to fetch data' })
    }
  }