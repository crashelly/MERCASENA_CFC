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


function showCar() {
    modal_carrito.showModal();
}

document.addEventListener('DOMContentLoaded', function () {
    // Obtener elementos
    const loginLink = document.getElementById('loginTrigger');
    const modal = document.getElementById('loginModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const closeModalBtn = document.getElementById('closeModal');

    // Función para abrir el modal
    function openModal() {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Previene el scroll del body
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restaura el scroll del body
    }

    // Abrir modal al hacer clic en "Iniciar Sesión / Registro"
    if (loginLink) {
        loginLink.addEventListener('click', function (e) {
            e.preventDefault();
            loginModal.showModal();
        });
    }

    // Cerrar modal al hacer clic en el fondo oscuro
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    // Cerrar modal al hacer clic en el botón de cerrar
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Cerrar modal al presionar la tecla Esc
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});




function abrirRegistro() {
    document.getElementById("loginModal").classList.add("hidden");
    document.getElementById("registerModal").showModal();
    document.body.style.overflow = "hidden";
}

function volverAlLogin() {
    document.getElementById("registerModal").close();
    document.getElementById("loginModal").classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Porque sigue abierto el login
}

function cerrarLogin() {
    document.getElementById("loginModal").classList.add("hidden");
    document.body.style.overflow = ""; // Se cerró todo, permitir scroll
}

function cerrarRegistro() {
    document.getElementById("registerModal").close();
    document.body.style.overflow = ""; // Se cerró todo, permitir scroll
}

function abrirOlvido() {
    document.getElementById("loginModal").classList.add("hidden");
    document.getElementById("forgotPasswordModal").showModal();
    document.body.style.overflow = "hidden";
}

function cerrarOlvido() {
    document.getElementById("forgotPasswordModal").close();
    document.body.style.overflow = ""; // Se cerró todo, permitir scroll
}

function cerrarOlvidoYVolverLogin() {
    document.getElementById("forgotPasswordModal").close();
    document.getElementById("loginModal").classList.remove("hidden");
    document.body.style.overflow = "hidden"; // sigue el login abierto
}
function actualizarScroll() {
    const login = document.getElementById("loginModal");
    const register = document.getElementById("registerModal");
    const forgot = document.getElementById("forgotPasswordModal");

    if (!login.open && !register.open && !forgot.open) {
        document.body.style.overflow = ""; // permitir scroll
    } else {
        document.body.style.overflow = "hidden"; // bloquear scroll
    }
}

// eventos 
// cerrar Modal  de lgin 

document.getElementById("btnCerrarLogin").addEventListener("click", function (e) {
        cerrarLogin();
        console.log("intentando cerrar login");
});