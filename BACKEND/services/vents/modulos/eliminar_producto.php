<?php
include '../../facturacion/modulos/conexion.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Buscar imagen asociada para eliminarla del servidor si existe
    $sql_img = "SELECT imagen FROM productos WHERE id = $id";
    $resultado_img = $conexion->query($sql_img);
    if ($resultado_img && $resultado_img->num_rows > 0) {
        $fila = $resultado_img->fetch_assoc();
        $ruta_imagen = $fila['imagen'];
        if (file_exists($ruta_imagen)) {
            unlink($ruta_imagen);
        }
    }

    // Eliminar producto de la base de datos
    $sql = "DELETE FROM productos WHERE id = $id";
    if ($conexion->query($sql) === TRUE) {
        echo "Producto eliminado correctamente.";
    } else {
        echo "Error al eliminar el producto: " . $conexion->error;
    }
} else {
    echo "ID de producto no proporcionado.";
}

$conexion->close();
?>
