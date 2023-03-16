import { createSlice } from "@reduxjs/toolkit";

import { usersReducerState } from "../interfaces/userInterface";

const initialState: usersReducerState = {
    listUsersData: [],
    idDetails: {},
    successMsg: "",
    errorMsg: ""
}

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers:{
        listUser: (state, action) => {
            state.listUsersData = action.payload;
        },
        userByID: (state, action) => {
            state.idDetails = action.payload;
        },       
        successMsg: (state, action) => {
            state.successMsg = action.payload
        },
        errorMsg: (state, action) => {
            state.errorMsg = action.payload
        }
    }
})

export const { listUser, userByID, successMsg, errorMsg } = userReducer.actions;
export default userReducer.reducer