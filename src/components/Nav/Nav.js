import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DarkModeActions } from "../../redux/dark-mode";
import { dialogActions } from "../../redux/dialog";
import { chatActions } from "../../redux/chat-drawer";
import { notificationActions } from "../../redux/notification";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import UI from "../UI/UIDetails";
import { dark_mode as dark } from "../UI/UIDetails";
import { makeStyles } from "@material-ui/core";
import Light from "@material-ui/icons/Brightness7";
import Dark from "@material-ui/icons/Brightness3";
import ProfileEditDialog from "../DialogForms/ProfileEditDialog";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import ChatDrawer from "../SubMenu/ChatDrawer";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: UI.background,
        borderBottom: "2px solid gray",
    },
    backgroundDark: {
        backgroundColor: dark.nav,
    },
}));

const Nav = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [checked, setChecked] = useState(true);
    const [anchor, setAnchor] = useState(null);

    const dark = useSelector((state) => state.darkMode.dark);
    const messageCount = useSelector((state) => state.notification.messageCount);
    const chatCount = useSelector((state) => state.notification.chatCount);

    const menuClickHandler = (event) => {
        setAnchor(event.currentTarget);
    };

    const menuCloseClickHandler = (event) => {
        setAnchor(null);
    };

    const switchClickHandler = (event) => {
        setChecked(!checked);
    };

    const darkModeClickHandler = () => {
        dispatch(DarkModeActions.DarkModeToggleHandler());
    };

    const profileEditClickHandler = () => {
        dispatch(dialogActions.toggleUserEditProfile());
    };

    const chatClickHandler = () => {
        dispatch(chatActions.openChatDrawer());
    };

    // document.body.style.backgroundColor = "#212121;";

    return (
        <Box
            className={
                dark === true ? classes.backgroundDark : classes.background
            }
        >
            <Box
                mx="30px"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Box mx="10px">
                    <Button
                        style={{ color: dark === true ? UI.primary : "" }}
                        href="/dashboard/chat"
                    >
                        ورود به پیش خوان
                    </Button>
                </Box>

                <Divider />
                <Box mx="10px">
                    <IconButton onClick={chatClickHandler}>
                        <Badge color="secondary" variant={'dot'}>
                            <NotificationsIcon
                                fontSize="medium"
                                style={{ color: dark ? UI.primary : "" }}
                            />
                        </Badge>
                    </IconButton>
                </Box>
                <Box mx="10px">
                    <IconButton onClick={menuClickHandler}>
                        <AccountCircleIcon
                            style={{
                                color: dark === true ? UI.primary : "#000000",
                            }}
                            fontSize="medium"
                        />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchor}
                        keepMounted
                        open={Boolean(anchor)}
                        onClose={menuCloseClickHandler}
                    >
                        <MenuItem onClick={profileEditClickHandler}>
                            پروفایل
                        </MenuItem>
                        <MenuItem>خروج از حساب کاربری</MenuItem>
                        <MenuItem>بستن</MenuItem>
                    </Menu>
                </Box>
                <Box mx="10px">
                    <IconButton onClick={darkModeClickHandler}>
                        {dark ? (
                            <Light
                                fontSize="medium"
                                style={{ color: dark ? UI.primary : "" }}
                            />
                        ) : (
                            <Dark
                                fontSize="medium"
                                style={{ color: dark ? UI.primary : "" }}
                            />
                        )}
                    </IconButton>
                </Box>
                <Divider />
                <Box mx="10px">
                    <FormControlLabel
                        control={
                            <Switch
                                style={{ color: checked ? UI.primary : "gray" }}
                                color={dark === true ? "default" : "primary"}
                                checked={checked}
                                onClick={switchClickHandler}
                                name="switchA"
                            />
                        }
                        label={
                            <h4
                                style={{
                                    color: dark === true ? UI.primary : UI.gray,
                                }}
                            >
                                {checked === true ? "انلاین" : "افلاین"}
                            </h4>
                        }
                    />
                </Box>
                <ProfileEditDialog />
                <ChatDrawer />
            </Box>
        </Box>
    );
};

export default Nav;
