import React from "react";
import Box from "@material-ui/core/Box";
import logo from "../../assets/images/logo.svg";
import styles from "../../styles/Login.module.css";

const Image = (props) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Box>
                <img src={logo} className={styles.logo} alt="logo" />
            </Box>
            <Box>
                <img
                    src={props.image}
                    className={styles.vecSize}
                    alt="login-vector"
                />
            </Box>
        </Box>
    );
};

export default Image;