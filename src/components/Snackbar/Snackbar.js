import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { snackbarActions } from "../../redux/snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

const SnackbarAlert = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const open = useSelector((state) => state.snackbar.isSnackbarOpen);

    const closeSnackbarClickHandler = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        dispatch(snackbarActions.closeSnackbarAlert());
    };

    return (
        <div className={classes.root}>
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={closeSnackbarClickHandler}
            >
                <Alert onClose={closeSnackbarClickHandler} severity={props.type}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SnackbarAlert;
