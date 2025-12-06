import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
const Modal = () => {
    const [username,setUsername] = useState("")
    const user =  useSelector(state => state.user.globalData)

    

    useEffect(() => {
        setUsername(user.username)
    },[user.name])
    return (
        // < !--modal que dice que te queda una hora para pagar tu producto-- >
        <dialog  id="postOrderNotification" className="modal">
            <div className="modal-box w-11/12 bg-white  max-w-5xl">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <div>
                    <div className="relative my-10 flex w-full flex-col items-center sm:mt-15">
                        <a rel="noreferrer" href="https://example.com"
                            className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-yellow-200 hover:bg-yellow-400 hover:text-white hover:scale-150 ease-in-out  transform hover:delay-150  px-7 py-2 transition-all duration-300">
                            <svg fill="#000000" className="w-5 h-5 animate-bounce" viewBox="0 0 32 32" version="1.1"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <title>warning</title>
                                    <path
                                        d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z">
                                    </path>
                                </g>
                            </svg>
                            <p className="text-sm font-semibold text-blue-700">ATENCION</p>
                        </a>


                        <h1
                            className="  mt-8 max-w-sm bg-gradient-to-r from-green-300 to-green-600 via-teal-500 to-gray-500 bg-clip-text text-center text-4xl font-bold text-transparent sm:max-w-4xl sm:text-6xl">
                            <span id="alertUserName_alert">{username || user.name }</span><span > , recuerda pagar en efectivo o con transferencia </span> en <span className="py-2 underline-offset-2 underline font-extrabold  ">el punto de venta</span> 
                        </h1>
                        {/* <!-- <span className="mt-8 max-w-lg text-center text-xl leading-relaxed text-gray-800">
                            recuerda pagar en el punto de venta
                        </span> --> */}
                        {/* px-3 py-1 */}
                        <div className="divider"></div>

                        

                    </div>
                </div>
                {/* <!-- <p className="py-4">El pedido será cancelado en una hora si no se confirma el pago.  recuerda pagar en el punto de venta</p> --> */}
            </div>
        </dialog>
    )
}


export default Modal 