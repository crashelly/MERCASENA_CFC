var btnYes = document.getElementById('VariantCheckboxYes');
var btnNo = document.getElementById('VariantCheckboxNo');


// LoadingModal.showModal();
// eventos para la animacion de pantalla de carga
document.addEventListener('DOMContentLoaded', function () {
    // aqui esconde la pantalla de carga
    setTimeout(() => {
        // LoadingModal.close();
    }, 2000);
    // LoadingModal.close();

});

// el contenedor de pedidos
$("#ordersContainer").on("click", function () {
    user.createOrdersPanel();
    Inventary.showLoadingModal();
});
$("#sidebar_seeOrdersbtn").on("click", function () {
    user.createOrdersPanel();
    Inventary.showLoadingModal();
});
$("#billSearch_Btn").on("click", function () {
   billsModal.showModal();
    // Inventary.showLoadingModal();
});


// $("#")


// evento que maneja que se este en check el boton de elegir variante del producto
btnYes.addEventListener('change', function () {
    let inputVariacion = document.getElementById("variantInputContainer");
    if (this.checked) {
        btnNo.checked = false;
        inputVariacion.innerHTML = `
                                <label class="floating_label">
                                                <span class="text-2xl text-green-400  ">Nombre de la variacion</span>
                                                <br>
                                                <br>
                                               
                                                <input id="variantName"
                                                    class="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
                                                    type="text" placeholder="tahiti" required="">
                                            </label>
        
        `;
        // $('#variantInputContainer').innerHTML = 
        console.log('Checkbox is checked');
    } else {
        // cambiar la forma en la qu se cambia el check para que nunca se cruce el si y el no
        this.checked = false;
        inputVariacion.innerHTML = '';
        console.log('Checkbox is unchecked');
    }
});

// boton de la variacion
btnNo.addEventListener('change', function () {

    let inputVariacion = document.getElementById("variantInputContainer");
    if (this.checked) {
        btnYes.checked = false;
        // cambiar el checkbox
        inputVariacion.innerHTML = '';

    } else {
        // cambiar la forma en la qu se cambia el check para que nunca se cruce el si y el no
        this.checked = false;

    }
});
window.addEventListener('DOMContentLoaded', () => {
    console.log("domCargado");
    document.getElementById('uploadForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        var imageFile = document.getElementById('imageFile').files[0];
        console.log(imageFile);
        if (!imageFile) {
            console.error("No se ha seleccionado ningún archivo.");
            return;
        }

        var formData = new FormData();
        formData.append("Uptmage", imageFile);

        fetch("http://192.168.1.41/mercasena/app/controllers/test.php", {
            method: "POST",
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar la imagen');
                }
                return response.text();
            })
            .then(data => {
                console.log("Imagen cargada con éxito");
            })
            .catch(error => {
                console.error("Error al cargar la imagen:", error);
            });
    });
});

document.getElementById("modalFormCreateProduct").addEventListener("submit", e => {
    e.preventDefault();
    user.createProduct();
    // user.sendDataToServer();
});
document.getElementById("modalFormEditProduct").addEventListener("submit", e => {
    e.preventDefault();
    user.submitEditionModal();
    // user.sendDataToServer();
});
// evento que guarda la subida de informacion del uinto de venta
document.getElementById("adminS_form").addEventListener("submit", e => {
    e.preventDefault();
    inventary.recolectDataFromPuntConfigForm();
    // user.sendDataToServer();
});

