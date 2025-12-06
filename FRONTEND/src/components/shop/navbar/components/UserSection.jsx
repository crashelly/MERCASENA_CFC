import { setShowMyAccount, setShowMyOrders, setShowMyBills, setShowLogout } from "@slices/shop/appSlice"
import { MobileSearchModalButton } from "@components/shop/navbar/components/MobileProductSearch"
import { MenuOption } from "@components/shop/navbar/components/userMenu/MenuOption"
import { ShoppingCartIcon } from "./ShoppingCarIcon";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "@components/Alerts/"
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CONFIG } from "@config/app"
// import { LoginModal, RegisterModal } from '@components/modals'

export const UserSection = () => {
    const user = useSelector(state => state.user.globalData)
    const [userName, setUserName] = useState('');
    const [logOutNow, setLogOutNow] = useState(false);
    const navigate = useNavigate();
    // estados de los modales


    useEffect(() => {
        if (logOutNow) {
            logOutRequest()
            setLogOutNow(false)
        }
    }, [logOutNow])
    const logOutRequest = () => {
        fetch(CONFIG.API.URL.endpoints.user.logOut(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'mercasena-token': user.sessionToken,
                'X-CSRF-token': user.token
            },
            body: JSON.stringify({
                action: "logout",
                dataObject: {}
            })
        }).then(response => {
            if (!response.ok) {
                ErrorAlert("Error al cerrar la sesion")
            }

            return response.json()
        }).then((response) => {

            // limpia los datos almacenados en el localstorage
            localStorage.clear();

            Loader.hide()
            setTimeout(() => {
                navigate("/", { 'state': { redirectedByLogOut: true } })
            }, 2000)
        }).catch(error => {
            Loader.hide()
            ErrorAlert(error)
        })

    }
    const dispatch = useDispatch();

    useEffect(() => {
        setUserName(user.name)
    }, [user.name])
    return (
        <>
            {/* <LoginModal />
            <RegisterModal /> */}
            <div className="flex flex-inline md:justify-end ml-3">

                {/* { showLoginModal ? <RequestLoginModal /> : null } */}
                {/* //  <!-- Iconos de navegación --> */}
                {/* icono de la persona */}
                <div className="ml-20 md:pl-60 order-3 md:order-4 md:inset-y-0 md:right-0  bg-white  md:ml-7 md:mr-0 mt-0 flex items-center justify-end md:space-x-4 mr-0" id="nav-content">
                    <MobileSearchModalButton />

                    <div id="cuenta_space" className=" mr-0 md:ml-1 flex flex-col">

                        <div className="dropdown dropdown-start">
                            <div className="dropdown dropdown-end color-sena-texto">
                                <div className="flex flex-inline">
                                    {
                                        // ! CUANDO EL USUARIO ESTA LOGIADO
                                        user.isLoggedIn ? (
                                            <>
                                                <div tabIndex="0" role="button" id="loginTrigger"
                                                    className="btn bg-white hover:bg-slate-100 border-0 hover:shadow-md shadow-none  color-sena-texto    md:text-md  m-1">
                                                    {/* icono del usuario */}
                                                    <a href="#" className="hidden  hover:animate-bounce hover:animate-ease-in-out md:mr-2 color-sena-texto  md:inline-block no-underline  text-green-600" >
                                                        <svg className="" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="">
                                                            <path
                                                                d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                                                        </svg>
                                                    </a>
                                                    <a href="#" className="whitespace-nowrap text-md">{
                                                        window.innerWidth < 1024
                                                            ? getShortName(user.name)
                                                            : user.name
                                                    }</a>
                                                </div>
                                                <ul tabIndex="0" className=" mt-13 dropdown-content menu bg-white rounded-box z-1 w-70 p-2 shadow-sm">

                                                    {
                                                        <>
                                                            <MenuOption onClickAction={() => dispatch(setShowMyAccount(true))} icon={menuOptions.account.icon} description={menuOptions.account.description} />
                                                            <MenuOption onClickAction={() => dispatch(setShowMyOrders(true))} icon={menuOptions.orders.icon} description={menuOptions.orders.description} />
                                                            <MenuOption onClickAction={() => dispatch(setShowMyBills(true))} icon={menuOptions.bills.icon} description={menuOptions.bills.description} />
                                                            <MenuOption onClickAction={() => LogOut(user.token)} icon={menuOptions.logOut.icon} description={menuOptions.logOut.description} />
                                                        </>

                                                        // modales de las opciones de esos modales

                                                    }
                                                </ul>
                                            </>
                                        ) : (
                                            <>
                                                <a href="index.html" className="hidden hover:animate-bounce hover:animate-ease-in-out md:mr-4 color-sena-texto  md:inline-block  no-underline  text-green-600" >
                                                    <svg className="" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="">
                                                        <path
                                                            d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                                                    </svg>
                                                </a>
                                                <a href="#" className="md:whitespace-nowrap">
                                                    <Link to="/login">Iniciar Sesión / Registro </Link>
                                                </a>

                                                {/* <div tabindex="0" role="button" id="loginTrigger"
                                        class="btn bg-base-100 hover:bg-base-300  color-sena-texto  text-xs  md:text-md  m-1">Click ⬇️
                                    </div> */}
                                            </>
                                        )
                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                    {/* $('#loginModal').removeclassName('hidden') */}

                    {/* borde que separa de los botones */}
                    <div className="md:ml-3  md:mr-0 border-l-2 hidden  md:block  border-green-500 h-6"></div>
                    {/* aca es el icono de busqueda en movil */}

                    {/*========================== icono del carrito de compras=================================== */}
                    <ShoppingCartIcon />
                </div >
            </div>


        </>
    )
}

const menuOptions = {
    account: {
        name: "account",
        description: "Tu cuenta",
        icon: () => (
            <svg width="30px" height="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#39A900">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M0 0h48v48H0z" fill="none"></path>
                    <g id="Shopicon">
                        <path
                            d="M31.278,25.525C34.144,23.332,36,19.887,36,16c0-6.627-5.373-12-12-12c-6.627,0-12,5.373-12,12 c0,3.887,1.856,7.332,4.722,9.525C9.84,28.531,5,35.665,5,44h38C43,35.665,38.16,28.531,31.278,25.525z M16,16c0-4.411,3.589-8,8-8 s8,3.589,8,8c0,4.411-3.589,8-8,8S16,20.411,16,16z M24,28c6.977,0,12.856,5.107,14.525,12H9.475C11.144,33.107,17.023,28,24,28z">
                        </path>
                    </g>
                </g>
            </svg>
        )
    },
    orders: {
        name: "orders",
        description: "Mis pedidos",
        icon: () => (
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                stroke="#39A900">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M4.50938 10.4343C4.7433 8.79689 4.86026 7.97818 5.42419 7.48909C5.98812 7 6.81514 7 8.46918 7H9H15H15.5308C17.1849 7 18.0119 7 18.5758 7.48909C19.1397 7.97818 19.2567 8.79689 19.4906 10.4343L20.3478 16.4343C20.6512 18.5586 20.803 19.6208 20.2049 20.3104C19.6068 21 18.5339 21 16.388 21H16H8H7.61204C5.46614 21 4.3932 21 3.79511 20.3104C3.19703 19.6208 3.34877 18.5586 3.65224 16.4343L4.50938 10.4343Z"
                        stroke="#39A900" strokeWidth="2" strokeLinejoin="round"></path>
                    <path d="M9 11V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V11" stroke="#39A900"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </svg>
        )
    },
    bills: {
        name: "bills",
        description: "Mis comprobantes",
        icon: () => (
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#39A900" strokeWidth="0.23200000000000005"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="1.152"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M7.09878 1.25004C7.14683 1.25006 7.19559 1.25008 7.24508 1.25008H16.7551C16.8045 1.25008 16.8533 1.25006 16.9014 1.25004C17.9181 1.2496 18.6178 1.24929 19.2072 1.45435C20.3201 1.84161 21.1842 2.73726 21.5547 3.86559L20.8421 4.09954L21.5547 3.86559C21.7507 4.46271 21.7505 5.17254 21.7501 6.22655C21.7501 6.27372 21.7501 6.32158 21.7501 6.37014V20.3743C21.7501 21.8395 20.0231 22.7118 18.8857 21.671C18.8062 21.5983 18.694 21.5983 18.6145 21.671L18.1314 22.1131C17.2032 22.9624 15.7969 22.9624 14.8688 22.1131C14.5138 21.7882 13.9864 21.7882 13.6314 22.1131C12.7032 22.9624 11.2969 22.9624 10.3688 22.1131C10.0138 21.7882 9.48637 21.7882 9.13138 22.1131C8.20319 22.9624 6.79694 22.9624 5.86875 22.1131L5.38566 21.671C5.30618 21.5983 5.19395 21.5983 5.11448 21.671C3.97705 22.7118 2.25007 21.8395 2.25007 20.3743V6.37014C2.25007 6.32158 2.25005 6.27372 2.25003 6.22655C2.24965 5.17255 2.24939 4.46271 2.44545 3.86559C2.81591 2.73726 3.68002 1.84161 4.79298 1.45435C5.3823 1.24929 6.08203 1.2496 7.09878 1.25004ZM7.24508 2.75008C6.024 2.75008 5.6034 2.76057 5.28593 2.87103C4.62655 3.10047 4.09919 3.63728 3.8706 4.3335C3.75951 4.67183 3.75007 5.11796 3.75007 6.37014V20.3743C3.75007 20.4933 3.80999 20.5661 3.88517 20.6009C3.92434 20.619 3.96264 20.6237 3.99456 20.6194C4.0227 20.6156 4.05911 20.6035 4.10185 20.5644C4.75453 19.9671 5.74561 19.9671 6.39828 20.5644L6.88138 21.0065C7.23637 21.3313 7.76377 21.3313 8.11875 21.0065C9.04694 20.1571 10.4532 20.1571 11.3814 21.0065C11.7364 21.3313 12.2638 21.3313 12.6188 21.0065C13.5469 20.1571 14.9532 20.1571 15.8814 21.0065C16.2364 21.3313 16.7638 21.3313 17.1188 21.0065L17.6019 20.5644C18.2545 19.9671 19.2456 19.9671 19.8983 20.5644C19.941 20.6035 19.9774 20.6156 20.0056 20.6194C20.0375 20.6237 20.0758 20.619 20.115 20.6009C20.1901 20.5661 20.2501 20.4934 20.2501 20.3743V6.37014C20.2501 5.11797 20.2406 4.67183 20.1295 4.3335C19.9009 3.63728 19.3736 3.10047 18.7142 2.87103C18.3967 2.76057 17.9761 2.75008 16.7551 2.75008H7.24508ZM6.25007 7.50008C6.25007 7.08587 6.58585 6.75008 7.00007 6.75008H7.50007C7.91428 6.75008 8.25007 7.08587 8.25007 7.50008C8.25007 7.9143 7.91428 8.25008 7.50007 8.25008H7.00007C6.58585 8.25008 6.25007 7.9143 6.25007 7.50008ZM9.75007 7.50008C9.75007 7.08587 10.0859 6.75008 10.5001 6.75008H17.0001C17.4143 6.75008 17.7501 7.08587 17.7501 7.50008C17.7501 7.9143 17.4143 8.25008 17.0001 8.25008H10.5001C10.0859 8.25008 9.75007 7.9143 9.75007 7.50008ZM6.25007 11.0001C6.25007 10.5859 6.58585 10.2501 7.00007 10.2501H7.50007C7.91428 10.2501 8.25007 10.5859 8.25007 11.0001C8.25007 11.4143 7.91428 11.7501 7.50007 11.7501H7.00007C6.58585 11.7501 6.25007 11.4143 6.25007 11.0001ZM9.75007 11.0001C9.75007 10.5859 10.0859 10.2501 10.5001 10.2501H17.0001C17.4143 10.2501 17.7501 10.5859 17.7501 11.0001C17.7501 11.4143 17.4143 11.7501 17.0001 11.7501H10.5001C10.0859 11.7501 9.75007 11.4143 9.75007 11.0001ZM6.25007 14.5001C6.25007 14.0859 6.58585 13.7501 7.00007 13.7501H7.50007C7.91428 13.7501 8.25007 14.0859 8.25007 14.5001C8.25007 14.9143 7.91428 15.2501 7.50007 15.2501H7.00007C6.58585 15.2501 6.25007 14.9143 6.25007 14.5001ZM9.75007 14.5001C9.75007 14.0859 10.0859 13.7501 10.5001 13.7501H17.0001C17.4143 13.7501 17.7501 14.0859 17.7501 14.5001C17.7501 14.9143 17.4143 15.2501 17.0001 15.2501H10.5001C10.0859 15.2501 9.75007 14.9143 9.75007 14.5001Z" fill="#39A900"></path> </g></svg>
        )
    },
    logOut: {
        name: "logOut",
        description: "Salir",
        icon: () => (
            <svg stroke="#39A900" width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="2"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
                        stroke="#39A900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </svg>
        )
    }
}

const getShortName = (fullName) => {
    return fullName.split(" ")[0]
}