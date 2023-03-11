import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import UI from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    color: {
        color: UI.menuItemColor,
    },
    colorDark: {
        color: UI.primary,
    },
}));

const MenuItem = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <Box>
            <Tooltip title={<h3>{props.title}</h3>} placement="left">
                <IconButton
                    className={dark === true ? classes.colorDark : classes.color}
                    href={props.href}
                    onClick={props.Click}
                >
                    {props.children}
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default MenuItem;
