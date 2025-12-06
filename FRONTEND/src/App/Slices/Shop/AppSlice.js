import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false,
    isMobileDevice: false,
    modals: {
        showMyAccount: false,
        showMyOrders: false,
        showMyBills: false,
        showLogout: false,
        showShoppingCart: false
    },

};

const AppSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        /**
         * Reducer para agregar todos los productos
         
         */
        setMobileDevice: (state, action) => {
            state.isMobileDevice = action.payload
        },
        setLoggedUser: (state, action) => {
            state.isLogged = action.payload
        },
        setShowMyAccount: (state, action) => {
            console.log("SETEANDO EL ESTADO GLOBAL DE MI CUENTA "+action.payload)
            state.modals.showMyAccount = action.payload
        },
        setShowMyOrders: (state, action) => {
            state.modals.showMyOrders = action.payload
        },
        setShowMyBills: (state, action) => {
            state.modals.showMyBills = action.payload
        },
        setShowLogout: (state, action) => {
            state.modals.showLogout = action.payload
        },
        setShowShoppingCart: (state, action) => {
            state.modals.showShoppingCart = action.payload
        },
    }

})
// exportacion de todas las funcionalidades
export const {
    setMobileDevice,
    setLoggedUser,
    setShowMyAccount,
    setShowMyOrders,
    setShowMyBills,
    setShowShoppingCart,
    setShowLogout
} = AppSlice.actions

export default AppSlice.reducer
