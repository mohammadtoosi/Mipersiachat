import React from "react";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import { subMenuDrawerActions } from "../../redux/submenu";
import { chatActions } from "../../redux/chat-drawer";
import { DarkModeActions } from "../../redux/dark-mode";
import { authActions } from "../../redux/auth";
import { makeStyles } from "@material-ui/core";
import Logo from "./Logo";
import SecondLogo from "./SecondLogo";
import MenuItem from "./MenuItem";
import Divider from "@material-ui/core/Divider";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import WifiIcon from "@material-ui/icons/Wifi";
import PersonIcon from "@material-ui/icons/Person";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ChatIcon from "@material-ui/icons/Chat";
import BlockIcon from "@material-ui/icons/Block";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { dark_mode as dark } from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: "#FFFFFF",
    },
    sidebar: {
        position: "fixed",
        overflow: "hidden",
        height: "100%",
        top: "0",
        bottom: "0",
        left: "0",
    },
    backgroundDark: {
        backgroundColor: dark.nav,
    },
}));

const Menu = () => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);

    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            className={[
                dark === true ? classes.backgroundDark : classes.background,
                classes.sidebar,
            ]}
            boxShadow={5}
        >
            <AdminMenu />
        </Box>
    );
};

const AdminMenu = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const subMenuClickHandler = () => {
        dispatch(subMenuDrawerActions.openMdDrawer());
    };
    const chatClickHandler = () => {
        dispatch(chatActions.openChatDrawer());
    };
    const disableDarkModeHandler = () => {
        dispatch(DarkModeActions.disableDarkMode());
        dispatch(authActions.logout());
        localStorage.setItem('dark-mode', 'false');
        history.push('/');
    };
    
    return (
        <>
            <MenuItem title="persia chat" href="/dashboard/websites">
                <Logo />
            </MenuItem>
            <MenuItem title="وبسایت ها" href="/dashboard/websites">
                <WebAssetIcon fontSize="medium" />
            </MenuItem>
            <MenuItem title="کاربران انلاین" href="/dashboard/online-users">
                <WifiIcon fontSize="medium" />
            </MenuItem>
            <MenuItem title="دپارتمان" href="/dashboard/department">
                <PersonIcon fontSize="meduim" />
            </MenuItem>
            <MenuItem title="اپراتور" href="/dashboard/operators">
                <ContactSupportIcon fontSize="medium" />
            </MenuItem>
            <MenuItem title="گفت و گو" href="/dashboard/chat">
                <ChatIcon fontSize="medium" />
            </MenuItem>
            <MenuItem title="لیست سیاه" href="/dashboard/blocklist">
                <BlockIcon fontSize="medium" />
            </MenuItem>
            <Divider />
            <MenuItem title="سوالات" href="/dashboard/question">
                <HelpOutlineIcon fontSize="medium" />
            </MenuItem>
            {/* <MenuItem title="پیام ها" Click={chatClickHandler}>
                <NotificationsIcon />
            </MenuItem> */}
            {/* <MenuItem title="منو" Click={subMenuClickHandler}>
                <MenuOpenIcon fontSize="medium" />
            </MenuItem> */}
            <MenuItem
                title="خروج از برنامه"
                href="/"
                Click={disableDarkModeHandler}
            >
                <ExitToAppIcon fontSize="medium" />
            </MenuItem>
            <Box position="fixed" style={{ bottom: "0" }}>
                <MenuItem title="گفت و گو">
                    <SecondLogo />
                </MenuItem>
            </Box>
        </>
    );
};

export default Menu;
