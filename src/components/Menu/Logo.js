import React from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import UI from "../UI/UIDetails";
import logo from "../../assets/images/firstlogo.svg";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: UI.primary,
        borderRadius: '15px',
    },
}));

const Logo = () => {
    const classes = useStyles();
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            className={classes.background}
            p={1}
        >
            <img src={logo} alt="logo" />
        </Box>
    );
};

export default Logo;
