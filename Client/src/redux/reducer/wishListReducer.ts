import { createSlice } from "@reduxjs/toolkit";
import { wishListReducerState } from "../interfaces/wishListInterface";

const initialState: wishListReducerState = {
    wishListItems: [],
    addedMsg: "",
    error: "",
};

export const wishListReducer = createSlice({
    name: "wishListReducer",
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            state.wishListItems.push(action.payload);
        },
        getWishesList: (state, action) => {
            state.wishListItems = action.payload;
        },
        deleteFromWishList: (state, action) => {
            let aux: any = state.wishListItems.find((el: any) => parseInt(el.id) === parseInt(action.payload));
            if (aux) {
                state.wishListItems = state.wishListItems.filter((el: any) => parseInt(el.id) !== parseInt(action.payload));
            };
        },
        addedMsg: (state, action) => {
            state.addedMsg = action.payload;
        },
        error: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { addToWishList, getWishesList, deleteFromWishList, addedMsg, error } = wishListReducer.actions;
export default wishListReducer.reducer;