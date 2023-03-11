import React from "react";
import Box from "@material-ui/core/Box";
import logo from "../../assets/images/secondlogo.svg";

const SecondLogo = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
        >
            <img src={logo} alt="logo" />
        </Box>
    );
};

export default SecondLogo;
