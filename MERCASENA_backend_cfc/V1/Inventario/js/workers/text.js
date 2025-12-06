user.inyectNewProductDataToBill



                                            <div id="container${counter}"
                                                class="flex  relative item-center justify-center  text-xs lg:text-sm ">
                                                <input type="hidden" id="inv_productId${counter}"
                                                    value="${producto.id}">

                                                    <!-- nombre del product -->
                                                <div
                                                    class="flex w-full pr-4 flex-inline  text-center py-1 px-2 font-bold border border-gray-500">
                                                    <span
                                                        class="font-bold text-gray-700 flex flex-inline  self-center justify-center   w-full"><span
                                                            id="prodInfo${counter}"
                                                            class="font-bold text-gray-700 grow "> Tomate de Arbol
                                                        </span>
                                                        <input type="hidden" id="inv_productName${counter}"
                                                            value="   ${producto.nombre} ${producto.variante}">
                                                    </span>
                                                </div>

                                                <!-- stock actual -->
                                                <div
                                                    class="flex w-full pr-3 flex-inline text-center   py-1 px-0 font-bold border border-gray-500">
                                                    <span
                                                        class="font-bold text-gray-700 self-center flex flex-inline  w-full"><span
                                                            class="ml-3"> 30 </span> - Kilogramos </span>
                                                </div>

                                                <!-- nuevas cantidaes -->
                                                <div
                                                    class="flex w-full flex-inline align-center  text-center  pl-0 pr-5   mx-auto items-center justify-center text-center py-1 px-2 font-bold border border-gray-500">
                                                    <span data-index="${counter}"
                                                        class="font-bold text-gray-700  flex flex-inline    w-full">
                                                        <input type="number"
                                                            class="text-center w-20 p-0   align-center mt-1  inputQuantityInv  "
                                                            id="inv_newQuantity${counter}" value="10"> <span
                                                            class="align-center justify-self-center mt-1"> Kilogramos
                                                        </span> </span>
                                                </div>
<!-- cantidad total -->
                                                <div
                                                    class="flex w-full flex-inline  text-center   py-1 px-0 font-bold border border-gray-500">
                                                    <span
                                                        class="font-bold text-gray-700 self-center flex flex-inline  w-10/10 ">
                                                        <input type="button" id="inv_totalQuantity" value="">
                                                        <span id="inv_totalQuantityText" class="ml-3 text-center ">
                                                            40 -
                                                        </span>
                                                        kilogramos</span>
                                                </div>
                                                <!-- observacions -->
                                                <div
                                                    class="flex w-full flex-inline  text-center   py-1 px-0 font-bold border border-gray-500">
                                                    <textarea
                                                        class="text-center text-sm  w-full  align-end self-align-end text-wrap    text-gray-700  w-2/3 "
                                                        id="inv_comments" value=""
                                                        placeholder="producto en estado ..."></textarea>
                                                    </textarea>
                                                </div>
                                                <!-- acciones -->
                                                <div
                                                    class="flex w-full  flex-inline  text-center   py-1 px-0 font-bold border border-gray-500">
                                                    <span
                                                        class="font-bold text-gray-700 opacity-50 hover:opacity-100  self-center w-full">
                                                        <butto onclick="user.dropProductFromBill('jnose')"
                                                            class="btn btn-outline  rounded border rounded-full bg-red-500 hover:scale-110  hover:shadow-lg tranform duration-300 hover:text-red-100  hover:border-3 hover:border-blue-500   ease-in-out text-white  btn-danger">
                                                            <svg width="20px" height="20px" viewBox="0 0 24 24"
                                                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                                    stroke-linejoin="round"></g>
                                                                <g id="SVGRepo_iconCarrier">
                                                                    <path
                                                                        d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                                                                        stroke="#ffffff" stroke-width="2"
                                                                        stroke-linecap="round" stroke-linejoin="round">
                                                                    </path>
                                                                </g>
                                                            </svg>
                                                        </butto>
                                                    </span>
                                                </div>
                                            </div>
