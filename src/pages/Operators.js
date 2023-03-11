import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dialogActions } from "../redux/dialog";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { snackbarActions } from "../redux/snackbar";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import InfoForm from "../components/DialogForms/InfoForm";
import Add from "@material-ui//icons/Add";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UI from "../components/UI/UIDetails";
import DialogPanel from "../components/DialogForms/DialogPanel";
import ConversationChart from "../components/DialogForms/ConversationChart";
import DateActivities from "../components/DialogForms/DateActivities";
import Container from "@material-ui/core/Container";
import { CircularProgress } from "@material-ui/core";
import SnackbarAlert from "../components/Snackbar/Snackbar";
import AddNewOperatorDialog from "../components/DialogForms/AddNewOperatorDialog";
import routes from "../api/routes";

const useStyles = makeStyles({
    table: {},
    button: {
        backgroundColor: UI.primary,
        color: "#FFFFFF",
    },
    buttonDark: {
        backgroundColor: "#212121",
        color: UI.primary,
    },
    color: {
        color: UI.primary,
        borderBottom: "1px solid #000000",
    },
    head: {
        backgroundColor: "#000000",
    },
    font: {
        fontFamily: "vazir",
    },
    fontBold: {
        fontFamily: "Vazir-Bold",
    },
});

const data = {
    labels: ["۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 15, 5],
            backgroundColor: UI.primary,
            borderWidth: 5,
        },
    ],
};

