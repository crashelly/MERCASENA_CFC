<?php
date_default_timezone_set('America/Bogota');

$conexion = new mysqli("localhost", "root", "", "mercasena");

// Producto más y menos vendido
$sql_ranking = "
    SELECT CONCAT(p.prod_nombre, ' ', ps.subCat_nombre) AS nombre, SUM(v.prod_cant) AS cantidad
    FROM ventas v
    INNER JOIN productos_subcategorias ps ON v.prod_id = ps.subCat_id
    INNER JOIN productos p ON ps.prod_id = p.prod_id
    GROUP BY p.prod_nombre, ps.subCat_nombre
    ORDER BY cantidad DESC
";
$res_ranking = $conexion->query($sql_ranking);

if ($res_ranking->num_rows > 0) {
    $mas_vendido = $res_ranking->fetch_assoc();

    if ($res_ranking->num_rows > 1) {
        $res_ranking->data_seek($res_ranking->num_rows - 1);
        $menos_vendido = $res_ranking->fetch_assoc();
    } else {
        $menos_vendido = $mas_vendido;
    }
} else {
    $mas_vendido = ['nombre' => 'Sin ventas', 'cantidad' => 0];
    $menos_vendido = ['nombre' => 'Sin ventas', 'cantidad' => 0];
}

// Ganancias por día
$sql_diarias = "
    SELECT ven_fecha AS fecha, SUM(prod_precio * prod_cant) AS total
    FROM ventas
    GROUP BY ven_fecha
    ORDER BY ven_fecha ASC
";
$res_diarias = $conexion->query($sql_diarias);

$total_diario = [];
$total_anual = 0;
while ($fila = $res_diarias->fetch_assoc()) {
    $total_diario[] = $fila;
    $total_anual += $fila['total'];
}

// Ventas por categoría
$sql_categorias = "
    SELECT pc.prodCat_categoria AS categoria, SUM(v.prod_cant) AS total_vendido
    FROM ventas v
    INNER JOIN productos_subcategorias ps ON v.prod_id = ps.subCat_id
    INNER JOIN productos_categoria pc ON ps.prodCat_id = pc.prodCat_id
    GROUP BY pc.prodCat_categoria
    ORDER BY total_vendido DESC
";
$res_categorias = $conexion->query($sql_categorias);

$categorias = [];
while ($fila = $res_categorias->fetch_assoc()) {
    $categorias[] = $fila;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Reporte General</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #000;
      margin: 0;
    }
    .container {
      width: 800px;
      margin: auto;
      background: #fff;
      padding: 20px;
      border: 2px solid #000;
      background: #CECBBB;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header img {
      height: 80px;
    }
    h2, h3 {
      margin: 5px 0;
      text-align: center;
    }
    p {
      margin: 5px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      border: 1px solid #000;
      padding: 6px;
      text-align: left;
    }
    thead {
      background-color: #AFADA1;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 0.9em;
    }
  </style>
  <script>
    window.onload = () => window.print();
  </script>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="img/sena.png" alt="SENA">
      <h2>COMERCIALIZADORA DIDÁCTICA</h2>
      <p>SERVICIO NACIONAL DE APRENDIZAJE - SENA</p>
      <p>REGIONAL CALDAS</p>
      <h3>📋 REPORTE GENERAL DE VENTAS</h3>
    </div>

    <p style="text-align: right;"><strong>Fecha de generación:</strong> <?php echo date('Y-m-d H:i:s'); ?></p>

    <h3>🏆 Producto más vendido</h3>
    <p><strong>Producto:</strong> <?php echo $mas_vendido['nombre']; ?></p>
    <p><strong>Cantidad vendida:</strong> <?php echo $mas_vendido['cantidad']; ?></p>

    <h3>📉 Producto menos vendido</h3>
    <p><strong>Producto:</strong> <?php echo $menos_vendido['nombre']; ?></p>
    <p><strong>Cantidad vendida:</strong> <?php echo $menos_vendido['cantidad']; ?></p>

    <h3>💰 Ganancias por Día</h3>
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Ganancia (COP)</th>
        </tr>
      </thead>
      <tbody>
        <?php if (count($total_diario) > 0): ?>
          <?php foreach ($total_diario as $dia): ?>
            <tr>
              <td><?php echo $dia['fecha']; ?></td>
              <td>$ <?php echo number_format($dia['total'], 0, ',', '.'); ?></td>
            </tr>
          <?php endforeach; ?>
        <?php else: ?>
          <tr><td colspan="2" style="text-align:center;">Sin registros</td></tr>
        <?php endif; ?>
      </tbody>
    </table>

    <h3>📂 Ventas por Categoría</h3>
    <table>
      <thead>
        <tr>
          <th>Categoría</th>
          <th>Total Vendido (unidades)</th>
        </tr>
      </thead>
      <tbody>
        <?php if (count($categorias) > 0): ?>
          <?php foreach ($categorias as $cat): ?>
            <tr>
              <td><?php echo htmlspecialchars($cat['categoria']); ?></td>
              <td><?php echo number_format($cat['total_vendido'], 0, ',', '.'); ?></td>
            </tr>
          <?php endforeach; ?>
        <?php else: ?>
          <tr><td colspan="2" style="text-align:center;">Sin registros</td></tr>
        <?php endif; ?>
      </tbody>
    </table>

    <h3>📆 Ganancia Total Anual</h3>
    <p><strong>$ <?php echo number_format($total_anual, 0, ',', '.'); ?> COP</strong></p>

    <div class="footer">
      &copy; SENA 2025 - Generado automáticamente
    </div>
  </div>
</body>
</html>
