import { Button, Grid } from '@mui/material';
import BarChart from './chart/BarChart';
import PieChart from './chart/PieChart';
// import CSVLink from "react-csv/src/components/Link";
// import Chart from './chart';

export default function SurveyAnalysis(props) {

    console.log(props);
    const headers = [
        { label: 'Order ID', key: 'orderId' },
        { label: 'Item ID', key: 'itemId' },
        { label: 'Language', key: 'language' },
        { label: 'Created At', key: 'createdAt' },
    ];
    // const chartTypes = ['bar', 'pie', 'line', 'scatterplot'];

    return (
        <div>
            <div>
                {/* {chartTypes.map((type) => {return (<Chart props={type} />)})} */}
                <BarChart />
                <PieChart />
            </div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={3}>
                    {/*<CSVLink*/}
                    {/*    data={props.resContents}*/}
                    {/*    filename={'CSV 데이터'}*/}
                    {/*    onClick={() => {*/}
                    {/*        console.log("링크 클릭함");*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Download me*/}
                    {/*</CSVLink>;*/}

                    <Button variant="contained" onClick={() => console.log("downloadDataAnalysis")}>응답 분석 결과 다운로드</Button>
                </Grid>
            </Grid>
        </div>
    );
}