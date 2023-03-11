import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dialogActions } from "../redux/dialog";
import { snackbarActions } from "../redux/snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
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
import DepartmentDialog from "../components/DialogForms/DepartmentDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackbarAlert from "../components/Snackbar/Snackbar";
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

const Department = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const dialog1 = useSelector((state) => state.dialog.dialog1);
    const dark = useSelector((state) => state.darkMode.dark);
    const [menu, setMenu] = useState(null);

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const openMenuHandler = (event) => {
        setMenu(event.currentTarget);
    };

    const closeMenuHandler = () => {
        setMenu(null);
    };

    const openAddNewDepartmentClickHandler = () => {
        dispatch(dialogActions.openAddNewDepartment());
    };

    const fetchDepartmentAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            setIsLoading(true);
            const response = await fetch(routes.department, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });

            const data = await response.json();

            const transformedData = data.results.map((dep) => {
                return {
                    id: dep.id,
                    url: dep.website?.url,
                    name: dep.name,
                };
            });
            setData(transformedData);
        } catch (error) {
            setError("مشکلی پیش اومده لطفا صفحه رو رفرش کنید!");
            dispatch(snackbarActions.openSnackbarAlert());
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDepartmentAsync();
    }, []);

    // let titleContent;
    // let descriptionContent;

    // if (data.length > 0) {
    //     titleContent = data.map((data) => (

    //     ))
    // }
    let loading = "درحال پردازش ...";

    return (
        <Container>
            <Box mx={5} display="flex">
                <h4
                    style={{
                        color: dark === true ? UI.primary : UI.menuItemColor,
                    }}
                >
                    دپارتمان
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
                                توضیحات
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
                        {data.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                        classes.font,
                                    ]}
                                    align="left"
                                    component="th"
                                    scope="row"
                                >
                                    {isLoading && loading}
                                    {data.name}
                                </TableCell>
                                <TableCell
                                    className={[
                                        dark === true ? classes.color : "",
                                        classes.font,
                                    ]}
                                    align="left"
                                >
                                    {isLoading && loading}
                                    {data.url}
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
                        onClick={openAddNewDepartmentClickHandler}
                        className={
                            dark === true ? classes.buttonDark : classes.button
                        }
                    >
                        افزودن
                    </Button>
                </Box>
            </Box>
            <DepartmentDialog />
            <SnackbarAlert message={error} type="error" />
            <Box mt="20px"></Box>
        </Container>
    );
};

export default Department;
