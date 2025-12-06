// EVENTO PARA SUBMITER EL FORMULARIO DE EDITAR DATOS DEL USUSARIO 
$('#set_formUpdateData').on('submit', (formUpdateUserData) => {
    formUpdateUserData.preventDefault();

    user.updateUserData();

});


// EVENTO PÄRA LA BUSQUEDA DE PRODUCTOS
var dropdown = document.getElementById('popover-1');
let input = document.getElementById('productSearchBar');
let inputMobile = document.getElementById('productSearchBarForMobile');

input.addEventListener('click', () => {
    // dropdown.classList.add('show');
    document.getElementById('btnOpenPopover').click();

    input.length == 0
        ? document.getElementById('btnOpenPopover').click()
        : null;
   
});


$("#formPasswordChange_account").on('submit', (e) => {
    e.preventDefault();

    let pass = $("#password_account").val();
    let passConfirm = $("#pass_input_rep").val();

    try {
        if (pass == passConfirm) {
            if (user.checkPassword(pass)) {

                user.changePassword(pass);
            } else {
                throw new Error("La contraseña debe tener al menos 6 caracteres, incluyendo números, letras y un signo especial.");

            }
        } else {
            throw new Error("las contraseñas no coinciden ")
        }
    } catch (error) {
        WebPage.showErrorModal(error);
        // ev.showErrorModal(error);
    }


    // verificamos que ambas contraseñas coincidan y luego sean minimamente seguras 

})

