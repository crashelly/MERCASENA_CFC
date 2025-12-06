import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { ErrorAlert, SuccessAlert } from "@components/Alerts/"

import OrderCard from "./orderCard"
import OrderInfoModal from "./orderInfoModal"
import { CONFIG } from "@config/app"
const UserOrdersModal = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const [showOrderDetails, setShowOrderDetails] = useState(false)
    const user = useSelector(state => state.user.globalData)

    // aca se consulta la informacion  de los pedidos
    useEffect(() => {
        try {
            fetch(CONFIG.API.URL.endpoints.orders.get(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'mercasena-token': user.sessionToken
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los pedidos")
                }

                return response.json()
            }).then((data) => {
                setOrders(data);
                setIsLoading(false)
            })
        } catch (error) {
            ErrorAlert(error)

        }
    }, [])

    return (
        <>
            {/* <!-- modal de los pedidos del usuario --> */}
            <dialog open id="ordersModal" className="modal">
                <div className="modal-box  bg-slate-100  w-11/12 max-w-5xl  ">
                    <form method="dialog">
                        <button
                            className="btn btn-sm bg-white-400 ml-2   btn-circle btn-ghost absolute right-3 top-8 lg:top-2  hover:bg-red-400">
                            ✕</button>
                    </form>
                    <div className="mt-5">
                        {/* <!-- menu de filtros --> */}
                        <div className="navbar  bg-slate-500 shadow-sm">
                            {/* <!-- primera parte --> */}
                            <div className="flex-none">
                                <button className="btn btn-square btn-ghost">

                                </button>
                            </div>
                            {/* <!-- segunda parte --> */}
                            <div className="flex-1">
                                {/* <!-- filtros --> */}

                                <a className="btn btn-ghost text-green-400 mb-5  text-xl">Mis pedidos</a>
                            </div>

                        </div>
                        <div id="ordersCardContainers" className="grid ml-8 grid-cols-1 p-2 gap-2  md:gap-0 lg:grid-cols-2">
                            {/* <!-- CARD de informacion del pedido --> */}
                            {
                                orders.length != 0 ? (
                                    orders.map((order, index) => {
                                        return (
                                            <OrderCard key={"orderFromMOdal_" + index} pedido={order} counter={index} />
                                        )
                                        // console.log(order)
                                    })

                                ) : (

                                    isLoading ? (
                                        <div className="w-full  col-span-1 md:col-span-2 h-80">
                                            <div className=" align-middle mx-auto mt-10 w-20 h-20 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
                                        </div>
                                    ) : (
                                        <div role="alert" className="alert col-span-1 md:col-span-2  mx-auto mt-10 mb-10  w-full alert-error">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-2xl text-white">
                                                Aun no has hecho ningun pedido
                                            </span>
                                        </div>
                                    )


                                )
                            }
                            {/* <OrderCard order={order} /> */}
                        </div>


                    </div>

                </div>
            </dialog>
            <OrderInfoModal />

        </>
    )
}


export default UserOrdersModal