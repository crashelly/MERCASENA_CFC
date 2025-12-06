



// web.fetchProductsByCategory(${i})
const inventary = new Inventary();
const user = new User();

// inventary.fetchCategories();
// web.fetchProductsByCategory(9);

// inventary.renderProductsTable();
// inventary.renderCategoryTable();
// inventary.renderMeasurementTable();

// modalCreacion.showModal();


// 
// inventary.showLoadingModal();

// setTimeout(() => {
//     inventary.hideLoadingModal();
// }, 3000);
// selectTypeOfCreationModal("producto");
// selectTypeOfCreationModal("medidaVenta");
// inventary.showModalSucces("hola");

//  renderizado de categorias de prueba 
// const carousel = document.getElementById("carousele-categories");
// const categorias = [
//     "Panaderia", "Carniceria", "Pescaderia", "Frutas", "Verduras", "Lácteos", "Cereales", "Bebidas", "Snacks", "Confituras", "Aceites", "Vinos", "Legumbres", "Hortalizas", "Tubérculos", "Raices", "Café", "Té", "Chocolate", "Galletas", "Dulces", "Helados", "Mermeladas", "Jaleas", "Salsas", "Conservas", "Bebidas energizantes", "Bebidas isotónicas", "Suplementos"
// ];

// for (let i = 0; i < 30; i++) {
//      carousel.innerHTML +=  `<div class=" border-solid carousel-item mr-4 ml-4">
//                                             <button onclick="web.fetchProductsByCategory(${i})" class="bg-white text-green-600 font-bold px-3 py-1 text-sm rounded-full shadow-md border border-green-400 hover:bg-green-100 badge badge-success"> ${categorias[i]}</button>
//                                         </div> `;

// }

// Inventary.showModalSucces("propbando aver que tal queda");

// inventary.forms.category.modal.showModal();
// para mostrar el modal de las categorias
// inventary.forms.category.modal();
// inventary.forms.category.showModal();

// inventary.fetchDataToSelect("categoriasSelect","Product.php","getCategories");
// inventary.fetchDataToSelect("productoSelect","Product.php","getAllProducts");
// inventary.fetchDataToSelect("medSelect","Product.php","getAllMeasurements");
inventary.updateOrdersCard();
inventary.updateSalesCard();
inventary.updateTotalSoldCard();
inventary.updateProgressBar();

inventary.updateLowStockNotifications()
// inventary.forms.product.showModal();
// Inventary.showErrorMensagge("la polla");
// Inventary.showInfoMensagge("la polla");
// Inventary.showWarningMensagge("la polla");
// Inventary.showLoadingModal();
// LoadingModal.showModal();
// setTimeout(() => {
//     LoadingModal.close();
// }, 3000);
// billModal.showModal();
// inventary.getDataFromServer({
//     controller: 'Order.php',
//     action: 'getOrderInfo&orderID=ped_2025-05-07_681b6ae58d5700.18945389'
// }, console.log);

// Inventary.showLoadingModal();
// LoadingModal.showModal();

// Inventary.showLoadingInmutableModal("cargando ...");
// ================= MENSAJE DE ENTRADA =============

// setTimeout(() => {
//     Inventary.hideLoadingInmutableModal();
//     dayMensagge.showModal();
// }, 3000);
//    diaryInventary.showModal();
// loadingModal.showModal();
//  // ================= MENSAJE DE ENTRADA =============
// Inventary.showLoadingModal("hola");
// testUpload.showModal();

// inventary.setLowStockProductValues({
//     name: 'papa Parda con lentejas',
//     id: 13,
//     measurement: 'Litros',
//     minimalStock  : 2

// });

// Notification.requestPermission();






// banner_uploadImageSection.showModal();
// billsModal.showModal();
// billsModal.showModal();
// perfilAdmnistrador.showModal();
// let requestProduct = {
//     id : null
// }
// inventary.getDataFromServerV2({
//     endpoint: 'Bill.php',
//     action: `getBillByUserName&clientName=Jesus`
//     // action: `getProductInfoForMinimalStock`
// }, requestProduct).then((data) => {
// inventary.renderBills(data);
// });

// inventary.getDataFromServerV2({
//     endpoint: 'mercasena.php',
//     action: `getPuntoDeVentaInfo`
//     // action: `getProductInfoForMinimalStock`
// }, null).then((data) => {
//     console.log(data);
// });
// inventary.showPuntoVentaEditionPanel();

// goingToVentsModal.showModal();
// este es el modal de cargando y que luego muestra lo del administrador
setTimeout(() => {
inventary.renderTable('product', inventary.renderProductsTable);
    Inventary.showLoadingInmutableModal("cargando ...");

    setTimeout(() => {
        Inventary.hideLoadingInmutableModal();
        dayMensagge.showModal();
    }, 3000);
    //    diaryInventary.showModal();
    loadingModal.showModal();
}, 5000);

// =============================== FIN ============
// busca la informacion y setea el input a vacio
$("#productSearchBarForMobile").val('');
inventary.getDataFromServerV2({
    endpoint: 'Product.php',
    action: `getInfoProductsForAdmin`
    // action: `getProductInfoForMinimalStock`
}, null).then((data) => {
    // inventary.renderBills(data);
    inventary.searchedProductsBuffer = data;
    // ProductsModalForMobile.showModal();
});
// inventary.searchProductosInfoForBuffer();