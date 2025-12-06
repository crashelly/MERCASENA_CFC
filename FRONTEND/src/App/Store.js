import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "@slices/Shop/productsSlice"
import AppSlice from "@slices/Shop/AppSlice"
import UserSlice from "@slices/Auth/UserSlice"
export const Store = configureStore({
    reducer: {
        products: ProductsSlice,
        app: AppSlice,
        user: UserSlice
    },
});