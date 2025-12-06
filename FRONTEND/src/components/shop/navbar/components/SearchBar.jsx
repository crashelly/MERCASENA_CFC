import { useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux";
import { MinimalLoader } from "@components/Loaders";
import { CONFIG } from "@config/app"
import { addAllProducts } from "@slices/Shop/productsSlice";
export const SearchBar = () => {
    const [isUserWriting, setIsUserWriting] = useState(false);
    // const [isUserWriting, setIsUserWriting] = useState(false);
    const [searchText, setSearchText] = useState('')
    const [produts, setProducts] = useState([])
    const [abierto, setAbierto] = useState(false);

    const productsGlobalState = useSelector(state => state.products.cachedProducts)


    const dispatch = useDispatch()

    useEffect(() => {
        !abierto 
            ? document.getElementById('btnOpenPopover').click()
            : console.log("no lo pude cerrar")
         
    },[abierto])
    useEffect(() => {
        if (searchText == '') {
            setIsUserWriting(false)
            return
        }

        // cuando el usuario escribe activa el loader 
        setIsUserWriting(true)

        // Si el usuario deja de escribir por 800ms, ocultamos el loader
        const timer = setTimeout(() => {
            setIsUserWriting(false);
        }, 800);

        // Limpiamos el timer si el usuario sigue escribiendo
        return () => clearTimeout(timer);
    }, [searchText])

    // consulta para sacar los productos
    useEffect(() => {
        fetch(CONFIG.API.URL.endpoints.products.getAll())
            .then(res => res.json())
            .then(res => {
                dispatch(addAllProducts(res))
                dispatch(addProducts(res))
                // setProducts(res)
                setLoading(false)
            })
    }, [])



    // detecta que se toca afuera y se cierra ese buscador
    // const popoverRef = useRef(null);

    // useEffect(() => {
    //     function manejarClickFuera(e) {
    //         if (popoverRef.current && !popoverRef.current.contains(e.target)) {
    //             setAbierto(false); // cierra si haces clic fuera
    //         }
    //     }

    //     // Detecta clics en todo el documento
    //     document.addEventListener("mousedown", manejarClickFuera);
    //     return () => {
    //         document.removeEventListener("mousedown", manejarClickFuera);
    //     };
    // }, []);
    const handleInputClick = (event) => {
        document.getElementById('btnOpenPopover').click();
        setAbierto(true)
        let contenedor = document.getElementById('productsResult')
        if (!contenedor.contains(event.target)) {
            setAbierto(false)
        }
        // searchText.length == 0

        //     ? document.getElementById('btnOpenPopover').click()
        //     : null;
    }



    return (
        <>
            {/* <!-- Search - Ocultar en móviles --> */}
            <div className="order-2 mr-34 md:order-3 hidden md:block w-full md:w-auto mt-0 md:mt-1">
                <div className="w-full max-w-sm min-w-[200px]">
                    <div className="relative mt-1">
                        {/* setSearchText(e.target.value) */}
                        <input id="productSearchBar"
                            onChange={(e) => console.log(e.target.value)}
                            // onClick={ ()=>handleInputClick()}
                            //  document.getElementById('btnOpenPopover').click()
                            onClick={ ()=>handleInputClick()}
                            className="w-90 color-sena  hover:boder-4   placeholder:text-white text-white text-sm border border-slate-200 rounded-full pl-4 pr-10 py-3 px-40transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Busca tus productos..." />

                        <div>
                            <button
                                className=" hover:animate-wiggle hover:animate-ease-in-out absolute align-self-end align-end mx-0 ml-30 top-1 left-30 flex items-end rounded-full bg-slate-800 py-1 mt-1 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                {
                                    isUserWriting ?
                                        (
                                            <MinimalLoader w={24} h={25} />
                                        ) : (

                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFFFF" className="w-4 h-4 mr-2">
                                                    <path fillRule="evenodd"
                                                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                                        clipRule="evenodd" />
                                                </svg>
                                                Buscar
                                            </>
                                        )
                                }
                            </button>
                            {/* parte de los resultados de la busqueda */}
                            <button className="btn mt-2 h-1 w-1 hidden" id="btnOpenPopover" popoverTarget="productsResult"

                            >

                            </button>
                            <div className="dropdown bg-white    w-full h-full rounded-box  shadow-sm" popover={"true"} id="productsResult">
                                <div className=" px-1 grid grid-cols-4 gap-4  bg-slate-100 " id="resultsforProducxts">

                                </div>
                                <div className=" px-1  " id="errorBannerContainer">

                                </div>

                            </div>
                            {abierto && (
                                <></>
                            )}


                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}