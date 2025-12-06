/**
 * componete para las categorias de los productos
 */

import { useEffect, useState } from "react";
import { addCategories,setProductsToCache } from "@slices/Shop/productsSlice";
import { CONFIG } from "@config/app"
import { useSelector, useDispatch } from "react-redux";
const ProductCategories = () => {
    // const [categories, setCategories] = useState([]);
    // estado global 
    const categories = useSelector(state => state.products.categories)
    const dispatch = useDispatch()
    // console.log(categories);
    useEffect(() => {
        fetch(CONFIG.API.URL.endpoints.categories.get())
            .then(res => res.json())
            .then(res => {
                dispatch(addCategories(res))
            })
        // setCategories(res)
    }, [])



    return (
        <>
            <div id="carousele-categories"
                className=" overflow-y-hidden   top-0 color-sena mt-3 p-3 rounded-lg overflow-x-auto flex flex-nowrap md:justify-center justify-start ml-0 mr-2 h-12 w-full bg-green-500 border-box scrollbar-thin scrollbar-thumb-green-700    ">
                {/* <!-- <div id="carousele-categories" className="carousel h-7  carousel-horizontal items-align-center   mx-auto w-full rounded-box"> --> */}
                <Category name={"Todos"} key={"000_cat_todos"} id={0} dispatcher={dispatch} />
                {

                    categories.map((category, index) => {
                        return (
                            <Category key={"0001_cat" + index} name={category.nombre}  id={category.id}   dispatcher={dispatch} />
                        )
                    })
                }

            </div>
        </>
    )
}

const Category = ({ name,id,dispatcher}) => {
    
    const searchProductsByCategory = async (categoryID) => {
        // verificando si la categoria es todos pra asi cambiar el endpoint
        let APIEndpoint = ""
        let targetProducts = CONFIG.API.URL.endpoints.products

        categoryID == 0
            ? APIEndpoint = targetProducts.getAll()
            : APIEndpoint = targetProducts.fetchByCategory(categoryID)

            
        console.log("consultando productos por categoria con id => "+categoryID)
        let res = await fetch(APIEndpoint)
        let data = await res.json()

        // aca setea los productos del estado global
        dispatcher(setProductsToCache(data))
    }
    return (
        <>
            <div className="carousel-item mr-4 ml-4 ">
                {/* onclikc => web.fetchProductsByCategory(${categoria.id},false)  */}
                <button onClick={() => searchProductsByCategory(id)} className=" hover:scale-105 hover:cursor-grab  bg-white text-green-600 font-bold px-3 py-1 text-sm rounded-full shadow-md border border-green-400 hover:bg-green-100 badge badge-success"> {name}</button>
            </div>
        </>
    )
}
export default ProductCategories;