// controllamos el evento de creacion y configuramos los DATOS
document.getElementById("modalCreacionForm").addEventListener("submit", e => {
    e.preventDefault();
    try {
        user.submitModalForm(ObjectData);
    } catch (error) {
        console.error(error);
    }


});
// evento de submiteo del formulario de busquyeda de comprobantes de venta por nombre de usuasrio
document.getElementById("searchBillByUser_form").addEventListener("submit", e => {
    e.preventDefault();
    // document.getElementById('searchBillByUser_form').preventDefault();

    try {
        // muestra la pantalla de carga 
        Inventary.showLoadingModal("Consultando informacion...");
        // inventary.renderLoadingIconInBill();
        let requestProduct = { id: null }

        // resultyado del checkbok si es truew filtra por cliente y fecha si no solo por cliente
        let shouldFilterDateAndClientName = $("#check_searchBills").is(':checked');

        if (shouldFilterDateAndClientName) {
           // buscando facturas por solo el  nombre de usuario
           let date = inventary.billDateFilter;
            let username = $("#inputSearchBills_input_bill").val();
            inventary.getDataFromServerV2({
                endpoint: 'Bill.php',
                action: `getBillByUserNameAndDate&BillDate=${date}&clientName=${username}`
                // action: `getProductInfoForMinimalStock`
            }, requestProduct).then((data) => {
                Inventary.hideLoadingModal();
                inventary.renderBills(data);
            });     
        } else {
            // buscando facturas por solo el  nombre de usuario
            let username = $("#inputSearchBills_input_bill").val();
            inventary.getDataFromServerV2({
                endpoint: 'Bill.php',
                action: `getBillByUserName&clientName=${username}`
                // action: `getProductInfoForMinimalStock`
            }, requestProduct).then((data) => {
                Inventary.hideLoadingModal();
                inventary.renderBills(data);
            });
            
        }
    } catch (error) {
        console.error(error);
    }
});
document.getElementById("confirmarVenta").addEventListener("click", e => {
    // user.confirmBill($('#pedidoID').val());

    // si hay algun de pedido entonces se hizo pedido :V
    // si no entonces se hizo una factura desde cero
    user.createDataStructure();
    setTimeout(() => {
        inventary.resetBillInputs();
    }, 2000);



});
// document.getElementById().addEventListener("click", e => {

// });
$("#notifcationsButton").on('click', () => {
    inventary.fetchLowStockNotification();
})


$("#logout_button").on('click', () => {
    user.logout();
})
$("#logout_button_movil").on('click', () => {
    user.logout();
})
// evento para salir de las session

// ============ EVENTOS DEL NAVBAR DE NAVEGACION ==================0

// opcion del navbar para abrir el modal de los pedidos
// $("#").on("click", function () {
//     user.createOrdersPanel();
//     Inventary.showLoadingModal();
// });


// evento que abre el modal de recarga de inventario
$("#openRechargeInventarySection").on("click", () => {
    user.createDailyInventaryPanel();
})
// ============ FIN  EVENTOS DEL NAVBAR DE NAVEGACION ==================0

let inputSearchOrders = document.getElementById('inputSearchOrders');
let inputSearchProducts = document.getElementById('inputSearchProducts');
let inputSearchProductsInBill = document.getElementById('inputSearchProductsInBill');
inputSearchOrders.oninput = async () => {
    let escrito = inputSearchOrders.value;

    if (escrito.length > 0) {
        // Muestra la pantalla de carga
        Inventary.showLoadingModal();

        let container = document.getElementById("ordersCardContainers");
        try {
            // espera a que se complete la busqueda de pedidos
            const data = await user.getOrderByUsersName(escrito);

            // Renderiza los resultados o limpia el contenedor si no hay coincidencias
            if (data.length != 0) {
                $("#ordersCardContainers").addClass("lg:grid-cols-3");
                // inventary.renderSearchedOrders(data,20);
                inventary.renderOrders(data, 'customized');
                // si no encuentra datos muestra un error
            } else {
                $("#ordersCardContainers").removeClass("lg:grid-cols-3");
                container.innerHTML = `<div role="alert" class="alert  mx-auto mt-10 mb-10  w-full alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-2xl text-white">Lo siento 😥 no encontre ningun pedido apartir del nombre que digitaste</span>
                        </div> `;
            }
        } catch (error) {
            console.error("Error al obtener los pedidos:", error);
        } finally {
            // Oculta la pantalla de carga después de completar la operación
            Inventary.hideLoadingModal();
        }
    } else {
        $("#ordersCardContainers").addClass("lg:grid-cols-3");

        // Si el campo está vacío, renderiza el buffer de órdenes y oculta el modal
        inventary.renderOrders(inventary.OrdersBuffer);
        Inventary.hideLoadingModal();
    }
};

