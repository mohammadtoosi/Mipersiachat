import { createSlice } from "@reduxjs/toolkit";

const initialDashboard = { admin: true, user: false };

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: initialDashboard,
    reducers: {
        enableAdminDashboard(state) {
            state.admin = true;
            state.user = false;
        },
        enableUserDashboard(state) {
            state.admin = false;
            state.user = true;
        },
    },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice;