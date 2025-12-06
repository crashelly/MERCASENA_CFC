class User {

    constructor(parameters) {

        if (window.localStorage.getItem('sessionToken') != null && window.localStorage.getItem('userName') != null && window.localStorage.getItem('email') != null && window.localStorage.getItem('token') != null) {
            this.sessionHash = window.localStorage.getItem('sessionToken');
            this.name = window.localStorage.getItem('userName');
            this.email = window.localStorage.getItem('email');
            this.token = window.localStorage.getItem('token');
            this.photo = null;
            this.shoppingCar = {
                ShowModal: {},
                form: {

                },
                collection: [],
                numOfItems: 0,
                updateQuantity: (productID, newQuantity) => {

                    // busca el producto
                    let index = this.shoppingCar.collection.findIndex(product => product.id == productID)
                    this.shoppingCar.collection[index].cantidad = newQuantity;
                    console.log(this.shoppingCar.collection[index]);
                }
            }


            // ejecuta la puesta en marcha del los seteadores
            this.setUserInfo();

            this.orders = {
                collection: []
            }
        } else {
            // redirecciona a la pagina de inicio
            WebPage.showErrorModal('sesion no iniciada redireccionando');
            setTimeout(() => {

                window.location.href = '../';
            }, 2000);
        }


    }

/**
 * trae informaciond el numero de contacto de mercasena
 */
   getWhatsapp() {
        web.getDataFromServer({
            controller: 'mercasena.php',
            action: 'getWhatsappNumber',
            method: 'GET'
        }).then((data) => {
            console.log("whatsapp obenido  seteando ");
            
            document.getElementById('whatsapp_contact').innerHTML =`
               <a href="https://wa.me/57${ data[0].whatsapp}"   target="_blank" class="hover:opacity-80 transition-opacity">
                <img src="../assets/logos/whatsapp-logo.png" alt="WhatsApp" class="h-8 w-8">
              </a>
            `;

            // console.log(`nuevos datos=>${JSON.stringify(data)}`);
        })
    }
    /**agrega un producto al carrito */
    addProducto(productId) {
        // para que coja el contexto y me lo recoonosca como propiedades de la clase
        const self = this;
        $.ajax({
            url: `${self.url}app/controller/producto.php?action=obtenerInfoProducto&productoid=${productoId}`, // URL del endpoint al que deseas enviar la petición
            type: "GET", // Método de la petición}

            success: function (producto) {


                // agrega el producto al final de la lista
                producto.forEach(objeto => {

                    self.carritoLista.push(objeto);
                });
                // se agrega el atributo cantidad al objeto producto
                self.carritoLista.forEach(producto => {
                    producto.cantidad = 1;
                })
                console.log(self.carritoLista);
                self.mostrarMensaje("agregado con exito");

            },
            error: function (xhr, status, error) {
                console.error("Error en la petición:", error);
            },
        });
    }
/**
 * muestra el primer nombre de la persona
 */
    showNameInMobileDevice() {
        let firstName = this.name.split(" ")[0];
        //   console.log(firstName);
        return firstName;
    }

    /**
     * funcion que setea todos los campos donde aparesca el nombre de usuario etc
     * 
     */

    setUserInfo() {
        // si es la pantalla de un movil entonces hace una verificacion de la patnalla para solo mostrar lre primer nopmbre de la persona
        // if (window.innerWidth < 1080) {

        // }else{

        // }
        window.innerWidth < 1080
            ? $("#loginTrigger").text(this.showNameInMobileDevice())
            : $("#loginTrigger").text(this.name);
        // console.log(`sesion actual: ${this.sessionHash}`);
        // console.log(`sesion actual: ${this.sessionHash}`);
        // esta es el nombre del ususario en la confirmacion de compra
        $("#userNameForConfirmSh").text(this.name);
        // $("#loginTrigger").text(this.name);
        // token csrf

        $('meta[name="csrf-token"]').attr('content', this.token);

        // Set up AJAX to include the CSRF token in headers
        $.ajaxSetup({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', this.token);
                xhr.setRequestHeader('Mercasena-token', this.sessionToken);
            }
        });
    }


    // ========================= FUNCIONES DEL USUARIO ===================
    /**
     * 
     * @param {*} productId el id del producto
     * @returns {boolean} true si si lo encontro
     */

    /**
     * funcion que se encarga de cerrar la sesion del usuario
     */
    logout() {
        this.sendDataToServer({}, {
            controller: "user.php",
            method: "POST",
            action: "logout"
        }).then((data) => {
            // WebPage.showSuccessModal(data.mensagge + ' redireccionando a la pagina principal');
            WebPage.showSuccessModal(data.mensagge);
            // limpia los datos almacenados en el localstorage
            localStorage.clear();
            // redireccionando
            setTimeout(() => {
                window.location.href = '../index.html'
            }, 3000);
        }).catch((error) => {
            error == 'undefined'
                ? WebPage.showErrorModal(error)
                : WebPage.showErrorModal('algo succedio redireccionando')

            setTimeout(() => {
                window.location.href = '../'
            }, 3000);
        })
    }
    /**
     * muestra y configura el modal que configura lo datos del usuario
     */
    createUserUpdateModal() {

        web.getDataFromServer({
            controller: "user.php",
            action: "getUserInfo",
            method: "GET"
        }).then((usuarios) => {
            console.log('consulte ');
            usuarios.forEach(usuario => {
                $('#set_username').val(usuario.nombre);
                $('#set_phoneNumber').val(usuario.telefono);
                $('#set_adress').val(usuario.direccion);
                $('#set_nit').val(usuario.nit);
                console.log(usuario);
            });
            // array.forEach(element => {

            // });

            myAccountModal.showModal();

        }).catch((error) => {
            console.log(error);

            WebPage.showErrorModal(error);
        });

    }
    /**
     * actualiza la informacion del usuario (nombre,telefono,direccionn y talvez nit)
     */
    updateUserData() {
        let name = $('#set_username').val();
        let phoneNumber = $('#set_phoneNumber').val();
        let adress = $('#set_adress').val();
        let nit = $('#set_nit').val();

        if (name == '') {
            WebPage.showErrorModal('todos los campos son obligatorios');

        } else {
            // estructura de datos
            let data = {
                name: name,
                phoneNumber: phoneNumber,
                adress: adress,
                nit: nit
            }
            web.updateDataFromServer(data, {
                controller: "user.php",
                action: "updateUserInfo"
            }).then((data) => {
                WebPage.showSuccessModal(data.mensagge);
                setTimeout(() => {
                    myAccountModal.close();
                }, 3000);
            }).catch((error) => {
                WebPage.showErrorModal(error);

            });
        }


    }



    isTheProductInTheCollection(productId) {
        let shoppingCar = this.shoppingCar.collection;
        // validacion  de que un producto no se pueda rtepettir en el arreglo
        return shoppingCar.some(product => product.id == productId) ? true : false;
    }

    updateProductCounterInShoppingCart() {
        document.getElementById("productCounterInShoppingCart").innerText = this.shoppingCar.collection.length;
    }
    
    
    /**
    *envia una solicitud la servidor para cambiar la contraseña
    * @param {*} password nueva contraseña que se va a guardar
    */

    changePassword(password) {
        let data = {

            password: password,
        }
        user.sendDataToServer(data, {
            controller: "Auth.php",
            method: "POST",
            action: "changePasswordWithoutCode",
        }, data)
            .then((data) => {
                // WebGuest.showErrorModal(data.mensagge);
                // setTimeout(() => {
                //     window.location.href = '../';
                // }, 3000);
                // web.showSuccessModalForInstance(data.mensagge);
                WebGuest.showSuccessModal(data.mensagge);
            }).catch((error) => {
                web.showErrorModalForInstance(error);
            });
    }
    /**
        * verifica si la contraseña contiene 8 caractreses entre numeros y letra y un caracter especial
        */
    checkPassword(password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

        if (regex.test(password)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * agregar el producto a el carrito 
     * @param {*} productId id del producto
     */
    addProductToShoppingCart(productId, productState) {
        let shoppingCar = this.shoppingCar.collection;
        // baja el dropdown de los producto que se stan buscando  y lo sube al segundo
        $("#productsResult").addClass('mt-10');
        $("#ProductsModalForMobile").addClass('mt-40');
        setTimeout(() => {
            $("#productsResult").removeClass('mt-10');
            $("#ProductsModalForMobile").removeClass('mt-40');
        }, 3000);


        // validacion  de que un producto no se pueda rtepettir en el arreglo

        if (this.isTheProductInTheCollection(productId)) {
            console.log("el producto ya se encuentra en el carrito de compras");
            WebPage.showMensaggeOfAddedProduct({
                action: 'rejected',
                mensagge: "el producto ya se encuentra en el carrito de compras"
            });
        } else {

            // verifica aparti re del estado del producto a ver sui esta agotado
            if (productState == 5) {
                WebPage.showMensaggeOfAddedProduct({
                    action: 'rejected',
                    mensagge: "no hay existencias de este producto por el momento"
                });
            } else {

                let product = web.productsBuffer.find(product => product.id == productId)
                console.log(`el buffer de los productos es => ${web.productsBuffer}`)
                // agregando el pproducto al carrito de compras
                this.shoppingCar.collection.push(product);
                console.log("se agrego el producto al carrito de compras", this.shoppingCar.collection);
                WebPage.showMensaggeOfAddedProduct({
                    action: 'added',
                    mensagge: "se agrego el producto al carrito de compras"
                });
                this.updateProductCounterInShoppingCart();
                // muestra el contador en el carrito
            }

        }

    }

    /**
    * busca productos dentro del buffer 
    */
    async searchProductsInSearchedBuffer(UserInputName) {

        console.log("BUSCANDO PRODUCTOS  EN EL BUFFER...");
        // let newData = json.find(pedido =>pedido.Usuario == nombre);
        // busca los nombres que coincidan en los datos
        console.log("buscando ... apartir de lo siguiente escrito > " + UserInputName);
        // let newData = 'no se';
        let newData = web.productsForSearch.filter(producto => producto.nombre.toLowerCase().includes(UserInputName.toLowerCase()) || producto.subCategoria.toLowerCase().includes(UserInputName.toLowerCase()));
        // console.log("encontre=>"+JSON.parse(newData));
        console.log("tamaño del buffer=>" + web.productsForSearch.length);
        console.log("encontre=>" + JSON.stringify(newData));
        // ternaria que verifica si el array esta vacio o no

        // console.log(`retornando =>> ${JSON.parse(newData)}`)
        if (newData.length != 0) {
            return newData;
        } else {
            throw new Error("Lo sentimos  😥 producto no encontrado");
            return null;
        }

    }
    /**
     * envia los datos a un servidor
     * @param {object} data los datos que se van a enviar
     * @param {object} server objeto que contiene los datos del {method,controller,action}
     */
    sendDataToServer(data, server) {
        return new Promise((resolve, reject) => {
            $.ajax({
                // url: "http://localhost/mercasena/app/controllers/test.php",
                url: `${web.baseUrl}${server.controller}`,
                method: server.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Mercasena-Token': this.sessionHash,
                    'X-CSRF-token': this.token
                },

                // envia los datos al servidor
                data: JSON.stringify({
                    action: server.action,
                    dataObject: data

                }),
                beforeSend: () => {
                    console.log("preparando datos");
                    // inventary.showLoadingModal();
                },
                success: (data) => {
                    // muestra el modal con el mensaje
                    // inventary.hideLoadingModal();
                    WebPage.showSuccessModal(data.mensagge);
                    // WebPage.showSuccessModal(data.mensagge);
                    resolve('');
                },
                error: (response) => {
                    WebPage.showErrorModal(response.error);
                    console.log(response);
                    reject(response.error);
                }

            });
        });
    }

    setTimeoutfunctions() {
        this.searchProductsForShop = setTimeout(() => {

        }, 2000);

        this.getProductsForSearch = setInterval(() => {
            web.getDataFromServer({
                controller: 'Product.php',
                action: 'getInfoProductsForShop',
                method: 'GET'
            }).then((data) => {
                console.log("======= INFORMACION OBTENIDA ===============");
                web.productsForSearch = data;

                // console.log(`nuevos datos=>${JSON.stringify(data)}`);
            })
        }, 50000);


        this.stopIntervalFuncion = (intervalID) => {
            clearInterval(intervalID);
        }
    }
    getCodeFromForm() {

    }

    /**
     * aqui se renderiza el carritop de compras 
     * 
     */
    renderShoppingCart() {
        // seteamos para que  no aparesca 
        document.getElementById("shoppingCarContainer").innerHTML = "";
        console.log(`este es el carrito de mercasena => ${this.shoppingCar.collection}`)
        // se recorre el carrito de compras y se renderiza en el contenedor del carrito
        this.shoppingCar.collection.forEach(producto => {
            document.getElementById("shoppingCarContainer").innerHTML += `
            <!-- Producto + botón eliminar -->
                <div class="flex items-center  mt-4 justify-center gap-2">
                <span class="color-sena contenedorNombreCarrito text-white px-3 py-1 rounded-lg">${producto.nombre} ${producto.subCategoria}: $ ${producto.precio}</span>
                <input type="hidden" id="price${producto.id}" value="${producto.precio}">
                <button class="bg-red-400 text-white px-2 py-1 rounded-md text-xs transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 " onclick="user.dropProductFromShoppingCart(${producto.id})"><svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                </div>

                <!-- Cantidad que tambien contiene los botones de agregar o bajar -->
                <div class="border-l-4 border-r-4 border-green-500 flex justify-center items-center">
                   <!-- boton de disminuir -->

                    <button  onclick="user.decreaseQuantity(${producto.id})" class="mr-3 bg-red-300 hover:bg-red-500 hover:scale-200 transition duration-300  ease-in-out  text-white px-3 py-1 rounded-lg">
                        <img class="h-4 w-4" src="https://img.icons8.com/ios-glyphs/30/minus.png" alt="minus"/>
                    </button>
                    
                    <span  id="Text${producto.id}"  class="color-sena text-white contenedorMedidaCarrito  px-2 py-1 rounded-lg"><input type="hidden"  id="quantity${producto.id}" value="1"><strong id="text${producto.id}"></strong> <strong > ${producto.medidaVenta}</strong></span>
                    
                    <!-- boton de aumentar -->
                    <button onclick="user.increaseQuantity(${producto.id})"  class="ml-3  bg-green-300 hover:bg-green-500 hover:scale-200 transition duration-300  ease-in-out    text-white px-3 py-1 rounded-lg">
                        <img class="h-4 w-4"  src="https://img.icons8.com/material-rounded/24/plus--v1.png" alt="plus--v1"/>
                    </button>
                </div>

                <!-- Total -->
                <div class="flex hidden md:block justify-center items-center">
                <button    class="color-sena text-white px-3 py-1 rounded-lg"><input type="hidden"  id="total${producto.id}" value="1"><strong id="textTotal${producto.id}">${producto.precio}</strong></button>
                </div>
                `;

            // para poder mostrar lo de 1 kilogramos y asi
            document.getElementById("text" + producto.id).innerText = 1;

            // asignamos de valor de defecto del totoal el producto entre precio y cantidad
            $(`#total${producto.id}`).val(
                parseInt(producto.precio) * parseInt(producto.cantidad)
            );
            console.log(this.shoppingCar.collection)
        });

        // muestra el carrito de compras
        modal_carrito.showModal();
        this.calculateTotal();

    }
    /**
     * consulta las facturas del cliente
     */
    fetchBills() {
        web.getDataFromServer({
            controller: "Bill.php",
            action: "getMinimalBillInfoForUser",
            method: "GET"
        }).then((bills) => {

            console.log(bills);
            web.renderBills(bills);
            // billsModal.showModal();
        }).catch((error) => {
            WebPage.showErrorModal('no tienes ninguna factura relacionada con tu cuenta  ');
        });
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
                // linusk.download = 'factura.pdf'; // Nombre del archivo para la descarga
                // document.body.appendChild(link);
                // link.click();
                // document.body.removeChild(link);
                // window.open(response.url, '_blank');
                window.location.href = response.url;
                WebPage.hideLoadingModal();
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
        WebPage.showLoadingModal('Creando comprobante de venta , pronto la descargaremos')
        web.getDataFromServer({
            controller: "Bill.php",
            action: "downloadBill&billId=" + billID,
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
     * buscan los pedidos hechos por el susuario al servidor
     */
    fetchOrders() {
        web.getDataFromServer({
            controller: "Order.php",
            action: "getOrdersByUser",
            method: "GET"
        }).then((orders) => {
            this.orders.collection = orders;
            // modal de los pedidos
            console.log(orders);

            // renderizamos las ordenes
            web.renderOrders(orders);
            ordersModal.showModal();

        }).catch((error) => {
            WebPage.showErrorModal('no tienes ningun pedido relacionado con tu cuenta  ');
        });


    }

    seeOrderDetails(orderId) {

        web.getDataFromServer({
            controller: "Order.php",
            action: "getOrderInfo&orderID=" + orderId,
            method: "GET"
        }).then((order) => {
            console.log(order);
            web.renderOrderInfo(order);
            orderInfoModal.showModal();
        }).catch((error) => {
            WebPage.showErrorModal('No hay ningun pedido relacionado con tu cuenta   ' + error);
        });
    }
    /**
     * borra algun pedido hecho por el usuario
     */
    deleteOrder(orderID) {
        // informacion del id del pedido
        let data = {
            orderID: orderID
        }
        web.deleteDataFromServer(data, {
            controller: "Order.php",
            action: "deleteOrder",
        }).then((response) => {
            // muestra  que borramos con exito
            WebPage.showSuccessModal(response.mensagge);
            // escondemos el modal de informacioN del pedido
            orderInfoModal.close();
            // reecargamos las ordenes del usuario
            this.fetchOrders();
        }).catch((response) => {
            WebPage.showErrorModal(response.error);
        })
    }
    /**
     * elimina un producto del carrito
     * @param {*} productId 
     */
    dropProductFromShoppingCart(productId) {
        // let element =  this.shoppingCar.collection

        let index = this.shoppingCar.collection.findIndex(product => product.id == productId);
        // ejecutamos la eliminacion 
        this.shoppingCar.collection.splice(index, 1);

        // damos la alerta de que se elimino
        WebPage.showSuccessModal("Producto eliminado del carrito con exito");
        // recargamos el carrito
        this.renderShoppingCart();
        // actualizo el contaodr d e productos en el carrito
        this.updateProductCounterInShoppingCart();

    }

    /**
     * obtiene informacion del producto 
     * @param {*} productId 
     */



    increaseQuantity(productID) {
        let quantity = document.getElementById("quantity" + productID).value;
        quantity++;

        document.getElementById("quantity" + productID).value = quantity;
        document.getElementById("text" + productID).innerText = quantity;

        this.calculateTotalPerProduct(productID);

        // aumentamos la cantidan en el arreglio 
        this.shoppingCar.updateQuantity(productID, quantity);

        // calculando el total 
        this.calculateTotal();

    }
    decreaseQuantity(productID) {
        let quantity = document.getElementById("quantity" + productID).value;
        if (quantity <= 1) {
            WebPage.showErrorModal("no se puede disminuir mas la cantidad");
            console.log("no se puede disminuir mas la cantidad");

        } else {
            quantity--;

            document.getElementById("quantity" + productID).value = quantity;
            document.getElementById("text" + productID).innerText = quantity;
            this.shoppingCar.updateQuantity(productID, quantity);
            this.calculateTotalPerProduct(productID);



        }
    }

    calculateTotalPerProduct(productID) {
        let totalInput = document.getElementById("total" + productID);
        let totalText = document.getElementById("textTotal" + productID);
        let quantity = document.getElementById("quantity" + productID).value;
        let price = document.getElementById("price" + productID).value;


        let total = quantity * price;
        totalInput.value = total;
        totalText.innerText = total;
        //  = total;
        this.calculateTotal();


    }
    calculateTotal() {
        let total = 0;
        this.shoppingCar.collection.forEach(producto => {
            // let totalInput = document.getElementById("total" + producto.id).value;
            // total += parseInt(totalInput);
            // console.log("total", total);
            total += parseInt(producto.cantidad) * parseInt(producto.precio);

        });
        document.getElementById("TotalShoppinCart").innerText = total;
        // console.log(this.shoppingCar.collection);
        // $("#TotalShoppinCart").text(total);


    }



    /**
     * recolecta la informaccion de los productos en el carrito y luego los guarda como unos datos aenviar
     */
    recolectDataFromShoppingCar() {
        // la estructura de los datos que se van a enviar
        let data = {
            sessionToken: this.sessionHash,
            totalPrice: "",
            products: []
        };

        if (this.shoppingCar.collection.length <= 0) {
            WebPage.showErrorModal('No puedes generar un pedido sin ningun producto en el carrito ');
        } else {
            // por cada producto del carrito va a guardarlo y enviarlo
            this.shoppingCar.collection.forEach(producto => {
                let totalInput = document.getElementById("total" + producto.id).value;
                let quantity = document.getElementById("quantity" + producto.id).value;

                // estructura de cada productos
                let product = {
                    id: producto.id,
                    quantity: quantity,
                    partialTotalPrice: totalInput,
                }

                // guardamos la informacion nueva en el arreglo
                data.products.push(product);


            });
            // aqui es se asigna el valor del precio total 
            data.totalPrice = parseInt($("#TotalShoppinCart").text())

            // console.log(data);
            // aqui se envian los datos
            this.sendDataToServer(data, {
                controller: "Order.php",
                method: "POST",
                action: "createOrder"
                // action:"devolver"
            }).then(() => {
                // cierra el modal de confirmacion del carrito
                setTimeout(() => {
                    orderLimitNotification.close();
                }, 4000);

                
                setTimeout(() => {

                    modal_carrito.close();
                    // muestra el modal de alerta de que se va a eliminar el pedido
                    // seteamos el nombre del usuaario
                    $("#alertUserName_alert").text(this.name);
                    orderLimitNotification.showModal();
                }, 1000);
                orderLimitInHours.close()
                // cierro el modal del carrito despues de 2 segundos
                setTimeout(() => {
// se restaura el carrito
this.shoppingCar.collection = [];
this.updateProductCounterInShoppingCart();
                }, 2000);
            }).catch((error) => {
                console.log(error);
            })
        }

    }
}