inputSearchProductsInBill.oninput = async () => {
    // buscar los productos y los renderiza en la pantalla confirminputSearchProductsInBill.oninput = async () => {
    let escrito = inputSearchProductsInBill.value;

    if (escrito.length >= 0) {
        // Muestra la pantalla de carga
        Inventary.showLoadingModal();
        console.log("buscando productos especificos")
        let container = document.getElementById("productsInBillSearch");
        try {
            let data = '';
            escrito.length != 0
                ? data = await user.searchProductsInSearchedBuffer(escrito)
                : data = inventary.searchedProductsBuffer;

            console.log(`se consigui hallar el sieguiente producto ${data}`);
            container.innerHTML = '';

            // Renderiza los resultados o limpia el contenedor si no hay coincidencias
            // cuando si hay datos
            // verfica que accion se requiere para asi cambiar un parametro del botn de inyectar

            console.log('la accion  es ' + user.searchBill_action);
            console.log('y el tipo de accion es  ' + user.searchTarget.action);
            if (data.length != 0) {
                let action = '';
                data.forEach(item => {
                    // en caso de  que es lo que se le quiere inyectar la informacioon de los productos , ejemplo  facturas o diario


                    if (user.searchTarget.section == 'bill') {
                        action = 'user.inyectNewProductDataToBill';
                        console.log('factura activada ');
                    } else if (user.searchTarget.section == 'DailyInventary') {
                        console.log('daily activado');
                        action = 'user.inyectNewProductDataToDailyInv';
                    } else {
                        console.error('no encontre ninguna seccion correcta ' + user.searchTarget.section);
                        // throw new Error('no sen encontro ninguna seccion disponible');
                    }
                    // renderizado de los productos
                    container.innerHTML += `

                     <div class="flex-col md:flex-row justify-between flex gap-2 items-start mx-4 py-6">
            <div class="flex bg-white rounded-lg shadow dark:bg-gray-800 flex-col md:flex-row">
                <div class="relative w-full md:w-48 flex justify-center items-center">
                    <img src=${item.imagen}
                        alt="shopping image"
                        class="object-cover w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                </div>
                <div class="flex-auto p-6">
                    <div class="flex flex-wrap">
                        <h1 class="flex-auto text-xl font-semibold dark:text-gray-50">${item.producto}  ${item.variacion}</h1>
                        <div class="text-xl flex flex-inline font-semibold text-gray-500 dark:text-gray-300">$ ${inventary.addPuntuaction(item.precio)}</div>
                      
                        <div class="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                           <span class="text-md" > por <strong class="hover:text-green-600">${item.medidaVenta}</strong></span>
                        </div>
                         <div class="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                           <span class="text-md" > quedan <strong class="hover:text-blue-600">${item.existencias}</strong>  ${item.medidaVenta}</span>
                        </div>
                          <div class="flex-none w-full mt-4 text-sm font-medium text-gray-500 dark:text-gray-300">
                            <div id="badgeBill${item.productoID}" class="badge hover:text-white duration-300 trasform hover:scale-105  ">
                                <div id="logo${item.productoID}}">
                                </div>
                                <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g fill="currentColor">
                                        <rect x="1.972" y="11" width="20.056" height="2"
                                            transform="translate(-4.971 12) rotate(-45)" fill="currentColor"
                                            stroke-width="0"></rect>
                                        <path
                                            d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
                                            stroke-width="0" fill="currentColor"></path>
                                    </g>
                                </svg>
                            ${item.estado} 
                            </div>
                        </div>
                    </div>
                    <div class="flex items-baseline mt-4 mb-6 text-gray-700 dark:text-gray-300">
                    </div>
                    <div class="flex mb-4 text-sm font-medium">
                        <button type="button"      onclick="${action}([${item.productoID},'${item.producto}',' ${item.variacion}','${item.medidaVenta}', ${item.precio},${item.existencias}])"
                            class="py-2 px-4 color-sena  hover:bg-green-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">Añadir</button>
                    </div>
                </div>
            </div>
        </div>
                    
                    `;

                    switch (item.estado) {
                        case 'Disponible':

                            $(`#badgeBill${item.productoID}`).addClass('badge-success');
                            // llena el contenedor con el logo
                            $(`#logo${item.productoID}`).html(`
                        <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></polyline></g></svg>                    `
                            );

                            // document.getElementById(`badgeContainer${producto.productoID}`).classList.add('badge-warning');
                            // document.getElementById(`logoContainer${producto.productoID}`).innerHTML =`  <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></polyline></g></svg>    `;

                            break;
                        case 'Agotado':
                            //    pone el badge error
                            $(`#badgeBill${item.productoID}`).addClass('badge-error');
                            // llena el contenedor con el logo
                            $(`#logo${item.productoID}`).html(`
                        <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg>
                    `
                            );

                            break;
                        case 'Pocas Unidades':
                            $(`#badgeBill${item.productoID}`).addClass('badge-warning');
                            // llena el contenedor con el logo
                            $(`#logo${item.productoID}`).html(`
 <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><g fill="currentColor"><path d="M7.638,3.495L2.213,12.891c-.605,1.048,.151,2.359,1.362,2.359H14.425c1.211,0,1.967-1.31,1.362-2.359L10.362,3.495c-.605-1.048-2.119-1.048-2.724,0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><line x1="9" y1="6.5" x2="9" y2="10" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></line><path d="M9,13.569c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" fill="currentColor" data-stroke="none" stroke="none"></path></g></svg>
                        `);

                            // document.getElementById().classList.add('badge-warning');
                            // document.getElementById().innerHTML =`  <svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></circle><polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2"></polyline></g></svg>    `;

                            break;
                        default:
                            break;
                    }
                });
            } else {
                $("#productsInBillSearch").removeClass("lg:grid-cols-3");
                container.innerHTML = `<div role="alert" class="alert  mx-auto mt-10 mb-10  w-full alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-2xl text-white">Lo siento 😥 no encontre ningun producto  apartir del nombre que digitaste</span>
                        </div> `;
            }
        } catch (error) {
            console.error(error);
            $("#productsInBillSearch").removeClass("lg:grid-cols-3");
            container.innerHTML = `<div role="alert" class="alert  mx-auto mt-10 mb-10  w-full alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-2xl text-white">Lo siento 😥 no encontre ningun producto  apartir del nombre que digitaste</span>
                        </div> `;
        } finally {
            // Oculta la pantalla de carga después de completar la operación
            Inventary.hideLoadingModal();
        }
    } else {
        $("#ordersCardContainers").addClass("lg:grid-cols-3");

        // Si el campo está vacío, renderiza el buffer de órdenes y oculta el modal
        inventary.renderOrders(inventary.OrdersBuffer);
        Inventary.hideLoadingModal();
    }
};




