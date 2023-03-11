import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { dark_mode } from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    textField: {
        [theme.breakpoints.down("xs")]: {
            width: "40ch",
        },
        [theme.breakpoints.up("sm")]: {
            width: "50ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "30ch",
        },
    },
    selectField: {
        [theme.breakpoints.down("xs")]: {
            width: "40ch",
        },
        [theme.breakpoints.up("sm")]: {
            width: "50ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "30ch",
        },
    },
}));

const InfoForm = () => {
    const classes = useStyles();
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down("xs"));
    const dark = useSelector((state) => state.darkMode.dark);

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={6}>
                <Box display="flex" justifyContent="center">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="نام و نام خانوادگی"
                        type="text"
                        variant="filled"
                        className={classes.textField}
                        style={{
                            backgroundColor:
                                dark === true ? dark_mode.card : "",
                        }}
                    />
                </Box>
                <Box display="flex" justifyContent="center">
                    <TextField
                        margin="dense"
                        id="name"
                        label="ایمیل"
                        type="email"
                        variant="filled"
                        className={classes.textField}
                        style={{
                            backgroundColor:
                                dark === true ? dark_mode.card : "",
                        }}
                    />
                </Box>
                <Box display="flex" justifyContent="center">
                    <TextField
                        margin="dense"
                        id="name"
                        label="رمز عبور"
                        type="password"
                        variant="filled"
                        className={classes.textField}
                        style={{
                            backgroundColor:
                                dark === true ? dark_mode.card : "",
                        }}
                    />
                </Box>
                <Box display="flex" justifyContent="center" mt="5px">
                    <Select
                        id="demo-simple-select-filled"
                        variant="filled"
                        className={classes.selectField}
                    >
                        <MenuItem value="">
                            <em>هیچکدام</em>
                        </MenuItem>
                        <MenuItem value={10}>گزینه یک</MenuItem>
                        <MenuItem value={20}>گزینه دوم</MenuItem>
                        <MenuItem value={30}>گزینه سوم</MenuItem>
                    </Select>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Box display="flex" justifyContent="center">
                    <TextField
                        margin="dense"
                        id="name"
                        label="نقش"
                        type="text"
                        variant="filled"
                        className={classes.textField}
                        style={{
                            backgroundColor:
                                dark === true ? dark_mode.card : "",
                        }}
                    />
                </Box>
                <Box display="flex" justifyContent="center">
                    <TextField
                        margin="dense"
                        id="name"
                        label="شماره تماس"
                        type="email"
                        variant="filled"
                        className={classes.textField}
                        style={{
                            backgroundColor:
                                dark === true ? dark_mode.card : "",
                        }}
                    />
                </Box>
                <Box display="flex" justifyContent="center">
                    <TextField
                        margin="dense"
                        id="name"
                        label="تکرار رمز عبور"
                        type="password"
                        variant="filled"
                        className={classes.textField}
                        style={{
                            backgroundColor:
                                dark === true ? dark_mode.card : "",
                        }}
                    />
                </Box>
                <Box display="flex" justifyContent="center" mt="5px">
                    <Select
                        id="demo-simple-select-filled"
                        variant="filled"
                        className={classes.selectField}
                    >
                        <MenuItem value="">
                            <em>هیچکدام</em>
                        </MenuItem>
                        <MenuItem value={10}>گزینه یک</MenuItem>
                        <MenuItem value={20}>گزینه دوم</MenuItem>
                        <MenuItem value={30}>گزینه سوم</MenuItem>
                    </Select>
                </Box>
            </Grid>
            <Box
                mt="20px"
                style={{ color: dark === true ? dark_mode.primary : "" }}
            >
                <Checkbox
                    defaultChecked
                    color="primary"
                    style={{ color: dark_mode.primary }}
                />
                دسترسی مدیر
            </Box>
        </Grid>
    );
};

export default InfoForm;
