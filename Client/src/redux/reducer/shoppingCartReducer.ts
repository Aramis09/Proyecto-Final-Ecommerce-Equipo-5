import { createSlice } from "@reduxjs/toolkit";

import { shoppingCartReducerState } from "../interfaces/shoppingCartInterface";


const initialState: shoppingCartReducerState = {
    listProductsShoppingCartUser: [],
    totalAmount: 0.00,
    successMsg: "",
    errorMsg: "",
    listProductsShoppingCartGuest: [],
    emptyUserDBShoppingCart: false,
    finalPriceForCheckout: 0.00
}

export const shoppingCartReducer = createSlice({
    name: "shoppingCartReducer",
    initialState,
    reducers:{
        addingToShoppingCart: (state, action) => {
            state.listProductsShoppingCartGuest.push(action.payload);
            state.totalAmount = Number((Number(state.totalAmount) + Number(action.payload.price)).toFixed(2));
        },
        deletingItemShoppingCart: (state, action) => {
            //Se busca el juego en el carrito de compras con el id
            let temp:any = state.listProductsShoppingCartGuest.find((item: any) => parseInt(item.id) === parseInt(action.payload));

            if(temp){
                //Se elimina el juego del carrito de compras
                state.listProductsShoppingCartGuest = state.listProductsShoppingCartGuest.filter((item:any) => parseInt(item.id) !== parseInt(action.payload));
                //Se actualiza el monto a pagar
                state.totalAmount = Number((Number(state.totalAmount) - Number(temp.price)).toFixed(2));
            }
        },
        eraseGuestShoppingCart: (state) => {
            state.listProductsShoppingCartGuest = [];
        },
        resetTotalAmount: (state) => {
            state.totalAmount = 0.00;
        },
        updateShoppingCartUser: (state, action) => {
            state.totalAmount = 0.00;
            action.payload.forEach((item:any) => state.totalAmount += parseFloat(item.price))
            state.listProductsShoppingCartUser = action.payload
        },
        addAmountForShoppingCartUser: (state, action) => {
            state.totalAmount = Number((state.totalAmount + Number(action.payload)).toFixed(2));
        },
        restAmountForShoppingCartUser: (state, action) => {
            state.totalAmount = Number((state.totalAmount - Number(action.payload)).toFixed(2));
        },
        userShoppingDBemptyByHand: (state, action) => {
            state.emptyUserDBShoppingCart = action.payload
        },
        settingShoppingCartFromLocalStorage: (state, action) => {
            state.listProductsShoppingCartGuest = action.payload.listProductsShoppingCartGuest;
            state.totalAmount = action.payload.totalAmount;
            //console.log("state.listProductsShoppingCartGuest --> " + state.listProductsShoppingCartGuest.length);
            //console.log("state.totalAmount --> " + state.totalAmount);
        },
        addPriceForFinalAmountCheckout: (state, action) => {
            state.finalPriceForCheckout = state.finalPriceForCheckout + action.payload
        },
        restPriceForFinalAmountCheckout: (state, action) => {
            state.finalPriceForCheckout = state.finalPriceForCheckout - action.payload
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
    //gettingShoppingCartFromDB,
    successMsg, 
    errorMsg,
    updateShoppingCartUser,
    addAmountForShoppingCartUser,
    restAmountForShoppingCartUser,
    eraseGuestShoppingCart,
    //  gettingShoppingCartFromDBUser,
    userShoppingDBemptyByHand,
    settingShoppingCartFromLocalStorage,
    restPriceForFinalAmountCheckout,
    addPriceForFinalAmountCheckout
} = shoppingCartReducer.actions;

export default shoppingCartReducer.reducer