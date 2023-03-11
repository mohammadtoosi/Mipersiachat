import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { dialogActions } from "../../redux/dialog";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, withStyles } from "@material-ui/core";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    textField: {
        width: "30ch",
    },
    button: {
        backgroundColor: UI.primary,
    },
    icon: {
        backgroundColor: UI.primary,
    },
    dialog: {
        backgroundColor: UI.appbar,
    },
}));

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    backgroundDark: {
        backgroundColor: '#000000',
        color: UI.primary,
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <MuiDialogTitle
            disableTypography
            className={[classes.root, dark ? classes.backgroundDark : ""]}
            {...other}
        >
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon style={{ color: dark ? UI.primary : "" }} />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogPanel = (props) => {
    const dispatch = useDispatch();
    const dark = useSelector((state) => state.darkMode.dark);

    const closeClickHandler = () => {
        dispatch(dialogActions.closeDialog());
    };

    const classes = useStyles();
    return (
        <div>
            <Dialog
                open={props.show}
                onClose={closeClickHandler}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={closeClickHandler}
                >
                    {props.title}
                </DialogTitle>
                <DialogContent
                    className={classes.dialog}
                    style={{
                        backgroundColor: dark === true ? darkMode.card : "",
                    }}
                >
                    {props.children}
                </DialogContent>
                <DialogActions
                    className={classes.dialog}
                    style={{
                        backgroundColor: dark === true ? darkMode.card : "",
                    }}
                >
                    {props.action1}
                    {props.action2}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogPanel;
