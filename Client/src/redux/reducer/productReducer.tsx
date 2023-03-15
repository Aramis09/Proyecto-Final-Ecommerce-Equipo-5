import { createSlice } from "@reduxjs/toolkit";
import { access } from "fs";

import { productReducerState } from "../interfaces/productInterface";


const initialState: productReducerState = {
    searchedData: [],
    details: {},
    topProductsData: [],
    carouselData: [],
    searchObject: {},
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
        listProducts: (state, action) => {
            state.searchedData = action.payload;
        },
        productsByFilters: (state, action) => {
            state.searchedData = action.payload;
        },       
        productByID: (state, action) => {
            state.details = action.payload;
        },
        saveTopRatedProducts: (state, action) => {
            state.topProductsData = action.payload
        },
        carouselPicks: (state, action) => {
            state.carouselData = action.payload
        },
        searchObject: (state, action) => {
            state.searchObject = action.payload
        },
        searchName: (state, action) => {
            state.searchedName = action.payload
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
        eraseSearchedName: (state) => {
            state.searchedName = ''
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
        eraseItemById: (state) => {
            state.details = {}
        },     
        successMsg: (state, action) => { //falta implementar
            state.successMsg = action.payload
        },
        errorMsg: (state, action) => { //falta implementar
            state.errorMsg = action.payload
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
    eraseSearchedName,
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