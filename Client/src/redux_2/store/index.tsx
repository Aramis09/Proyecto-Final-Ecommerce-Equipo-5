import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducer/productReducer";
import platformReducer from "../reducer/platformReducer";

export const store = configureStore({
    reducer: {
        productReducer: productReducer,
        platformReducer: platformReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;