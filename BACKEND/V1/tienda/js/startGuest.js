



// web.fetchProductsByCategory(${i})
const web = new WebGuest();
const user = new Guest();

web.fetchCategories();


web.fetchData("getInfoProductsForShop", web.renderAllProducts);

// recrea todos los productos

// renderiza las imagenes del banner
web.fetchBannerImages();

web.getMeasurementData().then(()=>{

       web.searchSingularMeasurement('kilos');
       web.fetchData('getInfoProductsForShop', web.renderAllProducts);
   }).catch(()=>{

        web.fetchData('getInfoProductsForShop', web.renderAllProducts);
   });
// setTimeout(() => {
//     // WebGuest.showLoadingModal('verificando');
    
// }, 4000);
// emailForRecover.showModal();
//  web.showErrorModalForInstance('hp erro tan maarika');
//   user.requestLogin();
// web.showInfoModal("hola");
// $('#loginModal').removeClass("hidden");
// registerModal.showModal();
// WebGuest.showSuccessModal('todo salio bien');
// $(document).ready(function(){
//   $(".owl-carousel").owlCarousel();
// });

// $('.owl-carousel').owlCarousel({
//     loop:true,
//     margin:10,
//     responsiveClass:true,
//     responsive:{
//         0:{
//             items:1,
//             nav:true
//         },
//         600:{
//             items:3,
//             nav:false
//         },
//         1000:{
//             items:5,
//             nav:true,
//             loop:false
//         }
//     }
// })
// WebPage.showLoadingModal("probando");
web.getDataFromServer({
    controller:'Product.php',
    action:'getInfoProductsForShop',
    method:'GET'
}).then((data)=>{
    console.log("======= INFORMACION OBTENIDA ===============");
    web.productsForSearch = data;

    // console.log(`nuevos datos=>${JSON.stringify(data)}`);
});
user.getWhatsapp();
// ProductsModalForMobile.showModal();