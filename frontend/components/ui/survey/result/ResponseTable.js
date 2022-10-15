import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router'

import { Stack, Pagination } from "@mui/material";
// import IndividualData from "../component/IndividualData";
import { useState, useEffect } from "react";

const ResponseTable = (props) => {
    const LAST_PAGE = props.contents.length % 5 === 0 ?
        props.contents.length / 5 : props.contents.length / 5 + 1; // 마지막 페이지

    const router = useRouter();
    const [page, setPage] = useState(1); // 처음 페이지는 1이다.
    const [data, setData] = useState(null);

    // console.log(contents);

    useEffect(() => {
        // setData(/* fetch(또는 전체 데이터에서 slice)로 현재 page의 데이터를 가져온다. */);
        // 한 페이지에 5개씩 보여준다.
        if(page === LAST_PAGE){ // 마지막 페이지는 데이터가 5개보다 부족할 수도 있다.
            setData(props.contents.slice(5 * (page - 1)));
        } else {
            setData(props.contents.slice(5 * (page - 1), 5 * (page - 1) + 5));
        }
    }, [page]);

    const handlePage = (event) => {
        const nowPageInt = parseInt(event.target.outerText);
        setPage(nowPageInt);
    }

    if (!data) return <p>Loading...</p>
    return (
        <Stack alignItems="center">
            <Pagination count={LAST_PAGE} defaultPage={1} boundaryCount={2}
                        size="large" sx={{margin: 2}} onChange={(e) => handlePage(e)}
                        className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap  hover:scale-105"/>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">NO</TableCell>
                            <TableCell align="center">작성일</TableCell>
                            <TableCell align="center">내용</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.date}</TableCell>
                                <TableCell align="center">
                                    <button onClick={() => router.push('/', undefined, { shallow: true })}
                                            className="inline-flex items-center justify-center px-3 py-2 ml-8 text-sm font-normal text-white duration-200 border border-transparent rounded-md shadow-sm whitespace-nowrap bg-fdblue hover:bg-fdbluedark hover:scale-105">
                                        확인 </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Stack>
    );
};

export default ResponseTable;