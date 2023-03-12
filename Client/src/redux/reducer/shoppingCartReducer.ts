import { createSlice } from "@reduxjs/toolkit";

import { shoppingCartReducerState } from "../interfaces/shoppingCartInterface";


const initialState: shoppingCartReducerState = {
    listProductsShoppingCartUser: [],
    totalAmount: 0.00,
    successMsg: "",
    errorMsg: "",
    listProductsShoppingCartGuest: []
}

export const shoppingCartReducer = createSlice({
    name: "shoppingCartReducer",
    initialState,
    reducers:{
        addingToShoppingCart: (state, action) => {
            state.listProductsShoppingCartGuest.push(action.payload);
            state.totalAmount = Number((state.totalAmount + Number(action.payload.price)).toFixed(2));
        },
        deletingItemShoppingCart: (state, action) => {
            //Se busca el juego en el carrito de compras con el id
            let temp:any = state.listProductsShoppingCartGuest.find((item: any) => parseInt(item.id) === parseInt(action.payload));

            if(temp){
                //Se elimina el juego del carrito de compras
                state.listProductsShoppingCartGuest = state.listProductsShoppingCartGuest.filter((item:any) => parseInt(item.id) !== parseInt(action.payload));
                //Se actualiza el monto a pagar
                state.totalAmount = Number((state.totalAmount - Number(temp.price)).toFixed(2));
            }
        },
        eraseGuestShoppingCart: (state) => {
            state.listProductsShoppingCartGuest = [];
        },
        gettingShoppingCartFromDB: (state, action) => {
            state.listProductsShoppingCartGuest = action.payload;
            if(state.listProductsShoppingCartGuest.length > 0){
                for(let i = 0; i < state.listProductsShoppingCartGuest.length; i++) {
                    state.totalAmount = Number((state.totalAmount + Number(action.payload.price)).toFixed(2));
                }
            }
        },
        resetTotalAmount: (state) => {
            state.totalAmount = 0.00;
        },
        updateShoppingCartUser: (state, action) => {
            state.listProductsShoppingCartUser = action.payload
        },
        addAmountForShoppingCartUser: (state, action) => {
            state.totalAmount += parseFloat(action.payload)
        },
        restAmountForShoppingCartUser: (state, action) => {
            state.totalAmount -= parseFloat(action.payload)
        },
        gettingShoppingCartFromDBUser: (state, action) => {
            state.listProductsShoppingCartUser = action.payload;
            if(state.listProductsShoppingCartUser.length > 0){
                for(let i = 0; i < state.listProductsShoppingCartUser.length; i++) {
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
    updateShoppingCartUser,
    addAmountForShoppingCartUser,
    restAmountForShoppingCartUser,
    eraseGuestShoppingCart,
    gettingShoppingCartFromDBUser
} = shoppingCartReducer.actions;

export default shoppingCartReducer.reducer