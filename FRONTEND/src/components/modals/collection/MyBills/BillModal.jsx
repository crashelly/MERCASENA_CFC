import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setBills } from "@slices/Auth/UserSlice"
import { SuccessAlert, ErrorAlert } from "@components/Alerts"
import BillCard from "./BillCard"
import { CONFIG } from "@config/app"
import "cally";
import { CalendarContainer } from "./Calendar"
const BillModal = ({ onCloseModal }) => {
    const [bills, setBills_local] = useState([])
    const [billsFilteredLocal, setBillsFiltered_local] = useState([])
    const [loadAgain, setLoadAgain] = useState(false)
    const [filterNow, setFilterState] = useState(false)
    const [showAll, set_showAll] = useState(false)
    const user = useSelector(state => state.user.globalData)
    const dispatch = useDispatch()

    useEffect(() => {
        fetch(CONFIG.API.URL.endpoints.bills.get(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'mercasena-token': user.sessionToken,
                // 'Mercasena-Token': user.sessionToken,
                'X-CSRF-token': user.token
            },
        })
            .then(res => {
                if (!res.ok) {
                    ErrorAlert("Error al obtener los comprobantes de venta")
                }
                return res.json()
            })
            .then((data) => {
                // console.log(data.filter(bill => bill.fecha.split(" ") == "2025-07-25"))
                const newTransformedData = data.map(bill => ({
                    ...bill,
                    fechaBusqueda: bill.fecha.split(" ")[0]
                })
                    // data.fechaBusqueda = bill.fecha.split(" ")
                    // data.fechaBusqueda = "2022-07-25"
                )
                console.log(newTransformedData)
                setBills_local(newTransformedData)
                dispatch(setBills(newTransformedData))
                // console.log()
            })
    }, [loadAgain])

    useEffect(() => {
        setBillsFiltered_local(user.filteredBills)
    }, [user.filteredBills])
    const ActivateFilter = (value) => {
        setFilterState(value)
        console.log(value)
    }
    // efecto que lo que hace es actualizar el estawdo de las facturas

    return (
        <>
            <dialog open id="BillModal" className="modal">
                <div className="modal-box  bg-white  w-11/12 max-w-5xl  ">
                    <form method="dialog">
                        <button onClick={() => onCloseModal()}
                            className="btn btn-sm bg-white-400 ml-2  text-black hover:bg-red-400 btn-circle btn-ghost absolute right-3 top-8 lg:top-2 ">
                            ✕</button>
                    </form>
                    <div className="mt-5">
                        {/* <!-- menu de filtros --> */}
                        <div className="navbar  bg-slate-100 shadow-sm">
                            {/* <!-- primera parte --> */}
                            <div className="flex-none">
                                <button className="btn btn-square btn-ghost">

                                </button>
                            </div>
                            {/* <!-- segunda parte --> */}
                            <div className="flex-1 hover:bg-slate-200">
                                {/* <!-- filtros --> */}

                                <a className="btn btn-ghost hover:bg-slate-200 whitespace-nowrap text-green-600  text-sm md:text-xl">
                                    Mis Comprobantes de ventas <span className="ml-3"><BillCounter counter={bills.length} /></span>
                                </a>
                            </div>
                            <div className="flex-2 inline-flex bg-slate-200 hover:bg-slate-200">
                                {/* <!-- filtros --> */}

                                <a className="btn btn-ghost bg-slate-200 hover:bg-slate-200  text-green-600  text-sm md:text-xl">Filtros</a>
                                <input
                                    onChange={(e) => ActivateFilter(e.target.checked)}
                                    type="checkbox"
                                    checked={filterNow}
                                    className="checkbox mt-2 border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
                                />
                                <CalendarContainer bills={bills} canFilterNow={filterNow} />
                            </div>
                            {/* mostrar todo */}
                            <div className="flex-3 ml-1 mr-2 justify-end">
                                <span className=" text-green-600  text-sm md:text-xl text-bold mr-4">Mostrar todo</span>
                                <input
                                    type="checkbox"
                                    onChange={(e) => set_showAll(e.target.checked)}
                                    checked={showAll}
                                    className="checkbox border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
                                />
                            </div>
                        </div>
                        {/* conentedo de las facturas */}
                        <div id="BillCardContainers" className="flex mt-3 flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 p-4">

                            {filterNow ?
                                // user.filteredBills.length > 0 ?
                                //     (
                                //         user.filteredBills.map((bill, index) => {
                                //             return <BillCard key={index + "BillCard_shop"} factura={bill} />
                                //         })
                                //         // si hay facturas filtradas enmtonces las muestra si no muestra un error
                                //     ) :
                                billsFilteredLocal.length > 0 ?
                                    (
                                        billsFilteredLocal.map((bill, index) => {
                                            return <BillCard key={index + "BillCard_shop"} factura={bill} />
                                        })
                                        // si hay facturas filtradas enmtonces las muestra si no muestra un error
                                    ) :
                                    (
                                        filterNow && (
                                            <div role="alert" className="alert col-span-2 md:col-span-2  mx-auto mt-10 mb-10  w-full alert-error">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-2xl text-white">
                                                    No se ha encontrado  tu factura
                                                </span>
                                            </div>
                                        )
                                    ) : (
                                    <div role="alert" className="alert  hidden col-span-2 md:col-span-2  mx-auto mt-10 mb-10  w-full alert-error">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-2xl text-white">
                                            Busca tu factura
                                        </span>
                                    </div>
                                )
                            }

                            {/* si el boton de filtrar no esta encendido muestra todas las facturas */}
                            {
                                !filterNow && !showAll

                                    ? bills.slice(0,
                                        bills.length >= 10
                                            ? 10
                                            : bills.length
                                    ).map((bill, index) => {
                                        return <BillCard key={index + "BillCard_shop"} factura={bill} />
                                    })

                                    // : bills.map((bill, index) => {
                                    //     return <BillCard key={index + "BillCard_shop"} factura={bill} />
                                    // })
                                    : showAll ?
                                        bills.map((bill, index) => {
                                            return <BillCard key={index + "BillCard_shop"} factura={bill} />
                                        }) :
                                        <div role="alert" className="alert col-span-2 md:col-span-2  mx-auto mt-10 mb-10  w-full alert-error">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-2xl text-white">
                                                No se ha encontrado  tu factura 2
                                            </span>
                                        </div>


                            }

                        </div>

                        {/* aca esta el contenedor de los comprobantes */}
                    </div>
                </div>
            </dialog>
        </>
    )
}

const BillCounter = ({ counter }) => {
    return (
        <span
            className="font-bold p-1 text-white hover:scale-105 hover:transform hover:duration-300 rounded-lg bg-green-400  hover:bg-green-600 duration-300 transition-colors  hover:text-orange  ease-in-out mr-4 text-center  w-6">
            {counter}
        </span>

    )
}


export default BillModal;