import { createSlice } from "@reduxjs/toolkit";

const initialDarkMode = { dark: false };

const DarkModeSlice = createSlice({
    name: "dark-mode",
    initialState: initialDarkMode,
    reducers: {
        DarkModeToggleHandler(state) {
            state.dark = !state.dark;
            localStorage.setItem('dark-mode', state.dark === true ? 'true' : 'false');
        },
        enableDarkMode(state) {
            state.dark = true;
        },
        disableDarkMode(state) {
            state.dark = false;
        },
    },
});

export const DarkModeActions = DarkModeSlice.actions;

export default DarkModeSlice;
