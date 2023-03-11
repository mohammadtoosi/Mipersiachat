import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
};

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const TabsComponent = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <div
            style={{ width: `${props.width}`, height: `${props.height}` }}
            className={classes.root}
        >
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="default"
                    textColor="default"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab
                        style={{
                            backgroundColor: dark === true ? darkMode.nav : "",
                            color: dark === true ? UI.primary : "",
                        }}
                        label="گفت و گوها"
                        {...a11yProps(0)}
                    />
                    <Tab
                        style={{
                            backgroundColor: dark === true ? darkMode.nav : "",
                            color: dark === true ? UI.primary : "",
                        }}
                        label="درحال انتظار"
                        {...a11yProps(1)}
                    />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
                style={{
                    backgroundColor: dark === true ? darkMode.card : "",
                    height: "350px",
                    marginRight: "-16px",
                }}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    {props.chat}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {props.waiting}
                </TabPanel>
            </SwipeableViews>
        </div>
    );
};

export default TabsComponent;
