import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { RangeDatePicker } from "jalali-react-datepicker";
import VerticalBarChart from "../Chart/VerticalBarChart";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";

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

const ConversationChart = (props) => {
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
                <VerticalBarChart data={props.data} options={props.options} />
            </Box>
            <br />
            <Box display="flex">
                <p style={{ color: dark === true ? UI.primary : "" }}>
                    {props.label}
                </p>
                <p
                    style={{
                        marginRight: "10px",
                        color: dark === true ? UI.primary : "",
                    }}
                >
                    {props.value}
                </p>
            </Box>
        </Box>
    );
};

export default ConversationChart;
