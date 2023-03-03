import { createSlice } from "@reduxjs/toolkit";

import { productReducerState } from "../interfaces/productInterface";

//import type { PayloadAction } from "@reduxjs/toolkit";
//import type { RootState } from "../store";
//import axios from "axios";
//import dataJson from '../../serverJson/data_API_nuestra.json';
/*
interface reducerOneState{
    all: Array<object>,
    details: object,
    carouselData: Array<object>,
    searchedData: Array<object>,
    successMsg: string,
    errorMsg: string
}*/

const initialState: productReducerState = {
    all: [],
    details: {},
    carouselData: [],
    //searchedData: [],
    successMsg: "",
    errorMsg: ""
}


export const productReducer = createSlice({
    name: "productReducer",
    initialState,
    reducers:{
        getAllProducts: (state, action) => {
            state.all = action.payload;
            console.log("state.all ---> " + state.all.length);
        },
        getProductByID: (state, action) => {
            state.details = action.payload;
        },  
        getProductByPlatform: (state, action) => {
            state.all = action.payload;
        },     
        successMsg: (state, action) => {
            state.successMsg = action.payload
        },
        errorMsg: (state, action) => {
            state.errorMsg = action.payload
        },
        carouselPicks: (state, action) => {
            var arr: number[]=[]
            for(var i:number=0; i < 3; i++){
                arr.push(Math.floor(Math.random()*74))
            }
            state.carouselData = action.payload
            //state.carouselData = [dataJson[arr[0]], dataJson[arr[1]], dataJson[arr[2]]];
            //la idea es que desde el backend se elijan 3 juegos aleatorios, igual esta a decision de todos.
        }
    }
})

export const {getAllProducts, getProductByID, getProductByPlatform, successMsg, errorMsg, carouselPicks} = productReducer.actions;
export default productReducer.reducer
//export const selectAll = (state: RootState) => state.productReducer;