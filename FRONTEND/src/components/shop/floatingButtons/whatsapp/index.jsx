
import { FaArrowUp, FaWhatsapp } from "react-icons/fa"; 7
import "./whatsappButtonStyles.css";
import { CONFIG } from "@config/app"
import { useState, useEffect } from "react"


const FloatingButtons = () => {
    const [isloading, setloading] = useState(true)
    const [whatsapp, setWhatsapp] = useState({ number: null })

    useEffect(() => {
        fetch(CONFIG.API.URL.endpoints.whatsapp.get())
            .then(res => res.json())
            .then(res => {
                setloading(false)
                console.log(res[0])
                setWhatsapp({ number: res[0].whatsapp })
            })
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const whatsappLink = whatsapp.number 
                            ? `https://wa.me/57${whatsapp.number}?text=¡Hola!%20Quiero%20más%20información.`
                            : "#"

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 items-end z-50">
            {/* Burbuja + WhatsApp */}
            <div className="relative flex items-center">
                {/* Burbuja de mensaje */}
                {/* <div className="absolute right-16 bg-white text-gray-700 font-semibold text-sm px-3 py-2 rounded-2xl shadow-md animate-bounce">
                    ¿Necesitas ayuda?
                </div> */}

                {/* Botón de WhatsApp */}
                <a  
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                        !isloading && whatsapp.number
                            ? "w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-600 hover:bg-green-600 text-white shadow-lg shadow-gray-400 transition-transform transform hover:scale-110"
                            : "cursor-not-allowed w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-white shadow-lg shadow-gray-400 transition-transform transform hover:scale-110"
                    
                        }
                    onClick={(e)=>{
                        !isloading && whatsapp.number
                            ? console.log("redirigiendo a whatsapp")
                            : e.preventDefault()
                    }}
                >
                    <FaWhatsapp size={28} />
                </a>
            </div>

            {/* Botón de configuración */}
            {/* <button
                className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-gray-400 transition-transform transform hover:scale-110"
            >
                <FaCog size={26} />
            </button> */}

            {/* Botón de subir */}
            <button
                onClick={scrollToTop}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-teal-600 text-white shadow-lg shadow-gray-400 transition-transform transform hover:scale-110"
            >
                <FaArrowUp size={26} />
            </button>
        </div>
    );
};

export default FloatingButtons;