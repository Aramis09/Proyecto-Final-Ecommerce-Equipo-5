import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
//import axios from "axios";
import { getAll, searchGameById, searchGameByName, carouselPicks } from "../actions/actions";
//import dataJson from '../../serverJson/data_API_nuestra.json';

interface reducerOneState{
    all: Array<object>,
    details: object,
    carouselData: Array<object>,
    searchedData: Array<object>
}

const initialState: reducerOneState = {
    all: [],
    details: {},
    carouselData: [],
    searchedData: []
}

export const sliceOne = createSlice ({
    name: "sliceOne",
    initialState,
    reducers:{
        emptyGameDetails: (state) => {
            state.details = {}
        },
        emptySearchedData: (state) => {
            state.searchedData = []
        }
        /*
        filteredSearch: (state, action: PayloadAction<any>) => {
            
            Nota: esto se va a implementar en la carpeta actions para poder hacer
            peticiones de cosas asincronas (peticiones a server).
            NO ESTA PREPARADO, COORDINAR CON EL BACK PARA MEJOR CREACION!!
        }


        */
    },
    extraReducers(builder) {
        builder
            .addCase(getAll.pending, (state) => {
                //console.log('pending') //debug
            })
            .addCase(getAll.fulfilled, (state, action:PayloadAction<any>) => {
                //console.log('full', action.payload) //debug
                state.all = action.payload
            })
            .addCase(getAll.rejected, (state) => {
                //console.log('error', action.payload) //debug
                throw new Error
            })
            .addCase(searchGameById.pending, (state) => {
                //console.log('pending') //debug
            })
            .addCase(searchGameById.fulfilled, (state, action:PayloadAction<any>) => {
                //console.log('full', action.payload) //debug
                state.details = action.payload
            })
            .addCase(searchGameById.rejected, (state) => {
                //console.log('error', action.payload) //debug
                throw new Error
            })
            .addCase(carouselPicks.pending, (state) => {
                //console.log('pending') //debug
            })
            .addCase(carouselPicks.fulfilled, (state, action:PayloadAction<any>) => {
                //console.log('full', action.payload) //debug
                state.carouselData = action.payload
            })
            .addCase(carouselPicks.rejected, (state) => {
                //console.log('error', action.payload) //debug
                throw new Error
            })
            .addCase(searchGameByName.pending, (state) => {
                //console.log('pending') //debug
            })
            .addCase(searchGameByName.fulfilled, (state, action:PayloadAction<any>) => {
                //console.log('full', action.payload) //debug
                state.searchedData = action.payload
            })
            .addCase(searchGameByName.rejected, (state) => {
                //console.log('error', action.payload) //debug
                throw new Error
            })
    }
})

export const {emptyGameDetails, emptySearchedData} = sliceOne.actions;

export const selectAll = (state: RootState) => state.reducerOne;

export default sliceOne.reducer