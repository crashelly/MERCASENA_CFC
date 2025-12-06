import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { SuccessAlert, ErrorAlert } from "@components/Alerts"
import { CONFIG } from "@config/app"
// import { useSelector } from "react-redux"
const OrderInfoModal = () => {
    const order = useSelector(state => state.user.globalData.orderDetails)
    const user = useSelector(state => state.user.globalData)
    const [orderDetails_local, setOrderDetails_local] = useState({})

    console.log(order)
    useEffect(() => {
        setOrderDetails_local(order)
    }, [order])

    if (order.length == 0) {
        return <></>
    }

    const deleteOrder = async (orderID) => {
        let data = { orderID: orderID }
        fetch(CONFIG.API.URL.endpoints.orders.delete(), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Mercasena-Token': user.sessionToken,
                'mercasena-token': user.sessionToken,
                'X-CSRF-token': user.token
            },
            body: JSON.stringify({
                action: "deleteOrder",
                dataObject: data
            })
        }).then(response => {
            if (!response.ok) {
                ErrorAlert("Error al eliminar el pedido")
            }
            return response.json()
        }).then((response) => {
            SuccessAlert(response.mensagge)

        }).catch(error => {
            ErrorAlert(error)
        })

    }

    // permite mirar a ver en que estado se debe representarel badge del estado del pedido
    const orderStateBadgeColor = (stateID) => {
        // dependiendo el estado devuelve aguno de los posibles colores
        console.log(stateID)
        const posibleStates = [
            "badge-success  text-white ",
            "badge-warning  text-black ",
            "badge-error  text-black "]
        return posibleStates[stateID - 1]
    }
    return (
        <>
            <dialog id="orderInfoModal" className="modal">
                <div className="modal-box bg-white">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost  hover:bg-red-400  text-black absolute right-2 top-2">✕</button>
                    </form>
                    <div className="w-full mx-auto" id="orderInfoModalContainer">

                        {/* carta donde se muestra la informacion del pedido */}
                        <div className="card mx-auto md:ml-13 w-full  md:w-86  mb-2 mr-1 mt-2  bg-white-100 rounded-lg shadow-sm">
                            <div className="card-body">
                                <span className="badge badge-md  text-md text-black   bg-white  ">{order.fecha}</span>
                                <span id="orderInfoState"
                                    className={`${orderStateBadgeColor(order.estadoID)} badge text-black  badge-md text-md   `}>
                                    {order.estado}
                                </span>
                                <div className="flex justify-between">
                                    <h2 className="text-3xl font-bold mr-3  hover:text-blue-500 hover:transition-700 ease-in-out  bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text  ">{user.name}</h2>

                                    <span className="text-xl inline-flex  text-green-500 font-bold   ">Total
                                        <span className="flex ml-4 text-gray-800   hover:text-yellow-400" >$</span>
                                        <span className="font-bold ml-1 hover:text-yellow-400 text-gray-800">{addPuntuaction(Number(order.precioTotal))}</span>
                                        {/* <span className="font-bold ml-1 hover:text-yellow-400 text-gray-800"> {order.precioTotal}</span> */}
                                    </span>
                                </div>
                                <ul id="productsList" className="mt-6 flex flex-col gap-2 text-xs">
                                    {

                                        order.productos && order.productos.map((producto, indexer) => {
                                            // parte donde se valida el estado de ese producto
                                            const estado = producto.estado != 1
                                                ? "size-4 w-6 h-6  me-2 inline-block text-success"
                                                : "size-4 w-6 h-6  me-2 inline-block line-through opacity-50 text-success"
                                            return (
                                                <li key={`${order.pedidoId}-prod_${indexer}`} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className={estado} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                                    <span className="text-md uppercase font-semibold text-black" id="">
                                                        {producto.nombre}  {producto.variante} X {producto.cantidad} {producto.medida} = ${addPuntuaction(producto.precioParcialProducto)}

                                                    </span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => deleteOrder(order.pedidoId)} id="deleteOrder" className="btn hover:shadow-lg    btn-error rounded-lg transition delay-150 duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-500 hover:text-white   btn-block">Cancelar pedido</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>

        </>
    )
}

const addPuntuaction = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export {
    addPuntuaction
}
export default OrderInfoModal