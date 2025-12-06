<?php
$host = 'localhost';
$dbname = 'u836772000_mercasena';
$username = 'u836772000_chucho';
$password = 'graciasKevinPorLaAyuda@1';



// Crear conexión
$conexion = new mysqli($host, $username, $password, $dbname);

// Verificar conexión
if ($conexion->connect_error) {
    error_log("Error de conexión: " . $conexion->connect_error);
    echo "Error al conectar con la base de datos.";
    exit;
}
?>