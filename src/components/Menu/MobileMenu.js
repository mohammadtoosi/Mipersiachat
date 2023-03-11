import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DarkModeActions } from "../../redux/dark-mode";
import { authActions } from "../../redux/auth";
import { drawerActions } from "../../redux/drawer";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import WifiIcon from "@material-ui/icons/Wifi";
import PersonIcon from "@material-ui/icons/Person";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ChatIcon from "@material-ui/icons/Chat";
import BlockIcon from "@material-ui/icons/Block";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SecondLogo from "./SecondLogo";

const useStyles = makeStyles({
    root: {
        backgroundColor: "#212121",
    },
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
});

const Lists = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const closeDrawerHandler = () => {
        dispatch(drawerActions.closeDrawer());
    };
    const disableDarkModeHandler = () => {
        dispatch(DarkModeActions.disableDarkMode());
        dispatch(authActions.logout());
        localStorage.setItem('dark-mode', 'false');
        history.push('/');
    };
    const classes = useStyles();
    return (
        <div
            className={classes.list}
            role="presentation"
            onClick={closeDrawerHandler}
            onKeyDown={closeDrawerHandler}
        >
            <List>
                <ListItem button component="a" href="/dashboard/websites">
                    <ListItemIcon>
                        <WebAssetIcon />
                    </ListItemIcon>
                    <ListItemText>وبسایت ها</ListItemText>
                </ListItem>
                <ListItem button component="a" href="/dashboard/online-users">
                    <ListItemIcon>
                        <WifiIcon />
                    </ListItemIcon>
                    <ListItemText>کاربران انلاین</ListItemText>
                </ListItem>
                <ListItem button component="a" href="/dashboard/department">
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>دپارتمان</ListItemText>
                </ListItem>
                <ListItem button component="a" href="/dashboard/operators">
                    <ListItemIcon>
                        <ContactSupportIcon />
                    </ListItemIcon>
                    <ListItemText>اپراتور</ListItemText>
                </ListItem>
                <ListItem button component="a" href="/dashboard/chat">
                    <ListItemIcon>
                        <ChatIcon />
                    </ListItemIcon>
                    <ListItemText>گفت و گو</ListItemText>
                </ListItem>
                <ListItem button component="a" href="/dashboard/blocklist">
                    <ListItemIcon>
                        <BlockIcon />
                    </ListItemIcon>
                    <ListItemText>لیست سیاه</ListItemText>
                </ListItem>
                <ListItem button component="a" href="/dashboard/question">
                    <ListItemIcon>
                        <HelpOutlineIcon />
                    </ListItemIcon>
                    <ListItemText>سوالات</ListItemText>
                </ListItem>
                <ListItem button component="a" href="/" onClick={disableDarkModeHandler}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText>خروج از برنامه</ListItemText>
                </ListItem>
                <Divider />
                <ListItem button component="a" href="/dashboard/chat">
                    <ListItemIcon>
                        <KeyboardBackspaceIcon />
                    </ListItemIcon>
                    <ListItemText>ورود به پیش خوان</ListItemText>
                </ListItem>
                <Box position="fixed" bottom="0">
                    <ListItem button>
                        <ListItemIcon>
                            <SecondLogo />
                        </ListItemIcon>
                        <ListItemText>رایچت</ListItemText>
                    </ListItem>
                </Box>
            </List>
            {/* <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </div>
    );
};

const MobileMenu = () => {
    const show = useSelector((state) => state.drawer.open);
    const dispatch = useDispatch();

    const closeDrawerHandler = () => {
        dispatch(drawerActions.closeDrawer());
    };
    const openDrawerHandler = () => {
        dispatch(drawerActions.openDrawer());
    };
    return (
        <div>
            {/* onclose onopen */}
            <SwipeableDrawer
                anchor="left"
                open={show}
                onClose={closeDrawerHandler}
                onOpen={openDrawerHandler}
            >
                <Lists />
            </SwipeableDrawer>
        </div>
    );
};

export default MobileMenu;
