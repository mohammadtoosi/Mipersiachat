import { createSlice } from "@reduxjs/toolkit";

const initialState = { profile: false };

const ProfileEditSlice = createSlice({
    name: "profile-edit",
    initialState: initialState,
    reducers: {
        toggleUserEditProfile(state) {
            state.profile = !state.profile;
        },
    },
});

export default ProfileEditSlice;

export const ProfileActions = ProfileEditSlice.actions;