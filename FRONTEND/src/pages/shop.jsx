import { Navbar } from "@components/shop/navbar"
import { ComercialBanner, ProductCategories, Products } from "@features/shop/products/"
import Footer from "@components/Footer"
import "./shop.css"
// import { LoginModal, RegisterModal } from '@components/modals'
import  FloatingButtons from '@components/shop/FloatingButtons/whatsapp'
import { InfoModal } from "@components/modals"

// import { Routes, Route, Link } from "react-router-dom"
// import Spline from '@splinetool/react-spline';


const Shop = () => {

  return (
    <div className="mainContent">
      <Navbar />


      {/* Contenido de la aplicacion  banner, categorias  y productos*/}
      <ComercialBanner />
      {/* <Spline
        scene="https://prod.spline.design/vkrLkXhonY39l8kR/scene.splinecode" 
      /> */}


      {/* categorias de los productos */}
      <ProductCategories />

      <Products />
      <Footer />
      {/* todos los productos por cartas  */}
      {/* <Body/> */}
      {/* seccion de todo los modales */}
      <InfoModal />
      <FloatingButtons />
      {/* <LoginModal />
      <RegisterModal /> */}

      {/* <LoginModal /> */}
      


    </div>
  )
}

export default Shop