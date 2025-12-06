import { showPostOrderModal, } from "@components/modals/Showers"
import { SuccessAlert, ErrorAlert } from "@components/Alerts"
import { useState, useEffect } from "react"
import { setConfirmedByClient , setConfirmedByServer } from "@slices/Auth/UserSlice"
import { Loader } from "@components/Loaders/shop/shopLoader";
import { useSelector, useDispatch } from "react-redux"
import { CONFIG } from "@config/app"
import { closer as closerModal } from "./shower";
import Button from "./buttons"
import Payments from "./Payments"
const Modal = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const user = useSelector(state => state.user.globalData)
    const shoppingCartProducts = useSelector(state => state.user.globalData.shoppingCart.products)
    console.log(user)

    useEffect(() => {
        setUsername(user.name)
    }, [user.name])

    // esta es la funcion de click 
    const handleClickConfirmShoppingCart = () => {

        // cambiar el estado a confirmado 
        dispatch(setConfirmedByClient())
        // console.log(shoppingCartProducts)
        let data = []
        let totalPrice = 0
        shoppingCartProducts.map(product => {
            data.push({
                id: product.id,
                quantity: product.cantidad,
                partialTotalPrice: product.precioTotal,
            })

            // calcula el total price
            totalPrice += product.precioTotal || 0
        })


        sendInfoToServer({
            products: data,
            sessionToken: user.sessionToken,
            totalPrice: totalPrice
        })
        console.log(data)
        Loader.show()
    }

    const sendInfoToServer = (data) => {
        // cierra ese modal de confirmacion 
        closerModal();

        fetch(CONFIG.API.URL.endpoints.orders.create(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Mercasena-Token': user.sessionToken,
                'mercasena-token': user.sessionToken,
                'x-csrf-token': user.token
            },
            body: JSON.stringify({
                action: "createOrder",
                dataObject: data
            })
        }).then(response => {
            if (!response.ok) {
                // ErrorAlert("Error al crear el pedido")
                // throw new Error("Error al crear el pedido")
            }
            if (response.status === 401) {
                throw new Error("No puedes hacer eso,debes iniciar sesion")
                // ErrorAlert("No puedes hacer eso")
            }

            

            return response.json()
        }).then((response) => {

            // esconde el modal de carga
            Loader.hide();
            // muestra de que la accion salio exitosa
            SuccessAlert(response.mensagge)

            // se cambia el estado global del carrito a que fue confirmado por el server
            dispatch(setConfirmedByServer())

            // muestra el modal de notificacion de que este pendiente para pagar
            setTimeout(() => {
                showPostOrderModal()
            }, 1500)

        }).catch(error => {
            Loader.hide()
            
            ErrorAlert(error)
        })
    }
    return (
        <>
            {/* <!-- modal que muestra el aviso de una hora --> */}
            <dialog id="preOrderNotification" className="modal">
                <div className="modal-box bg-white">
                    <form onSubmit={(e) => e.preventDefault()} method="dialog ">
                        <button
                            onClick={() => document.getElementById('preOrderNotification').close()}
                            className="btn text-black  btn-sm btn-circle hover:bg-red-500 btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <div className="px-4 mt-1 md:px-8 py-5 pr-2 bg-gray-100 rounded-lg shadow-2xl max-w-xl">

                            <h1 className="text-lg mb-8">
                                <span id="userNameForConfirmSh" className=" text-gray-500 hover:underline hover:text-blue-400">Hey, {username || user.name}</span> <span className="mx-2"
                                    id="demo"></span><span className="text-xl">😄</span>
                                <br />
                                <span className="text-4xl  text-gray-600 font-semibold">¿Quieres confirmar tu </span>
                                <span className="text-4xl font-semibold text-blue-700">pedido?</span>
                            </h1>

                            <div className="flex animate-bounce mx-auto text-center justify-center space-x-3  flex-inline">
                                <span className="flex mr-4"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M12 16.99V17M12 7V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                            stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </g>
                                </svg>
                                    <h3 />
                                </span>
                                <div>

                                </div>
                                <span className="text-gray-500">

                                    <span className="underline text-gray-500 font-bold">No puedes editar tu pedido </span> despues de haber sido
                                    confirmado ¡<h3 />
                                </span>
                            </div>

                            {/* <div className="divider  divider-default"></div> */}

                            {/* contenedor de los medios de pago dispobles */}

                            <Payments />

                            <div className="flex flex-col justify-center w-full text-center mt-4 gap-6 sm:flex-row text-lg font-semibold">
                                <Button
                                    classOftag={"py-4 w-full sm:w-40 border border-blue-700  text-gray-500 rounded-lg hover:shadow-2xl hover:text-blue-700 shadow-lg"}
                                    action={() => closerModal()}
                                    mensagge={"Cancelar"}

                                />
                                <Button
                                    classOftag={"bg-green-500 w-full sm:w-40 py-4 rounded-lg text-white hover:bg-green-700 shadow-lg"}
                                    action={() => handleClickConfirmShoppingCart()}
                                    mensagge={"Confirmar"}

                                />
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </dialog >
        </>
    )
}


export default Modal 