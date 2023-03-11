import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DialogPanel from "./DialogPanel";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
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
        justifyContent: "center",
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

    const label = useSelector((state) => state.dialog.chip);
    const currentChat = useSelector((state) => state.chatList.selectedData);
    const dark = useSelector((state) => state.darkMode.dark);

    const [labelText, setLabelText] = useState("");
    const [chipData, setChipData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    let icon;

    const postLabelAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.tag, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ text: labelText, chat: currentChat.id }),
            });
            const data = await response.json();
        } catch (err) {
            setError(err);
            console.log(error);
        }
    };

    const fetchChipsDataAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.tag, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            const transformedChipsData = data?.results?.map((chip) => {
                return {
                    id: chip?.id,
                    label: chip?.text,
                    chatId: chip?.chat?.id,
                };
            });
            setChipData(transformedChipsData);
        } catch (err) {
            setError(err.message);
        }
    };

    const filteredChipData = chipData.filter(
        (cp) => cp?.chatId === currentChat?.id
    );

    useEffect(() => {
        fetchChipsDataAsync();
    }, []);

    // for no request use a state list and 
    // add the chips from server
    // to this list

    return (
        <DialogPanel
            title="اضافه کردن برچسب جدید"
            show={label}
            action1={
                <Button
                    variant="contained"
                    color="primary"
                    onClick={postLabelAsync}
                >
                    اضافه کردن
                </Button>
            }
        >
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Box display="flex" justifyContent="center">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="اضافه کردن برچسب"
                            type="text"
                            variant="filled"
                            className={classes.textField}
                            style={{
                                backgroundColor:
                                    dark === true ? dark_mode.card : "",
                                color: dark_mode.primary,
                            }}
                            value={labelText}
                            onChange={(e) => setLabelText(e.target.value)}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Box>
                <p>برچسب های این چت</p>
                {isLoading && (
                    <CircularProgress style={{ color: dark_mode.primary }} />
                )}
                <Box className={classes.root}>
                    {filteredChipData.length < 0 ? (
                        <p>برچسبی وجود ندارد!</p>
                    ) : (
                        filteredChipData?.map((c, i) => (
                            <li key={i}>
                                <Chip
                                    icon={icon}
                                    label={c.label}
                                    className={classes.chip}
                                    style={{
                                        backgroundColor: dark
                                            ? dark_mode.card
                                            : "",
                                        color: dark ? dark_mode.primary : "",
                                    }}
                                />
                            </li>
                        ))
                    )}
                </Box>
            </Box>
        </DialogPanel>
    );
};

export default ProfileEditDialog;
