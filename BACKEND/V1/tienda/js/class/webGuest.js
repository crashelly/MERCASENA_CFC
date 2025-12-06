/**
 * WebPage clase para la pagina web
 */

class WebGuest {

    constructor(parameters) {
        // this.controllerProductosUrl= "http://10.2.17.164/mercasena/app/controllers/Product.php";
        // this.ServerIp = "http://192.168.1.34";
        // this.ServerIp = "http://10.2.21.178";


        // this.runConfig();
        this.ServerIp = "https://zensoftwares.website";
        // this.ServerIp = "http://192.168.1.34";
        // this.ServerIp = "http://192.168.137.187";
        // this.ServerIp = "http://192.168.205.194";
        // this.ServerIp = "http://192.168.124.194"
        this.controllerProductosUrl = `${this.ServerIp}/mercasena/app/Controllers/Product.php`;
        // this.controllerProductosUrl = `${this.ServerIp}/app/controllers/Product.php`;
        /**
         * es la url principal de consulta
        */
        this.baseUrl = `${this.ServerIp}/mercasena/app/Controllers/`;
        this.firstCategory = [];
        this.Data = [];
        this.CategoriesContainer = document.getElementById("carousele-categories");
        this.carousel = document.getElementById("carousel");
        this.shoppingCar = {
            ShowModal: {},
            form: {

            },
            collection: []
        }
        this.productsBuffer = [];
        this.productsBufferForSearch = [];
        this.loginModal = {
            showModal: () => { loginModal.showModal() }
        }
        console.log("renderizando las imagenes del  banner")
        console.log("clase creada exitosamente");
        console.log("ajustando configuracion");

    }
    /**
    * pone los puntos de miles
    */
    addPuntuaction(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    /**
         * obtiene informacion sobre las medidas que se van a usar
         */
    async getMeasurementData() {
        return new Promise((resolve, reject) => {
            this.getDataFromServer({
                controller: 'mercasena.php',
                action: 'getMeasurementsInfo',
                method: 'GET'
            })
                .then((data) => {
                    console.log(data);

                    // data.forEach(measurement =>{

                    // })
                    this.measurementsData = data;
                    resolve();
                })
                .catch((error) => {
                    reject(error)
                    Inventary.showErrorModal('no se pudieron obtener informacion sobre las medidas')
                });
        })

    }
    /**
     * busca las medidas en singular
     * @param {*} measurementName nombre de la medida a buscar en plural
     */
    searchSingularMeasurement(measurementName) {
        let measurement = this.measurementsData.filter(object => object.plural.toLowerCase() == measurementName.toLowerCase());

        // console.log(measurement+'tamaño de el buffer d emedidas'+this.measurementsData.length); 
        //   console.error(`${measurement}`);
        if (measurement.length > 0) {
            // console.log(measurement[0].singular);
            return measurement[0].singular;
        } else {

            // console.log("No se encontró coincidencia");
            return null;
        }
    }
    // parte de las funciones basicas de la pagina
    showDivMensagge(HTMLElementID) {
        let modalMessage = document.getElementById(HTMLElementID);
        modalMessage.classList.remove("hidden");
        modalMessage.innerText = HTMLelementID;
    }
    /**
     * trae informaicond e los prodcutos
     */
    getProductsInfo() {
        web.getDataFromServer({
            controller: 'Product.php',
            action: 'getInfoProductsForShop',
            method: 'GET'
        }).then((data) => {
            console.log("======= INFORMACION OBTENIDA ===============");
            web.productsForSearch = data;
            ProductsModalForMobile.showModal();
            // console.log(`nuevos datos=>${JSON.stringify(data)}`);
        });
    }
    runConfig() {
        let self = this;
        const url = new URL('config/config.json', window.location.href);
        
        $.ajax({
            url: url.href,
            // url: `${this.controllerProductosUrl}?action=getProductsByCategory&categoryId=9`,
            type: "GET",
            contentType: "application/json",
            success: function (config) {
                // asigno la direccion ip
                // self.ServerIp = config.serverIp;
                config = JSON.parse(config);
                console.log("OJO  " + config);
            },
            error: function (response) {
                // si no encuentra prodyucots y es la primera vez renderiza todos los productos
                if (response.status == 404) {
                    this.showInfoModal("algo ocurrio")
                } else {
                    showModal("No se encontro la configracion base", "error");
                }
            }
        });
    }

    /**
     * obtiene alguna informacion desde el servidor
     */
    getDataFromServer(server) {
        return new Promise((resolve, reject) => {
            $.ajax({
                // url: "http://localhost/mercasena/app/controllers/test.php",
                url: `${web.baseUrl}${server.controller}?action=${server.action}`,
                method: server.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Mercasena-Token': user.sessionHash
                },
                // envia los datos al servidor
                beforeSend: () => {
                    console.log("preparando datos");
                    // inventary.showLoadingModal();
                },
                success: (data) => {

                    // WebPage.showSuccessModal(data.mensagge);
                    resolve(data);

                },
                error: (response) => {
                    // WebPage.showErrorModal(response.error);
                    console.log(response.error);
                    reject(response.error);
                }

            })
        });

    }
    /**
     * quita la s de las ultimas palabras
     */
    static deleteWordFinishedWIthS(text) {
        return text.split(' ').map(word => word.endsWith('s') ? word.slice(0, -1) : word).join(' ');
    }
    // parte de los modales 

