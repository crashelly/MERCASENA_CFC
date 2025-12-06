/**
 * WebPage clase para la pagina web
 */

class WebPage {
    
    constructor(parameters) {
        this.controllerProductosUrl= "http://localhost/mercasena/app/controllers/Product.php";
        this.firstCategory = [];
        this.Data = [];
        this.CategoriesContainer = document.getElementById("carousele-categories");
        this.carousel = document.getElementById("carousel");

        console.log("clase creada exitosamente");
    }

    // parte de las funciones basicas de la pagina
    showDivMensagge(HTMLElementID){
        let modalMessage = document.getElementById(HTMLElementID);
        modalMessage.classList.remove("hidden");
        modalMessage.innerText = HTMLelementID;
    }




// parte de los modales 
/**
 * @param {message} mensaje del error
 */
    showInfoModal(mensaje){
        let modalMessage = document.getElementById("text-modal");
        modalMessage.innerText = mensaje;
        infoModal.showModal();

    }


 /**
     * Consulta los productos y luego los renderiza en el grid de productos
     *@param categoryId id de la categoria
     *@param isFirstTime si es la primera vez que se renderiza la informacion de los productos
     *@generators generadores
     */

    fetchProductsByCategory(categoryId,isFirstTime) {
      let productsContainer = document.getElementById("products-container");
      productsContainer.innerHTML = "";
      console.log("ejecutando busqueda de productos");
      $.ajax({
        url: `${this.controllerProductosUrl}?action=getProductsByCategory&categoryId=${categoryId}`,
        // url: `${this.controllerProductosUrl}?action=getProductsByCategory&categoryId=9`,
        type: "GET",
        contentType:"application/json",
        success: function (productos) {
          // renderizando los productos
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
                            <span class="text-lg font-bold text-red-500">$ ${producto.precio} </span>
                            
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
            console.log(productos);
        },
        error: function (response) {
            // si no encuentra prodyucots y es la primera vez renderiza todos los productos
            if (response.status == 404 && isFirstTime == true) {
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
                            <span class="text-lg font-bold text-red-500">$ ${producto.precio} </span>
                            
                            <!-- Favorite Icon -->
                            <svg class="h-6 w-6 fill-current text-gray-400 hover:text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                            </svg>
                        </div>
                        <!-- Red horizontal line -->
                        <div class="border-t border-red-500 my-2"></div>
                        
                        <!-- Product Name -->
                        <h3 class="text-lg font-medium mt-1 text-gray-800">${producto.nombre} ${producto.subCategoria} x${producto.cantidad}</h3>
                        
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
                console.log(producto);
            });
            }else{
                showModal("No se encontraron productos","error");
            }
        }
    });
      }

    

    /**
     * Consulta las categorias de productos y las muestra en el carousel correspondiente
     * 
     */
    fetchCategories(){
            console.log(`consultando categorias ${this.controllerProductosUrl}`);
            $.ajax({
                url: `${this.controllerProductosUrl}?action=getCategories`,
                // url : "http://localhost/mercasena/app/controllers/Product.php?",
                type: "GET",
                contentType:"application/json",
                success: (categorias) =>{
                    let categoriesContainer = document.getElementById("carousele-categories");
                    let i = 0;
                    console.log(categorias);
                    
                    categorias.forEach(categoria => {
                        i++;
                        // ternaria para guardar el primero id de la categoria
                        i == 1 ? this.firstCategory = categoria.id : null ;

                        categoriesContainer.innerHTML += `<div class=" carousel-item mr-4 ml-4">
                                                    <button onclick="web.fetchProductsByCategory(${categoria.id},false)" class="bg-white text-green-600 font-bold px-3 py-1 text-sm rounded-full shadow-md border border-green-400 hover:bg-green-100 badge badge-success"> ${categoria.nombre}</button>
                                                </div> `;
                    });
                    console.log(categorias);
                    console.log('el primer id de la categorias es ', this.firstCategory);
                    this.fetchProductsByCategory(this.firstCategory,true);
                },
                error: function (response) {
                    
                }
            });
           
    }

    fetchAllProducts(){
        console.log(`consultando todos los productos ${this.controllerProductosUrl}`);
        $.ajax({
            url: `${this.controllerProductosUrl}?action=getAllProducts`,
            type: "GET",
            contentType:"application/json",
            success: (productos) =>{
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
                                <span class="text-lg font-bold text-red-500">$ </span>
                                
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

}