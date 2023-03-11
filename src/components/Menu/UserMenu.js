import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import Logo from "./Logo";
import SecondLogo from "./SecondLogo";
import MenuItem from "./MenuItem";
import Divider from "@material-ui/core/Divider";
import UI from "../UI/UIDetails";

// import HomeIcon from '@material-ui/icons/Home';
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ChatIcon from "@material-ui/icons/Chat";
import BlockIcon from "@material-ui/icons/Block";
import TimelineIcon from "@material-ui/icons/Timeline";
import AddIcon from "@material-ui/icons/Add";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import { Help } from "@material-ui/icons";
// import PersonIcon from "@material-ui/core/icons/Person";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: UI.menu,
    },
    sidebar: {
        position: "fixed",
        overflow: "hidden",
        height: "100%",
        top: "0",
        bottom: "0",
        left: "0",
    },
}));

const Menu = () => {
    const classes = useStyles();
    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            className={[classes.background, classes.sidebar]}
        >
            <MenuItem title="رایچت">
                <Logo />
            </MenuItem>
            <MenuItem title="صفحه اصلی" href="/">
                <WebAssetIcon fontSize="medium" />
            </MenuItem>
            <MenuItem title="اپراتور" href="/operators">
                <ContactSupportIcon fontSize="medium" />
            </MenuItem>
            <MenuItem title="گفت و گو" href="/chat">
                <ChatIcon fontSize="medium" />
            </MenuItem>
            <MenuItem title="لیست سیاه" href="/blocklist">
                <BlockIcon fontSize="medium" />
            </MenuItem>
            <Divider />
            <MenuItem title="ارتقا پکیج">
                <TimelineIcon fontSize="medium" />
            </MenuItem>
            <MenuItem title="افزودن" href="/add">
                <AddIcon fontSize="medium" />
            </MenuItem>
            <MenuItem title="راهنما" href="/help">
                <HelpOutlineIcon fontSize="medium" />
            </MenuItem>
            <MenuItem title="خروج">
                <ExitToAppIcon fontSize="medium" />
            </MenuItem>
            <Box position='fixed' style={{bottom: '0'}}>
                <MenuItem title="گفت و گو">
                    <SecondLogo />
                </MenuItem>
            </Box>
        </Box>
    );
};

export default Menu;