    // runConfig() {
    //     fetch('config/config.json').then((response) => response.json())
    //         .then(data => { console.log() });
    // }

    /**
     * @param {message} mensaje del error
     */
    async showInfoModal(mensaje) {
        let modalMessage = document.getElementById("text-modal");
        modalMessage.innerText = mensaje;
        infoModal.showModal();

    }


    /**
     * muestra en un modal la informacion de una accion exitosa
     * @param {string} mensagge 
     */
    static showSuccessModal(mensagge) {
        Swal.fire({
            icon: "success",
            title: "! Que bien ¡ ",
            text: mensagge,
            confirmButtonColor: "#4f8323",
            // footer: '<a href="#">Why do I have this issue?</a>'

        });

        // cierra el modal a los 10 segundos
        setTimeout(() => {
            Swal.close();
        }, 4000);
    }

    /**
     * muestra uin cambio o una accion confirmada en forma de un modal
     */
    showSuccessModalForInstance(mensagge) {
        $("#mensajeModalExitoForInstance").text(mensagge);

        modalExitoForInstance.showModal();
        setTimeout(function () {
            modalExitoForInstance.close();
        }, 1500);
    }
    // /**
    // * muestra un error en un modal 
    // * @param {*} mensaje mensaje que va a mostrar el modal
    // */
    // static showErrorModal(mensaje) {
    //     let modalMessage = document.getElementById("text-modalError");
    //     modalMessage.innerText = mensaje;
    //     errorModal.showModal();

