import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedData: null,
    isActive: false,
    activeChatId: 0,
    searchTerm: "",
    searchTermByDate: "",
    searchByUserTag: 0,
};

const chatListSlice = createSlice({
    name: "chat-list",
    initialState: initialState,
    reducers: {
        getData(state, action) {
            state.selectedData = action.payload;
        },
        setActiveChatId(state, action) {
            state.activeChatId = action.payload;
        },
        clearData(state) {
            state.selectedData = null;
        },
        setChatActive(state) {
            state.isActive = true;
        },
        setChatInActive(state) {
            state.isActive = false;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
            state.searchTermByDate = "";
            state.searchTermByDate = 0;
        },
        setSearchTermByDate(state, action) {
            state.searchTermByDate = action.payload;
            state.searchTerm = "";
            state.searchByUserTag = 0;
        },
        setSearchByUserTag(state, action) {
            state.searchByUserTag = action.payload;
            state.searchTerm = "";
            state.searchTermByDate = "";
        },
    },
});

export const ChatListActions = chatListSlice.actions;

export default chatListSlice;
