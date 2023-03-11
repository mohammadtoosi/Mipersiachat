import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { departmentAction } from "../../redux/department";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
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

const DepartmentForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const dark = useSelector((state) => state.darkMode.dark);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // useEffect(() => {
    //     titleChangeHandler();
    //     descChangeHandler();
    // }, [title, description]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        dispatch(departmentAction.submitForm());
    };


    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12}>
                <form onSubmit={onSubmitForm}>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="عنوان"
                            type="text"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                            }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            multiline
                            rows={8}
                            margin="dense"
                            id="name"
                            label="توضیحات"
                            type="email"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                            }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
};

export default DepartmentForm;
