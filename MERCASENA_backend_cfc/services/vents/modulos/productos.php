<?php
include 'conexion.php';

// Obtener categoría desde GET
$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null;

if ($categoria) {
    // Consulta con filtro por categoría
    $sql = "
        SELECT 
            ps.subCat_id AS id,
            CONCAT(p.prod_nombre, ' ', ps.subCat_nombre) AS nombre,
            ps.prodCat_descripcion AS descripcion,
            ps.subCat_precio AS precio,
            ps.subCat_existencias AS existencias,
            mv.prodMed_medida AS und_medida,
            COALESCE(pi.prodImg_ruta, 'img/default.png') AS imagen,
            pc.prodCat_categoria AS categoria_nombre
        FROM productos_subcategorias ps
        INNER JOIN productos p ON ps.prod_id = p.prod_id
        INNER JOIN productos_categoria pc ON ps.prodCat_id = pc.prodCat_id
        INNER JOIN productos_medidaventa mv ON ps.prodMed_id = mv.prodMed_id
        LEFT JOIN productos_imagenes pi ON pi.subCat_id = ps.subCat_id AND pi.prodImg_miniatura = 1
        WHERE pc.prodCat_categoria = ?
    ";
    $stmt = $conexion->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("s", $categoria);
        $stmt->execute();
        $resultado = $stmt->get_result();
    } else {
        echo "Error en la consulta: " . $conexion->error;
        exit;
    }
} else {
    // Consulta sin filtro
    $sql = "
        SELECT 
            ps.subCat_id AS id,
            CONCAT(p.prod_nombre, ' ', ps.subCat_nombre) AS nombre,
            ps.prodCat_descripcion AS descripcion,
            ps.subCat_precio AS precio,
            ps.subCat_existencias AS existencias,
            mv.prodMed_medida AS und_medida,
            COALESCE(pi.prodImg_ruta, 'img/default.png') AS imagen,
            pc.prodCat_categoria AS categoria_nombre
        FROM productos_subcategorias ps
        INNER JOIN productos p ON ps.prod_id = p.prod_id
        INNER JOIN productos_categoria pc ON ps.prodCat_id = pc.prodCat_id
        INNER JOIN productos_medidaventa mv ON ps.prodMed_id = mv.prodMed_id
        LEFT JOIN productos_imagenes pi ON pi.subCat_id = ps.subCat_id AND pi.prodImg_miniatura = 1
    ";
    $stmt = $conexion->prepare($sql);

    if ($stmt) {
        $stmt->execute();
        $resultado = $stmt->get_result();
    } else {
        echo "Error en la consulta: " . $conexion->error;
        exit;
    }
}

// Obtener resultados
$productos = [];
while ($fila = $resultado->fetch_assoc()) {
    $productos[] = $fila;
}

// Devolver JSON
header('Content-Type: application/json');
echo json_encode($productos);

// Cerrar statement y conexión
$stmt->close();
$conexion->close();
?>
