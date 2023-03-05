import { createSlice } from "@reduxjs/toolkit";
import { access } from "fs";

import { productReducerState } from "../interfaces/productInterface";


const initialState: productReducerState = {
    //all: [],
    searchObject: {},
    details: {},
    carouselData: [],
    searchedData: [],
    topProductsData: [],
    searchedName: '',
    selectedFilterGenreData: [],
    selectedFilterPlatformData: [],
    selectedFilterPriceRangeData: [],
    selectedAlphabeticOrderData: '',
    selectedPriceOrderData: '',
    successMsg: "",
    errorMsg: ""

}


export const productReducer = createSlice({
    name: "productReducer",
    initialState,
    reducers:{
        listProducts: (state, action) => { //en desuso??
            state.searchedData = action.payload;
        },
        /*productsByPlatform: (state, action) => {
            state.all = action.payload;
        },*/
        productsByFilters: (state, action) => { //en desuso??
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
            state.searchedData = [],
            state.searchedName = '',
            state.selectedFilterGenreData = [],
            state.selectedFilterPlatformData = [],
            state.selectedFilterPriceRangeData = [],
            state.selectedAlphabeticOrderData = '',
            state.selectedPriceOrderData = ''
        },
        searchObject: (state, action) => {
            state.searchObject = action.payload
        },
        selectedFilterGenre: (state, action) => {
            console.log('red', state.selectedFilterGenreData, typeof action.payload, action.payload)
            if (state.selectedFilterGenreData.includes(action.payload)){
                state.selectedFilterGenreData = state.selectedFilterGenreData.filter(item => item !== action.payload)
                console.log(state.selectedFilterGenreData)
            } else {
                state.selectedFilterGenreData = [...state.selectedFilterGenreData, action.payload]
                console.log(state.selectedFilterGenreData)
            }
        },
        selectedFilterPlatform: (state, action) => {
            state.selectedFilterPlatformData = action.payload
        },
        selectedFilterPriceRange: (state, action) => {
            state.selectedFilterPriceRangeData = action.payload
        },
        selectedAlphabeticOrder: (state, action) => {
            state.selectedAlphabeticOrderData = action.payload
        },
        selectedPriceOrder: (state, action) => {
            state.selectedPriceOrderData = action.payload
        },
        searchName: (state, action) => {
            state.searchedName = action.payload
        },
        eraseItemById: (state) => {
            state.details = {}
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
    eraseSearchedData,
    searchObject,
    selectedFilterGenre,
    selectedFilterPlatform,
    selectedFilterPriceRange,
    selectedAlphabeticOrder,
    selectedPriceOrder,
    searchName,
    eraseItemById
} = productReducer.actions;

export default productReducer.reducer
//export const selectAll = (state: RootState) => state.productReducer;