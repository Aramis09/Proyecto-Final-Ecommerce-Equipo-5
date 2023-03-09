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
            state.listProductsShoppingCart.push(action.payload);
            state.totalAmount = Number((state.totalAmount + Number(action.payload.price)).toFixed(2));
        },
        deletingItemShoppingCart: (state, action) => {
            //Se busca el juego en el carrito de compras con el id
            let temp = state.listProductsShoppingCart.find(item => parseInt(item.id) === parseInt(action.payload));

            if(temp){
                //Se elimina el juego del carrito de compras
                state.listProductsShoppingCart = state.listProductsShoppingCart.filter(item => parseInt(item.id) !== parseInt(action.payload));
                //Se actualiza el monto a pagar
                state.totalAmount = Number((state.totalAmount - Number(temp.price)).toFixed(2));
            }
        },
        gettingShoppingCartFromDB: (state, action) => {
            state.listProductsShoppingCart = action.payload;
            if(state.listProductsShoppingCart.length > 0){
                for(let i = 0; i < state.listProductsShoppingCart.length; i++) {
                    state.totalAmount = Number((state.totalAmount + Number(action.payload.price)).toFixed(2));
                }
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
    deletingItemShoppingCart,
    gettingShoppingCartFromDB,
    successMsg, 
    errorMsg, 
} = shoppingCartReducer.actions;

export default shoppingCartReducer.reducer