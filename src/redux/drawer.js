import { createSlice } from "@reduxjs/toolkit";

const initialSubMenuDrawer = { open: false, chats: true };

const drawerSlice = createSlice({
    name: "drawer",
    initialState: initialSubMenuDrawer,
    reducers: {
        openDrawer(state) {
            state.open = true;
            state.chats = false;
        },
        closeDrawer(state) {
            state.open = false;
            state.chats = false;
        },
        openChatsDrawer(state) {
            state.chats = true;
            state.open = false;
        },
    },
});

export const drawerActions = drawerSlice.actions;

export default drawerSlice;
