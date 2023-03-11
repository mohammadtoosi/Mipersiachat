import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChatListActions } from "../../redux/chat-list";
import Box from "@material-ui/core/Box";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles, alpha } from "@material-ui/core/";
import moment from "moment";
import routes from "../../api/routes";
// import { DatePicker } from "jalali-react-datepicker";
// import styles from "../../styles/DatePicker.module.css";

const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "4px",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
        [theme.breakpoints.up("sm")]: {
            width: "40ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "25ch",
        },
    },
    select: {
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
        [theme.breakpoints.up("sm")]: {
            width: "48ch",
        },
        [theme.breakpoints.up("md")]: {
            width: "34ch",
        },
    },
    formControl: {
        width: "100%",
    },
}));

const DatePick = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [date, setDate] = useState([]);
    const [select, setSelect] = useState("");
    const [error, setError] = useState("");

    const dark = useSelector((state) => state.darkMode.dark);

    // const submitValueHandler = ({ value }) => {
    //     setDate(value);
    //     dispatch(ChatListActions.setSearchTermByDate(date));
    // };

    const selectChangeHandler = (event) => {
        setSelect(event.target.value);
    };

    useEffect(() => {
        dispatch(ChatListActions.setSearchTermByDate(select));
    }, [select]);

    const fetchCreatedChatDataAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.chat, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            const transformedChatData = data?.results?.map((d) => {
                const exactDate = moment(d?.created).format("l");
                const date = new Date(exactDate).toLocaleDateString("fa-IR");
                return {
                    date: date,
                    mainDate: d.created,
                };
            });
            setDate(transformedChatData);
            console.log(data);
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCreatedChatDataAsync();
    }, []);

    return (
        <Box display="flex" flexDirection="column">
            <Box mx="10px">
                <h3 style={{ color: dark ? UI.primary : UI.menuItemColor }}>
                    انتخاب تاریخ:
                </h3>
            </Box>
            <Box display="flex" justifyContent="center" mt="10px">
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel
                        id="demo-simple-select-filled-label"
                        style={{ color: dark ? UI.primary : "" }}
                    >
                        انتخاب تاریخ
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={select}
                        onChange={selectChangeHandler}
                        className={classes.select}
                        style={{
                            backgroundColor: dark ? darkMode.nav : "",
                            color: dark ? UI.primary : "",
                        }}
                    >
                        {date?.map((d, i) => (
                            <MenuItem key={i} value={d.mainDate}>
                                {d.date}
                            </MenuItem>
                        ))}
                         <MenuItem onClick={() => setSelect('')}>
                                هیچکدام
                            </MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default DatePick;
