import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const errorAlert = withReactContent(Swal)
/**
 * muestra un mensaje de error
 * @param {*} msg Mensaje  de error
 */
const ErrorAlert = (msg) => {
    errorAlert.fire({
        icon: "error",
        title: "Error",
        text: msg,
        // footer: '<a href="#">Why do I have this issue?</a>'

    });
     // cierra el modal a los 10 segundos
    setTimeout(() => {
        errorAlert.close();
    }, 4000);
}

export default ErrorAlert
