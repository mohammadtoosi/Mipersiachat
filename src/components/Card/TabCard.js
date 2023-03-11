import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import UI from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    body: {
    },
    color: {
        backgroundColor: UI.primary,
    },
    wid: {
        // [theme.breakpoints.down('xs')]: {
        //     width: '200px'
        // },
        // [theme.breakpoints.up("tiny")]: {
        //     width: "200px",
        // },
        // [theme.breakpoints.up("sm")]: {
        //     width: "160px",
        // },
        // [theme.breakpoints.up("md")]: {},
    },
    title: {
        fontSize: "14px",
        color: UI.tabLink,
    },
    message: {
        fontSize: "14px",
        color: UI.tabLink,
    },
    time: {
        color: UI.tabLink,
    },
    badgeWid: {
        // //width: "260px",
        // [theme.breakpoints.down("xs")]: {
        //     width: "280px",
        // },
        // [theme.breakpoints.up("tiny")]: {
        //     width: "200px",
        // },
        // [theme.breakpoints.up("sm")]: {
        //     width: "170px",
        // },
        // [theme.breakpoints.up("md")]: {},
    },
    badge: {
        color: UI.primary,
    },
}));

const TabCard = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <Box
            display="flex"
            mt="10px"
            mx="30px"
            className={`tabcard body`}
        >
            <Box display="flex" alignItems="center" mt="-12px">
                <Avatar className={classes.color}>
                    <PersonIcon />
                </Avatar>
            </Box>
            <Box mt="-17px" mx="10px">
                <Box display="flex">
                    <h5
                        className={`${classes.wid} timeWidth ${classes.title}`}
                        style={{ color: dark === true ? UI.primary : "" }}
                    >
                        {props.title}
                    </h5>
                    <h5 style={{ marginTop: "26px" }} className={`${classes.time}`}>
                        {props.time}
                    </h5>
                </Box>
                <Box display="flex" mt="-30px">
                    <p className={`${classes.message} unreadWidth ${classes.badgeWid}`}>
                        {props.children}
                    </p>
                    <p className={classes.badge}>[{props.messages}]</p>
                </Box>
            </Box>
        </Box>
    );
};

export default TabCard;
