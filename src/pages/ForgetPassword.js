import React from "react";
import Component from "../components/Page/Component";
import ForgetPasswordForm from "../components/Forms/ForgetPasswordForm";
import Image4 from "../assets/images/login.svg";

const ForgetPassword = () => {
    return <Component form={ForgetPasswordForm} image={Image4} />;
};

export default ForgetPassword;