// evento para buscar los productos
input.oninput = async () => {
    // buscar los productos y los renderiza en la pantalla confirminput.oninput = async () => {
    let escrito = input.value;

    if (escrito.length >= 0) {
        // Muestra la pantalla de carga
        // Inventary.showLoadingModal();
        console.log("buscando productos especificos")
        let container = document.getElementById("resultsforProducxts");
        // contnedor d elos errores
        let errorContainer = document.getElementById('errorBannerContainer');
        try {
            let data = '';
            escrito.length != 0
                ? data = await user.searchProductsInSearchedBuffer(escrito)
                : data = web.productsForSearch;

            console.log(`se consigui hallar el sieguiente producto ${JSON.stringify(data)}`);
            container.innerHTML = '';

            // Renderiza los resultados o limpia el contenedor si no hay coincidencias
            // cuando si hay datos
            // verfica que accion se requiere para asi cambiar un parametro del botn de inyectar

            if (data.length != 0) {
                errorContainer.innerHTML = ``;

                data.forEach(producto => {
                    let singularMeasurement = web.searchSingularMeasurement(producto.medidaVenta) != null
                        ? web.searchSingularMeasurement(producto.medidaVenta)
                        : producto.medidaVenta;
                    // en caso de  que es lo que se le quiere inyectar la informacioon de los productos , ejemplo  facturas o diario
                    console.log("asignando los resultados de la busqueda");
                    // renderizado de los productos
                    container.innerHTML += `
<div class="bg-white m-0 rounded-2xl hover:scale-105  transform  duration-300   shadow-md overflow-hidden flex flex-col w-100 max-w-md">
                    <!-- Product Image Container -->
                    <div class="relative w-8/10 h-40 bg-gray-100 rounded-t-2xl overflow-hidden">
                        <!-- Gray rounded square -->
                        <div class="absolute inset-0 m-5 bg-gray-200 rounded-lg flex items-center justify-center">
                            <!-- Product Image (centered within the gray square) -->
                            <img id="img${producto.id}"  class="w-8/10 h-8/10 object-contain p-1" src="${producto.rutaImagen}" alt="${producto.nombre}">
                        </div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="p-2 flex-grow">
                        <div class="flex justify-between items-start">
                            <!-- Price -->
                            <span class="text-md font-bold text-red-500">$ ${web.addPuntuaction(producto.precio)}   </span>
                            
                            <!-- Favorite Icon <div class="border rounded-full">40</div -->
                            
                        </div>
                        <!-- Red horizontal line -->
                        <div class="border-t border-red-500 my-2"></div>
                        
                        <!-- Product Name -->
                        <h3 class="text-md font-medium mt-1 text-gray-800">${producto.nombre} ${producto.subCategoria} x ${producto.cantidad} ${singularMeasurement}</h3>
                        
                       
                        <!-- Unit -->
                        <p class="text-gray-500 text-sm" id="unit${producto.id}"></p>

                        
                          <!--product state -->
                        <div id="productStateContainer${producto.id}">
                            <span> quedan <strong class="hover:text-green-500">34 </strong><span class="hover:text-green-400">kilos</span></span>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="px-2 pb-2 flex space-x-2">
                        <button id="b_btn${producto.id}"  onclick="user.addProductToShoppingCart(${producto.id},${producto.estadoID})"  class="flex-1   text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                            Agregar
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
                                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                            </svg>
                        </button>
                      
                    </div>
                </div>
                    
                    `;

                    // aca pone el estado del pedido
                    if (producto.estadoID == 3) {
                        // el texto de quedan 2  de litros ejemplo
                        $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);
                        console.log("seteando botones");
                        $(`#productStateContainer${producto.id}`).html('');
                        $(`#b_btn${producto.id}`).addClass('color-sena hover:bg-green-700');

                    } else if (producto.estadoID == 6) {
                        $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);

                        $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-warning text-white hover:text-red-400">${producto.estado} </div>`);

                        $(`#b_btn${producto.id}`).addClass('color-sena hover:bg-green-700');
                    } else if (producto.estadoID == 5) {
                        $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-error text-white hover:text-yellow-800">${producto.estado}</div>`);
                        // $(`#btn${producto.id}`).prop('disabled', true);
                        $(`#b_btn${producto.id}`).removeClass('color-sena hover:bg-green-700');
                        $(`#b_btn${producto.id}`).addClass('bg-gray-600 hover:bg-gray-700');

                        // imagen semitransparente 

                        $(`#img${producto.id}`).addClass('opacity-50');
                    }
                });
            } else { }

        } catch (error) {
            console.error(error);
            container.innerHTML = ``;
            // aca muestra que no encontro ninugn producto

            errorContainer.innerHTML = `<div colspan="4" role="alert" class="alert  mx-auto mt-10 mb-10  w-full alert-error">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-2xl text-white">${error}</span>
                      </div> `;

            // $("#productsInBillSearch").removeClass("lg:grid-cols-3");

        } finally {
            console.error("pase por el finaley");;;;;;;
            // Oculta la pantalla de carga después de completar la operación
            // Inventary.hideLoadingModal();
        }
    } else {
        // console.log("hora de mostrar que nada encontrre ");
        // container.innerHTML = `<div colspan="4" role="alert" class="alert  mx-auto mt-10 mb-10  w-full alert-error">
        //                     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        //                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        //                 </svg>
        //                 <span class="text-2xl text-white">Lo siento 😥 no encontre ningun producto  apartir del nombre que digitaste</span>
        //                 </div> `;
    }
};

