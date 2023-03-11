import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatListActions } from "../../redux/chat-list";
import { makeStyles } from "@material-ui/core";
import { useMediaQuery, useTheme } from "@material-ui/core";
import moment from "moment";
import Box from "@material-ui/core/Box";
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
        width: "420px",
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

    const checkFilters = () => {
        if (searchTerm === "" || dateSearchTerm === "" || userTagSearch === 0) {
            return false;
        } else return false;
    };

    // const seenMessagesAsync = async () => {
    //     const token = localStorage.getItem("token");
    //     try {
    //         const response = await fetch(`${routes.chat}/?chat__room__roomName=&chat=${currentChat.id}&user=&isReady=`, {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: token,
    //             },
    //             body: JSON.stringify({
    //                 isReady: true,
    //             }),
    //         });
    //         const data = await response.json();
    //         console.log(data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    useEffect(() => {
        dispatch(ChatListActions.setSearchTerm("0"));
        const check = setTimeout(() => {
            dispatch(ChatListActions.setSearchTerm(""));
        }, 1000);
    }, []);

    const AllChat = (
        <>
            {loading && <CircularProgress style={{ color: UI.primary }} />}
            {searchTerm !== ""
                ? data
                      .filter((value) => {
                          if (searchTerm === "") {
                              return value;
                          } else if (
                              value?.customer?.mobile?.includes(searchTerm)
                          ) {
                              return value;
                          }
                      })
                      .map((data, i) => (
                          <Box
                              key={i}
                              onClick={() => selectedDataClickHandler(data)}
                          >
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
                      ))
                : dateSearchTerm !== ""
                ? data
                      .filter((value) => {
                          if (dateSearchTerm === "") {
                              return value;
                          } else if (value?.created?.includes(dateSearchTerm)) {
                              return value;
                          }
                      })

                      .map((data, i) => (
                          <Box
                              key={i}
                              onClick={() => selectedDataClickHandler(data)}
                          >
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
                      ))
                : userTagSearch !== ""
                ? data
                      .filter((value) => {
                          if (userTagSearch === "") {
                              return value;
                          } else if (value?.id === userTagSearch) {
                              return value;
                          }
                      })
                      .map((data, i) => (
                          <Box
                              key={i}
                              onClick={() => selectedDataClickHandler(data)}
                          >
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
                      ))
                : ""}
        </>
    );

    const UnAnsweredChat = (
        <>
            {unanswered.map((data, i) => (
                <Box key={i} onClick={() => selectedDataClickHandler(data)}>
                    <TabCard
                        title={data?.customer?.mobile}
                        time={moment(data?.time).format("hh:mm")}
                        messages={data?.unreadMessagesCounter}
                    >
                        {data.message[
                            data?.message?.length - 1
                        ]?.content.substring(0, 30)}
                    </TabCard>
                </Box>
            ))}
        </>
    );

    return (
        <Box className={classes.body} boxShadow={3}>
            <div className={classes.list} role="presentation">
                <List
                    style={{
                        backgroundColor: dark === true ? darkMode.card : "",
                    }}
                >
                    <Box>
                        <ListItem>
                            <Conversation chatData={data} />
                        </ListItem>
                    </Box>
                    <Box>
                        <ListItem>
                            <DatePicker />
                        </ListItem>
                    </Box>
                    <ListItem>
                        <Box>
                            <ChatTabs
                                width="400px"
                                chat={AllChat}
                                waiting={UnAnsweredChat}
                            />
                        </Box>
                    </ListItem>
                </List>
            </div>
            {error && <SnackbarAlert message={error} type="error" />}
        </Box>
    );
};

export default ChatList;
