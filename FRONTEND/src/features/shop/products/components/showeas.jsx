import { useState, useEffect } from "react"
import { CONFIG } from "@config/app"
import { addProductsToCache, addAllProducts, setMeasurements } from "@slices/Shop/productsSlice";
import { useSelector, useDispatch } from "react-redux";
const Products = () => {
    const productsGlobalState = useSelector(state => state.products.cachedProducts)
    const measurements = useSelector(state => state.products.measurements)
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true)

    console.log(products)
    // consultando a la API
    useEffect(() => {
        fetch(CONFIG.API.URL.endpoints.products.getAll())
            .then(res => res.json())
            .then(res => {
                // dispatch(addAllProducts(res))
                dispatch(addProductsToCache(res))
                // setProducts(res)
                setLoading(false)
            })
    }, [])


    // consulta para sacar las medidas de los productos
    useEffect(() => {
        fetch(CONFIG.API.URL.endpoints.measurements.get())
            .then(res => res.json())
            .then(res => {
                // console.log(`medidas encontradas ${res}`)
                dispatch(setMeasurements(res))
            })
    }, [])
    // use efect que sincroniza con el estado global para que se vuelva a renderizar
    useEffect(() => {
        setProducts(productsGlobalState)
    }, [productsGlobalState])



    // verificacion de si hay o no datos
    if (isLoading || products.length == 0) {
        return (
            <div className="w-full h-80">

                <div className=" align-middle mx-auto mt-10 w-20 h-20 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
        )

    }
    return (
        <>
            <section className="bg-transparent py-12">
                <div className="container mx-auto px-4">
                    {/* <!-- grid  de productos--> */}
                    <div id="products-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                        {
                            products.map((product, index) => (
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
                                // <div className="relative group cursor-pointer overflow-hidden duration-500 w-64 h-80 bg-zinc-800 text-gray-50 p-5">
                                //     <div className>
                                //         <div className="group-hover:scale-110 w-full h-60 bg-blue-400 duration-500" />
                                //         <div className="absolute w-56 left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12">
                                //             <div className="absolute -z-10 left-0 w-64 h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900" />
                                //             <span className="text-xl font-bold">Hover me!</span>
                                //             <p className="group-hover:opacity-100 w-56 duration-500 opacity-0">
                                //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                //             </p>
                                //         </div>
                                //     </div>
                                // </div>
                            ))
                            // products.map((product) => {
                            //     console.log(product.nombre)
                            // })
                        }
                    </div>
                </div>
            </section >
        </>
    )
}

const ProductCard = ({
    imageUrl,
    id,
    price,
    name,
    subCategory,
    state,
    stateID,
    quantity,
    stock,
    singularMeasurement,
    pluralMeasurement
}) => {
    const [showInfo, setShowInfo] = useState(false)
    console.log("renderizando " + name);
    // condfiguracion de los estaods de los proiductos
    let productState = '';
    if (stateID == 6) {
        productState = <div className="badge badge-warning text-white hover:text-red-400">{state} </div>;
    } else if (stateID == 5) {
        productState = <div className="badge badge-error text-white hover:text-yellow-800 hover:animate-bounce hover:animate-duration-[1400ms] hover:animate-ease-out">{state} </div>;
    }

    return (
        <>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-110  transform  duration-300 flex flex-col w-full max-w-xs">
                {/* <!-- Product Image Container --> */}

                <div className="relative group cursor-pointer overflow-hidden duration-500 w-64 h-80 bg-zinc-800 text-gray-50 p-5">
                    <div className>

                        <div className="group-hover:scale-110 w-full h-60 bg-white duration-500" >
                            <img id={`img${id}`}
                                className={
                                    stateID == 5
                                        ? "w-full h-full z-10   mask-b-from-30% mask-b-to-95% object-contain p-2 opacity-50 hover:animate-pulse hover:animate-duration-[1400ms] hover:animate-ease-linear"
                                        : "w-full h-full z-10   object-contain p-2"
                                } src={imageUrl} alt={name} />
                        </div>
                        <div className="absolute w-56 left-0 p-5 -bottom-60 duration-500 group-hover:-translate-y-6">
                            {/* <div className="absolute -z-10 left-0 w-full h-28 opacity-0 duration-500 group-hover:opacity-90 group-hover:bg-blue-900" /> */}
                            {/* <span className="text-xl font-bold">Hover me!</span> */}
                            <p className="group-hover:opacity-100 w-auto duration-500 opacity-30">
                                pura desde el origen. Proviene de vacas criadas en pastos frescos, sin aditivos, químicos ni conservantes. Conserva su sabor auténtico y nutrientes naturales. Fresca, nutritiva y sostenible, llega del campo directo a tu mesa. Redescubre la leche real: natural, honesta y llena de vida.

                            </p>
                        </div>
                    </div>
                </div>

                {/* <!-- Product Info --> */}
                <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                        {/* <!-- Price -->  ${web.addPuntuaction(producto.precio)}   */}
                        <span className="text-lg font-bold text-red-500">$ {price} </span>
                    </div>
                    {/* <!-- Red horizontal line --> */}
                    <div className="border-t border-red-500 my-2"></div>

                    {/* <!-- Product Name --> !acuerde de poner la medida singular de cada producto pendejo searchSingularMeasurement(producto.medidaVenta) */}
                    <h3 className="text-lg font-medium mt-1 text-gray-800">{name} {subCategory} x {quantity} {singularMeasurement}</h3>

                    {/* <!-- Unit --> */}
                    <p className="text-gray-500 text-sm" id="unit${producto.id}" > quedan {stock} {pluralMeasurement} </p>


                    {/* renderizado condicional del estado del producto */}
                    {/* <!--product state --> */}
                    <div id="productStateContainer">
                        {productState}
                    </div>

                    {/*  FIN DEL RENDERIZADO  */}
                </div>

                {/* <!-- Action Buttons --> */}
                <div className="  mx-auto pb-4 w-8/10 flex ">
                    <button id="botonSD" onClick={() => console.log("user.requestLogin();")} value="(${producto.id})"
                        className={
                            stateID == 5
                                ? " flex-1   bg-gray-600 hover:bg-gray-700  text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                : " flex-1 hover:scale-105  transition-colors  hover:bg-green-900 color-sena  text-white font-medium py-2 px-4 rounded-lg  flex items-center justify-center gap-2"
                        }>
                        Agregar
                        <div width="40px">
                            <svg className="hover:animate-fade-right hover:animate-ease-in hover:animate-alternate   bg-green-500 rounded-lg hover:animate-slide-right-reset" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
                                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                            </svg>
                        </div>

                    </button>
                </div>
            </div >
        </>

    )
}

/**
 * funcion pawra añadir la puntuacion de los precios 
 * 
 */
const addPuntuaction = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
/**
 * buscan la medida singular dentro de todas las medidas posilbes
 * @param {*} measurements  arreglo con las medidas en plural y singular
 * @param {*} measurementName nombre de medida plural en la cual se buscara la singular
 * @returns 
 */
const searchSingularMeasurement = (measurements, measurementName) => {

    // const measurements = useSelector(state => state.products.measurements);
    let measurement = measurements.filter(object => object.plural.toLowerCase() == measurementName.toLowerCase());

    // console.log(measurement+'tamaño de el buffer d emedidas'+this.measurementsData.length); 
    //   console.error(`${measurement}`);
    if (measurement.length > 0) {
        console.log("encontrado " + measurement[0].singular);
        return measurement[0].singular;
    } else {
        // console.log("No se encontró coincidencia");
        return null;
    }
}



export default Products