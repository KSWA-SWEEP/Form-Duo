
import ResponseTable from "./ResponseTable";
import { CSVLink } from "react-csv";
import {Stack} from "@mui/material";

export default function SurveyResults(props) {

    let row_num = 1;
    let excel_num = 1;
    function getNum(){
        return row_num++;
    }

    function getExcelNum(){
        return excel_num++;
    }

    // console.log(props);
    function createData(id, date) {
        return { id, date};
    }


    function createExcelData(id, contents, date){
        console.log(tmp);
        const tmp = JSON.parse(contents);
        let data = {id, date}

        const tmp_qType = tmp.qType;
        tmp.map((ans) =>{
            if (ans.ansVal[0].qContentId === '')
                data[ans.qId]=ans.ansVal[0].resp
            else
                data[ans.qId]=ans.ansVal[0].qContentId
        });


        // console.log(ans_tmp);
        return data
    }

    const rows = props.resContents.map((item) => createData(getNum(), item.svyRespDt))
    const excelData = props.resContents.map((item) => createExcelData(getExcelNum(), JSON.stringify(item.svyRespContent), item.svyRespDt))
    const excelHeader = () => {
        const temp = [{ label: "번호", key: "id" },
            { label: "응답시간", key: "date" },]

        let svyRespContents = props.resContents[0].svyRespContent;
        svyRespContents.map((id) => temp.push({label : id.qId+"번 질문", key: id.qId.toString()}))

        return temp;
    };

    console.log(excelData);
    console.log(excelHeader());

    return (
        <>
            <Stack alignItems="center">
                <ResponseTable contents = {rows} />
                <br/>
                <br/>
                <CSVLink
                    className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105"
                    headers={excelHeader()} // header
                    data={excelData} // data
                    filename="설문결과"
                >
                    CSV 다운로드
                </CSVLink>
            </Stack>

        </>
    );
}