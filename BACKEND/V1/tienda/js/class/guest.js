class Guest {

    constructor(parameters) {
        console.log("clase de invitado creada")
        this.recover_code = '';
        this.emailForRecover = '';

        this.setTimeoutfunctions();

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
                <img src="assets/logos/whatsapp-logo.png" alt="WhatsApp" class="h-8 w-8">
              </a>
            `;

            // console.log(`nuevos datos=>${JSON.stringify(data)}`);
        })
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
    /**
     * envia el codigo para la verificaion del mismo
     * @param {*} data 
     */
    sendCodeForVerification(data) {
        user.sendDataToServer({
            controller: "auth.php",
            method: "POST",
            // action: "devolver",
            action: "verifyCode",
        }, data)
            .then((data) => {
                WebGuest.showErrorModal(data.mensagge);

                // asigna el token de session para poder recuperar y enviar el codigo}
                user.recover_code = data.RECOVER_TOKEN;


                if (data.estado == 'ok') {
                    setTimeout(() => {
                        console.log(data);

                        //    cierra el modal de los codigos 

                        OTPCodeConfirmationModal.close();
                        // luego muestra el modal  de cmabiar contraseña
                        changePass.showModal();
                    }, 3000);
                }
            }).catch((error) => {

                WebGuest.showErrorModal(error);
            });
    }
    /**
     * envia la email para recuperar la contraseña
     * @param {*} data 
     */
    sendEmailForPasswordRecovery(data) {
        // pone el modal de carga 
        WebGuest.showLoadingModal('espera mientras te enviamos el codigo');

        // envio al servidor
        user.sendDataToServer({
            controller: "auth.php",
            method: "POST",
            action: "forgotPassword",
        }, data)
            .then((data) => {
                WebGuest.hideLoadingModal();
                WebGuest.showErrorModal(data.mensagge);

                // asigna el token de session para poder recuperar y enviar el codigo}
                user.recover_code = data.RECOVER_TOKEN;

                setTimeout(() => {

                    emailForRecover.close();
                    OTPCodeConfirmationModal.showModal();

                }, 3000);
            }).catch((error) => {

                WebGuest.showErrorModal(error);
            });
    }

    /**
     * guarda la contraseña 
     */
    setEmailForRecover(email) {
        this.emailForRecover = email;
        window.localStorage.setItem('emailForRecover', email);
    }
    /**
     *envia una solicitud la servidor para cambiar la contraseña
     * @param {*} password nueva contraseña que se va a guardar
     */

    changePassword(password) {
        let data = {
            token: user.recover_code,
            password: password,
        }
        user.sendDataToServer({
            controller: "auth.php",
            method: "POST",
            action: "changePassword",
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

    async login() {
        let formEmail = $("#emailLogin").val();
        let formPassword = $("#passwordLogin").val();

        WebGuest.showLoadingModal('validando datos no nos demoraremos')
        if (this.checkPassword(formPassword)) {
            let data = {
                email: formEmail,
                password: formPassword,
            }

            this.LogInIntoServer({
                controller: "auth.php",
                method: "POST",
                action: "login",
            }, data);
        } else {
            WebGuest.hideLoadingModal();
            WebGuest.showErrorModal('la contraseña debe tener minimo 8 caracteres entre numeros y letras y un caracter especial ');
        }

        // DESPEGUELO PARA EL ADMIN 
        // let data = {
        //     email: formEmail,
        //     password: formPassword,
        // }

        // this.LogInIntoServer({
        //     controller: "auth.php",
        //     method: "POST",
        //     action: "login",
        // }, data);
    }
    register() {
        let formEmail = $("#emailForRegister").val();
        let formPassword = $("#passwordForRegister").val();
        let repeatedPassword = $("#repeatedPassword").val();
        let formName = $("#nameForRegister").val();

        // aqui seria el apartado de las validaciones 
        if (formPassword != repeatedPassword) {
            WebGuest.showErrorModal("Las contraseñas no coinciden");
        } else {
            // valida los caracteres de la contraseña 
            if (this.checkPassword(formPassword) && this.checkPassword(repeatedPassword)) {
                // estos son la estrucutra de datos que e envian al servidor
                let data = {
                    email: formEmail,
                    password: formPassword,
                    name: formName
                }

                this.sendDataToServer({
                    controller: "auth.php",
                    method: "POST",
                    action: "register",
                }, data)
                    .then((data) => {
                        // validando si no se registro bien el usuario
                        if (data.estado != 'bad register') {
                            WebGuest.showSuccessModal(data.mensagge);
                            setTimeout(() => {
                                $('#registerModal').addClass('hidden');
                            }, 3000);
                        } else {
                            WebGuest.showErrorModal(data.mensagge);
                        }

                    }).catch((error) => {

                        WebGuest.showErrorModal(error);
                    });
            } else {
                WebGuest.showErrorModal('la contraseña debe tener minimo 8 caracteres entre numeros y letras y un caracter especial ');
            }


        }

    }

    showLogin() {
        $('#loginModal').removeClass('hidden');
    }
    /**
     * envia los datos a un servidor
     * @param {object} data los datos que se van a enviar
     * @param {object} server objeto que contiene los datos del {method,controller,action}
     */
    sendDataToServer(server, data) {
        // verifica los tipos de datos
        return new Promise((resolve, reject) => {
            $.ajax({
                // url: "http://localhost/mercasena/app/controllers/test.php",
                url: `${web.baseUrl}${server.controller}`,
                method: server.method,
                // envia los datos al servidor
                data: JSON.stringify({
                    action: server.action,
                    dataObject: data

                }),
                beforeSend: () => {
                    console.log("preparando datos");

                },
                success: (data) => {
                    // muestra el modal con el mensaje



                    // WebGuest.showSuccessModal(data.mensagge);
                    resolve(data)

                },
                error: (response) => {
                    WebGuest.showErrorModal(response.error);
                    console.log(response);
                    reject(response.responseJSON.error)
                }

            })
        });


    }



    /**
     * loguea al usuario dentro del servidor 
     *  @param {object} data los datos que se van a enviar
     * @param {object} server objeto que contiene los datos del {method,controller,action}
     */
    LogInIntoServer(server, data) {
        // verifica los tipos de datos

        $.ajax({
            // url: "http://localhost/mercasena/app/controllers/test.php",
            url: `${web.baseUrl}${server.controller}`,
            method: server.method,
            // envia los datos al servidor
            data: JSON.stringify({
                action: server.action,
                dataObject: data

            }),
            beforeSend: () => {
                console.log("preparando datos");

            },
            success: (data) => {
                // muestra el modal con el mensaje

                WebGuest.hideLoadingModal();

                WebGuest.showSuccessModal(data.mensagge);

                window.localStorage.setItem("token", data.token);
                window.localStorage.setItem("userName", data.name);
                window.localStorage.setItem("sessionToken", data.sessionToken);
                window.localStorage.setItem("email", data.email);
                console.log(data);
                setTimeout(() => {
                    window.location.href = data.route;
                }, 3000);

            },
            error: (response) => {
                WebGuest.hideLoadingModal();

                WebGuest.showErrorModal(response.responseJSON.error);
                console.log(response);
            }

        })

    }
    /**
     * solicita que se logee a la aplicacion
     */


    async requestLogin() {
        // web.showInfoModal("Inicia sesion para poder disfrutar de todas las funcionalidades de mercasena")
        web.showErrorModalForInstance("Inicia sesion para poder disfrutar de todas las funcionalidades de mercasena")
        setTimeout(() => {
            // muestra el login al usuario
            $('#loginModal').removeClass('hidden');
        }, 3000);
    }
}