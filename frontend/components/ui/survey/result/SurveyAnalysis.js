import { Button, Grid } from '@mui/material';
import BarChart from './chart/BarChart';
import {Slider} from './chart/Slider';
// import CSVLink from "react-csv/src/components/Link";
// import Chart from './chart';

export default function SurveyAnalysis(props) {

    // console.log(props);
    const headers = [
        { label: 'Order ID', key: 'orderId' },
        { label: 'Item ID', key: 'itemId' },
        { label: 'Language', key: 'language' },
        { label: 'Created At', key: 'createdAt' },
    ];
    // const chartTypes = ['bar', 'pie', 'line', 'scatterplot'];

    //

    return (
        <div>
            <div className="py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-300 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {/* {chartTypes.map((type) => {return (<Chart props={type} />)})} */}
                <BarChart />
                <Slider data = {parseFloat(props.resPeople/props.maxResPeople)}/>
            </div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
            </Grid>
        </div>
    );
}