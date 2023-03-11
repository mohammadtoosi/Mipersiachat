import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import TextsmsIcon from "@material-ui/icons/Textsms";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import HttpIcon from "@material-ui/icons/Http";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import UI from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    body: {},
    nav: {
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
    },
    textField: {
        width: "30ch",
    },
    http: {
        backgroundColor: UI.menu,
        borderRadius: "500px",
    },
}));

const Panel = (props) => {
    const classes = useStyles();
    const [settingsMenu, setSettingsMenu] = useState(null);

    const settingsMenuHandler = (e) => {
        setSettingsMenu(e.currentTarget);
    };

    const settingsMenuCloseHandler = () => {
        setSettingsMenu(null);
    };

    return (
        <Box className={classes.body} display="flex">
            <Box className={classes.nav} display="flex" boxShadow={5}>
                <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Box>
                        <IconButton onClick={settingsMenuHandler}>
                            <SettingsIcon />
                        </IconButton>
                        <Menu
                            id="settings"
                            anchorEl={settingsMenu}
                            keepMounted
                            open={Boolean(settingsMenu)}
                            onClose={settingsMenuCloseHandler}
                        >
                            <MenuItem>گزینه یک</MenuItem>
                            <MenuItem>گزینه دو</MenuItem>
                            <MenuItem>گزینه سه</MenuItem>
                            <MenuItem>گزیمه چهار</MenuItem>
                        </Menu>
                    </Box>
                    <Box>
                        <IconButton>
                            <TextsmsIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <IconButton>
                            <ContactSupportIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box display="flex" mx="20px">
                    <h4 style={{ fontWeight: "200" }}>وضعیت:</h4>
                    <h4 style={{ marginRight: "5px", color: UI.primary }}>
                        انلاین
                    </h4>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    mx="20px"
                >
                    <Box>
                        <TextField
                            variant="filled"
                            disabled
                            className={classes.textField}
                            value="https://raychaT.io/amin"
                            dir="ltr"
                        />
                    </Box>
                    <Box
                        className={classes.http}
                        display="flex"
                        p={1}
                        mx="20px"
                    >
                        <HttpIcon fontSize="large" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Panel;
