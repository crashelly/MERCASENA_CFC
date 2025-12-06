<?php
include 'conexion.php';

$data = json_decode(file_get_contents('php://input'), true);

$carrito = $data['carrito'];
$total = $data['total'];
$fecha = $data['fecha'];
$usr_id = isset($data['usr_id']) ? $data['usr_id'] : '';

// Verificar existencias antes de hacer cualquier inserción
foreach ($carrito as $producto) {
    $idProducto = $producto['id']; // subCat_id
    $cantidadSolicitada = $producto['cantidad'];

    // Consultar existencias actuales en productos_subcategorias
    $sqlStock = "SELECT subCat_existencias FROM productos_subcategorias WHERE subCat_id = ?";
    $stmtStock = $conexion->prepare($sqlStock);
    $stmtStock->bind_param("i", $idProducto);
    $stmtStock->execute();
    $stmtStock->bind_result($existenciasActuales);
    $stmtStock->fetch();
    $stmtStock->close();

    if ($existenciasActuales < $cantidadSolicitada) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "No hay suficiente stock para el producto: " . $producto['nombre']
        ]);
        $conexion->close();
        exit;
    }
}

// Insertar factura
$sqlFactura = "INSERT INTO facturas (fac_fecha, fac_fechaBusqueda, fac_precioTotal, cant_productos, pedi_info, pedi_id, usr_id, usr_noRegistrado) VALUES (?, ?, ?, ?, '', '', ?, '')";
$fechaBusqueda = date('Y-m-d', strtotime($fecha));
$cant_productos = count($carrito);
$stmtFactura = $conexion->prepare($sqlFactura);
$stmtFactura->bind_param("ssdii", $fecha, $fechaBusqueda, $total, $cant_productos, $usr_id);
$stmtFactura->execute();
$idFactura = $stmtFactura->insert_id;
$stmtFactura->close();

// Insertar cada producto vendido en la tabla ventas
foreach ($carrito as $producto) {
    $idProducto = $producto['id'];
    $cantidad = $producto['cantidad'];
    $precio = $producto['precio'];

    $sqlVenta = "INSERT INTO ventas (fac_id, prod_id, prod_cant, prod_precio) VALUES (?, ?, ?, ?)";
    $stmtVenta = $conexion->prepare($sqlVenta);
    $stmtVenta->bind_param("iiid", $idFactura, $idProducto, $cantidad, $precio);
    $stmtVenta->execute();
    $stmtVenta->close();

    // Actualizar stock
    $sqlActualizarStock = "UPDATE productos_subcategorias SET subCat_existencias = subCat_existencias - ? WHERE subCat_id = ?";
    $stmtActualizarStock = $conexion->prepare($sqlActualizarStock);
    $stmtActualizarStock->bind_param("ii", $cantidad, $idProducto);
    $stmtActualizarStock->execute();
    $stmtActualizarStock->close();
}

$conexion->close();

echo json_encode([
    "success" => true,
    "message" => "Factura y ventas guardadas correctamente."
]);
?>
