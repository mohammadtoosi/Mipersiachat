import { createSlice } from "@reduxjs/toolkit";

const initialDialog = {
    dialog1: false,
    dialog2: false,
    dialog3: false,
    chatInfo: false,
    profile: false,
    scroll: false,
    question: false,
    department: false,
    chip: false,
    fileUpload: false,
    comment: false,
    website: false,
    operator: false,
};

const dialogSlice = createSlice({
    name: "dialog",
    initialState: initialDialog,
    reducers: {
        openFirstDialog(state) {
            state.dialog1 = true;
            state.dialog2 = false;
            state.dialog3 = false;
        },
        openSecondDialog(state) {
            state.dialog1 = false;
            state.dialog2 = true;
            state.dialog3 = false;
        },
        openThirdDialog(state) {
            state.dialog1 = false;
            state.dialog2 = false;
            state.dialog3 = true;
        },
        closeDialog(state) {
            state.dialog1 = false;
            state.dialog2 = false;
            state.dialog3 = false;
            state.chatInfo = false;
            state.profile = false;
            state.scroll = false;
            state.question = false;
            state.department = false;
            state.chip = false;
            state.fileUpload = false;
            state.comment = false;
            state.website = false;
            state.operator = false;
        },
        toggleUserEditProfile(state) {
            state.profile = !state.profile;
            state.dialog1 = false;
            state.dialog2 = false;
            state.dialog3 = false;
            state.chatInfo = false;
        },
        toggleScrolling(state) {
            state.profile = false;
            state.dialog1 = false;
            state.dialog2 = false;
            state.dialog3 = false;
            state.chatInfo = false;
            state.profile = false;
            state.scroll = true;
        },
        openAddQuestionDialog(state) {
            state.profile = false;
            state.dialog1 = false;
            state.dialog2 = false;
            state.dialog3 = false;
            state.chatInfo = false;
            state.profile = false;
            state.scroll = false;
            state.question = true;
        },
        openAddNewDepartment(state) {
            state.profile = false;
            state.dialog1 = false;
            state.dialog2 = false;
            state.dialog3 = false;
            state.chatInfo = false;
            state.profile = false;
            state.scroll = false;
            state.question = false;
            state.department = true;
        },
        openAddNewChip(state) {
            state.profile = false;
            state.dialog1 = false;
            state.dialog2 = false;
            state.dialog3 = false;
            state.chatInfo = false;
            state.profile = false;
            state.scroll = false;
            state.question = false;
            state.department = false;
            state.chip = true;
        },
        openChatInfo(state) {
            state.chatInfo = true;
        },
        closeChatInfo(state) {
            state.chatInfo = false;
        },
        openFileUpload(state) {
            state.fileUpload = true;
        },
        openCommentDialog(state) {
            state.comment = true;
        },
        closeCommentDialog(state) {
            state.comment = false;
        },
        openWebsiteDialog(state) {
            state.website = true;
        },
        openOperatorDialog(state) {
            state.operator = true;
        },
    },
});

export const dialogActions = dialogSlice.actions;

export default dialogSlice;
