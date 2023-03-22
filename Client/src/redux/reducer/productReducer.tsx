import { createSlice } from "@reduxjs/toolkit";
import { access } from "fs";

import { productReducerState } from "../interfaces/productInterface";

const initialState: productReducerState = {
  allProductsData: [],
  searchedData: [],
  details: {},
  topProductsData: [],
  carouselData: [],
  searchObject: {},
  searchedName: "",
  selectedFilterGenreData: [],
  selectedFilterPlatformData: [],
  selectedFilterPriceRangeData: [],
  selectedAlphabeticOrderData: "",
  selectedPriceOrderData: "",
  todaysDiscount: {},
  discountGloballyApplied: false,
  adminDiscount: false,
  successMsg: "",
  errorMsg: "",
};

export const productReducer = createSlice({
    name: "productReducer",
    initialState,
    reducers:{
        listProducts: (state, action) => {
            state.allProductsData= action.payload;
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
            state.selectedFilterGenreData = [action.payload];
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
        setTodaysDiscount: (state, action) => {
            state.todaysDiscount = action.payload
        },
        setAutoGlobalDiscount: (state, action) => {
            state.discountGloballyApplied = action.payload
        },
        onOffAdminDiscount: (state, action) => {
            state.adminDiscount = action.payload
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
    selectedFilterPriceRange,
    selectedAlphabeticOrder,
    selectedPriceOrder,
    searchName,
    setTodaysDiscount,
    setAutoGlobalDiscount,
    onOffAdminDiscount,
    eraseItemById
} = productReducer.actions;

export default productReducer.reducer;
//export const selectAll = (state: RootState) => state.productReducer;
