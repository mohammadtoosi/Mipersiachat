import React from "react";
import Component from "../components/Page/Component";
import LoginForm from "../components/Forms/LoginForm";
import Image1 from "../assets/images/login.svg";

const Login = () => {
    return <Component form={LoginForm} image={Image1} />;
};

export default Login;
