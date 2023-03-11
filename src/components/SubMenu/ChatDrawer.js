import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../redux/chat-drawer";
import { notificationActions } from "../../redux/notification";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import NotiCard from "../Card/NotiCard";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import Chat from "../Chat/Chat";
import { ChatListActions } from "../../redux/chat-list";

const useStyles = makeStyles({
    list: {
        width: 320,
    },
    fullList: {
        width: "auto",
    },
});

const Lists = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const dark = useSelector((state) => state.darkMode.dark);
    const chat = useSelector((state) => state.notification.chat);

    let content = chat
        ?.filter((unread) => unread.unreadMessagesCounter !== 0)
        ?.map((c, i) => (
            <ListItem component="a" href="/dashboard/chat">
                <Box key={i} onClick={() => selectedDataClickHandler(c)}>
                    <NotiCard
                        title={c?.customer?.mobile}
                        messages={c?.unreadMessagesCounter}
                    />
                </Box>
            </ListItem>
        ));

    const selectedDataClickHandler = (selectedChat) => {
        dispatch(chatActions.closeChatDrawer());
    };

    return (
        <div className={classes.list} role="presentation">
            <List>{content}</List>
        </div>
    );
};

const ChatDrawer = () => {
    //const classes = useStyles();
    const show = useSelector((state) => state.chat.chat);
    const dispatch = useDispatch();

    const closeDrawerHandler = () => {
        dispatch(chatActions.closeChatDrawer());
    };
    const openDrawerHandler = () => {
        dispatch(chatActions.openChatDrawer());
    };
    return (
        <div>
            {/* onclose onopen */}
            <SwipeableDrawer
                anchor="right"
                open={show}
                onClose={closeDrawerHandler}
                onOpen={openDrawerHandler}
            >
                <Lists />
            </SwipeableDrawer>
        </div>
    );
};

export default ChatDrawer;
