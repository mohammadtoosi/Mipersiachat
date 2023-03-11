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
        backgroundColor: UI.primary
    },
    body: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        borderRadius: "10px",
        width: "200px",
    },
    bodyDark: {
        background: darkMode.nav,
        color: UI.primary,
        borderRadius: "10px",
        width: "200px",
    },
}));

// operator name
// operator avatar
// operator message
// message time
// message alignment

const TextMessage = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);

    return (
        <Box display="flex" dir="rtl" position="relative">
            <Box display="flex">
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
            </Box>
            <Box mt="-40px" mx="30px">
                <h4 style={{ color: dark ? UI.primary : "#000000" }}>
                    {props.name}
                </h4>
            </Box>
            <Box
                position="absolute"
                left="80px"
                p={1}
                className={dark ? classes.bodyDark : classes.body}
                mt="10px"
            >
                <p>{props.message}</p>
            </Box>
            <Box mt="70px" position="absolute" left="80px">
                <p style={{ color: dark ? UI.primary : "" }}>{props.time}</p>
            </Box>
        </Box>
    );
};

export default TextMessage;
