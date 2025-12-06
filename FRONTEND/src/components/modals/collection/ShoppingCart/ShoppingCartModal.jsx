import { Product } from "./ShoppingCartProduct";
import {resetShoppingCart} from "@slices/Auth/UserSlice"
import { useSelector,useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { searchMeasurement } from "@features/shop/products/components/Products";
import { showPreOrderModal } from "@components/modals/Showers"
const ShoppingCartModal = ({ onCloseModal }) => {
    const shoppingCart_state = useSelector((state) => state.user.globalData.shoppingCart);
    const Products = useSelector((state) => state.user.globalData.shoppingCart.products);
    // const Products = shoppingCart_state.products;
    const Measurements = useSelector((state) => state.products.measurements)
    const [productsInCart, setProducts] = useState([])
    const [shoppingCart_TotalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()
    // console.log(Products)

    // actualizacion y sincronizacion del estaod local con el global
    useEffect(() => {
        setProducts(Products)
    }, [Products])
    // use effect para calcular el total
    useEffect(() => {
        let subtotal = Products.reduce((total, producto) => total + (producto.precioTotal || 0), 0)
        setTotalPrice(subtotal)
        console.log("total -> " + subtotal)
    },[Products])

    // funcion para resetear el carrito
    useEffect(() => {
        shoppingCart_state.wasConfirmedByServer && shoppingCart_state.wasConfirmedByClient 
        ? resetChart() 
        : null
    },[
        shoppingCart_state.wasConfirmedByServer,
        shoppingCart_state.wasConfirmedByClient
        // shoppingCart_state
    ])

    const resetChart  = () =>{
        dispatch(resetShoppingCart())
    }


    return (
        //  < !--modal del carrito de compras de mercasena papa! -- >

        <dialog open id="modal_carrito" className="modal">
            <div className="modal-box w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-center text-2xl font-bold color-sena-texto">CARRITO DE COMPRAS</h3>

                {/* <!-- Contenedor principal sin divide-x global --> */}
                <div className="mt-2 color-sena-borde">
                    {/* <!-- Cabecera con línea horizontal debajo --> */}
                    <div
                        className="grid  grid-cols-2 md:grid-cols-3 text-center font-bold text-green-700 py-2 border-b-4 color-sena-borde">
                        <div className="color-sena-texto">PRODUCTOS</div>
                        <div className="border-l-4 border-r-4 color-sena-borde color-sena-texto">CANTIDAD</div>
                        <div className="hidden md:block color-sena-texto">TOTAL</div>
                    </div>

                    {/* <!-- Fila de producto --> */}
                    <div id="shoppingCarContainer"
                        className="grid grid-cols-2 md:grid-cols-3   items-center text-center font-semibold py-4">

                        {
                            productsInCart.length != 0 ?
                                (
                                    // console.log(`el largir de esta mmda es ${}`)
                                    productsInCart.map((product, index) => {
                                        let baseMeasurement = searchMeasurement(product.medidaVenta, Measurements)
                                        let measurement = product.cantidad > 1
                                            ? baseMeasurement.plural || null
                                            : baseMeasurement.singular || null
                                        return (
                                            <Product measurement={measurement} key={index + "prod_in_cart"} producto={product} />
                                        )
                                    })
                                ) : (
                                    <div role="alert" className="alert col-span-2 md:col-span-3  mx-auto mt-10 mb-10  w-full alert-error">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-2xl text-white">
                                            No tienes produtos en tu carrito
                                        </span>
                                    </div>
                                )

                        }





                        {/* <!-- ================== SEGUNDO PRODUCTO =================== --> */}


                    </div>





                    {/* <!-- Botones de pago --> */}
                    <div className="flex justify-center gap-4 mt-6 border-t-4 color-sena-borde pt-4">
                        <button onClick={() => showPreOrderModal()} className="color-sena text-white px-6 py-2 rounded-lg">SOLICITAR
                            $<span id="TotalShoppinCart">{shoppingCart_TotalPrice}</span></button>
                    </div>


                </div>


                {/* <!-- Botón cerrar --> */}
                <form method="dialog" className="absolute right-2 top-2">
                    <button onClick={() => onCloseModal()} className="btn btn-sm btn-circle text-black hover:bg-red-400 btn-ghost">✕</button>
                </form>
            </div>
        </dialog>

    )
}
export default ShoppingCartModal