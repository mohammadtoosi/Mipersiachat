import React from "react";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";
import UI from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    btn: {
        borderRadius: "7px",
    },
}));

const ChatButton = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);

    return (
        <IconButton
            onClick={props.onClick}
            className={classes.btn}
            style={{
                backgroundColor: dark === true ? UI.primary : UI.menu,
                color: dark === true ? "#212121" : "",
            }}
        >
            {props.children}
        </IconButton>
    );
};

export default ChatButton;
