import Logo from "@components/Logo"
import githubIcon from "@assets/Logos/github-logo.png"
import facebookIcon from "@assets/Logos/facebook-logo.png"
import whatsappIcon from "@assets/Logos/whatsapp-logo.png"

import { CONFIG } from "@config/app"
import { useState, useEffect } from "react"

const Footer = () => {
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

    // if(isloading){

    // }
    return (
        <footer className="bg-white text-black py-8">
            <div className="container mx-auto px-6">
                {/* <!-- Contenedor principal con flex-row para alinear horizontalmente --> */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* <!-- Logo SENA y MERCASENA alineados a la izquierda --> */}
                    <div className="flex items-center space-x-3 mb-4 md:mb-0">
                        <Logo width={20} height={0} />
                        {/* <img src={Logo} alt="SENA" className="h-10" /> */}
                    </div>
                        <h2 className="text-xl text-center mx-auto font-bold color-sena-texto">Centro para la Formaciòn Cafetera</h2>

                    {/* <!-- Iconos de redes sociales centrados en móvil, alineados a la derecha en desktop --> */}
                    <div className="flex justify-center md:justify-end w-full md:w-auto">
                        <div className="flex space-x-6">
                            <a href="https://www.facebook.com/share/16mxFyYVuP/" target="_blank"
                                className="hover:opacity-80 transition-opacity">
                                <img src={facebookIcon} alt="Facebook" className="h-8 w-8" />
                            </a>
                            <a href="https://github.com/crashelly" target="_blank" className="hover:opacity-80 transition-opacity">
                                <img src={githubIcon} alt="GitHub" className="h-8 w-8" />
                            </a>
                            <div id="whatsapp_contact">
                                {
                                    whatsapp.number != null ? (
                                        <a href={"https://wa.me/57" + whatsapp.number} target="_blank" className="hover:opacity-80 transition-opacity">
                                            <img src={whatsappIcon} alt="WhatsApp" className="h-8 w-8" />
                                        </a>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer