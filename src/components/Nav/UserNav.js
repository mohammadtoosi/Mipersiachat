import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { dashboardActions } from "../../redux/dashboard";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import UI from "../UI/UIDetails";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: UI.background,
        borderBottom: "2px solid gray",
    },
}));

const Nav = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(true);
    const [anchor, setAnchor] = useState(null);
    const [more, setMore] = useState(null);
    const dispatch = useDispatch();

    const menuClickHandler = (event) => {
        setAnchor(event.currentTarget);
    };

    const menuCloseClickHandler = (event) => {
        setAnchor(null);
    };

    const moreMenuClickHandler = (event) => {
        setMore(event.currentTarget);
    };

    const moreMenuCloseClickHandler = () => {
        setMore(null);
    };

    const switchClickHandler = (event) => {
        setChecked(!checked);
    };

    const enableAdminDashboardHandler = () => {
        dispatch(dashboardActions.enableAdminDashboard());
    };

    return (
        <Box className={classes.background}>
            <Box
                mx="30px"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Box mx="15px">
                    <Button
                        onClick={moreMenuClickHandler}
                        endIcon={<ArrowDropDownIcon />}
                    >
                        بیشتر
                    </Button>
                    <Menu
                        id="more-menu"
                        anchorEl={more}
                        keepMounted
                        open={Boolean(more)}
                        onClose={moreMenuCloseClickHandler}
                    >
                        <MenuItem>بیشتر</MenuItem>
                        <MenuItem>بیشتر</MenuItem>
                        <MenuItem>بیشتر</MenuItem>
                        <MenuItem>بیشتر</MenuItem>
                        <MenuItem>بیشتر</MenuItem>
                        <MenuItem>بیشتر</MenuItem>
                    </Menu>
                </Box>
                <Divider />
                <Box mx="15px">
                    <Button
                        onClick={menuClickHandler}
                        endIcon={<AccountCircleIcon />}
                    >
                        پروفایل
                    </Button>
                    <Menu
                        id="user-menu"
                        anchorEl={anchor}
                        keepMounted
                        open={Boolean(anchor)}
                        onClose={menuCloseClickHandler}
                    >
                        <MenuItem>پروفایل</MenuItem>
                        <MenuItem>دارک مد</MenuItem>
                        <MenuItem>خروج از حساب کاربری</MenuItem>
                        <MenuItem>بستن</MenuItem>
                    </Menu>
                </Box>
                <Box mx="10px">
                    <Button onClick={enableAdminDashboardHandler}>پنل ادمین</Button>
                </Box>
                <Divider />

                <Box mx="15px">
                    <FormControlLabel
                        control={
                            <Switch
                                style={{ color: UI.primary }}
                                color="primary"
                                checked={checked}
                                onClick={switchClickHandler}
                                name="switchA"
                            />
                        }
                        label={
                            <h4 style={{ color: UI.gray }}>
                                {checked === true ? "انلاین" : "افلاین"}
                            </h4>
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Nav;
