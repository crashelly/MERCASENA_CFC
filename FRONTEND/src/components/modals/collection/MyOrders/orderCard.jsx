import { addPuntuaction } from "@features/shop/products/components/Products"
import { setOrderDetails } from "@slices/Auth/UserSlice"
import { useEffect, useState } from "react"
import OrderInfoModal from "./orderInfoModal"
import { useDispatch } from "react-redux"

const OrderCard = ({ pedido, counter }) => {
    const [limitOfMiniatures, setLimitOfMiniatures] = useState(0)
    const dispatch = useDispatch()
    let extraImages = 0

    useEffect(() => {
        setLimitOfMiniatures(() => window.innerWidth <= 768 ? 2 : 3)
    }, [window.innerWidth])

    const getOrderState = () => {
        let options = [
            {
                value: "Pendiente",
                class: "badge badge-success text-white"
            },
            {
                value: "entregado",
                class: "badge badge-success text-white"
            },
            {
                value: "cancelado",
                class: "badge badge-error text-white"
            }
        ]
        
        return options.find(option => option.value == pedido.estado).class
    }
    const handleShowOrderInfo = (orderData) => {
        dispatch(setOrderDetails(orderData))
        console.log("intentando ")
        document.getElementById('orderInfoModal').showModal()
        // return <OrderInfoModal pedido={orderData}/>
    }
    return (
        <div
            className="rounded-xl overflow-hidden bg-white mt-1 md:mt-2  flex shadow hover:shadow-lg hover:scale-105   md:hover:scale-110 transform  max-w-sm  cursor-pointer h-30  md:h-40">

            7<div className=" pl-3 p- pb-5 text-text1 flex flex-col justify-center">
                <p className="text-base mb-2 font-bold truncate">
                </p>
                {/* "badge  mt-2 md:mt-1  " */}
                <div id="orderStatus"
                    className={getOrderState()}>
                    {pedido.estado}
                </div>
                <div className="text-xs pt-1 pb-0 mt-2 md:mt-0  text-primary mb-2">
                    <a className="flex items-center">

                        {/* aca es donde se ven las imagenes miniatura de los productos */}
                        <div id="productsInOrder" className="flex  justify-end -space-x-3 space-x-reverse">
                            {
                                pedido.productos.map((producto, counter) => {
                                    // si el el contador de miniaturas es mayor a 3 entonces se aumenta el contador de imagenes extra
                                    counter > limitOfMiniatures
                                        ? extraImages++
                                        : <></>

                                    return counter < limitOfMiniatures
                                        ? <ProductMiniature key={`miniature ${producto.id}_min_${counter}`} imageUrl={producto.imagen} />
                                        : null

                                })
                            }

                            {
                                extraImages != 0 ? (
                                    <div
                                        className="relative flex h-12 w-12 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase text-gray-800 ring ring-white">

                                        <span>+{extraImages}</span>
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                    </a>
                    <span className="font-bold tracking-wide mt-2 text-lg text-green-400">{pedido.productos.length} productos</span>
                </div>
                <div className="text-sm text-text2 text-black tracking-wider mt-5 md:mt-0">{pedido.fecha}</div>
            </div>
            <div className="lg:flex flex w-5/12 flex-col mt-3 pt-2 flex-1    p-2">

                <div>

                </div>
                <div className="md:ml-9 justify-end">
                    <span className="font-bold tracking-wide mt-7 text-x4l text-green-400">Total <span
                        className="font-bold tracking-wide mt-2 text-x2l text-gray-600">$</span> <span
                            className="font-bold tracking-wide mt-2 text-x2l text-gray-600"> {addPuntuaction(pedido.precioTotal)}</span></span>
                </div>

                <div className="text-sm text-text2 self-center mt-5 justify-end tracking-wider">
                    <button onClick={() => handleShowOrderInfo(pedido)}
                        className="btn btn-md rounded-lg  md:btn-sm  mr-6 md:mr-0 text-black bg-blue-400 p-4 md:p-4    hover:bg-blue-600 hover:text-white  transition duration-200 ease-in-out justify-end">

                        Mas Informacion</button>
                </div>

            </div>
        </div>
    )
}

const ProductMiniature = ({ imageUrl }) => {
    return (
        <div
            className="relative flex h-12 w-12 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase text-gray-800 ring ring-white">
            <img className="h-full w-full rounded-full object-cover object-center"
                src={imageUrl} />
        </div>
    )
}

export default OrderCard