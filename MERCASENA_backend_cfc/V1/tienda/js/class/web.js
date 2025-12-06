/**
 * WebPage clase para la pagina web
 */

class WebPage {

    constructor(parameters) {
        // politicas institucionales  no se pueden implementar los medios  de pago
        // this.controllerProductosUrl= "http://10.2.17.164/mercasena/app/controllers/Product.php";
        // this.ServerIp = "http://192.168.4.194";
        // this.ServerIp = "http://10.2.21.178";
        // this.ServerIp = "http://192.168.137.187";
        // this.ServerIp = "http://192.168.1.34";

        this.ServerIp = "https://zensoftwares.website";
        // this.ServerIp = "http://192.168.192.194";
        // this.ServerIp = "http://192.168.137.199";
        // this.ServerIp = "http://192.168.206.194";
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

        console.log("clase creada exitosamente");
        this.bannerImagesBuffer = [];

        // medidas para las conversiones
        this.measurementsData = [];

    }
     /**
    * pone los puntos de miles
    */
    addPuntuaction(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
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

    /**
     * muestra un mensaje diciendo que un producto se agrego al carrito con exito
     * @param {*} mensagge 
     */

    static showMensaggeOfAddedProduct(data) {
        data.icon = '';
        data.action == 'added'
            ? data.icon = 'success'
            : data.icon = 'error'
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: data.icon,
            title: data.mensagge
        });
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

