import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import LanguageIcon from "@material-ui/icons/Language";
import { makeStyles } from "@material-ui/core";
import UI from "../UI/UIDetails";
import { dark_mode as dark } from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    link: {
        padding: "5px",
        color: UI.gray,
    },
    iconDarkColor: {
        color: dark.webCardIcon,
    },
    textDarkColor: {
        color: dark.webCardText,
    },
}));

const WebCard = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <Box>
                <LanguageIcon style={{ fontSize: "100px", color: dark === true ? UI.primary : UI.gray }} />
            </Box>
            <Box mt="-10px">
                <h4 className={dark === true ? classes.textDarkColor : classes.link}>{props.children}</h4>
            </Box>
        </Box>
    );
};

export default WebCard;
