
import ResponseTable from "./ResponseTable";
import { CSVLink } from "react-csv";
import { Stack } from "@mui/material";
import Link from "next/link";

export default function SurveyResults(props) {

    let row_num = 1;
    let excel_num = 1;
    function getNum() {
        return row_num++;
    }

    function getExcelNum() {
        return excel_num++;
    }

    // console.log(props);
    function createData(id, date, svyResId, svyRespContent) {
        return { id, date, svyResId, svyRespContent };
    }


    function createExcelData(id, contents, date) {
        const tmp = JSON.parse(contents);
        let data = { id, date }

        // console.log("tmp" + JSON.stringify(tmp));
        tmp.map((ans) => {
            let trash = ""
            ans.ansVal.map(item => {
                trash += item.resp + " "
            })
            data[ans.qId] = trash
            // console.log(trash)
        });

        return data
    }

    const rows = props.resContents.map((item) => createData(getNum(), item.svyRespDt, item.id, item.svyRespContent))
    const excelData = props.svyType !== "duo" ? props.resContents.map((item) => createExcelData(getExcelNum(), JSON.stringify(item.svyRespContent), item.svyRespDt)) : ""
    const excelHeader = () => {
        const temp = [{ label: "번호", key: "id" },
        { label: "응답시간", key: "date" },]

        let svyRespContents = props.resContents[0].svyRespContent;
        svyRespContents.map((id) => temp.push({ label: id.qId + "번 질문", key: id.qId.toString() }))

        return temp;
    };


    return (
        <>
            <Stack alignItems="center">
                <h1>총 응답 수 : {props.resPeople} / {props.maxResPeople}</h1>
                <ResponseTable surveyId={props.resContents[0].svyId} contents={rows} />
                <br />
                {props.svyType !== "duo" ? <>
                <div align="center">
                    <CSVLink
                        className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105"
                        headers={excelHeader()} // header
                        data={excelData} // data
                        filename="설문결과"
                    >
                        CSV 다운로드
                    </CSVLink>
                    <Link
                        //surveyId = {props.resContents[0].svyId} 
                        href={{ pathname: '/survey/emotion/' + props.resContents[0].svyId }}
                    >
                        <button
                            className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105">
                            설문 발화 분석
                        </button>
                    </Link>
                </div>
                </> : <></>}
            </Stack>

        </>
    );
}