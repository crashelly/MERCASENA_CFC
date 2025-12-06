<?php
include '../facturacion/modulos/conexion.php';
session_start();
if (!isset($_SESSION['usuario'])) {
    header('Location: index.html');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? '';
    $nombre = $_POST['nombre'] ?? '';
    $variacion = $_POST['variacion'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $categoria_id = $_POST['categoria_id'] ?? '';
    $precio = $_POST['precio'] ?? '';
    $existencias = $_POST['existencias'] ?? '';
    $undMedida = $_POST['und_medida'] ?? '';

    if ($id && $nombre !== '' && $variacion !== '' && $descripcion !== '' && $categoria_id !== '' && $precio !== '' && $existencias !== '' && $undMedida !== '') {
        // Actualizar nombre en productos
        $sql = "UPDATE productos p
                JOIN productos_subcategorias ps ON p.prod_id = ps.prod_id
                SET p.prod_nombre = ?
                WHERE ps.subCat_id = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param('si', $nombre, $id);
        $stmt->execute();
        $stmt->close();

        // Actualizar datos en productos_subcategorias
        $sql2 = "UPDATE productos_subcategorias SET 
                    subCat_nombre = ?, 
                    prodCat_descripcion = ?, 
                    prodCat_id = ?, 
                    subCat_precio = ?, 
                    subCat_existencias = ?, 
                    prodMed_id = ?
                 WHERE subCat_id = ?";
        $stmt2 = $conexion->prepare($sql2);
        $stmt2->bind_param('ssidiii', $variacion, $descripcion, $categoria_id, $precio, $existencias, $undMedida, $id);
        $stmt2->execute();
        $stmt2->close();

        // Manejo de imagen (opcional)
        if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0) {
            $imagen = $_FILES['imagen'];
            $nombre_imagen = basename($imagen['name']);
            $ruta_imagen_relativa = '/mercasena/public/images/' . $nombre_imagen;
            $ruta_imagen_absoluta = dirname(__DIR__) . '/public/images/' . $nombre_imagen;

            $extensiones_validas = ['jpg', 'jpeg', 'png', 'gif'];
            $extension = strtolower(pathinfo($imagen['name'], PATHINFO_EXTENSION));

            if (in_array($extension, $extensiones_validas)) {
                if (!is_dir(dirname(__DIR__) . '/public/images')) {
                    mkdir(dirname(__DIR__) . '/public/images', 0777, true);
                }
                if (move_uploaded_file($imagen['tmp_name'], $ruta_imagen_absoluta)) {
                    // Actualizar o insertar imagen
                    $sqlImg = "INSERT INTO productos_imagenes (prodImg_ruta, subCat_id, prodImg_miniatura)
                               VALUES (?, ?, 1)
                               ON DUPLICATE KEY UPDATE prodImg_ruta = VALUES(prodImg_ruta)";
                    $stmtImg = $conexion->prepare($sqlImg);
                    $stmtImg->bind_param('si', $ruta_imagen_relativa, $id);
                    $stmtImg->execute();
                    $stmtImg->close();
                }
            }
        }

        echo "Producto actualizado correctamente.";
    } else {
        echo "Datos incompletos.";
    }
} else {
    echo "Método no permitido.";
}
?>
