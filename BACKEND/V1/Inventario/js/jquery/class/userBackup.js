class User {
    constructor(parameters) {

        this.role = null;
        this.photo = null;
        this.sessionHash = window.localStorage.getItem('sessionToken');
        this.name = window.localStorage.getItem('userName');
        this.email = window.localStorage.getItem('email');
        this.token = window.localStorage.getItem('token');

        // console.log(this.nombre);
        // console.log(this.sessionHash);
        if (this.sessionHash == undefined || this.sessionHash == null || this.token == null || this.token == undefined) {
            // alert("jaj te pille  resulta que no te has logeado bien " + this.sessionHash + ' y el token es : ' + this.token)
            setTimeout(() => {

                window.location.href = '../';
            }, 4000);
            // window.history.back();

        } else {
            // verificacion del pérfil del administrador
            this.checkPrivileges().then((response) => {
                if (response == false) {
                    window.location.href = '../';

                }
            }).catch((response) => {
                window.location.href = '../';
            });
            // aqui seteamos  los cabeceros de respuesta
            this.setRequestHeader();

            $('#adminName').val(this.name)
            // variable ya como de micelanea como para usar
            this.bill = {
                targetContainerOfBill: "",
                maxContainerProductOfBill: 0,
                lastBill: '',
                products: []
            }
            this.dailyInventary = {
                targetContainer: 0,
                maxContainerProduct: 0,
                products: [],
                counter: 0
            }
            this.deleteCallbackFunction = "";
            // this.
            this.searchBill_action = 'update';
            // si quiere buscar productos para el comprobante de venta o para el inventario diario
            this.searchTarget = {
                // seccio si es la factura o es el inventario diario
                section: '',
                // y esta es la funcion
                inyectFunction: ''
            }
            /**
             * modal objetivo que hasya clickeado el usuario y al cual voy a desaparecer  luego
             */
            this.targetModal = {
                close: () => {

                }
            };
        }


    }
/**
 * verifica si el usuario logueado es el administrador
 */
    checkPrivileges() {
        return new Promise((resolve, reject) => {
            $.ajax({
                // url: "http://localhost/mercasena/app/controllers/test.php",
                url: `${inventary.baseUrl}auth.php`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Mercasena-Token': this.sessionHash
                },
                // envia los datos al servidor
                data: JSON.stringify({
                    action: 'checkPrivileges',
                }),
                beforeSend: () => {
                    console.log("preparando datos");
                    Inventary.showLoadingModal();
                },
                success: (data) => {
                    // muestra el modal con el mensaje
                    resolve(data.response)

                },
                error: (response) => {
                    reject(response.response)
                }

            })
        })

    }
