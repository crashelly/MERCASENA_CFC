<?php
include 'conexion.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // Verificar si hay productos asociados a la categoría
    $sqlCheck = "SELECT COUNT(*) FROM productos_subcategorias WHERE prodCat_id = ?";
    $stmtCheck = $conexion->prepare($sqlCheck);
    $stmtCheck->bind_param("i", $id);
    $stmtCheck->execute();
    $stmtCheck->bind_result($total);
    $stmtCheck->fetch();
    $stmtCheck->close();

    if ($total > 0) {
        echo "No se puede eliminar: hay productos asociados a esta categoría.";
    } else {
        $sql = "DELETE FROM productos_categoria WHERE prodCat_id = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo "Categoría eliminada correctamente.";
        } else {
            echo "Error al eliminar la categoría.";
        }
        $stmt->close();
    }
} else {
    echo "ID de categoría no válido.";
}

$conexion->close();
?>