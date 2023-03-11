import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import PrivateRoute from "./components/Routes/PrivateRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Login from "./pages/Login";
import PersonalInfo from "./pages/PersonalInfo";
import ConfirmPhoneNumber from "./pages/ConfirmPhoneNumber";
import SiteInfo from "./pages/SiteInfo";
import RayChat from "./pages/RayChat";
import ForgetPassword from "./pages/ForgetPassword";
import { useSelector, useDispatch } from "react-redux";
import { DarkModeActions } from "./redux/dark-mode";
import { notificationActions } from "./redux/notification";
import { createTheme, ThemeProvider } from "@material-ui/core";
import DashboardLayout from "./components/Layout/DashboardLayout";
import routes from "./api/routes";
import useChat from "./hooks/useChat";

const rtl = createTheme({
    direction: "rtl",
    breakpoints: {
        keys: ["xs", "tiny", "sm", "md", "lg", "xl"],
        values: { xs: 300, tiny: 300, sm: 568, md: 760, lg: 960, xl: 1200 },
        // values: { xs: 0, tiny: 300, sm: 568, md: 760, lg: 960, xl: 1200 } <== sample, 
    },
});

const App = () => {
    const dispatch = useDispatch();
    const dark = useSelector((state) => state.darkMode.dark);
    let darkStatus = localStorage.getItem("dark-mode");
    const { data, loading, error } = useChat(routes.chat);

    useEffect(() => {
        if (darkStatus === "true") {
            dispatch(DarkModeActions.enableDarkMode());
            document.querySelector("html").style.backgroundColor = "#212121";
        } else {
            dispatch(DarkModeActions.disableDarkMode());
            document.querySelector("html").style.backgroundColor = "#FFFFFF";
        }
    }, [darkStatus]);
    dispatch(notificationActions.setChatObjects(data));
    
    return (
        // <Route path="/personal-info"> exmaple for progress
        //             <Component form={PersonalInfoForm} image={image2} progress />
        //         </Route>
        <div style={{ backgroundColor: dark ? "#212121" : "#FFFFFF" }}>
            <ThemeProvider theme={rtl}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        {/* <Route path="/personal-info">
                            <PersonalInfo />
                        </Route>
                        <Route path="/confirm-number">
                            <ConfirmPhoneNumber />
                        </Route>
                        <Route path="/site-info">
                            <SiteInfo />
                        </Route>
                        <Route path="/installing-raychat">
                            <RayChat />
                        </Route>
                        <Route path="/forget-password">
                            <ForgetPassword />
                        </Route> */}
                        /*<ProtectedRoute
                            path="/dashboard"
                            component={DashboardLayout}
                        />*/
                        <Route exact path="/dashboard">
                            <DashboardLayout />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