/**
 * configura los cabeceros para las peticiones ajax
 */
    setRequestHeader(){
        $.ajaxSetup({
            headers: {
                'Content-Type': 'application/json',
                'Mercasena-Token': this.sessionHash,
                'X-CSRF-token' : this.token
            }
        });
    }
    /**
     * setea el contenedor de product objetivo de la factura (osea cual fue el contenedor que se escogio)
     */
    setTargetContainerOfBill(target) {
        this.bill.targetContainerOfBill = target;
    }

    /**
     * crea la parte donde se ven los pedidos
     */
    async createOrdersPanel() {
        inventary.getDataFromServerV2({ endpoint: "Order.php", action: "getAllOrdersByDatev1" })
            .then((data) => {
                inventary.renderOrders(data);
            })
            .catch((response) => {
                console.error(response.error);
            })

        return new Promise((resolve, reject) => {
            resolve("exito");
        });
    }

    createDailyInventaryPanel() {
        // cierra el modal que avisa de alimnetar el inventario diarion
        dayMensagge.close();
        // verifica de si es esta en el ancho de la pantall a de un movil

        // ancho de la pantalla 
        let screenWidth = $(window).width();
        console.log(screenWidth);
        if (screenWidth <= 500) { // Considerando 768px como el ancho máximo para dispositivos móviles
            console.log(screenWidth);
            Inventary.showErrorModal('porfavor voltea la pantalla para poder usar esta funcion')
            Inventary.showInfoModal('porfavor voltea la pantalla para poder usar esta funcion')
        } else {
            $('#inv_dateTime').text(`
            ${new Date().toLocaleDateString()}
            --- ${new Date().toLocaleTimeString()}
            `);

            diaryInventary.showModal();
        }

    }



    /**
    * metodo que envia la informacion a un servidor
    * @param {string} controller  controlador al cual va a ser atendido
    * @param {string} action  accion para guardar ese dato
    * @param {dataObject} data  datos a enviar al servidor
    */
    sendDataToServer(controller, action, data) {
        // verifica los tipos de datos

        $.ajax({
            // url: "http://localhost/mercasena/app/controllers/test.php",
            url: `${inventary.baseUrl}${controller} `,
            method: "POST",
            headers: {
                'Mercasena-Token': this.sessionHash
            },
            // envia los datos al servidor
            data: JSON.stringify({
                action: action,
                dataObject: data

            }),
            beforeSend: () => {
                console.log("preparando datos");
                Inventary.showLoadingInmutableModal('enviando datos al servidor  ...');
            },
            success: (data) => {
                // muestra el modal con el mensaje
                Inventary.hideLoadingInmutableModal();
                Inventary.showModalSucces(data.mensagge);

            },
            error: (response) => {
                Inventary.hideLoadingInmutableModal();
                Inventary.showWarningMensagge(response.error);
            }

        })

    }

    /**
     * edita el producto 
     * @param {string} id del producto a consultar
     * @param {object} data informacion del producto
     */

    editProduct(idProduct, data) {
        // obtiene informacion de los productos desde el serviror
        inventary.getDataToServer({
            controller: 'Product.php',
            action: "getProductInfo&id=" + idProduct,
            method: 'GET'
            // cuaddra parametros 
        }, { nothing: 'nothing' }).then((data) => {
            inventary.targetEditionProduct = data[0]
            console.log(inventary.targetEditionProduct);
            // setea los valores por defecto en el formulario
            inventary.setValuesToEditProductForm();
            formularioEditarProducto.showModal();
            // this.showModalEditProduct(data, idProduct);
        }, true, false);


        // seteamos todos los valores que nesecita el formulario

    }


    submitEditionModal() {
        console.log("entre en la parte de de submitModalForm");
        // formulario
        let form = document.getElementById("modalCreacionForm");

        // parseola cadena de texto a JSON


        // console.log(JSON.stringify(dataObject));
        // extrae todos los datos del formulario 
        let data = {
            id: $('#productIdEdition').val(),
            baseProduct: $('#productoSelectEdicion').val(),
            variant: $('#EditionProductVariant').val(),
            stock: $('#EditionProductStock').val(),
            price: $('#EditionProductPrice').val(),
            measurement: $('#medSelectEdicion').val(),
            category: $('#categoriasSelectEdicion').val()

        }
        // switch que decide apartir de que tipo de envio ajusta un objeto con la informacion a enviar ademas dependiendo la accion


        console.log(data);


        // si el metodo es PUT inyecta el id del objeto en el objeto data si no no lo hace
        // if (dataObject.method == "PUT") {
        //     // se extrae el valor del id de esa etiqueta en especifica
        //     data.id = document.getElementById(`${ dataObject.dbInputId } `).value;
        // }
        // // dataObject.method == "POST" ? dataObject.method = "POST" : dataObject.method = "PUT";
        // // aqui se envia los formularios
        const imageFile = document.getElementById('file-upload-edit').files[0];

        // console.log("esta es la data" + JSON.stringify(data));
        this.sendDataFromModalForm(data, 'Product.php', 'updateProductWithSubCategory', 'PUT')

        Inventary.showLoadingInmutableModal("enviando imagen al servidor...");
        setTimeout(() => {
            this.uploadImage(imageFile, "PUT");

        }, 15000);

    }
    /**
    * 
    * @param {*} htmlInputId id del input
    * @param {Array} data arreglo que agrupa ["controller","action"]
    */
    submitModalForm(dataObject) {
        console.log("entre en la parte de de la funcion ");
        // formulario
        console.log(dataObject);
        let form = document.getElementById("modalCreacionForm");

        // parseola cadena de texto a JSON


        // console.log(JSON.stringify(dataObject));

        let data = {}
        // switch que decide apartir de que tipo de envio ajusta un objeto con la informacion a enviar ademas dependiendo la accion

        switch (dataObject.category) {
            case "category":
                data = {
                    categoryName: document.getElementById(dataObject.id).value,
                }
                break;
            case "measurement":
                data = {
                    name: document.getElementById(dataObject.measurementName.id).value,
                    factor: document.getElementById(dataObject.measurementFactor.id).value,
                }
                break;
            case "baseProduct":
                data = {
                    productName: document.getElementById(dataObject.id).value,
                }
                break;
            default:
                break;
        }

        // si el metodo es PUT inyecta el id del objeto en el objeto data si no no lo hace
        if (dataObject.method == "PUT") {
            // se extrae el valor del id de esa etiqueta en especifica
            data.id = document.getElementById(`${dataObject.dbInputId} `).value;
        }
        // dataObject.method == "POST" ? dataObject.method = "POST" : dataObject.method = "PUT";
        // aqui se envia los formularios

        console.log("esta es la data" + JSON.stringify(data));
        this.sendDataFromModalForm(data, dataObject.controller, dataObject.action, dataObject.method)
            .then((data) => {
                // cierra el modal
                Inventary.showModalSucces(data.mensagge);
                console.log("cerrando modal");
                // cierra el modal de creacion
                modalCreacion.close();
            }).
            catch((response) => {
                // cierra el modal de creacion
                modalCreacion.close();
                Inventary.showWarningMensagge(response.error);
            })

    };

    /**
    * apartir del modal y formulario dinamico
    * envia los datos para guardar  apartir de la informacion recolectadada por el modal registro
    * @param {*} dataObject objeto que contiene informacion de la etiqueta input
    * @param {*} controller  controllador al cual va a ser atendido
    * @param {*} action  accion para guardar ese dato
    * @param {*} method  metodo de envio ya sea POST o PUT
    */
    sendDataFromModalForm(data, controller, action, method) {
        return new Promise((resolve, reject) => {
            $.ajax({

                url: `${inventary.baseUrl}${controller} `,
                method: method,
                headers: {
                    'Mercasena-Token': this.sessionHash
                },
                // envia los datos al servidor
                data: JSON.stringify({
                    action: action,
                    objectData: data
                }),
                beforeSend: () => {
                    console.log("preparando datos");
                    Inventary.showLoadingModal();
                },
                success: (data) => {
                    // muestra el modal con el mensaje
                    resolve(data);
                    switch (data.type) {
                        // dependiendo el tipo de consulta renderizara de nuevo para mostrar la nueva opcion
                        // y ternarias que validad que se haya actualizado algo
                        case 'baseProduct':
                            inventary.fetchDataToSelect("productoSelect", "Product.php", "getAllProducts");

                            inventary.renderTable('baseProduct', inventary.renderBaseProductsTable)
                            break;
                        case 'Category':
                            inventary.fetchDataToSelect("categoriasSelect", "Product.php", "getCategories");
                            // data.executedAction == "update"
                            //     ? inventary.renderTable('category', inventary.renderCategoryTable)
                            //     : null;

                            inventary.renderTable('category', inventary.renderCategoryTable)
                            break;
                        case 'measurement':
                            inventary.fetchDataToSelect("medSelect", "Product.php", "getAllMeasurements");

                            inventary.renderTable('measurement', inventary.renderMeasurementTable)
                            break;
                        case 'product':
                            inventary.fetchDataToSelect("productoSelect", "Product.php", "getAllProducts");

                            inventary.renderTable('product', inventary.renderProductsTable)
                            break;
                        default:
                            break;

                            // resuelve la promesa 

                    }
                },
                error: (response) => {
                    // Inventary.showWarningMensagge(response.error);
                    reject(response);
                },
                complete: (data) => {
                    Inventary.hideLoadingModal();

                }

            })
        })


    }

    sendMixedDataFromModalForm(htmlInputIdCollection, controller, action) {

        let name = document.getElementById(htmlInputIdCollection[0]).value;
        let factor = document.getElementById(htmlInputIdCollection[1]).value;

        console.log("preparando consulta y apuntando al " + controller + "?action=" + action);

        $.ajax({
            // url: `${ this.baseUrl }${ controller }?action = ${ action } `,
            url: `${inventary.baseUrl}${controller} `,
            method: "POST",
            // envia los datos al servidor
            data: JSON.stringify({
                action: action,
                name: name,
                factor: factor,
            }),
            beforeSend: () => {
                console.log("preparando datos");
                inventary.showLoadingModal();
            },
            success: (data) => {
                // muestra el modal con el mensaje
                inventary.showModalSucces(data.mensagge);
                switch (data.type) {
                    // dependiendo el tipo de consulta renderizara de nuevo para mostrar la nueva opcion
                    case 'product':
                        inventary.fetchDataToSelect("productoSelect", "Product.php", "getAllProducts");
                        break;
                    case 'Category':
                        inventary.fetchDataToSelect("categoriasSelect", "Product.php", "getCategories");

                        break;
                    case 'measurement':
                        inventary.fetchDataToSelect("medSelect", "Product.php", "getAllMeasurements");
                        break;

                    default:
                        break;
                }
            },
            error: (response) => {
                inventary.showWarningMensagge(response.error);
                inventary.showErrorModal(response.error);
            },
            complete: (data) => {

            }

        })

    }

    /**
     * envia la imagen al servidor 
     * @returns 
     */
    uploadImage(imageFile, method) {

        if (!imageFile) {
            alert("Por favor selecciona una imagen.");
            return;
        }
        const formData = new FormData();
        formData.append('image', imageFile);

        $.ajax({
            // url: "http://localhost/mercasena/app/controllers/test.php",
            url: `${inventary.baseUrl} Product.php`,
            method: method,
            headers: {
                'Mercasena-Token': this.sessionHash
            },
            // envia los datos al servidor
            data: formData,
            contentType: false,
            processData: false,

            beforeSend: () => {
                console.log("preparando datos");
                // Inventary.showLoadingModal();

            },
            success: (data) => {
                // muestra el modal con el mensaje
                Inventary.hideLoadingInmutableModal();
                Inventary.showModalSucces(data.mensagge);
                // LoadingModal.close();
            },
            error: (response) => {
                // LoadingModal.close();
                Inventary.hideLoadingInmutableModal();

                // Inventary.hideLoadingModal();
                Inventary.showWarningMensagge(response.error);
            }

        })

    }


    /**
     * crea el producto e intenta enviarlo al server
     */
    createProduct() {
        var productoSelect = document.getElementById("productoSelect").value;
        var categoriasSelect = document.getElementById("categoriasSelect").value;
        var medSelect = document.getElementById("medSelect").value;
        var precio = document.getElementById("precio").value;
        // let medida = document.getElementById("medida").value;
        var existencias = document.getElementById("existencias").value;

        let variacion = "";
        // esta es la foto

        const imageFile = document.getElementById('file-upload').files[0];

        // ternaria que me crea el valor
        $("#VariantCheckboxYes").prop("checked") ? variacion = $("#variantName").val() : variacion = null;

        let dataObject = {
            product: productoSelect,
            category: categoriasSelect,
            measurement: medSelect,
            price: precio,
            unit: 1,
            stock: existencias,
            variation: variacion
        }

        console.log(dataObject);
        // envia al servidor
        this.sendDataToServer("Product.php", "saveProductWithSubCategory", dataObject);

        // espera 15 segundos y luego envia la imagen
        Inventary.showLoadingInmutableModal("enviando imagen al servidor...");
        setTimeout(() => {
            this.uploadImage(imageFile, "POST");
        }, 15000);
        productoSelect.value = null;
        categoriasSelect.value = null;
        medSelect.value = null;
        precio.value = null;
        // let medida = document.getElementById("medida").value;
        existencias.value = null;




    }

    // partes de edicion como por ejemplo el de productos etc


    editBaseProduct(baseProductID) {
        //  variables que se cambian para ajusta el formulari de edicion
        inventary.setToPutMethod(1)
        // arr[1].method ="PUT";
        arr[1].action = "updateBaseProduct";
        arr[1].labelName = `Editando producto base`;
        //  se cambia el metodo a PUT para que se ajuste a la edicion

        let categoryData = inventary.baseProductsBuffer;
        // buscando la informacion que hay en local gracias  a la anterior consulta
        let baseProduct = categoryData.filter(baseProduct => baseProduct.id == baseProductID);
        console.log(JSON.stringify(baseProduct));
        //    este el id de la etiqueta input 



        let inputId = arr[1].id;
        let dbInputId = arr[1].dbInputId;
        //    aqui se asigna el nuevo titulo
        document.getElementById("formMixedTitle").innerText = `Edicion o actualizacion`;
        $("#objectId").val(baseProduct.id);
        //    le asigno el valor que saque de la busqueda a la etiqueta del input que hay

        inventary.forms.baseProduct.showModal();
        document.getElementById(`${inputId} `).value = baseProduct[0].nombre;
        document.getElementById(`${dbInputId} `).value = baseProduct[0].id;
    }

    //  parte de las facturas
    /**
     * confirma que se  crea la venta y por ende se factura
     * @param {string} orderID  es el id del pedido
     */



    /**
     * quita un producto de las facturas
     * @param {*} idProduct 
     */
    dropProductFromBill(idProduct) {
        let index = inventary.BillBuffer.productos.findIndex(product => product.id == idProduct);
        // ejecutamos la eliminacion 
        inventary.BillBuffer.productos.splice(index, 1);

        // renderiza la factura 
        inventary.renderBill([inventary.BillBuffer], false);

    }  /**
     * quita un producto del inventario diario
     * @param {*} idProduct 
     */
    dropProductFromDailyInv(idProduct) {
        let index = this.dailyInventary.products.findIndex(product => product.id == idProduct);
        // ejecutamos la eliminacion 
        this.dailyInventary.products.findIndex(product => product.id == idProduct);
        this.dailyInventary.products.splice(index, 1);

        // renderiza la factura 
        console.log(this.dailyInventary.products);
        inventary.renderDailyInventary();

    }


    /**
     * emvia datos al servidor de una mejor manera
     * @param {object} server objeto que contiene la informacion del servidor
     * @param {object} data objeto que contiene la informacion a enviar al servidor
     */
    sendDataToServerV2(server, data) {
        return new Promise((resolve, reject) => {

            $.ajax({
                // url: "http://localhost/mercasena/app/controllers/test.php",
                url: `${inventary.baseUrl}${server.controller} `,
                method: server.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Mercasena-Token': this.sessionHash
                },
                // envia los datos al servidor
                data: JSON.stringify({
                    action: server.action,
                    dataObject: data

                }),
                beforeSend: () => {
                    console.log("preparando datos");
                    Inventary.showLoadingModal();
                },
                success: (data) => {
                    // muestra el modal con el mensaje
                    Inventary.hideLoadingModal();
                    // Inventary.showModalSucces(data.mensagge);
                    // setTimeout(() => {
                    //     window.location.href = 'reporteFactura.html';
                    // }, 3000);
                    resolve(data);

                },
                error: (response) => {
                    Inventary.hideLoadingModal();
                    Inventary.showWarningMensagge(response.error);
                }

            })
        });

    }
    /**
    * edita una categoria del producto
    * @param {string} categoryID id de la categoria a editar
    */
    editCategory(categoryID) {

        //  variables que se cambian para ajusta el formulari de edicion
        inventary.setToPutMethod(2)
        // arr[2].method = "PUT";
        arr[2].action = "updateCategory";
        arr[2].labelName = `Edit ando Categorias`;

        let categoryData = inventary.categoriesBuffer;
        // buscando la informacion que hay en local gracias  a la anterior consulta
        let category = categoryData.filter(category => category.id == categoryID);

        //    este el id de la etiqueta input 
        let inputId = arr[2].id;
        let dbInputId = arr[2].dbInputId;
        //    aqui se asigna el nuevo titulo
        // $("#objectId").val(categoryData.id); 
        document.getElementById("formMixedTitle").innerText = `Edicion o actualizacion`;
        console.log(category);
        //    le asigno el valor que saque de la busqueda a la etiqueta del input que hay

        inventary.forms.category.showModal();
        document.getElementById(`${inputId} `).value = category[0].nombre;
        document.getElementById(`${dbInputId} `).value = category[0].id;

    }

    /**
     * edita una medida
     * @param {string} measurementID id de la medida a editar
     */
    editMeasurement(measurementId) {
        inventary.setToPutMethod(0)
        //  variables que se cambian para ajusta el formulari de edicion
        arr[0].action = "updateMeasurement";
        arr[0].measurementName.labelName = `ingresa la medida`;

        //    aqui se asigna el nuevo titulo
        document.getElementById("formMixedTitle").innerText = `Edicion o actualizacion`;

        let categoryData = inventary.measurementsBuffer;
        // buscando la informacion que hay en local gracias  a la anterior consulta
        let measurement = categoryData.filter(measurement => measurement.id == measurementId);


        //    aca se pone elid de los inputs 
        let nameId = arr[0].measurementName.id;
        let factorId = arr[0].measurementFactor.id;
        let dbInputId = arr[0].dbInputId;
        arr[0].measurementFactor.labelName = `ingresa el factor`;
        console.log(measurement);
        //    le asigno el valor que saque de la busqueda a la etiqueta del input que haya que asignar

        inventary.forms.measurement.showModal();
        $("#MeasurementId").val(categoryData.id);
        document.getElementById(`${nameId} `).value = measurement[0].nombre;
        document.getElementById(`${dbInputId} `).value = measurement[0].id;
        document.getElementById(`${factorId} `).value = measurement[0].factor;


    }



    // ============================ ELIMINAR ==========================================
    /**
     * crear un modal de verificacion para que la persona acepte o se niegue
    *@param {object} object objecto que contiene informacion como el id y nombre del producto
    *@param {function} callback funcion que se ejecuta despues de que se confirma la eliminacion
    * 
    */

    confirmDeletion(object, callback) {
        // var itemNameContainer = document.getElementById("itemNameDeleteModal");

    }
    /**
     * ordernar por el nombre de los usuarios
     */
    async getOrderByUsersName(UserInputName) {

        console.log("estoy desde eventos");
        // let newData = json.find(pedido =>pedido.Usuario == nombre);
        // busca los nombres que coincidan en los datos
        let newData = inventary.OrdersBuffer.filter(pedido => pedido.Usuario.toLowerCase().includes(UserInputName.toLowerCase()));
        return newData;

    }

    /**
 * ordernar por el nombre de los productos para la factura
 */
    async getOrderByUsersName(UserInputName) {

        console.log("estoy desde eventos");
        // let newData = json.find(pedido =>pedido.Usuario == nombre);
        // busca los nombres que coincidan en los datos
        let newData = inventary.OrdersBuffer.filter(pedido => pedido.Usuario.toLowerCase().includes(UserInputName.toLowerCase()));
        return newData;

    }
    /**
     * funcion que permite actualizar(cambiar) un producto por otro en la factura
     * @param {*} counterOfHtmlInputs indexador que es el que se configura para insertar el datos en ese contnendor de productos de la factura
     */
    searchUpdateProduct(counterOfHtmlInputs) {
        this.searchTarget.action = 'bill';
        this.searchBill_action = 'update';
        console.log(`la accion es ${this.searchBill_action} `);

        this.bill.targetContainerOfBill = counterOfHtmlInputs;
        console.log(`actual counter es this.targetContainerOfBill ${this.bill.targetContainerOfBill} vs  ademas la accion es ${this.searchBill_action} `);
        this.searchProducts();
    }

    /**
     * busca los prductos para insertarlos en la factura
     */
    searchProductToInsert() {
        // define la accion de busqueda del usuario en el caso de la factura
        this.searchBill_action = 'insert';
        // define la accion del usuario en caso entre elegir la factura o  elegir el inventario diario
        this.searchTarget.section = 'bill';


        console.log(`la accion es ${this.searchTarget.section} `)
        console.log(`el target es ${this.bill.maxContainerProductOfBill} `)
        // user.searchProducts(user.targetContainerOfBill);
        this.searchProducts();

    }
    /**
     * busca productos para la factura  recordar que reutilizo el evento de bilkl para buscar  los productos
     * 
     */
    searchProductToInsertToInventary() {
        // define la accion de busqueda del usuario 
        //   pide los datos al servidor 

        console.log('pasamos a las seccion 2')
        this.searchTarget.section = 'DailyInventary';

        this.searchProducts();

    }
    /**
     * busca productos para la factura sea para actualizarla o para crearla 
     * 
     */
    searchProducts() {

        // seteamos el contedor objectivo 
        // this.setTargetContainerOfBill(counterOfHtmlInputs);

        // consultas la informacion
        inventary.getDataToServer({
            controller: 'Product.php',
            action: "getAllInformation",
            method: 'GET'
            // cuaddra parametros 
        }, { nothing: 'nothing' }).then((data) => {
            data.length > 0 ? searchProductsModal.showModal() : Inventary.showErrorMensagge('n hay infoormacion que renderizar');

            // GUARDO LA INFORMACION PARA LUEGO BUSCAR
            inventary.searchedProductsBuffer = data;
        }, true, false);
    }

    /**
     * conuslta informacion sobre todos los productos y luego l guiarda en el atributo bill.products
     */
    requestProductsInfo() {
        inventary.getDataToServer({
            controller: 'Product.php',
            action: "getAllInformation",
            method: 'GET'
            // cuaddra parametros 
        }, { nothing: 'nothing' }).then((data) => {
            user.searchTarget.action = 'bill';
            user.bill.products = data;
            console.log(data);
            data.length == 0
                ? Inventary.showErrorMensagge('algo paso ,no se puedo guardar los productos')
                : '';
        }, true, false)
            .catch((error) => {
                Inventary.showErrorMensagge(error);
            });
    }

    /**
     * calcula el total de la factura
     */
    calculateTotalBill() {
        let total = 0;

        for (let i = 0; i < this.bill.maxContainerProductOfBill; i++) {
            total += parseFloat($(`#precioUnitario${i + 1} `).val()) * parseFloat($(`#cantidad${i + 1} `).val() || 1);
        }
        $('#totalBill').val(total);
    }

    // /**
    // * calcula la cantidad total del stock del nuevo inventario
    // */
    // calculateTotalQuantity() {
    //     let total = 0;

    //     for (let i = 0; i < this.dailyInventary.products.length; i++) {
    //         total += parseFloat($(`#precioUnitario${ i + 1 } `).val()) * parseFloat($(`#cantidad${ i + 1 } `).val() || 1);
    //     }
    //     $('#totalBill').val(total);
    // }
    /**
    * inyecta un product con su informacion a la factura , sea para cambiar uno o para crear uno nuevo
    * 
    * @param {array} arr array con la informacion del producto
    */

    inyectNewProductDataToBill(arr) {
        let action = user.searchBill_action;
        console.log(inventary.searchedProductsBuffer);
        try {
            // let ;
            console.log(`actual counter es this.targetContainerOfBill ${this.bill.targetContainerOfBill} vs  ademas la accion es ${this.searchBill_action} `);
            let producto = {
                id: arr[0],
                nombre: arr[1],
                variante: arr[2],
                medida: arr[3],
                precio: arr[4],
                existencias: arr[5]
            };

            // console.log(`product ${ producto.id } baseProduct ${ producto.nombre } variante ${ producto.variante }medida ${ producto.medida }  precio ${ producto.precio } existencias ${ producto.existencias } ademas el contnetedor target es ${ this.targetContainerOfBill } `);


            // si se da cuenta que va a actualizar algun producto enntonces cuadra el indexz para podeer hacer el cambio
            if (action == 'update') {
                console.log(`actualizare este producto ${this.bill.targetContainerOfBill} `);
                this.setDataToBill(producto, this.bill.targetContainerOfBill);

                // actualizo el arreglo de los productos en la factura
                let pseudoIndex = this.bill.targetContainerOfBill - 1;
                // actualizo el arreglo del buffer de los productos 
                inventary.BillBuffer.productos[pseudoIndex] = producto;

            } else if (action == 'insert') {
                // aqui es para insertar un nuevo prducto a la factura
                // console.log("se va a insertar el producto" + index);
                // index++;
                this.bill.maxContainerProductOfBill += 1;
                console.log(`maximo contenedor ${this.bill.maxContainerProductOfBill} `)
                this.insertProductToBill(this.bill.maxContainerProductOfBill, producto);
                let index = this.bill.maxContainerProductOfBill;

                // actulizando el arreglo de los productos en la factura 
                inventary.BillBuffer.productos.push(producto);
                console.log(`esto es lo que llevams hasta el momento ${JSON.stringify(inventary.BillBuffer)} `)
            } else {
                throw new Error("la accion es incorrecta");
            }
            // actualizo el contador

            console.log(`productos en factura ${inventary.BillBuffer} `);

            Inventary.showModalSucces("se ingreso  el producto a la factura");
            Inventary.closeModal(searchProductsModal.close());
            Inventary.hideLoadingModal();
            // reestablecemos el input del search product para la factura 
            $('#inputSearchProductsInBill').val('');
            $('#productsInBillSearch').val('');
        } catch (error) {
            if (action == 'update') {
                Inventary.showInfoModal("No se pudo ingresar  el producto a la factura" + error);
                Inventary.closeModal(searchProductsModal.close());
                console.error(error);
                // aca no se porque falla pero aun asi voy a diecir que si ingreso el producto
            } else {
                Inventary.showModalSucces("se ingreso  el producto a la factura cargando caracteristicas ...");
                console.error(error);
                Inventary.closeModal(searchProductsModal.close());
            }


        }



    }


    /**
    * inyecta un product con su informacion a  la tabla para guardarlo en el inventario diario 
    * 
    * @param {array} arr array con la informacion del producto
    */

    inyectNewProductDataToDailyInv(arr) {

        console.log(inventary.searchedProductsBuffer);
        try {
            // let ;
            console.log(`actual counter es this.targetContainerOfBill ${this.dailyInventary.targetContainer} vs  ademas la accion es ${this.searchBill_action} `);
            let producto = {
                id: arr[0],
                nombre: arr[1],
                variante: arr[2],
                medida: arr[3],
                precio: arr[4],
                existencias: arr[5]
            };

            console.log(JSON.stringify(producto))
            // console.log(`product ${ producto.id } baseProduct ${ producto.nombre } variante ${ producto.variante }medida ${ producto.medida }  precio ${ producto.precio } existencias ${ producto.existencias } ademas el contnetedor target es ${ this.targetContainerOfBill } `);

            // aqui es para insertar un nuevo prducto al inventario diario 

            // index++;


            this.dailyInventary.maxContainerProduct += 1;
            console.log(`maximo contenedor ${this.dailyInventary.maxContainerProduct} `)

            // actulizando el arreglo de los productos del inventario 
            this.dailyInventary.products.push(producto);
            // aca inyecta el producto dentro del contenedor
            // inventary.insertNewProductToDailyInventary(this.dailyInventary.maxContainerProduct, producto);
            inventary.renderDailyInventary();
            let index = this.dailyInventary.maxContainerProduct;

            // console.log(`esto es lo que llevams hasta el momento ${ JSON.stringify(this.dailyInventary.products) } `)

            // actualizo el contador

            console.log(`productos en Inventario diario  ${JSON.stringify(this.dailyInventary.products)} `);


            // mensajes de que se inyecto bien el producto en el pre inventario diario
            Inventary.showModalSucces("se ingreso  el producto al inventario diario");
            Inventary.closeModal(searchProductsModal.close());
            Inventary.hideLoadingModal();
            // reestablecemos el input del search product para la factura 

        } catch (error) {
            Inventary.showInfoModal("No se pudo ingresar  el producto al inventario diario" + error);
            Inventary.closeModal(searchProductsModal.close());
            console.error(error);
            // aca no se porque falla pero aun asi voy a diecir que si ingreso el producto
        }
    }

    /**
     * setea la informacion del producto de la factura en una fila en especifica
     */
    setDataToBill(producto, index) {
        // cambiaos  los  valsres de los campos de a los valres del  producto nuevo
        $(`#precioUnitario${index} `).val(producto.precio);
        $(`#productId${index} `).val(producto.id);
        $(`#productoPrecio${index} `).val(producto.precio);
        $(`#prodInfo${index} `).text(`${producto.medida} -  ${producto.nombre} ${producto.variante} `);
        $(`#productName${index} `).val(`${producto.medida} -  ${producto.nombre} ${producto.variante} `)
        $(`#cantidad${index} `).val(1);
    }

    /**
     * ingresa el producto en la factura
     * @param {*} index seria el  indexador que caracteriza a el contenedor
     * @param {*} data los datos del nuevo producto
     */
    insertProductToBill(index, data) {
        // seteamos el contedor objectivo 
        // coje el index actual de lso contenedres de los productos de las factura y le agrega uno
        inventary.insertNewProductToBill(index, data);

    }


    /**
     * crea la estructura de la factura 
     */
    createDataStructure() {
        this.recolectDataFromBill().then((data) => {
            console.log(data);
            let serverAction = '';

            // si hay algun id  de pedido en la factura  entonces se hizo un  pedido previo :V
            // si no entonces se hizo una factura desde cero
            // let pedidoId = $('#pedidoID').val();

            // si es diferente a '' hace como factura de pedido si no entonces 
            // lo hace como factura desde cero
            // le cambiamos la accion que vba a hacer en el servidor y ya
            data.orderID != '' || data.orderID == undefined || data.orderID == null
                ? serverAction = "confirmBill"
                : serverAction = "confirmBillWithoutOrder";
            // : serverAction = "devolver";
            if (serverAction = "confirmBill") {
                console.log("la factura nace apartir de un pedido")
            } else {
                console.log("la factura sale desde cero")

            }
            // serverAction = "devolver";
            // ahora si envio al servidor
            this.sendDataToServerV2({
                method: "POST",
                controller: "Bill.php",
                action: serverAction
                // action: "devolver"
            }, data)
                .then((data) => {
                    //    cerramos los modales de carga y el de la factura
                    billModal.close();
                    ordersModal.close();
                    Inventary.hideLoadingInmutableModal();
                    Inventary.hideLoadingModal();

                    // mensaje
                    Inventary.showModalSucces(data.mensagge);
                    // luego de tres segundo volvemos a mostrar los pedidos
                    setTimeout(() => {
                        user.createOrdersPanel();
                    }, 3000);

                    // luego cargamos un modal que pide que se va a hacer con la factura
                });
        })
    }
    /**
     * recolecta tda la informacion de la factura como los productos su cantidad y a su vewz el preci total
     */
    async recolectDataFromBill() {
        return new Promise((resolve, reject) => {
            let data = {
                customer: $('#customerName').val(),
                customersPhone: $('#customerPhone').val() | null,
                customerNit: $('#customerNit').val() | null,
                customerEmail: $('#customerAdress').val() | null,
                customerAddress: $('#customerAdress').val() | null,
                orderID: $('#pedidoID').val(),
                total: $('#totalBill').val() | 1000,


                products: []
            }

            // aqui agrega y recorre todos los cntneedoes sacando la infrmacion
            for (let i = 0; i < this.bill.maxContainerProductOfBill; i++) {
                let product = {
                    id: $(`#productId${i + 1} `).val(),
                    cantidad: $(`#cantidad${i + 1} `).val(),
                    name: $(`#productName${i + 1} `).val(),
                    precioUnitario: $(`#precioUnitario${i + 1} `).val(),
                    precio: $(`#productoPrecio${i + 1} `).val(),

                }

                data.products.push(product);

            }

            resolve(data);
        });
    }
    /**
     * recolecta tda la informacion de la factura como los productos su cantidad y a su vewz el preci total
     */
    async recolectDataFromDailyInv() {
        return new Promise((resolve, reject) => {
            try {
                let data = {
                    date: new Date(),
                    products: []
                }

                // // aqui agrega y recorre todos los cntneedoes sacando la infrmacion
                for (let i = 0; i < this.dailyInventary.products.length; i++) {
                    let product = {
                        id: $(`#inv_productId${i + 1} `).val(),
                        name: $(`#inv_productName${i + 1} `).val(),
                        oldQuantity: $(`#inv_existencias${i + 1} `).val(),
                        newQuantity: $(`#inv_newQuantity${i + 1} `).val(),
                        totalCuantity: $(`#inv_totalQuantity${i + 1} `).val(),
                        observations: $(`#inv_comments${i + 1} `).val(),

                    }

                    data.products.push(product);

                }
                resolve(data);
            } catch (error) {
                reject(error)
            }

            // this.bill
        });
    }





    /**
     * busca productos dentro del buffer y si encuentra alguna coincidencia entonces la devuelve
     */
    async searchProductsInSearchedBuffer(UserInputName) {

        console.log("BUSCANDO PEDIDOS EN EL BUFFER...");
        // let newData = json.find(pedido =>pedido.Usuario == nombre);
        // busca los nombres que coincidan en los datos
        let newData = inventary.searchedProductsBuffer.filter(item => item.producto.toLowerCase().includes(UserInputName.toLowerCase()) || item.variacion.toLowerCase().includes(UserInputName.toLowerCase()));
        // ternaria que verifica si el array esta vacio o no
        return newData.length != 0 ? newData : "no hay coincidencias";

    }

    /**
    * metodo que solicita eliminar algun registro en el servidor
    * @param {object} server informacion del servidor como controllador,accion 
    * @param {dataObject} data  datos a enviar al servidor
    * @param {function} callback function que se tiene que ejecutar(renderizar de nuevo la tabla)
    */


    sendDeleteRequest(server, data) {
        return new Promise((resolve, reject) => {
            let modal = eliminateModal;
            $.ajax({
                url: `${inventary.baseUrl}${server.controller} `,
                method: "DELETE",
                data: JSON.stringify({
                    action: server.action,
                    dataObject: data
                }),
                beforeSend: () => {
                    console.log("preparando datos");
                    Inventary.showLoadingModal();
                },
                success: (data) => {
                    Inventary.hideLoadingModal();
                    Inventary.showModalSucces(data.mensagge);
                    modal.close();
                    resolve(data); // Resolve the promise with the data
                },
                error: (response) => {
                    Inventary.showWarningMensagge(response.error);
                    reject(response.error); // Reject the promise with the error
                }
            });
        });
    }

    /**
     * Elimina un registro enviando una solicitud de eliminación al controlador y acción especificados.
     *
     * @param {Object} register - El objeto de registro que contiene el ID a eliminar.
     * @param {Function} renderFunction - La función para renderizar la tabla después de la eliminación.
     */



    async deleteRegister(register, renderFunction) {
        let data = { id: register.id };
        try {
            const response = await this.sendDeleteRequest({
                controller: "Product.php",
                action: register.serverAction
            }, data);

            // After the request completes successfully, render the table
            inventary.renderTable(register.renderParam, renderFunction);
        } catch (error) {

        }
    }
    async deleteBaseProduct(id) {

        await this.deleteRegister({
            id: id,
            serverAction: "deleteBaseProduct",
            renderParam: "baseProduct"
        }, inventary.renderBaseProductsTable);
    }

    async deleteProduct(id) {

        await this.deleteRegister({
            id: id,
            serverAction: "deleteProduct",
            renderParam: "product"
        }, inventary.renderProductsTable);
    }

    async deleteCategory(id) {

        await this.deleteRegister({
            id: id,
            serverAction: "deleteCategory",
            renderParam: "category"
        }, inventary.renderCategoryTable);


    }
    async deleteMeasurement(id) {

        await this.deleteRegister({
            id: id,
            serverAction: "deleteMeasurement",
            renderParam: "measurement"
        }, inventary.renderMeasurementTable);
    }

}