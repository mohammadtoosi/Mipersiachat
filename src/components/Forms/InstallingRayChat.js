import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, TextField, ThemeProvider } from "@material-ui/core";
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
        [theme.breakpoints.down("sm")]: {
            width: "450px",
        },
        [theme.breakpoints.up("md")]: {
            width: "600px",
        },
        backgroundColor: 'white',
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

const InstallingRayChat = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const value = "هزینه و زمان زیادی برای هدایت کاربران به سایتتون صرف می‌کنید اما خیلی راحت این مشتریان بالقوه رو از دست می‌دید. با کاربران گفتگو کنید، نیازشون رو بدونید، رفتارشون رو بررسی کنید و حسِ خوبِ خاص بودن رو بهشون القاء کنید. رایچت این بستر رو برای شما فراهم کرده است";
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
                    <h2
                        style={{ color: ui_details.primary }}
                        className={classes.textCenter}
                    >
                        نصب رایچت در سایت
                    </h2>
                    <p style={{ color: ui_details.gray }}>
                        برای فعال سازی رایچت کد زیر را قبل از اتمام تگ head در
                        سایت کپی کنید
                    </p>
                </div>
                <form autoComplete="off">
                    <Box display="flex">
                        <TextField
                            id="filled-basic"
                            value={value}
                            type="text"
                            variant="filled"
                            disabled
                            className={
                                matches ? classes.textField : classes.bigField
                            }
                        />
                    </Box>
                </form>
            </ThemeProvider>
            <Box display="flex" style={{ marginTop: "5px" }}>
                <Button style={{ color: ui_details.primary }} onClick={() => navigator.clipboard.writeText(value)}>
                    کپی در کلیپ بورد
                </Button>
            </Box>
            <Box mt="50px">
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        background: ui_details.primary,
                        padding: "8px",
                    }}
                    href="/dashboard"
                >
                    ورود به ناحیه کاربری
                </Button>
            </Box>
            <br />
        </Box>
    );
};

export default InstallingRayChat;
