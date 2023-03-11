import React from "react";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
    const authentication = useSelector((state) => state.auth);
    if (authentication.token) {
        if (props.path === "/") {
            return <Redirect to={"/"} />;
        }
        return <Route {...props} />;
    } else if (!authentication.token) {
        return <Redirect to={"/"} />;
    } else {
        console.log("Not found!");
    }
};

export default ProtectedRoute;