// estas funciones tambien sirven para la tabla de ingresar producto aol inventari
/**
 * activa los eventos de la factura ya renderizada
 */

function activateBillEvents() {
    console.log("activando ls eventos de la factura");
    // este es el de la cantidad
    document.querySelectorAll('.inputQuantityBill').forEach(input => {
        try {
            input.addEventListener('input', async (event) => {
                //aca saco el objeto padre o que contiene el input
                let parentContainer = event.target.parentElement;
                // aqui se obtiene le indexador de los contnedores de la pagina 
                let index = parentContainer.getAttribute('data-index');
                console.log("cambiando la cantidad y el index es " + index);
                // se resetean los colores de ls contenedores 
                $(`#container${index}`).removeClass("bg-red-400 bg-red-300 bg-red-200 bg-red-100 bg-yellow-400 ");

                // precio del producto
                let precioUnitario = parseFloat(document.getElementById(`precioUnitario${index}`).value) || 0;
                // cantidad del producto
                let cantidad = parseInt($(`#cantidad${index}`).val()) || 0;
                let productId = $(`#productId${index}`).val() || 0;
                // validando que  el prducto no supere las existencia actuales

                let productFromArr = user.bill.products.filter(item => item.productoID == productId);
                let existencias = productFromArr[0].existencias;

                //  validacion 
                // if (cantidad > existencias) {
                // } else if (cantidad == existencias) {
                //     $(``)
                // } else {

                // }
                console.log(`${cantidad} vs ${precioUnitario}`);
                console.log(`${productId}`);

                cantidad > 0
                    ? $(`#productoPrecio${index}`).val(precioUnitario * cantidad)
                    : $(`#productoPrecio${index}`).val(0);

                switch (true) {
                    // si la cantidad supera el stock actual
                    case (cantidad > existencias):
                        // n deja que se supere la cantidad pr encima del stock actual  en la factura 
                        $(`#cantidad${index}`).prop('disabled', true);
                        $(`#cantidad${index}`).val(existencias);
                        setTimeout(() => {
                            $(`#cantidad${index}`).prop('disabled', false);
                            infoModal.close();
                        }, 2100);

                        Inventary.showInfoModal(`No puedes agregar mas de ${existencias} ${productFromArr[0].medidaVenta} de ${productFromArr[0].producto}  ${productFromArr[0].variacion} `)
                        break;
                    case (cantidad == existencias):
                        $(`#container${index}`).removeClass("bg-red-300 ");
                        $(`#container${index}`).addClass("bg-red-400 ");
                        break;
                    case (cantidad == existencias - 1):
                        $(`#container${index}`).removeClass("bg-red-200 ");
                        $(`#container${index}`).addClass("bg-red-300 ");
                        break;
                    case (cantidad == existencias - 2):
                        $(`#container${index}`).removeClass("bg-yellow-100 ");
                        $(`#container${index}`).addClass("bg-red-200 ");
                        break;
                    case (cantidad == existencias - 3):
                        // elimandoo la clase anterior
                        //  $(`#container${index}`).removeClass("bg-yellow-300 ");
                        $(`#container${index}`).addClass("bg-yellow-100 ");
                    // case (cantidad < existencias - 3 && cantidad > existencias - 6):
                    //     $(`#container${index}`).addClass("bg-yellow-300 ");
                    //     break;
                    default:
                        console.log("en el rango de cantidad y stock");
                }

                // calcula el precio total de la factura
                user.calculateTotalBill();


            });
        } catch (error) {
            Inventary.showInfoModal(error);
        }

    });


    //         // Using closest to find a specific ancestor container, e.g., a div with a specific class
    //         let specificContainer = event.target.closest('.specific-container-class');
    //         ;
    //     });
    // });

    // este es del precio
    document.querySelectorAll('inputPriceBill').forEach(input => {
        input.addEventListener('change', function (event) {
            //aca saco el objeto padre o que contiene el input
            let parentContainer = event.target.parentElement;


            // Using closest to find a specific ancestor container, e.g., a div with a specific class
            let specificContainer = event.target.closest('.specific-container-class');
            ;
        });
    });


    // este es el del total
    document.querySelectorAll('inputTotalBill').forEach(input => {
        input.addEventListener('change', function (event) {
            //aca saco el objeto padre o que contiene el input
            let parentContainer = event.target.parentElement;


            // Using closest to find a specific ancestor container, e.g., a div with a specific class
            let specificContainer = event.target.closest('.specific-container-class');
            ;
        });
    });
}



