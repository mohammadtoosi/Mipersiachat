import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles} from "@material-ui/core";
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

const AddQuestionForm = () => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12}>
                <Box display="flex" justifyContent="center">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="عنوان سوال"
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
                        label="سوال"
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
                        multiline
                        rows={8}
                        margin="dense"
                        id="name"
                        label="توضیحات سوال"
                        type="password"
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

export default AddQuestionForm;
