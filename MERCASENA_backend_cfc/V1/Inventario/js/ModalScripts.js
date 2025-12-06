
// contenido de los modales
/**
 * un arreglo con la informacion de cada uno de los modales y como debe llevar su tipo en informacion 
 */

var ObjectData = {};
var arr = [
    // objeto de medida venta
    // cada uno de sus subobjetos son los inputs 
    {
        measurementName: {
            labelName: "ingrresa aqui la medida",
            type: "text",
            placeholder: "medida",
            name: "medida",
            id: "medidaID",

        },
        measurementFactor: {
            labelName: "ingresa aqui el factor",
            type: "number",
            placeholder: "factor de la medida",
            name: "factor",
            id: "factorID",

        },
        dbInputId:"dbMeasurementID",
        controller: "Product.php",
        action: "saveMeasurement",
        category: "measurement",
        method: "POST"

    },
    // objeto de producto base 
    {
        labelName: "ingresa el producto base",
        type: "text",
        placeholder: "productos",
        name: "producto",
        id: "productoID",
        dbInputId:"dbBaseProductID",
        controller: "Product.php",
        action: "saveProduct",
        category: "baseProduct",
        method: "POST"
    },
    // objeto de categoria
    {
        labelName: "agregar para categorias",
        type: "text",
        placeholder: "categorias",
        name: "categorias",
        id: "categoriaID",
        dbInputId:"dbCategoryID",
        controller: "Product.php",
        action: "saveCategory",
        category: "category",
        method: "POST"
    }
]

// fin ================================ 
/**
 * 
 * @param {string} mensaje 
 * @param {string} type  puede ser info , error o succes para los mensaje de exito
 */



// function showModal(mensaje, type) {
//     let modalMessage = document.getElementById("text-modal");
//     let typeText = document.getElementById("type-text");
//     modalMessage.innerText = mensaje;

//     switch (type) {
//         case "info":
//             typeText.innerText = "Informacion";
//             infoModal.showModal();
//             break;
//         case "error":
//             typeText.innerText = "Error";
//             infoModal.showModal();
//             break;
//         case "success":
//             typeText.innerText = "Exito";
//             infoModal.showModal();


//             break;

//         default:
//             break;
//     }


// }
/**
 * crea la plantilla del las input del codigo pero custom
 * @param {} index  indexador de informacion  0= medidaVenta , 1=productos , 2=categorias
 */
function createCustomCode(index) {
    // arr[index].method = "POST";
    // codigo base adaptativo
    let baseCode = ` <label class="floating_label">
                    <span class="text-2xl text-green-400  ">${arr[index].labelName}</span>
                    <br>
                    <br>
                   <input id="${arr[index].dbInputId}" type="hidden" >
                   
                    <input id="${arr[index].id}"
                    class="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
                    type="${arr[index].type}" placeholder="${arr[index].placeholder}" name="${arr[index].name}">


                
                   <button type='submit'  class="bg-white text-green-600 font-bold px-3 py-1 text-sm rounded-full shadow-md border border-green-400 hover:bg-green-100 badge badge-success"> Guardar</button> 


               </label>`;

    ObjectData = arr[index];

    // devuelve el codigo
    return baseCode;

}

function createHTMLforMeasurements(type) {
    let index = 0;
    let code = ` <label class="floating_label">
                    <input id="${arr[index].dbInputId}" type="hidden" >
                    <span class="text-2xl text-green-400  ">${arr[index].measurementName.labelName}</span>
                    <br>
                    <br>
                    <input id="${arr[index].measurementName.id}"
                    class="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
                    type="${arr[index].measurementName.type}" placeholder="${arr[index].measurementName.placeholder}" name="${arr[index].measurementName.name}">

                    
                    
                    </label>

                    <label class="floating_label">
                    <span class="text-2xl text-green-400  ">${arr[index].measurementFactor.labelName}</span>
                    <br>
                    <br>
                    <input id="${arr[index].measurementFactor.id}"
                    class="p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
                    type="${arr[index].measurementFactor.type}" placeholder="${arr[index].measurementFactor.placeholder}" name="${arr[index].measurementFactor.name}">

                    
                    
                    </label>
                    
                    <button type='submit'  class="bg-white text-green-600 font-bold px-3 py-1 text-sm rounded-full shadow-md border border-green-400 hover:bg-green-100 badge badge-success"> Guardar</button> 

                
                `;
    ObjectData = arr[index];
    return code;
}
/**
 * selecciona el contenido y adapta ls ids y names de ls parametros esto es del formulario
 * @param {*} $type significa el tipo de dato
 */
function selectTypeOfCreationModal($type) {
    let container = document.getElementById("containerModal");
    let htmlCode = null;
    switch ($type) {
        case 'categoria':
            htmlCode = createCustomCode(2);
            container.innerHTML = htmlCode;
            modalCreacion.showModal();
            break;
        case 'producto':

            htmlCode = createCustomCode(1);
            container.innerHTML = htmlCode;
            modalCreacion.showModal();

            break;
        case 'medidaVenta':

            htmlCode = createHTMLforMeasurements();
            container.innerHTML = htmlCode;
            modalCreacion.showModal();
            break;

        default:
            break;

    }
}


