import React from "react";
import PersonalInfoForm from "../components/Forms/PersonalInfoForm";
import Image2 from "../assets/images/personal.svg";
import Component from "../components/Page/Component";

const PersonalInfo = () => {
    return <Component form={PersonalInfoForm} image={Image2} />
}

export default PersonalInfo;