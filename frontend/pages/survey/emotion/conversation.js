import axios from "Axios";
import React, { Fragment, useState, useRef, useEffect } from "React";
import {getCookie} from "Cookies-next";

export default function conversation() {
    
    const [msg, setMsg] = useState("!@!")
    const [allResp, setAllResp] = useState(0);
    const [good_motion, setGood_motion] = useState(0);
    const [bad_motion, setBad_motion] = useState(0);
    const [normal_motion, setNormal_motion] = useState(0);
    const API_KEY = "4c40dd27da9e877f7df64b6d77df572b"
    const API_URL = "https://a3d8fbea-c67e-4cac-8e14-f0af2ee1671f.api.kr-central-1.kakaoi.io/ai/conversation/a170a37cbdfd45b5883c82cf4552e324"
    const content_type = "application/json"
    
    // 0번째는 보통 1번째는 긍정적 2번째는 부정적

    const data = new Object();
    data.msg = msg;

    useEffect(() => {
        getConversation();
    }, [])

    useEffect(()=>{
        if(msg != "!@!"){
            getEmotion();
        }
    }, [msg])

    useEffect(() => {
        console.log("Changed");
    }, [good_motion, normal_motion, bad_motion])


    async function getConversation() {
        axios.defaults.headers = {
            'Content-Type': "application/json",
            "Authorization": "Bearer " + getCookie("accessToken"),
        };
        axios.defaults.mode = "cors";
        axios.defaults.withCredentials = true;
        try {
            const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/api/v1/surveys/412/reps`);
            let messages = "";
            result.data.map(function(element){
                for (var i = 0; i < element.svyRespContent.length; i++){
                    messages = messages + element.svyRespContent[i].ansVal.resp + '|'
                }
                setAllResp((prevState)=> prevState + 1)
            })
            setMsg(messages)
            //console.log(messages) // 정상
        } catch (e) {
            console.log(e);
        }
    }

    async function postData (d) {
        axios.defaults.headers = {
            "x-api-key": API_KEY,
            'Content-Type': content_type,
        };
        axios.defaults.mode = "cors";
        axios.defaults.withCredentials = false;
        try {
            const msgAnalysis = await axios.post(`https://keon-proxy.herokuapp.com/${API_URL}`, d, {
            maxBodyLength:2000,
            maxContentLength:2000
        });
          //console.log(msgAnalysis)
          return msgAnalysis
        } catch (error) {
          console.log(error)
        }
      }
      
      async function getEmotion(){
        postData(data).then(r => {
            console.log(r.data)    
            for (var i = 0; i < allResp; i++){
                console.log(r.data[i].emotion.value);
                switch(r.data[i].emotion.value){
                    case "감정없음" : setNormal_motion((prevState) => prevState+1); break;
                    case "놀람" : setGood_motion((prevState) => prevState+1); break;
                    case "두려움" : setBad_motion((prevState) => prevState+1); break;
                    case "불확실" : setNormal_motion((prevState) => prevState+1); break;
                    case "슬픔" : setBad_motion((prevState) => prevState+1); break;
                    case "싫음" : setBad_motion((prevState) => prevState+1); break;
                    case "좋음" : setGood_motion((prevState) => prevState+1); console.log(good_motion); break;
                    case "지루함" : setBad_motion((prevState) => prevState+1); break;
                    case "창피함" : setNormal_motion((prevState) => prevState+1); break;
                    default : console.log("Switch Error")
                }
            }
        });
        console.log("Postdata End")
    }

    return (
        <div>
            총 응답수 : {allResp/2} <br/>
            보통 : {normal_motion} <br/>
            긍정적 : {good_motion} <br/>
            부정적 : {bad_motion} <br/>
        </div>    
    )
}