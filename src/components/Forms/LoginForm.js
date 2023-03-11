import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/auth";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { snackbarActions } from "../../redux/snackbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {
    createTheme,
    FilledInput,
    InputAdornment,
    ThemeProvider,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ui_details from "../UI/UIDetails";
import Font from "../../styles/Font.module.css";
import routes from "../../api/routes";
import CircularProgress from "@material-ui/core/CircularProgress";
import SnackbarAlert from "../Snackbar/Snackbar";

const useStyles = makeStyles((theme) => ({
    textField: {
        display: "flex",
        flexDirection: "flex-column",
        width: "45ch",
        marginTop: "30px",
        [theme.breakpoints.down("xs")]: {
            marginTop: "20px",
            width: "30ch",
        },
    },
    body: {
        width: "450px",
        height: "430px",
        borderRadius: "8px",
        backgroundColor: "white",
        [theme.breakpoints.down("xs")]: {
            width: "283px",
        },
    },
    space: {
        width: "335px",
        [theme.breakpoints.down("xs")]: {
            width: "180px",
        },
    },
}));

const theme = createTheme({
    direction: "rtl",
});

const LoginForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const showPasswordHandler = () => {
        setShowPassword((showPassword) => (showPassword = !showPassword));
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const userLogin = {
            username: username,
            password: password,
        };

        setIsLoading(true);
        try {
            const response = await fetch(routes.login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userLogin),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("token", data.token);
                dispatch(
                    authActions.setAuthTokens({
                        token: data.token,
                    })
                );
                history.push("/dashboard/websites");
                localStorage.setItem("user", JSON.stringify(data));
            } else {
                setUsername("");
                setPassword("");
                localStorage.removeItem("token");
                setError("اطلاعات وارد شده صحیح نیست!");
                dispatch(snackbarActions.openSnackbarAlert());
            }
        } catch (error) {
            setError("مشکلی پیش اومده! لطفا دوباره امتجان کنید");
            dispatch(snackbarActions.openSnackbarAlert());
        }
        setIsLoading(false);
    };

    return (
        <Box
            boxShadow="3"
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={classes.body}
        >
            <ThemeProvider theme={theme}>
                <div className="">
                    <h2 style={{ color: ui_details.primary }}>ورود</h2>
                </div>
                <form
                    className={classes.root}
                    autoComplete="off"
                    onSubmit={onSubmitForm}
                >
                    <FilledInput
                        className={[classes.textField, Font.vazir]}
                        id="filled-basic"
                        type="text"
                        placeholder="ایمیل"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                    <FilledInput
                        className={[classes.textField, Font.vazir]}
                        id="filled-adornment-password"
                        type={showPassword === true ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="رمز عبور"
                        required
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={showPasswordHandler}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </form>
            </ThemeProvider>
            <Box display="flex" style={{ marginTop: "50px" }}>
                <Box className={classes.space}>
                    <Link
                        style={{ color: ui_details.gray }}
                        href="/forget-password"
                    >
                        فراموشی رمز عبور
                    </Link>
                </Box>
                <div>
                    {isLoading && (
                        <CircularProgress
                            style={{ color: ui_details.primary }}
                        />
                    )}
                    {!isLoading && (
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                background: ui_details.primary,
                                padding: "5px",
                            }}
                            onClick={onSubmitForm}
                        >
                            ورود
                        </Button>
                    )}
                </div>
            </Box>
            <Box style={{ marginTop: "50px" }}>
                <Link href="#" style={{ color: ui_details.gray }}>
                    ورود به عنوان اپراتور
                </Link>
            </Box>
            <SnackbarAlert message={error} type="error" />
        </Box>
    );
};

export default LoginForm;
