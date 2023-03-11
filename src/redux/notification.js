import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chat: [],
};

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialState,
    reducers: {
        setChatObjects(state, action) {
            state.chat = action.payload;
        },
    },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
