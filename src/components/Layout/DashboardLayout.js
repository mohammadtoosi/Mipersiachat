import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useMediaQuery, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Menu from "../Menu/Menu";
import Nav from "../Nav/Nav";
import Appbar from "../Nav/SimpleAppbar";
// import SubMenuDrawer from "../SubMenu/SubMenuDrawer";
// import ChatsDrawer from "../SubMenu/ChatDrawer";
import ChatList from "../Chat/ChatList";
import MobileChatList from "../Chat/MobileChatList";

// pages
import Websites from "../../pages/Websites";
import OnlineUsers from "../../pages/OnlineUsers";
import Department from "../../pages/Department";
import Chat from "../Chat/Chat";
import MainPage from "../../pages/MainPage";
import Operators from "../../pages/Operators";
import Blocklist from "../../pages/Blocklist";
import Questions from "../../pages/Questions";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
        [theme.breakpoints.up("md")]: {
            display: "block",
        },
    },
}));

const DashboardLayout = (props) => {
    const classes = useStyles();
    const myTheme = useTheme();
    const location = useLocation();
    //const xs = useMediaQuery(myTheme.breakpoints.down("xs"));
    const sm = useMediaQuery(myTheme.breakpoints.down("sm"));
    const md = useMediaQuery(myTheme.breakpoints.up("md"));
    // const tiny = useMediaQuery(myTheme.breakpoints.up("tiny"));
    const check = location.pathname.includes("dashboard/chat");

    useEffect(() => {
        if (location.pathname.includes("/dashboard")) {
            document.querySelector("html").style.width = "unset";
            document.querySelector("html").style.height = "unset";
            document.querySelector("html").style.display = "unset";
            document.querySelector("html").style.justifyContent = "unset";
        }
    }, [location.pathname]);

    return (
        <>
            <Box>{!md === true ? <Appbar /> : <Nav />}</Box>
            <Grid
                container
                className={classes.root}
                style={{ position: "relative" }}
            >
                <Grid item xs={check ? 2 : 1}>
                    <Box style={{ display: "flex" }}>
                        <Box>{md && <Menu />}</Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                    {location.pathname.includes("dashboard/chat") && (
                        <>
                            <Box
                                position="absolute"
                                left={md ? "84px" : ""}
                                top={sm ? "50px" : ""}
                                style={{ height: "100%" }}
                            >
                                {sm && <MobileChatList />}
                                {md && <ChatList />}
                            </Box>
                        </>
                    )}
                </Grid>
                {/* <SubMenuDrawer />
                <ChatsDrawer /> */}
                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Router>
                        <Switch>
                            <Route exact path="/dashboard/websites">
                                <Box mt={sm && "60px"}></Box>
                                <Websites />
                                <MainPage />
                            </Route>
                            <Route path="/dashboard/online-users">
                                <Box mt={sm && "60px"}></Box>
                                <OnlineUsers />
                            </Route>
                            <Route path="/dashboard/department">
                                <Box mt={sm && "60px"}></Box>
                                <Department />
                            </Route>
                            <Route path="/dashboard/chat">
                                <Box mt={sm && "60px"}></Box>
                                <Chat />
                            </Route>
                            <Route path="/dashboard/question">
                                <Box mt={sm && "60px"}></Box>
                                <Questions />
                            </Route>
                            <Route path="/dashboard/operators">
                                <Box mt={sm && "60px"}></Box>
                                <Operators />
                            </Route>
                            <Route path="/dashboard/blocklist">
                                <Box mt={sm && "60px"}></Box>
                                <Blocklist />
                            </Route>
                            {/* for log out */}
                        </Switch>
                    </Router>
                </Grid>
            </Grid>
        </>
    );
};

export default DashboardLayout;
