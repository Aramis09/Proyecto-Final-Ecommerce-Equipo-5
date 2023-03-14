import { createSlice } from "@reduxjs/toolkit";
import { mercadoLibreReducerstate } from "../interfaces/mercadoLibreInterface";

const initialState: mercadoLibreReducerstate = {
    redirectLink: {},
    response: false
}

export const mercadoLibreReducer = createSlice({
    name: "mercadoLibreReducer",
    initialState,
    reducers:{
        paymentLink: (state, action) => {
            state.redirectLink = action.payload
        },
        changeResponse: (state, action) => {
            state.response = action.payload
        }
    }
})

export const {
    paymentLink,
    changeResponse
} = mercadoLibreReducer.actions;
export default mercadoLibreReducer.reducer