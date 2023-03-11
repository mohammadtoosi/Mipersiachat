import { createSlice } from "@reduxjs/toolkit";

const initialState = { selectedFile: null, isFile: false, type: "text" };

const fileSlice = createSlice({
    name: "file",
    initialState: initialState,
    reducers: {
        getData(state, action) {
            state.selectedFile = action.payload;
            if (
                state.selectedFile?.file?.includes(".jpg") ||
                state.selectedFile?.file?.includes(".png")
            ) {
                state.type = "photo";
                state.isFile = true;
            } else if (state.selectedFile?.file?.includes(".ogg")) {
                state.type = "audio";
                state.isFile = true;
            } else {
                state.type = "file";
                state.isFile = true;
            }
        },
        clearData(state) {
            state.selectedFile = null;
            state.isFile = false;
            state.type = "text";
        },
    },
});

export const fileActions = fileSlice.actions;

export default fileSlice;
