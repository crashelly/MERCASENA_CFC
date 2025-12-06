import { Navbar } from "@components/shop/navbar"
import FloatingButtons from '@components/shop/FloatingButtons/whatsapp'
import { ComercialBanner, ProductCategories, Products } from "@features/shop/products/"
import { setUserInfo, setLoggedUser } from "@slices/auth/userSlice"
import { useEffect, useState } from "react"
import { Loader } from "@components/Loaders/shop/shopLoader"
import { InfoModal, MyAccountModal, UserOrdersModal, BillModal, ShoppingCartModal, PreOrderModal, PostOrderModal } from "@components/modals"
import { setShowMyAccount, setShowMyOrders, setShowMyBills, setShowLogout, setShowShoppingCart } from "@slices/shop/appSlice"
import { useDispatch, useSelector } from "react-redux"
import Footer from "@components/footer"
import { ShopLoader } from "@components/Loaders/shop/shopLoader"
import "./shop.css"
import { CONFIG } from "@config/app"


const Home = () => {
    // setea la informacion 
    const setter = async()=>await  setGlobalUserInfo();
    setter();
    const showMyAccountGlobal = useSelector((state) => state.app.modals.showMyAccount)
    const showMyOrdersGlobal = useSelector((state) => state.app.modals.showMyOrders)
    const showMyBillsGlobal = useSelector((state) => state.app.modals.showMyBills)
    const showLogoutGlobal = useSelector((state) => state.app.modals.showLogout)
    const showMyShoppingCartGlobal = useSelector((state) => state.app.modals.showShoppingCart)

    const [showMyAccount, setShowMyAccount_local] = useState(false)
    const [showMyOrders, setShowMyOrders_local] = useState(false)
    const [showMyBills, setShowMyBills_local] = useState(false)
    const [showLogout, setShowLogout_local] = useState(false)
    const [showMyShoppingCart, setShowCart] = useState(false)

    console.log(`Estado global de showMyAccount: ${showMyAccountGlobal}`)
    console.log(`Estado global de showMyOrders: ${showMyOrdersGlobal}`)
    console.log(`Estado global de showMyBills: ${showMyBillsGlobal}`)
    console.log(`Estado global de showLogout: ${showLogoutGlobal}`)
    const dispatch = useDispatch();
    useEffect(() => {
        setShowMyAccount_local(showMyAccountGlobal)
        console.log("cambioando estado alvg")
    }, [showMyAccountGlobal])

    useEffect(() => {
        setShowMyOrders_local(showMyOrdersGlobal)
    }, [showMyOrdersGlobal])

    useEffect(() => {
        setShowMyBills_local(showMyBillsGlobal)
    }, [showMyBillsGlobal])
    
    useEffect(() => {
        setShowLogout_local(showLogoutGlobal)
    }, [showLogoutGlobal])

    useEffect(() => {
        setShowCart(showMyShoppingCartGlobal)
    }, [showMyShoppingCartGlobal])

    // setea la informacion del cliente
    return (
        <div className="mainContent">
            <Navbar />


            {/* Contenido de la aplicacion  banner, categorias  y productos*/}
            <ComercialBanner />
            {/* <Spline
        scene="https://prod.spline.design/vkrLkXhonY39l8kR/scene.splinecode" 
        /> */}

            <ShopLoader />

           
            {/* categorias de los productos */}
            <ProductCategories />

            <Products />
            <Footer />
            {/* todos los productos por cartas  */}
            {/* <Body/> */}
            {/* seccion de todo los modales */}
            <InfoModal />
            {/*  MODALES DEL MENU DE OPCIONES */}
            {
                showMyAccount && (
                    <MyAccountModal onCloseModal={() => dispatch(setShowMyAccount(false))} />
                )
            }
            {/* para los pedidos */}
            {
                showMyOrders && (
                    <UserOrdersModal onCloseModal={() => dispatch(setShowMyOrders(false))} />
                )
            }
            {/* para las facturas */}
            {/* <BillModal /> */}
            {
                showMyBills && (
                    <BillModal onCloseModal={() => dispatch(setShowMyBills(false))} />
                )
            }
            {/* <UserOrdersModal /> */}
            {
                showMyShoppingCart && (
                    <ShoppingCartModal onCloseModal={() => dispatch(setShowShoppingCart(false))} />
                )
            }
            {/* <ShoppingCartModal /> */}


            {/* }botones flotantes  whatsapp etc*/}
            <FloatingButtons />

            {/* modales varios de varias funcionalidades , confirmacion y cargador o loader */}
            <PreOrderModal />
            <PostOrderModal />

            {/* carg el loader */}
            
        </div>
    )
}

const setGlobalUserInfo = async (user) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    console.log()
    useEffect(() => {
         try {
            fetch(CONFIG.API.URL.endpoints.user.getInfo(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Mercasena-Token': window.localStorage.getItem("sessionToken")
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .then((data) => {
                    console.log(`data: ${JSON.stringify(data)}`)
                    // seteamos la informacion
                    setName(data[0].nombre)
                })
        } catch (error) {
            console.log(error)
        }
    },[])

    const data = {
        isLoggedIn: true,
        token: window.localStorage.getItem("token"),
        name: name ?? window.localStorage.getItem("userName") ?? "nombre no Encontrado",
        sessionToken: window.localStorage.getItem("sessionToken"),
        email: window.localStorage.getItem("email")
    }
    dispatch(setLoggedUser());
    dispatch(setUserInfo(data));

}
export default Home