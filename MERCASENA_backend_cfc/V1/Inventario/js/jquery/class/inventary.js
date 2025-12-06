
class Inventary {

    constructor(parameters) {
        // this.baseUrl = "http://localhost/mercasena/app/controllers/";
        // this.serverIp = 'http://192.168.1.41';
        // this.serverIp = 'http://192.168.137.187';
        // this.serverIp = 'http://192.168.1.34';

        // this.serverIp = "http://10.2.21.178";

        // this.serverIp = "http://192.168.1.41";
        this.serverIp = "https://zensoftwares.website";
        // this.serverIp = "http://192.168.243.194";
        // this.serverIp = "http://192.168.137.22";
        this.controllerProductosUrl = `${this.serverIp}/mercasena/app/Controllers/Product.php`;
        // this.serverIp = 'http://192.168.1.41';
        // this.serverIp = 'http://192.168.189.194';
        this.baseUrl = `${this.serverIp}/mercasena/app/Controllers/`;
        // this.baseUrl = "http://127.0.0.1/mercasena/app/controllers/";
        this.serverInfo = {
            controller: 'Product.php',
            action: undefined
        }
        // mapa de informacion de objectos para renderizar

        // =================== BUFFERS QUE CONTIENE INFORMACION ============
        /**
         * buffer que contiene la informacion de las categorias
         */
        this.categoriesBuffer = [];

        /**
        * buffer que contiene la informacion de los productos
        */
        this.productsBuffer = [];

        /**
    * buffer ue trae y guarda toidos los datos de los productos par luego verificar si estan en el rango de stock maximo
    */
        this.productsBufferForCheckStock = [];

        /**
       * buffer que contiene la informacion de las medidas
       */
        this.measurementsBuffer = [];

        /**
        * buffer que contiene la informacion de los productos base
        */
        this.baseProductsBuffer = [];
        // seccion para identificar los formularios
        /**
         * buffer que guardara informacion de los pedidos
         */
        this.OrdersBuffer = [];

        /**
         * este es el buffer para los productos de la factura
         */
        this.BillBuffer = [];

        this.dailyInvBuffer = [];

        /**
         * buffer encargado de guardar las imagenes
         */
        this.bannerImagesBuffer = [];

        /**
         * este es el buffer de ls producots buscados 
         */
        this.searchedProductsBuffer = [];

        /**
         * guarda la fecha de busqueda de las facturas
         */
        this.billDateFilter = ''
        // ============ FORMULARIOS ==========================
        /**
         * objeto que cntiene objetos que por dentro contienen su modal y su formulario de identificacion
         * @type {object}
         */
        this.forms = {
            // la variante del prducto ejemplo criolla del prducto papa
            product: {
                //    showModal: document.getElementById("formularioProducto"),
                showModal: e => {
                    // se renderizan las opciones y luego se muestra el modal
                    this.fetchDataToSelect("categoriasSelect", "Product.php", "getCategories");
                    this.fetchDataToSelect("productoSelect", "Product.php", "getAllProducts");
                    this.fetchDataToSelect("medSelect", "Product.php", "getAllMeasurements");
                    formularioProducto.showModal();
                },
                form: document.getElementById("modalFormCreateProduct")
            },
            // la base 
            baseProduct: {
                //    showModal: document.getElementById("formularioProducto"),
                showModal: e => { selectTypeOfCreationModal('producto') },
                form: document.getElementById("modalFormCreateProduct")
            },


            category: {
                // funcion de mstrar Mdal
                showModal: e => { selectTypeOfCreationModal('categoria') },
                form: document.getElementById("modalFormCreateCategory")
            },
            measurement: {
                showModal: e => { selectTypeOfCreationModal('medidaVenta') },
                // l:selectTypeOfCreationModal('categoria'),
                form: document.getElementById("modalCreacionForm")
            }
        }

        // informacion sobre el cliente
        this.customer = {
            name: '',
            phone: '',
            email: '',
            setData: (data) => {
                this.customer.name = data.name;
                this.customer.phone = data.phone;
                this.customer.email = data.email;
            },
            numberOfProductsInBill: 0,
            orderID: 0
        }
        this.addButton = document.getElementById("addButton");
        this.Data = [];
        this.CategoriesContainer = document.getElementById("carousele-categories");
        this.carousel = document.getElementById("carousel");
        // tiempo de espera para que desaparescan los mensajes
        this.mensaggeWaitTime = 120000;
        console.log("clase creada exitosamente");
        this.table = document.getElementById("information-table");
        this.theadOptions = document.getElementById("theadOptions");
        this.tbody = document.getElementById("tbodyData");


        this.sectionateData = [];
        this.lastIndexOfSectionateData = "";

        // super(parameters);
        // console.log(this);
        /**
         * este son los datos del producto ovjetivo el cual va a ser editado
         */
        this.targetEditionProduct = {};



        // atributo de banner
        this.banner = {
            uploadPhoto: (formData) => {
                return new Promise((resolve, reject) => {


                    // if (!imageFile) {
                    //     alert("Por favor selecciona una imagen.");
                    //     return;
                    // }

                    // console.log(formData);
                    //    `${inventary.baseUrl}test.php`

                    Inventary.showLoadingInmutableModal('enviando iamgen publicitaria al servidor')
                    fetch(`${inventary.baseUrl}mercasena.php`, {
                        // fetch(`${inventary.baseUrl}Test.php`, {
                        method: "POST",
                        headers: {
                            'Mercasena-Token': this.sessionHash,
                            'X-CSRF-token': this.token
                        },
                        body: formData
                    })
                        .then(response => {

                            return response.json();
                        })
                        .then(data => {
                            Inventary.hideLoadingInmutableModal();
                            console.log(data);

                            // aca es para pescar porque no se pórquie me devuelve el erroc uando se hace bien la request
                            if ('error' in data) {
                                reject(data.error);
                            } else {
                                resolve(data.mensagge);
                            }
                            resolve(data.mensagge);
                            // console.log("Imagen cargada con éxito");
                        })
                        .catch(error => {
                            Inventary.hideLoadingInmutableModal();
                            reject(error);
                            console.error("Error al cargar la imagen:", error);
                        });
                });
            }
        }
    }
    /**
     * pone los puntos de miles
     */
    addPuntuaction(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    /**
     * busca productos y los guarda en el buffer
     */
    searchProductosInfoForBuffer() {
        // busca la informacion y setea el input a vacio
        $("#productSearchBarForMobile").val('');
        inventary.getDataFromServerV2({
            endpoint: 'Product.php',
            action: `getInfoProductsForAdmin`
            // action: `getProductInfoForMinimalStock`
        }, null).then((data) => {
            // inventary.renderBills(data);
            inventary.searchedProductsBuffer = data;
            ProductsModalForMobile.showModal();
        });
    }
    /**
     * cierra el modal despues de un determinado tiempo
     * @param {function} modal funcion que cierra el modal
     * @param {number} time tiempo en milisegundos
     */
    static closeModal(modal, time = 3000) {
        setTimeout(() => {
            modal;
        }, time);
    }

    // parte de los modales 
    /**
     * muestra alguna informacion en un modal
     * @param {message} mensaje del error
     */
    static showInfoModal(mensaje) {
        let modalMessage = document.getElementById("text-modalInfo");
        modalMessage.innerText = mensaje;
        infoModal.showModal();

        // cierra el modal a los 10 segundos
        setTimeout(() => {
            infoModal.close();
        }, 10000);
    }


    /**
     * muestra alguna accion que tuvo exito en un modal
     * @param {*} message  mensaje
     */
    static showModalSucces(message) {

        Swal.fire({
            icon: "success",
            title: "!Que bien !",
            text: message,
            confirmButtonColor: "#4f8323",
            // footer: '<a href="#">Why do I have this issue?</a>'

        });

        // cierra el modal a los 10 segundos
        setTimeout(() => {
            Swal.close();
        }, 4000);

    }

    /**
     * muestra un error en un modal 
     * @param {*} mensaje mensaje que va a mostrar el modal
     */
    static showErrorModal(mesagge) {
        // let modalMessage = document.getElementById("text-modalErrorR");
        // $(`#text-modalErrorR`).text(mensaje);
        // modalMessage.innerText = mensaje;
        // infoModal.showModal();

        // // cierra el modal a los 10 segundos
        // setTimeout(() => {
        //     infoModal.close();
        // }, 10000);
        Swal.fire({
            icon: "error",
            title: "ERROR",
            text: mesagge,
            confirmButtonColor: "#f31511",
            // footer: '<a href="#">Why do I have this issue?</a>'

        });

        // cierra el modal a los 10 segundos
        setTimeout(() => {
            Swal.close();
        }, 10000);
    }


    // ============ FIN DE LOS MODALES =================
    /**
     * muestra el icono de carga
     */
    static showLoadingModal() {
        // document.getElementById("loadingContainerModal").innerHTML = `
        //         <span class="loading loading-spinner text-accent"></span>
        // `;LoadingModal
        loadingModal.showModal();
    }
    /**
     * muestra el modal 
     * @param {*} mensagge  mensaje  de accion del modal
     */
    static showLoadingInmutableModal(mensagge) {
        // document.getElementById("loadingContainerModal").innerHTML = `
        //         <span class="loading loading-spinner text-accent"></span>
        // `;LoadingModal
        $('#modalLoadingAction').text(mensagge);
        LoadingModalInmutable.showModal();
    }

    /**
     * esconde el modal de carga
     */
    static hideLoadingModal() {
        // document.getElementById("btnLoadingModal").click  = true;
        loadingModal.close();
    }

    /**
     * esconde el modal que no se puede quitar
     */
    static hideLoadingInmutableModal() {
        // document.getElementById("btnLoadingModal").click  = true;
        LoadingModalInmutable.close();
    }

    // parte de las funciones basicas de la pagina
    /**
     * interfaz para mostrar algun mensaje
     */
    static showDivMensagge(HTMLElements, message) {
        let modalMessage = document.getElementById(HTMLElements[0]);
        let spanHTML = document.getElementById(HTMLElements[1]);
        spanHTML.innerText = message;
        modalMessage.classList.remove("hidden");

        setTimeout(() => {
            modalMessage.classList.add("hidden");
        }, this.mensaggeWaitTime);
    }




    /**
   * muestra en una seccion de la pantalla una advertencia
   * @param {*} message  mensaje de advertencia
   */
    static showInfoMensagge(message) {
        let ID = 'succesDivMenssage';
        let span = "infoText";
        Inventary.showDivMensagge([ID, span], message);
    }
    /**
     * muestra en una seccion de la pantalla una advertencia
     * @param {*} message  mensaje de advertencia
     */
    static showWarningMensagge(message) {
        let ID = 'warningDivMenssage';
        let span = "warningText";
        this.showDivMensagge([ID, span], message);
    }
    /**
     * muestra en una seccion de la pantalla un error
     * @param {*} message  mensaje del error
     */
    static showErrorMensagge(message) {
        let ID = 'errorDivMenssage';
        let span = "errorText";
        this.showDivMensagge([ID, span], message);
    }

    // ================================================
    // apartado para ver todas las funciones de low stockProducto

    deleteDataFromServer(request, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                // url: "http://localhost/mercasena/app/controllers/test.php",
                url: `${inventary.baseUrl}${request.endpoint} `,
                method: "DELETE",
                headers: {
                    'Mercasena-Token': user.sessionHash,
                    'X-CSRF-token': user.token
                },
                // envia los datos al servidor
                data: JSON.stringify({
                    action: request.action,
                    dataObject: data

                }),
                beforeSend: () => {
                    console.log("preparando datos");
                    Inventary.showLoadingInmutableModal('enviando datos al servidor  ...');
                },
                success: (data) => {
                    // muestra el modal con el mensaje
                    // Inventary.hideLoadingInmutableModal();
                    // Inventary.showModalSucces(data.mensagge);   // Inventary.hideLoadingInmutableModal();
                    // Inventary.showModalSucces(data.mensagge);
                    resolve(data);

                },
                error: (response) => {
                    reject(response);
                    // Inventary.hideLoadingInmutableModal();
                    // Inventary.showWarningMensagge(response.error);
                }

            })
        })

    }

    // ===================APARTADO DE FACTURAS======================================

    /**
     * filtra las facturas por la fecha 
     * @param {string} date fech  de la cuañ se hara el filtraje
     * 
     */
    fetchBillsByDate(date) {
        let requestProduct = {
            id: null
        }
        let shouldFilterDateAndClientName = $("#check_searchBills").is(':checked');
        // verifica si el boton de check esta prendido para hacer la consulta
        if (shouldFilterDateAndClientName) {
            this.billDateFilter = date;
        } else {
            inventary.getDataFromServerV2({
                endpoint: 'Bill.php',
                action: `getBillsByDate&BillDate=${date}`
                // action: `getProductInfoForMinimalStock`
            }, requestProduct).then((data) => {
                inventary.renderBills(data);
            });
        }


    }
    renderLoadingIconInBill() {
        let ordersContainer = document.getElementById('billCardContainers_');

        ordersContainer.innerHTML = `<span class="loading loading-xl  loading-spinner text-success"></span>`;

    }
    /**
           * renderiza la informacion de las facturas
           * @param {object} data datos del todos los pedidos realizados
           * @param {bool} isResultNotFound boleano que verifica si en la consulta se trajero  datos
           */
    renderBills(data, isResultNotFound = false) {
        // mostrando el modal de carga
        // WebPage.showLoadingModal('cargando tus comprobantes de venta...');
        let ordersContainer = document.getElementById('billCardContainers_');
        console.log(data);
        //   reseteamos el contenedor parta que no se acumulen las rendizaciones
        ordersContainer.innerHTML = '';
        //   contador o indexador  me sirve poara renderizar dentro de un contenedor en especifico
        let counter = 1;

        if (data.length > 0) {
            data.forEach(factura => {
                ordersContainer.innerHTML += `
            <div class="p-2 sm:w-1/2 w-full">
            <div class="bg-gray-100 rounded flex p-5 h-full items-center">
              <svg fill="#000000" class="w-6 h-6  md:w-10 md:h-10" width="0px" height="0px" viewBox="0 0 24 24"
                id="bill-dollar-left" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path id="secondary"
                    d="M18,3H10A8.48,8.48,0,0,1,5,18v3l2.33-1,2.33,1L12,20l2.34,1,2.33-1L19,21V4A1,1,0,0,0,18,3Z"
                    style="fill: #2ca9bc; stroke-width: 2;"></path>
                  <path id="primary"
                    d="M5,13H7.5A1.5,1.5,0,0,0,9,11.5H9A1.5,1.5,0,0,0,7.5,10h-1A1.5,1.5,0,0,1,5,8.5H5A1.5,1.5,0,0,1,6.5,7H9"
                    style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </path>
                  <path id="primary-2" data-name="primary" d="M7,7V6m0,8V13m5,2h3m-2-4h2"
                    style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </path>
                  <path id="primary-3" data-name="primary"
                    d="M5,18v3l2.33-1,2.33,1L12,20l2.34,1,2.33-1L19,21V4a1,1,0,0,0-1-1H10"
                    style="fill: none; stroke: #000000; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;">
                  </path>
                </g>
              </svg>
              <div class=" ml-4 flex-row flex">
                <div class="col">
                  <span
                    class="flex col transition items-center justify-center  text-sm md:text-lg hover:text-gray-100 hover:bg-yellow-400 duration-300 rounded-lg transition-colors ease-in-out   bg-base-100 bg-opacity-25">${factura.fecha}</span>
                  <span
                    class="flex col mt-1  text-sm md:text-lg hover:text-green-400 font-bold duration-300 transition  uppercase">${factura.cliente}</span>
                  <span class="flex col mt-6"><span
                      class="font-bold rounded-lg hover:bg-green-400 duration-300 transition-colors  hover:text-orange  ease-in-out mr-4 text-center  w-6">${factura.cantProductos}</span>
                    productos</span>
                  <div class="divider divider-success"></div>
                  <span class="flex col">Total:<span class="ml-12 self-end font-bold"> $${factura.total}</span></span>
                </div>
                <div class="divider col  divider-success"></div>
                <div
                  class="flex overflow-visible  justify-center md:justify-end  md:justify-center  items-center  pr-0   divide-x rounded-lg flex-col md:flex-col-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700">

                  <!-- drodown de opciones -->
                  <div class="dropdown z-100 items-center overflow-visible justify-center  dropdown-top">
                    <div tabindex="0" role="button" class="btn m-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                        <path fill="currentColor"
                          d="M256 144a64 64 0 1 0-64-64a64.072 64.072 0 0 0 64 64Zm0-96a32 32 0 1 1-32 32a32.036 32.036 0 0 1 32-32Zm0 320a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Zm0-272a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Z" />
                      </svg>
                    </div>

                    <ul tabindex="0"
                      class=" ml-2 dropdown-content h-100 overflow-visible menu bg-base-100 rounded-box z-1 w-30 justify-center   items-aling-center p-2 shadow-sm">
                      
                      <!-- el de ver imprimir la factura  -->
                      <li class="py-4 ">
                        <button
                          class="transition delay-150 duration-300 ease-in-out hover:rotate-45  hover:-translate-y-1 flex-grow  hover:scale-110 hover:bg-indigo-500"
                          onclick="inventary.configBillPreviewToPrint(${factura.id})">
<svg  viewBox="0 0 24 24" class="w-5 h-5 sm:w-6 sm:h-6"  fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 18H6.2C5.0799 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V10.2C3 9.0799 3 8.51984 3.21799 8.09202C3.40973 7.71569 3.71569 7.40973 4.09202 7.21799C4.51984 7 5.0799 7 6.2 7H7M17 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V10.2C21 9.07989 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H17M7 11H7.01M17 7V5.4V4.6C17 4.03995 17 3.75992 16.891 3.54601C16.7951 3.35785 16.6422 3.20487 16.454 3.10899C16.2401 3 15.9601 3 15.4 3H8.6C8.03995 3 7.75992 3 7.54601 3.10899C7.35785 3.20487 7.20487 3.35785 7.10899 3.54601C7 3.75992 7 4.03995 7 4.6V5.4V7M17 7H7M8.6 21H15.4C15.9601 21 16.2401 21 16.454 20.891C16.6422 20.7951 16.7951 20.6422 16.891 20.454C17 20.2401 17 19.9601 17 19.4V16.6C17 16.0399 17 15.7599 16.891 15.546C16.7951 15.3578 16.6422 15.2049 16.454 15.109C16.2401 15 15.9601 15 15.4 15H8.6C8.03995 15 7.75992 15 7.54601 15.109C7.35785 15.2049 7.20487 15.3578 7.10899 15.546C7 15.7599 7 16.0399 7 16.6V19.4C7 19.9601 7 20.2401 7.10899 20.454C7.20487 20.6422 7.35785 20.7951 7.54601 20.891C7.75992 21 8.03995 21 8.6 21Z" stroke="#6600ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                          </button>
                      </li>
                      
                      <!-- el de ver factura  -->
                       <li class="justify-center gap-2  w-full hover:bg-gray-200 ">
                        <button
                          class="transition delay-150 duration-300 ease-in-out hover:rotate-45  hover:-translate-y-1 flex-grow  hover:scale-110 hover:bg-indigo-500"
                          onclick="inventary.showBillPreview(${factura.id})">
                          <svg width="0px" height="0px" class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                                stroke="#30c555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                              <path
                                d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                                stroke="#30c555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </g>
                          </svg>
                        </button>
                      </li>
                     

                      <!-- el de descargar -->
                      <li class="py-4">
                        <input type="hidden" value="" id="my-modal-3" class="modal-toggle" />
                        <button onclick="user.RequestDownloadBill(${factura.id})">
                          <svg width="0px" height="0px" class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                              <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z"
                                fill="#000000"></path>
                            </g>
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              <div>
              


              </div>
            </div>
          </div>

            `;
            });
        } else {
            ordersContainer.innerHTML = `
<div colspan="2" role="alert" class="alert w-full hover:scale-110 transform ease-in-out duration-300  alert-warning">
  <svg  xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 animate-bounce  stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
  <span class="text-lg text-white">Advertencia: Comprobante de venta no encontrado</span>
</div>
`;
        }


        // // cierra el modald e carga
        // WebPage.hideLoadingModal();
        // BillModal.showModal();



    }

    // ===================APARTADO DE FACTURAS======================================

    /**r
   * muestra la previsualizacion de la factura
   * @param {*} billID id del pedido a previsualizar
   */
    showBillPreview(billID) {
        this.getDataFromServerV2({
            endpoint: "Bill.php",
            action: "getBillByIDForAdmin&billID=" + billID,

        }).then((data) => {
            // mostrando el objeto de pedidos
            console.log(data[0]);
            console.log("renderizando tabla");
            this.renderPrevBill(data[0]);
            // let datos  = JSON.parse(data.pedi_info);
            // console.log(datos);
        })
    }
    /**r
  * muestra la previsualizacion de la factura para imprimirla 
  * @param {*} billID id del pedido a previsualizar
  */
    configBillPreviewToPrint(billID) {
        this.getDataFromServerV2({
            endpoint: "Bill.php",
            action: "getBillByIDForAdmin&billID=" + billID,

        }).then((data) => {
            // mostrando el objeto de pedidos
            console.log(data[0]);
            console.log("renderizando tabla");
            this.printBill(data[0]);
            // let datos  = JSON.parse(data.pedi_info);
            // console.log(datos);
        })
    }

    /**
        * renderiza la informacion de la factura en una previsualizacion
        */

    renderPrevBill(factura) {

        // guardamos la informacion en un json
        // let data = JSON.parse(factura);
        // guardamo en cache la informaicon
        localStorage.setItem('bill', JSON.stringify(factura));
        const url = 'comprobante.html'; // Puedes cambiar esto a la URL que desees abrir
        const windowName = 'CustomWindow';
        // const windowFeatures = 'width=1920,height=1080';
        const windowFeatures = 'width=800,height=800';

        window.open(url, windowName, windowFeatures);



    }
    /**
     * imprime la factura
     */
    printBill(factura) {

        // guardamos la informacion en un json
        // let data = JSON.parse(factura);
        // guardamo en cache la informaicon
        localStorage.setItem('bill', JSON.stringify(factura));
        const url = 'imprimir.html'; // Puedes cambiar esto a la URL que desees abrir
        const windowName = 'CustomWindow';
        // const windowFeatures = 'width=1920,height=1080';
        const windowFeatures = 'width=800,height=800';

        window.open(url, windowName, windowFeatures);



    }

    showPuntoVentaEditionPanel() {
        this.setInfoInPuntoVentaForm();
        perfilAdmnistrador.showModal();
    }
    /**
     * setea toda la informacion del punto de venta  para el formulario 
     */
    setInfoInPuntoVentaForm() {
        // seteamos todos los campos con la informacion que nos traigamos
        this.getDataFromServerV2({
            endpoint: 'mercasena.php',
            action: `getPuntoDeVentaInfo`
            // action: `getProductInfoForMinimalStock`
        }, null).then((data) => {
            data.forEach(puntoVenta => {

                // estos son los texto que aparecen en el formulario
                $("#adminS_encargadosName").text(puntoVenta.encargado);
                $("#adminS_location").text(puntoVenta.ubicacion);
                // estos son los campos 
                $("#managerName").val(puntoVenta.encargado);
                $("#anualGoal").val(puntoVenta.metaAnual);
                $("#whatsappNumber").val(puntoVenta.whatsapp);
                $("#punt_location").val(puntoVenta.ubicacion);
                $("#formerCenter").val(puntoVenta.centroFormacion);
                $("#regionalName").val(puntoVenta.regional);
            })
        });


    }

    // ================ SECCION DE CONFIGURACIOND EL PUNTO DE VENTA ===============
    /**
     * recolecta la informacion del formulario de edicion de  los datos del  punto de venta y luego los envia 
     */
    recolectDataFromPuntConfigForm() {
        let data = {
            "encargado": $("#managerName").val(),
            "metaAnual": $("#anualGoal").val(),
            "whatsapp": $("#whatsappNumber").val(),
            "ubicacion": $("#punt_location").val(),
            "centroFormacion": $("#formerCenter").val(),
            "regional": $("#regionalName").val(),
        }


        user.sendDataToServerV2({
            method: "POST",
            controller: "mercasena.php",
            action: "updatePuntoVenta"
            // action: "devolver"
        }, data)
            .then((response) => {
                perfilAdmnistrador.close();
                Inventary.showModalSucces(response.mensagge);
            }).catch((response) => {
                Inventary.showErrorModal(response.error);
                perfilAdmnistrador.close();
                setTimeout(() => {
                    perfilAdmnistrador.showModal();
                }, 3000);
            })
    }
    // ================ SECCION DE CONFIGURACIOND EL PUNTO DE VENTA ===============

    /**
     * configura el valor de la informacion para mostrar en la alerta de bajo stock
     * @param {object} product - objeto que contiene la informacion del producto
     */

    setLowStockProductValues(product) {
        let actualAlert = document.getElementById('actualAlertContainer');
        // nombre del producto 
        $("#lowStockProduct_info").text(product.name);

        // seteada del id del producto 
        $('#lowStock_productID').val(product.id)
        // aca se pone el valor que se tiene del minimo stock del producto
        $('#lowStockForProduct').val(product.minimalStock)
        // acas se muestra como se vendel producto ejemplpo por kilo

        $('#lowStockProduct_measurement').text(product.measurement);






        // apartir del minimo stock lo que hace es condifgurar como se va a ver la informacion
        if (product.minimalStock > 0) {
            actualAlert.innerHTML = `
             <span class="font-semibold">la alerta actual esta en <span><span
                class="rounded-full bg-red-400  hover:bg-red-600  text-white text-2xl font-bold p-3"
                id="lowStockProduct_alert">${product.minimalStock} ${product.measurement}</span> </span>
            `;
        } else {
            actualAlert.innerHTML = `
             <div role="alert" class="alert alert-warning">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="h-6 w-6 shrink-0 stroke-current" fill="none"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <span class="text-white font-bold">Notificacion : hasta el momento no tienes alertas configuradas para este producto </span>
                                            </div>
            `;
        }

    }
    /**
     * crea el ponel de bajo productos
     */
    createLowStockProductPanel(productID) {
        // id del producto
        let requestProduct = {
            id: productID
        }
        // consultamos la informacion del producto
        this.getDataFromServerV2({
            endpoint: 'Product.php',
            action: `getProductInfoForMinimalStock&id=${productID}`
            // action: `getProductInfoForMinimalStock`
        }, requestProduct)
            .then((data) => {
                console.log(data);

                // filtra el nombre de default
                data.variation == 'default'
                    ? data.variation = ''
                    : '';
                // aca seteamos los valores del formulario
                this.setLowStockProductValues({
                    name: `${data.product} ${data.variation}`,
                    id: data.id,
                    measurement: data.measurement,
                    minimalStock: data.minimalStock
                });
                // muestra el modal de poco stock de los productos
                lowProductStockModalRequest.showModal();
            }).catch((error) => {

            });
    }

    /**
     * averigua los productos que tiene bajo stock para la notificacion
     */
    fetchLowStockNotification() {

        // consultamos la informacion del producto
        this.getDataFromServerV2({
            endpoint: 'Product.php',
            action: `getLowStockProductsInfo`
            // action: `getProductInfoForMinimalStock`
        }, null)
            .then((data) => {
                // validamos primero que hayn venido datos y si no entonces no pone las seña de alerta

                let dropwdownAlertas = document.getElementById('advertencias-dropdown');
                dropwdownAlertas.innerHTML = ``;
                if (data.length > 0) {
                    data.forEach(producto => {
                        // para que no aparesca el de guanabana default y asi
                        producto.variacion == 'default'
                            ? producto.variacion = ''
                            : producto.variacion = producto.variacion;

                        switch (producto.estadoID) {
                            case 5:
                                dropwdownAlertas.innerHTML += `
                  
                <div class="col">
                    <div role="alert" class="alert  mt-1 mb-1 hover:scale-105 transform duration-300  ease-in-out   alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
                        <span> <strong class="hover:underline  font-bold">${producto.producto} ${producto.variacion}  </strong> esta agotada </span>
                      <!-- <button class="btn hover:bg-yellow-700 hover:z-10  duration-400 ease-in-out ">
                      
                                 <svg fill="#000000" width="30px" height="30px" viewBox="0 0 512 512" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="A_-_90_x2C__plant_x2C__grow_x2C__growth_x2C__success"> <g> <path d="M265.521,57.544c4.681,0,8.487-3.849,8.487-8.581c0-4.678-3.807-8.484-8.487-8.484c-4.729,0-8.577,3.806-8.577,8.484 C256.944,53.695,260.791,57.544,265.521,57.544z"></path> <path d="M107.849,202.285c0-6.76-5.501-12.26-12.265-12.26c-6.758,0-12.257,5.5-12.257,12.26c0,6.758,5.499,12.257,12.257,12.257 C102.348,214.542,107.849,209.043,107.849,202.285z"></path> <path d="M408.336,105.235c6.758,0,12.256-5.5,12.256-12.26c0-6.758-5.498-12.257-12.256-12.257 c-6.759,0-12.257,5.499-12.257,12.257C396.079,99.735,401.577,105.235,408.336,105.235z"></path> <path d="M214.664,341.063c0.002,0,0.002,0,0.005,0c10.386,0,21.632-1.188,33.423-3.527c0.333-0.066,0.648-0.185,0.937-0.342 v30.997c-41.914,1.162-77.311,24.46-84.836,56.27c-0.231,0.976-0.002,2.004,0.619,2.79c0.623,0.787,1.57,1.245,2.573,1.245 h169.799c0.007,0,0.013,0,0.02,0c1.812,0,3.28-1.469,3.28-3.279c0-0.391-0.069-0.764-0.193-1.11 c-7.75-31.625-43.02-54.755-84.701-55.915v-38.598c0.168,0.891,0.326,1.774,0.503,2.67c0.259,1.303,1.278,2.32,2.581,2.579 c17.172,3.402,33.525,5.128,48.609,5.128c38.178,0,68.284-10.729,89.48-31.893c29.618-29.579,38.857-77.348,26.719-138.142 c-0.261-1.301-1.279-2.317-2.58-2.574c-17.169-3.402-33.521-5.126-48.602-5.126c-38.185,0-68.277,10.729-89.441,31.891 c-13.121,13.123-22.234,29.832-27.269,49.663V143.22c5.962-30.478,1.211-54.518-13.764-69.542 c-10.856-10.821-26.174-16.308-45.528-16.308c-7.564,0-15.755,0.864-24.346,2.568c-1.303,0.259-2.321,1.277-2.579,2.58 c-6.078,30.673-1.342,54.835,13.696,69.873c10.822,10.822,26.136,16.31,45.516,16.311c0.001,0,0.002,0,0.003,0 c6.41,0,13.273-0.627,20.442-1.853v120.187c-3.698-10.784-9.339-20.061-16.903-27.643c-14.722-14.684-35.568-22.13-61.959-22.13 c-10.409,0-21.7,1.192-33.559,3.542c-1.301,0.258-2.319,1.275-2.579,2.576c-8.366,41.987-1.935,75.033,18.603,95.569 C167.362,333.621,188.233,341.061,214.664,341.063z M307.067,333.407c0.074,0,0.15,0.003,0.224,0.003c-0.004,0-0.006,0-0.01,0 C307.211,333.41,307.139,333.407,307.067,333.407z M261.379,324.74l61.379-64.039l-4.907-60.037 c-0.147-1.806,1.196-3.389,3.001-3.536c1.799-0.149,3.39,1.196,3.537,3.002l4.435,54.244l36.003-37.563 c1.254-1.308,3.33-1.352,4.637-0.098c1.309,1.253,1.354,3.329,0.1,4.637l-40.877,42.647c-0.07,0.086-0.152,0.161-0.23,0.24 l-34.539,36.038l56.597-8.987c1.789-0.284,3.47,0.936,3.754,2.725s-0.937,3.47-2.726,3.753l-65.135,10.343l-20.509,21.397 M317.927,398.8c-0.063-0.062-0.126-0.12-0.189-0.18C317.801,398.68,317.864,398.738,317.927,398.8z M240.484,332.25 c0.085-0.015,0.17-0.025,0.255-0.04C240.654,332.225,240.57,332.235,240.484,332.25z M240.882,332.184l-47.719-49.792 l-27.086,10.176c-0.38,0.144-0.77,0.211-1.153,0.211c-1.328,0-2.577-0.812-3.071-2.127c-0.637-1.696,0.221-3.587,1.917-4.224 l24.456-9.188l-17.494-18.255c-1.253-1.308-1.209-3.384,0.099-4.637c1.309-1.253,3.384-1.209,4.637,0.098l44.603,46.542l2.21-33.8 c0.118-1.807,1.66-3.177,3.487-3.059c1.808,0.119,3.177,1.68,3.059,3.487l-2.602,39.793l19.163,19.996 c-0.228,1.36-0.468,2.729-0.73,4.111C243.391,331.754,242.133,331.976,240.882,332.184z"></path> <path d="M397.676,443.942h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.757,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.102-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.758,0.067-1.101,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.734c-0.385,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.715-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.067-1.1,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.067-1.101,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.067-1.102,0.189c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.067-1.102,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.1,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.067-1.101,0.189 c-0.345-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.758,0.067-1.102,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.387,0-0.756,0.067-1.1,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732 c-0.387,0-0.757,0.067-1.102,0.189c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732 c-0.387,0-0.757,0.067-1.102,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189 c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.345-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.713-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.758,0.067-1.101,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.067-1.1,0.189 c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.067-1.102,0.189 c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.067-1.102,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189 c-0.345-0.122-0.715-0.189-1.101-0.189H273.7c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.758,0.067-1.102,0.189c-0.343-0.122-0.713-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.067-1.1,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.732c-0.387,0-0.758,0.067-1.102,0.189 c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733 c-0.387,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.387,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.757,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733c-0.387,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733c-0.387,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-1.811,0-3.28,1.469-3.28,3.28c0,1.811,1.469,3.279,3.28,3.279h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733 c0.387,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.343,0.123,0.713,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.734c0.386,0,0.756-0.066,1.101-0.189 c0.343,0.123,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.1-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.734c0.386,0,0.756-0.066,1.101-0.189 c0.343,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.343,0.123,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.387,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.715,0.189,1.102,0.189h0.732c0.387,0,0.757-0.066,1.101-0.189 c0.345,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.713,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.387,0,0.757-0.066,1.1-0.189 c0.344,0.123,0.715,0.189,1.102,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189 c0.345,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.1-0.189c0.345,0.123,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.066,1.102-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c0.387,0,0.756-0.066,1.1-0.189c0.345,0.123,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.066,1.102-0.189 c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189c0.345,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189 c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.343,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.387,0,0.756-0.066,1.1-0.189 c0.345,0.123,0.715,0.189,1.101,0.189h0.733c0.387,0,0.756-0.066,1.101-0.189c0.345,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189 c0.345,0.123,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.066,1.102-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c0.387,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.066,1.1-0.189 c0.345,0.123,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.066,1.102-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.066,1.101-0.189c0.345,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.102,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.066,1.1-0.189c0.345,0.123,0.715,0.189,1.101,0.189h0.733 c0.387,0,0.756-0.066,1.101-0.189c0.345,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.345,0.123,0.715,0.189,1.102,0.189h0.732 c0.387,0,0.758-0.066,1.102-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.066,1.1-0.189c0.345,0.123,0.715,0.189,1.102,0.189h0.732 c0.387,0,0.758-0.066,1.102-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.345,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.713,0.189,1.1,0.189h0.734 c0.385,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.101-0.189 c0.343,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.387,0,0.758-0.066,1.102-0.189 c0.343,0.123,0.713,0.189,1.1,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c1.811,0,3.279-1.469,3.279-3.279C400.955,445.411,399.486,443.942,397.676,443.942z"></path> <path d="M397.676,464.961h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.757,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.102-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.758,0.066-1.101,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.734c-0.385,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.715-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.066-1.1,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.066-1.101,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.066-1.102,0.189c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.066-1.102,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.1,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.066-1.101,0.189 c-0.345-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.758,0.066-1.102,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.387,0-0.756,0.066-1.1,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732 c-0.387,0-0.757,0.066-1.102,0.189c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732 c-0.387,0-0.757,0.066-1.102,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189 c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.345-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.713-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.758,0.066-1.101,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.066-1.1,0.189 c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.066-1.102,0.189 c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.066-1.102,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189 c-0.345-0.123-0.715-0.189-1.101-0.189H273.7c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.758,0.066-1.102,0.189c-0.343-0.123-0.713-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.066-1.1,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.732c-0.387,0-0.758,0.066-1.102,0.189 c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733 c-0.387,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.387,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.757,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733c-0.387,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733c-0.387,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-1.811,0-3.28,1.469-3.28,3.279c0,1.812,1.469,3.28,3.28,3.28h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733 c0.387,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.343,0.122,0.713,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.734c0.386,0,0.756-0.067,1.101-0.189 c0.343,0.122,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.1-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.734c0.386,0,0.756-0.067,1.101-0.189 c0.343,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.343,0.122,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.387,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.715,0.189,1.102,0.189h0.732c0.387,0,0.757-0.067,1.101-0.189 c0.345,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.713,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.387,0,0.757-0.067,1.1-0.189 c0.344,0.122,0.715,0.189,1.102,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189 c0.345,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.1-0.189c0.345,0.122,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.067,1.102-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c0.387,0,0.756-0.067,1.1-0.189c0.345,0.122,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.067,1.102-0.189 c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189c0.345,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189 c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.343,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.387,0,0.756-0.067,1.1-0.189 c0.345,0.122,0.715,0.189,1.101,0.189h0.733c0.387,0,0.756-0.067,1.101-0.189c0.345,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189 c0.345,0.122,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.067,1.102-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c0.387,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.067,1.1-0.189 c0.345,0.122,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.067,1.102-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.067,1.101-0.189c0.345,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.102,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.067,1.1-0.189c0.345,0.122,0.715,0.189,1.101,0.189h0.733 c0.387,0,0.756-0.067,1.101-0.189c0.345,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.345,0.122,0.715,0.189,1.102,0.189h0.732 c0.387,0,0.758-0.067,1.102-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.067,1.1-0.189c0.345,0.122,0.715,0.189,1.102,0.189h0.732 c0.387,0,0.758-0.067,1.102-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.345,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.713,0.189,1.1,0.189h0.734 c0.385,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.101-0.189 c0.343,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.387,0,0.758-0.067,1.102-0.189 c0.343,0.122,0.713,0.189,1.1,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c1.811,0,3.279-1.469,3.279-3.28C400.955,466.43,399.486,464.961,397.676,464.961z"></path> </g> </g> <g id="Layer_1"></g> </g></svg>
                                </button> -->  
                        
                    </div>


                </div>
                
                  `;
                                break;
                            case 6:
                                dropwdownAlertas.innerHTML += `
                  
                <div class="col">
                    <div role="alert" class="alert  mt-1 mb-1 hover:scale-105 transform duration-300  ease-in-out   alert-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>te quedan pocas unidades de <strong class="hover:underline  font-bold text-md">${producto.producto} ${producto.variacion}</strong></span>
                      <!-- <button class="btn hover:bg-yellow-700 hover:z-10  duration-400 ease-in-out ">
                      
                                 <svg fill="#000000" width="30px" height="30px" viewBox="0 0 512 512" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="A_-_90_x2C__plant_x2C__grow_x2C__growth_x2C__success"> <g> <path d="M265.521,57.544c4.681,0,8.487-3.849,8.487-8.581c0-4.678-3.807-8.484-8.487-8.484c-4.729,0-8.577,3.806-8.577,8.484 C256.944,53.695,260.791,57.544,265.521,57.544z"></path> <path d="M107.849,202.285c0-6.76-5.501-12.26-12.265-12.26c-6.758,0-12.257,5.5-12.257,12.26c0,6.758,5.499,12.257,12.257,12.257 C102.348,214.542,107.849,209.043,107.849,202.285z"></path> <path d="M408.336,105.235c6.758,0,12.256-5.5,12.256-12.26c0-6.758-5.498-12.257-12.256-12.257 c-6.759,0-12.257,5.499-12.257,12.257C396.079,99.735,401.577,105.235,408.336,105.235z"></path> <path d="M214.664,341.063c0.002,0,0.002,0,0.005,0c10.386,0,21.632-1.188,33.423-3.527c0.333-0.066,0.648-0.185,0.937-0.342 v30.997c-41.914,1.162-77.311,24.46-84.836,56.27c-0.231,0.976-0.002,2.004,0.619,2.79c0.623,0.787,1.57,1.245,2.573,1.245 h169.799c0.007,0,0.013,0,0.02,0c1.812,0,3.28-1.469,3.28-3.279c0-0.391-0.069-0.764-0.193-1.11 c-7.75-31.625-43.02-54.755-84.701-55.915v-38.598c0.168,0.891,0.326,1.774,0.503,2.67c0.259,1.303,1.278,2.32,2.581,2.579 c17.172,3.402,33.525,5.128,48.609,5.128c38.178,0,68.284-10.729,89.48-31.893c29.618-29.579,38.857-77.348,26.719-138.142 c-0.261-1.301-1.279-2.317-2.58-2.574c-17.169-3.402-33.521-5.126-48.602-5.126c-38.185,0-68.277,10.729-89.441,31.891 c-13.121,13.123-22.234,29.832-27.269,49.663V143.22c5.962-30.478,1.211-54.518-13.764-69.542 c-10.856-10.821-26.174-16.308-45.528-16.308c-7.564,0-15.755,0.864-24.346,2.568c-1.303,0.259-2.321,1.277-2.579,2.58 c-6.078,30.673-1.342,54.835,13.696,69.873c10.822,10.822,26.136,16.31,45.516,16.311c0.001,0,0.002,0,0.003,0 c6.41,0,13.273-0.627,20.442-1.853v120.187c-3.698-10.784-9.339-20.061-16.903-27.643c-14.722-14.684-35.568-22.13-61.959-22.13 c-10.409,0-21.7,1.192-33.559,3.542c-1.301,0.258-2.319,1.275-2.579,2.576c-8.366,41.987-1.935,75.033,18.603,95.569 C167.362,333.621,188.233,341.061,214.664,341.063z M307.067,333.407c0.074,0,0.15,0.003,0.224,0.003c-0.004,0-0.006,0-0.01,0 C307.211,333.41,307.139,333.407,307.067,333.407z M261.379,324.74l61.379-64.039l-4.907-60.037 c-0.147-1.806,1.196-3.389,3.001-3.536c1.799-0.149,3.39,1.196,3.537,3.002l4.435,54.244l36.003-37.563 c1.254-1.308,3.33-1.352,4.637-0.098c1.309,1.253,1.354,3.329,0.1,4.637l-40.877,42.647c-0.07,0.086-0.152,0.161-0.23,0.24 l-34.539,36.038l56.597-8.987c1.789-0.284,3.47,0.936,3.754,2.725s-0.937,3.47-2.726,3.753l-65.135,10.343l-20.509,21.397 M317.927,398.8c-0.063-0.062-0.126-0.12-0.189-0.18C317.801,398.68,317.864,398.738,317.927,398.8z M240.484,332.25 c0.085-0.015,0.17-0.025,0.255-0.04C240.654,332.225,240.57,332.235,240.484,332.25z M240.882,332.184l-47.719-49.792 l-27.086,10.176c-0.38,0.144-0.77,0.211-1.153,0.211c-1.328,0-2.577-0.812-3.071-2.127c-0.637-1.696,0.221-3.587,1.917-4.224 l24.456-9.188l-17.494-18.255c-1.253-1.308-1.209-3.384,0.099-4.637c1.309-1.253,3.384-1.209,4.637,0.098l44.603,46.542l2.21-33.8 c0.118-1.807,1.66-3.177,3.487-3.059c1.808,0.119,3.177,1.68,3.059,3.487l-2.602,39.793l19.163,19.996 c-0.228,1.36-0.468,2.729-0.73,4.111C243.391,331.754,242.133,331.976,240.882,332.184z"></path> <path d="M397.676,443.942h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.757,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.102-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.758,0.067-1.101,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.734c-0.385,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.715-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.067-1.1,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.067-1.101,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.067-1.102,0.189c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.067-1.102,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.1,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.067-1.101,0.189 c-0.345-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.758,0.067-1.102,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.387,0-0.756,0.067-1.1,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732 c-0.387,0-0.757,0.067-1.102,0.189c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732 c-0.387,0-0.757,0.067-1.102,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189 c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.345-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.713-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.758,0.067-1.101,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.067-1.1,0.189 c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.067-1.102,0.189 c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.067-1.102,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189 c-0.345-0.122-0.715-0.189-1.101-0.189H273.7c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.758,0.067-1.102,0.189c-0.343-0.122-0.713-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.067-1.1,0.189c-0.345-0.122-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.732c-0.387,0-0.758,0.067-1.102,0.189 c-0.344-0.122-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733 c-0.387,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.387,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.757,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733c-0.387,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.733c-0.387,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.715-0.189-1.101-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.757,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.067-1.1,0.189c-0.344-0.122-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.067-1.101,0.189 c-0.344-0.122-0.714-0.189-1.1-0.189h-0.734c-1.811,0-3.28,1.469-3.28,3.28c0,1.811,1.469,3.279,3.28,3.279h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733 c0.387,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.343,0.123,0.713,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.734c0.386,0,0.756-0.066,1.101-0.189 c0.343,0.123,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.1-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.734c0.386,0,0.756-0.066,1.101-0.189 c0.343,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.343,0.123,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.387,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.715,0.189,1.102,0.189h0.732c0.387,0,0.757-0.066,1.101-0.189 c0.345,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.713,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.387,0,0.757-0.066,1.1-0.189 c0.344,0.123,0.715,0.189,1.102,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189 c0.345,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.1-0.189c0.345,0.123,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.066,1.102-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c0.387,0,0.756-0.066,1.1-0.189c0.345,0.123,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.066,1.102-0.189 c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.387,0,0.757-0.066,1.101-0.189c0.345,0.123,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189 c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.343,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.387,0,0.756-0.066,1.1-0.189 c0.345,0.123,0.715,0.189,1.101,0.189h0.733c0.387,0,0.756-0.066,1.101-0.189c0.345,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189 c0.345,0.123,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.066,1.102-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c0.387,0,0.756-0.066,1.1-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.066,1.1-0.189 c0.345,0.123,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.066,1.102-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.066,1.101-0.189c0.345,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.102,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.066,1.1-0.189c0.345,0.123,0.715,0.189,1.101,0.189h0.733 c0.387,0,0.756-0.066,1.101-0.189c0.345,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.345,0.123,0.715,0.189,1.102,0.189h0.732 c0.387,0,0.758-0.066,1.102-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.1-0.189 c0.344,0.123,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.066,1.1-0.189c0.345,0.123,0.715,0.189,1.102,0.189h0.732 c0.387,0,0.758-0.066,1.102-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189 c0.345,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.066,1.101-0.189c0.344,0.123,0.713,0.189,1.1,0.189h0.734 c0.385,0,0.756-0.066,1.1-0.189c0.344,0.123,0.715,0.189,1.1,0.189h0.734c0.386,0,0.756-0.066,1.101-0.189 c0.343,0.123,0.714,0.189,1.101,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.715,0.189,1.101,0.189h0.733c0.387,0,0.758-0.066,1.102-0.189 c0.343,0.123,0.713,0.189,1.1,0.189h0.733c0.386,0,0.757-0.066,1.101-0.189c0.344,0.123,0.714,0.189,1.1,0.189h0.734 c1.811,0,3.279-1.469,3.279-3.279C400.955,445.411,399.486,443.942,397.676,443.942z"></path> <path d="M397.676,464.961h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.757,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.102-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.758,0.066-1.101,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.734c-0.385,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.715-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.066-1.1,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.066-1.101,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.066-1.102,0.189c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.066-1.102,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.1,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.066-1.101,0.189 c-0.345-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.758,0.066-1.102,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.387,0-0.756,0.066-1.1,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732 c-0.387,0-0.757,0.066-1.102,0.189c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732 c-0.387,0-0.757,0.066-1.102,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189 c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.345-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.713-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.758,0.066-1.101,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.066-1.1,0.189 c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733c-0.387,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.066-1.102,0.189 c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.713-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.102-0.189h-0.732c-0.387,0-0.757,0.066-1.102,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189 c-0.345-0.123-0.715-0.189-1.101-0.189H273.7c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.758,0.066-1.102,0.189c-0.343-0.123-0.713-0.189-1.1-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.387,0-0.756,0.066-1.1,0.189c-0.345-0.123-0.715-0.189-1.101-0.189h-0.733 c-0.387,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.732c-0.387,0-0.758,0.066-1.102,0.189 c-0.344-0.123-0.715-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733 c-0.387,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.387,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.757,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733c-0.387,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.733c-0.387,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.734c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.757,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733 c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.715-0.189-1.101-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.757,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734 c-0.386,0-0.756,0.066-1.1,0.189c-0.344-0.123-0.714-0.189-1.101-0.189h-0.733c-0.386,0-0.756,0.066-1.101,0.189 c-0.344-0.123-0.714-0.189-1.1-0.189h-0.734c-1.811,0-3.28,1.469-3.28,3.279c0,1.812,1.469,3.28,3.28,3.28h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733 c0.387,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.343,0.122,0.713,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.734c0.386,0,0.756-0.067,1.101-0.189 c0.343,0.122,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.1-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.734c0.386,0,0.756-0.067,1.101-0.189 c0.343,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.343,0.122,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.387,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.715,0.189,1.102,0.189h0.732c0.387,0,0.757-0.067,1.101-0.189 c0.345,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.713,0.189,1.1,0.189h0.734 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.387,0,0.757-0.067,1.1-0.189 c0.344,0.122,0.715,0.189,1.102,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189 c0.345,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.1-0.189c0.345,0.122,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.067,1.102-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c0.387,0,0.756-0.067,1.1-0.189c0.345,0.122,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.067,1.102-0.189 c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.387,0,0.757-0.067,1.101-0.189c0.345,0.122,0.714,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189 c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.343,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.387,0,0.756-0.067,1.1-0.189 c0.345,0.122,0.715,0.189,1.101,0.189h0.733c0.387,0,0.756-0.067,1.101-0.189c0.345,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189 c0.345,0.122,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.067,1.102-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c0.387,0,0.756-0.067,1.1-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.067,1.1-0.189 c0.345,0.122,0.715,0.189,1.102,0.189h0.732c0.387,0,0.758-0.067,1.102-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.757-0.067,1.101-0.189c0.345,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.713,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733 c0.386,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.102,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.067,1.1-0.189c0.345,0.122,0.715,0.189,1.101,0.189h0.733 c0.387,0,0.756-0.067,1.101-0.189c0.345,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.345,0.122,0.715,0.189,1.102,0.189h0.732 c0.387,0,0.758-0.067,1.102-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.1-0.189 c0.344,0.122,0.714,0.189,1.1,0.189h0.734c0.387,0,0.756-0.067,1.1-0.189c0.345,0.122,0.715,0.189,1.102,0.189h0.732 c0.387,0,0.758-0.067,1.102-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189 c0.345,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.756-0.067,1.101-0.189c0.344,0.122,0.713,0.189,1.1,0.189h0.734 c0.385,0,0.756-0.067,1.1-0.189c0.344,0.122,0.715,0.189,1.1,0.189h0.734c0.386,0,0.756-0.067,1.101-0.189 c0.343,0.122,0.714,0.189,1.101,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.733 c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.715,0.189,1.101,0.189h0.733c0.387,0,0.758-0.067,1.102-0.189 c0.343,0.122,0.713,0.189,1.1,0.189h0.733c0.386,0,0.757-0.067,1.101-0.189c0.344,0.122,0.714,0.189,1.1,0.189h0.734 c1.811,0,3.279-1.469,3.279-3.28C400.955,466.43,399.486,464.961,397.676,464.961z"></path> </g> </g> <g id="Layer_1"></g> </g></svg>
                                </button> -->  
                        
                    </div>


                </div>
                
                  `;
                                break;

                            default:
                                break;
                        }
                    });
                } else {
                    dropwdownAlertas.innerHTML += `
                  
                        <div class="shadow-lg p-10  flex flex-inline ">

                    <span class="flex text-2xl mt-8 font-semibold text-gray-800 mr-4 align-center">
                        todo esta OK 
                    </span>
                    <img src="../assets/icons/like.png" class="h-20 w-20" alt="">
                </div>
                
                  `;

                }



            }).catch((error) => {

            });
    }

    // =========================
    // funciones para hacer mecanismos de las imagenes de marketing
    /**
        * trae las imagenes de los baners que van a alimental al carouselee
        */
    fetchBannerImages() {
        let carousele = document.getElementById("bannerCarousele");
        $.ajax({
            url: `${this.baseUrl}mercasena.php?action=getBannerImagesForAdmin`,
            // url: `${this.controllerProductosUrl}?action=getProductsByCategory&categoryId=9`,
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                // renderizando los productos
                carousele.innerHTML = '';
                let counter = 1;



                // data.images.forEach(image => {

                //     console.log(image)
                // });
                data.images.forEach(image => {
                    carousele.innerHTML += `
             <div
                                    class="bg-white border color-sena-borde  grid grid-cols-6 gap-2 rounded-xl p-2 text-sm">
                                   

                                     <div
                                        class="flex   mr-10  flex-direction-reverse  flex-inline  justify-end col-span-6 pr-3 mt-3 align-end   mr-10  w-full">
                                        
                                         <h1
                                        class="text-center mr-20 pr-5 mx-auto  color-sena-texto  font-bold col-span-6 hover:text-green-400 duration-600 text-3xl  delay-100 hover:underline">
                                        Imagenes de promocion
                                    </h1>
                                        <button onclick="user.deleteBannerImage(${image.id})"
                                            class="hover:bg-gray-300 hover:border-gradient-to-r hover:from-cyan-200 hover:to-blue-700  hover:scale-115 transform duration-300 justify-end flex justify-end  items-center rounded-lg p-2 duration-300 bg-slate-100  focus:fill-blue-200 focus:bg-blue-400 border border-gray-500">
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path d="M10 11V17" stroke="#ff0000" stroke-width="2"
                                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M14 11V17" stroke="#ff0000" stroke-width="2"
                                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path d="M4 7H20" stroke="#ff0000" stroke-width="2"
                                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                                    <path
                                                        d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                                                        stroke="#ff0000" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round"></path>
                                                    <path
                                                        d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                                        stroke="#ff0000" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round"></path>
                                                </g>
                                            </svg>

                                        </button>
                                        <button onclick="banner_uploadImageSection.showModal();"
                                            class="hover:bg-gray-300 hover:bg-gradient-to-r hover:from-cyan-200 hover:to-blue-700   hover:scale-115 transform duration-300  justify-end flex justify-end ml-20 items-center rounded-lg p-2 duration-300 bg-slate-100   hover:bg-base-300 hover:scale-105  0 border border-gray-500">
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" stroke="#04ff00">
                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                    stroke-linejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <circle cx="12" cy="12" r="10" stroke="#04ff00" stroke-width="1.5">
                                                    </circle>
                                                    <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                                                        stroke="#04ff00" stroke-width="1.5" stroke-linecap="round">
                                                    </path>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="divider col-span-6"></div>

                                    <img src="${image.url}"
                                        class="col-span-6 rounded-md" alt="">

                                    <div class="divider col-span-6"></div>
                                   

                                    </button>

                                </div>
                    `;
                    counter++;

                });

                //    ACXTIVANDO EL CAROULSE
                Inventary.activateCarousele();

                // agrega una clase para poder esconder  lo de los puntos etcs
                $('.owl-nav').addClass('hidden');
                $('.owl-dots').addClass('hidden');

                // muestra  las iamgenes
                MarketingImagesSection.showModal();
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
            autoplayTimeout: 8000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 1,
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



    /**
     * funciion que abrira el modal de carga para subir  las fotos comerciales 
     * 
     */

    createUploadSectionForBanner() {

    }
    // ================================================

    /**
     * funcion que obtiene datos del servidor pero utilizando una promesa
     * @param {object} request objeto que contiene toda la informacion sobre la peticion
     */

    getDataFromServerV2(request, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${this.baseUrl}${request.endpoint}?action=${request.action}`,
                type: "GET",
                contentType: "application/json",
                data: {
                    dataObject: data
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Mercasena-Token': user.sessionHash
                },
                success: function (data) {
                    resolve(data);
                },
                error: function (response) {
                    console.error("Error al hacer la consulta", response);
                    Inventary.hideLoadingModal();
                    Inventary.showInfoModal(response.responseJSON.error);
                    reject(response.responseJSON.error);

                }
            });
        });
    }


    /**
     * function que calcula el numero maximo de iteracioon apartir de 
     * la cantidad de pedidos 
     */
    calculateMaxPagination(data) {
        // extrae el numero maximo
        // let max = inventary.OrdersBuffer.length / 20;
        let max = data.length / 20;
        // y este es el -1 del maximo 
        inventary.lastIndexOfSectionateData = Math.ceil(max);
        return max;
    }

    /**
     * funcion que muestra solo fragmewntos de toda la informacin de pedidos
     */

    async segmentOrdersData(multiplier) {
        // aca es donde se xtraen solo 20 ordenes 
        // si el multiplicador es igual al ultimo index entocnes devuelve los datos de ootra manera para que me devuelva los ultimos

        if (multiplier == this.lastIndexOfSectionateData) {
            return this.OrdersBuffer.slice(this.OrdersBuffer.length - 20);
        } else {
            let factor = multiplier * 20;
            return this.OrdersBuffer.slice(factor, factor + 20);

        }
    }
    // consultas con intervalos de tiempo 
    // ===================================================
    /**
     * verifica si hay notioficacion pendientes
     */
    updateLowStockNotifications() {
        let tiempoIntervalo = 60000;
        let request = () => {
            console.log("verficando notificaciones")
            this.getDataFromServerV2({
                endpoint: 'Product.php',
                action: `getLowStockProductsCounter`

            }, null)
                .then((data) => {
                    // contenedor que tiene el indicador
                    let indicatorContainer = document.getElementById('indicator_container');
                    if (data[0].cantidad > 0) {
                        indicatorContainer.innerHTML = `
                       
                        <span class="badge badge-xs badge-warning indicator-item animate-ping"></span>
                       `;

                    } else {

                        indicatorContainer.innerHTML = ``;


                    }
                    // validamos primero que hayn venido datos y si no entonces no pone las seña de alerta

                    let dropwdownAlertas = document.getElementById('advertencias-dropdown');



                }).catch((error) => {

                });
        }

        setInterval(() => {
            request();
        }, tiempoIntervalo);
        request();


    }
    updateSalesCard() {
        let server = {
            controller: "sales.php",
            action: "getSalesCount"
        }
        // 3 minutos
        let tiempoIntervalo = 5000;

        // para la primera vez
        this.updateContent(server,
            "totalSales");

        setInterval(() => {
            this.updateContent(server, "totalSales");
        }, tiempoIntervalo);

    }
    updateOrdersCard() {
        let server = {
            controller: "Order.php",
            action: "getOrdersCount"
        }
        // 15 segundos
        let tiempoIntervalo = 15000;
        // este es ára la primera vez
        this.updateContent(server, "totalOrders");

        setInterval(() => {
            console.log("actualizando cantidad de pedidos");
            this.updateContent(server, "totalOrders");
        }, tiempoIntervalo);

    }
    updateTotalSoldCard() {
        let server = {
            controller: "sales.php",
            action: "getTotalToday"
        }
        // 5 minutos
        // let tiempoIntervalo = 300000;
        let tiempoIntervalo = 30000;
        this.updateContent(server, "totalToday");

        setInterval(() => {
            this.updateContent(server, "totalToday");
        }, tiempoIntervalo)
    }
    updateProgressBar() {
        let server = {
            endpoint: "mercasena.php",
            action: "getPuntoDeVentaProgress"
        }
        // 5 minutos
        // let tiempoIntervalo = 300000;
        let tiempoIntervalo = 3000;
        let updateFunction = () => {
            this.getDataFromServerV2(server, null)
                .then((progress) => {

                    progress.roundedPercentage = Math.round(progress.percentage);

                    // verifica si ya llego a la meta  y cambia la barra 
                    if (progress.roundedPercentage >= 100) {
                        $("#progressBar_percentage").text(`Meta Alcanzada - 100%`);
                        progress.roundedPercentage = 100;
                    } else {

                        // seteamos las caracteristicas como el nombre y el el anchor  o "progreso"
                        // $("#percentageInGoal").text(progress.roundedPercentage);
                        // $("#percentageInGoal").text(`${progress.roundedPercentage}%`);
                        $("#percentageInGoal").text(`Meta anual -> ${inventary.addPuntuaction(progress.anualGoal)}`);

                        $("#progressBar_percentage").text(`  ${progress.roundedPercentage}%`);
                        console.log(progress.roundedPercentage);
                    }

                    document.getElementById('progressBar_percentage').style.width = `${progress.roundedPercentage}%`;
                    // redondeamos el procentaje
                    $("#styleProgressContainer").html(`

                        <style>
                        @keyframes grow {
                            0% {
                                width: 0;
                            }
                            100% {
                                width: ${progress.roundedPercentage}%;
                            }
                            }
                    </style>
                        `);

                }).catch(() => {
                    $("#percentageInGoal").text("error en los datos");
                    document.getElementById('progressBar_percentage').style.width = `50%`;
                });
        }

        updateFunction();
        setInterval(() => {
            updateFunction();
        }, tiempoIntervalo)
    }

    // ===================================================
    // ===============opciones de renderizado como el de los productos======================

    // ===================================================
    /**
     * consulta informacion y la renderiza en el comoponente html
     * @param {object} server objeto que contiene la informacion del servidor
     * @param {string} htmlID id del componente html donde se va a renderizar la informacion
     */
    updateContent(server, htmlID) {
        console.log(`consultando a la direccion ${this.baseUrl}${server.controller}?action=${server.action}`);
        $.ajax({
            url: `${this.baseUrl}${server.controller}?action=${server.action}`,
            type: "GET",
            contentType: "application/json",
            headers: {
                'Mercasena-Token': user.sessionHash
            },
            success: function (dato) {
                let htmlComponent = document.getElementById(htmlID);
                // htmlComponent.innerHTML = dato.valor;
                htmlComponent.innerHTML = inventary.addPuntuaction(dato.valor);
                Inventary.hideLoadingModal();
            },
            error: function (response) {
                console.error("Error al hacer la consulta", response);
                Inventary.hideLoadingModal();
            }
        });
    }




    /**
     * 
     * @param {*} HTMLSelectId id del select al cual vams a renderizar
     * @param {string} controller controlador que nos va a atender
     * @param {string} paramController es el parametro como por ejemplo getElement
     * @oaram {bool} selectedBool si es true renderiza la informacion por default
     * @param {object} config configuracion de la consulta
     */
    fetchDataToSelect(HTMLSelectId, controller, paramController, selectedBool = false, config = {}) {
        $.ajax({
            url: `${this.baseUrl}${controller}?action=${paramController}`,
            type: "GET",
            contentType: "application/json",
            headers: {
                'Mercasena-Token': user.sessionHash
            },
            success: function (datos) {
                // ppara renderizar el producto ya por default para el modal de edicion
                if (selectedBool) {
                    let select = document.getElementById(HTMLSelectId);
                    select.innerHTML = '';
                    // select.innerHTML = '<option value="0">Selecciona uno</option>';
                    datos.forEach(elemento => {
                        // sis encuentra el id de la configuracion lo pone en selected
                        elemento.id == config.id
                            ? select.innerHTML += `<option value="${elemento.id}" selected >${elemento.nombre}</option>`
                            : select.innerHTML += `<option value="${elemento.id}">${elemento.nombre}</option>`

                    });
                } else {
                    let select = document.getElementById(HTMLSelectId);
                    select.innerHTML = '<option value="0">Selecciona uno</option>';
                    datos.forEach(elemento => {
                        select.innerHTML += `<option value="${elemento.id}">${elemento.nombre}</option>`;
                    });
                }

            },
            error: function (response) {
                console.error("Error fetching data to select", response);
            }
        });
    }
    /**
     * trae alghuna informacin del servidor
     * @param {object} server informacion del servidor
     * @param {function} callback callback que le pasamos los datos como paramentros
     */
    getDataFromServer(server, callback) {

        $.ajax({
            url: `${this.baseUrl}${server.controller}?action=${server.action}`,
            type: "GET",
            contentType: "application/json",
            headers: {
                'Mercasena-Token': user.sessionHash
            },
            success: function (data) {
                Inventary.hideLoadingModal();
                callback(data);
            },
            error: function (response) {
                console.error("Error al hacer la consulta", response);
                Inventary.hideLoadingModal();
                Inventary.showInfoModal(response.responseJSON.error);

            }
        });
    }


    // ================== SECCION DONDE SE BUSCA INFORMACION DE UN PRODUCTO o LO QUE SEA
    /**
     * busca una medida por el id de la misma
     */
    fetchMeasurementById(id) {
        console.log(`consultando todos los productos ${this.controllerProductosUrl}`);
        $.ajax({
            url: `${this.controllerProductosUrl}?action=getMeasurementById&id=${id}`,
            type: "GET",
            contentType: "application/json",
            success: (category) => {
                return category;
            },
            error: function (response) {
                Inventary.showErrorMensagge(response.error);
            }
        });
    }

    /**
     * Trae datos del servidor y es una operacion asincrna de prueba
     * @param {bject} server datos del servidor
     * @param {*} data datos de lqa consulta
     * @param {*} returnable retornar valor
     * @param {*} showLoadingModal mostrar modal de carga
     * @param {*} callback funcion callback
     * @returns 
     */
    async getDataToServer(server, data, returnable = true, showLoadingModal = true, callback = '') {
        return new Promise((resolve, reject) => {
            $.ajax({
                // url: "http://localhost/mercasena/app/controllers/test.php",
                url: `${inventary.baseUrl}${server.controller}?action=${server.action}`,
                method: 'GET',
                // envia los datos al servidor,
                beforeSend: () => {
                    console.log("preparando datos");
                    Inventary.showLoadingModal();
                },
                success: (data) => {
                    if (returnable == true) {
                        console.log("devolviendo data");
                        resolve(data);
                    } else {
                        callback(data);
                        // muestra el modal con el mensaje
                        Inventary.hideLoadingModal();
                        // Inventary.showModalSucces(data.mensagge);

                    }

                },
                error: (response) => {
                    reject(response.responseJSON);
                    Inventary.hideLoadingModal();
                    console.error(response);
                    // Inventary.showWarningMensagge(response.error);
                    // Inventary.showErrorModal(response.error);
                }

            });
        })

    }

    /**
     * setea los valores
     */
    setValuesToEditProductForm() {
        let producto = this.targetEditionProduct;
        $('#EditionProductPrice').val(producto.precio);
        $('#EditionProductStock').val(producto.existencias);
        $('#EditionProductVariant').val(producto.variacion);
        // $('#EditionProductVariant').val('sancocho');
        $('#productIdEdition').val(producto.id);
        $('#editionImageForm').attr('src', producto.rutaImagen);

        // seteando los selects de ls formularios 
        this.fetchDataToSelect('categoriasSelectEdicion', 'Product.php', 'getCategories', true, { id: producto.categoria })
        this.fetchDataToSelect('productoSelectEdicion', 'Product.php', 'getAllProducts', true, { id: producto.prod_id })
        this.fetchDataToSelect('medSelectEdicion', 'Product.php', 'getAllMeasurements', true, { id: producto.medida })
    }

    // renderBillFromAnOrder(data){
    //     user.searchTarget.section = 'bill'
    // }
    /**
     * renderiza la factura apartir de la informacion de un pedido
     * @param productos un arreglo que agrupa todos los pedidos de los productos
     */
    renderBill(arrg, renderFromQuery = true) {
        // cerramos el modal de carga
        Inventary.hideLoadingModal();
        Inventary.hideLoadingInmutableModal();
        // asignacion de variabñes
        let object = arrg[0];
        let tbodyBill = document.getElementById('tbodyBill');
        let counter = 1;
        tbodyBill.innerHTML = ``;
        // ternria que decide si va a guardar los datos en el arreglo de inventario despues de ser traido por una consulta
        renderFromQuery == true ? inventary.BillBuffer = object : '';


        // console.log('info =>'+ JSON.stringify(inventary.BillBuffer) );

        // crea la funcionalidad al boton de agregar producto a la factura 

        // consulta la ultima factura y pone un pseudoID
        inventary.getBillId();
        inventary.setDateTobill();



        // verificacion de si hay datos o no en la factura
        if (object != '') {
            console.error("entre por la parte del rendrizado normal");

            inventary.getDataFromServerV2({
                endpoint: 'Product.php',
                action: `getAllInformation`
            }, null).then((data) => {
                inventary.productsBufferForCheckStock = data;
                inventary.BillBuffer.productos.forEach(producto => {
                    // si encuentra que la variacino es defaulk la setea a '' para que no aparesca
                    producto.variante == 'default' ? producto.variante = '' : '';

                    let productFromArr = inventary.productsBufferForCheckStock.filter(item => item.productoID == producto.id);
                    console.log(productFromArr);

                    // verificamos  , si la cantidad pedida es mayor a las existencias 
                    // entonces setea el valor a las existencia actuales
                    // del inventario

                    let existencias = productFromArr[0].existencias;

                    if (producto.cantidad > existencias) {
                        producto.cantidad = existencias;
                    }


                    tbodyBill.innerHTML += `
        
            <div id="container${counter}"    class="flex  relative item-center justify-center  text-xs lg:text-sm ">
               <input type="hidden" id="productId${counter}" value="${producto.id}">
                                                <div
                                                    class="flex-1 w-max flex-inline text-center   mx-auto items-center justify-center text-center py-1 px-2 font-bold border border-gray-500">
                                                    <span data-index="${counter}"  class="font-bold text-gray-700  flex flex-inline    w-full"><input type="number"
                                                            class="text-center align-center mt-3  inputQuantityBill  " id="cantidad${counter}" value="${producto.cantidad}"> </span>
                                                </div>
                                                <div
                                                    class="flex-1 w-max flex-inline  text-center py-1 px-2 font-bold border border-gray-500">
                                                    <span
                                                        class="font-bold text-gray-700 flex flex-inline  self-center justify-center   w-full"><span id="prodInfo${counter}"
                                                            class="font-bold text-gray-700 grow ">${producto.medida} -  ${producto.nombre} ${producto.variante}   
                                                        </span><input type="hidden" id="productName${counter}"  value="${producto.medida} -  ${producto.nombre} ${producto.variante}"> <a
                                                            class="btn flex-end  opacity-50 hover:opacity-100  ml-8 pr-2   self-center justify-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:overflow-visible  hover:bg-base-500    "
                                                            onclick="user.searchUpdateProduct(${counter})"><svg width="20px"
                                                                height="20px" viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                                    stroke-linejoin="round"></g>
                                                                <g id="SVGRepo_iconCarrier">
                                                                    <path
                                                                        d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                                                        stroke="#ff2134ff" stroke-width="2"
                                                                        stroke-linecap="round" stroke-linejoin="round">
                                                                    </path>
                                                                </g>
                                                            </svg></a></span>
                                                </div>
                                                <div
                                                    class="flex-1 w-max flex-inline text-center   py-1 px-0 font-bold border border-gray-500">
                                                    <span class="font-bold text-gray-700 self-center flex flex-inline  w-full"><span class="w-5/10">$</span><input
                                                            type="number" class=" inputPrice  text-center align-center mt-3  "
                                                            name=""  id="precioUnitario${counter}" value="${producto.precio}"></span>
                                                </div>
                                                <div
                                                    class="flex-1 w-max flex-inline  text-center   py-1 px-0 font-bold border border-gray-500">
                                                    <span class="font-bold text-gray-700 self-center flex flex-inline  w-10/10 "><span class="w-5/10">$</span><input
                                                            type="number" class="text-center  p-0  align-center mt-3  "
                                                             class="inputTotalBill   w-5/10"  id="productoPrecio${counter}" value="${producto.precio * producto.cantidad}" ></span>
                                                </div>
                                                <div
                                                    class="flex-1 w-max flex-inline  text-center   py-1 px-1 font-bold border border-gray-500">
                                                    <span
                                                        class="font-bold text-gray-700 opacity-50 hover:opacity-100  self-center w-full">
                                                        <butto onclick="user.dropProductFromBill(${producto.id})"
                                                            class="btn rounded border rounded-full bg-red-500 hover:scale-110  hover:shadow-lg tranform duration-300 hover:text-red-100  hover:border-3 hover:border-blue-500   ease-in-out text-white  btn-danger">
                                                            ELIMINAR</butto>
                                                    </span>
                                                </div>
                                            </div>
        
        `;

                    // sube el contador 
                    counter++;

                });
                // renderizado de la factura


            // //    guardamos en forma local
            // var datosParseados = JSON.stringify(arrg);

            // window.localStorage.setItem('datosFactura', datosParseados);

            // se define el ultimo contedor que contien productos y como empiezxa en uno y ni se ha renmderizado el producto entonces le pongo el -
            user.bill.maxContainerProductOfBill = counter - 1;

            // aqui cuadra el id del pedido
            document.getElementById('pedidoID').value = object.pedidoId;
            inventary.customer.OrderID = object.pedidoId;
            // pone los datos del cliente
            // nombre
            document.getElementById('customerName').value = object.Usuario;
            // nit
            object.usuarioNit == null ?
                document.getElementById('customerNit').value = "" :
                document.getElementById('customerNit').value = object.usuarioNit;

            // telefono
            object.usuarioTelefono == null ?
                document.getElementById('customerPhone').value = "" :
                document.getElementById('customerPhone').value = object.usuarioTelefono;

            // $("#pruebaContainer").html(`<span>${object.usuarioTelefono}</span>`);
            // direccion
            object.usuarioDireccion == null ?
                document.getElementById('customerAdress').value = "" :
                document.getElementById('customerAdress').value = object.usuarioDireccion;

            // defino la cantidad de productos que se renderizaron en los rpoductos y los guardo
            inventary.customer.numberOfProductsInBill = counter;
            // total de la factura
            // document.getElementById('totalBill').value = object.precioTotal;


            // guardando la informacion del usuario
            inventary.customer.setData({
                name: object.Usuario,
                phone: object.usuarioTelefono,
                address: object.usuarioDireccion
            });

            console.log("renderizando  productos en la factura " + counter)


            // despues de renderizar la factuqa crea una consulta que permite traer informacin sobre los productos 
            user.requestProductsInfo();
            activateBillEvents();

            // calcula el total de la factura
            user.calculateTotalBill();
            // muestra el modal de la factura
            });
            
        } else {
            inventary.BillBuffer = {
                productos: []
            };
            console.error("entre por la parte del rendrizado raro ");
            user.bill.maxContainerProductOfBill = 0;
            // document.getElementById('bill').innerHTML = "";
            user.requestProductsInfo();
            activateBillEvents();
        }

        console.log('info =>' + JSON.stringify(inventary.BillBuffer));
        billModal.showModal();
    }


    renderDailyInventary() {
        let counter = 1;
        let tbodyDiaryInventary = document.getElementById('tbodyDiaryInventary');

        // limpiamos lo que hay para volver a renderizar
        tbodyDiaryInventary.innerHTML = '';

        // HEADER DEL INVENTARIO
        tbodyDiaryInventary.innerHTML = `
                                                        <div class=" pt-2 pb-3  rounded-l-lg     text-center text-green-500 font-bold   border-2 border-green-600 hover:border-green-300  ">PRODUCTO </div>
                                            <div class=" pt-2 pb-3      text-center text-green-500 font-bold   border-2 border-green-600 hover:border-green-300  ">CANTIDAD</div>
                                            <div class=" pt-2 pb-3     text-center text-green-500 font-bold   border-2 border-green-600 hover:border-green-300  ">NUEVA CANTIDAD</div>
                                            <div class=" pt-2 pb-3     text-center text-green-500 font-bold   border-2 border-green-600 hover:border-green-300  ">CANTIDAD TOTAL</div>
                                            <div class=" pt-2 pb-3     text-center text-green-500 font-bold   border-2 border-green-600 hover:border-green-300  ">OBSERVACIONES</div>
                                            <div class=" pt-2 pb-3   rounded-r-lg    text-center text-green-500 font-bold   border-2 border-green-600 hover:border-green-300  ">ACCIONES</div>
        `;
        // AQUI SI SE LLENAN TODOS LOS DATOS 
        user.dailyInventary.products.forEach(producto => {
            producto.variante == 'default' ? producto.variante = '' : '';
            tbodyDiaryInventary.innerHTML += `
            <!-- nombre del product -->
                <div class=" pt-2 pb-3 mt-2 rounded-l-lg    text-center text-green-500 font-bold     border-2  border-gray-500 hover:text-red-100   hover:border-yellow-500 hover:border-2 duration-300 ">
                <input type="hidden" id="inv_productId${counter}"
                                                    value="${producto.id}">
                                                <div
                                                    class="flex w-full pr-4 flex-inline  text-center py-1 px-2 font-bold ">
                                                    <span
                                                        class="font-bold text-gray-700  hover:text-red-100  flex flex-inline  self-center justify-center   w-full"><span
                                                            id="prodInfo${counter}"
                                                            class="font-bold text-gray-700 grow ">  ${producto.nombre} ${producto.variante}
                                                        </span>
                                                        <input type="hidden" id="inv_productName${counter}"
                                                            value="   ${producto.nombre} ${producto.variante}">
                                                    </span>
                                                </div>

                </div>
                <div class=" pt-2 pb-3  mt-2  text-center text-green-500 font-bold    border-2 border-gray-500  hover:border-yellow-500 hover:border-2 duration-300  ">
                              <!-- stock actual -->
                    <div
                        class="flex w-full pr-3 flex-inline text-center   py-1 px-0 font-bold ">
                         <span
                             class="font-bold text-gray-700 self-center flex flex-inline  w-full"><span
                                class="ml-3"> <input type="hidden" id="inv_existencias${counter}" value="${producto.existencias}"> <span>${producto.existencias}</span> </span> -  ${producto.medida}</span>
                    </div>
                </div>
                <div class=" pt-2 pb-3 mt-2  text-center text-green-500 font-bold   border-2 border-gray-500  hover:border-yellow-500 hover:border-2 duration-300 ">
                
                 <!-- nuevas cantidaes -->
                     <div
                        class="flex w-full flex-inline align-center  text-center  pl-0 pr-5   mx-auto items-center justify-center text-center py-1 px-2 font-bold">
                        <span data-index="${counter}"
                            class="font-bold text-gray-700  flex flex-inline    w-full">
                            <input type="number"
                                class="text-center w-12 p-0   align-center mt-1  inputQuantityInv  "
                                id="inv_newQuantity${counter}" value="0"> <span
                                class="align-center justify-self-center mt-1"> ${producto.medida}
                            </span> </span>
                    </div>
                </div>
                <div class=" pt-2 pb-3 mt-2  text-center text-green-500 font-bold  hover:border-yellow-500 hover:border-2 duration-300   border-2 border-gray-500">
                                                               
<!-- cantidad total -->
                <div
                    class="flex w-full flex-inline  text-center   py-1 px-0 font-bold ">
                    <span 
                        class="font-bold ml-3 text-center text-gray-700 self-center flex flex-inline  w-10/10 ">
                        <input type="hidden" id="inv_totalQuantity${counter}" value="${producto.existencias}">
                        <span id="inv_totalQuantityText${counter}"  class="ml-3 text-center ">
                            ${producto.existencias} 
                        </span>
                         - ${producto.medida}</span>
                </div>
                
                </div>
                <div class=" pt-2 pb-3 mt-2  text-center text-green-500 font-bold   border-2 border-gray-500  hover:border-yellow-500 hover:border-2 duration-300  ">
                 <!-- observacions -->
                    <div
                        class="flex w-full flex-inline  text-center   py-1 px-0 font-bold ">
                         <textarea
                            class="text-center text-sm  w-full  align-end self-align-end text-wrap    text-gray-700  w-2/3 "
                            id="inv_comments${counter}" value=""
                            placeholder="producto en estado ..."></textarea>
                        </textarea>
                    </div>

                </div>
                <div class=" pt-2 pb-3 mt-2 rounded-r-lg   text-center text-green-500 font-bold   border-2 border-gray-500  hover:border-yellow-500 hover:border-2 duration-300  ">
                 <!-- acciones -->
                <div
                     class="flex w-full  flex-inline aling-center  text-center   py-1 px-0 font-bold ">
                    <span
                        class="font-bold text-gray-700 opacity-50 hover:opacity-100  self-center w-full">
                        <butto onclick="user.dropProductFromDailyInv(${producto.id})"
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
            `;
            counter++;
        });

        console.log("producto inyectado")
        // defino la cantidad de productos que se renderizaron en los rpoductos y los guardo

        user.dailyInventary.counter = counter;
        // evento del inventario diario
        activateDailyInvEvents();


    }


    /**
     * resetea ls campos de la factura
     */
    resetBillInputs() {

        $('#pedidoID').val('');
        $('#customerName').val('');
        $('#customerNit').val('');
        $('#customerPhone').val('');
        $('#customerAdress').val('');
        $('#totalBill').val('');

    }

    /**
     * obtiene el ultimo id de la factura guardada (factura +1)
     */
    getBillId() {

        this.getDataToServer({
            controller: 'Bill.php',
            action: 'getBillId',
            method: 'GET'
        }, { nothing: 'nothing' })
            .then((data) => {
                // verifica si se trajo un objeto
                if (typeof data == 'object') {

                    $("#billCounterText").text(data.id);
                    $("#billCounterInput").val(data.id);
                } else {
                    Inventary.showErrorMensagge('n hay infoormacion que renderizar');
                }


                // GUARDO LA INFORMACION PARA LUEGO BUSCAR
                user.bill.lastBill = data;
            }, true, false);
    }

    /**
     * ingresa y configura los productos en el contenedor
     */
    setDateTobill() {
        let date = new Date();
        let bill = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
        $("#billDay").text(bill.day);
        $("#billMonth").text(bill.month);
        $("#billYear").text(bill.year);
    }


    /**
     * crea la estructura de un nuevo producto
     * 
     * @param {string} producto informacion del prodductos
     * @param {number} counter indexador del contenedor de la factura
     *
     */
    insertNewProductToBill(counter, producto) {
        // ingresa el producto al buffer

        let tbodyBill = document.getElementById('tbodyBill');
        producto.variante == 'default' ? producto.variante = '' : '';
        tbodyBill.innerHTML += `
        
            <div id="container${counter}"    class="flex  relative item-center justify-center  text-xs lg:text-sm ">
               <input type="hidden" id="productId${counter}" value="${producto.id}">
                                                <div
                                                    class="flex-1 w-max flex-inline text-center   mx-auto items-center justify-center text-center py-1 px-2 font-bold border border-gray-500">
                                                    <span data-index="${counter}"  class="font-bold text-gray-700  flex flex-inline    w-full"><input type="number"
                                                            class="text-center align-center mt-3  inputQuantityBill  " id="cantidad${counter}" value="1"> </span>
                                                </div>
                                                <div
                                                    class="flex-1 w-max flex-inline  text-center py-1 px-2 font-bold border border-gray-500">
                                                    <span
                                                        class="font-bold text-gray-700 flex flex-inline  self-center justify-center   w-full"><span id="prodInfo${counter}"
                                                            class="font-bold text-gray-700 grow ">${producto.medida} -  ${producto.nombre} ${producto.variante}
                                                        </span> <input type="hidden" id="productName${counter}"  value="${producto.medida} -  ${producto.nombre} ${producto.variante}"> <a
                                                            class="btn flex-end  opacity-50 hover:opacity-100  ml-8 pr-2   self-center justify-center transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:overflow-visible  hover:bg-base-500    "
                                                            onclick="user.searchUpdateProduct(${counter})"><svg width="20px"
                                                                height="20px" viewBox="0 0 24 24" fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round"
                                                                    stroke-linejoin="round"></g>
                                                                <g id="SVGRepo_iconCarrier">
                                                                    <path
                                                                        d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                                                        stroke="#ff2134ff" stroke-width="2"
                                                                        stroke-linecap="round" stroke-linejoin="round">
                                                                    </path>
                                                                </g>
                                                            </svg></a></span>
                                                </div>
                                                <div
                                                    class="flex-1 w-max flex-inline text-center   py-1 px-0 font-bold border border-gray-500">
                                                    <span class="font-bold text-gray-700 self-center flex flex-inline  w-full"><span class="w-5/10">$</span><input
                                                            type="number" class=" inputPrice  text-center align-center mt-3  "
                                                            name=""  id="precioUnitario${counter}" value="${producto.precio}"></span>
                                                </div>
                                                <div
                                                    class="flex-1 w-max flex-inline  text-center   py-1 px-0 font-bold border border-gray-500">
                                                    <span class="font-bold text-gray-700 self-center flex flex-inline  w-10/10 "><span class="w-5/10">$</span><input
                                                            type="number" class="text-center  p-0  align-center mt-3  "
                                                             class="inputTotalBill   w-5/10"  id="productoPrecio${counter}" value="${producto.precio}" ></span>
                                                </div>
                                                <div
                                                    class="flex-1 w-max flex-inline  text-center   py-1 px-1 font-bold border border-gray-500">
                                                    <span
                                                        class="font-bold text-gray-700 opacity-50 hover:opacity-100  self-center w-full">
                                                        <butto onclick="user.dropProductFromBill(${producto.id})"
                                                            class="btn rounded border rounded-full bg-red-500 hover:scale-110  hover:shadow-lg tranform duration-300 hover:text-red-100  hover:border-3 hover:border-blue-500   ease-in-out text-white  btn-danger">
                                                            ELIMINAR</butto>
                                                    </span>
                                                </div>
                                            </div>
        
        `;
        console.log("producto inyectado")
        // defino la cantidad de productos que se renderizaron en los rpoductos y los guardo
        activateBillEvents();
        inventary.customer.numberOfProductsInBill = counter;

        // calcula el nuevo total de la factura
        user.calculateTotalBill();
        // console.log(JSON.stringify(inventary.BillBuffer));

    }

    /**
       * crea la estructura de un nuevo producto
       * 
       * @param {string} producto informacion del prodductos
       * @param {number} counter indexador del contenedor de la factura
       *
       */
    insertNewProductToDailyInventary(counter, producto) {
        // ingresa el producto al  inventario diario

        let tbodyDiaryInventary = document.getElementById('tbodyDiaryInventary');
        producto.variante == 'default' ? producto.variante = '' : '';
        tbodyDiaryInventary.innerHTML += `
        
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
                                                            class="font-bold text-gray-700 grow ">  ${producto.nombre} ${producto.variante}
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
                                                            class="ml-3"> <input type="hidden" id="inv_existencias${counter}" value="${producto.existencias}"> <span>${producto.existencias}</span> </span> -  ${producto.medida}}</span>
                                                </div>

                                                <!-- nuevas cantidaes -->
                                                <div
                                                    class="flex w-full flex-inline align-center  text-center  pl-0 pr-5   mx-auto items-center justify-center text-center py-1 px-2 font-bold border border-gray-500">
                                                    <span data-index="${counter}"
                                                        class="font-bold text-gray-700  flex flex-inline    w-full">
                                                        <input type="number"
                                                            class="text-center w-20 p-0   align-center mt-1  inputQuantityInv  "
                                                            id="inv_newQuantity${counter}" value="10"> <span
                                                            class="align-center justify-self-center mt-1"> ${producto.medida}
                                                        </span> </span>
                                                </div>
<!-- cantidad total -->
                                                <div
                                                    class="flex w-full flex-inline  text-center   py-1 px-0 font-bold border border-gray-500">
                                                    <span 
                                                        class="font-bold text-gray-700 self-center flex flex-inline  w-10/10 ">
                                                        <input type="button" id="inv_totalQuantity${counter}" value="${producto.existencias}">
                                                        <span id="inv_totalQuantityText${counter}"  class="ml-3 text-center ">
                                                           
                                                        </span>
                                                        ${producto.medida}</span>
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
                                                        <butto onclick="user.dropProductFromDailyInv(${producto.id})"
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

        
        `;
        console.log("producto inyectado")
        // defino la cantidad de productos que se renderizaron en los rpoductos y los guardo

        user.dailyInventary.counter = counter;
        // evento del inventario diario
        activateDailyInvEvents();

    }


    /**
     * una de muchas funciones de renderizado , adaptable
     * @param {*} data datos de la consulta
     * @param {string} [type='default'] es el tipo de renderizado , para hacer que el buffer no se reasigne pendejamente :V
     */
    renderOrders(data, type = 'default') {
        if (data.length > 0) {
            // ternaria que verifica si el tipo de renderizad es por
            //  default para guardar los datos del arreglo  de entrada en el buffer
            Inventary.hideLoadingModal();
            type != 'customized' ? inventary.OrdersBuffer = data : '';
            // inventary.OrdersBuffer = data;


            // creando configuracion
            inventary.createOrdersCards(data);
            inventary.createPagination(data);

            // ahora si muestra el modal con los pedidos
            ordersModal.showModal();
        } else {

        }


    }
    createOrdersCards(data) {
        let index = 1;
        let count = 0;
        let container = document.getElementById("ordersCardContainers");
        container.innerHTML = '';
        for (let pedido of data) {
            // valida si ya paso el numero de iteraciones
            if (count >= 20) break;
            // renderiza el pedido
            container.innerHTML += `
            
            
                    <div class="card w-86 ml-1 mb-2 mr-1 mt-2  bg-base-100 rounded-lg shadow-sm">
                        <div class="card-body">
                            <span   class="badge badge-xs ">${pedido.fecha}</span>
                            <span  id="orderState${index}"  class="badge   badge-xs badge-warning">${pedido.estado}</span>
                            <div class="flex justify-between">
                            <h2 class="text-3xl font-bold mr-3"   >${pedido.Usuario}</h2>

                                <span class="text-xl">Total <strong >$ ${inventary.addPuntuaction(pedido.precioTotal)}</strong></span>
                                </div>
                                <ul id="productsList${index}"  class="mt-6 flex flex-col gap-2 text-xs">
                                </ul>
                                <div class="mt-6">
                                <butto onclick="inventary.getDataFromServer({
                                    controller: 'Order.php',
                                    action: 'getOrderInfo&orderID=${pedido.pedidoId}'
                                    }, inventary.renderBill)"  class="btn color-sena text-white  transition delay-150 duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-500 hover:text-white   btn-block">Crear factura</butto>
                                </div>
                            </div>
                        </div>

            `;


            // seteando cierta informacion aqui 
            let productIndex = 1;
            // let orderDate  = document.getElementById(`orderDate${index}`); 
            // let orderUser  = document.getElementById(`orderUser${index}`); 
            // let orderState  = document.getElementById(`orderState${index}`); 
            let productList = document.getElementById(`productsList${index}`);

            // cambpagination.a el badge dependiendo el estado
            pedido.estadoID != 1 ? $(`#orderState${index}`).addClass('badge-error') : $(`#orderState${index}`).addClass('badge-warning');
            // bucle que   renderiza cada uno de los productos

            pedido.productos.forEach(producto => {
                console.log("/// producto" + producto);
                productList.innerHTML += `
                     <li id="li_${index}_${productIndex}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 w-6 h-6  me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                        <span id="productDescription_${index}_${productIndex}">${producto.nombre}  ${producto.variante} X ${producto.cantidad} ${producto.medida} == $${inventary.addPuntuaction(producto.precioParcialProducto)} </span>
                    </li>
                `;

                // aca dependiendo del estado del producto (ejemplo  1 = activo) trazo o no traza una linea en señl de que no se cumplio el requisito
                if (producto.estado != 1) {
                    // li
                    $(`#li_${index}_${productIndex}`).addClass('opacity-50');

                    // la descripcion de los productos
                    $(`#productDescription_${index}_${productIndex}`).addClass('line-through');
                    console.log("agregando estado visual del producto 🎞🎗🎁");
                }

                productIndex++;
            });
            // incrementa el index de control
            index++;
            count++;

        };
    }
    /**
     * crea la paginacion con  sus respectivos numeros o cosas para moverse :V en ñ parte de los pedidos
     */
    createPagination(data) {
        let maxPag = inventary.calculateMaxPagination(data);
        let paginationContainer = document.getElementById("orderPaginationContainer");

        //    metemos la primera paginacion
        paginationContainer.innerHTML = `
        <input
            class="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="1"
            checked="checked" 
            onclick="alert(1)"
            />
        `;
        // createOrdersCardsByPagination(multiplier)
        for (let i = 1; i < maxPag; i++) {
            paginationContainer.innerHTML += `
                    <input onclick="inventary.createOrdersCardsByPagination(${i + 1})"  class="join-item btn btn-square" type="radio" name="options" aria-label="${i + 1}" />
            `;
        }

    }
    /**
     * renderiza slo el paquete de 20 datos del arreglo principal que tiejne todos los datos de los pedidos
     * @param {number} multiplier es variable que controla cual paquete de informacion mstrar
     */
    createOrdersCardsByPagination(multiplier) {
        // aca seccional la informacion y luego la renderiza la informacion
        this.segmentOrdersData(multiplier).then((newOrdersData) => {
            this.createOrdersCards(newOrdersData);
        })
    }

    /**
     * renderiza solo la informacion de los pedidos que se estan buscando
     * @param {array} data 
     */
    renderSearchedOrders(data) {
        // aca renderiza la informacion que se va buscando en el evento de onchange
        console.log("renderizando espera ademas ek arreglko grande tiene " + this.OrdersBuffer.length);
        let index = 1;
        let container = document.getElementById("ordersCardContainers");
        container.innerHTML = '';
        for (let pedido of data) {


            // renderiza el pedido
            container.innerHTML += `
            
            
                    <div class="card w-86 ml-1 mb-2 mr-1 mt-2  bg-base-100 rounded-lg shadow-sm">
                        <div class="card-body">
                            <span   class="badge badge-xs ">${pedido.fecha}</span>
                            <span  id="orderState${index}"  class="badge   badge-xs badge-warning">${pedido.estado}</span>
                            <div class="flex justify-between">
                            <h2 class="text-3xl font-bold mr-3"   >${pedido.Usuario}</h2>

                                <span class="text-xl">Total <strong >$ ${pedido.precioTotal}</strong></span>
                                </div>
                                <ul id="productsList${index}"  class="mt-6 flex flex-col gap-2 text-xs">
                                </ul>
                                <div class="mt-6">
                                <butto class="btn btn-success transition delay-150 duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-green-500 hover:text-white   btn-block">Crear factura</butto>
                                </div>
                            </div>
                        </div>

            `;
            // seteando cierta informacion aqui 
            let productIndex = 1;
            // let orderDate  = document.getElementById(`orderDate${index}`); 
            // let orderUser  = document.getElementById(`orderUser${index}`); 
            // let orderState  = document.getElementById(`orderState${index}`); 
            let productList = document.getElementById(`productsList${index}`);

            // cambia el badge dependiendo el estado
            pedido.estadoID != 1 ? $(`#orderState${index}`).addClass('badge-error') : $(`#orderState${index}`).addClass('badge-warning');
            // bucle que   renderiza cada uno de los productos

            pedido.productos.forEach(producto => {
                productList.innerHTML += `
                     <li id="li${productIndex}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                        <span id="productDescription${productIndex}">${producto.nombre}  ${producto.variante} X ${producto.cantidad} ${producto.medida} == $${producto.precioParcialProducto} </span>
                    </li>
                `;

                // aca dependiendo del estado del producto (ejemplo  1 = activo) trazo o no traza una linea en señl de que no se cumplio el requisito
                if (producto.estado != 1) {
                    // li
                    $(`#li${productIndex}`).addClass('opacity-50');

                    // la descripcion de los productos
                    $(`#productDescription${productIndex}`).addClass('line-through');
                }

                productIndex++;
            });
            // incrementa el index de control
            index++;


        }
        console.log(data);

    }
    /**
     * 
     * @param {*} htmlInputId id del input
     * @param {*} data arreglo que agrupa ["controller","action"]
     */
    submitModalForm(htmlInputId, data) {
        let form = document.getElementById("modalCreacionForm");

        // data[0]  =controller
        // data[1] = action
        this.sendDataFromModalForm(htmlInputId, data[0], data[1]).then((data) => {
            // user.targetModal.close();
            console.log("intentando cerrar modales..");
            modalCreacion.close();
            Inventary.showModalSucces(data.mensagge);
        })
            .catch(() => {
                console.log("intentando cerrar modales..");
                modalCreacion.close();
                Inventary.showInfoModal('error al enviar la informacion');
            })

    };
    /**
     * muestra el modal de viajando hacia vents
     */
    travelToVENTS() {
        goingToVentsModal.showModal();
        setTimeout(() => {
            window.location.href = `${this.serverIp}/mercasena/services/vents/ventas.php`;
        }, 3000);
    }
    /**
     * apartir del modal y formulario dinamico
     * envia los datos para guardar  apartir de la informacion recolectadada por el modal registro
     * @param {*} htmlInputId  id del input del formulario
     * @param {*} controller  controllador al cual va a ser atendido
     * @param {*} action  accion para guardar ese dato
     */
    sendDataFromModalForm(htmlInputId, controller, action) {
        return new Promise((resolve, reject) => {
            $.ajax({
                // url: `${this.baseUrl}${controller}?action=${action}`,
                url: `${this.baseUrl}${controller}`,
                method: "POST",
                headers: {
                    'Mercasena-token': user.sessionHash
                },
                // envia los datos al servidor
                data: JSON.stringify({
                    action: action,
                    label: input
                }),
                beforeSend: () => {
                    let input = document.getElementById(htmlInputId).value;
                    console.log("preparando datos");
                    console.log(`datos input = ${input}`);

                },
                success: (data) => {
                    // muestra el modal con el mensaje
                    Inventary.showModalSucces(data.mensagge);
                    resolve(data)
                },
                error: function (xhr, status, error) {
                    // Código a ejecutar si la petición falla
                    console.error('Error:', error);
                    reject(error);
                }
            })
        })


    }
    // esta es la abstraccion para enviar datos para guardar solamente
    /**
     * permite que se envie datos y se guarden en el servidor , solo funciona con metodos
     * de solo guardar y confirmar el guardado
     * @param {*} htmlInputId 
     * @param {*} controller 
     * @param {*} action 
     */
    sendOnlySaveDataToServer(htmlInputId, controller, action) {
        $.ajax({
            url: `${this.baseUrl}${controller}?action=${action}`,
            method: "POST",
            headers: {
                'Mercasena-token': user.sessionHash
            },
            // envia los datos al servidor
            data: JSON.stringify({
                action: action,
                campo: input
            }),
            beforeSend: () => {
                let input = document.getElementById(htmlInputId).value;
                console.log("preparando datos");
                console.log(`datos input = ${input}`);

            },
            success: (data) => {
                // muestra el modal con el mensaje
                Inventary.showModalSucces(data.mensagge);
            },
            error: (response) => {
                Inventary.showWarningMensagge(response.error);
            }

        })

    }

    // ================ FUNCIONES DE ELIMINAR =================================

    showDeletionModal(object, callback) {
        $("#prepositionID").text(object.preposition);
        $("#itemNameDeleteModal").text(object.name);
        user.deleteCallbackFunction = callback;
        // asigno el callback a un atributo de la clase user llamado deleteCallbackFunction
        document.getElementById('buttonsContainerModalDelete').innerHTML = `
    <button onclick="eliminateModal.close()"
        class="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-300 hover:border-gray-300 text-gray-300 hover:text-gray-800 rounded-full hover:shadow-lg hover:bg-gray-400 transition ease-in duration-300">
            Cancelar
        </button>
        <button onclick="user.deleteCallbackFunction(${object.id})"
            class="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300">
            Confirmar
        </button>
    `;
        eliminateModal.showModal();
    }
    // ====================================================================
    // ======================== PARTE DONDE SE RENDERIZAN LOS DATOS DE LAS TABLAS =====================
    /**
     * limpia la tabla de informacion
     */
    cleanTable() {
        this.table.innerHTML = "";
    }

    /**
     * 
     * @param {object} self contexto del objeto actual
     * @param {function} callback  funcion que se va a ejecutar cuando se termine de consultar la informacion ejemplo renderizarProdcutosTable
     * @param {function} setter functin que setea el formulario en POST 
     */
    addFunctionalityToAddButton(self, callback, setter) {

        console.info("funcionalidad añadida  al boton de agregar")
    }

    /**
     * setea el formulario para metodo POST para guardar un registro 
     * @param {*} index  seria el index del objeto o la coleccion ver modalScript primeras lineas
     */
    setToPostMethod(index) {
        arr[index].method = "POST";
    }
    /**
     * setea el formulario para metodo PUT para actualizar un registro
     * @param {*} index  seria el index del objeto o la coleccion ver modalScript primeras lineas
     */
    setToPutMethod(index) {
        arr[index].method = "PUT";
        console.info("setteado a PUT");
    }

    /**
    * renderiza la tabla 
    * @param tableType  tipo de tabla que se va a renderizar products, measurements  o categories ademas dependiendo lo que se le ponga ajustara el acitn para obtener informacion de la tabla 
    * @param {function} callback  funcion que se va a ejecutar cuando se termine de consultar la informacion ejemplo renderizarProdcutosTable
    */

    renderTable(tableType, callback) {
        // ternarias de validacion que ajustan el action en su consecuencia 
        tableType == "category" ? this.serverInfo.action = "getCategories" : null;
        tableType == "measurement" ? this.serverInfo.action = "getAllMeasurements" : null;
        tableType == "product" ? this.serverInfo.action = "getAllInformation" : null;
        tableType == "baseProduct" ? this.serverInfo.action = "getAllBaseProducts" : null;
        // genera la consulta 
        // da el objeto osea como estael objeto que salio de inventario
        this.getDataToTable(this, callback);
        // crea la consulta para luego renderizar las tablas
    }


    /**
     * consulta los datos y luego ejecuta un callback que se encarga de renmderizar esa informacion en las tablas
     * ademas el se autoc'onfigura con la informacion del servidor
     * @param {string} typeTable  tipo de tabla que se va a renderizar Products, Measurements  o categories
    * @param {function} callback  funcion que se va a ejecutar cuando se termine de consultar la informacion ejemplo renderizarProdcutosTable
    */
    getDataToTable(self, callback) {

        // ternarias de producto

        // ternarias de validacion
        $.ajax({
            url: `${self.baseUrl}${self.serverInfo.controller}?action=${self.serverInfo.action}`,
            // url: `${this.baseUrl}${controller}`,
            method: "GET",
            // envia los datos al servidor
            beforeSend: () => {
                console.log("configurando consulta");
            },
            success: (data) => {
                // puede ser cualquier metodo de renderizado
                // self es el objeto actual osea inventary
                callback(data, self);
                // muestra el modal con el mensaje
                // this.showModalSucces(data.mensagge);
            },
            error: (response) => {
                // muestra el modal con el mensaje
                Inventary.showErrorMensagge(response.error);
                Inventary.showErrorMensagge(response.mensagge);
            }

        })

    }

    /**
     * esta es la funcion que permite renderizar informacion de ls productos en las tablas
     * @param {object} products
     * @param {object} self es el objeto de contexto ya que el ajax le hace perder el contexto del this
     
    // */
    // aca cambie el lenguaje del parametro para que tenga sentido tipo producto.nombre n product.nombre
    renderProductsTable(productos, self) {
        // guarda los prductos en un buffer
        self.productsBuffer = productos;

        self.cleanTable();
        // agregamos el thead primero
        self.table.innerHTML = `
                <thead>
                    <tr id="theadOptions">
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <!-- lg es tamaño para pantalla del pc -->
                        <th class="text-sm  lg:text-xl      color-sena-texto">Producto</th>
                        <th class="text-sm  lg:text-xl      color-sena-texto   lg:text-sm">Categoria</th>
                        <th class="text-sm  lg:text-xl      color-sena-texto">Precio</th>
                        <th class="text-sm  lg:text-xl      color-sena-texto">Existencias</th>
                        <th class="text-sm  lg:text-xl      color-sena-texto">Medida de venta</th>
                        <th class="text-sm  lg:text-xl      color-sena-texto">Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tbodyData" class="items-center justify-center  ">
                </tbody>
                <!-- foot -->
                <tfoot>
                    <tr>
                        <th></th>
                        <!-- lg es tamaño para pantalla del pc -->
                        <th class="text-sm  lg:text-xl      color-sena-texto">Producto</th>
                        <th class="text-sm  lg:text-xl      color-sena-texto text-sm  lg:text-sm">Categoria</th>
                        <th class="text-sm  lg:text-xl      color-sena-texto">Precio</th>
                        <th class="text-sm  lg:text-xl      color-sena-texto">Existencias</th>
                        <th class="text-sm  lg:text-xl      color-sena-texto">Medida de venta</th>
                        <th class="text-sm  lg:text-xl      color-sena-texto">estado</th>
                        <th></th>
                    </tr>
                </tfoot>
        `;
        //=============== aca se rendiza toda la informacion ============

        // productos.forEach(producto => {



        productos.forEach(producto => {
            var element = document.getElementById("tbodyData");
            element.innerHTML += `
              <tr class="hover:bg-base-300 mb-4 mt-4">
            <td>
                <label>
                     <label class="switch">
  <input class="productVisibilityCheckbox_table" data-prodid-table="${producto.productoID}"  id="productCheckBox_table${producto.productoID}"  type="checkbox">
  <div class="slider"></div>
  <div class="slider-card">
    <div class="slider-card-face slider-card-front"></div>
    <div class="slider-card-face slider-card-back"></div>
  </div>
</label>
<style>

/* Hide default HTML checkbox */
.switch #productCheckBox_table${producto.productoID} {
  opacity: 0;
  width: 0;
  height: 0;
}

#productCheckBox_table${producto.productoID}:checked ~ .slider-card .slider-card-back {
  transform: rotateY(0);
}

#productCheckBox_table${producto.productoID}:checked ~ .slider-card .slider-card-front {
  transform: rotateY(-180deg);
}

#productCheckBox_table${producto.productoID}:checked ~ .slider-card {
  transform: translateX(1.5em);
}

#productCheckBox_table${producto.productoID}:checked ~ .slider {
  background-color: #9ed99c;
}
</style>
                        </div>
                         
                    </div>
                      
                    </div>
                </div>
                </label>
                <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                        <img src="${producto.imagen}"
                            alt="${producto.producto}" />
                    </div>
                </div>
            </td>
            <td>
                <div class="flex items-center align-center  gap-3">
                   
                    <div>
                        <div class="font-bold text-lg">${producto.producto}</div>
                        <div class="text-base opacity-50 ">${producto.variacion}</div>
                    </div>
                </div>
            </td>
            <td class="justify-center item-center">
                <span class="badge badge-secondary badge-lg  transition delay-150 duration-300 ease-in-out hover:scale-110  hover:bg-red-500 hover:text-white">${producto.categoria}</span>
            </td>
    
            <td class="text-sm  lg:text-xl    ml-1 text-center   "> ${inventary.addPuntuaction(producto.precio)}</td>
            <td class="text-sm  lg:text-xl   text-center" >${producto.existencias}</td>
            <td class="text-sm  lg:text-xl   text-center" >${producto.medidaVenta}</td>
            <td class="text-center w-auto inline-text"> 
                <div id="${'badgeContainer' + producto.productoID}" class="badge badge-md text-md hover:text-white hover:font-semibold   whitespace-nowrap transition delay-80 duration-300 ease-in-out hover:traslate-y-1 hover:scale-110 ">
                    <div id="${'logoContainer' + producto.productoID}" class="flex  text-md text-white-900 justify-center items-center">
                       
                    </div>
                   
                  ${producto.estado}
                </div>
            </td>
            <th class="flex  z-100 overflow-visible  ">
                <!-- drodown de opciones -->
                <div class="dropdown dropdown-top">
                    <div tabindex="0" role="button" class="btn m-1"><svg
                            xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 512 512">
                            <path fill="currentColor"
                                d="M256 144a64 64 0 1 0-64-64a64.072 64.072 0 0 0 64 64Zm0-96a32 32 0 1 1-32 32a32.036 32.036 0 0 1 32-32Zm0 320a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Zm0-272a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Z" />
                        </svg>
                    </div>
    
                    <ul tabindex="0"
                        class="dropdown-content overflow-y-visible  menu bg-base-100 rounded-box z-1 w-50 h-auto  p-2 shadow-sm">
                       
                        
                        
                         <!-- el de las alertas -->
                        <li  >
                        <button class=" "  onclick="inventary.createLowStockProductPanel(${producto.productoID});">
                        <svg class="ml-2  mt-2 mb-2"  width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffdd00"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.9997 12.5815V9.58148M11.9997 15.5815H12.0097M18.9997 20.5815L16.4094 18.0182M4.9997 20.5815L7.59001 18.0182M6.74234 3.99735C6.36727 3.62228 5.85856 3.41156 5.32812 3.41156C4.79769 3.41156 4.28898 3.62228 3.91391 3.99735C3.53884 4.37242 3.32813 4.88113 3.32812 5.41156C3.32812 5.942 3.53884 6.4507 3.91391 6.82578M20.0858 6.82413C20.4609 6.44905 20.6716 5.94035 20.6716 5.40991C20.6716 4.87948 20.4609 4.37077 20.0858 3.9957C19.7107 3.62063 19.202 3.40991 18.6716 3.40991C18.1411 3.40991 17.6324 3.62063 17.2574 3.9957M18.9997 12.5815C18.9997 16.4475 15.8657 19.5815 11.9997 19.5815C8.1337 19.5815 4.9997 16.4475 4.9997 12.5815C4.9997 8.71549 8.1337 5.58149 11.9997 5.58149C15.8657 5.58149 18.9997 8.71549 18.9997 12.5815Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        
                        </button>
                        </li>
                        <!-- el de eliminar -->
                        
    
                               <!-- el de editar  -->
                        <li>
                            <button onclick="user.editProduct(${producto.productoID})"  >
                                <svg class="ml-2 mt-2 mb-2" xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" viewBox="0 0 32 32">
                                    <path fill="green"
                                        d="M27.87 7.863L23.024 4.82l-7.89 12.566l4.843 3.04L27.87 7.863zM14.395 21.25l-.107 2.855l2.527-1.337l2.35-1.24l-4.673-2.936l-.097 2.658zM29.163 3.24L26.63 1.647a1.364 1.364 0 0 0-1.88.43l-1 1.588l4.843 3.042l1-1.586c.4-.64.21-1.483-.43-1.883zm-3.965 23.82c0 .275-.225.5-.5.5h-19a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5h13.244l1.884-3H5.698c-1.93 0-3.5 1.57-3.5 3.5v19c0 1.93 1.57 3.5 3.5 3.5h19c1.93 0 3.5-1.57 3.5-3.5V11.097l-3 4.776v11.19z" />
                                </svg>
                            </button>
                        </li>
    
    
                    </ul>
    
                </div>
            </th>
        </tr>
            `;
            if (producto.esVisible == '1') {
                // btnCheckProd.checked = true;
                document.getElementById(`productCheckBox_table${producto.productoID}`).setAttribute('checked', true);
            } else {
                // document.getElementById(`productCheckBox${producto.id}`).setAttribute('checked', true);
                // btnCheckProd.checked = false;
            }
            // confirguraciones de las tablas como colores y logos
            //    confirguracion del color y logo del contenedor 
            switch (producto.estado) {
                case 'Disponible':

                    $(`#badgeContainer${producto.productoID}`).addClass('badge-success hover:bg-green-600');
                    // llena el contenedor con el logo
                    $(`#logoContainer${producto.productoID}`).html(`
                        <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></polyline></g></svg>                    `
                    );

                    // document.getElementById(`badgeContainer${producto.productoID}`).classList.add('badge-warning');
                    // document.getElementById(`logoContainer${producto.productoID}`).innerHTML =`  <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></polyline></g></svg>    `;

                    break;
                case 'Agotado':
                    //    pone el badge error
                    $(`#badgeContainer${producto.productoID}`).addClass('badge-error hover:bg-red-600');
                    // llena el contenedor con el logo
                    $(`#logoContainer${producto.productoID}`).html(`
                        <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg>
                    `
                    );

                    break;
                case 'Pocas Unidades':
                    $(`#badgeContainer${producto.productoID}`).addClass('badge-warning hover:bg-yellow-600');
                    // llena el contenedor con el logo
                    $(`#logoContainer${producto.productoID}`).html(`
 <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><g fill="currentColor"><path d="M7.638,3.495L2.213,12.891c-.605,1.048,.151,2.359,1.362,2.359H14.425c1.211,0,1.967-1.31,1.362-2.359L10.362,3.495c-.605-1.048-2.119-1.048-2.724,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><line x1="9" y1="6.5" x2="9" y2="10" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line><path d="M9,13.569c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" fill="currentColor" data-stroke="none" stroke="none"></path></g></svg>
                        `);

                    // document.getElementById().classList.add('badge-warning');
                    // document.getElementById().innerHTML =`  <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></polyline></g></svg>    `;

                    break;
                default:
                    break;
            }
        });

        // agrega funcionalidad al botn de agregar  para que abra el modal especifico de l que se renderiz

        // self.addFunctionalityToAddButton(self, inventary.forms.product.showModal);
        self.addButton.onclick = () => {

            inventary.forms.product.showModal();
            // seteo el target modal para el usuario
            user.targetModal = formularioProducto;

        }

        // muestra el boton de productos Base 
        $("#btnbaseProduct").removeClass("hidden");

        // activa los eventos 
        inventary.activateSearchEvents_table();

    }


    /**
         * esta es la funcion que permite renderizar informacion de los productos base  
         * de los productos  en las tabla
         * @param {object} productos datos de las productos base 
         * @param {object} self es el objeto de contexto ya que el ajax le hace perder el contexto del this
     
        */
    renderBaseProductsTable(productos, self) {
        self.baseProductsBuffer = productos;
        self.cleanTable();
        // primero renderizamos la tabla
        self.table.innerHTML = `
        <thead>
            <tr id="theadOptions">
                <th class="text-xl color-sena-texto " >Fecha de creacion</th>
                <th  class="text-xl color-sena-texto">Producto base</th>
                <th></th>
            </tr>
        </thead>
    <!-- thead -->
        <tbody id="tbodyData" class="text-center justify-center">
        </tbody>
    <!-- foot -->
        <tfoot>
            <tr>
                <th>Fecha de creacion</th>
                <th>Producto base</th>
                <th></th>
            </tr>
        </tfoot>
        `;
        // ===================== RENDERIZANDO INFORMACION EN LA TABLA =========================

        productos.forEach(producto => {
            var element = document.getElementById("tbodyData");
            element.innerHTML += ` 
        <tr class="hover:bg-base-300">
                <td>
                    <div class="flex items-center mx-auto">
                        <span class=" text-xl mx-auto text-center text-gray-400 font-bold">${producto.fechaCreacion}</span>
                    </div>
                </td>
                <td class=" align-center items-center justify-center gap-3">
        
                    <br />
                    <span class="badge badge-ghost text-x2l font-bold  badge-xl transition delay-150 duration-300 ease-in-out hover:scale-110  hover:bg-indigo-500 hover:text-white">${producto.nombre}</span>
                </td>
                <td class="flex  z-100 overflow-visible ">
                    <!-- drodown de opciones -->
                    <div class="dropdown z-100  dropdown-top">
                        <div tabindex="0" role="button" class="btn m-1"><svg
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 512 512">
                                <path fill="currentColor"
                                    d="M256 144a64 64 0 1 0-64-64a64.072 64.072 0 0 0 64 64Zm0-96a32 32 0 1 1-32 32a32.036 32.036 0 0 1 32-32Zm0 320a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Zm0-272a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Z" />
                            </svg></div>
        
                        <ul tabindex="0"
                            class="dropdown-content menu bg-base-100 rounded-box z-1 w-30 p-2 shadow-sm">
                            <!-- el de eliminar -->
                            
        
                            <!-- el de editar -->
                            <li>
                            <input type="hidden" value="${producto.id}" id="my-modal-3" class="modal-toggle" />
                                <button  onclick="user.editBaseProduct(${producto.id})">
                                    <svg class="ml-2 mt-2 mb-2" xmlns="http://www.w3.org/2000/svg"
                                        width="20" height="20" viewBox="0 0 32 32">
                                        <path fill="green"
                                            d="M27.87 7.863L23.024 4.82l-7.89 12.566l4.843 3.04L27.87 7.863zM14.395 21.25l-.107 2.855l2.527-1.337l2.35-1.24l-4.673-2.936l-.097 2.658zM29.163 3.24L26.63 1.647a1.364 1.364 0 0 0-1.88.43l-1 1.588l4.843 3.042l1-1.586c.4-.64.21-1.483-.43-1.883zm-3.965 23.82c0 .275-.225.5-.5.5h-19a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5h13.244l1.884-3H5.698c-1.93 0-3.5 1.57-3.5 3.5v19c0 1.93 1.57 3.5 3.5 3.5h19c1.93 0 3.5-1.57 3.5-3.5V11.097l-3 4.776v11.19z" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
            
            `;
        })
        // aca se le agrega funcinalidad al boton  para quie abra el modal de agregar categoria y a su vex ponga el modal en fornma de POST
        self.addButton.onclick = () => {
            self.setToPostMethod(1)
            inventary.forms.baseProduct.showModal();
            // seteo el target modal para el usuario
            // user.targetModal.close = modalCreacion.close();
            // console.log(user.targetModal);

        }

    }

    /**
     * esta es la funcion que permite renderizar informacion de las categorias 
     * de los productos  en las tabla
     * @param {object} categories datos de las categorias
     * @param {object} self es el objeto de contexto ya que el ajax le hace perder el contexto del this
     * 
     */
    renderCategoryTable(categorias, self) {
        self.categoriesBuffer = categorias;
        self.cleanTable();
        // primero renderizamos la tabla
        self.table.innerHTML = `
        <thead>
            <tr id="theadOptions">
                <th class="text-xl color-sena-texto" >Fecha de creacion</th>
                <th  class="text-xl color-sena-texto">Categoria</th>
                <th></th>
            </tr>
        </thead>
<!-- thead -->
        <tbody id="tbodyData" class="text-center justify-center">
        </tbody>
<!-- foot -->
        <tfoot>
            <tr>
                <th>Fecha de creacion</th>
                <th>Categoria</th>
                <th></th>
            </tr>
        </tfoot>
        `;
        // ===================== RENDERIZANDO INFROMACION EN LA TABLA =========================

        categorias.forEach(categoria => {
            var element = document.getElementById("tbodyData");
            element.innerHTML += ` 
           <tr class="hover:bg-base-300">
                <td>
                    <div class="flex items-center mx-auto">
                        <span class=" text-xl mx-auto text-center text-gray-400 font-bold">${categoria.fechaCreacion}</span>
                    </div>
                </td>
                <td>
        
                    <br />
                    <span class="badge badge-ghost text-x2l bg-red-500 hover:text-white  badge-lg">${categoria.nombre}</span>
                </td>
                <td class="flex  z-100 overflow-visible ">
                    <!-- drodown de opciones -->
                    <div class="dropdown z-100  dropdown-top">
                        <div tabindex="0" role="button" class="btn m-1"><svg
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 512 512">
                                <path fill="currentColor"
                                    d="M256 144a64 64 0 1 0-64-64a64.072 64.072 0 0 0 64 64Zm0-96a32 32 0 1 1-32 32a32.036 32.036 0 0 1 32-32Zm0 320a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Zm0-272a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Z" />
                            </svg></div>
        
                        <ul tabindex="0"
                            class="dropdown-content menu bg-base-100 rounded-box z-1 w-30 p-2 shadow-sm">
                            <!-- el de eliminar -->
                            <li class="justify-center">
                                <button  onclick="inventary.showDeletionModal({preposition:'la categoria ',name :'${categoria.nombre}',id:'${categoria.id}'},user.deleteCategory)" >
                                <svg class="ml-2  mt-2 mb-2"
                                        xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                        viewBox="0 0 24 24">
                                        <g fill="none" fill-rule="evenodd">
                                            <path
                                                d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                                            <path fill="red"
                                                d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2h-1v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558ZM17 7H7v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7Zm-2.72-3H9.72l-.333 1h5.226l-.334-1Z" />
                                        </g>
                                    </svg>
                                </button>
                            </li>
        
                            <!-- el de editar -->
                            <li>
                            <input type="hidden" value="${categoria.id}" id="my-modal-3" class="modal-toggle" />
                                <button  onclick="user.editCategory(${categoria.id})">
                                    <svg class="ml-2 mt-2 mb-2" xmlns="http://www.w3.org/2000/svg"
                                        width="20" height="20" viewBox="0 0 32 32">
                                        <path fill="green"
                                            d="M27.87 7.863L23.024 4.82l-7.89 12.566l4.843 3.04L27.87 7.863zM14.395 21.25l-.107 2.855l2.527-1.337l2.35-1.24l-4.673-2.936l-.097 2.658zM29.163 3.24L26.63 1.647a1.364 1.364 0 0 0-1.88.43l-1 1.588l4.843 3.042l1-1.586c.4-.64.21-1.483-.43-1.883zm-3.965 23.82c0 .275-.225.5-.5.5h-19a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5h13.244l1.884-3H5.698c-1.93 0-3.5 1.57-3.5 3.5v19c0 1.93 1.57 3.5 3.5 3.5h19c1.93 0 3.5-1.57 3.5-3.5V11.097l-3 4.776v11.19z" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
            
            `;
        })
        // aca se le agrega funcinalidad al boton  para quie abra el modal de agregar categoria 

        self.addButton.onclick = () => {
            self.setToPostMethod(2);
            inventary.forms.category.showModal();
        }


    }
    /**
     * esta es la funcion que permite renderizar informacion delas medidas de venta 
     *
     * de los productos  en las tabla
     * @param {object} measurements 
     * @param {object} self es el objeto de contexto ya que el ajax le hace perder el contexto del this
     */
    renderMeasurementTable(medidas, self) {
        // asigna lo que se trajo de la consulta  a ls buffers
        self.measurementsBuffer = medidas;
        self.cleanTable();
        self.table.innerHTML = `
        
                <thead>
                    <tr id="theadOptions">
                        <th class="text-xl color-sena-texto" >Fecha de creacion</th>
                        <th  class="text-xl color-sena-texto">Cantidad  en el que se vende</th>
                        <th  class="text-xl color-sena-texto">Nombre de la Medida</th>
                    v
                    </tr>
                </thead>
        <!-- thead -->
                <tbody id="tbodyData" class="text-center justify-center">
                </tbody>
        <!-- foot -->
                <tfoot>
                    <tr>
                        <th class="text-xl" >Fecha de creacion</th>
                        <th  class="text-xl">Cantidad  en el que se vende</th>
                        <th  class="text-xl">Nombre de la Medida</th>
                        <th></th>
                    </tr>
                </tfoot>

        `;
        // ===================== RENDERIZANDO INFROMACION EN LA TABLA =========================
        medidas.forEach(medida => {
            var tbody = document.getElementById("tbodyData");
            tbody.innerHTML += ` 
     
        <tr class="hover:bg-base-300">
            <td>
                <div class="flex items-center mx-auto">
                    <span class=" text-xl mx-auto text-center text-gray-400 font-bold">${medida.fechaCreacion}</span>
                </div>
            </td>
            <td>
                <span class=" text-xl mx-auto text-center text-black-400 font-bold">${medida.factor}</span>
            </td>
            <td>

                <br />
                <span class="text-2xl text-center text-green-500">${medida.nombre}</span>
            </td>
            <td class="flex  z-100 overflow-visible ">
                <!-- dropdown de opciones -->
                <div class="dropdown z-100  dropdown-top">
                    <div tabindex="0" role="button" class="btn m-1"><svg
                            xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 512 512">
                            <path fill="currentColor"
                                d="M256 144a64 64 0 1 0-64-64a64.072 64.072 0 0 0 64 64Zm0-96a32 32 0 1 1-32 32a32.036 32.036 0 0 1 32-32Zm0 320a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Zm0-272a64 64 0 1 0 64 64a64.072 64.072 0 0 0-64-64Zm0 96a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Z" />
                        </svg></div>

                    <ul tabindex="0"
                        class="dropdown-content menu bg-base-100 rounded-box z-1 w-30 p-2 shadow-sm">
                        <!-- el de eliminar-->
                        <li class="justify-center">
                            <button onclick="inventary.showDeletionModal({preposition:'la medida ',name :'${medida.nombre}',id:'${medida.id}'},user.deleteMeasurement)"  ><svg class="ml-2  mt-2 mb-2"
                                    xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24">
                                    <g fill="none" fill-rule="evenodd">
                                        <path
                                            d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                                        <path fill="red"
                                            d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2h-1v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558ZM17 7H7v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7Zm-2.72-3H9.72l-.333 1h5.226l-.334-1Z" />
                                    </g>
                                </svg>
                            </button>
                        </li>

                        <!-- el de editar -->
                        <li>
                            <button onclick="user.editMeasurement(${medida.id})">
                                <svg class="ml-2 mt-2 mb-2" xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" viewBox="0 0 32 32">
                                    <path fill="green"
                                        d="M27.87 7.863L23.024 4.82l-7.89 12.566l4.843 3.04L27.87 7.863zM14.395 21.25l-.107 2.855l2.527-1.337l2.35-1.24l-4.673-2.936l-.097 2.658zM29.163 3.24L26.63 1.647a1.364 1.364 0 0 0-1.88.43l-1 1.588l4.843 3.042l1-1.586c.4-.64.21-1.483-.43-1.883zm-3.965 23.82c0 .275-.225.5-.5.5h-19a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5h13.244l1.884-3H5.698c-1.93 0-3.5 1.57-3.5 3.5v19c0 1.93 1.57 3.5 3.5 3.5h19c1.93 0 3.5-1.57 3.5-3.5V11.097l-3 4.776v11.19z" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
        `;

        });


        // aca se le agrega funcinalidad al boton ademas de setearlo en post
        self.addButton.onclick = () => {
            self.setToPostMethod(0);
            inventary.forms.measurement.showModal();
        }
    }

    // eventos de las tablas 
    activateSearchEvents_table() {
        let checkboxes = document.querySelectorAll('.productVisibilityCheckbox_table');
        console.log(`los checkboxes son ${checkboxes.length}`);
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
                let prodId = checkbox.getAttribute('data-prodid-table');
                if (this.checked) {
                    // console.log('El checkbox está seleccionado');
                    // console.log(`Checkbox ${checkbox.id} ha cambiado a ${checkbox.checked}  al producto  ${prodId} todo ok  `);
                } else {
                    user.sendDataToServerV2({
                        method: "POST",
                        controller: "Product.php",
                        action: "changeVisibility"
                        // action: "devolver"
                    }, { "visibility": checkbox.checked, "id": prodId })
                        .then((response) => {
                            perfilAdmnistrador.close();
                            Inventary.showModalSucces(response.mensagge);
                        }).catch((response) => {
                            Inventary.showErrorModal(response.error);
                            perfilAdmnistrador.close();
                            setTimeout(() => {
                                perfilAdmnistrador.showModal();
                            }, 3000);
                        })
                    // console.log('El checkbox no está seleccionado');
                    console.log(`Checkbox ${checkbox.id} ha cambiado a ${checkbox.checked}  al producto  ${prodId}`);
                }
                // aquí puedes agregar la lógica que deseas ejecutar cuando se cambie el estado del checkbox
            });
        })
    }
}