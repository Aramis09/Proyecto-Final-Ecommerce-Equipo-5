import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAll = createAsyncThunk('sliceOne/getAll', async () => {
    try {
        const response = await axios.get("http://localhost:3001/products")
        return response.data;
    } catch (err: any) {
        return err.message
    }
})

export const searchGameByName = createAsyncThunk('sliceOne/searchGameByName', async (name) => {
    try {
        const response = await axios.get(`http://localhost:3001/products?name=${name}`)
        return response.data;
    } catch (err: any) {
        return err.message
    }
})

export const searchGameById = createAsyncThunk('sliceOne/searchGameById', async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/products/${id}`)
        return response.data;
    } catch (err: any) {
        return err.message
    }
})

export const carouselPicks = createAsyncThunk('sliceOne/carouselPicks', async () => {
    try {
        const response = await axios.get(`http://localhost:3001/products`)
        var data = response.data;
        var arr: number[]=[]
        for(var i:number=0; i < 3; i++){
            arr.push(Math.floor(Math.random()*74))
        }
        return [data[arr[0]], data[arr[1]], data[arr[2]]]
    } catch (err: any) {
        return err.message
    }
})