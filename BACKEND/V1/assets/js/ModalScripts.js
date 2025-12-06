/**
 * 
 * @param {string} mensaje 
 * @param {string} type  puede ser info , error o succes para los mensaje de exito
 */

function showModal(mensaje, type) {
    let modalMessage = document.getElementById("text-modal");
    let typeText = document.getElementById("type-text");
    modalMessage.innerText = mensaje;

    switch (type) {
        case "info":
            typeText.innerText = "Informacion";
            infoModal.showModal();
            break;
        case "error":
            typeText.innerText = "Error";
            infoModal.showModal();
            break;
        case "success":
            typeText.innerText = "Exito";
            infoModal.showModal();


            break;

        default:
            break;
    }


}

// showDivMensagge((HTMLelementID)=>{
//     let modalMessage = document.getElementById("text-modal");
//     let typeText = document.getElementById("type-text");
//     modalMessage.innerText = HTMLelementID;
// })