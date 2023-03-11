import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import UI, { dark_mode as darkMode } from "../UI/UIDetails";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    body: {
        backgroundColor: darkMode.card,
        color: UI.primary,
    },
}));

const Question = (props) => {
    const classes = useStyles();
    const dark = useSelector((state) => state.darkMode.dark);
    return (
        <div className={classes.root}>
            <Accordion className={dark === true ? classes.body : ''}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{color: dark === true ? UI.primary : ''}} />}
                    aria-controls="panel1a-content"
                    id={props.id}
                >
                    <Typography style={{fontFamily: 'Vazir-Bold'}} className={classes.heading}>
                        {props.title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{fontFamily: 'Vazir'}}>{props.children}</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Question;
