
<nav id="header" className="w-full z-30 top-0 py-1 bg-white ">
    <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-4 md:px-6 py-3">

        {/* <!-- Mobile menu button --> */}
        <label for="menu-toggle" className="cursor-pointer hidden  md:hidden block">
            <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 20 20">
                <title>menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        {/* <!-- Logo --> */}
        <div className="order-1 md:order-2">
            <a onclick="location.reload();" className="flex items-center tracking-wide no-underline hover:no-underline font-bold color-sena-texto text-xl"
                href="#">
                {/* <!-- <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#56B847">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg> --> */}
                <img className="md:hidden" width="50px" height="50px" src="assets/logos/logoSena_2.png" alt=""/>
                    <span className="hidden md:block">

                        MERCASENA
                    </span>

            </a>
        </div>

        {/* <!-- Menu --> */}
        <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
            <nav>
                <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                    <img src="eu.png" alt="">
                </ul>
            </nav>
        </div>

        {/* <!-- Search - Ocultar en móviles --> */}
        <div className="order-2 md:order-3 hidden md:block w-full md:w-auto mt-4 md:mt-0">
            <div className="w-full max-w-sm min-w-[200px]">
                <div className="relative mt-7">
                    <input id="productSearchBar"
                        className="w-full color-sena  text-white placeholder:text-white text-white text-sm border border-slate-200 rounded-full pl-4 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Busca tus productos..." />
                    <button
                        className=" bg-green-800 absolute top-1 right-1 flex items-center rounded-full bg-slate-800 py-1 px-3 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFFFF" className="w-4 h-4 mr-2">
                            <path fill-rule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                clip-rule="evenodd" />
                        </svg>
                        Buscar
                    </button>
                    <button className="btn mt-2 h-1 w-1   " id="btnOpenPopover" popovertarget="productsResult" style="anchor-name:--anchor-1">

                    </button>
                    <div className="dropdown    w-full h-full rounded-box bg-base-100 shadow-sm" popover id="productsResult"
                        style="position-anchor:--anchor-1">
                        <div className=" px-1 grid grid-cols-4 gap-4  bg-slate-100 " id="resultsforProducxts">

                        </div>
                        <div className=" px-1  " id="errorBannerContainer">

                        </div>

                    </div>
                    {/* <!-- <div className="dropdown menu w-7/10 rounded-box bg-base-100 shadow-sm" popover id="productsResult"
              style="position-anchor:--anchor-1">
            
           </div> --> */}

                </div>
            </div>
            <script>



            </script>
        </div>
        {/* <!-- mopdal de busqueda de pedidos mobile  --> */}
        <dialog id="ProductsModalForMobile" className="modal">
            <div className="modal-box  modal-bottom sm:modal-middle  ">
                <form method="dialog">
                    <button
                        className="btn btn-sm bg-white-400 ml-2   btn-circle btn-ghost absolute right-3 top-8 lg:top-2  hover:bg-red-400">
                        ✕</button>
                </form>
                <div>
                    {/* <!-- menu de filtros --> */}
                    <div className="navbar rounded-lg  bg-base-100 shadow-sm">
                        {/* <!-- primera parte --> */}
                        <div className="flex-none">

                        </div>
                        {/* <!-- segunda parte --> */}
                        <div className="flex-1">
                            {/* <!-- filtros --> */}

                            <a className="btn btn-ghost text-md mr-3  justify-start color-sena-texto">Busqueda de productos</a>
                            {/* <!-- <a className="btn btn-ghost text-xl ml-6 text-gray-700 ml-7">filtros </a> --> */}


                        </div>


                        <div className="flex-2">
                            <form className="flex flex-inline" id="searchBillByUser_form">

                                <input id="productSearchBarForMobile" type="text" placeholder="quiero..."
                                    className="input  input-bordered border-green-400 w-24 md:w-auto" />
                                <button className="btn btn-sm bg-white-400   btn-circle btn-ghost hover:bg-green-400">
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                                stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </g>
                                    </svg>
                                </button>

                            </form>
                        </div>
                        {/* <!-- tercera parte para ver  --> */}
                        <div className="flex-none">

                            {/* <!-- boton de buscar pedidos --> */}


                            {/* <!-- icono de la persona --> */}
                            <div className="dropdown dropdown-end ml-1  mr-1">
                                <div tabindex="0" role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src="tienda/assets/logos/sena_logo_2.png" />
                                    </div>
                                </div>
                            </div>
                            {/* <!-- <button className="btn btn-square btn-ghost">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                className="inline-block h-5 w-5 stroke-current">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                                                </path>
                                            </svg>
                                        </button> --> */}
                        </div>
                    </div>
                    {/* <!-- <div id="BillCardContainers" className="grid ml-8 grid-cols-1 p-2 lg:grid-cols-2"> -->
        <!-- CARD de informacion del comprobante de venta -->
 */}

                    <div id="mobile_searchedProducts"
                        className="grid mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">



                    </div>



                </div>

            </div>
        </dialog>
        {/* <!-- modal del login  --> */}

        {/* <!-- MODAL LOGIN --> */}
        <div id="loginModal" className="fixed inset-0 z-50 hidden  overflow-y-auto transition-opacity duration-300">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-gray-500 opacity-75" id="modalBackdrop"></div>

                <div
                    className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md w-full relative">
                    {/* <!-- BOTÓN CERRAR --> */}
                    <button id="btnCerrarLogin" onclick='document.getElementById("loginModal").classNameList.add("hidden");
    document.body.style.overflow = "";' className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="bg-white px-8 py-10">
                        <div className="w-full h-48 flex items-center justify-center bg-cover bg-center rounded-3xl overflow-hidden"
                            style="background-image: url('assets/images/imglogin.png');">
                            <div className="text-center text-white">
                                <h2 className="text-2xl font-extrabold" style="text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);">Bienvenido a
                                </h2>
                                <h2 className="text-2xl font-extrabold" style="text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);">MERCASENA
                                </h2>
                            </div>
                        </div>

                        <form id="loginForm">
                            <!-- CORREO -->
                            <div className="mb-5 mt-3 relative">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
                                    viewBox="0 -960 960 960" fill="white">
                                    <path
                                        d="M480-40q-23 0-46-3t-46-8Q300 14 194.5-4.5T33-117q-45-74-29-159t77-143v-3Q19-479 4-562.5T32-720q37-63 102-95.5T271-838q32-57 87.5-89.5T480-960q66 0 121.5 32.5T689-838q72-10 137 22.5T928-720q43 74 28 157.5T879-422v3q61 58 77 143t-29 159Q871-23 765.5-4.5T572-51q-23 5-46 8t-46 3ZM288-90q-32-18-61-41.5T174-183q-24-28-42.5-60.5T101-311q-20 36-20 76.5t21 75.5q29 48 81.5 68.5T288-90Zm384 0q52 20 104.5-.5T858-159q21-35 21-75.5T859-311q-12 35-30.5 67.5T786-183q-24 28-52.5 51.5T672-90Zm-192-30q134 0 227-93t93-227q0-29-4.5-55.5T782-547q-29 20-64 31t-73 11q-102 0-173.5-71.5T400-750q-104 26-172 112t-68 198q0 134 93 227t227 93ZM360-350q-21 0-35.5-14.5T310-400q0-21 14.5-35.5T360-450q21 0 35.5 14.5T410-400q0 21-14.5 35.5T360-350Zm240 0q-21 0-35.5-14.5T550-400q0-21 14.5-35.5T600-450q21 0 35.5 14.5T650-400q0 21-14.5 35.5T600-350Z" />
                                </svg>
                                <input type="email" id="emailLogin"
                                    className="w-full pl-10 pr-3 py-1.5 border border-green-500 color-sena text-white rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-white text-sm"
                                    placeholder="Ingresa tu correo">
                            </div>

                            <div className="mb-5 mt-3 relative">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
                                    viewBox="0 -960 960 960" fill="white">
                                    <path
                                        d="M720-240q25 0 42.5-17.5T780-300q0-25-17.5-42.5T720-360q-25 0-42.5 17.5T660-300q0 25 17.5 42.5T720-240Zm0 120q30 0 56-14t43-39q-23-14-48-20.5t-51-6.5q-26 0-51 6.5T621-173q17 25 43 39t56 14ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM490-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v52q-18-6-37.5-9t-42.5-3v-40H240v400h212q8 24 16 41.5T490-80Zm230 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Z" />
                                </svg>
                                <input type="password" id="passwordLogin"
                                    className="w-full px-10 py-2 border border-green-500 color-sena text-white rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-white text-sm"
                                    placeholder="Ingresa tu contraseña">
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <a href="#" className="text-sm color-sena-texto  hover:underline"
                                    onclick="$('#registerModal').removeclassName('hidden')">Registrate</a>
                                <a href="#" className="text-sm color-sena-texto  hover:underline" onclick=" "
                                    id="olvidasteTuPassBtn">¿Olvidaste tu
                                    contraseña?</a>
                            </div>

                            <button type="submit"
                                className="w-full color-sena text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition duration-300">
                                Entrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        {/* <!-- modal para cambiar la contraseña --> */}
        <dialog id="changePass" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className="w-full max-w-lg mx-auto border-gray-300  p-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl text-green-400 font-bold  underline self-start  text-center font-medium mb-6">Cambio de
                            contraseña
                        </h2>
                        <form id="changePass_form">
                            <div className="grid grid-cols-1 gap-6">
                                {/* <!-- contraseña --> */}
                                <div className="col-span-2 sm:col-span-1">

                                    <div className="flex flex-inline justify-between">
                                        <label for="card-number" className="block text-sm font-medium text-gray-700 mb-2">Nueva
                                            contraseña</label>
                                        <div className="tooltip z-10 mr-20  overflow-visible tooltip-success "
                                            data-tip="la contraseña debe tener minimo 8 caracteres entre numeros y letras y un caracter especial">

                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        d="M12 11V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                                        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <circle cx="12" cy="7.5" r="1" fill="#000000"></circle>
                                                </g>
                                            </svg>
                                        </div>

                                    </div>
                                    <input type="password" name="username" id="changePass_newPass" placeholder="Ingresa tu contraseña"
                                        className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500">

                                </div>
                                {/* <!-- confirmacion de lla contraseña --> */}
                                <div className="col-span-2 sm:col-span-1">

                                    <div className="flex flex-inline justify-between">
                                        <label for="" className="block text-sm font-medium text-gray-700 mb-2">repite tu contraseña</label>


                                    </div>
                                    <input type="password" name="set_phoneNumber" id="changePass_confirmPass" placeholder="3147773423 "
                                        className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500">

                                </div>

                            </div>
                            <div className="mt-8">
                                <button type="submit"
                                    className="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none">Guardar
                                    contraseña</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>

        <dialog id="OTPCodeConfirmationModal" className="modal">
            <div className="modal-box">

                <div>

                    <div
                        className="bg-white w-full h-full  dark:bg-gray-700 rounded-3xl w-full max-w-md overflow-hidden grid md:grid-cols-1 transform transition-transform duration-300 hover:scale-105">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className="p-8 text-center">

                            <div className="avatar">
                                <div className="w-40 rounded-full">
                                    <img src="assets/logos/mercasena_logo.png" />
                                </div>
                            </div>


                            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Verificacion de codigo</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Ingresa el codigo de 6 numeros que enviamos a
                                tu correo</p>

                            <div className="flex justify-center space-x-4 mb-6">
                                <div data-index="1">
                                    <input type="text" id="numberOfCode1" min="0" maxlength="1" pattern="[0-9]*" inputmode="numeric"
                                        className="w-12 h-16 text-center text-2xl border-2 border-green-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-green-300 inputVCode
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110">
                                </div>
                                <div data-index="2">
                                    <input type="text" id="numberOfCode2" min="0" maxlength="1" pattern="[0-9]*" className="w-12 h-16 text-center text-2xl border-2 border-green-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-blue-500 inputVCode
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110">
                                </div>
                                <div data-index="3">
                                    <input type="text" id="numberOfCode3" min="0" maxlength="1" pattern="[0-9]*" className="w-12 h-16 text-center text-2xl border-2 border-green-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-green-300 inputVCode
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110">
                                </div>
                                <div data-index="4">
                                    <input type="text" id="numberOfCode4" min="0" maxlength="1" pattern="[0-9]*" className="w-12 h-16 text-center text-2xl border-2 border-green-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-green-300 inputVCode
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110">
                                </div>
                                <div data-index="5">
                                    <input type="text" id="numberOfCode5" min="0" maxlength="1" pattern="[0-9]*" className="w-12 h-16 text-center text-2xl border-2 border-green-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-green-300 inputVCode
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110">
                                </div>
                                <div data-index="6">
                                    <input type="text" id="numberOfCode6" min="0" maxlength="1" pattern="[0-9]*" className="w-12 h-16 text-center text-2xl border-2 border-green-500 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-green-300 inputVCode
                    dark:bg-gray-600 dark:text-white dark:border-blue-400
                    transition-transform duration-300 hover:scale-110">
                                </div>





                            </div>
                            <div id="errorCodeVerificationInfo" className="text-lg text-red-600 dark:text-gray-300 mb-6">


                            </div>


                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                                ¿No te llego el codigo?
                                <a href="#"
                                    className="text-green-500 hover:underline dark:text-green-400 transition-colors duration-300 hover:text-green-600 dark:hover:text-green-500">Reenviar
                                    codigo</a>
                            </div>
                            <a href="" target="">
                                <button id="verificationCodeBtn" className="w-full py-4 bg-green-500 hover:bg-green-600  text-white rounded-xl hover:bg-green-600
            transition-transform duration-300 hover:scale-105
            dark:bg-green-600 dark:hover:bg-green-700">
                                    Verificar codigo
                                </button>
                            </a>

                        </div>
                    </div>

                </div>
            </div>
        </dialog>

        {/* <!-- modal del peticiondeCorreo poara recuperar la contraseña  --> */}
        <dialog id="emailForRecover" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 ">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Recuperacion de contraseña</h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Recordaste tu contraseña ?
                                <a className="text-blue-600 decoration-2 hover:underline font-medium" href="#"
                                    onclick="user.showLogin();">
                                    Inicia sesión
                                </a>
                            </p>
                        </div>

                        <div className="mt-5">
                            <form id="requestEmailForm_forRecover">
                                <div className="grid gap-y-4">
                                    <div>
                                        <label for="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Correo
                                            Electronico</label>
                                        <div className="relative">
                                            <input type="email" id="forgorPass_email" name="email"
                                                className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                                required aria-describedby="email-error">
                                        </div>
                                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address
                                            so
                                            we can get back to you</p>
                                    </div>
                                    <button type="submit"
                                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Solicitar
                                        codigo de verificacion</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </dialog>


        {/* <!--   MODAL DE REGISTRO  --> */}
        <div id="registerModal" className="fixed inset-0 z-50 hidden   overflow-y-auto transition-opacity duration-300">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-gray-500 opacity-75" id="modalBackdrop"></div>

                <div
                    className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md w-full relative">
                    {/* <!-- BOTÓN CERRAR --> */}
                    <button id="btnCerrarLogin" onclick=' document.getElementById("registerModal").classNameList.add("hidden");
    document.body.style.overflow = "";' className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="bg-white px-8 py-10">
                        <div className="w-full h-48 flex items-center justify-center bg-cover bg-center rounded-3xl overflow-hidden"
                            style="background-image: url('assets/images/imglogin.png');">
                            <div className="text-center text-white">
                                <h2 className="text-2xl font-extrabold" style="text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);">
                                </h2>
                                <h2 className="text-2xl font-extrabold" style="text-shadow: 4px 4px 6px rgba(0, 0, 0, 0.6);"> Registrate
                                </h2>
                            </div>
                        </div>

                        <form id="registerForm" method="POST">
                            {/* <!-- CORREO --> */}
                            <div className="mb-5 mt-3 relative">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
                                    viewBox="0 -960 960 960" fill="white">
                                    <path
                                        d="M480-40q-23 0-46-3t-46-8Q300 14 194.5-4.5T33-117q-45-74-29-159t77-143v-3Q19-479 4-562.5T32-720q37-63 102-95.5T271-838q32-57 87.5-89.5T480-960q66 0 121.5 32.5T689-838q72-10 137 22.5T928-720q43 74 28 157.5T879-422v3q61 58 77 143t-29 159Q871-23 765.5-4.5T572-51q-23 5-46 8t-46 3ZM288-90q-32-18-61-41.5T174-183q-24-28-42.5-60.5T101-311q-20 36-20 76.5t21 75.5q29 48 81.5 68.5T288-90Zm384 0q52 20 104.5-.5T858-159q21-35 21-75.5T859-311q-12 35-30.5 67.5T786-183q-24 28-52.5 51.5T672-90Zm-192-30q134 0 227-93t93-227q0-29-4.5-55.5T782-547q-29 20-64 31t-73 11q-102 0-173.5-71.5T400-750q-104 26-172 112t-68 198q0 134 93 227t227 93ZM360-350q-21 0-35.5-14.5T310-400q0-21 14.5-35.5T360-450q21 0 35.5 14.5T410-400q0 21-14.5 35.5T360-350Zm240 0q-21 0-35.5-14.5T550-400q0-21 14.5-35.5T600-450q21 0 35.5 14.5T650-400q0 21-14.5 35.5T600-350Z" />
                                </svg>
                                <input type="email" id="emailForRegister"
                                    className="w-full pl-10 pr-3 py-1.5 border border-green-500 color-sena  text-white rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-white text-sm"
                                    placeholder="Ingresa tu correo">
                            </div>
                            {/* <!-- nombre --> */}
                            <div className="mb-5 mt-3 relative">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
                                    viewBox="0 -960 960 960" fill="white">
                                    <path
                                        d="M480-40q-23 0-46-3t-46-8Q300 14 194.5-4.5T33-117q-45-74-29-159t77-143v-3Q19-479 4-562.5T32-720q37-63 102-95.5T271-838q32-57 87.5-89.5T480-960q66 0 121.5 32.5T689-838q72-10 137 22.5T928-720q43 74 28 157.5T879-422v3q61 58 77 143t-29 159Q871-23 765.5-4.5T572-51q-23 5-46 8t-46 3ZM288-90q-32-18-61-41.5T174-183q-24-28-42.5-60.5T101-311q-20 36-20 76.5t21 75.5q29 48 81.5 68.5T288-90Zm384 0q52 20 104.5-.5T858-159q21-35 21-75.5T859-311q-12 35-30.5 67.5T786-183q-24 28-52.5 51.5T672-90Zm-192-30q134 0 227-93t93-227q0-29-4.5-55.5T782-547q-29 20-64 31t-73 11q-102 0-173.5-71.5T400-750q-104 26-172 112t-68 198q0 134 93 227t227 93ZM360-350q-21 0-35.5-14.5T310-400q0-21 14.5-35.5T360-450q21 0 35.5 14.5T410-400q0 21-14.5 35.5T360-350Zm240 0q-21 0-35.5-14.5T550-400q0-21 14.5-35.5T600-450q21 0 35.5 14.5T650-400q0 21-14.5 35.5T600-350Z" />
                                </svg>
                                <input type="text" id="nameForRegister"
                                    className="w-full pl-10 pr-3 py-1.5 border border-green-500 color-sena text-white rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-white text-sm"
                                    placeholder="Escribe tu nombre real">
                            </div>

                            {/* <!-- contraseña --> */}
                            <div className="mb-5 mt-3 relative">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
                                    viewBox="0 -960 960 960" fill="white">
                                    <path
                                        d="M720-240q25 0 42.5-17.5T780-300q0-25-17.5-42.5T720-360q-25 0-42.5 17.5T660-300q0 25 17.5 42.5T720-240Zm0 120q30 0 56-14t43-39q-23-14-48-20.5t-51-6.5q-26 0-51 6.5T621-173q17 25 43 39t56 14ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM490-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v52q-18-6-37.5-9t-42.5-3v-40H240v400h212q8 24 16 41.5T490-80Zm230 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Z" />
                                </svg>
                                <input type="password" id="passwordForRegister"
                                    className="w-full px-10 py-2 border border-green-500 color-sena  text-white rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-white text-sm"
                                    placeholder="Ingresa tu contraseña">
                            </div>





                            {/* <!-- se te olvido la contraseña --> */}
                            <div className="mb-5 mt-3 relative">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
                                    viewBox="0 -960 960 960" fill="white">
                                    <path
                                        d="M720-240q25 0 42.5-17.5T780-300q0-25-17.5-42.5T720-360q-25 0-42.5 17.5T660-300q0 25 17.5 42.5T720-240Zm0 120q30 0 56-14t43-39q-23-14-48-20.5t-51-6.5q-26 0-51 6.5T621-173q17 25 43 39t56 14ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM490-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v52q-18-6-37.5-9t-42.5-3v-40H240v400h212q8 24 16 41.5T490-80Zm230 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Z" />
                                </svg>
                                <input type="password" id="repeatedPassword"
                                    className="w-full px-10 py-2 border border-green-500 color-sena  text-white rounded-full focus:ring-2 focus:ring-green-400 focus:border-green-400 placeholder-white text-sm"
                                    placeholder="Repite tu contraseña">
                            </div>

                            <div className="flex justify-between items-center mb-8">¿Ya tienes cuenta?
                                <a href="#" className="text-sm color-sena-texto hover:underline" onclick="$('#registerModal').addclassName('hidden')">Iniciar sesion</a>

                            </div>

                            <button type="submit"
                                className="w-full color-sena text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition duration-300">
                                Registrar
                            </button>






                        </form>
                    </div>
                </div>
            </div>
        </div>



        {/* <!-- MODAL DE QUE SE EFECTUARON LOS CAMBIOS  --> */}
        <dialog id="modalExito" className="modal">
            <div className="modal-box ">
                <div className="container inline-flex">
                    <img src="assets/icons/check-icon.gif" className="object-cover mr-10 mt-9" alt="">
                        <p className="align-center mt-9 text-gray-600 text-2xl " id="mensajeModalExito">Press ESC key or
                            click the button below to close</p>

                </div>

                <div className="modal-action">
                    <form method="dialog">
                        {/* <!-- if there is a button in form, it will close the modal --> */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </div>
        </dialog>

        {/* <!-- MODAL PARA LA INSTANCIA  --> */}
        <dialog id="modalExitoforInstance" className="modal">
            <div className="modal-box ">
                <div className="container inline-flex">
                    <img src="assets/icons/check-icon.gif" className="object-cover mr-10 mt-9" alt="">
                        <p className="align-center mt-9 text-gray-600 text-2xl " id="mensajeModalExitoForInstance">Press ESC key or
                            click the button below to close</p>

                </div>

                <div className="modal-action">
                    <form method="dialog">

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </div>
        </dialog>


        {/* <!-- MODAL QUE MUESTRA LOS ERRORES  --> */}
        <dialog id="errorModal" className="modal">
            <div className="modal-box ">
                <div className="container inline-flex">
                    <img src="assets/icons/error-icon.gif" className="object-cover overflow-visible  h-50 w-50 ml-7  mr-10 mt-9"
                        alt="">
                        <p className="align-center mt-9 text-gray-600 text-2xl " id="text-modalError">Press ESC key or
                            click the button below to close</p>

                </div>

                <div className="modal-action">
                    <form method="dialog">
                        {/* <!-- if there is a button in form, it will close the modal --> */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </div>
        </dialog>


        <dialog id="errorModalForInstance" className="modal">
            <div className="modal-box ">
                <div className="container inline-flex">
                    <img src="assets/icons/error-icon.gif" className="object-cover overflow-visible  h-50 w-50 ml-7  mr-10 mt-9"
                        alt="">
                        <p className="align-center mt-9 text-gray-600 text-2xl " id="text-modalErrorForInstance">Press ESC key or
                            click the button below to close</p>

                </div>

                <div className="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </div>
        </dialog>
        {/* <!-- MODAL REGISTRO -->
      <!-- <dialog id="registerModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onclick="cerrarRegistro()">✕</button>
          </form>

      </dialog> --> */}



        {/* <!-- modal de carga --> */}
        <dialog id="modalCarga" className="modal">
            <div className="modal-box opacity-100 ">
                <form method="dialog">
                    <button className="btn hidden btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>


                <div className="loader-container">
                    <div className="loader"></div>
                    <div className="loader-text" id="loader-text"></div>
                </div>


            </div>
        </dialog>



        {/* <!-- Iconos de navegación --> */}
        <div className="order-3 md:order-4 flex items-center justify-end md:space-x-4" id="nav-content">
            <a className="inline-block no-underline hover:text-black md:hidden" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#56B847">
                    <path
                        d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
            </a>

            <a href="index.html" className="hidden md:inline-block no-underline hover:text-black text-green-600" href="">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#56B847">
                    <path
                        d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                </svg>
            </a>


            <a id="loginTrigger" popovertarget="popover-1" onclick="$('#loginModal').removeclassName('hidden')"
                className="  md:inline-block no-underline hover:text-black color-sena-texto" href="#">
                Iniciar Sesión / Registro
            </a>


            <div className="border-l-2 hidden  md:block  border-green-500 h-6"></div>

            <div>
            </div>

            <div>
                <a onclick="web.getProductsInfo();" className="block md:hidden">
                    <label className="input">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            stroke="#39a900">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                    stroke="#" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </g>
                        </svg>

                    </label>

                </a>
            </div>

            {/* <!-- boton de carrito --> */}
            <div>
                <button onclick="user.requestLogin();"
                    className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                    aria-label="Cart">
                    <svg className="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        viewBox="0 0 24 24" stroke="#35a751">
                        <path
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                        </path>
                    </svg>
                    <span className="absolute inset-0 object-right-top -mr-6">
                        <div id="productCounterInShoppingCart"
                            className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                            0
                        </div>
                    </span>
                </button>
            </div>
            {/* <!-- find e boton --> */}
        </div>
    </div>
</nav>
