import { createSlice } from "@reduxjs/toolkit";

const initialSubMenuDrawer = {
    open: false,
    btn1: false,
    btn2: false,
    md: false,
};

const subMenuDrawerSlice = createSlice({
    name: "submenu",
    initialState: initialSubMenuDrawer,
    reducers: {
        openDrawer(state) {
            state.open = true;
        },
        closeDrawer(state) {
            state.open = false;
        },
        enableFirstRadioButton(state) {
            state.btn1 = true;
            state.btn2 = false;
        },
        disableFirstRadioButton(state) {
            state.btn1 = false;
            state.btn2 = false;
        },
        enableSecondRadioButton(state) {
            state.btn1 = false;
            state.btn2 = true;
        },
        disableSecondRadioButton(state) {
            state.btn1 = false;
            state.btn2 = false;
        },
        openMdDrawer(state) {
            state.md = true;
        },
        closeMdDrawer(state) {
            state.md = false;
        },
    },
});

export const subMenuDrawerActions = subMenuDrawerSlice.actions;

export default subMenuDrawerSlice;
