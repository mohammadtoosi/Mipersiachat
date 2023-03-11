import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
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
            width: "60ch",
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
            <Grid item xs={12} sm={12} md={12}>
                <Box display="flex" justifyContent="center">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="اضافه کردن برچسب"
                        type="text"
                        variant="filled"
                        className={classes.textField}
                        style={{
                            backgroundColor:
                                dark === true ? dark_mode.card : "",
                        }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default InfoForm;
