import { Button, Grid } from '@mui/material';
import BarChart from './chart/BarChart';
import SubjectiveChart from './chart/SubjectiveChart';
import {Slider} from './chart/Slider';
import axios from "axios";
import {useRef} from "react";
// import CSVLink from "react-csv/src/components/Link";
// import Chart from './chart';

export default function SurveyAnalysis(props) {
    // const svyCont = useRef(); // Question 정보
    // let svyAnsval = {};
    // console.log("Ana##Props : " + props.resContents[0].svyId);

    //객관식, checkbox, drop box
    //설문 전체 form 받기
    // async function getSurvey(){
    //     try{
    //         const svyContents = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/v1/surveys/' + props.resContents[0].svyId);
    //         // console.log("Ana##svyContents : " + JSON.stringify(svyContents));
    //         return svyContents;
    //         return svyContents;
    //     }catch (e) {
    //         console.log(e);
    //     }
    // }
    // function setSvyAnsval(){
    //     svyCont.current.map((svyQ)=>{
    //         svyAnsval[svyQ.qId] = []
    //         if(svyQ.contentYn){
    //             const qCont = svyQ.qContents
    //             // console.log("Ana##qCont : " + JSON.stringify(qCont))
    //             qCont.map((contents)=>{
    //                 let contValue = contents.qContentVal
    //                 svyAnsval[svyQ.qId] = [...svyAnsval[svyQ.qId] ,{ key : contValue, value : 0}]
    //             })
    //         }
    //     })
    // }
    // function ansCount(){
    //
    //     props.resContents.map((resC)=>{
    //         // console.log("Ana##resC : "+JSON.stringify(resC))
    //         resC.svyRespContent.map((respCont)=>{
    //             if(respCont.qType !== "Subjective"){
    //                 respCont.ansVal.map((ans)=>{
    //                     svyAnsval[respCont.qId].map((res, idx)=>{
    //                         if(res.key === ans.resp){
    //                             // console.log("Ana##respCont : " + svyAnsval[respCont.qId][idx].key + "   " + ans.resp + "    " + res.key)
    //                             svyAnsval[respCont.qId][idx].value++;
    //                         }
    //                     })
    //                 })
    //             }
    //         })
    //     })
    // }
    //
    // getSurvey().then((r)=>{
    //     svyCont.current = r.data.svyContent;
    //     console.log("Ana##svyContents : "+JSON.stringify(svyCont.current))
    // }).then(()=>{
    //     setSvyAnsval()
    // }).then(()=>{
    //     ansCount()
    // }).then(()=>{
    //     console.log("Ana##setting SvyAnsVal : "+ JSON.stringify(svyAnsval))
    // })

    return (
        <div>
            <div className="overflow-auto bg-white rounded-md shadow-lg max-h-500 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                 {/*{chartTypes.map((type) => {return (<Chart props={type} />)})} */}
                <BarChart resContents={props.resContents}/>
                <SubjectiveChart/>
            </div>

        </div>
    );
}