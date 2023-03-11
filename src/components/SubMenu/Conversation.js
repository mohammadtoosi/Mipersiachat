import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { subMenuDrawerActions } from "../../redux/submenu";
import { ChatListActions } from "../../redux/chat-list";
import { useMediaQuery, useTheme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles, alpha, InputBase } from "@material-ui/core/";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";
import routes from "../../api/routes";

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

const Conversation = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const md = useMediaQuery(theme.breakpoints.down("sm"));

    const fRadio = useSelector((state) => state.submenu.btn1);
    const sRadio = useSelector((state) => state.submenu.btn2);
    const dark = useSelector((state) => state.darkMode.dark);
    const chat = useSelector((state) => state.chatList.filteredChat);

    const [names, setNames] = useState([]);
    const [error, setError] = useState(null);
    const [tags, setTags] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [value, setValue] = useState("");
    const [select, setSelect] = useState("");
    const [tagSelect, setTagSelect] = useState("");

    // const [fRadio, setFRadio] = useState(false);
    // const [sRadio, setSRadio] = useState(false);

    const searchChangeHandler = (e) => {
        setSearchTerm(e.target.value);
    };

    const radioChangeHandler = (event) => {
        setValue(event.target.value);
        console.log(value);
    };

    const firstRadioClickHandler = () => {
        dispatch(subMenuDrawerActions.enableFirstRadioButton());
    };

    const secondRadioClickHandler = () => {
        dispatch(subMenuDrawerActions.enableSecondRadioButton());
    };

    const selectChangeHandler = (event) => {
        setSelect(event.target.value);
    };

    const tagSelectChangeHandler = (event) => {
        setTagSelect(event.target.value);
    };

    const fetchOperatorNamesAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.operator, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            const transformedOperatorNames = data.results.map((op) => {
                return {
                    id: op.id,
                    fullname: op.user.first_name + " " + op.user.last_name,
                };
            });
            setNames(transformedOperatorNames);
        } catch (err) {
            setError(err);
        }
    };

    const fetchTagsAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.tag, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            const newTagData = data?.results?.map((tag) => {
                return {
                    tagId: tag.id,
                    text: tag.text,
                    chatId: tag?.chat?.id,
                };
            });
            setTags(newTagData);
        } catch (err) {}
    };

    useEffect(() => {
        fetchOperatorNamesAsync();
        fetchTagsAsync();
    }, []);

    useEffect(() => {
        dispatch(ChatListActions.setSearchByUserTag(tagSelect));
    }, [tagSelect]);

    useEffect(() => {
        dispatch(ChatListActions.setSearchTerm(searchTerm));
    }, [searchTerm]);

    return (
        <Box>
            <Box mx="5px">
                <h3 style={{ color: dark ? UI.primary : UI.menuItemColor }}>
                    گفت و گو ها
                </h3>
            </Box>
            <Box display="flex" justifyContent="center">
                {/* enter key for search */}
                <InputBase
                    value={searchTerm}
                    onChange={searchChangeHandler}
                    placeholder="جست و جو"
                    type="search"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    style={{
                        backgroundColor: dark ? darkMode.nav : UI.lightInput,
                        color: dark ? UI.primary : "#000000",
                    }}
                    inputProps={{ "aria-label": "search" }}
                />
            </Box>
            <Box mt="30px" mx="5px" hidden={md}>
                <Box mx="5px">
                    <h3 style={{ color: dark ? UI.primary : UI.menuItemColor }}>
                        فیلتر بر اساس
                    </h3>
                </Box>
                <Box>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            value={value}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: "-6px",
                                marginRight: "6px",
                                color: dark ? UI.primary : "",
                            }}
                            onChange={radioChangeHandler}
                        >
                            <FormControlLabel
                                value="female"
                                control={
                                    <Radio
                                        onClick={firstRadioClickHandler}
                                        color="primary"
                                        style={{
                                            color: dark ? UI.primary : "",
                                        }}
                                    />
                                }
                                label="نام اپراتور"
                            />
                            <FormControlLabel
                                value="male"
                                control={
                                    <Radio
                                        onClick={secondRadioClickHandler}
                                        color="primary"
                                        style={{
                                            color: dark ? UI.primary : "",
                                        }}
                                    />
                                }
                                label="تگ کاربران"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box mt="15px" hidden={fRadio === true ? false : true}>
                    <FormControl
                        variant="filled"
                        className={classes.formControl}
                    >
                        <InputLabel
                            id="demo-simple-select-filled-label"
                            style={{ color: dark ? UI.primary : "" }}
                        >
                            تعیین نام اپراتور
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
                            {names?.map((name, i) => (
                                <MenuItem key={i} value={name.id}>
                                    {name.fullname}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box mt="15px" hidden={sRadio === true ? false : true}>
                    <FormControl
                        variant="filled"
                        className={classes.formControl}
                    >
                        <InputLabel
                            id="demo-simple-select-filled-label"
                            style={{ color: dark ? UI.primary : "" }}
                        >
                            جست و جو با تگ کاربران
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={tagSelect}
                            onChange={tagSelectChangeHandler}
                            className={classes.select}
                            style={{
                                backgroundColor: dark ? darkMode.nav : "",
                                color: dark ? UI.primary : "",
                            }}
                        >
                            {tags?.map((t, i) => (
                                <MenuItem key={i} value={t.chatId}>
                                    {t.text}
                                </MenuItem>
                            ))}
                            <MenuItem onClick={() => setTagSelect("")}>
                                هیچکدام
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
};

export default Conversation;
