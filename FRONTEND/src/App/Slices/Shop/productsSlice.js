import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    cachedProducts: [],
    allProducts: [],
    measurements: [],
    targets: {
        category: null,
        product: null
    }
};

const ProductsSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
        /**
         * Reducer para agregar todos los productos
         
         */
        addAllProducts: (state, action) => {
            state.allProducts = action.payload
        },

        addProductsToCache: (state, action) => {
            state.cachedProducts = action.payload
        },
        /**
        * Reducer para agregar un producto al cachedProducts
        */
        addProduct: (state, action) => {
            state.cachedProducts.push(action.payload)
        },

        setProductsToCache: (state, action) => {
            state.cachedProducts = action.payload
        },
        /**
         * agrega las categorias al sistema
         */
        addCategories: (state, action) => {
            state.categories = action.payload
        },
        /**
         * setea las medidas de los productos
         */
        setMeasurements: (state, action) => {
            state.measurements = action.payload
        }
    }
})
// exportacion de todas las funcionalidades
export const {
    addAllProducts,
    addCategories,
    addProductsToCache,
    setProductsToCache,
    setMeasurements
} = ProductsSlice.actions

export default ProductsSlice.reducer
