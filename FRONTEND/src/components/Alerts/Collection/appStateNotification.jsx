import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// const appStateNotification = withReactContent(Swal)
const appStateNotification = (data) => {
    data.icon = '';
    data.action == 'notify'
        ? data.icon = 'info'
        : data.icon = 'error'
    const appStateNotification = Swal.mixin({
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
    appStateNotification.fire({
        icon: data.icon,
        title: data.mensagge
    })
}

export default appStateNotification