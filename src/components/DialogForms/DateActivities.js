import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { RangeDatePicker } from "jalali-react-datepicker";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";
import TabChart from "../Chart/TabChart";

const useStyles = makeStyles((theme) => ({
    background: {
        borderRadius: "10px",
    },
    button: {
        backgroundColor: UI.primary,
    },
    body: {
        width: "100%",
    },
}));

const DateActivities = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const dark = useSelector((state) => state.darkMode.dark);

    return (
        <Box display="flex" justifyContent="center" flexDirection="column">
            {/* <Box
                display="flex"
                flexDirection={sm === true ? "column" : "row"}
                justifyContent="center"
                alignItems="center"
                className={classes.background}
                style={{
                    backgroundColor: dark === true ? darkMode.card : "",
                    color: dark === true ? UI.primary : "",
                }}
                boxShadow={3}
            >
                <Box display="flex" p={1}>
                    <Box mt="20px" mx="5px">
                        <EventAvailableIcon />
                    </Box>
                    <h5>مشخص کردن تاریخ</h5>
                </Box>
                <Box>
                    <RangeDatePicker start="1400/11/11" end="1400/10/10" />
                </Box>
            </Box> */}
            <Box mt={5}>
                <TabChart
                    data1={props.data1}
                    data2={props.data2}
                    options={props.options}
                />
            </Box>
            <Box display="flex">
                <p>{props.label}</p>
                <p style={{ marginRight: "10px", }}>{props.value}</p>
            </Box>
        </Box>
    );
};

export default DateActivities;
