import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, FilledInput, ThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
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
        backgroundColor: 'white',
        [theme.breakpoints.down("sm")]: {
            width: "450px",
        },
        [theme.breakpoints.up("md")]: {
            width: "600px",
        },
    },
    last: {
        width: "440px",
        [theme.breakpoints.down("sm")]: {
            width: "250px",
        },
    },
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    textCenter: {
        textAlign: "center",
    },
}));

const rtl = createTheme({
    direction: "rtl",
});

const ForgetPasswordForm = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Box
            boxShadow="3"
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={classes.box}
        >
            <ThemeProvider theme={rtl}>
                <div className={classes.textCenter}>
                    <h2 style={{ color: ui_details.primary }}>
                        فراموشی رمز عبور
                    </h2>
                    <p style={{ color: ui_details.gray }}>
                        لطفا شماره موبایل خود را وارد کنید
                    </p>
                </div>

                <form autoComplete="off">
                    <Box>
                        <FilledInput
                            id="filled-basic"
                            placeholder="شماره موبایل"
                            variant="filled"
                            className={matches ? classes.textField : classes.bigField}
                        />
                    </Box>
                </form>
            </ThemeProvider>
            <Box mt="50px">
                <Button
                    variant="contained"
                    color="primary"
                    href="/confirm-number/password"
                    style={{
                        background: ui_details.primary,
                        padding: "8px",
                        margin: "5px",
                    }}
                >
                    تایید
                </Button>
                <Button
                    style={{
                        color: ui_details.primary,
                        padding: "8px",
                        margin: "5px",
                    }}
                    href="/"
                >
                    قبلی
                </Button>
            </Box>
            <br />
        </Box>
    );
};

export default ForgetPasswordForm;
