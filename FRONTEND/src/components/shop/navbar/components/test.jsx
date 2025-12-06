<ul tabindex="0" className="dropdown-content menu bg-base-100 rounded-box z-1 w-70 p-2 shadow-sm">
    <li>
        {/* <!-- tu cuenta  --> */}
        <div className="flex flex-inline">
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
            <a onClick="user.createUserUpdateModal(); " className="text-md ml-2 font-bold color-sena-texto">Mi
                cuenta</a>
        </div>

    </li>
    <li>
        {/* <!-- tus pedidos --> */}
        <div className="flex flex-inline">
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
            <a onClick="user.fetchOrders()" className="text-md ml-2 font-bold color-sena-texto">Mis Pedidos</a>
        </div>
    </li>
    <li>
        {/* <!-- tus comprobantes de venta #39A900 --> */}
        <div className="flex flex-inline p-0 ml-2 ">
            <svg stroke="#39A900" width="60px" height="30px" className="mr-1" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M10.5 11L17 11" stroke="#37c035" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path d="M7 11H7.5" stroke="#37c035" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path d="M7 7.5H7.5" stroke="#37c035" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path d="M7 14.5H7.5" stroke="#37c035" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path d="M17 14.5H16M10.5 14.5H13.5" stroke="#37c035" strokeWidth="1.5" strokeLinecap="round">
                    </path>
                    <path d="M17 7.5H14M10.5 7.5H11.5" stroke="#37c035" strokeWidth="1.5" strokeLinecap="round">
                    </path>
                    <path
                        d="M21 7V6.37006C21 5.17705 21 4.58055 20.842 4.09946C20.5425 3.18719 19.8468 2.47096 18.9606 2.16261C18.4933 2 17.9139 2 16.755 2H7.24502C6.08614 2 5.50671 2 5.03939 2.16261C4.15322 2.47096 3.45748 3.18719 3.15795 4.09946C3 4.58055 3 5.17705 3 6.37006V15M21 11V20.3742C21 21.2324 20.015 21.6878 19.3919 21.1176C19.0258 20.7826 18.4742 20.7826 18.1081 21.1176L17.625 21.5597C16.9834 22.1468 16.0166 22.1468 15.375 21.5597C14.7334 20.9726 13.7666 20.9726 13.125 21.5597C12.4834 22.1468 11.5166 22.1468 10.875 21.5597C10.2334 20.9726 9.26659 20.9726 8.625 21.5597C7.98341 22.1468 7.01659 22.1468 6.375 21.5597L5.8919 21.1176C5.52583 20.7826 4.97417 20.7826 4.6081 21.1176C3.985 21.6878 3 21.2324 3 20.3742V19"
                        stroke="#37c035" strokeWidth="1.5" strokeLinecap="round"></path>
                </g>
            </svg>
            <a onClick="user.fetchBills()" className="text-md font-bold color-sena-texto">Mis Comprobantes de
                Venta</a>
        </div>
    </li>
    {/* <!-- boton de logout  --> */}
    <li>
        {/* <!-- boton de logout  --> */}
        <div className="flex flex-inline">
            <svg stroke="#39A900" width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
                        stroke="#39A900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </svg>
            <a onClick="user.logout()" className="text-md ml-2 font-bold color-sena-texto">Salir</a>
        </div>
    </li>


    <div id="cuenta_space" className="  flex flex-col">
        <div className="dropdown dropdown-end">
            <div tabindex="0" role="button" id="loginTrigger"
                class="btn bg-base-100 hover:bg-base-300  color-sena-texto  text-xs  md:text-md  m-1">Click ⬇️
            </div>
        </div>
    </div>
</ul>
