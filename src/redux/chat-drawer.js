import { createSlice } from "@reduxjs/toolkit";

const initialState = { chat: false };

const ChatDrawerSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        openChatDrawer(state) {
            state.chat = true;
        },
        closeChatDrawer(state) {
            state.chat = false;
        },
    },
});

export const chatActions = ChatDrawerSlice.actions;

export default ChatDrawerSlice;