import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducer/productReducer";
import platformReducer from "../reducer/platformReducer";
import genresReducer from "../reducer/genresReducer";

export const store = configureStore({
    reducer: {
        productReducer: productReducer,
        platformReducer: platformReducer,
        genresReducer: genresReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;