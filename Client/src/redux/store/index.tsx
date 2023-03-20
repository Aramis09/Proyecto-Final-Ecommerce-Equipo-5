import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducer/productReducer";
import platformReducer from "../reducer/platformReducer";
import genresReducer from "../reducer/genresReducer";
import mercadoLibreReducer from "../reducer/mercadoLibreReducer";
import shoppingCartReducer from "../reducer/shoppingCartReducer";
import userReducer from "../reducer/userReducer";
import friendReducer from "../reducer/friendReducer";
import wishReducer from "../reducer/wishReducer";

export const store = configureStore({
    reducer: {
        friendReducer: friendReducer,
        productReducer: productReducer,
        platformReducer: platformReducer,
        genresReducer: genresReducer,
        mercadoLibreReducer: mercadoLibreReducer,
        shoppingCartReducer: shoppingCartReducer,
        userReducer: userReducer,
        wishReducer:wishReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;