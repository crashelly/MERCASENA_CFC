import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// const shoppingCartMensagge = withReactContent(Swal)
const ShoppingCartMensagge = (data) => {
    data.icon = '';
    data.action == 'added'
        ? data.icon = 'success'
        : data.icon = 'error'
    const shoppingCartMensagge = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    shoppingCartMensagge.fire({
        icon: data.icon,
        title: data.mensagge
    })
}

export default ShoppingCartMensagge