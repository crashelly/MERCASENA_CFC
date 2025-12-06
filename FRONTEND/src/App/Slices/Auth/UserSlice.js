import { createSlice } from "@reduxjs/toolkit";
import { ErrorAlert } from "@components/Alerts"
import BillCard from "../../../Components/modals/collection/MyBills/BillCard";

const initialState = {
    globalData: {
        isLoggedIn: false,
        name: "",
        email: "",
        token: "",
        sessionToken: "",
        orderDetails: {},
        bills: [],
        filteredBills: [],
        shoppingCart: {
            products: [],
            wasConfirmedByClient: false,
            wasConfirmedByServer: false
        }


    },
};

const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        /**
         * Reducer para agregar todos los productos
         
         */
        setLoggedUser: (state, action) => {
            state.globalData.isLoggedIn = true
        },
        setUserInfo: (state, action) => {
            state.globalData.token = action.payload.token
            state.globalData.email = action.payload.email
            state.globalData.name = action.payload.name
            state.globalData.sessionToken = action.payload.sessionToken
        },
        setOrderDetails: (state, action) => {
            state.globalData.orderDetails = action.payload

            console.log("guardando la informacion del pedido")
            // console.log(state.globalData.orderDetails)
        },
        setBills: (state, action) => {
            state.globalData.billS = action.payload
        },
        setFilteredBills: (state, action) => {
            state.globalData.filteredBills = action.payload
        },
        updateTotalPrice: (state, action) => {
            const { id } = action.payload
            const index = state.globalData.shoppingCart.products.findIndex(item => item.id == id)

            let cantidad = state.globalData.shoppingCart.products[index].cantidad
            let precio = state.globalData.shoppingCart.products[index].precio
            state.globalData.shoppingCart.products[index].precioTotal = cantidad * precio
        },

        increaseProductQuantity: (state, action) => {
            const { id } = action.payload

            const index = state.globalData.shoppingCart.products.findIndex(item => item.id == id)
            // para cuando finIndex no encuentra el objeto

            if (index != -1) {
                // aumenta la cantidad en 1
                let cantidad = state.globalData.shoppingCart.products[index].cantidad + 1

                state.globalData.shoppingCart.products[index].cantidad = cantidad

                console.log(state.globalData.shoppingCart.products[index].cantidad)
            }


        },
        decreaseProductQuantity: (state, action) => {
            const { id } = action.payload
            const index = state.globalData.shoppingCart.products.findIndex(item => item.id == id)
            // para cuando finIndex no encuentra el objeto

            if (index != -1) {
                // sacamos la cantidad
                let cantidad = state.globalData.shoppingCart.products[index].cantidad

                // si la cantidad es <  a 0 dice que no puede hacer eso
                cantidad <= 1
                    ? ErrorAlert("No puedes bajar mas la cantidad")
                    : state.globalData.shoppingCart.products[index].cantidad = cantidad - 1



                // state.globalData.shoppingCart[index].cantidad = cantidad

                console.log(state.globalData.shoppingCart.products[index].cantidad)
            }
        },
        // ya viene la parte 
        // ADD 
        addProductToShoppingCart: (state, action) => {
            console.log(`agregado  ${action.payload}`)
            state.globalData.shoppingCart.products.push(action.payload)
        },

        dropProductFromShoppingCart: (state, action) => {
            let targetIndex = state.globalData.shoppingCart.findIndex(item => item.id == action.payload.id)
            state.globalData.shoppingCart.products.splice(targetIndex, 1)


        },
        resetShoppingCart: (state, action) => {
            state.globalData.shoppingCart.products = []
        },
        setConfirmedByClient: (state, action) => {
            state.globalData.shoppingCart.wasConfirmedByClient = true
        },
        setConfirmedByServer: (state, action) => {
            state.globalData.shoppingCart.wasConfirmedByServer = true
        },

        updateName : (state, action) =>{
            state.globalData.name = action.payload
        }

    }

})
// exportacion de todas las funcionalidades
export const {
    setLoggedUser,
    setUserInfo,
    setOrderDetails,
    setBills,
    setFilteredBills,
    addProductToShoppingCart,
    dropProductFromShoppingCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    updateTotalPrice,
    resetShoppingCart,
    setConfirmedByClient,
    setConfirmedByServer,
    updateName
} = UserSlice.actions

export default UserSlice.reducer
