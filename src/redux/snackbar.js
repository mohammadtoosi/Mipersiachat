import { createSlice } from "@reduxjs/toolkit";

const initialState = { isSnackbarOpen: false };

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: initialState,
    reducers: {
        openSnackbarAlert(state) {
            state.isSnackbarOpen = true;
        },
        closeSnackbarAlert(state) {
            state.isSnackbarOpen = false;
        },
    },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice;