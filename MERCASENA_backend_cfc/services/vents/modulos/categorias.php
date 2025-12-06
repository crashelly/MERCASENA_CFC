<?php
include 'conexion.php';

$sql = "SELECT prodCat_id AS id, prodCat_categoria AS nombre FROM productos_categoria";
$stmt = $conexion->prepare($sql);

if ($stmt) {
    $stmt->execute();
    $resultado = $stmt->get_result();

    $categorias = [];
    while ($fila = $resultado->fetch_assoc()) {
        $categorias[] = $fila;
    }

    echo json_encode($categorias);

    $stmt->close();
} else {
    echo "Error en la consulta: " . $conexion->error;
}
?>
