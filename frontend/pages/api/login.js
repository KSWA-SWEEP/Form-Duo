const API_BASE_URL = process.env.API_BASE_URL

export default async function handler(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const path = "/api/v1/auth/login";

    try {
        const requestUrl = `${process.env.API_BASE_URL}/${path}`
        const result = await axios.post(requestUrl, data);
        res.status(200).send({ result })
    } catch (err) {
        res.status(500).send({ error: 'failed to fetch data' })
    }
  }