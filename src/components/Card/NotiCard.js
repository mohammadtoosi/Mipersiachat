import React from "react";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import UI from "../UI/UIDetails";

const NotiCard = (props) => {
    return (
        <Box display="flex" width="300px" className="notiHover">
            <Box mt="20px">
                <Avatar style={{ color: UI.primary }}>
                    <PersonIcon />
                </Avatar>
            </Box>
            <Box mx="10px">
                <p>
                    شما {props.messages} پیام نخوانده شده از
                    <span style={{ color: UI.primary }}> {props.title} </span>
                    دارید
                </p>
            </Box>
        </Box>
    );
};

export default NotiCard;
