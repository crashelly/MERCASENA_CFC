<?php
include 'modulos/conexion.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT 
            p.prod_nombre AS nombre,
            ps.subCat_nombre AS variacion,
            v.prod_cant AS cantidad,
            pm.prodMed_medida AS und_medida,
            v.prod_precio AS precio
        FROM ventas v
        INNER JOIN productos_subcategorias ps ON v.prod_id = ps.subCat_id
        INNER JOIN productos p ON ps.prod_id = p.prod_id
        INNER JOIN productos_medidaventa pm ON ps.prodMed_id = pm.prodMed_id
        WHERE v.fac_id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    echo "<table border='1' cellpadding='8' cellspacing='0' style='width:100%; border-collapse: collapse;'>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Variación</th>
                    <th>Cantidad</th>
                    <th>Und Medida</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>";
    while ($fila = $resultado->fetch_assoc()) {
        echo "<tr>
                <td>{$fila['nombre']}</td>
                <td>{$fila['variacion']}</td>
                <td>{$fila['cantidad']}</td>
                <td>{$fila['und_medida']}</td>
                <td>$ {$fila['precio']}</td>
              </tr>";
    }
    echo "</tbody></table>";
} else {
    echo "No hay detalles para esta factura.";
}

// Después de mostrar la tabla de productos
$sqlFac = "SELECT fac_precioTotal, fac_fecha FROM facturas WHERE fac_id = ?";
$stmtFac = $conexion->prepare($sqlFac);
$stmtFac->bind_param("i", $id);
$stmtFac->execute();
$resFac = $stmtFac->get_result();
if ($rowFac = $resFac->fetch_assoc()) {
    echo "<p><strong>Total factura:</strong> $ {$rowFac['fac_precioTotal']}</p>";
    echo "<p><strong>Fecha:</strong> {$rowFac['fac_fecha']}</p>";
}
$stmtFac->close();

$stmt->close();
$conexion->close();
?>
