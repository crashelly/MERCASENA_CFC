
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { MinimalLoader } from "@components/Loaders";
import { addAllProducts } from "@slices/Shop/productsSlice"
import { CONFIG } from "@config/app"
import logo from "@assets/logos/logoSena_21.png"
import { ProductCard, addPuntuaction, searchSingularMeasurement } from "@features/shop/products/components/Products";
export const MobileSearchModal = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const AllProducts = useSelector(state => state.products.allProducts)
    const measurements = useSelector(state => state.products.measurements)
    useEffect(() => {
        setProducts(AllProducts)
    }, [AllProducts])
    const dispatch = useDispatch()

    const search = (value) => {


        const filteredProducts = AllProducts.filter(product =>
            product.nombre.toLowerCase().includes(value.toLowerCase()) ||
            product.subCategoria.toLowerCase().includes(value.toLowerCase())
        )
        setProducts(filteredProducts)
        console.log(filteredProducts);
        // console.log(AllProducts);
    }
    useEffect(() => {
        fetch(CONFIG.API.URL.endpoints.products.getAll())
            .then(res => res.json())
            .then(res => {
                dispatch(addAllProducts(res))
                // dispatch(addProducts(res))
                // setProducts(res)
                setLoading(false)
            })
    }, [])


    return (
        <>
            <dialog id="ProductsModalForMobile" className="modal ">
                <div className="modal-box md:w-11/12 md:max-w-5xl modal-bottom sm:modal-middle bg-white ">
                    <form method="dialog">
                        <button
                            className="btn btn-sm bg-white-400 ml-2  focus:bg-red-600 text-black  hover:text-white  btn-circle btn-ghost absolute right-3 top-8 lg:top-2  hover:bg-red-400">
                            ✕</button>
                    </form>
                    <div>
                        {/* <!-- menu de filtros --> */}
                        <div className="bg-slate-100 md:mt-5 mt-10 navbar rounded-lg   shadow-sm">
                            {/* <!-- primera parte --> */}
                            <div className="flex-none">

                            </div>
                            {/* <!-- segunda parte --> */}
                            <div className="flex-1">
                                {/* <!-- filtros --> */}

                                <a className="btn btn-ghost text-md mr-3  justify-start color-sena-texto">Busqueda de productos</a>
                            </div>
                            <div className="flex-2 ">
                                <form className="flex flex-inline" id="searchBillByUser_form">

                                    <input
                                        onChange={(e) => search(e.target.value)}
                                        id="productSearchBarForMobile" type="text" placeholder="quiero..."
                                        className="input md:ml-30 input-bordered border-green-400  bg-slate-400 w-24 md:w-full" />
                                    <button className="btn md:mr-20 btn-sm bg-white-400   btn-circle btn-ghost hover:bg-green-400">
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                                    stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </g>
                                        </svg>
                                    </button>

                                </form>
                            </div>
                            {/* <!-- tercera parte para ver  --> */}
                            <div className="flex-none">

                                {/* <!-- boton de buscar pedidos --> */}
                                {/* <!-- icono de la persona --> */}
                                <div className="dropdown dropdown-end ml-1  mr-1">
                                    <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={logo} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* <!-- <div id="BillCardContainers" className="grid ml-8 grid-cols-1 p-2 lg:grid-cols-2"> --> */}
                        {/* <!-- CARD de informacion del comprobante de venta --> */}

                        {/* <!-- <div id="mobile_searchedProducts" className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 p-4"> --> */}
                        <div id="mobile_searchedProducts"
                            className="grid mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                            {/* <!-- renderizacion de  los produto encontrados */}
                            {
                                products.length != 0 ? (
                                    products.map((product) => {
                                        return (
                                            <ProductCard
                                                key={"prod" + product.id + "Card"}
                                                id={product.id ?? 0}
                                                subCategory={product.subCategoria ?? "Sin categoria"}
                                                price={addPuntuaction(product.precio) ?? 0}
                                                name={product.nombre ?? "Sin nombre"}
                                                quantity={product.cantidad ?? 0}
                                                stock={product.existencias ?? 0}
                                                state={product.estado ?? "Sin stock"}
                                                stateID={product.estadoID ?? 1}
                                                imageUrl={product.rutaImagen ?? ""}
                                                singularMeasurement={searchSingularMeasurement(measurements, product.medidaVenta) ?? product.medidaVenta}
                                                pluralMeasurement={product.medidaVenta ?? "error no encontrado"}

                                            />
                                        )
                                    })
                                ) : (
                                    <div colSpan="4" role="alert" className="alert  mx-auto mt-10 mb-10  w-full alert-error">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-2xl text-white">
                                            No se encontraron productos
                                        </span>
                                    </div>
                                )

                            }
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export const MobileSearchModalButton = () => {
    return (
        <a onClick={() => { document.getElementById('ProductsModalForMobile').showModal() }} className="block ml-1 bg-white md:block">
            <label className="input">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#39a900">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                            stroke="#" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </g>
                </svg>

            </label>

        </a>
    )
}
/**
 * busca el producto en el buffer o en el estado de los productos
 * @param {*}  
 * @returns 
 */

const searchProductsInSearchedBuffer = async (products, targetProduct) => {

    console.log("BUSCANDO PRODUCTOS  EN EL BUFFER...");
    // let newData = json.find(pedido =>pedido.Usuario == nombre);
    // busca los nombres que coincidan en los datos
    console.log("buscando ... apartir de lo siguiente escrito > " + UserInputName);
    // let newData = 'no se';
    let newData = web.productsForSearch.filter(producto => producto.nombre.toLowerCase().includes(UserInputName.toLowerCase()) || producto.subCategoria.toLowerCase().includes(UserInputName.toLowerCase()));
    // console.log("encontre=>"+JSON.parse(newData));
    console.log("tamaño del buffer=>" + web.productsForSearch.length);
    console.log("encontre=>" + JSON.stringify(newData));
    // ternaria que verifica si el array esta vacio o no

    // console.log(`retornando =>> ${JSON.parse(newData)}`)
    if (newData.length != 0) {
        return newData;
    } else {
        throw new Error("Lo sentimos  😥 producto no encontrado");
        return null;
    }
}