    // parte de las funciones basicas de la pagina
    showDivMensagge(HTMLElementID) {
        let modalMessage = document.getElementById(HTMLElementID);
        modalMessage.classList.remove("hidden");
        modalMessage.innerText = HTMLelementID;
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
     * actualiza informacion en el servidor
     * @param {*} data datos a enviar al servidor
     * @param {*} server 
     * @returns 
     */




    updateDataFromServer(data, server) {
        return new Promise((resolve, reject) => {
            // una precarga delajhax para que guarde bien el csrf
            $.ajaxSetup({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
                }
            });
            $.ajax({
                // url: "http://localhost/mercasena/app/controllers/test.php",
                url: `${web.baseUrl}${server.controller}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Mercasena-Token': user.sessionHash,
                    'X-CSRF-token': user.token
                },
                data: JSON.stringify({
                    action: server.action,
                    dataObject: data

                }),
                // envia los datos al servidor
                beforeSend: () => {
                    console.log("preparando datos");
                },
                success: (data) => {
                    resolve(data);
                },
                error: (response) => {
                    console.log(response.error);
                    reject(response.error);
                }

            })
        });

    }

    /**
    *borra  informacion en el servidor
    * @param {*} data datos a enviar al servidor
    * @param {*} server 
    * @returns 
    */
    deleteDataFromServer(data, server) {
        return new Promise((resolve, reject) => {

            $.ajax({
                // url: "http://localhost/mercasena/app/controllers/test.php",
                url: `${web.baseUrl}${server.controller}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Mercasena-Token': user.sessionHash,
                    'X-CSRF-token': user.token
                },
                data: JSON.stringify({
                    action: server.action,
                    dataObject: data

                }),
                // envia los datos al servidor
                beforeSend: () => {
                    console.log("preparando datos");
                },
                success: (data) => {
                    resolve(data);
                },
                error: (response) => {
                    console.log(response.error);
                    reject(response.error);
                }

            })
        });

    }

    // parte de los modales 
    /**
     * @param {message} mensaje del error
     */
    showInfoModal(mensaje) {
        let modalMessage = document.getElementById("text-modal");
        modalMessage.innerText = mensaje;
        infoModal.showModal();

    }
    /**
     * muestra en un modal informascion de alguna accion exitosa
     */
    static showSuccessModal(mensagge) {
        //  Swal.fire({
        //     icon: "success",
        //     title: "que bien",
        //     text: mensagge,
        //       confirmButtonColor: "#4f8323",
        //     // footer: '<a href="#">Why do I have this issue?</a>'

        // });

        // // cierra el modal a los 10 segundos
        // setTimeout(() => {
        //     Swal.close();
        // }, 4000);

        $("#mensajeModalExito").text(mensagge);

        modalExito.showModal();
        setTimeout(function () {
            modalExito.close();
        }, 1500);
    }


    /**
        * renderiza la informacion de las facturas
        * @param {object} data datos del todos los pedidos realizados
        */
    renderBills(data) {
        // mostrando el modal de carga
        WebPage.showLoadingModal('cargando tus comprobantes de venta...');
        var ordersContainer = document.getElementById('BillCardContainers');
        console.log(data);
        //   reseteamos el contenedor parta que no se acumulen las rendizaciones
        ordersContainer.innerHTML = '';
        //   contador o indexador  me sirve poara renderizar dentro de un contenedor en especifico
        let counter = 1;
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
                  <span class="flex col">Total:<span class="ml-12 self-end font-bold"> $${web.addPuntuaction(factura.total)}</span></span>
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
                      <!-- el de ver factura  -->
                      <li class="justify-center gap-2  w-full hover:bg-gray-200 ">
                        <button
                          class="transition delay-150 duration-300 ease-in-out hover:rotate-45  hover:-translate-y-1 flex-grow  hover:scale-110 hover:bg-indigo-500"
                          onclick="web.showBillPreview(${factura.id})">
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
        // cierra el modald e carga
        WebPage.hideLoadingModal();
        BillModal.showModal();



    }

    /**
     * renderiza la informacion de la factura en una previsualizacion
     */

    renderPrevBill(factura) {

        // guardamos la informacion en un json
        // let data = JSON.parse(factura);
        // guardamo en cache la informaicon
        localStorage.setItem('bill', JSON.stringify(factura));
        let actulUri = window.location.href;
        const url = 'comprobante.html'; // Puedes cambiar esto a la URL que desees abrir
        const windowName = 'CustomWindow';
        // const windowFeatures = 'width=1920,height=1080';
        const windowFeatures = 'width=800,height=800';

        window.open(url, windowName, windowFeatures);
        // window.location.href = "comprobante.html";

        // despues redirigimos a la pagina donde se va a ver el comprobante 

        // let contenedor = document.getElementById('tbodyBillTable');
        // contenedor.innerHTML = '';


        // factura.productos.forEach(producto => {
        //     contenedor.innerHTML += `
        //      <tr>
        //               <td class="border-2 border-gray-500   px-4 py-2">${producto.cantidad}</td>
        //               <td class="border-2 border-gray-500   px-4 py-2">${producto.name}</td>
        //               <td class="border-2 border-gray-500   px-4 py-2"> ${producto.precioUnitario}</td>
        //               <td class="border-2 border-gray-500   px-4 py-2">${producto.precio}</td>

        //     </tr>
        //     `;

        // });
        // //    seteo todos los valores de los inputs
        // $('#facID').text(factura.id);
        // $('#customerName').text(factura.Usuario);
        // $('#customerNit').text(factura.nit);
        // $('#customerName').text(factura.Usuario);
        // $('#customerAdressText').text(factura.direccion);

        // // muestra el modal
        // billPreviewModal.showModal();


    }


    /**r
     * muestra la previsualizacion de la factura
     * @param {*} billID id del pedido a previsualizar
     */
    showBillPreview(billID) {
        this.getDataFromServer({
            controller: "Bill.php",
            action: "getBillByID&billID=" + billID,
            method: "GET"
        }).then((data) => {
            // mostrando el objeto de pedidos
            console.log(data[0]);
            console.log("renderizando tabla");
            this.renderPrevBill(data[0]);
            // let datos  = JSON.parse(data.pedi_info);
            // console.log(datos);
        })
    }
    /**
     * muestra la previsualizacion de la factura
     * @param {*} billID id del pedido a previsualizar
     */
    downloadBill(billID) {
        this.getDataFromServer({
            ontroller: "Bill.php",
            action: "downloadBill&billId=" + billID,
            method: "GET"
        }).then((data) => {

        })
    }
    /**
     * renderiza la informacion en los pedidos
     * @param {object} data datos del todos los pedidos realizados
     */
    renderOrders(data) {
        var ordersContainer = document.getElementById('ordersCardContainers');

        //   reseteamos el contenedor parta que no se acumulen las rendizaciones
        ordersContainer.innerHTML = '';
        //   contador o indexador  me sirve poara renderizar dentro de un contenedor en especifico
        let counter = 1;
        data.forEach(pedido => {
            ordersContainer.innerHTML += `
                <div
                        class="rounded-xl overflow-hidden mt-1 md:mt-2  flex shadow hover:shadow-lg hover:scale-105   md:hover:scale-110 transform  max-w-sm bg-white cursor-pointer h-30  md:h-40">
                        <div class="w-7/12 h-200  pl-3 p- pb-5 text-text1 flex flex-col justify-center">
                            <p class="text-base mb-2 font-bold truncate">
                            </p>
                            <div id="orderStatus${counter}"  class="badge  mt-2 md:mt-1  text-white">${pedido.estado}</div>
                            <div class="text-xs pt-1 pb-0 mt-2 md:mt-0  text-primary mb-2">
                                <a   class="flex items-center">

                                    <div id="productsInOrder${counter}"  class="flex  justify-end -space-x-3 space-x-reverse">
                                       
                                       
                                    </div>
                                </a>
                                <span class="font-bold tracking-wide mt-2 text-lg text-green-400">${pedido.productos.length} productos</span>
                            </div>
                            <div class="text-sm text-text2 tracking-wider mt-5 md:mt-0">${pedido.fecha}</div>
                        </div>
                        <div class="lg:flex flex w-5/12 flex-col mt-3 pt-2 flex-1    p-2">
                       
                        <div>
                            
                            </div>
                             <div>
                             <span class="font-bold tracking-wide mt-7 text-x4l text-green-400">Total <span
                                    class="font-bold tracking-wide mt-2 text-x2l text-gray-600">$</span> <span
                                    class="font-bold tracking-wide mt-2 text-x2l text-gray-600"> ${web.addPuntuaction( pedido.precioTotal) }</span></span>
                            </div>
                           
                            <div class="text-sm text-text2 self-center mt-5 justify-end tracking-wider">
                                <butto onclick="user.seeOrderDetails('${pedido.pedidoId}')"
                                    class="btn btn-md rounded-lg  md:btn-sm  mr-6 md:mr-0  bg-blue-300 p-4 md:p-4    hover:bg-blue-600 hover:text-white  transition duration-200 ease-in-out justify-end">
                                    
                                    Mas Informacion</butto>
                            </div>

                        </div>
                    </div>
            `;

            // parte donde renderiza las imagened e los pedido
            let productsInOrderCON = document.getElementById(`productsInOrder${counter}`);
            pedido.counter = 1;
            let limit = '';
            window.innerWidth <= 768 ? limit = 3 : limit = 4;
            pedido.productos.forEach(producto => {

                // si el pedido
                if (pedido.counter < limit) {

                    productsInOrderCON.innerHTML += `
                    <div
                    class="relative flex h-12 w-12 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase text-gray-800 ring ring-white">
                    <img class="h-full w-full rounded-full object-cover object-center"
                    src="${producto.imagen}" />
                    </div>
                    `;
                } else {

                }
                // subo el contador
                pedido.counter++;
            });
            if (pedido.productos.length > 4) {
                productsInOrderCON.innerHTML += `
                   <div
                    class="relative flex h-12 w-12 shrink-0 select-none items-center justify-center rounded-full bg-gray-100 text-sm font-bold uppercase text-gray-800 ring ring-white">
                   
                     <span>+${pedido.productos.length - 3}</span>
                    </div>
                    `;
            }

            // verfica los posibles estados de los pedidos 
            if (pedido.estadoID == 1) {
                $(`#orderStatus${counter}`).addClass("badge-success");

            } else if (pedido.estadoID == 2) {
                $(`#orderStatus${counter}`).addClass("badge-warning");
            } else if (pedido.estadoID == 3) {
                $(`#orderStatus${counter}`).addClass("badge-error");
            }
            // por ultimo sube el contador
            counter++;
        });


    }

    /**
   * renderiza la infdormacion de un pedido especifico
   * @param {*} data arreglo que contiene todos los datos de ese pedido
   */
    renderOrderInfo(data) {
        let orderContainer = document.getElementById("orderInfoModalContainer");
        orderContainer.innerHTML = '';

        data.forEach(pedido => {

            orderContainer.innerHTML = `
                 <div class="card w-full  md:w-86 ml-1 mb-2 mr-1 mt-2  bg-base-100 rounded-lg shadow-sm">
                         <div class="card-body">
                             <span   class="badge badge-md  text-md ">${pedido.fecha}</span>
                             <span  id="orderInfoState"  class="badge text-white  badge-md text-md hover:scale-105 hover:badge-lg tranform duration hover:overflow-visible hover:p6 hover:text-lg ">${pedido.estado}</span>
                             <div class="flex justify-between">
                             <h2 class="text-3xl font-bold mr-3  hover:text-blue-500 hover:transition-700 ease-in-out   ">${pedido.Usuario}</h2>
                
                                 <span class="text-xl inline-flex flex text-green-500 font-bold  ">Total 
                                    <span class="flex ml-4 text-gray-800 " >$</span>
                                    <span class="font-bold ml-1 hover:text-yellow-400 text-gray-800"> ${web.addPuntuaction( pedido.precioTotal) }</span>
                                 </span>
                                 </div>
                                 <ul id="productsList"  class="mt-6 flex flex-col gap-2 text-xs">
                                 </ul>
                                 <div class="mt-6">
                                 <butto onclick="user.deleteOrder('${pedido.pedidoId}')"  id="deleteOrder"  class="btn hover:shadow-lg  hover:scale-105  btn-error rounded-lg transition delay-150 duration-400 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-500 hover:text-white   btn-block">Cancelar pedido</butto>
                                 </div>
                             </div>
                         </div>
            
             `;
            //  cambia el color del pedido dependiendo su estado
            if (pedido.estadoID == 1) {
                $(`#orderInfoState`).addClass("badge-success");

            } else if (pedido.estadoID == 2) {
                $(`#orderInfoState`).addClass("badge-warning");
            } else if (pedido.estadoID == 3) {
                $(`#orderInfoState`).addClass("badge-error");
            }

            // luego renderiza la lista de los productos
            let productList = document.getElementById('productsList');
            let productIndex = 1;
            pedido.productos.forEach(producto => {
                producto.variante == 'default' ? producto.variante = '' : producto.variante;
                productList.innerHTML += `
                    <li id="li${productIndex}">
                         <svg xmlns="http://www.w3.org/2000/svg" class="size-4 w-6 h-6  me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                         <span class="text-md"  id="productDescription${productIndex}">${producto.nombre}  ${producto.variante} X ${producto.cantidad} ${producto.medida} == $${web.addPuntuaction( producto.precio * producto.cantidad) } </span>
                     </li>
                 `;

                //     // aca dependiendo del estado del producto (ejemplo  1 = activo) trazo o no traza una linea en señl de que no se cumplio el requisito
                if (producto.estado != 1) {
                    //         // li
                    $(`#li${productIndex}`).addClass('opacity-50');

                    //         // la descripcion de los productos
                    $(`#productDescription${productIndex}`).addClass('line-through');
                }

                productIndex++;
            });
        });




    }
    /**
    * muestra un error en un modal 
    * @param {*} mensaje mensaje que va a mostrar el modal
    */
    static showErrorModal(mensaje) {
        let modalMessage = document.getElementById("text-modalError");
        modalMessage.innerText = mensaje;
        errorModal.showModal();

        // cierra el modal a los 10 segundos
        setTimeout(() => {
            errorModal.close();
        }, 2000);
    }



    /**
 * trae las imagenes de los baners que van a alimental al carouselee
 */
    // fetchBannerImages() {
    //     let carousele = document.getElementById("bannerCarousele");
    //     $.ajax({
    //         url: `${this.baseUrl}mercasena.php?action=getBannerImages`,
    //         // url: `${this.controllerProductosUrl}?action=getProductsByCategory&categoryId=9`,
    //         type: "GET",
    //         contentType: "application/json",
    //         success: function (data) {
    //             // renderizando los productos
    //             carousele.innerHTML = '';
    //             let counter = 1;



    //             // data.images.forEach(image => {

    //             //     console.log(image)
    //             // });
    //             data.images.forEach(image => {
    //                 carousele.innerHTML += `
    //                     <div id="slide${counter}" class="carousel-item relative w-full">
    //                         <img
    //                             src=${image}
    //                             class="w-full  object-cover" />
    //                         <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    //                             <a href="#slide${counter - 1}" class="btn btn-circle">❮</a>
    //                             <a href="#slide${counter + 1}" class="btn btn-circle">❯</a>
    //                         </div>
    //                     </div>

    //                 `;
    //                 web.bannerImagesBuffer.push(counter);
    //                 counter++;

    //             });



    //         },
    //         error: function (response) {
    //             // si no encuentra prodyucots y es la primera vez renderiza todos los productos
    //             if (response.status == 404) {
    //                 this.showInfoModal("algo ocurrio")
    //             } else {
    //                 showModal("No se encontraron productos", "error");
    //             }
    //         }
    //     });
    // }
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
                div>
                    
                    `;
                    counter++;

                });

                //    ACXTIVANDO EL CAROULSE
                WebPage.activateCarousele();

                // agrega una clase para poder esconder  lo de los puntos etcs
                $('.owl-dots').addClass('hidden');
                // document.querySelector('.owl-dots').classList.add('hidden');
                $('.owl-nav').addClass('hidden');

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
                    // busca la medida en singular en el servidor si algo opasa entonces renderiza la medida normal del producto
                    let singularMeasurement = web.searchSingularMeasurement(producto.medidaVenta) != null
                        ? web.searchSingularMeasurement(producto.medidaVenta)
                        : producto.medidaVenta;
                    productsContainer.innerHTML += `
                 <div class="bg-white rounded-2xl hover:scale-110  transform  duration-300  shadow-md overflow-hidden flex flex-col w-full max-w-xs">
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
                            <span class="text-lg font-bold text-red-500">$ ${web.addPuntuaction(producto.precio)}  </span>
                            
                            <!-- Favorite Icon -->
                            <!-- Action Buttons <svg class="h-6 w-6 fill-current text-gray-400 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                            </svg>  -->
                        </div>
                        <!-- Red horizontal line -->
                        <div class="border-t border-red-500 my-2"></div>
                        
                        <!-- Product Name -->
                        <h3 class="text-lg font-medium mt-1 text-gray-800">${producto.nombre} ${producto.subCategoria} x ${producto.cantidad} ${singularMeasurement}</h3>
                        
                        <!-- Unit -->
                        <p class="text-gray-500 text-sm" id="unit${producto.id}" >${producto.medidaVenta}</p>
                            <!--product state -->
                        <div id="productStateContainer${producto.id}">
                            
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="px-4 pb-4 flex space-x-2">
                        <button id="btn${producto.id}"  onclick=" user.addProductToShoppingCart(${producto.id},${producto.estadoID})"  class="flex-1  text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                            Agregar
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
                                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                            </svg>
                        </button>
                      
                    </div>
                </div>
                `;

                    // estado de los productos
                    if (producto.estadoID == 3) {

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
                        // $(`#btn${producto.id}`).prop('disabled', true);

                        $(`#btn${producto.id}`).removeClass('sena-color hover:bg-green-700');
                        $(`#btn${producto.id}`).addClass('bg-gray-600 hover:bg-gray-700');


                        // imagen semitransparente 

                        $(`#img${producto.id}`).addClass('opacity-50');


                    }
                });
                // console.log(productos);
                // Inventary.hideLoadingModal();
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

        self.productsBuffer = productos;
        console.log(`esto es loque hay en el buffer => ${self.productsBuffer}`)
        // console.log(JSON.stringify(self.productsBuffer)); 
        let productsContainer = document.getElementById("products-container");
        productsContainer.innerHTML = "";
        // renderizando los productos
        productos.forEach(producto => {
            // extrayendo el singular de esas medidas 
            let singularMeasurement = web.searchSingularMeasurement(producto.medidaVenta) != null
                ? web.searchSingularMeasurement(producto.medidaVenta)
                : producto.medidaVenta;
            productsContainer.innerHTML += `
                 <div class="bg-white rounded-2xl hover:scale-110 duration-300 transform   shadow-md overflow-hidden flex flex-col w-full max-w-xs">
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
                            <span class="text-lg font-bold text-red-500">$ ${web.addPuntuaction(producto.precio)}  </span>
                            
                            <!-- Favorite Icon -->
                            <!-- Action Buttons <svg class="h-6 w-6 fill-current text-gray-400 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                            </svg>  -->
                        </div>
                        <!-- Red horizontal line -->
                        <div class="border-t border-red-500 my-2"></div>
                        
                        <!-- Product Name -->
                        <h3 class="text-lg font-medium mt-1 text-gray-800">${producto.nombre} ${producto.subCategoria} x ${producto.cantidad} ${singularMeasurement}</h3>
                        
                        <!-- Unit -->
                        <p class="text-gray-500 text-sm" id="unit${producto.id}">${producto.medidaVenta}</p>

                         <!--product state -->
                        <div id="productStateContainer${producto.id}">
                            
                        </div>
                    </div>
                    
                     <!-- Action Buttons -->
                    <div class="px-4 pb-4 flex space-x-2">
                        <button id="btn${producto.id}"  onclick=" user.addProductToShoppingCart(${producto.id},${producto.estadoID})"  class="flex-1  text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                            Agregar
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
                                <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                            </svg>
                        </button>
                      
                    </div>
                </div>
                `;

            // estado de los productos
            if (producto.estadoID == 3) {
                // $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);
                $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);


                console.log("seteando botones");
                $(`#productStateContainer${producto.id}`).html('');
                $(`#btn${producto.id}`).addClass('color-sena hover:bg-green-700');


            } else if (producto.estadoID == 6) {
                $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);

                $(`#unit${producto.id}`).html(`<span> quedan <strong class="hover:text-green-500">${producto.existencias} </strong><span class="hover:text-green-400">${producto.medidaVenta}</span></span>`);

                $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-warning text-white hover:text-red-400">${producto.estado} </div>`);

                $(`#btn${producto.id}`).addClass('color-sena hover:bg-green-700');



            } else if (producto.estadoID == 5) {
                $(`#productStateContainer${producto.id}`).html(`<div class="badge badge-error text-white hover:text-yellow-800">${producto.estado}</div>`);
                // $(`#btn${producto.id}`).prop('disabled', true);

                $(`#btn${producto.id}`).removeClass('color-sena hover:bg-green-700');
                $(`#btn${producto.id}`).addClass('bg-gray-600 hover:bg-gray-700');


                // imagen semitransparente 

                $(`#img${producto.id}`).addClass('opacity-50');


            }
        });
        // console.log( JSON.stringify(self.productsBuffer));

    }


    /**
     * Consulta las categorias de productos y las muestra en el carousel correspondiente
     * 
     */
    fetchCategories() {
        console.log(`consultando categorias ${this.controllerProductosUrl}`);
        $.ajax({
            url: `${this.controllerProductosUrl}?action=getCategories`,
            // url : "http://localhost/mercasena/app/controllers/Product.php?",
            type: "GET",
            contentType: "application/json",
            success: (categorias) => {
                let categoriesContainer = document.getElementById("carousele-categories");
                let i = 0;
                console.log(categorias);
                categoriesContainer.innerHTML += `<div class="    carousel-item mr-4 h-29  ml-4">
                             <button onclick="web.fetchData('getInfoProductsForShop', web.renderAllProducts)"   class="bg-white text-green-600 font-bold px-3 py-1 text-sm rounded-full shadow-md border border-green-400 hover:bg-green-100 badge badge-success"> todos</button>
                </div> `;
                categorias.forEach(categoria => {
                    i++;

                    // ternaria para guardar el primero id de la categoria
                    i == 1 ? this.firstCategory = categoria.id : null;

                    categoriesContainer.innerHTML += `<div class="   carousel-item mr-4 ml-4">
                                                    <button onclick="web.fetchProductsByCategory(${categoria.id},false)" class="bg-white text-green-600 font-bold px-3 py-1 text-sm rounded-full shadow-md border border-green-400 hover:bg-green-100 badge badge-success"> ${categoria.nombre}</button>
                                                </div> `;
                });
                console.log(categorias);
                console.log('el primer id de la categorias es ', this.firstCategory);
                this.fetchProductsByCategory(this.firstCategory, true);
            },
            error: function (response) {

            }
        });

    }

    /**
     * consigue todos los productos
     */
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
                                <span class="text-lg font-bold text-red-500">$  ${web.addPuntuaction(producto.precio)}</span>
                                
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
                            <button onclick="" value(${producto.id}) class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                Agregar
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff">
                                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                                </svg>
                            </button>
                            <button class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
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


    calculateTotal() {
        let inputTotal = document.getElementById("inputTotal");
        // seteamos el valor en cero para que calcule otra vez  y nmo siga sumando o restando infinitamente
        inputTotal.value = 0;

        // recorre el arreglo de los productos que se han agregado al carritp
        // para extraer el id que identificara el input que tiene el precio parcuial del producto
        this.carritoLista.forEach(producto => {
            console.log(producto.precio)
            let precioParcialProducto = document.getElementById(`contenedorPrecio${producto.id_producto}`).value;
            // agrega el valor de cada producto al aparatado que muestra el precio totoal
            inputTotal.value = parseInt(inputTotal.value) + parseInt(precioParcialProducto);

            console.log(inputTotal.value);
        });

    }
    calcular(tipo, datos) {
        // el id del contenedor sale apartir del id del producto
        // let contenedorPrecio = document.getElementById(`contenedorPrecio${producto.id_producto}`);
        // let contenedorUnidades = document.getElementById(`contenedorUni${producto.id_producto}`);
        let contenedorPrecio = document.getElementById(`contenedorPrecio${datos[0]}`);
        let contenedorUnidades = document.getElementById(`contenedorUni${datos[0]}`);


        switch (tipo) {
            case 'mas':
                // asigna el valor  a uno
                contenedorUnidades.value = parseInt(contenedorUnidades.value) + 1;
                // luegho imprime y pone eso dentro del contenedor de unidades
                contenedorPrecio.value = (datos[1] * contenedorUnidades.value).toFixed(2);
                contenedorPrecio.innerText = contenedorPrecio.value;

                this.calcularTotal();
                break;
            case 'menos':
                // asigna el valor  a uno
                contenedorUnidades.value = parseInt(contenedorUnidades.value) - 1;
                // luegho imprime y pone eso dentro del contenedor de unidades
                contenedorPrecio.value = (datos[1] * contenedorUnidades.value).toFixed(2);
                contenedorPrecio.innerText = contenedorPrecio.value;
                this.calcularTotal();
                break;

            default:
                break;
        }

    }


}