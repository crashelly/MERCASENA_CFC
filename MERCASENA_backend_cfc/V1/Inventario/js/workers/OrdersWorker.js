onmessage = (request) => {
    let config = {}
    switch (request) {
        case 'getOrdersCount':
            console.log("Worker started", request);
            postMessage({ status: "Worker started" })
            break;

        default:
            break;
    }

    $.ajax({
        url: `${this.baseUrl}${controller}?action=${paramController}`,
        type: "GET",
        contentType: "application/json",
        success: function (datos) {
            let select = document.getElementById(HTMLSelectId);
            select.innerHTML = '<option value="0">Selecciona uno</option>';
            datos.forEach(elemento => {
                select.innerHTML += `<option value="${elemento.id}">${elemento.nombre}</option>`;
            });
        },
        error: function (response) {
            console.error("Error fetching data to select", response);
        }
    });


    // request.data == "start" ? : postMessage({ status: "Worker stopped" });



}