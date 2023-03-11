import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DialogPanel from "./DialogPanel";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import routes from "../../api/routes";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { dark_mode } from "../UI/UIDetails";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    textField: {
        [theme.breakpoints.down("xs")]: {
            width: "40ch",
        },
        [theme.breakpoints.up("sm")]: {
            width: "50ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "60ch",
        },
    },
    root: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const ProfileEditDialog = () => {
    const classes = useStyles();
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down("xs"));

    const commentOpen = useSelector((state) => state.dialog.comment);
    const currentChat = useSelector((state) => state.chatList.selectedData);
    const dark = useSelector((state) => state.darkMode.dark);

    const [comment, setComment] = useState("");
    const [commentData, setCommentData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const addChatCommentAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${routes.chat}${currentChat.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ comment: comment }),
            });
            const data = await response.json();
            console.log(data);
        } catch (err) {
            setError(err);
            console.log(error);
        }
    };

    const fetchChatCommentAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${routes.chat}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            const transformedCommentData = data?.results?.map((c) => {
                return {
                    commentId: c.id,
                    text: c.comment,
                };
            });
            setCommentData(transformedCommentData);
            console.log(commentData);
        } catch (err) {
            setError(err.message);
        }
    };

    const filteredData = commentData.filter(
        (cm) => cm?.commentId === currentChat?.id
    );

    useEffect(() => {
        fetchChatCommentAsync();
    }, []);

    // useEffect(() => {
    //     fetchChatCommentAsync();
    // }, [commentData]);

    // for no request use a state list and
    // add the chips from server
    // to this list

    // useEffect(() => {
    //     fetchChipsDataAsync();
    // }, [chipData]);

    return (
        <DialogPanel
            title="یادداشت کاربران"
            show={commentOpen}
            action1={
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addChatCommentAsync}
                >
                    کامنت
                </Button>
            }
        >
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            multiline
                            rows={10}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="یادداشت کاربران"
                            type="text"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                                color: dark_mode.primary,
                            }}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <p>یادداشت کاربر</p>
                {isLoading && (
                    <CircularProgress style={{ color: dark_mode.primary }} />
                )}
                <Box className={classes.root}>
                    {filteredData === null ? (
                        <p>یادداشتی وجود ندارد!</p>
                    ) : (
                        filteredData.map((comment, i) => (
                            <p key={i}>{comment.text}</p>
                        ))
                    )}
                </Box>
            </Box>
        </DialogPanel>
    );
};

export default ProfileEditDialog;
