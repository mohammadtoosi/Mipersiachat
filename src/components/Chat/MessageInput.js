import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Picker from "emoji-picker-react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";
import ChatButton from "./ChatButton";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
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
        position: 'absolute',
        [theme.breakpoints.down('xs')]: {
            bottom: '50px',
        },
        [theme.breakpoints.up('sm')]: {
            bottom: '50px',
            
        },
        [theme.breakpoints.up('md')]: {
            bottom: '200px',
            right: '10px'
        },
        [theme.breakpoints.up('lg')]: {
            right: '210px',
        },
    }
}));

const MessageInput = (props) => {
    const classes = useStyles();
    const [openEmoji, setOpenEmoji] = useState(false);
    // const [chosenEmoji, setChosenEmoji] = useState(null);
    const [message, setMessage] = useState("");
    const ref = useRef(null);
    const dark = useSelector((state) => state.darkMode.dark);

    const formSubmit = (event) => {
        event.preventDefault();
    };

    const onEmojiClick = (e, emojiObject) => {
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

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={11} sm={11} md={10}>
                    <form onSubmit={props.onSubmitForm}>
                        <input
                            className={`${classes.textFieldWidth} ${classes.input}`}
                            type="text"
                            id="simple"
                            placeholder="یک پیام تایپ کنید"
                            ref={ref}
                            value={props.inputValue}
                            onChange={props.onInputChange}
                            onKeyPress={props.onKeyPress}
                        />
                    </form>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2}
                    style={{
                        marginTop: "-2px",
                    }}
                >
                    <Box display="flex">
                        <Box mx="3px">
                            <ChatButton onClick={openEmojiClickHandler}>
                                <SentimentVerySatisfiedIcon />
                            </ChatButton>
                            <Box
                                dir="ltr"
                                className={classes.emPos}
                                zIndex="1"
                                hidden={openEmoji === true ? false : true}
                            >
                                <Picker onEmojiClick={onEmojiClick} />
                                {openEmoji && (
                                    <IconButton onClick={closeEmojiClickHandler}>
                                        <CancelIcon fontSize="large" style={{color: dark ? UI.primary : ''}} />
                                    </IconButton>
                                )}
                            </Box>
                        </Box>
                        <Box mx="3px">
                            <ChatButton>
                                <AttachFileIcon />
                            </ChatButton>
                        </Box>
                        <Box mx="3px">
                            <ChatButton>
                                <MicIcon />
                            </ChatButton>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MessageInput;
