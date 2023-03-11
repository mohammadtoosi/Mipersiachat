import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import UI from "../UI/UIDetails";
import { dark_mode as dark } from "../UI/UIDetails";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
    body: {
        backgroundColor: UI.menu,
        borderRadius: "7px",
    },
    color: {
        backgroundColor: UI.primary,
    },
    title: {
        fontSize: "14px",
        color: UI.tabLink,
    },
    message: {
        fontSize: "14px",
        color: UI.tabLink,
    },
    backgroundDark: {
        backgroundColor: dark.card,
        borderRadius: "7px",
    },
    colorDark: {
        color: dark.primary,
    },
    sColorDark: {
        color: "#000000",
    },
}));

const TabCard = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <Box
            display="flex"
            mt="10px"
            mx=""
            className={dark === true ? classes.backgroundDark : classes.body}
            p={1}
            boxShadow={5}
        >
            <FirstCard title={props.title} type={props.type} online={props.online} />
        </Box>
    );
};

const FirstCard = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <>
            <Box display="flex" alignItems="center">
                <Badge
                    color={props.online ? 'secondary' : 'default'}
                    variant="dot"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                >
                    <Avatar
                        className={classes.color}
                        style={{ marginRight: "20px" }}
                    >
                        <PersonIcon />
                    </Avatar>
                </Badge>
            </Box>
            <Box mt="-17px" mx="10px">
                <Box display="flex">
                    <h5
                        className={
                            dark === true ? classes.colorDark : classes.title
                        }
                    >
                        {props.title}
                    </h5>
                </Box>
                <Box display="flex" mt="-40px">
                    <p
                        className={
                            dark === true ? classes.sColorDark : classes.message
                        }
                    >
                        {props.type}
                    </p>
                </Box>
            </Box>
        </>
    );
};

export default TabCard;
