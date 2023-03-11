import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dialogActions } from "../../redux/dialog";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import LaunchIcon from "@material-ui/icons/Launch";
import BlockIcon from "@material-ui/icons/Block";
import NoteIcon from "@material-ui/icons/Note";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LabelIcon from "@material-ui/icons/Label";
import routes from "../../api/routes";

import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import UI from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    body: {
        borderBottom: "1px solid gray",
        marginTop: "10px",
    },
}));

const MenuBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();
    const dark = useSelector((state) => state.darkMode.dark);
    const xs = useMediaQuery(theme.breakpoints.down("xs"));
    const [open, setOpen] = useState(false);
    const [operators, setOperators] = useState([]);

    const fetchOperatorsAsync = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(routes.operator, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });
            const data = await response.json();
            const newOperatorsData = data?.results?.map((opt, i) => {
                return {
                    operatorId: opt?.id,
                    counter: i,
                    fullname:
                        opt?.user?.first_name + " " + opt?.user?.last_name,
                };
            });
            setOperators(newOperatorsData);
        } catch (err) {}
    };

    useEffect(() => {
        fetchOperatorsAsync();
    }, []);

    const openClickHandler = (e) => {
        setOpen(e.currentTarget);
    };

    const closeClickHandler = () => {
        setOpen(null);
    };

    const openChatInfoDialogHandler = () => {
        dispatch(dialogActions.openChatInfo());
    };

    const openLabelDialogHandler = () => {
        dispatch(dialogActions.openAddNewChip());
    };

    const openChatCommentDialogHandler = () => {
        dispatch(dialogActions.openCommentDialog());
    };

    return (
        <Box
            className={classes.body}
            display="flex"
            justifyContent="center"
            style={{ overflow: "auto" }}
        >
            {xs && <Box mx="100px"></Box>}
            <Box display="flex">
                <Box mx={1}>
                    <Button
                        color="default"
                        style={{ color: dark === true ? UI.primary : "" }}
                        endIcon={
                            <PersonIcon
                                style={{
                                    color: dark === true ? UI.primary : "",
                                }}
                            />
                        }
                        onClick={openChatInfoDialogHandler}
                    >
                        اطلاعات کاربری
                    </Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box mx={1}>
                    <Button
                        color="default"
                        style={{ color: dark === true ? UI.primary : "" }}
                        endIcon={
                            <LaunchIcon
                                style={{
                                    color: dark === true ? UI.primary : "",
                                }}
                            />
                        }
                        onClick={openClickHandler}
                    >
                        انتقال گفت و گو
                    </Button>
                    <Menu
                        id="talk-menu"
                        anchorEl={open}
                        keepMounted
                        open={Boolean(open)}
                        onClose={closeClickHandler}
                    >
                        {operators.map((opt) => (
                            <MenuItem>{opt.fullname}</MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box mx={1}>
                    <Button
                        color="default"
                        style={{ color: dark === true ? UI.primary : "" }}
                        endIcon={
                            <LabelIcon
                                style={{
                                    color: dark === true ? UI.primary : "",
                                }}
                            />
                        }
                        onClick={openLabelDialogHandler}
                        i
                    >
                        برچسب گذاری
                    </Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box mx={1}>
                    <Button
                        color="default"
                        endIcon={
                            <BlockIcon
                                style={{
                                    color: dark === true ? UI.primary : "",
                                }}
                            />
                        }
                        style={{ color: dark === true ? UI.primary : "" }}
                    >
                        لیست سیاه
                    </Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box mx={1}>
                    <Button
                        style={{ color: dark === true ? UI.primary : "" }}
                        color="default"
                        onClick={openChatCommentDialogHandler}
                        endIcon={
                            <NoteIcon
                                style={{
                                    color: dark === true ? UI.primary : "",
                                }}
                            />
                        }
                    >
                        یاداشت کاربران
                    </Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box mx={1}>
                    <Button
                        color="default"
                        style={{ color: dark === true ? UI.primary : "" }}
                        endIcon={
                            <CloseIcon
                                style={{
                                    color: dark === true ? UI.primary : "red",
                                }}
                            />
                        }
                    >
                        رد گفت و گو
                    </Button>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box mx={1}>
                    <Button
                        color="default"
                        endIcon={
                            <CheckIcon
                                style={{
                                    color: dark === true ? UI.primary : "",
                                }}
                            />
                        }
                        style={{
                            color: dark === true ? UI.primary : "green",
                        }}
                    >
                        قبول گفت و گو
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MenuBar;
