import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { subMenuDrawerActions } from "../../redux/submenu";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";
import TabCard from "../Card/TabCard";
import baseUrl from "../../api/base";
import useChat from "../../hooks/useChat";

import Conversation from "./Conversation";
import DatePicker from "./DatePicker";
// import Tabs from "./Tabs";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#000000",
    },
    list: {
        width: 410,
    },
    fullList: {
        width: "auto",
    },
    drawer: {
        backgroundColor: "#000000",
    },
});

const Lists = () => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    const { data, loading, error } = useChat(
        `${baseUrl}/chat/chat/?room__roomName=&room=&department=&operator=&answer=unanswered`
    );

    let content;
    if (loading) {
        content = <CircularProgress style={{ color: UI.primary }} />;
    } else {
        content = data.map((nData, i) => (
            <div key={i}>
                <TabCard
                    title={nData.customer.mobile}
                    time="11:11"
                    messages={nData.message.length}
                >
                    {nData.message[nData.message.length - 1]?.content}
                </TabCard>
            </div>
        ));
    }

    return (
        <div className={classes.list} role="presentation">
            <List
                style={{ backgroundColor: dark === true ? darkMode.card : "" }}
            >
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
                <ListItem>
                    <Box>
                        <Box display="flex" mx="8px">
                            <h4 style={{ color: dark ? UI.primary : "" }}>
                                گفت و گو های درحال انتظار
                            </h4>
                        </Box>
                        <Box display="flex" flexDirection="column">
                            {content}
                        </Box>
                    </Box>
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

const SubMenuDrawer = () => {
    const classes = useStyles();
    const show = useSelector((state) => state.submenu.md);
    const dispatch = useDispatch();

    const closeDrawerHandler = () => {
        dispatch(subMenuDrawerActions.closeMdDrawer());
    };
    const openDrawerHandler = () => {
        dispatch(subMenuDrawerActions.openMdDrawer());
    };
    return (
        <div>
            {/* onclose onopen */}
            <SwipeableDrawer
                anchor="left"
                open={show}
                onClose={closeDrawerHandler}
                onOpen={openDrawerHandler}
            >
                <Lists />
            </SwipeableDrawer>
        </div>
    );
};

export default SubMenuDrawer;
