// import { useState } from "react";
export const useInfoModal = (msg) => {


    document.getElementById('text-infoModal').innerHTML = msg
    document.getElementById('infoModal').showModal();

    setTimeout(() => {
        document.getElementById('infoModal').close();
    }, 3000)
}