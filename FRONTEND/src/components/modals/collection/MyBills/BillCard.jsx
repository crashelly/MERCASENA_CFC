import { addPuntuaction } from "../MyOrders/orderInfoModal"
import { useState, useEffect } from "react"
import { Option } from "./BillOptions"
import { useDispatch, useSelector } from "react-redux"
import { CONFIG } from "@config/app"
import { appStateNotification, ErrorAlert } from "@components/Alerts"

const BillCard = ({ factura }) => {
    const user = useSelector(state => state.user.globalData)
    const [targetBillId, setTargetBillId] = useState(null)
    const [targetBillIdForDownload, settargetBillIdForDownload] = useState(null)

    // evento de busqueda para renderizar la vista previa del comprobante de venta
    useEffect(() => {
        if (!targetBillId) {
            return
        }
        // muestra que se eesta generando el comprobante
        appStateNotification({ action: 'notify', mensagge: 'Consultado informacion' })

        fetch(CONFIG.API.URL.endpoints.bills.getById(targetBillId), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'mercasena-token': user.sessionToken,
                'X-CSRF-token': user.token
            },
        })
            .then(res => {
                if (!res.ok) {
                    ErrorAlert("Error al obtener informacion de la factura")
                }
                return res.json()
            })
            .then((data) => {
                console.log(data[0])

                localStorage.setItem('bill', JSON.stringify(data[0]));
                setTargetBillId(null)
                const url = window.location.origin + "/comprobante/"; // Puedes cambiar esto a la URL que desees abrir
                // const url = window.location.origin + "/comprobante.html"; // Puedes cambiar esto a la URL que desees abrir
                const windowName = 'CustomWindow';
                // const windowFeatures = 'width=1920,height=1080';
                const windowFeatures = 'width=800,height=800';

                window.open(url, windowName, windowFeatures);
            })
    }, [targetBillId])

    // para descargar la factura
    useEffect(() => {
        if (!targetBillIdForDownload) {
            return
        }
        appStateNotification({ action: 'notify', mensagge: 'Generando comprobante en el servidor' })

        fetch(CONFIG.API.URL.endpoints.bills.download(targetBillIdForDownload), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'mercasena-token': user.sessionToken,
                'X-CSRF-token': user.token
            },
        })
            .then(res => {
                if (!res.ok) {
                    ErrorAlert("Error al obtener datos de la factura")
                }
                return res.json()
            })
            .then((data) => {
                console.log(data.url)

                setTimeout(() => {
                    fetch(data.url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            'Mercasena-Token': user.sessionToken,
                            'X-CSRF-token': user.token
                        },
                    })
                        .then(res => {
                            if (!res.ok) {
                                ErrorAlert("Error al obtener datos de la factura")
                            }
                            return res.json()
                        }).then((data_s) => {
                            
                            window.location.href = data_s.url;
                        })
                }, 2000)
                settargetBillIdForDownload(null)
            })
    }, [targetBillIdForDownload])

    const handleShowBill = (billID) => setTargetBillId(billID)
    const handleDownload = (billID) => settargetBillIdForDownload(billID)


    return (
        <>
            <div className="hover:border-3 hover:border-green-300 rounded-2xl p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 rounded flex p-5 h-full items-center">
                    <svg fill="#000000" className="w-6 h-6  md:w-10 md:h-10 icon flat-line" width="0px" height="0px" viewBox="0 0 24 24"
                        id="bill-dollar-left" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                id="secondary"
                                d="M18,3H10A8.48,8.48,0,0,1,5,18v3l2.33-1,2.33,1L12,20l2.34,1,2.33-1L19,21V4A1,1,0,0,0,18,3Z"
                                style={{ fill: "#2ca9bc", strokeWidth: 2 }}
                            />
                            <path
                                id="primary"
                                d="M5,13H7.5A1.5,1.5,0,0,0,9,11.5H9A1.5,1.5,0,0,0,7.5,10h-1A1.5,1.5,0,0,1,5,8.5H5A1.5,1.5,0,0,1,6.5,7H9"
                                style={{
                                    fill: "none",
                                    stroke: "#000000",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2
                                }}
                            />
                            <path
                                id="primary-2"
                                data-name="primary"
                                d="M7,7V6m0,8V13m5,2h3m-2-4h2"
                                style={{
                                    fill: "none",
                                    stroke: "#000000",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2
                                }}
                            />
                            <path
                                id="primary-3"
                                data-name="primary"
                                d="M5,18v3l2.33-1,2.33,1L12,20l2.34,1,2.33-1L19,21V4a1,1,0,0,0-1-1H10"
                                style={{
                                    fill: "none",
                                    stroke: "#000000",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2
                                }}
                            />
                        </g>

                    </svg>
                    <div className=" ml-4 flex-row flex">
                        <div className="col">
                            <span
                                className="flex col  items-center justify-center  text-sm md:text-lg hover:text-gray-100 hover:bg-yellow-400 duration-300 rounded-lg transition-colors ease-in-out  text-black  bg-slate-100 bg-opacity-25">
                                {factura.fecha}
                            </span>
                            <span
                                className="flex col mt-1 text-black text-sm md:text-lg hover:text-green-400 font-bold duration-300 transition  uppercase">

                                {factura.cliente}
                            </span>
                            <span className="flex col text-semibold text-black mt-6"><span
                                className="font-bold text-white hover:scale-105 hover:transform hover:duration-300 rounded-lg bg-green-400  hover:bg-green-600 duration-300 transition-colors  hover:text-orange  ease-in-out mr-4 text-center  w-6">
                                {factura.cantProductos}
                            </span>

                                productos</span>
                            <div className="divider divider-success"></div>
                            <span className="flex col text-black">Total:<span className="ml-12 self-end font-bold"> ${addPuntuaction(Number(factura.total))}</span></span>
                        </div>
                        <div className="divider col  divider-success"></div>
                        <div
                            className="flex overflow-visible  justify-center  items-center  pr-0   divide-x rounded-lg flex-col md:flex-col-reverse ">

                            {/* <!-- drodown de opciones --> */}
                            <div className="dropdown z-100 items-center overflow-visible justify-center bg-slate-100 dropdown-top">
                                <dbg-slate-100iv tabIndex="0" role="button" className="btn m-1 border-0 focus:border-2 bg-slate-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                                        <path fill="black"
                                            d="M256 144a64 64 0 1 0-64-64a64.072 64.072 0 0 0 64 64Zm0-96a32 32 0 1 1-32 32a32.036 32.036 0 0 1 32-32Zm0 320a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Zm0-272a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Z" />
                                    </svg>
                                </dbg-slate-100iv>

                                <ul tabIndex="0"
                                    className=" ml-0 border-2 border-gray-300 dropdown-content h-auto w-auto overflow-visible menu bg-slate-200 rounded-box z-1  justify-center   items-aling-center p-2 shadow-sm">
                                    {/* <!-- el de ver factura  --> */}

                                    <Option
                                        Icon={
                                            () => <svg width="0px" height="0px" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                                        stroke="#30c555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path
                                                        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                                                        stroke="#30c555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </g>
                                            </svg>
                                        }
                                        onClickEvent={() => handleShowBill(factura.id)} />
                                    <Option
                                        Icon={
                                            () => <svg width="0px" height="0px" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z"
                                                        fill="#000000"></path>
                                                </g>
                                            </svg>
                                        }
                                        onClickEvent={() => handleDownload(factura.id)} />


                                </ul>
                            </div>

                        </div>
                    </div>

                    <div>



                    </div>
                </div>
            </div>
        </>
    )
}


export default BillCard