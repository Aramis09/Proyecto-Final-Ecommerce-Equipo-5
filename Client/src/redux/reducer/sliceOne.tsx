import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";
import dataJson from '../../serverJson/data_API_nuestra.json';

interface reducerOneState{
    all: Array<object>,
    details: object,
    carouselData: Array<object>
}

const initialState: reducerOneState = {
    all: [],
    details: {},
    carouselData: []
}


export const sliceOne = createSlice({
    name: "sliceOne",
    initialState,
    reducers:{
        getAll: (state) => {
            state.all = dataJson;
            //A futuro tenemos que cambiar esta solicitud para traer todos los juegos desde el backend.
        },
        gameDetails: (state, action: PayloadAction<object>) => {
            state.details = action.payload
        },
        emptyGameDetails: (state) => {
            state.details = {}
        },
        carouselPicks: (state) => {
            var arr: number[]=[]
            for(var i:number=0; i < 3; i++){
                arr.push(Math.floor(Math.random()*74))
            }
            state.carouselData = [dataJson[arr[0]], dataJson[arr[1]], dataJson[arr[2]]];
            //la idea es que desde el backend se elijan 3 juegos aleatorios, igual esta a decision de todos.
        }
    }
})

export const {getAll, gameDetails, emptyGameDetails, carouselPicks} = sliceOne.actions;

export const selectAll = (state: RootState) => state.reducerOne;

export default sliceOne.reducer


/*
getAll: (state) => {
    axios.get("https://apisgames-production.up.railway.app/products")
    .then(r => {
        console.log('peticion 1', r.data)
        return r.data
    })
    .then(data => {
        console.log('respuesta', data)
        state.all = data
    })
    .catch(err => {
        console.log('err', err);
        console.log('dataJson', dataJson)
        state.all = dataJson;
    })

*/