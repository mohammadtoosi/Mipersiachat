import React from "react";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import vector from "../../assets/images/login.svg";
import logo from "../../assets/images/logo.svg";
import ui_details from "../UI/UIDetails";
import styles from "../../styles/Login.module.css";

const VectorPart = () => {
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
                    src={vector}
                    className={styles.vecSize}
                    alt="login-vector"
                />
            </Box>
            <Box>
                <p>
                    ایا حساب کاربری ندارید؟
                    <Link href="#" style={{ color: ui_details.primary }}>
                        {" "}
                        ایجاد حساب کاربری
                    </Link>
                </p>
            </Box>
        </Box>
    );
};

export default VectorPart;
