<?php
require 'modulos/conexion.php';

try {
    // Obtener datos del formulario
    $usuario = $_POST['usuario'];
    $clave = $_POST['clave'];

    // Encriptar la contraseña
    $claveHash = password_hash($clave, PASSWORD_DEFAULT);

    // Insertar nuevo usuario usando procedimiento almacenado
    $stmt = $conexion->prepare("CALL insertar_usuario(?, ?)");
    $stmt->bind_param("ss", $usuario, $claveHash);

    if ($stmt->execute()) {
        // Limpiar resultsets del procedimiento si los hubiera
        while ($conexion->more_results() && $conexion->next_result()) {;}

        // Mostrar ventana modal con cuenta regresiva
        echo '
        <html>
        <head>
            <title>Registro Exitoso</title>
            <style>
                .modal {
                    display: block;
                    position: fixed;
                    z-index: 1;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgba(0,0,0,0.4);
                    padding-top: 60px;
                }
                .modal-content {
                    background-color: #fefefe;
                    margin: 5% auto;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                    max-width: 400px;
                    text-align: center;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                }
            </style>
            <script>
                var countdown = 5;
                function updateCountdown() {
                    document.getElementById("countdown").innerHTML = countdown;
                    if (countdown === 0) {
                        window.location.href = "index.html";
                    } else {
                        countdown--;
                        setTimeout(updateCountdown, 1000);
                    }
                }
                window.onload = updateCountdown;
            </script>
        </head>
        <body>
            <div class="modal">
                <div class="modal-content">
                    <h2>Usuario registrado exitosamente</h2>
                    <p>Redirigiendo en <span id="countdown">5</span> segundos...</p>
                </div>
            </div>
        </body>
        </html>';
    } else {
        echo "Error al registrar el usuario: " . $stmt->error;
    }

    $stmt->close();
    $conexion->close();

} catch (Exception $e) {
    echo "Error en el registro: " . $e->getMessage();
}
?>
