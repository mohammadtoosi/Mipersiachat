import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { dialogActions } from "../../redux/dialog";
// import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";

const ScrollDialog = (props) => {
    //   const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [scroll, setScroll] = React.useState("paper");
    const open = useSelector((state) => state.dialog.scroll);
    const dark = useSelector((state) => state.darkMode.dark);

    const closeClickHandler = () => {
        dispatch(dialogActions.closeDialog());
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={closeClickHandler}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle
                    style={{
                        backgroundColor: dark === true ? "#000000" : "",
                        color: dark === true ? UI.primary : "",
                    }}
                    id="scroll-dialog-title"
                >
                    {props.title}
                </DialogTitle>
                <DialogContent
                    dividers={scroll === "paper"}
                    style={{
                        backgroundColor: dark === true ? darkMode.card : "",
                    }}
                >
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        style={{ color: dark === true ? UI.primary : "" }}
                    >
                        {props.children}
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={closeClickHandler} color="primary">
                        بستن
                    </Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
};

export default ScrollDialog;