function activateDailyInvEvents() {
    console.log("activando ls eventos del formulario de inventario diario");
    // este es el de la cantidad
    document.querySelectorAll('.inputQuantityInv').forEach(input => {
        try {
            input.addEventListener('input', async (event) => {
                //aca saco el objeto padre o que contiene el input
                let parentContainer = event.target.parentElement;
                // aqui se obtiene le indexador de los contnedores de la pagina 
                let index = parentContainer.getAttribute('data-index');
                console.log("cambiando la cantidad y el index es " + index);

                let stock = $(`#inv_existencias${index}`).val();
                let cantidad = $(`#inv_newQuantity${index}`).val();

                // verifica que la cantidad no sea negativa
                if (cantidad >= 0) {
                    let total = parseInt(cantidad) + parseInt(stock);
                    //ternaria para que el valor no se ponga en negativo oen NaN
                    if (cantidad == '' || cantidad < 0) {
                        $(`#inv_totalQuantity${index}`).val(stock);
                        $(`#inv_totalQuantityText${index}`).text(stock);
                    } else {
                        $(`#inv_totalQuantity${index}`).val(total);
                        $(`#inv_totalQuantityText${index}`).text(total);
                    }

                } else {
                    // web.showErrorModalFor('la cantidad no puede ser negativa')
                }



                // console.log( $(`#inv_totalQuantity${index}`).value(total));



            });
        } catch (error) {
            Inventary.showInfoModal(error);
        }

    });
}
// evento que agrega el logo del sena
document.querySelectorAll('senaLogo').forEach(img => {
    img.src = `${inventary.baseUrl}/assets/logos/logoSena 2.png`;
});


// EVENTOS FACTURAS 
// evento que crea la factura desde cero
$('#billCreateBtn').on('click', () => {
    inventary.resetBillInputs();
    inventary.renderBill([''], false);
});
$('#billBtnFromNavbar').on('click', () => {
    inventary.resetBillInputs();
    inventary.renderBill([''], false);
});


