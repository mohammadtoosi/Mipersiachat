import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, FilledInput, ThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ui_details from "../UI/UIDetails";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Countdown from "react-countdown";

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

// for do task after time, just copy it!
// const renderer = ({ seconds, completed }) => {
//     if (completed) {
//
//       return <Completionist />;
//     } else {
//       // Render a countdown
//       return (
//         <span>
//           {seconds}
//         </span>
//       );
//     }
//   };

const renderer = ({ seconds, completed }) => {
    return <span style={{color: ui_details.primary}}>{seconds} ثانیه</span>;
};

const ConfirmPhoneNumberForm = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const [confirm, setConfirm] = useState();

    const onInputChange = (event) => {
        setConfirm(event.target.value);
    };
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
                        تایید شماره موبایل
                    </h2>
                    <p style={{ color: ui_details.gray }}>
                        کد ۴ رقمی ارسال شده به شماره موبایل را وارد کنید
                    </p>
                </div>

                <form autoComplete="off">
                    <Box>
                        <FilledInput
                            id="filled-basic"
                            placeholder="کد تایید ۴ رقمی"
                            variant="filled"
                            onChange={onInputChange}
                            className={
                                matches ? classes.textField : classes.bigField
                            }
                        />
                    </Box>
                </form>
            </ThemeProvider>
            <Box display="flex" style={{ marginTop: "10px" }}>
                <div className={classes.last}>
                    <Countdown date={Date.now() + 59000} renderer={renderer} />
                </div>
                <div>
                    <Button style={{ color: ui_details.primary }}>
                        ارسال مجدد کد
                    </Button>
                </div>
            </Box>
            <Box mt="50px">
                <Button
                    variant="contained"
                    color="primary"
                    href="/site-info"
                    style={{
                        background: ui_details.primary,
                        padding: "8px",
                        margin: "5px",
                    }}
                >
                    بعدی
                </Button>
                <Button
                    style={{
                        color: ui_details.primary,
                        padding: "8px",
                        margin: "5px",
                    }}
                    href="/personal-info"
                >
                    قبلی
                </Button>
            </Box>
            <br />
        </Box>
    );
};

export default ConfirmPhoneNumberForm;
