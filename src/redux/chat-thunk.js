import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseUrl from "../api/base";

const initialState = {
    chat: [],
    loading: false,
    error: null,
};

export const fetchChat = createAsyncThunk(`chat/fetchChats/`, async (thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${baseUrl}/chat/chat/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
        const data = await response.data;
        return data;
    } catch (err) {
        return err;
    }
});

const chatSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchChat.fulfilled]: (state, { meta, payload }) => {
            state.loading = false;
            state.chat = payload;
        },
        [fetchChat.pending]: (state, { meta, payload }) => {
            state.loading = true;
        },
        [fetchChat.rejected]: (state, { meta, payload, error }) => {
            state.loading = false;
            state.chat = payload;
            state.error = error;
        }
    },
});

export const chatFetchActions = chatSlice.actions;

export default chatSlice;