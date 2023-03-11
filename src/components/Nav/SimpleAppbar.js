import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { drawerActions } from "../../redux/drawer";
import { subMenuDrawerActions } from "../../redux/submenu";
import { DarkModeActions } from "../../redux/dark-mode";
import { dialogActions } from "../../redux/dialog";
import { chatActions } from "../../redux/chat-drawer";
import { ChatListActions } from "../../redux/chat-list";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import UI from "../UI/UIDetails";
import MobileMenu from "../Menu/MobileMenu";
import ChatDrawer from "../SubMenu/ChatDrawer";
import SubMenuMobileDrawer from "../SubMenu/SubMenuMobileDrawer";
import ProfileEditDialog from "../DialogForms/ProfileEditDialog";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
    barBack: {
        backgroundColor: UI.primary,
    },
}));

const SimpleAppBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const [checked, setChecked] = useState(false);
    const [menu, setMenu] = useState(false);
    const dark = useSelector((state) => state.darkMode.dark);
    const theme = useTheme();
    const tiny = useMediaQuery(theme.breakpoints.down("tiny"));

    const openDrawerHandler = () => {
        dispatch(drawerActions.openDrawer());
    };

    const switchHandler = () => {
        setChecked(!checked);
    };

    const openMenuClickHandler = (e) => {
        setMenu(e.currentTarget);
    };

    const closeMenuClickHandler = () => {
        setMenu(null);
    };

    const openSubMenuDrawerHandler = () => {
        dispatch(subMenuDrawerActions.openDrawer());
    };

    const toggleDarkModeHandler = () => {
        dispatch(DarkModeActions.DarkModeToggleHandler());
    };

    const toggleProfileEditHandler = () => {
        dispatch(dialogActions.toggleUserEditProfile());
    };

    const chatClickHandler = () => {
        dispatch(chatActions.openChatDrawer());
    };

    const backClickHandler = () => {
        window.location.reload();
    };

    return (
        <Box className={classes.root}>
            <AppBar position="fixed" className={classes.barBack}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={openDrawerHandler}
                        style={{ color: dark ? "#212121" : "#FFFFFF" }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box position="absolute" right="20px">
                        <IconButton
                            style={{
                                backgroundColor: dark ? "#212121" : "white",
                            }}
                            onClick={openMenuClickHandler}
                        >
                            <PersonIcon
                                style={{
                                    color: dark ? UI.primary : "#000000",
                                }}
                            />
                        </IconButton>
                        {location.pathname.includes("chat") && (
                            <IconButton onClick={backClickHandler}>
                                <ArrowBackIcon />
                            </IconButton>
                        )}
                    </Box>
                    <Menu
                        id="user-menu"
                        anchorEl={menu}
                        keepMounted
                        open={Boolean(menu)}
                        onClose={closeMenuClickHandler}
                    >
                        <MenuItem
                            onClick={toggleProfileEditHandler}
                            style={{ fontFamily: "Vazir" }}
                        >
                            پروفایل
                        </MenuItem>
                        <MenuItem style={{ fontFamily: "Vazir" }}>
                            خروج از حساب کاربری
                        </MenuItem>
                        <MenuItem
                            onClick={toggleDarkModeHandler}
                            style={{ fontFamily: "Vazir" }}
                        >
                            حالت شب
                        </MenuItem>
                        <MenuItem
                            onClick={toggleDarkModeHandler}
                            style={{ fontFamily: "Vazir" }}
                        >
                            انلاین
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <MobileMenu />
            <SubMenuMobileDrawer />
            <ProfileEditDialog />
            <ChatDrawer />
        </Box>
    );
};

export default SimpleAppBar;
