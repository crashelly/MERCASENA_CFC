import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const successAlert = withReactContent(Swal)
/**
 * muestra un mensaje de que algo salio bien 
 * @param {*} msg Mensaje  de ha salido bien una accion
 */
const SuccessAlert = (msg) => {
    successAlert.fire({
        icon: "success",
        title: "! Que bien ¡ ",
        text: msg,
        confirmButtonColor: "#4f8323",
        // footer: '<a href="#">Why do I have this issue?</a>'

    });

    // cierra el modal a los 10 segundos
    setTimeout(() => {
        successAlert.close();
    }, 4000);
}

export default SuccessAlert
