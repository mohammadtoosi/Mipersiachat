import { createSlice } from "@reduxjs/toolkit";

const initialNav = { admin: "true", user: "false" };

const navSlice = createSlice({
    name: "nav",
    initialState: initialNav,
    reducers: {
        enableAdminNav(state) {
            state.admin = true;
            state.user = false;
        },
        disableUserNav(state) {
            state.admin = false;
            state.user = true;
        },
    },
});

export const navActions = navSlice.actions;

export default navSlice;