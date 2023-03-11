import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dialogActions } from "../../redux/dialog";
import { fileActions } from "../../redux/file";
import { snackbarActions } from "../../redux/snackbar";
import { notificationActions } from "../../redux/notification";
import { makeStyles } from "@material-ui/core";
import { useMediaQuery, useTheme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import MenuBar from "./MenuBar";
import UserInfoDialog from "../DialogForms/UserInfoDialog";
import ChatInfo from "./ChatInfo";
import LabelDialog from "../DialogForms/LabelDialog";
import ChatCommentDialog from "../DialogForms/ChatCommentDialog";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";
import Picker from "emoji-picker-react";
import IconButton from "@material-ui/core/IconButton";
import ChatButton from "./ChatButton";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import SendIcon from "@material-ui/icons/Send";
import FileUploadDialog from "../DialogForms/FileUploadDialog";
import useRecorder from "../../hooks/useRecorder";
//import useRecordingList from "../../hooks/use-recordings-list";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MessageList } from "react-chat-elements";
import { Input } from "react-chat-elements";
import routes from "../../api/routes";
//import useGetFiles from "../../hooks/useGetFiles";
import "react-chat-elements/dist/main.css";
import InputEmoji from "react-input-emoji";

const useStyles = makeStyles((theme) => ({
    body: {
        height: "600px",
    },
    textFieldWidth: {
        width: "100%",
    },
    input: {
        border: "none",
        backgroundColor: darkMode.nav,
        padding: "12px",
        borderRadius: "7px",
        outline: "none",
    },
    emPos: {
        position: "absolute",
        top: "50%",
        left: "50%",
    },
}));

const Chat = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const sm = useMediaQuery(theme.breakpoints.down("sm"));

    const show = useSelector((state) => state.dialog.chatInfo);
    const dark = useSelector((state) => state.darkMode.dark);
    const selectedChat = useSelector((state) => state.chatList.selectedData);

    const [error, setError] = useState(null);

    // get selected file
    const selectedFile = useSelector((state) => state.file.selectedFile);
    const fileType = useSelector((state) => state.file.type);
    const isFile = useSelector((state) => state.file.isFile);
    const [selectedAudioFile, setSelectedAudioFile] = useState();

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const [roomName, setRoomName] = useState("NOROOM");
    const [socket, setSocket] = useState(
        new WebSocket(`${routes.chatSocket}/${roomName}/`)
    );

    const [openEmoji, setOpenEmoji] = useState(false);

    const { recorderState, ...handlers } = useRecorder();
    const { initRecording } = recorderState;
    const { startRecording, saveRecording, cancelRecording } = handlers;
    const { audio } = recorderState;
    // const { recordings } = useRecordingList(audio);
    const [isLoading, setIsLoading] = useState(false);

    const ref = useRef(null);

    // socket
    useEffect(() => {
        socket.onopen = () => {
            console.log(`socket connected to ${socket.url}`);
        };
        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setCurrentChat([
                ...(currentChat ?? []),
                {
                    position: "right",
                    type: returnFileType(data),
                    text: returnContent(data),
                    date: new Date(),
                    data: {
                        uri: data,
                    },
                },
            ]);
        };
        socket.onerror = (error) => {
            console.error(error);
        };
        // socket.onclose = () => {
        //     setSocket(URL);
        // };
    }, [socket.onopen, socket.onmessage, currentChat]);

    // selected chat
    useEffect(() => {
        setRoomName(selectedChat?.room?.roomName);
        setSocket(new WebSocket(`${routes.chatSocket}/${roomName}/`));
        // console.log("roomName:", roomName);
        // console.log("Socket URL is:", socket.url);
    }, [selectedChat, roomName]);

    // selected file
    useEffect(() => {
        if (selectedFile !== null) {
            switch (fileType) {
                case "photo":
                    setMessages([
                        ...messages,
                        {
                            position: "right",
                            type: "photo",
                            text: selectedFile?.file,
                            data: {
                                uri: selectedFile?.file,
                            },
                        },
                    ]);
                    setMessage(selectedFile?.file);
                    break;
                case "audio":
                    setMessages([
                        ...messages,
                        {
                            position: "right",
                            type: "audio",
                            text: selectedFile?.file,
                            data: {
                                uri: selectedFile?.file,
                            },
                        },
                    ]);
                    setMessage(selectedFile?.file);
                    break;
                case "file":
                    setMessages([
                        ...messages,
                        {
                            position: "right",
                            type: "file",
                            text: selectedFile?.file,
                            data: {
                                uri: selectedFile?.file,
                            },
                        },
                    ]);
                    setMessage(selectedFile?.file);
                    break;
                case "text":
                    setMessages([
                        ...messages,
                        {
                            position: "right",
                            type: "text",
                            text: message,
                            data: {
                                uri: selectedFile?.file,
                            },
                        },
                    ]);
                    break;
                default:
                    break;
            }
        }
    }, [selectedFile]);

    // upload voice file
    const uploadVoiceFileAsync = async (file) => {
        const uploadData = new FormData();
        let voiceFile = new File([file]);
        uploadData.append("file", file, "voice");
        const token = localStorage.getItem("token");
        try {
            setIsLoading(true);
            const response = await fetch(routes.file, {
                method: "POST",
                headers: {
                    Authorization: token,
                },
                body: uploadData,
            });
            const data = await response.json();
            setSelectedAudioFile(data);
        } catch (err) {
            setError("مشکلی پیش اومده لطفا صفحه رو رفرش کنید!");
            dispatch(snackbarActions.openSnackbarAlert());
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (audio !== null) {
            uploadVoiceFileAsync(audio);
            setMessage(audio);
            // console.log(audio);
        }
    }, [audio]);

    // send and save messages
    const sendMessageClickHandler = async () => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        socket.send(message);
        setMessages([
            ...messages,
            {
                position: "right",
                type: returnFileType(message),
                text: returnContent(message),
                date: new Date(),
                data: {
                    uri: message,
                },
            },
        ]);
        // save message
        try {
            const response = await fetch(routes.message, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    content: `<p>${message}</p>`,
                    chat: selectedChat.id,
                    user: user.user,
                }),
            });
            const data = await response.json();
        } catch (error) {
            setError("مشکلی پیش اومده لطفا صفحه رو رفرش کنید!");
            dispatch(snackbarActions.openSnackbarAlert());
        }
        dispatch(fileActions.clearData());
    };

    // chat history
    const fetchChatHistoryAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            setIsLoading(true);
            const response = await fetch(`${routes.chat}${selectedChat?.id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            const transformedChatHistoryData = data?.message?.map((msg) => {
                // convert html to text
                let html = msg.content;
                let p = document.createElement("p");
                p.innerHTML = html;
                let text = p.textContent || p.innerHTML;
                const user = JSON.parse(localStorage.getItem("user"));
                return {
                    id: msg?.user,
                    position: msg?.user === user.user ? "right" : "left",
                    type: returnFileType(text),
                    text: returnContent(text),
                    date: new Date(msg?.created),
                    data: {
                        uri: text,
                        audioURL: text,
                    },
                };
            });
            setCurrentChat(transformedChatHistoryData);
        } catch (err) {
            setError(err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchChatHistoryAsync();
    }, [selectedChat]);

    console.log(ref);
    const onEmojiClick = (event, emojiObject) => {
        const cursor = ref.current.selectionStart;
        const text =
            message.slice(0, cursor) +
            emojiObject.emoji +
            message.slice(cursor);
        setMessage(text);
    };

    const openEmojiClickHandler = () => {
        setOpenEmoji(true);
    };

    const closeEmojiClickHandler = () => {
        setOpenEmoji(false);
    };

    const openFileUploadDialogHandler = () => {
        dispatch(dialogActions.openFileUpload());
    };

    const cancelSelectedFileClickHandler = () => {
        dispatch(fileActions.clearData());
        setMessage("");
    };

    const returnFileType = (text) => {
        if (text.includes(".jpg") || text.includes(".png")) {
            return "photo";
        } else if (text.includes(".wav") || text.includes(".mp3")) {
            return "audio";
        } else if (
            text.includes(".txt") ||
            text.includes(".pdf") ||
            text.includes(".doc") ||
            text.includes("docx")
        ) {
            return "file";
        } else {
            return "text";
        }
    };

    const returnContent = (text) => {
        if (text.includes(".jpg") || text.includes(".png")) {
            return "";
        } else if (text.includes(".wav") || text.includes(".mp3")) {
            return "";
        } else if (
            text.includes(".txt") ||
            text.includes(".pdf") ||
            text.includes(".doc") ||
            text.includes("docx")
        ) {
            return "";
        } else {
            return text;
        }
    };

    const returnRightPosition = (userID) => {
        const userId = localStorage.getItem("userID");
        if (userID === userId) {
            return "right";
        } else {
            return "left";
        }
    };

    // let audioContent = (
    //     <div className="recordings-container">
    //         {recordings.length > 0 ? (
    //             <>
    //                 <h1>Your recordings</h1>
    //                 {/* <div className="recordings-list">
    //                     {recordings.map((record) => (
    //                         <div className="record" key={record.key}>
    //                             <audio controls src={record.audio} />
    //                         </div>
    //                     ))}
    //                 </div> */}
    //                 <audio controls src={audio} />
    //             </>
    //         ) : (
    //             <div className="no-records">
    //                 <span>???</span>
    //             </div>
    //         )}
    //     </div>
    // );
    return (
        <Box>
            <UserInfoDialog show={show} title="نجمه منشی پور">
                <ChatInfo />
            </UserInfoDialog>
            <LabelDialog />
            <ChatCommentDialog />
            <FileUploadDialog />
            <Box hidden={selectedChat === null ? true : false}>
                <MenuBar />
            </Box>
            <Box mx="50px" hidden={sm === true ? true : false}>
                <h4 style={{ color: UI.primary }}>
                    {selectedChat === null ? "لطفا یک چت را انتخاب کنید" : ""}
                    {selectedChat?.message === null
                        ? "لطفا یک چت دیگر انتخاب کنید"
                        : ""}
                </h4>
            </Box>
            <Box
                mx="30px"
                dir="ltr"
                hidden={selectedChat !== null ? false : true}
            >
                <Box dir="rtl">
                    {isLoading && (
                        <CircularProgress style={{ color: UI.primary }} />
                    )}
                </Box>
                <Box>
                    <MessageList
                        className="message-list"
                        lockable={true}
                        toBottomHeight={"100%"}
                        dataSource={currentChat}
                    />
                </Box>
            </Box>
            <Box>
                <Box
                    dir="ltr"
                    className={classes.emPos}
                    hidden={openEmoji === true ? false : true}
                >
                    <Picker onEmojiClick={onEmojiClick} />
                    {openEmoji && (
                        <IconButton onClick={closeEmojiClickHandler}>
                            <CancelIcon
                                fontSize="large"
                                style={{
                                    color: dark ? UI.primary : "",
                                }}
                            />
                        </IconButton>
                    )}
                </Box>
            </Box>
            <Box
                mx="30px"
                position="fixed"
                bottom="0"
                width={sm ? '90%' : '50%'}
                hidden={selectedChat === null ? true : false}
            >
                <Box display="flex">
                    <InputEmoji
                        placeholder="ی پیام تایپ کن!"
                        onEnter={sendMessageClickHandler}
                        value={message}
                        onChange={setMessage}
                    />
                    <Box mx="3px">
                        {selectedFile ? (
                            <ChatButton
                                onClick={cancelSelectedFileClickHandler}
                            >
                                <CancelIcon />
                            </ChatButton>
                        ) : (
                            <ChatButton onClick={openFileUploadDialogHandler}>
                                <AttachFileIcon />
                            </ChatButton>
                        )}
                    </Box>
                </Box>
            </Box>
            {/* {audio !== null && <audio src={audio} controls /> } */}
        </Box>
    );
};

export default Chat;
{
    /* {sm ? (
                    <Input
                        ref={ref}
                        placeholder="ی پیام تایپ کن!"
                        multiline={true}
                        inputStyle={{
                            backgroundColor: dark ? darkMode.nav : "",
                            color: dark ? UI.primary : "",
                        }}
                        defaultValue={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rightButtons={
                            <>
                                {/* <Box mx="3px">
                               {!initRecording ? (
                                   <ChatButton onClick={startRecording}>
                                       <MicIcon />
                                   </ChatButton>
                               ) : (
                                   <>
                                       <ChatButton onClick={saveRecording}>
                                           <SaveIcon />
                                       </ChatButton>
                                       <ChatButton onClick={cancelRecording}>
                                           <CancelIcon />
                                       </ChatButton>
                                   </>
                               )}
                           </Box> */
}
//        <Box mx="3px">
//        {selectedFile ? (
//            <ChatButton
//                onClick={
//                    cancelSelectedFileClickHandler
//                }
//            >
//                <CancelIcon />
//            </ChatButton>
//        ) : (
//            <ChatButton
//                onClick={
//                    openFileUploadDialogHandler
//                }
//            >
//                <AttachFileIcon />
//            </ChatButton>
//        )}
//    </Box>
//    {!sm && (
//        <Box mx="3px">
//            <ChatButton
//                onClick={openEmojiClickHandler}
//            >
//                <SentimentVerySatisfiedIcon />
//            </ChatButton>
//        </Box>
//    )}
//    <Box mx="3px">
//        <ChatButton
//            onClick={sendMessageClickHandler}
//        >
//            <SendIcon />
//        </ChatButton>
//    </Box>
//                </>
//            }
//        />
//    ) : (
//        <Input
//            ref={ref}
//            placeholder="ی پیام تایپ کن!"
//            multiline={true}
//            inputStyle={{
//                backgroundColor: dark ? darkMode.nav : "",
//                color: dark ? UI.primary : "",
//            }}
//            defaultValue={message}
//            onChange={(e) => setMessage(e.target.value)}
//            leftButtons={
//                <>
//                    {/* <Box mx="3px">
//                    {!initRecording ? (
//                        <ChatButton onClick={startRecording}>
//                            <MicIcon />
//    </ChatButton>
//        ) : (
//            <>
//                <ChatButton onClick={saveRecording}>
//                    <SaveIcon />
//                </ChatButton>
//                <ChatButton onClick={cancelRecording}>
//                    <CancelIcon />
//                </ChatButton>
//            </>
//        )}
//             //    </Box> */}
//                    <Box mx="3px">
//                        {selectedFile ? (
//                            <ChatButton
//                                onClick={
//                                    cancelSelectedFileClickHandler
//                                }
//                            >
//                                <CancelIcon />
//                            </ChatButton>
//                        ) : (
//                            <ChatButton
//                                onClick={
//                                    openFileUploadDialogHandler
//                                }
//                            >
//                                <AttachFileIcon />
//                            </ChatButton>
//                        )}
//                    </Box>
//                    {!sm && (
//                        <Box mx="3px">
//                            <ChatButton
//                                onClick={openEmojiClickHandler}
//                            >
//                                <SentimentVerySatisfiedIcon />
//                            </ChatButton>
//                        </Box>
//                    )}
//                    <Box mx="3px">
//                        <ChatButton
//                            onClick={sendMessageClickHandler}
//                        >
//                            <SendIcon />
//                        </ChatButton>
//                    </Box>
//                </>
//            }
//        />
//    )}
