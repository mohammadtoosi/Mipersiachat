import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import UI from "../components/UI/UIDetails";

const useStyles = makeStyles({
    table: {},
    color: {
        color: UI.primary,
        borderBottom: '1px solid #000000',
    },
    head: {
        backgroundColor: '#000000',
    },
    font: {
        fontFamily: 'vazir',
    },
    fontBold: {
        fontFamily: 'Vazir-Bold',
    },
});

function createData(name, ip, type, count, time, website, wait) {
    return { name, ip, type, count, time, website, wait };
}

let fullname = "ندا امیری";
let wait = "درحال انتظار";

const rows = [
    createData(
        fullname,
        "37.129.175.37",
        "Desktop-Windows",
        "3",
        "17:50",
        "iliatc.com...",
        wait
    ),
    createData(
        fullname,
        "37.129.175.37",
        "Desktop-Windows",
        "3",
        "17:50",
        "iliatc.com...",
        wait
    ),
    createData(
        fullname,
        "37.129.175.37",
        "Desktop-Windows",
        "3",
        "17:50",
        "iliatc.com...",
        wait
    ),
    createData(
        fullname,
        "37.129.175.37",
        "Desktop-Windows",
        "3",
        "17:50",
        "iliatc.com...",
        wait
    ),
];

export default function OnlineUsers() {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <>
            <Container>
                <Box mx={5}>
                    <h4 style={{ color: dark === true ? UI.primary : UI.menuItemColor }}>کاربران انلاین</h4>
                </Box>
                <TableContainer component={Paper}>
                    <Table 
                        className={classes.table}
                        aria-label="simple table"
                        style={{
                            backgroundColor: dark === true ? "#121212" : "",
                        }}
                    >
                        <TableHead className={dark === true ? classes.head : ''}>
                            <TableRow>
                                <TableCell className={[dark === true ? classes.color : '', classes.fontBold]} align="center">نام و نام خانوادگی</TableCell>
                                <TableCell className={[dark === true ? classes.color : '', classes.fontBold]} align="center">ای پی</TableCell>
                                <TableCell className={[dark === true ? classes.color : '', classes.fontBold]} align="center">نوع دستگاه</TableCell>
                                <TableCell className={[dark === true ? classes.color : '', classes.fontBold]} align="center">
                                    تعداد صفحات بازدید شده
                                </TableCell>
                                <TableCell className={[dark === true ? classes.color : '', classes.fontBold]} align="center">زمان حضور</TableCell>
                                <TableCell className={[dark === true ? classes.color : '', classes.fontBold]} align="center">در صفحه</TableCell>
                                <TableCell className={[dark === true ? classes.color : '', classes.fontBold]} align="center">
                                    وضعیت گفت و گو
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={[dark === true ? classes.color : '', classes.fontBold]}>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell className={[dark === true ? classes.color : '', classes.font]} align="center" component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell className={[dark === true ? classes.color : '', classes.font]} align="center">
                                        {row.ip}
                                    </TableCell>
                                    <TableCell className={[dark === true ? classes.color : '', classes.font]} align="center">
                                        {row.type}
                                    </TableCell>
                                    <TableCell className={[dark === true ? classes.color : '', classes.font]} align="center">
                                        {row.count}
                                    </TableCell>
                                    <TableCell className={[dark === true ? classes.color : '', classes.font]} align="center">
                                        {row.time}
                                    </TableCell>
                                    <TableCell className={[dark === true ? classes.color : '', classes.font]} align="center">
                                        {row.website}
                                    </TableCell>
                                    <TableCell className={[dark === true ? classes.color : '', classes.font]} align="center">
                                        {row.wait}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}
