import { useDispatch, useSelector } from "react-redux"
import {
    updateTotalPrice,
    dropProductFromShoppingCart,
    increaseProductQuantity,
    decreaseProductQuantity
} from "@slices/Auth/UserSlice"
import { useEffect, useState } from "react";


export const Product = ({ producto, measurement }) => {

    const dispatch = useDispatch()

    const increase = (id) => {
        dispatch(increaseProductQuantity({ id: id }))
        dispatch(updateTotalPrice({ id: id }))
        console.log("subi")
    }

    const decrease = (id) => {
        dispatch(decreaseProductQuantity({ id: id }))
        dispatch(updateTotalPrice({ id: id }))
        console.log("baje")
    }

    const handleDelete = (id) => {
        dispatch(dropProductFromShoppingCart({ id: id }))
    }
    return (
        <>
            {/* <!-- Producto + botón eliminar --> */}
            <div className="flex items-center  mt-2 justify-center gap-2">
                <span className="color-sena contenedorNombreCarrito text-white px-3 py-1 rounded-lg">
                    {producto.nombre} {producto.subCategoria}:  ${producto.precio}
                </span>
                <input type="hidden" value="${producto.precio}" />
                <button className="bg-red-400 text-white px-2 py-1 rounded-md text-xs transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 " onClick={() => { handleDelete(producto.id) }}><svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
            </div>

            {/* <!-- Cantidad que tambien contiene los botones de agregar o bajar --> */}
            <div className="border-l-4 border-r-4 border-green-500 flex justify-center items-center">
                {/* <!-- boton de disminuir --> */}

                <button onClick={() => { decrease(producto.id) }} className="mr-3 bg-red-300 hover:bg-red-500 hover:scale-110 transition duration-300  ease-in-out  text-white px-3 py-1 rounded-lg">
                    <img className="h-4 w-4" src="https://img.icons8.com/ios-glyphs/30/minus.png" alt="minus" />
                </button>

                <span className="color-sena text-white contenedorMedidaCarrito  px-2 py-1 rounded-lg"><input type="hidden" id="quantity${producto.id}" value="1" />
                    <strong id="text${producto.id}"></strong>
                    <strong >
                        {producto.cantidad} {measurement || null}
                        {/* aqui muestra si es singular o plural la medida ejemplo kilo o kilos */}
                    </strong>
                </span>

                {/* <!-- boton de aumentar --> */}
                <button onClick={() => { increase(producto.id) }} className="ml-3  bg-green-300 hover:bg-green-500 hover:scale-110 transition duration-300  ease-in-out    text-white px-3 py-1 rounded-lg">
                    <img className="h-4 w-4" src="https://img.icons8.com/material-rounded/24/plus--v1.png" alt="plus--v1" />
                </button>
            </div>

            {/* <!-- Total --> */}
            <div className="flex  md:block justify-center items-center">
                <button className="color-sena text-white px-3 py-1 rounded-lg"><input type="hidden" id="total${producto.id}" value="1" /><strong id="textTotal${producto.id}">${producto.precioTotal}</strong></button>
            </div>
        </>
    )
}

