<?php
include 'conexion.php';

// Obtener el ID del producto desde la solicitud GET (subCat_id)
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id > 0) {
    $sql = "SELECT 
                ps.subCat_id,
                p.prod_nombre,
                ps.subCat_nombre AS variacion,
                ps.subCat_descripcion,
                c.prodCat_categoria AS categoria,
                ps.subCat_precio,
                ps.subCat_existencias,
                m.prodMed_medida AS unidad,
                pi.prodImg_ruta AS imagen
            FROM productos_subcategorias ps
            JOIN productos p ON ps.prod_id = p.prod_id
            JOIN productos_categoria c ON ps.prodCat_id = c.prodCat_id
            JOIN productos_medidaventa m ON ps.prodMed_id = m.prodMed_id
            LEFT JOIN productos_imagenes pi ON ps.subCat_id = pi.subCat_id AND pi.prodImg_miniatura = 1
            WHERE ps.subCat_id = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $producto = $resultado->fetch_assoc();

    if ($producto) {
        echo json_encode($producto);
    } else {
        echo json_encode(['error' => 'Producto no encontrado']);
    }
    $stmt->close();
} else {
    echo json_encode(['error' => 'ID de producto no válido']);
}
?>
