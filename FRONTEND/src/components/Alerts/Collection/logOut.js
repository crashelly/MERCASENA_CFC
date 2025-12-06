import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'
import { CONFIG } from "@config/app"
import { Loader } from "@components/Loaders/shop/shopLoader";
import { useSelector } from "react-redux"
import { ErrorAlert } from "@components/Alerts"
import { useState, useEffect } from 'react';

const logOut = withReactContent(Swal.mixin({

    customClass: {
        confirmButton: "btn btn-error text-white mr-6",
        cancelButton: "btn  btn-success  text-white mr-6"
    },
    buttonsStyling: false
}))
/**
 * muestra un mensaje de error
 * @param {*} msg Mensaje  de error
 */
const ExecuteLogOut = ({token}) => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.globalData);
    const fetchAction = async () => {
        fetch(CONFIG.API.URL.endpoints.user.logOut(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Mercasena-Token': token,
            },
            body: JSON.stringify({
                action: "logout",
                dataObject: {}
            })
        }).then(response => {
            if (!response.ok) {
                ErrorAlert("Error al cerrar la sesion")
                Loader.hide()
            }

            return response.json()
        }).then((response) => {

            // limpia los datos almacenados en el localstorage
            localStorage.clear();

            Loader.hide()
            setTimeout(() => {
                navigate("/", { 'state': { redirectedByLogOut: true } })
            }, 2000)
        }).catch(error => {
            Loader.hide()
            ErrorAlert(error)
        })
    }
    fetchAction();

}

const LogOut = (token) => {
    logOut.fire({
        title: "¿Estas seguro ?",
        text: "Tu sesion se cerrara",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si , Salir",
        cancelButtonText: "Quedarme",
        reverseButtons: false
    }).then((result) => {
        if (result.isConfirmed) {
            logOut.fire({
                title: "Saliendo !!",
                text: "Gracias por visitar Mercasena",
                icon: "success"
            });

            // consultando 
            Loader.show()
           
            ExecuteLogOut({token : token})
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {

        }
    });
}

export default LogOut