// evento que se actuiva al presionar de agregar producto a la factura
$('#addProductToBillButton').on('click', () => {

    user.searchProductToInsert();
});
// evento que se actuiva al presionar de agregar producto a la factura
$('#addProductToDailyInv').on('click', () => {

    user.searchProductToInsertToInventary();
});
// este es el evento de confirmar el inventario diario 
$('#confirmnDailyInv').on('click', () => {

    user.recolectDataFromDailyInv()
        .then((data) => {
            // enviamos al servidor
            user.sendDataToServerV2({
                method: "PUT",
                controller: "Product.php",
                action: 'rechargeInventary'
                // action: "devolver"
            }, data)
                .then((response) => {
                    //    cerramos los modales de carga y el de la factura
                    Inventary.hideLoadingInmutableModal();
                    Inventary.hideLoadingModal();
                    // cierro el modal del invcnetario diario
                    diaryInventary.close();

                    // renderizado de los productos
                    inventary.renderTable('product', inventary.renderProductsTable);
                    // mensaje de que si se realizo

                    Inventary.showModalSucces(response.mensagge)
                    console.log(response)

                    // luego cargamos un modal que pide que se va a hacer con la factura
                }).catch((response) => {

                    // cierro el modal del invcnetario diario
                    diaryInventary.close();

                    Inventary.showErrorModal(response.error)

                    console.log(response);
                })
            // console.log(data);
        }).catch((error) => {
            console.error(error)
        });
});

// evento que escucha cuado se haga click en "alimentar inventario"
$("#feedDailyInv").on('click', (e) => {
    user.createDailyInventaryPanel();
})

// evento que escucha cuando el formulario de minimo stock se envio
$('#lowStockForm').on('submit', (e) => {
    e.preventDefault();

    let data = {
        id: $('#lowStock_productID').val(),
        minimalStock: $('#lowStockForProduct').val()
    }

    user.sendDataFromModalForm(data, 'Product.php', 'updateMinStockForAlert', 'PUT')
        .then((data) => {
            console.info("no cogi el error");
            lowProductStockModalRequest.close();
            Inventary.hideLoadingInmutableModal();
            Inventary.showModalSucces(data.mensagge);

            // renderizado de los productos
            inventary.renderTable('product', inventary.renderProductsTable);
        })
        .catch((response) => {
            console.info("si cogi el error");
            lowProductStockModalRequest.close();
            Inventary.hideLoadingInmutableModal();

            // Inventary.hideLoadingModal();
            Inventary.showErrorModal(response.responseJSON.error);
        });

});

// evento que deja ver la imagen cuando el adminsitrador carga una imagen para el banner publicvitario
const inputImagen = document.getElementById('banner_imageUploadInput');
const previewImagen = document.getElementById('banner_imagePreview');


inputImagen.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        previewImagen.src = e.target.result;
    };

    reader.readAsDataURL(archivo);
});

// evneto para subir la imagen al servidor
$('#banner_submitButton').on('click', (e) => {
    e.preventDefault();
    // formulario apra enviar la iamgen al servidor
    let banner_imageForm = new FormData();
    let image = $('#banner_imageUploadInput')[0].files[0];

    if (!image) {
        Inventary.showInfoModal("selecciona alguna imagen primero");
    } else {
        // aca se guarda esa foto
        banner_imageForm.append("BannerImage", image);
        // aca subimos la foto
        inventary.banner.uploadPhoto(banner_imageForm)
            .then((response) => {
                MarketingImagesSection.close();
                banner_uploadImageSection.close();
                setTimeout(() => {
                    inventary.fetchBannerImages();

                }, 5000);
                Inventary.showModalSucces(response);
            }).catch((response) => {

                MarketingImagesSection.close();
                banner_uploadImageSection.close();
                setTimeout(() => {
                    MarketingImagesSection.showModal();
                    banner_uploadImageSection.showModal();

                }, 5000);
                Inventary.showErrorModal(response);
                console.log(response);
            })
    }
})


