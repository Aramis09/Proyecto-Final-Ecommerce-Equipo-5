import { createSlice } from "@reduxjs/toolkit";

import { platformReducerState } from "../interfaces/platformInterface";

const initialState: platformReducerState = {
    listPlatformsData: [],
    details: {},
    successMsg: "",
    errorMsg: ""
}

export const platformReducer = createSlice({
    name: "platformReducer",
    initialState,
    reducers:{
        listPlatforms: (state, action) => {
            state.listPlatformsData = action.payload;
        },
        platformByID: (state, action) => {
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

export const { listPlatforms, platformByID, successMsg, errorMsg } = platformReducer.actions;
export default platformReducer.reducer