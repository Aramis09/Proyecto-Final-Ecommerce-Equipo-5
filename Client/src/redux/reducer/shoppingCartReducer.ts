import { createSlice } from "@reduxjs/toolkit";

import { shoppingCartReducerState } from "../interfaces/shoppingCartInterface";


const initialState: shoppingCartReducerState = {
    listProductsShoppingCart: [],
    totalAmount: 0.00,
    successMsg: "",
    errorMsg: ""
}

export const shoppingCartReducer = createSlice({
    name: "shoppingCartReducer",
    initialState,
    reducers:{
        addingToShoppingCart: (state, action) => {
            const item = state.listProductsShoppingCart.find(item => item.id == action.payload.id);
            if(!item){
                state.listProductsShoppingCart.push(action.payload);
                state.totalAmount = state.totalAmount + Number(action.payload.price);
                state.successMsg = "Agregado al carrito";
            }else{
                state.successMsg = "Ya esta en el carrito";
            }
        },     
        successMsg: (state, action) => {
            state.successMsg = action.payload
        },
        errorMsg: (state, action) => {
            state.errorMsg = action.payload
        }
    }
})

export const {
    addingToShoppingCart, 
    successMsg, 
    errorMsg, 
} = shoppingCartReducer.actions;

export default shoppingCartReducer.reducer