    //     // cierra el modal a los 10 segundos
    //     setTimeout(() => {
    //         errorModal.close();
    //     }, 4000);
    // }
    /**
    * muestra un error en un modal 
    * @param {*} mensaje mensaje que va a mostrar el modal
    */
    static showErrorModal(mensaje) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: mensaje,
            // footer: '<a href="#">Why do I have this issue?</a>'

        });

        // cierra el modal a los 10 segundos
        setTimeout(() => {
            Swal.close();
        }, 4000);
    }
    /**
     * muestra el modal de carga
     */
    static showLoadingModal(mensaje) {
        // imprimo el texto que quiera
        $("#loader-text").text(mensaje + '...')
        modalCarga.showModal();
    }
    /**
     * esconde el modal de carga 
     */
    static hideLoadingModal() {
        modalCarga.close();
    }
    /**
    * muestra un error en un modal para la instancia
    * @param {*} mensaje mensaje que va a mostrar el modal
    */
    showErrorModalForInstance(mensaje) {
        let modalMessage = document.getElementById("text-modalErrorForInstance");
        modalMessage.innerText = mensaje;
        errorModalForInstance.showModal();

        // cierra el modal a los 10 segundos
        setTimeout(() => {
            errorModalForInstance.close();
        }, 4000);
    }


    /**
     * trae las imagenes de los baners que van a alimental al carouselee
     */
    fetchBannerImages() {
        let carousele = document.getElementById("bannerCarousele");
        $.ajax({
            url: `${this.baseUrl}mercasena.php?action=getBannerImages`,
            // url: `${this.controllerProductosUrl}?action=getProductsByCategory&categoryId=9`,
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                // renderizando los productos
                carousele.innerHTML = '';
                let counter = 1;



                // data.images.forEach(image => {

                //     console.log(image)
                // });
                data.images.forEach(image => {
                    carousele.innerHTML += `
                      
                         <div class="w-screen h-48 imagenes-contenedor  bg-gray-500  overflow-hidden">
                         <img class="w-full h-full  object-cover  md:object-fit " 
                src="${image}" alt>
                </div>
                    
                    `;
                    counter++;

                });

                //    ACXTIVANDO EL CAROULSE
                WebGuest.activateCarousele();

                // agrega una clase para poder esconder  lo de los puntos etcs
                $('.owl-nav').addClass('hidden');
                $('.owl-dots').addClass('hidden');

            },
            error: function (response) {
                // si no encuentra prodyucots y es la primera vez renderiza todos los productos
                if (response.status == 404) {
                    this.showInfoModal("algo ocurrio")
                } else {
                    showModal("No se encontraron productos", "error");
                }
            }
        });
    }
    /**
     * funcion que activa el carousele
     */
    static activateCarousele() {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            responsiveClass: true,
            animateOut: 'fadeOut',
            //default settings:
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 3,
                    nav: false
                },
                1000: {
                    items: 1,
                    nav: true,
                    loop: false
                }
            }
        })
    }


    fetchProductsByQuery() {

    }

    renderSearchedProducts(producto) {

        let searchBarContainer = '';
        searchBarContainer.innerHTML = "";
        productos.forEach(producto => {
            producto.medidaSingular = WebGuest.deleteWordFinishedWIthS(producto.medidaVenta);
            searchBarContainer.innerHTML += `
                 <div class="bg-white rounded-2xl hover:scale-110  transform  duration-300   shadow-md overflow-hidden flex flex-col w-full max-w-xs">
                    <!-- Product Image Container -->
                    <div class="relative w-full h-48 bg-gray-100 rounded-t-2xl overflow-hidden">
                        <!-- Gray rounded square -->
                        <div class="absolute inset-0 m-4 bg-gray-200 rounded-lg flex items-center justify-center">
                            <!-- Product Image (centered within the gray square) -->
                            <img id="img${producto.id}"  class="w-full h-full object-contain p-2" src="${producto.rutaImagen}" alt="${producto.nombre}">
                        </div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="p-4 flex-grow">
                        <div class="flex justify-between items-start">
                            <!-- Price -->
                            <span class="text-lg font-bold text-red-500">$ ${web.addPuntuaction(producto.precio)} </span>
                            
                            <!-- Favorite Icon <div class="border rounded-full">${producto.existencias}</div -->
                            
                        </div>
                        <!-- Red horizontal line -->
                        <div class="border-t border-red-500 my-2"></div>
                        
                        <!-- Product Name -->
                        <h3 class="text-lg font-medium mt-1 text-gray-800">${producto.nombre} ${producto.subCategoria} x ${producto.cantidad} ${producto.medidaSingular}</h3>
                        
                       
                        <!-- Unit -->
                        <p class="text-gray-500 text-sm" id="unit${producto.id}">${producto.medidaVenta}</p>

                        
                          <!--product state -->
                        <div id="productStateContainer${producto.id}">
                            
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="px-4 pb-4 flex space-x-2">
                        <button id="btn${producto.id}"  onclick="user.requestLogin();" value(${producto.id}) class="flex-1  text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
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
                // disponible
                $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);


                console.log("seteando botones");
                $(`#productStateContainer${producto.id}`).html('');
                $(`#btn${producto.id}`).addClass('bg-green-600 hover:bg-green-700');

            } else if (producto.estadoID == 6) {
                // pocas unidades                
                $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);

                $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-warning text-white hover:text-red-400">${producto.estado} </div>`);

                $(`#btn${producto.id}`).addClass('bg-green-600 hover:bg-green-700');
            } else if (producto.estadoID == 5) {
                // agotado 
                $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-error text-white hover:text-yellow-800">${producto.estado}</div>`);
                $(`#btn${producto.id}`).prop('disabled', true);
                $(`#btn${producto.id}`).removeClass('bg-green-600 hover:bg-green-700');
                $(`#btn${producto.id}`).addClass('bg-gray-600 hover:bg-gray-700');

                // imagen semitransparente 

                $(`#img${producto.id}`).addClass('opacity-50');
            }
        });
        console.log(productos);
    }

    /**
        * Consulta los productos y luego los renderiza en el grid de productos
        *@param categoryId id de la categoria
        *@param isFirstTime si es la primera vez que se renderiza la informacion de los productos
        *@generators generadores
        */

    fetchProductsByCategory(categoryId, isFirstTime) {
        let productsContainer = document.getElementById("products-container");
        console.log("ejecutando busqueda de productos");
        $.ajax({
            url: `${this.controllerProductosUrl}?action=getProductsByCategory&categoryId=${categoryId}`,
            // url: `${this.controllerProductosUrl}?action=getProductsByCategory&categoryId=9`,
            type: "GET",
            contentType: "application/json",
            success: function (productos) {
                // renderizando los productos
                productsContainer.innerHTML = "";
                productos.forEach(producto => {
                    producto.medidaSingular = web.searchSingularMeasurement(producto.medidaVenta) != null
                        ? web.searchSingularMeasurement(producto.medidaVenta)
                        : producto.medidaVenta;

                    productsContainer.innerHTML += `
                 <div class="bg-white rounded-2xl hover:scale-110  transform  duration-300   shadow-md overflow-hidden flex flex-col w-full max-w-xs">
                    <!-- Product Image Container -->
                    <div class="relative w-full h-48 bg-gray-100 rounded-t-2xl overflow-hidden">
                        <!-- Gray rounded square -->
                        <div class="absolute inset-0 m-4 bg-gray-200 rounded-lg flex items-center justify-center">
                            <!-- Product Image (centered within the gray square) -->
                            <img id="img${producto.id}"  class="w-full h-full object-contain p-2" src="${producto.rutaImagen}" alt="${producto.nombre}">
                        </div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="p-4 flex-grow">
                        <div class="flex justify-between items-start">
                            <!-- Price -->
                            <span class="text-lg font-bold text-red-500">$${web.addPuntuaction(producto.precio)}  </span>
                            
                            <!-- Favorite Icon <div class="border rounded-full">${producto.existencias}</div -->
                            
                        </div>
                        <!-- Red horizontal line -->
                        <div class="border-t border-red-500 my-2"></div>
                        
                        <!-- Product Name -->
                        <h3 class="text-lg font-medium mt-1 text-gray-800">${producto.nombre} ${producto.subCategoria} x ${producto.cantidad} ${producto.medidaSingular}</h3>
                        
                       
                        <!-- Unit -->
                        <p class="text-gray-500 text-sm" id="unit${producto.id}">${producto.medidaVenta}</p>

                        
                          <!--product state -->
                        <div id="productStateContainer${producto.id}">
                            
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="px-4 pb-4 flex space-x-2">
                        <button id="btn${producto.id}"  onclick="user.requestLogin();" value(${producto.id}) class="flex-1  text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
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
                        // disponible
                        $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);


                        console.log("seteando botones");
                        $(`#productStateContainer${producto.id}`).html('');
                        $(`#btn${producto.id}`).addClass('color-sena hover:bg-green-700');

                    } else if (producto.estadoID == 6) {
                        // pocas unidades                
                        $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);

                        $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-warning text-white hover:text-red-400">${producto.estado} </div>`);

                        $(`#btn${producto.id}`).addClass('color-sena hover:bg-green-700');
                    } else if (producto.estadoID == 5) {
                        // agotado 
                        $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-error text-white hover:text-yellow-800">${producto.estado}</div>`);
                        $(`#btn${producto.id}`).prop('disabled', true);
                        $(`#btn${producto.id}`).removeClass('color-sena hover:bg-green-700');
                        $(`#btn${producto.id}`).addClass('bg-gray-600 hover:bg-gray-700');

                        // imagen semitransparente 

                        $(`#img${producto.id}`).addClass('opacity-50');
                    }
                });
                console.log(productos);
            },
            error: function (response) {
                // si no encuentra prodyucots y es la primera vez renderiza todos los productos
                if (response.status == 404 && isFirstTime == true) {

                } else {
                    showModal("No se encontraron productos", "error");
                }
            }
        });
    }
    /**
     * consulta informacion a un endpoint(action en el servidor)
     * @param {*} action action de la cual se va a traer los datos
     * @param {*} callback funcion de renderizado que le pasara la informacion como paramtro
     */
    fetchData(action, callback) {
        self = this;
        $.ajax({
            url: `${this.controllerProductosUrl}?action=${action}`,
            // url: `${this.controllerProductosUrl}?action=getProductsByCategory&categoryId=9`,
            type: "GET",
            contentType: "application/json",

            success: function (data) {
                // renderizando los productos

                callback(self, data);
            },
            error: function (response) {
                // si no encuentra prodyucots y es la primera vez renderiza todos los productos
                if (response.status == 404) {
                    this.showInfoModal("algo ocurrio")
                } else {
                    showModal("No se encontraron productos", "error");
                }
            }
        });
    }
    /**
     * apartir de la informacion conseguida  va a renderizar el apartado de los productos
     * @param {*} productos datos que luego renderizara 
     */
    renderAllProducts(self, productos) {
        console.log("renderizando todos los productos");
        console.log(productos);
        self.productsBuffer = productos;

        // console.log(`esto es lo que encontre en el buffer => ${web.productsBuffer}`);
        // console.log(JSON.stringify(self.productsBuffer)); 
        let productsContainer = document.getElementById("products-container");
        productsContainer.innerHTML = "";
        // renderizando los productos
        let counter = 1;

        productos.forEach(producto => {
            producto.medidaSingular = web.searchSingularMeasurement(producto.medidaVenta) != null
                ? web.searchSingularMeasurement(producto.medidaVenta)
                : producto.medidaVenta;

            //    console.log("singular => "+producto.medidaSingular);
            productsContainer.innerHTML += `
                 <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-110  transform  duration-300 flex flex-col w-full max-w-xs">
                    <!-- Product Image Container -->
                    <div class="relative w-full h-48 bg-gray-100 rounded-t-2xl overflow-hidden">
                        <!-- Gray rounded square -->
                        <div class="absolute inset-0 m-4 bg-gray-200 rounded-lg flex items-center justify-center">
                            <!-- Product Image (centered within the gray square) -->
                            <img id="img${producto.id}"  class="w-full h-full object-contain p-2" src="${producto.rutaImagen}" alt="${producto.nombre}">
                        </div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="p-4 flex-grow">
                        <div class="flex justify-between items-start">
                            <!-- Price -->
                            <span class="text-lg font-bold text-red-500">$ ${web.addPuntuaction(producto.precio)} </span>
                            
                            <!-- Favorite Icon -->
                            <svg class="h-6 w-6 fill-current text-gray-400 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                            </svg>
                        </div>
                        <!-- Red horizontal line -->
                        <div class="border-t border-red-500 my-2"></div>
                        
                        <!-- Product Name -->
                        <h3 class="text-lg font-medium mt-1 text-gray-800">${producto.nombre} ${producto.subCategoria} x ${producto.cantidad} ${producto.medidaSingular}</h3>
                        
                        <!-- Unit -->
                        <p class="text-gray-500 text-sm" id="unit${producto.id}" >${producto.medidaVenta}</p>
                     
                        
                          <!--product state -->
                        <div id="productStateContainer${producto.id}">
                            
                        </div>
                     
                        </div>
                    
                    <!-- Action Buttons -->
                    <div class="px-4 pb-4 flex space-x-2">
                        <button id="btn${producto.id}"  onclick="user.requestLogin();" value(${producto.id}) class="flex-1  text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
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
                $(`#btn${producto.id}`).addClass('color-sena hover:bg-green-700');

            } else if (producto.estadoID == 6) {
                $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);

                $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-warning text-white hover:text-red-400">${producto.estado} </div>`);

                $(`#btn${producto.id}`).addClass('color-sena hover:bg-green-700');
            } else if (producto.estadoID == 5) {
                $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-error text-white hover:text-yellow-800">${producto.estado}</div>`);
                $(`#btn${producto.id}`).prop('disabled', true);
                $(`#btn${producto.id}`).removeClass('color-sena hover:bg-green-700');
                $(`#btn${producto.id}`).addClass('bg-gray-600 hover:bg-gray-700');

                // imagen semitransparente 

                $(`#img${producto.id}`).addClass('opacity-50');
            }
        });
    }


    /**
     * Consulta las categorias de productos y las muestra en el carousel correspondiente
     * 
     */
    fetchCategories() {
        // console.log(`consultando categorias ${this.controllerProductosUrl}`);
        $.ajax({
            url: `${this.controllerProductosUrl}?action=getCategories`,
            // url : "http://localhost/mercasena/app/controllers/Product.php?",
            type: "GET",
            contentType: "application/json",
            success: (categorias) => {
                let categoriesContainer = document.getElementById("carousele-categories");
                let i = 0;
                // console.log(categorias);
                categoriesContainer.innerHTML += `<div class=" carousel-item md:mr-4 md:ml-4">
                             <button id="allCategory" onclick="web.fetchData('getInfoProductsForShop', web.renderAllProducts)"    class="bg-white text-green-600 font-bold px-3 py-1 text-sm rounded-full shadow-md border border-green-400 hover:bg-green-100 badge badge-success"> todos</button>
                </div> `;
                categorias.forEach(categoria => {
                    i++;

                    // ternaria para guardar el primero id de la categoria
                    i == 1 ? this.firstCategory = categoria.id : null;

                    categoriesContainer.innerHTML += `<div class=" carousel-item mr-4 ml-4">
                                                    <button onclick="web.fetchProductsByCategory(${categoria.id},false)" class="bg-white text-green-600 font-bold px-3 py-1 text-sm rounded-full shadow-md border border-green-400 hover:bg-green-100 badge badge-success"> ${categoria.nombre}</button>
                                                </div> `;
                });
                // console.log(categorias);
                // console.log('el primer id de la categorias es ', this.firstCategory);
                // this.fetchProductsByCategory(this.firstCategory, true);
            },
            error: function (response) {
                console.error("error", response.error);
            }
        });

    }

    searchProductInBuffer() {

    }
    fetchAllProducts() {
        console.log(`consultando todos los productos ${this.controllerProductosUrl}`);
        $.ajax({
            url: `${this.controllerProductosUrl}?action=getAllProducts`,
            type: "GET",
            contentType: "application/json",
            success: (productos) => {
                productos.forEach(producto => {
                    productsContainer.innerHTML += `
                     <div class="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-full max-w-xs">
                        <!-- Product Image Container -->
                        <div class="relative w-full h-48 bg-gray-100 rounded-t-2xl overflow-hidden">
                            <!-- Gray rounded square -->
                            <div class="absolute inset-0 m-4 bg-gray-200 rounded-lg flex items-center justify-center">
                                <!-- Product Image (centered within the gray square) -->
                                <img class="w-full h-full object-contain p-2" src="${producto.rutaImagen}" alt="${producto.nombre}">
                            </div>
                        </div>
                        
                        <!-- Product Info -->
                        <div class="p-4 flex-grow">
                            <div class="flex justify-between items-start">
                                <!-- Price -->
                                <span class="text-lg font-bold text-red-500">$ ${web.addPuntuaction(producto.precio)} </span>
                                
                                <!-- Favorite Icon -->
                                <svg class="h-6 w-6 fill-current text-gray-400 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                                </svg>
                            </div>
                            <!-- Red horizontal line -->
                            <div class="border-t border-red-500 my-2"></div>
                            
                            <!-- Product Name -->
                            <h3 class="text-lg font-medium mt-1 text-gray-800">${producto.nombre} ${producto.subCategoria} x ${producto.cantidad}</h3>
                            
                            <!-- Unit -->
                            <p class="text-gray-500 text-sm">${producto.medidaVenta}</p>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="px-4 pb-4 flex space-x-2">
                            <button onclick="user.requestLogin();" value(${producto.id}) class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                Agregar
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
                                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                                </svg>
                            </button>
                            <button onclick=   class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                                Comprar
                            </button>
                        </div>
                    </div>
                    `;

                });
            },
            error: function (response) {

            }
        });
    }

    //==================== parte a implementar======================


}