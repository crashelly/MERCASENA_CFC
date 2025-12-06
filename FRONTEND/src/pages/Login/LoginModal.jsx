// import imgLogin from "@assets/images/imglogin.png"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ErrorAlert, SuccessAlert } from "@components/Alerts/"
import "./loginModal.css"
import { CONFIG } from "@config/app"
const LoginModal = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [shouldLogin, setShouldLogin] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()


        // CAMBIAR TODA ESTA MIERDA CUANDO SE HAGA EL NUEVO SERVICIO DE AUTH
        setShouldLogin(true)
        // navigate("/shop")
    }
    useEffect(() => {
        if (!shouldLogin) return;

        const LoginNow = async () => {
            if (isACorrectPassword(password)) {
                try {
                    const response = await fetch(CONFIG.API.URL.endpoints.auth.Login(), {
                        method: "POST",
                        body: JSON.stringify({
                            action: "login",
                            dataObject: {
                                email: email,
                                password: password
                            }
                        })
                    })

                    if (!response.ok) {
                        const res = await response.json();
                        console.log(res)
                        throw new Error(res.error)
                    }

                    // aca conviete la data a json 
                    const data = await response.json();

                    // ! ACA TOCA LUEGO CAMBIAR LA LOGICA Y COMO SE LOGUEA MK
                    if (data.estado == 'ok') {
                        console.log("intentado redirigir ")
                        let redirectedUri = "/"

                        console.log(data)

                        const selectRoute = async (data) => {
                            switch (data.route) {
                                case 'tienda/index.html':
                                    console.log("guardando info")

                                    console.log("guardadp")
                                    redirectedUri = "/tienda"


                                    break;
                                case 'Inventario/index.html':

                                    break;

                                default:
                                    break;
                            }

                            // redirecciona a la pagina que nesecite
                        }
                        saveInfo(data).then(() => {
                            SuccessAlert("Iniciando sesion ...")
                            selectRoute(data)
                            setTimeout(() => {
                                // console.log(data)
                                const data = {
                                    isLoggedIn: true,
                                    token: window.localStorage.getItem("token"),
                                    name: window.localStorage.getItem("userName"),
                                    sessionToken: window.localStorage.getItem("sessionToken"),
                                    email: window.localStorage.getItem("email")
                                }
                                console.log(data)
                                navigate(redirectedUri)
                            }, 4000);
                        })

                    } else {
                        throw new Error(response.responseJSON.error)
                    }

                } catch (error) {
                    ErrorAlert(error)
                } finally {
                    setShouldLogin(false)
                }

            } else {
                // !TOCA PONER EL SISTEMA DE ALERTAS MK 
            }

        }
        LoginNow()

    }, [shouldLogin])
    return (
        <>
            <div className="background-media">
                <video autoPlay muted loop id="video-background">
                    <source src="https://zensoftwares.website/mercasena/services/menu/img/mercasena.mp4" type="video/mp4" />
                    {/* <source src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcm11OHZucjRjdDhkNXB3czNmYzM1dGRuN2FiZThnbXl3dWlia2hyMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tHIRLHtNwxpjIFqPdV/giphy.gif" type="video/mp4"/> */}
                    Tu navegador no soporta el tag de video.
                </video>
                <dialog open id="LoginModal" className="modal ">
                    <div className="modal-box bg-white">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={() => navigate("/")} className="btn text-black text-2xl hover:bg-red-600  transition-colors  hover:duration-300 btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className="mt-6">
                            <div
                                className="bg-white rounded-lg overflow-hidden  transform transition-all sm:max-w-md w-full relative">
                                {/* <!-- BOTÓN CERRAR --> */}


                                <div className="bg-white px-8 py-10">
                                    <div id="loginImage_from_modal" className="w-full h-48 flex items-center justify-center bg-cover bg-center rounded-3xl overflow-hidden"
                                    >
                                        {/* style="background-image: url('assets/images/imglogin.png');" */}
                                        <div className="text-center text-white">
                                            <h2 className="text-2xl font-extrabold" >Bienvenido a
                                            </h2>
                                            <h2 className="text-2xl font-extrabold" >MERCASENA-los Cerezos
                                            </h2>
                                        </div>
                                    </div>

                                    <form id="loginForm" onSubmit={(form) => handleSubmit(form)}>
                                        {/* <!-- CORREO --> */}
                                        <div className="mb-5 mt-3 relative">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
                                                viewBox="0 -960 960 960" fill="white">
                                                <path
                                                    d="M480-40q-23 0-46-3t-46-8Q300 14 194.5-4.5T33-117q-45-74-29-159t77-143v-3Q19-479 4-562.5T32-720q37-63 102-95.5T271-838q32-57 87.5-89.5T480-960q66 0 121.5 32.5T689-838q72-10 137 22.5T928-720q43 74 28 157.5T879-422v3q61 58 77 143t-29 159Q871-23 765.5-4.5T572-51q-23 5-46 8t-46 3ZM288-90q-32-18-61-41.5T174-183q-24-28-42.5-60.5T101-311q-20 36-20 76.5t21 75.5q29 48 81.5 68.5T288-90Zm384 0q52 20 104.5-.5T858-159q21-35 21-75.5T859-311q-12 35-30.5 67.5T786-183q-24 28-52.5 51.5T672-90Zm-192-30q134 0 227-93t93-227q0-29-4.5-55.5T782-547q-29 20-64 31t-73 11q-102 0-173.5-71.5T400-750q-104 26-172 112t-68 198q0 134 93 227t227 93ZM360-350q-21 0-35.5-14.5T310-400q0-21 14.5-35.5T360-450q21 0 35.5 14.5T410-400q0 21-14.5 35.5T360-350Zm240 0q-21 0-35.5-14.5T550-400q0-21 14.5-35.5T600-450q21 0 35.5 14.5T650-400q0 21-14.5 35.5T600-350Z" />
                                            </svg>
                                            <input type="email" id="emailLogin"
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-10 pr-3 py-1.5 border border-green-500 color-sena text-white rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-white text-sm"
                                                placeholder="Ingresa tu correo" />
                                        </div>

                                        <div className="mb-5 mt-3 relative">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
                                                viewBox="0 -960 960 960" fill="white">
                                                <path
                                                    d="M720-240q25 0 42.5-17.5T780-300q0-25-17.5-42.5T720-360q-25 0-42.5 17.5T660-300q0 25 17.5 42.5T720-240Zm0 120q30 0 56-14t43-39q-23-14-48-20.5t-51-6.5q-26 0-51 6.5T621-173q17 25 43 39t56 14ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM490-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v52q-18-6-37.5-9t-42.5-3v-40H240v400h212q8 24 16 41.5T490-80Zm230 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Z" />
                                            </svg>
                                            <input type="password" id="passwordLogin"
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-10 py-2 border border-green-500 color-sena text-white rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-white text-sm"
                                                placeholder="Ingresa tu contraseña" />
                                        </div>

                                        <div className="flex justify-between items-center mb-8">
                                            {/*$('#registerModal').removeclassName('hidden')  */}
                                            <a href="#" onClick={() => navigate('/registro')} className="text-sm color-sena-texto  hover:underline"
                                            >Registrate</a>
                                            <a href="#" className="text-sm color-sena-texto  hover:underline"
                                                id="olvidasteTuPassBtn">¿Olvidaste tu
                                                contraseña?</a>
                                        </div>

                                        <button type="submit"

                                            className="w-full  hover:scale-105 hover:transform  color-sena text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition duration-300">
                                            Entrar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </dialog>
            </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => }>open modal</button> */}

        </>

    )
}

/**
 * verifica si la contraseña tiene los numerops de los caracteres como los deberia de terer
 * @param {} password 
 * @returns 
 */
const isACorrectPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (regex.test(password)) {
        return true;
    } else {
        return false;
    }
}
const saveInfo = async (data) => {
    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem("userName", data.name);
    window.localStorage.setItem("sessionToken", data.sessionToken);
    window.localStorage.setItem("email", data.email);

    return true
}
export default LoginModal