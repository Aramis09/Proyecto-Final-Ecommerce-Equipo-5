import { createSlice } from "@reduxjs/toolkit";

import { productReducerState } from "../interfaces/productInterface";


const initialState: productReducerState = {
    //all: [],
    details: {},
    carouselData: [],
    searchedData: [],
    topProductsData: [],
    successMsg: "",
    errorMsg: ""
}


export const productReducer = createSlice({
    name: "productReducer",
    initialState,
    reducers:{
        listProducts: (state, action) => {
            state.searchedData = action.payload;
        },
        /*productsByPlatform: (state, action) => {
            state.all = action.payload;
        },*/
        productsByFilters: (state, action) => {
            state.searchedData = action.payload;
        },       
        productByID: (state, action) => {
            state.details = action.payload;
        },      
        successMsg: (state, action) => {
            state.successMsg = action.payload
        },
        errorMsg: (state, action) => {
            state.errorMsg = action.payload
        },
        saveTopRatedProducts: (state, action) => {
            state.topProductsData = action.payload
        },
        carouselPicks: (state, action) => {
            state.carouselData = action.payload
        },
        eraseSearchedData: (state) => {
            state.searchedData = []
        }
    }
})

export const {
    listProducts, 
    productByID, 
    productsByFilters, 
    successMsg, 
    errorMsg, 
    carouselPicks, 
    saveTopRatedProducts, 
    eraseSearchedData
} = productReducer.actions;

export default productReducer.reducer
//export const selectAll = (state: RootState) => state.productReducer;