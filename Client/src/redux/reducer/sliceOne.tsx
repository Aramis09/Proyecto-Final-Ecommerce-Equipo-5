import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

interface reducerOneState{
    all: Array<object>,
    details: object
}

const initialState: reducerOneState = {
    all: [],
    details: {}
}

export const sliceOne = createSlice({
    name: "sliceOne",
    initialState,
    reducers:{
        getAll: (state) => {
            axios.get("https://apisgames-production.up.railway.app/products")
                .then(r => r.data)
                .then(data => state.all = data)
                .catch(err => console.log(err))
        },
        gameDetails: (state, action: PayloadAction<object>) => {
            state.details = action.payload
        },
        emptyGameDetails: (state) => {
            state.details = {}
        }
    }
})

export const {getAll, gameDetails, emptyGameDetails} = sliceOne.actions;

export const selectAll = (state: RootState) => state.reducerOne;

export default sliceOne.reducer