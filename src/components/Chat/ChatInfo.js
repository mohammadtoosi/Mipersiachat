import React from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import CropFreeIcon from "@material-ui/icons/CropFree";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import RoomIcon from "@material-ui/icons/Room";
import LanguageIcon from "@material-ui/icons/Language";

const ChatInfo = () => {
    const selectedChatData = useSelector(
        (state) => state.chatList.selectedData
    );
    const browser = window.navigator.userAgent;
    const os = window.navigator.platform;
    console.log(selectedChatData);
    return (
        <Box>
            <Box display="flex" justifyContent="center">
                <Box mt="15px">
                    <PersonIcon fontSize="large" />
                </Box>
                <Box mx="10px">
                    <h3>{selectedChatData?.customer?.mobile}</h3>
                </Box>
            </Box>
            <Box display="flex">
                <Box mt="20px" mx="15px">
                    <CropFreeIcon />
                </Box>
                <Box width="300px">
                    <h4>کد کاربر:</h4>
                </Box>
                <Box>
                    <h4>{selectedChatData?.customer?.id}</h4>
                </Box>
            </Box>
            <Box display="flex" mt="-15px">
                <Box mt="20px" mx="15px">
                    <GpsFixedIcon />
                </Box>
                <Box width="300px">
                    <h4>IP:</h4>
                </Box>
                <Box>
                    <h4>{selectedChatData?.customer?.mobile}</h4>
                </Box>
            </Box>
            <Box display="flex" mt="-15px">
                <Box mt="20px" mx="15px">
                    <PublicIcon />
                </Box>
                <Box width="300px">
                    <h4>مرورگر:</h4>
                </Box>
                <Box>
                    <h4>{browser}</h4>
                </Box>
            </Box>
            <Box display="flex" mt="-15px">
                <Box mt="20px" mx="15px">
                    <PhoneIphoneIcon />
                </Box>
                <Box width="300px">
                    <h4>دستگاه:</h4>
                </Box>
                <Box>
                    <h4>{os}</h4>
                </Box>
            </Box>
            <Box display="flex" mt="-15px">
                <Box mt="20px" mx="15px">
                    <RoomIcon />
                </Box>
                <Box width="300px">
                    <h4>موقعیت:</h4>
                </Box>
                <Box>
                    <h4></h4>
                </Box>
            </Box>
            <Box display="flex" mt="-15px">
                <Box mt="20px" mx="15px">
                    <LanguageIcon />
                </Box>
                <Box width="300px">
                    <h4>درصفحه:</h4>
                </Box>
                <Box>
                    <h4>iliatc.com/</h4>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatInfo;