const data2 = {
    labels: ["۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳", "۵/۱۳"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 10, 5, 2, 3],
            backgroundColor: UI.primary,
            borderWidth: 5,
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const Operators = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const dialog1 = useSelector((state) => state.dialog.dialog1);
    const dialog2 = useSelector((state) => state.dialog.dialog2);
    const dialog3 = useSelector((state) => state.dialog.dialog3);
    const dark = useSelector((state) => state.darkMode.dark);
    const [menu, setMenu] = useState(null);
    const [operators, setOperators] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chartIsLoading, setChartIsLoading] = useState(false);
    const [chartDataTabOne, setChartDataTabOne] = useState();
    const [chartDataTabTwo, setChartDataTabTwo] = useState();
    const [chartDate, setChartDate] = useState();
    const theme = useTheme();
    const tiny = useMediaQuery(theme.breakpoints.down("xs"));

    const openDialogOneClickHandler = () => {
        dispatch(dialogActions.openFirstDialog());
    };

    const openDialogTwoClickHandler = () => {
        dispatch(dialogActions.openSecondDialog());
    };

    const openDialogThirdClickHandler = () => {
        dispatch(dialogActions.openThirdDialog());
    };

    const openOperatorClickHandler = () => {
        dispatch(dialogActions.openOperatorDialog());
    };

    const openMenuHandler = (event) => {
        setMenu(event.currentTarget);
    };

    const closeMenuHandler = () => {
        setMenu(null);
    };

    const onInputChange = (type, value) => {
        dispatch({
            type: type,
            value: value,
        });
    };

    const fetchOperatorsAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            setIsLoading(true);
            const response = await fetch(routes.operator, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            const transformedOperatorData = data.results.map((opr) => {
                return {
                    id: opr.id,
                    firstname: opr.user.first_name,
                    lastname: opr.user.last_name,
                    fullname: opr.user.first_name + " " + opr.user.last_name,
                    type: opr.user.job,
                    dep: opr.department.name,
                    cancel: 0, // api
                    confirm: 0, // api
                    workTime: "00:00:00", // api
                    isOnline: opr.isOnline,
                };
            });
            setOperators(transformedOperatorData);
        } catch (error) {
            setError("مشکلی پیش اومده لطفا صفحه رو رفرش کنید!");
            dispatch(snackbarActions.openSnackbarAlert());
        }
        setIsLoading(false);
    };

    const fetchChartDataAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            setChartIsLoading(true);
            const response = await fetch(routes.chartChat, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();

            let labels = [];
            let answered = [];
            let unanswered = [];

            data.forEach((element) => {
                labels.push(element.date);
                answered.push(element.answered);
                unanswered.push(element.unanswered);
            });

            let mainData1 = {
                labels: labels,
                datasets: [
                    {
                        label: "گفت و گو",
                        data: answered,
                        backgroundColor: UI.primary,
                        borderWidth: 5,
                    },
                ],
            };

            let mainData2 = {
                labels: labels,
                datasets: [
                    {
                        label: "گفت و گو",
                        data: unanswered,
                        backgroundColor: UI.primary,
                        borderWidth: 5,
                    },
                ],
            };

            setChartDataTabOne(mainData1);
            setChartDataTabTwo(mainData2);
        } catch (err) {
            console.log(err);
        }
        setChartIsLoading(false);
    };

    const fetchChartDateDataAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            setChartIsLoading(true);
            const response = await fetch(routes.chartDate, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();

            let labels = [];
            let minutes = [];

            data.forEach((element) => {
                labels.push(element.date);
                minutes.push(element.minutes);
            });

            let mainData1 = {
                labels: labels,
                datasets: [
                    {
                        label: "گفت و گو",
                        data: minutes,
                        backgroundColor: UI.primary,
                        borderWidth: 5,
                    },
                ],
            };

            setChartDate(mainData1);
        } catch (err) {
            console.log(err);
        }
        setChartIsLoading(false);
    };

    useEffect(() => {
        fetchOperatorsAsync();
        fetchChartDataAsync();
        fetchChartDateDataAsync();
    }, []);

    return (
        <Container>
            <Box mx={5} display="flex">
                <h4
                    style={{
                        color: dark === true ? UI.primary : UI.menuItemColor,
                    }}
                >
                    اپراتورها
                </h4>
            </Box>
            {isLoading && <CircularProgress style={{ color: UI.primary }} />}
            <AddNewOperatorDialog />
            <DialogPanel
                show={dialog2}
                title="زمان های فعالیت"
                // action1={
                //     <Button variant="contained" color="secondary">
                //         دانلود گزارش
                //     </Button>
                // }
            >
                <ConversationChart
                    data={chartDate}
                    options={options}
                    // label="پاسخ گویی:"
                    // value="04:07:15:00"
                />
            </DialogPanel>
            <DialogPanel
                show={dialog3}
                title="امار گفت و گو ها"
                // action1={
                //     <Button variant="contained" color="secondary">
                //         دانلود گزارش
                //     </Button>
                // }
            >
                <DateActivities
                    data1={chartDataTabOne}
                    data2={chartDataTabTwo}
                    options={options}
                />
            </DialogPanel>
            <TableContainer component={Paper}>
                <Table
                    className={classes.table}
                    aria-label="simple table"
                    style={{
                        backgroundColor: dark === true ? "#121212" : "",
                    }}
                >
                    <TableHead
                        style={{
                            backgroundColor: dark === true ? "#000000" : "",
                        }}
                    >
                        <TableRow>
                            <TableCell
                                className={dark === true ? classes.color : ""}
                            ></TableCell>
                            <TableCell
                                className={[
                                    dark === true ? classes.color : "",
                                    classes.fontBold,
                                ]}
                                align="center"
                            >
                                نام و نام خانوادگی
                            </TableCell>
                            <TableCell
                                className={[
                                    dark === true ? classes.color : "",
                                    classes.fontBold,
                                ]}
                                align="center"
                            >
                                نقش
                            </TableCell>
                            <TableCell
                                className={[
                                    dark === true ? classes.color : "",
                                    classes.fontBold,
                                ]}
                                align="center"
                            >
                                دپارتمان
                            </TableCell>
                            <TableCell
                                className={[
                                    dark === true ? classes.color : "",
                                    classes.fontBold,
                                ]}
                                align="center"
                            >
                                رد شده
                            </TableCell>
                            <TableCell
                                className={[
                                    dark === true ? classes.color : "",
                                    classes.fontBold,
                                ]}
                                align="center"
                            >
                                قبول شده
                            </TableCell>
                            <TableCell
                                className={[
                                    dark === true ? classes.color : "",
                                    classes.fontBold,
                                ]}
                                align="center"
                            >
                                ساعت کاری کلی
                            </TableCell>
                            <TableCell
                                className={[
                                    dark === true ? classes.color : "",
                                    classes.fontBold,
                                ]}
                            ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {operators.map((opt) => (
                            <TableRow key={opt.id}>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                    ]}
                                >
                                    <Badge
                                        variant="dot"
                                        color={
                                            (dark ? "secondary" : "primary",
                                            opt.isOnline
                                                ? "secondary"
                                                : "default")
                                        }
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}
                                    >
                                        <AccountCircleIcon />
                                    </Badge>
                                </TableCell>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                        classes.font,
                                    ]}
                                    align="center"
                                    component="th"
                                    scope="row"
                                >
                                    {opt.fullname}
                                </TableCell>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                        classes.font,
                                    ]}
                                    align="center"
                                >
                                    {opt.type}
                                </TableCell>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                        classes.font,
                                    ]}
                                    align="center"
                                >
                                    {opt.dep}
                                </TableCell>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                        classes.font,
                                    ]}
                                    align="center"
                                >
                                    {opt.confirm}
                                </TableCell>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                        classes.font,
                                    ]}
                                    align="center"
                                >
                                    {opt.cancel}
                                </TableCell>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                        classes.font,
                                    ]}
                                    align="center"
                                >
                                    {opt.workTime}
                                </TableCell>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                    ]}
                                >
                                    <IconButton onClick={openMenuHandler}>
                                        <MoreVertIcon
                                            style={{
                                                color:
                                                    dark === true
                                                        ? UI.primary
                                                        : "",
                                            }}
                                        />
                                    </IconButton>
                                    <Menu
                                        id="operator-menu"
                                        anchorEl={menu}
                                        keepMounted
                                        open={Boolean(menu)}
                                        onClose={closeMenuHandler}
                                    >
                                        <MenuItem>غیرفعال کردن</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                display="flex"
                mt="15px"
                flexDirection={!tiny === true ? "row" : "column"}
            >
                <Box mx={1} mt="10px">
                    <Button
                        variant={dark === true ? "outlined" : "contained"}
                        startIcon={<Add />}
                        color="default"
                        className={dark === true ? classes.buttonDark : ""}
                        onClick={openDialogThirdClickHandler}
                    >
                        امار گفت و گو ها
                    </Button>
                </Box>
                <Box mx={1} mt="10px">
                    <Button
                        variant={dark === true ? "outlined" : "contained"}
                        startIcon={<Add />}
                        color="default"
                        className={dark === true ? classes.buttonDark : ""}
                        onClick={openDialogTwoClickHandler}
                    >
                        زمان های فعالیت
                    </Button>
                </Box>
                <Box mx={1} mt="10px">
                    <Button
                        variant={dark === true ? "outlined" : "contained"}
                        startIcon={<Add />}
                        color="default"
                        onClick={openOperatorClickHandler}
                        className={
                            dark === true ? classes.buttonDark : classes.button
                        }
                    >
                        افزودن
                    </Button>
                </Box>
            </Box>
            <SnackbarAlert message={error} type="error" />
        </Container>
    );
};

export default Operators;