// esta es la busqueda para moviles 
inputMobile.oninput = async () => {
    // buscar los productos y los renderiza en la pantalla confirminput.oninput = async () => {
    let escrito = inputMobile.value;

    if (escrito.length >= 0) {
        // Muestra la pantalla de carga
        // Inventary.showLoadingModal();
        console.log("buscando productos especificos")
        let container = document.getElementById("mobile_searchedProducts");
        // contnedor d elos errores
        let errorContainer = document.getElementById('mobile_searchedProducts');
        try {
            let data = '';
            escrito.length != 0
                ? data = await user.searchProductsInSearchedBuffer(escrito)
                : data = web.productsForSearch;

            console.log(`se consigui hallar el sieguiente producto ${JSON.stringify(data)}`);
            container.innerHTML = '';

            // Renderiza los resultados o limpia el contenedor si no hay coincidencias
            // cuando si hay datos
            // verfica que accion se requiere para asi cambiar un parametro del botn de inyectar

            if (data.length != 0) {
                errorContainer.innerHTML = ``;

                data.forEach(producto => {
                    let singularMeasurement = web.searchSingularMeasurement(producto.medidaVenta) != null
                        ? web.searchSingularMeasurement(producto.medidaVenta)
                        : producto.medidaVenta;
                    // en caso de  que es lo que se le quiere inyectar la informacioon de los productos , ejemplo  facturas o diario
                    console.log("asignando los resultados de la busqueda");
                    // renderizado de los productos
                    container.innerHTML += `
<div class="bg-white m-0 rounded-2xl hover:scale-105  transform  duration-300 mx-auto  shadow-md overflow-hidden flex flex-col w-80 max-w-md">
                    <!-- Product Image Container -->
                    <div class="relative w-8/10 h-40 bg-gray-100 rounded-t-2xl overflow-hidden">
                        <!-- Gray rounded square -->
                        <div class="absolute inset-0 m-5 bg-gray-200 rounded-lg flex items-center justify-center">
                            <!-- Product Image (centered within the gray square) -->
                            <img id="img${producto.id}"  class="w-6/10 h-6/10 object-cover  p-1" src="${producto.rutaImagen}" alt="${producto.nombre}">
                        </div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="p-1 flex-grow">
                        <div class="flex justify-between items-start">
                            <!-- Price -->
                            <span class="text-md font-bold text-red-500">$ ${web.addPuntuaction(producto.precio)}   </span>
                            
                            <!-- Favorite Icon <div class="border rounded-full">40</div -->
                            
                        </div>
                        <!-- Red horizontal line -->
                        <div class="border-t border-red-500 my-2"></div>
                        
                        <!-- Product Name -->
                        <h3 class="text-md font-medium mt-1 text-gray-800">${producto.nombre} ${producto.subCategoria} x ${producto.cantidad} ${singularMeasurement}</h3>
                        
                       
                        <!-- Unit -->
                        <p class="text-gray-500 text-sm" id="unit${producto.id}"></p>

                        
                          <!--product state -->
                        <div id="productStateContainer${producto.id}">
                            <span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="px-2 pb-2 flex space-x-2">
                        <button id="b_btn${producto.id}"  onclick="user.addProductToShoppingCart(${producto.id},${producto.estadoID})"  class="flex-1   text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                            Agregar
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
                                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                            </svg>
                        </button>
                      
                    </div>
                </div>
                    
                    `;

                    // aca pone el estado del pedido
                    if (producto.estadoID == 3) {
                        // el texto de quedan 2  de litros ejemplo
                        $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);
                        console.log("seteando botones");
                        $(`#productStateContainer${producto.id}`).html('');
                        $(`#b_btn${producto.id}`).addClass('color-sena hover:bg-green-700');

                    } else if (producto.estadoID == 6) {
                        $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);

                        $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-warning text-white hover:text-red-400">${producto.estado} </div>`);

                        $(`#b_btn${producto.id}`).addClass('color-sena hover:bg-green-700');
                    } else if (producto.estadoID == 5) {
                        $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-error text-white hover:text-yellow-800">${producto.estado}</div>`);
                        // $(`#btn${producto.id}`).prop('disabled', true);
                        $(`#b_btn${producto.id}`).removeClass('color-sena hover:bg-green-700');
                        $(`#b_btn${producto.id}`).addClass('bg-gray-600 hover:bg-gray-700');

                        // imagen semitransparente 

                        $(`#img${producto.id}`).addClass('opacity-50');
                    }
                });
            } else { }

        } catch (error) {
            console.error(error);
            container.innerHTML = ``;
            // aca muestra que no encontro ninugn producto

            errorContainer.innerHTML = `<div colspan="4" role="alert" class="alert  mx-auto mt-10 mb-10  w-full alert-error">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="text-2xl text-white">${error}</span>
                      </div> `;

            // $("#productsInBillSearch").removeClass("lg:grid-cols-3");

        } finally {
            console.error("pase por el finaley");;;;;;;
           
        }
    } else {
        
    }
};