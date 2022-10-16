import axios from "axios";
import {useState} from 'react'

export default function conversation() {
    
    const [msg, setMsg] = useState("Good|Amazing|Gorgeous")
    const API_KEY = "4c40dd27da9e877f7df64b6d77df572b"
    const API_URL = "https://a3d8fbea-c67e-4cac-8e14-f0af2ee1671f.api.kr-central-1.kakaoi.io/ai/conversation/a170a37cbdfd45b5883c82cf4552e324"
    const content_type = "application/json"

    // try{
    //     const svyContents = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys/' + props.svyId);
    //     console.log(svyContents);
    //     return svyContents;         
    // }catch (e) {
    //     console.log(e);
    // }
    const data = new Object();
    data.msg = msg;

    async function postData (d) {
        axios.defaults.headers = {
            "x-api-key": API_KEY,
            'Content-Type': content_type,
            "Access-Control-Allow-Origin":"https://a3d8fbea-c67e-4cac-8e14-f0af2ee1671f.api.kr-central-1.kakaoi.io/ai/conversation/a170a37cbdfd45b5883c82cf4552e324",
            // "Access-Control-Allow-Method":"*",
            // "Access-Control-Allow-Headers":"*",
        };
        axios.defaults.mode = "cors";
        axios.defaults.withCredentials = true;
        try {
            console.log("LOG" + process.env.Conversation_API_URL)
          const msgAnalysis = await axios.post(API_URL , d, {
            maxBodyLength:2000,
            maxContentLength:2000
        });
          console.log(msgAnalysis)
        } catch (error) {
          console.log(error)
        }
      }

      postData(data);

      return <div>Emotion Testing.. </div>
}