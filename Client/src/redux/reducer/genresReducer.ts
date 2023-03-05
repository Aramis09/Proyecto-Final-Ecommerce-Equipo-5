import { createSlice } from "@reduxjs/toolkit";

import { genresReducerState } from "../interfaces/genresInterface";

const initialState: genresReducerState = {
    listGenresData: [],
    idDetails: {},
    successMsg: "",
    errorMsg: ""
}

export const genresReducer = createSlice({
    name: "genresReducer",
    initialState,
    reducers:{
        listGenres: (state, action) => {
            state.listGenresData = action.payload;
        },
        genresByID: (state, action) => {
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

export const { listGenres, genresByID, successMsg, errorMsg } = genresReducer.actions;
export default genresReducer.reducer