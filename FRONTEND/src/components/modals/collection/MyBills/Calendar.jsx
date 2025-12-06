import { useState, useEffect } from "react"
import { useSelector ,useDispatch} from "react-redux"
import { setFilteredBills } from "@slices/Auth/UserSlice"
import { ErrorAlert } from "@components/Alerts"
export const CalendarContainer = ({canFilterNow}) => {

    return (
        <>
            <div
                className="mr-20 focus:bg-slate-400 bg-slate-200  ml-0 aling-start hover:scale-125 transform duration-300 ease-in-out"
            >
                <CalendarButton />
                <div
                    popover="true"
                    id="cally-popover1"
                    className="dropdown bg-black rounded-box shadow-lg"
                    style={{ positionAnchor: "--cally1" }}
                >
                    <CalendarBody canFilterNow={canFilterNow} />
                </div>
            </div>

        </>
    )
}
export const CalendarButton = () => {
    return (
        <>
            <button
                popovertarget="cally-popover1"
                className="input ml-1 bg-slate-200 hover:bg-gray-300 rounded-lg"
                id="cally1"
                style={{ anchorName: "--cally1" }}
            >
                <svg
                    width="25px"
                    height="25px"
                    className="mx-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#39A900"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                            stroke="#23e126"
                            strokeWidth="2"
                            strokeLinecap="round"
                        ></path>
                    </g>
                </svg>
            </button>

        </>
    )
}

export const CalendarBody = ({canFilterNow}) => {
    const bills_global =  useSelector(state => state.user.globalData.billS)
    const [filteredBills, setFilteredBills_local] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setFilteredBills(filteredBills))
        console.log("guardando facturas filtradas")
    }, [filteredBills])

    const  filterNow = (value) => {
        canFilterNow 
            ? filterByDate(value,bills_global,setFilteredBills_local)
            : console.log("no puedo filtrar")
            
        
    }
    return (
        // onChange={(e)=>onSearch(e.target.value,bills)}
        <>
            <calendar-date className="cally"
                // onchange={(e) =>filterByDate(e.target.value,bills_global,setFilteredBills_local)}>
                onchange={(e) => filterNow(e.target.value)}>

                <svg fill="#000000" width="15px" height="15px" className="size-4"
                    slot="previous" aria-label="Previous" viewBox="-8.5 0 32 32"
                    version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                        strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <title>left</title>
                        <path
                            d="M7.094 15.938l7.688 7.688-3.719 3.563-11.063-11.063 11.313-11.344 3.531 3.5z">
                        </path>
                    </g>
                </svg>
                {/* <!-- el de la derecha --> */}
                <svg fill="#000000" className="size-4" width="15px" height="15px"
                    aria-label="Next" slot="next" viewBox="-8.5 0 32 32"
                    version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                        strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <title>right</title>
                        <path
                            d="M7.75 16.063l-7.688-7.688 3.719-3.594 11.063 11.094-11.344 11.313-3.5-3.469z">
                        </path>
                    </g>
                </svg>

                <calendar-month></calendar-month>
            </calendar-date>
        </>
    )
}

// us effect de la renderizacion de los bill ya filtrados
/**
 * busca facturas por fecha
 * @param {*} targetDate la fecha pbtenida apartir del calendario
 * @param {*} bills todas las facturas de la cual filtrar
 * @param {*} setFilter la funcion que modifica el state de las facturas filtradas
 */
const filterByDate = (targetDate,bills,setFilter) => {

    if (bills.length == 0) {
        ErrorAlert("No hay facturas que filtrar")
        return null
    }
    const data = bills.filter(bill => bill.fechaBusqueda == targetDate)
    
    setFilter(data)

}