function activateSearchEvents() {
    let checkboxes = document.querySelectorAll('.productVisibilityCheckbox ');
    console.log(`los checkboxes son ${checkboxes.length}`);
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            let prodId = checkbox.getAttribute('data-prodid');
            if (this.checked) {
                // console.log('El checkbox está seleccionado');
                // console.log(`Checkbox ${checkbox.id} ha cambiado a ${checkbox.checked}  al producto  ${prodId} todo ok  `);
            } else {
                user.sendDataToServerV2({
                    method: "POST",
                    controller: "Product.php",
                    action: "changeVisibility"
                    // action: "devolver"
                }, {"visibility": checkbox.checked,"id":prodId})
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


// este es el evento de busqueda del buscador de productos valga la pta redundancia
let inputMobile = document.getElementById('productSearchBarForMobile');
// esta es la busqueda para moviles 
inputMobile.oninput = async () => {
    let container = document.getElementById("mobile_searchedProducts");
    let errorContainer = document.getElementById('mobile_searchedProducts');
    // buscar los productos y los renderiza en la pantalla confirminputSearchProductsInBill.oninput = async () => {
    let escrito = inputMobile.value;

    if (escrito.length >= 0) {
        // Muestra la pantalla de carga
        Inventary.showLoadingModal();
        console.log("buscando productos especificos")
        // let container = document.getElementById("productsInBillSearch");
        try {
            let data = '';
            escrito.length != 0
                ? data = await user.searchProductsInSearchedBufferForEdit(escrito)
                : data = inventary.searchedProductsBuffer;

            console.log(`se consigui hallar el sieguiente producto ${data}`);
            container.innerHTML = '';

            // Renderiza los resultados o limpia el contenedor si no hay coincidencias
            // cuando si hay datos
            // verfica que accion se requiere para asi cambiar un parametro del botn de inyectar

            console.log('la accion  es ' + user.searchBill_action);
            console.log('y el tipo de accion es  ' + user.searchTarget.action);
            if (data.length != 0) {
                let action = '';
                data.forEach(producto => {
                    // en caso de  que es lo que se le quiere inyectar la informacioon de los productos , ejemplo  facturas o diario

                    let singularMeasurement = producto.medidaVenta;


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
                            <span class="text-md font-bold text-red-500">$ ${inventary.addPuntuaction(producto.precio)}  </span>
                            
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
                    <!-- el de editar  -->
                    <div  
                        class="flex-2 flex-inline  mx-end  justify-between ">
                       
                        <div class="flex-1">
                         <!-- el de las alertas -->
                         
                         <button class="hover:scale-125   rounded-full  transform ease-in-out duration-600 hover:bg-gray-200 "  onclick="inventary.createLowStockProductPanel(${producto.id});">
                         <svg class="m-2"  width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffdd00"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.9997 12.5815V9.58148M11.9997 15.5815H12.0097M18.9997 20.5815L16.4094 18.0182M4.9997 20.5815L7.59001 18.0182M6.74234 3.99735C6.36727 3.62228 5.85856 3.41156 5.32812 3.41156C4.79769 3.41156 4.28898 3.62228 3.91391 3.99735C3.53884 4.37242 3.32813 4.88113 3.32812 5.41156C3.32812 5.942 3.53884 6.4507 3.91391 6.82578M20.0858 6.82413C20.4609 6.44905 20.6716 5.94035 20.6716 5.40991C20.6716 4.87948 20.4609 4.37077 20.0858 3.9957C19.7107 3.62063 19.202 3.40991 18.6716 3.40991C18.1411 3.40991 17.6324 3.62063 17.2574 3.9957M18.9997 12.5815C18.9997 16.4475 15.8657 19.5815 11.9997 19.5815C8.1337 19.5815 4.9997 16.4475 4.9997 12.5815C4.9997 8.71549 8.1337 5.58149 11.9997 5.58149C15.8657 5.58149 18.9997 8.71549 18.9997 12.5815Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                         
                         </button>
                         
                         <!-- el de la edicion -->
                        <button class="hover:scale-125   rounded-full  transform ease-in-out duration-600 hover:bg-gray-200"  onclick="user.editProduct(${producto.id})"  >
                                <svg class="m-2" xmlns="http://www.w3.org/2000/svg"
                                    width="20" height="20" viewBox="0 0 32 32">
                                    <path fill="green"
                                        d="M27.87 7.863L23.024 4.82l-7.89 12.566l4.843 3.04L27.87 7.863zM14.395 21.25l-.107 2.855l2.527-1.337l2.35-1.24l-4.673-2.936l-.097 2.658zM29.163 3.24L26.63 1.647a1.364 1.364 0 0 0-1.88.43l-1 1.588l4.843 3.042l1-1.586c.4-.64.21-1.483-.43-1.883zm-3.965 23.82c0 .275-.225.5-.5.5h-19a.5.5 0 0 1-.5-.5v-19a.5.5 0 0 1 .5-.5h13.244l1.884-3H5.698c-1.93 0-3.5 1.57-3.5 3.5v19c0 1.93 1.57 3.5 3.5 3.5h19c1.93 0 3.5-1.57 3.5-3.5V11.097l-3 4.776v11.19z" />
                                </svg>
                            </button>
                        
                    
                        <!-- el de eliminar -->
                    <!-- <button class="hover:scale-125   rounded-full  transform ease-in-out duration-600 hover:bg-gray-200"  onclick="inventary.showDeletionModal({preposition:'el producto',name :'${producto.nombre + ' ' + producto.subCategoria}',id:'${producto.id}'},user.deleteProduct)"><svg class="m-2"
                                    xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24">
                                    <g fill="none" fill-rule="evenodd">
                                        <path
                                            d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                                        <path fill="red"
                                            d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2h-1v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2h4.558ZM17 7H7v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7Zm-2.72-3H9.72l-.333 1h5.226l-.334-1Z" />
                                    </g>
                                </svg></button> -->
                             
                        </div>
                        <div class="flex-2">
                                             <!-- el de checkbok -->
<label class="switch">
  <input class="productVisibilityCheckbox" data-prodid="${producto.id}"  id="productCheckBox${producto.id}"  type="checkbox">
  <div class="slider"></div>
  <div class="slider-card">
    <div class="slider-card-face slider-card-front"></div>
    <div class="slider-card-face slider-card-back"></div>
  </div>
</label>
<style>

/* Hide default HTML checkbox */
.switch #productCheckBox${producto.id} {
  opacity: 0;
  width: 0;
  height: 0;
}

#productCheckBox${producto.id}:checked ~ .slider-card .slider-card-back {
  transform: rotateY(0);
}

#productCheckBox${producto.id}:checked ~ .slider-card .slider-card-front {
  transform: rotateY(-180deg);
}

#productCheckBox${producto.id}:checked ~ .slider-card {
  transform: translateX(1.5em);
}

#productCheckBox${producto.id}:checked ~ .slider {
  background-color: #9ed99c;
}
</style>
                        </div>
                         
                    </div>
                      
                    </div>
                </div>
                    
                    `;
                    // verificacion de la visibilidad del productos
                    // document.getElementById(`productCheckBox${producto.id}`).checked = true;
                    console.log("checkeando boton->>> true");
                    if (producto.esVisible == '1') {
                        // btnCheckProd.checked = true;
                        document.getElementById(`productCheckBox${producto.id}`).setAttribute('checked', true);
                    } else {
                        // document.getElementById(`productCheckBox${producto.id}`).setAttribute('checked', true);
                        // btnCheckProd.checked = false;
                    }
                    // btnCheckProd.checked = true;
                    // verificaciond el estado del producto
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
                // activa los eventos para localizar los checkboxes
                activateSearchEvents();

                // eventos de los checkboxes 
                // selecciona todos los elementos con la clase "mi-clase"
                // const checkboxes = document.querySelectorAll('.productVisibilityCheckbox');

                // // itera sobre los checkboxes y agrega un evento change a cada uno
                // checkboxes.forEach((checkbox) => {
                //     checkbox.addEventListener('change', (event) => {
                //         // obtiene el valor del atributo data-prodid
                //         const prodId = checkbox.getAttribute('data-prodid');

                //         // imprime el valor del atributo
                //         console.log(`Checkbox con prodId ${prodId} ha cambiado`);

                //         // puedes agregar aquí la lógica que deseas ejecutar cuando se cambie el estado del checkbox
                //     });
                // });
            } else {
                $("#productsInBillSearch").removeClass("lg:grid-cols-3");
                container.innerHTML = `<div role="alert" class="alert  mx-auto mt-10 mb-10  w-full alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-2xl text-white">Lo siento 😥 no encontre ningun producto  apartir del nombre que digitaste</span>
                        </div> `;
            }
        } catch (error) {
            console.error(error);
            $("#productsInBillSearch").removeClass("lg:grid-cols-3");
            container.innerHTML = `<div role="alert" class="alert  mx-auto mt-10 mb-10  w-full alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-2xl text-white">Lo siento 😥 no encontre ningun producto  apartir del nombre que digitaste</span>
                        </div> `;
        } finally {
            // Oculta la pantalla de carga después de completar la operación
            Inventary.hideLoadingModal();
        }
    } else {
        $("#ordersCardContainers").addClass("lg:grid-cols-3");

        // Si el campo está vacío, renderiza el buffer de órdenes y oculta el modal
        inventary.renderOrders(inventary.OrdersBuffer);
        Inventary.hideLoadingModal();
    }
};
