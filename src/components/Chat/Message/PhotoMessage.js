import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
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
        width: "100%",
    },
    bodyDark: {
        background: darkMode.nav,
        color: UI.primary,
        borderRadius: "10px",
        width: "430px",
    },
}));

const PhotoMessage = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <Box
            className={dark ? classes.bodyDark : classes.body}
            position="relative"
            dir="rtl"
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
                    <p>{props.name}</p>
                </Box>
            </Box>
            <Box p={2}>
                <img
                    src={props.image}
                    alt="message"
                    width="400px"
                    height="400px"
                />
            </Box>
            <Box position="absolute" left="10px">
                <p>{props.time}</p>
            </Box>
        </Box>
    );
};

export default PhotoMessage;
