import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dialogActions } from "../redux/dialog";
import { snackbarActions } from "../redux/snackbar";
import { makeStyles } from "@material-ui/core/styles";
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
import Add from "@material-ui//icons/Add";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UI from "../components/UI/UIDetails";
import Container from "@material-ui/core/Container";
import ScrollingDialog from "../components/DialogForms/ScrollingDialog";
import AddQuestionDialog from "../components/DialogForms/AddQuestionDialog";
import SnackbarAlert from "../components/Snackbar/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
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

function createData(name, ip, type, count, time, website) {
    return { name, ip, type, count, time, website };
}

let fullname = "یک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرض";

const rows = [
    createData(
        fullname,
        "یک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرض"
    ),
    createData(
        fullname,
        "یک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرض"
    ),
    createData(
        fullname,
        "یک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرض"
    ),
    createData(
        fullname,
        "یک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرض"
    ),
];

const Operators = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const dark = useSelector((state) => state.darkMode.dark);
    const [menu, setMenu] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const openMenuHandler = (event) => {
        setMenu(event.currentTarget);
    };

    const closeMenuHandler = () => {
        setMenu(null);
    };

    const openQuestionContinueHandler = () => {
        dispatch(dialogActions.toggleScrolling());
    };

    const openAddQuestionDialogHandler = () => {
        dispatch(dialogActions.openAddQuestionDialog());
    };

    const fetchQuestionsAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            setIsLoading(true);
            const response = await fetch(routes.question, {
                "Content-Type": "application/json",
                Authorization: token,
            });
            const data = await response.json();
            setQuestions(data.results);
        } catch (error) {
            setError("مشکلی پیش اومده لطفا صفحه رو رفرش کنید!");
            dispatch(snackbarActions.openSnackbarAlert());
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchQuestionsAsync();
    }, []);

    return (
        <Container>
            <Box mx={5} display="flex">
                <h4
                    style={{
                        color: dark === true ? UI.primary : UI.menuItemColor,
                    }}
                >
                    سوالات پیشفرض
                </h4>
            </Box>
            {isLoading && <CircularProgress style={{ color: UI.primary }} />}
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
                                className={[
                                    dark === true ? classes.color : "",
                                    classes.fontBold,
                                ]}
                                align="left"
                            >
                                عنوال
                            </TableCell>
                            <TableCell
                                className={[
                                    dark === true ? classes.color : "",
                                    classes.fontBold,
                                ]}
                                align="left"
                            >
                                سوال
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
                        {questions.map((q) => (
                            <TableRow key={q.id}>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                        classes.font,
                                    ]}
                                    align="left"
                                    component="th"
                                    scope="row"
                                >
                                    {q.question}
                                </TableCell>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                        classes.font,
                                    ]}
                                    align="left"
                                >
                                    {q.answer}
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
                                        <MenuItem>ویرایش</MenuItem>
                                        <MenuItem
                                            onClick={
                                                openQuestionContinueHandler
                                            }
                                        >
                                            باز کردن
                                        </MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" mt="15px" flexDirection="row">
                <Box mx={1}>
                    <Button
                        variant={dark === true ? "outlined" : "contained"}
                        startIcon={<Add />}
                        color="default"
                        onClick={openAddQuestionDialogHandler}
                        className={
                            dark === true ? classes.buttonDark : classes.button
                        }
                    >
                        افزودن
                    </Button>
                </Box>
            </Box>
            <AddQuestionDialog />
            <ScrollingDialog title="یک سوال پیشفرض">
                یک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض یک
                سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض یک سوال پیشفرض یک سوال
                پیشفرض یک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال
                پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض یک سوال
                پیشفرض یک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرض یک سوال
                پیشفرضیک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال پیشفرض
                یک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرض یک
                سوال پیشفرضیک سوال پیشفرض یک سوال پیشفرض یک سوال پیشفرضیک سوال
                پیشفرض یک سوال پیشفرض یک سوال پیشفرض
            </ScrollingDialog>
            <SnackbarAlert message={error} type="error" />
        </Container>
    );
};

export default Operators;
