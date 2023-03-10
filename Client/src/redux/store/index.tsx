import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducer/productReducer";
import platformReducer from "../reducer/platformReducer";
import genresReducer from "../reducer/genresReducer";
import mercadoLibreReducer from "../reducer/mercadoLibreReducer";

export const store = configureStore({
    reducer: {
        productReducer: productReducer,
        platformReducer: platformReducer,
        genresReducer: genresReducer,
        mercadoLibreReducer: mercadoLibreReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;