import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import IconButtom from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import AttachIcon from "@material-ui/icons/AttachFile";
import DownloadIcon from "@material-ui/icons/GetApp";
import UI, { dark_mode as darkMode } from "../../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: UI.primary,
    },
    body: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderRadius: "10px",
        width: "340px",
    },
    bodyDark: {
        background: darkMode.nav,
        color: UI.primary,
        borderRadius: "10px",
        width: "340px",
    },
}));

const FileMessage = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <Box
            className={dark ? classes.bodyDark : classes.body}
            position="relative"
            dir="rtl"
            mt="200px"
        >
            <Box display="flex" position="absolute" top="-70px">
                {props.avatar === "" ? (
                    <Avatar
                        alt="this is a avatar"
                        className={classes.largeAvatar}
                    >
                        <PersonIcon />
                    </Avatar>
                ) : (
                    <Avatar
                        alt="this is a avatar"
                        src={props.avatar}
                        className={classes.largeAvatar}
                    />
                )}
                <Box mx="20px">
                    <p>علی اکبر منشی پور</p>
                </Box>
            </Box>
            <Box p={2}>
                <a
                    href="http://dash.viras.ir:8500/files/test.txt"
                    download="test.txt"
                >this is a file click to download</a>
            </Box>
            <Box position="absolute" left="10px">
                <p>10:50</p>
            </Box>
        </Box>
    );
};

export default FileMessage;
