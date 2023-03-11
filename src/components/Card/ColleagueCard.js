import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    color: {
        backgroundColor: UI.primary,
    },
    body: {
        backgroundColor: '#FFFFFF',
        borderRadius: '7px',
        width: '150px',
        cursor: 'pointer',
    },
    colorDark: {
        backgroundColor: darkMode.card,
    },
}));

const ColleageCard = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <Box className={[classes.body, dark === true ? classes.colorDark : '']} boxShadow={5} p={3}>
            <Box display="flex" justifyContent="center" mt="-40px">
                <Avatar className={classes.color}>
                    <PersonIcon />
                </Avatar>
            </Box>
            <Box display="flex" justifyContent="center">
                <h4 style={{color: dark === true ? UI.primary : ''}}>{props.title}</h4>
            </Box>
            <Box display="flex" justifyContent="center" mt="-30px">
                <h5 style={{color: dark === true ? '#000000' : UI.menuItemColor}}>{props.type}</h5>
            </Box>
        </Box>
    );
};

export default ColleageCard;
