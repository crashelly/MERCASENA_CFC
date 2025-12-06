import { useState, useEffect } from "react"
import { CONFIG } from "@config/app"
import { useSelector, useDispatch } from "react-redux";
import { useInfoModal } from "@features/shop/products/hooks/useInfoModal";
import { ShoppingCartMensagge } from "@components/Alerts";
import { addProductToShoppingCart } from "@slices/Auth/UserSlice"
import {
    addProductsToCache,
    addAllProducts,
    setMeasurements,
} from "@slices/Shop/productsSlice";


const Products = () => {
    const productsGlobalState = useSelector(state => state.products.cachedProducts)
    const measurements = useSelector(state => state.products.measurements)
    const user = useSelector(state => state.user.globalData)

    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true)

    // consultando a la API
    useEffect(() => {
        fetch(CONFIG.API.URL.endpoints.products.getAll())
            .then(res => res.json())
            .then(res => {
                dispatch(addAllProducts(res))
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
                                    user={user}
                                    getAllProducts={() => productsGlobalState}
                                />

                            ))

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
    pluralMeasurement,
    user,
    getAllProducts
}) => {
    let productState = '';
    const dispatch = useDispatch();
    // const products = useSelector(state => state.products.AllProducts)
    const handleAddProductToShoppingCart = (id) => {

        if (user.isLoggedIn) {
            let notification = {}
            // console.log(product)
            // agrega el producto
            if (!isTheProductInTheCollection({ id: id })) {
                console.log("no esta  , guardare el producto")
                console.log(user.shoppingCart)
                let product = extractProductFromCollection({ id: id })

                if (product.estadoID == 5) {

                    notification.action = 'rejected'
                    notification.mensagge = "no hay existencias de este producto por el momento"
                } else {
                    // se crea un arrelgo en el cual si se pueden cambiar los datos
                    let copyOfProduct = structuredClone(product)
                    // seteamos la cantidad en 1 por si las moscas

                    copyOfProduct.cantidad = 1
                    // precio inicial
                    copyOfProduct.precioTotal = copyOfProduct.precio

                    dispatch(addProductToShoppingCart(copyOfProduct))
                    notification.action = 'added'
                    notification.mensagge = "se agrego el producto al carrito de compras"
                }


            } else {
                console.log("si esta dentro")
                notification.action = 'rejected'
                notification.mensagge = "el producto ya se encuentra en el carrito de compras"

            }

            ShoppingCartMensagge(notification)
        } else {
            useInfoModal("Debe iniciar sesion para agregar productos al carrito de compras")
        }
    }

    /**
         * Extrae un producto de la coleccion de elementos previamente almacenada
         * @param {Object} product The product to search for.
         * @returns {Object|null} The founded product or null if not found.
         */
    const extractProductFromCollection = (product) => {
        let products = getAllProducts()
        let foundedProduct = products.find(item => item.id == product.id)
        if (foundedProduct) {
            return foundedProduct
        }
        return null
    }

    const isTheProductInTheCollection = (product) => {
        // // return user.globalData.shoppingCart.some(item => item.id == product.id) ? true : false;
        // let foundedProduct = user.shoppingCart.find()
        return user.shoppingCart.products.some(item => item.id == product.id) ? true : false;
    }





    // condfiguracion de los estaods de los proiductos
    if (stateID == 6) {
        productState = <div className="badge mt-4 badge-warning animate-bounce animate-infinite animate-duration-[1300ms] animate-ease-in animate-alternate text-white hover:text-red-400">{state} </div>;
    } else if (stateID == 5) {
        productState = <div className="badge badge-error text-white hover:text-yellow-800 hover:animate-bounce hover:animate-duration-[1400ms] hover:animate-ease-out">{state} </div>;
    }

    return (
        <>

            <div className="bg-slate-100  shadow-lg  rounded-2xl  overflow-visible hover:scale-110  transform  duration-300 flex flex-col w-full max-w-xs  ">
                {/* <!-- Product Image Container --> */}
                <div className="relative w-full h-48 bg-gray-100 rounded-t-2xl overflow-hidden">
                    {/* <!-- Gray rounded square --> */}
                    <div className="absolute inset-0 m-4 bg-gray-200 rounded-lg flex items-center justify-center">
                        {/* <!-- Product Image (centered within the gray square) --> */}

                        <img id={`img${id}`}
                            className={
                                stateID == 5
                                    ? "w-full h-full z-10   mask-b-from-30% mask-b-to-95% object-contain p-2 opacity-50 hover:animate-pulse hover:animate-duration-[1400ms] hover:animate-ease-linear"
                                    : "w-full h-full z-10   object-contain p-2"
                            } src={imageUrl} alt={name} />

                    </div>


                </div>

                {/* <!-- Product Info --> */}
                <div className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                        {/* <!-- Price -->  ${web.addPuntuaction(producto.precio)}   */}
                        <span className="text-lg font-bold text-red-500">$ {price} </span>
                        <button className="btn btn-success w-20 h-7 text-md text-white hover:btn-primary hover:duration-300 whitespace-nowrap inline-flex rounded-lg ">Más Info</button>
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
                    <button id="botonSD" onClick={() => handleAddProductToShoppingCart(id)} value="(${producto.id})"
                        className={
                            stateID == 5
                                ? " flex-1  cursor-not-allowed bg-gray-600 hover:bg-gray-700  text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                : " flex-1  hover:scale-105  transition-colors  hover:bg-green-900 color-sena  text-white font-medium py-2 px-4 rounded-lg  flex items-center justify-center gap-2"
                        }>
                        Agregar
                        <div width="40px">
                            <svg className="rounded-lg hover:animate-slide-right-reset" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
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


    let measurement = measurements.filter(object => object.plural.toLowerCase() == measurementName.toLowerCase());
    if (measurement.length > 0) {
        return measurement[0].singular;
    } else {
        return null;
    }
}

const showMeasurementAsync = async ({ measurement, collection }) => {
    return new Promise((resolve, reject) => {
        console.log("rastreando _>" + measurement)
        let response = measurements.filter(object => object.plural.toLowerCase() == measurement.toLowerCase());
        if (response.length > 0) {

            // console.log(response[0]);
            resolve(response[0]);

        } else {
            reject({ plural: "No encontrado", singular: "No encontrado" });
        }
    });
}

const searchMeasurement = (measurement, collection) => {

    console.log("rastreando _>" + measurement)
    let response = collection.filter(object => object.plural.toLowerCase() == measurement.toLowerCase());
    if (response.length > 0) {

        // console.log(response[0]);
        return response[0];

    } else {
       return [{ plural: "No encontrado", singular: "No encontrado" }];
    }

}

export {
    ProductCard,
    addPuntuaction,
    searchSingularMeasurement,
    showMeasurementAsync,
    searchMeasurement
}
export default Products