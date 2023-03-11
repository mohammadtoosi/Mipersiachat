import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatListActions } from "../../redux/chat-list";
import { makeStyles } from "@material-ui/core";
import { useMediaQuery, useTheme } from "@material-ui/core";
import moment from "moment";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import TabCard from "../Card/TabCard";
import useChat from "../../hooks/useChat";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";
import ChatTabs from "./ChatTabs";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Conversation from "../SubMenu/Conversation";
import DatePicker from "../SubMenu/DatePicker";
import SnackbarAlert from "../Snackbar/Snackbar";
import routes from "../../api/routes";

const useStyles = makeStyles((theme) => ({
    body: {
        height: "100%",
    },
}));

const ChatList = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const xs = useMediaQuery(theme.breakpoints.down("xs"));
    const sm = useMediaQuery(theme.breakpoints.down("sm"));

    const dark = useSelector((state) => state.darkMode.dark);
    const searchTerm = useSelector((state) => state.chatList.searchTerm);
    const dateSearchTerm = useSelector(
        (state) => state.chatList.searchTermByDate
    );
    const userTagSearch = useSelector(
        (state) => state.chatList.searchByUserTag
    );

    const [currentChat, setCurrentChat] = useState(null);
    const { data, loading, error } = useChat(routes.chat);

    const unanswered = data.filter((f) => f.answerStatus === "unanswered");
    const answered = data.filter((f) => f.answerStatus === "answer");
    const chat = data.filter((f) => f.answerStatus === "chat");
    const cancel = data.filter((f) => f.answerStatus === "cenel");

    const selectedDataClickHandler = (data) => {
        setCurrentChat(data);
        dispatch(ChatListActions.getData(data));
        dispatch(ChatListActions.setActiveChatId(data?.id));
        // seenMessagesAsync();
    };

    const AllChat = (
        <>
            {loading && <CircularProgress style={{ color: UI.primary }} />}
            {data
                .filter((value) => {
                    if (searchTerm === "") {
                        return value;
                    } else if (value?.customer?.mobile?.includes(searchTerm)) {
                        return value;
                    }
                })
                .map((data, i) => (
                    <Box key={i} onClick={() => selectedDataClickHandler(data)}>
                        <TabCard
                            title={data?.customer?.mobile}
                            time={moment(
                                data?.message[data?.message?.length - 1]
                                    ?.created
                            ).format("hh:mm")}
                            messages={data?.unreadMessagesCounter}
                        >
                            {/* {message === ""
                            ? data.message[
                                  data?.message?.length - 1
                              ]?.content.substring(0, 30)
                            : message} */}
                            {data.message[
                                data?.message?.length - 1
                            ]?.content.substring(0, 30)}
                        </TabCard>
                    </Box>
                ))}
        </>
    );

    return (
        <Box
            className={classes.body}
            boxShadow={3}
            hidden={currentChat !== null ? true : false}
        >
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <div className={classes.list} role="presentation">
                        <List
                            style={{
                                backgroundColor:
                                    dark === true ? darkMode.card : "",
                            }}
                        >
                            <Box>
                                <ListItem>
                                    <Conversation chatData={data} />
                                </ListItem>
                            </Box>
                            <Box>{AllChat}</Box>
                        </List>
                    </div>
                    {error && <SnackbarAlert message={error} type="error" />}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChatList;
