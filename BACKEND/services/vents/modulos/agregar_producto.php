<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $variacion = $_POST['variacion'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $categoria_id = $_POST['categoria_id'] ?? '';
    $precio = $_POST['precio'] ?? '';
    $existencias = $_POST['existencias'] ?? '';
    $undMedida = $_POST['und_medida'] ?? '';
    $cantidad = $_POST['cantidad'] ?? 1; // prodCat_cantidad
    $fechaExpiracion = $_POST['fecha_expiracion'] ?? null;
    $prodPes_id = 1; // default
    $prodE_id = 3; // Disponible
    $subCat_minStock = 0;
    $ruta_imagen_relativa = null;

    // Validar campos obligatorios
    if (empty($nombre) || empty($variacion) || empty($categoria_id) || empty($precio) || empty($existencias) || empty($undMedida)) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    // Manejo de imagen
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
            if (!move_uploaded_file($imagen['tmp_name'], $ruta_imagen_absoluta)) {
                error_log("Error al mover la imagen.");
                echo "Error al subir la imagen.";
                exit;
            }
        } else {
            echo "El archivo no es una imagen válida.";
            exit;
        }
    }

    $conexion->begin_transaction();

    try {
        // 1. Insertar en productos
        $stmt = $conexion->prepare("INSERT INTO productos (prod_nombre) VALUES (?)");
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $prod_id = $conexion->insert_id;
        $stmt->close();

        // 2. Insertar en productos_subcategorias
        $stmt = $conexion->prepare("INSERT INTO productos_subcategorias 
            (prod_id, subCat_nombre, subCat_existencias, subCat_precio, prodMed_id, prodCat_cantidad, prodCat_descripcion, prodCat_fechaExpiracion, prodPes_id, prodE_id, prodCat_id, subCat_minStock)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param(
            "isidisssiiii",
            $prod_id,
            $variacion, // subCat_nombre
            $existencias,
            $precio,
            $undMedida,
            $cantidad,
            $descripcion,
            $fechaExpiracion,
            $prodPes_id,
            $prodE_id,
            $categoria_id,
            $subCat_minStock
        );
        $stmt->execute();
        $subCat_id = $conexion->insert_id;
        $stmt->close();

        // 3. Insertar en productos_imagenes
        if ($ruta_imagen_relativa) {
            $miniatura = 1;
            $stmt = $conexion->prepare("INSERT INTO productos_imagenes (prodImg_ruta, subCat_id, prodImg_miniatura) VALUES (?, ?, ?)");
            $stmt->bind_param("sii", $ruta_imagen_relativa, $subCat_id, $miniatura);
            $stmt->execute();
            $stmt->close();
        }

        $conexion->commit();
        echo "Producto agregado exitosamente.";
    } catch (Exception $e) {
        $conexion->rollback();
        error_log("Error al agregar producto: " . $e->getMessage());
        echo "Error al agregar el producto.";
    }
} else {
    echo "No se recibió el formulario.";
}

$conexion->close();
?>
