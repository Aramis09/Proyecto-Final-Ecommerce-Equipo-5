import { createSlice } from "@reduxjs/toolkit";

import { platformReducerState } from "../interfaces/platformInterface";

const initialState: platformReducerState = {
    all: [],
    details: {},
    successMsg: "",
    errorMsg: ""
}

export const platformReducer = createSlice({
    name: "platformReducer",
    initialState,
    reducers:{
        getAllPlatforms: (state, action) => {
            state.all = action.payload;
        },
        getPlatformByID: (state, action) => {
            state.details = action.payload;
        },       
        successMsg: (state, action) => {
            state.successMsg = action.payload
        },
        errorMsg: (state, action) => {
            state.errorMsg = action.payload
        }
    }
})

export const { getAllPlatforms, getPlatformByID, successMsg, errorMsg } = platformReducer.actions;
export default platformReducer.reducer