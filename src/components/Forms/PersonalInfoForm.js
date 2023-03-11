import React, { useReducer } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, FilledInput, ThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ui_details from "../UI/UIDetails";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "30ch",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "30ch",
        [theme.breakpoints.down("sm")]: {
            width: "40ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "30ch",
        },
        [theme.breakpoints.up("lg")]: {
            width: "30ch",
        },
    },
    bigField: {
        width: "62ch",
        [theme.breakpoints.down("sm")]: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: "40ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "62ch",
        },
        [theme.breakpoints.up("lg")]: {
            width: "62ch",
        },
    },
    box: {
        borderRadius: "8px",
        width: "600px",
        backgroundColor: "white",
        [theme.breakpoints.down("sm")]: {
            width: "450px",
        },
        [theme.breakpoints.up("md")]: {
            width: "600px",
        },
    },
    last: {
        width: "480px",
        [theme.breakpoints.down("sm")]: {
            width: "200px",
        },
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

const rtl = createTheme({
    direction: "rtl",
});

const initialValue = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "setFirstName":
            return {
                ...state,
                firstName: action.value,
            };
        case "setLastName":
            return {
                ...state,
                lastName: action.value,
            };
        case "setPhoneNumber":
            return {
                ...state,
                phoneNumber: action.value,
            };
        case "setEmail":
            return {
                ...state,
                email: action.value,
            };
        case "setPassword":
            return {
                ...state,
                password: action.value,
            };
        default:
            break;
    }
};

const PersonalInfoForm = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const [state, dispatch] = useReducer(reducer, initialValue);
    
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(initialValue);
    };

    const onInputChange = (type, value) => {
        dispatch({
            type: type,
            value: value,
        });
    };

    const onSubmitForm = () => {
        const nInitialValue = {
            firstName: state.firstName,
            lastName: state.lastName,
            phoneNumber: state.phoneNumber,
            email: state.email,
            password: state.password,
        };
        console.log(nInitialValue);
    }

    return (
        <Box
            boxShadow="3"
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={classes.box}
        >
            <ThemeProvider theme={rtl}>
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ color: ui_details.primary }}>اطلاعات شخصی</h2>
                    <p style={{ color: ui_details.gray }}>
                        لطفا اطلاعات شخصی خود را وارد کنید.
                    </p>
                </div>
                <form autoComplete="off" onSubmit={onSubmit}>
                    <Box display="flex" flexDirection={matches && "column"}>
                        <Box>
                            <FilledInput
                                id="filled-basic"
                                placeholder="نام"
                                variant="filled"
                                value={state.firstName}
                                className={classes.textField}
                                onChange={(event) => {
                                    onInputChange(
                                        "setFirstName",
                                        event.target.value
                                    );
                                }}
                            />
                        </Box>
                        <Box mt={matches && "20px"}>
                            <FilledInput
                                id="filled-basic"
                                placeholder="نام خانوادگی"
                                variant="filled"
                                className={classes.textField}
                                onChange={(event) => {
                                    onInputChange(
                                        "setLastName",
                                        event.target.value
                                    );
                                }}
                            />
                        </Box>
                    </Box>
                    <Box mt="20px" mx={!matches && "8px"}>
                        <FilledInput
                            id="filled-basic"
                            placeholder="موبایل مثال:‌ ۰۹۲۱۵۵۱۱۴۱۴۱"
                            variant="filled"
                            className={classes.bigField}
                            onChange={(event) => {
                                onInputChange(
                                    "setPhoneNumber",
                                    event.target.value
                                );
                            }}
                        />
                    </Box>
                    <Box mt="20px" mx={!matches && "8px"}>
                        <FilledInput
                            id="filled-basic"
                            placeholder="ایمیل سازمانی (مثال yourname@sitename.com)"
                            variant="filled"
                            className={classes.bigField}
                            onChange={(event) => {
                                onInputChange(
                                    "setEmail",
                                    event.target.value
                                );
                            }}
                        />
                    </Box>
                    <Box mt="20px" mx={!matches && "8px"}>
                        <FilledInput
                            id="filled-basic"
                            placeholder="رمز عبور"
                            variant="filled"
                            className={classes.bigField}
                            type="password"
                            onChange={(event) => {
                                onInputChange(
                                    "setPassword",
                                    event.target.value
                                );
                            }}
                        />
                    </Box>
                </form>
            </ThemeProvider>
            <Box
                display="flex"
                flexDirection={matches ? "column" : "row"}
                mt={matches ? "30px" : "50px"}
            >
                <div className={!matches && classes.last}>
                    <span style={{ color: ui_details.gray }}>
                        حساب کاربری ندارید؟
                        <Link
                            style={{
                                color: ui_details.primary,
                                cursor: "pointer",
                            }}
                        >
                            {" "}
                            ایجاد حساب کاربری{" "}
                        </Link>
                    </span>
                </div>
                <Box className={classes.center} mt={matches && "20px"}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ background: ui_details.primary }}
                        href="/confirm-number"
                        onClick={onSubmitForm}
                    >
                        بعدی
                    </Button>
                </Box>
            </Box>
            <br />
        </Box>
    );
};

export default PersonalInfoForm;
