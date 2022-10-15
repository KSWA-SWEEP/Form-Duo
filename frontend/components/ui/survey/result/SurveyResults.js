import { Grid } from "@mui/material";
import PaginationBtn from "./paginationBtn";
import ResponseTable from "./ResponseTable";

export default function SurveyResults(props) {

    let row_num = 1;
    function getNum(){
        return row_num++;
    }


    // console.log(props);
    function createData(id, date) {
        return { id, date};
    }

    const rows = props.resContents.map((item) => createData(getNum(), item.svyRespDt))

    // console.log(rows);

    return (
        <>
            <h4>개별 응답 조회 목록입니다.</h4>
            <ResponseTable contents = {rows} />
            <br/>
            <br/>

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
            </Grid>
        </>
    );
}