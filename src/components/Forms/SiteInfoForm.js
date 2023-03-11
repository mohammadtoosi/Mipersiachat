import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, FilledInput, ThemeProvider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
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

const ConfirmPhoneNumberForm = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [checked, setChecked] = useState(false);

    const onNameChange = (event) => {
        setName(event.target.value);
        console.log(name);
    }
    const onLinkChange = (event) => {
        setLink(event.target.value);
        console.log(link);
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
            <div className={classes.textCenter}>
                    <h2 style={{ color: ui_details.primary }}>
                        اطلاعات سایت
                    </h2>
                    <p style={{ color: ui_details.gray }}>
                        لطفا اطلاعات وبسایت خود را وارد کنید
                    </p>
                </div>
                <form autoComplete="off">
                    <Box>
                        <FilledInput
                            id="filled-basic"
                            placeholder="نام سایت"
                            variant="filled"
                            onChange={onNameChange}
                            className={
                                matches ? classes.textField : classes.bigField
                            }
                        />
                    </Box>
                    <Box mt="30px">
                        <FilledInput
                            id="filled-basic"
                            placeholder="ادرس سایت (مثال http://raychat.io)"
                            variant="filled"
                            onChange={onLinkChange}
                            className={
                                matches ? classes.textField : classes.bigField
                            }
                        />
                    </Box>
                </form>
            </ThemeProvider>
            <Box display="flex" style={{ marginTop: "20px" }}>
                <span style={{ color: ui_details.gray }}>
                    <Checkbox checked={checked} onClick={() => setChecked(!checked)} color="primary" />
                    <Link
                        style={{ color: ui_details.primary, cursor: "pointer" }}
                    >
                        {" "}
                        قوانین و مقررات رایچت{" "}
                    </Link>
                    را خوانده ام و می پذیرم
                </span>
            </Box>
            <Box mt="50px">
                <Button
                    variant="contained"
                    color="primary"
                    href="/installing-raychat"
                    disabled={!checked === true ? true : false}
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
                    href="/confirm-number"
                >
                    قبلی
                </Button>
            </Box>
            <br />
        </Box>
    );
};

export default ConfirmPhoneNumberForm;