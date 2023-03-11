import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { subMenuDrawerActions } from "../../redux/submenu";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { dark_mode as darkMode } from "../UI/UIDetails";

import Conversation from "./Conversation";
import DatePicker from "./DatePicker";
// import Tabs from "./Tabs";

const useStyles = makeStyles({
    list: {
        width: '100%',
    },
    fullList: {
        width: "auto",
    },
});

const Lists = () => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <div className={classes.list} role="presentation">
            <List style={{backgroundColor: dark ? darkMode.card : ''}}>
                {/* {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                )} */}
                <ListItem>
                    <Conversation />
                </ListItem>
                <ListItem>
                    <DatePicker />
                </ListItem>
            </List>
            {/* <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </div>
    );
};

const SubMenuMobileDrawer = () => {
    const show = useSelector((state) => state.submenu.open);
    const dispatch = useDispatch();

    const closeDrawerHandler = () => {
        dispatch(subMenuDrawerActions.closeDrawer());
    };
    const openDrawerHandler = () => {
        dispatch(subMenuDrawerActions.openDrawer());
    };
    return (
        <div>
            {/* onclose onopen */}
            <SwipeableDrawer
                anchor="bottom"
                open={show}
                onClose={closeDrawerHandler}
                onOpen={openDrawerHandler}
            >
                <Lists />
            </SwipeableDrawer>
        </div>
    );
};

export default SubMenuMobileDrawer;
