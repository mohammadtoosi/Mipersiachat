import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   formValues: {}
};

const departmentSlice = createSlice({
    name: "departmentForm",
    initialState: initialState,
    reducers: {
        setValues(state, action) {
            state.formValues = action.payload;
        },
        submitForm(state) {
            console.log('data:', state.formValues);
        },
        getInformation(state) {
            return {
                title: state.title,
                description: state.description,
            };
        },
    },
});

export const departmentAction = departmentSlice.actions;

export default departmentSlice;