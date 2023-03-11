import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// message type
import TextMessage from "./TextMessage";
import PhotoMessage from "./PhotoMessage";
import AudioMessage from "./AudioMessage";
import FileMessage from "./FileMessage";

const useStyles = makeStyles((theme) => ({}));

const MessageList = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);

    return (
        <Container>
            {props.data?.map((message, i) =>
                message?.type === "text" ? (
                    <TextMessage message={message.text} time={message.date} />
                ) : message?.type === "photo" ? (
                    <PhotoMessage image={message.text} time={message.date} />
                ) : message?.type === "audio" ? (
                    <AudioMessage audio={message.text} time={message.date} />
                ) : (
                    // ) : message.type === "file" ? (
                    //     <FileMessage file={message.text} time={message.date} />
                    <p>DATA TIME NOT FOUND</p>
                )
            )}
        </Container>
    );
};

export default MessageList;
