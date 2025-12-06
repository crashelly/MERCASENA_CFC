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
    setRequestHeader() {
        $.ajaxSetup({
            headers: {
                'Content-Type': 'application/json',
                'Mercasena-Token': this.sessionHash,
                'X-CSRF-token': this.token
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
        return new Promise((resolve, reject) => {
            $.ajax({
                // url: "http://localhost/mercasena/app/controllers/test.php",
                url: `${inventary.baseUrl}${controller}`,
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

    /**
    * funcion que se encarga de cerrar la sesion del usuario
    */
    logout() {
        this.sendDataToServer(
            "User.php",
            "logout",
            null
        ).then((data) => {
            Inventary.hideLoadingInmutableModal();
            // WebPage.showSuccessModal(data.mensagge + ' redireccionando a la pagina principal');
            Inventary.showModalSucces('adiós ADMINISTRADOR');
            // limpia los datos almacenados en el localstorage
            localStorage.clear();
            // redireccionando
            setTimeout(() => {
                window.location.href = '../index.html'
            }, 3000);
        }).catch((error) => {
            error == 'undefined'
                ? Inventary.showErrorModal(error)
                // :Inventary.showErrorModal('algo succedio redireccionando')
                : Inventary.showModalSucces(error.mensagge);


            setTimeout(() => {
                window.location.href = '../'
            }, 3000);
        })
    }

    /**
     * edita el producto 
     * @param {string} id del producto a consultar
     * @param {object} data informacion del producto
     */

    editProduct(idProduct, data) {
        Inventary.showLoadingModal();
        // obtiene informacion de los productos desde el serviror
        inventary.getDataToServer({
            controller: 'Product.php',
            action: "getProductInfo&id=" + idProduct,
            method: 'GET'
            // cuaddra parametros 
        }, { nothing: 'nothing' })
            .then((data) => {
                // cierra el mdoal de carga
                Inventary.hideLoadingModal();
                inventary.targetEditionProduct = data[0]
                console.log(inventary.targetEditionProduct);
                // setea los valores por defecto en el formulario
                inventary.setValuesToEditProductForm();
                formularioEditarProducto.showModal();
                // this.showModalEditProduct(data, idProduct);
            }, true, false)
            .catch((response) => {
                // cierra el modal de carga
                Inventary.hideLoadingModal();
                //    let texto =  JSON.stringify(error);
                let texto = response.error;
                Inventary.showErrorModal(texto);
            })



        // seteamos todos los valores que nesecita el formulario

    }

    /**
     * elñeimina una imagen del banner del servidor  
     * 
     */
    deleteBannerImage(imageID) {
        let data = { "id": imageID };
        inventary.deleteDataFromServer({
            endpoint: 'mercasena.php',
            action: 'deleteBannerImage'
        }, data)
            .then((data) => {
                // cerramos ese modal
                MarketingImagesSection.close();
                Inventary.hideLoadingInmutableModal();
                Inventary.showModalSucces(data.mensagge);
                // renderiza otra vez la tabla para mostrar los cambios
            })
            .catch((response) => {
                MarketingImagesSection.close();
                Inventary.hideLoadingInmutableModal();
                // Inventary.hideLoadingModal();
                Inventary.showErrorModal(response.error);
            });
    }

    submitEditionModal() {
        console.log("entre en la parte de de submitEditionForm");
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


        var formDataUpload = new FormData();
        var imageFileUpload = $("#file-upload-edit")[0].files[0];

        let sendImage = false;
        if (!imageFileUpload) {

        } else {

        }

        this.sendDataFromModalForm(data, 'Product.php', 'updateProductWithSubCategory', 'PUT')
            .then((data) => {
                // cierra el formulario y cierra el modal de carga
                formularioEditarProducto.close();
                Inventary.hideLoadingInmutableModal();
                // muesxtra el mensaje de exito
                Inventary.showModalSucces(data.mensagge);
                if (imageFileUpload) {
                    console.log(imageFileUpload);
                    formDataUpload.append("Uptimage", imageFileUpload);
                    // cierra el modal del formulario de creacion
                    // esconde el m,odqal de carga
                    // muestrra el modal de que todo salio good

                    setTimeout(() => {

                        Inventary.showLoadingInmutableModal("enviando imagen al servidor...");
                    }, 3000);
                    // envio de la imagen 
                    // espera 15 segundos y luego envia la imagen
                    setTimeout(() => {
                        // aca envia la imagen
                        this.uploadImage(formDataUpload, "POST")
                            .then((data) => {
                                inventary.renderTable('product', inventary.renderProductsTable);
                                Inventary.hideLoadingInmutableModal();
                                Inventary.showModalSucces(data.mensagge);

                                // renderiza otra vez la tabla para mostrar los cambios

                            })
                            .catch((response) => {
                                inventary.renderTable('product', inventary.renderProductsTable);
                                Inventary.hideLoadingInmutableModal();


                                // Inventary.hideLoadingModal();
                                Inventary.showErrorModal(response.error);
                            });
                    }, 15000);
                } else {
                    console.log("no se cargo una imagen ppor eso no se envio")
                }


            })
            .catch((response) => {
                Inventary.hideLoadingInmutableModal();

                // Inventary.hideLoadingModal();
                Inventary.showWarningMensagge(response.responseJSON.error);
            });



    }
    /**
    * 
    * @param {*} htmlInputId id del input
    * @param {Array} data arreglo que agrupa ["controller","action"]
    */
    submitModalForm(dataObject) {
        console.log("entre en la parte de de la funcion ");
        // formulario
        // console.log(dataObject);
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
            console.log(`${dataObject.dbInputId} `);
            data.id = document.getElementById(`${dataObject.dbInputId}`).value;
        }
        // dataObject.method == "POST" ? dataObject.method = "POST" : dataObject.method = "PUT";
        // aqui se envia los formularios

        console.log("esta es la data" + JSON.stringify(data));
        this.sendDataFromModalForm(data, dataObject.controller, dataObject.action, dataObject.method)
            .then((data) => {
                searchProductosInfoForBuffer()
                ProductsModalForMobile.close();
                formularioEditarProducto.close();
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
                    'Mercasena-Token': this.sessionHash,
                    'X-CSRF-token': this.token
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
                    console.error(response);
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
    uploadImage(formData, method) {
        return new Promise((resolve, reject) => {


            // if (!imageFile) {
            //     alert("Por favor selecciona una imagen.");
            //     return;
            // }

            // console.log(formData);
            //    `${inventary.baseUrl}test.php`

            fetch(`${inventary.baseUrl}Product.php`, {
                // fetch(`${inventary.baseUrl}Test.php`, {
                method: method,
                headers: {
                    'Mercasena-Token': this.sessionHash,
                    'X-CSRF-token': this.token
                },
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cargar la imagen');
                    } else {
                        // response.JSON();
                    }
                    // return response.text();
                })
                .then(data => {
                    console.log(data);
                    resolve("todo good");
                    console.log("Imagen cargada con éxito");
                })
                .catch(error => {
                    reject(error);
                    console.error("Error al cargar la imagen:", error);
                });
        });



    }


    /**
     * crea el producto e intenta enviarlo al server
     */
    createProduct() {
        var productoSelect = document.getElementById("productoSelect");
        var categoriasSelect = document.getElementById("categoriasSelect");
        var medSelect = document.getElementById("medSelect");
        var precio = document.getElementById("precio");
        // let medida = document.getElementById("medida").value;
        var existencias = document.getElementById("existencias");

        let variacion = "";
        // esta es la foto

        // let formData = new FormData();
        // // let imageFile = $("#file-upload")[0].files[0];
        // let imageFile = document.getElementById('file-upload').files[0];
        // formData.append('image', imageFile);

        // const imageFile = $("#file-upload")[0].files[0];
        // console.log(imageFile);

        // ternaria que me crea el valor
        $("#VariantCheckboxYes").prop("checked") ? variacion = $("#variantName").val() : variacion = null;

        let dataObject = {
            product: productoSelect.value,
            category: categoriasSelect.value,
            measurement: medSelect.value,
            price: precio.value,
            unit: 1,
            stock: existencias.value,
            variation: variacion
        }

        var formData = new FormData();
        var imageFile = $("#file-upload")[0].files[0];
        formData.append("image", imageFile);





        // envia al servidor la informacion dek nuevo producto

        this.sendDataToServer("Product.php", "saveProductWithSubCategory", dataObject)
            .then((data) => {
                // cierra el modal del formulario de creacion
                formularioProducto.close();
                // esconde el m,odqal de carga
                Inventary.hideLoadingInmutableModal();
                // muestrra el modal de que todo salio good
                Inventary.showModalSucces(data.mensagge);

                // redneriza otra vez la tabla 
                inventary.renderTable('product', inventary.renderProductsTable);

                setTimeout(() => {

                    Inventary.showLoadingInmutableModal("enviando imagen al servidor...");
                }, 3000);
                // envio de la imagen 
                // espera 15 segundos y luego envia la imagen
                setTimeout(() => {
                    // aca envia la imagen
                    this.uploadImage(formData, "POST")
                        .then((data) => {
                            Inventary.hideLoadingInmutableModal();
                            Inventary.showModalSucces(data.mensagge);

                            inventary.renderTable('product', inventary.renderProductsTable);

                        })
                        .catch((response) => {
                            Inventary.hideLoadingInmutableModal();

                            // Inventary.hideLoadingModal();
                            Inventary.showWarningMensagge(response.error);
                        });
                }, 15000);

            })
            .catch((response) => {
                Inventary.hideLoadingInmutableModal();

                // Inventary.hideLoadingModal();
                Inventary.showWarningMensagge(response.responseJSON.error);
            });


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
        document.getElementById(`${inputId}`).value = baseProduct[0].nombre;
        document.getElementById(`${dbInputId}`).value = baseProduct[0].id;
    }




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
        arr[2].labelName = `Editando Categorias`;

        let categoryData = inventary.categoriesBuffer;
        // buscando la informacion que hay en local gracias  a la anterior consulta
        let category = categoryData.filter(category => category.id == categoryID);

        //    este el id de la etiqueta input 
        let inputId = arr[2].id;
        let dbInputId = arr[2].dbInputId;
        //    aqui se asigna el nuevo titulo
        // $("#objectId").val(categoryData.id);
        console.log(`${arr[2].id}  vs ${arr[2].dbInputId}`);
        document.getElementById("formMixedTitle").innerText = `Edicion o actualizacion`;
        //    le asigno el valor que saque de la busqueda a la etiqueta del input que hay

        inventary.forms.category.showModal();
        document.getElementById(`${inputId}`).value = category[0].nombre;
        document.getElementById(`${dbInputId}`).value = category[0].id;

        console.log(category);

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
        document.getElementById(`${nameId}`).value = measurement[0].nombre;
        document.getElementById(`${dbInputId}`).value = measurement[0].id;
        document.getElementById(`${factorId}`).value = measurement[0].factor;


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
            data.length > 0 ? searchProductsModal.showModal() : Inventary.showErrorMensagge('no hay información que mostrar');

            // GUARDO LA INFORMACION PARA LUEGO BUSCAR
            inventary.searchedProductsBuffer = data;
        }, true, false);
    }
    /**
        * descarga la factura en pdf
        */
    downloadBill(url) {
        $.ajax({
            url: url,
            type: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Mercasena-Token': this.sessionHash
            },
            success: function (response) {
                // // Suponiendo que el servidor responde con la URL del archivo
                // const fileUrl = response.fileUrl;
                // const link = document.createElement('a');
                // link.href = fileUrl;
                // link.download = 'factura.pdf'; // Nombre del archivo para la descarga
                // document.body.appendChild(link);
                // link.click();
                // document.body.removeChild(link);
                // window.open(response.url, '_blank');
                window.location.href = response.url;
                // WebPage.hideLoadingModal();
                Inventary.hideLoadingModal();
                // console.log(response.url);
            },
            error: function (xhr, status, error) {
                console.error('Error al generar el archivo:', error);
            }
        });
    }


    /**
  * funcin para descargar una factura
  */

    RequestDownloadBill(billID) {
        // WebPage.showLoadingModal('creando factura , pronto la descargaremos')
        Inventary.showLoadingModal('creando factura , pronto la descargaremos');
        inventary.getDataFromServerV2({
            endpoint: "Bill.php",
            action: "downloadBillForAdmin&billId=" + billID,
            method: "GET"
        }).then((response) => {

            // Abre una nueva ventana con las dimensiones especificadas
            // window.open(response.url, '_blank', 'width=600,height=400');
            // window.open(response.url, '_blank');

            this.downloadBill(response.url);
            // console.log(response);
            // window.location.href = response.route;
        }).catch((error) => {
            // WebPage.showErrorModal('no tienes ninguna factura relacionada con tu cuenta  ');
            error == '' || error == undefined
                ? WebPage.showErrorModal('Error en el servidor , lo sentimos ')
                : WebPage.showErrorModal(error);
            // console.error(error);

        });
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

            console.log(`el id del pedido es ${data.orderID}  pero ademas es tipo ${typeof data.orderID}  y el lagor de la cadena es ${data.orderID.length} `);
            // si es diferente a '' hace como factura de pedido si no entonces 
            // lo hace como factura desde cero
            // le cambiamos la accion que vba a hacer en el servidor y ya

            // : serverAction = "devolver";
            if (data.orderID != '' || data.orderID == undefined || data.orderID == null) {
                serverAction = "confirmBill";

                console.log("la factura nace apartir de un pedido");
            } else {
                serverAction = "confirmBillWithoutOrder";
                console.log("la factura sale desde cero");

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
                    // renderizado de los productos
                    inventary.renderTable('product', inventary.renderProductsTable);
                    // luego de tres segundo volvemos a mostrar los pedidos
                    setTimeout(() => {
                        user.createOrdersPanel();
                    }, 3000);

                    // luego cargamos un modal que pide que se va a hacer con la factura
                });
        }).catch((mensagge) => {
            billModal.close();
            Inventary.showErrorModal(mensagge);

            setTimeout(() => {
                billModal.showModal();
            }, 3000);
        })
    }
    /**
     * recolecta tda la informacion de la factura como los productos su cantidad y a su vewz el preci total
     */
    async recolectDataFromBill() {
        return new Promise((resolve, reject) => {

            let data = {
                customer: $('#customerName').val(),
                customersPhone: $('#customerPhone').val(),
                customerNit: $('#customerNit').val(),
                customerEmail: $('#customerAdress').val(),
                customerAddress: $('#customerAdress').val(),
                orderID: $('#pedidoID').val(),
                total: $('#totalBill').val(),


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

            data.customer == ''
                ? reject("Debes poner el nombre del cliente para continuar")
                : resolve(data);

            // ternaria para mirar a ver si se puso el nombre del cliente
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
     * busca productos dentro del buffer y si encuentra alguna coincidencia entonces la devuelve
     */
    async searchProductsInSearchedBufferForEdit(UserInputName) {

        console.log("BUSCANDO PEDIDOS EN EL BUFFER...");
        // let newData = json.find(pedido =>pedido.Usuario == nombre);
        // busca los nombres que coincidan en los datos
        let newData = inventary.searchedProductsBuffer.filter(item => item.nombre.toLowerCase().includes(UserInputName.toLowerCase()) || item.subCategoria.toLowerCase().includes(UserInputName.toLowerCase()));
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
     * Después de la eliminación, se llama a la función renderFunction para renderizar la tabla de nuevo.
     *
     * @param {Object} register - El objeto de registro que contiene el ID a eliminar.
     * @param {Function} renderFunction - La función para renderizar la tabla después de la eliminación.
     * @throws {Error} - Si ocurre un error al eliminar el registro.
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
    /**
     * Elimina un producto base enviando una solicitud de eliminación al controlador con el ID especificado.
     *
     * @param {Number} id - El ID del producto base a eliminar.
     *
     * @returns {Promise} - La promesa que se resuelve cuando se completa la solicitud de eliminación.
     */
    async deleteBaseProduct(id) {

        await this.deleteRegister({
            id: id,
            serverAction: "deleteBaseProduct",
            renderParam: "baseProduct"
        }, inventary.renderBaseProductsTable);
    }

    /**
     * Elimina un producto enviando una solicitud de eliminación al controlador con el ID especificado.
     *
     * @param {Number} id - El ID del producto a eliminar.
     * 
     * @returns {Promise} - La promesa que se resuelve cuando se completa la solicitud de eliminación.
     */

    async deleteProduct(id) {

        await this.deleteRegister({
            id: id,
            serverAction: "deleteProduct",
            renderParam: "product"
        }, inventary.renderProductsTable);
    }

    /**
     * Elimina una categoria enviando una solicitud de eliminación al controlador y acción especificados.
     *
     * @param {Number} id - El ID de la categoria a eliminar.
     *
     * @returns {Promise} - La promesa que se resuelve cuando se completa la solicitud.
     */
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