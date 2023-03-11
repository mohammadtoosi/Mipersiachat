import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initalState,
    reducers: {
        setAuthTokens(state, action) {
            state.token = action.payload.token;
        },
        logout(state) {
            state.token = null;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;