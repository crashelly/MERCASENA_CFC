<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'modulos/conexion.php';

if (!$conexion) {
    die("Error de conexión MySQL: " . mysqli_connect_error());
}

// Parámetros de paginación
$por_pagina = 10;
$pagina = isset($_GET['pagina']) ? max(1, intval($_GET['pagina'])) : 1;

// ✅ Corrección: contar desde facturas, no desde ventas
$total_resultado = $conexion->query("SELECT COUNT(*) as total FROM facturas");
if (!$total_resultado) {
    die("Error en consulta total facturas: " . $conexion->error);
}
$fila = $total_resultado->fetch_assoc();
$total_filas = $fila['total'];
$total_paginas = max(1, ceil($total_filas / $por_pagina));
$pagina = min($pagina, $total_paginas);
$inicio = ($pagina - 1) * $por_pagina;

// Ventas paginadas
$sql_ventas = "SELECT fac_id, fac_fecha, fac_precioTotal 
               FROM facturas 
               ORDER BY fac_fecha DESC 
               LIMIT $inicio, $por_pagina";
$resultado_ventas = $conexion->query($sql_ventas);
if (!$resultado_ventas) {
    die("Error en consulta ventas paginadas: " . $conexion->error);
}

// Productos más vendidos
$sql_populares = "SELECT CONCAT(pm.prodMed_medida, ' - ', p.prod_nombre, ' ', IFNULL(ps.subCat_nombre, '')) AS producto, 
                         SUM(v.prod_cant) AS total_vendidos
                  FROM ventas v
                  INNER JOIN productos_subcategorias ps ON v.prod_id = ps.subCat_id
                  INNER JOIN productos p ON ps.prod_id = p.prod_id
                  INNER JOIN productos_medidaventa pm ON ps.prodMed_id = pm.prodMed_id
                  GROUP BY producto
                  ORDER BY total_vendidos DESC";
$resultado_populares = $conexion->query($sql_populares);
if (!$resultado_populares) {
    die("Error en consulta productos populares: " . $conexion->error);
}
$productos = [];
$ventas = [];
while ($fila = $resultado_populares->fetch_assoc()) {
    $productos[] = $fila['producto'];
    $ventas[] = $fila['total_vendidos'];
}

// Ganancias por día
$sql_ganancias = "SELECT fac_fechaBusqueda AS fecha, SUM(fac_precioTotal) AS total_diario 
                  FROM facturas 
                  GROUP BY fac_fechaBusqueda 
                  ORDER BY fac_fechaBusqueda ASC";
$resultado_ganancias = $conexion->query($sql_ganancias);
if (!$resultado_ganancias) {
    die("Error en consulta ganancias diarias: " . $conexion->error);
}
$fechas = [];
$totales_diarios = [];
while ($fila = $resultado_ganancias->fetch_assoc()) {
    $fechas[] = $fila['fecha'];
    $totales_diarios[] = $fila['total_diario'] ?: 0;
}

// Ganancias por mes
$sql_ganancias_mes = "SELECT DATE_FORMAT(fac_fechaBusqueda, '%Y-%m') AS mes, 
                             SUM(fac_precioTotal) AS total_mensual 
                      FROM facturas 
                      GROUP BY mes 
                      ORDER BY mes ASC";
$resultado_ganancias_mes = $conexion->query($sql_ganancias_mes);
if (!$resultado_ganancias_mes) {
    die("Error en consulta ganancias mensuales: " . $conexion->error);
}
$meses = [];
$ganancias_mensuales = [];
while ($fila = $resultado_ganancias_mes->fetch_assoc()) {
    $meses[] = $fila['mes'];
    $ganancias_mensuales[] = $fila['total_mensual'] ?: 0;
}

// Ventas por categoría
$sql_ventas_categoria = "SELECT pc.prodCat_categoria AS categoria, 
                                SUM(v.prod_cant) AS total_vendidos
                         FROM ventas v
                         INNER JOIN productos_subcategorias ps ON v.prod_id = ps.subCat_id
                         INNER JOIN productos_categoria pc ON ps.prodCat_id = pc.prodCat_id
                         GROUP BY pc.prodCat_categoria
                         ORDER BY total_vendidos DESC";
$resultado_ventas_categoria = $conexion->query($sql_ventas_categoria);
if (!$resultado_ventas_categoria) {
    die("Error en consulta ventas por categoría: " . $conexion->error);
}
$categorias = [];
$ventas_categoria = [];
while ($fila = $resultado_ventas_categoria->fetch_assoc()) {
    $categorias[] = $fila['categoria'];
    $ventas_categoria[] = $fila['total_vendidos'];
}

$conexion->close();
?>



<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard de Ventas</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        /* Dashboard de Ventas - Estilos Mejorados */
main {
    max-width: 1400px;
    margin: 30px auto 0 auto;
    padding: 0 20px 40px 20px;
}
h1 {
    color: #39A900;
    font-size: 2.2rem;
    margin-bottom: 18px;
    text-shadow: 1px 1px 2px #e8f5e9;
}
h2, h3 {
    color: #39A900;
    margin-bottom: 10px;
}
button#btnReporte {
    background: #39A900;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px 22px;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 18px;
    cursor: pointer;
    transition: background 0.2s;
}
button#btnReporte:hover {
    background: #39A900;
}
.dashboard-container, .dashboard-container-graficos {
    flex: 1;
}
.tabla-container {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(44, 94, 45, 0.07);
    padding: 24px 18px 18px 18px;
    margin-bottom: 30px;
}
.tabla-ventas {
    width: 100%;
    border-collapse: collapse;
    background: #f9fbe7;
    margin-bottom: 10px;
}
.tabla-ventas th, .tabla-ventas td {
    padding: 10px 14px;
    border: 1px solid #b2dfdb;
    text-align: center;
}
.tabla-ventas th {
    background: #e8f5e9;
    color: #39A900;
    font-weight: 700;
}
.tabla-ventas tr:nth-child(even) {
    background: #f1f8e9;
}
.btn-detalle {
    background: #39A900;
    color: #fff;
    border: none;
    padding: 7px 16px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background 0.2s;
}
.btn-detalle:hover {
    background: #39A900;
}
.paginacion {
    text-align: center;
    margin-top: 15px;
}
.paginacion a {
    margin: 0 5px;
    padding: 7px 14px;
    background: #e0e0e0;
    color: #39A900;
    text-decoration: none;
    border-radius: 4px;
    font-weight: 600;
    border: 1px solid #b2dfdb;
    transition: background 0.2s, color 0.2s;
}
.paginacion a.actual, .paginacion a:hover {
    background: #39A900;
    color: #fff;
    border: 1px solid #39A900;
}
.graficos-container {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
}
.graficos-container > div {
    flex: 1;
    background: #fff;
    border-radius: 12px;
    padding: 18px 10px 10px 10px;
    min-width: 320px;
    max-width: 600px; /* Ahora más ancho */
    margin: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 2px 8px rgba(44, 94, 45, 0.07);
}
canvas {
    max-width: 100% !important;
    height: 220px !important;
    margin-top: 10px;
}
@media (max-width: 1200px) {
    .graficos-container {
        flex-direction: column;
        gap: 18px;
    }
    .graficos-container > div {
        max-width: 100%;
        min-width: 0;
    }
}
.modal {
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.4);
}
.modal-content {
    background: #fff;
    margin: 5% auto;
    padding: 30px 30px 20px 30px;
    border-radius: 10px;
    max-width: 500px;
    box-shadow: 0 4px 16px rgba(44, 94, 45, 0.13);
    position: relative;
}
.cerrar-agregar {
    position: absolute;
    right: 18px;
    top: 12px;
    font-size: 1.6em;
    color: #39A900;
    cursor: pointer;
    font-weight: bold;
}
.footer {
    font-size: 15px;
    margin-top: 40px;
    text-align: center;
    padding: 12px;
    color: white;
    background-color: #39A900;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
    </style>
</head>
<body>

<header>
    <a href="../../V1/Inventario/index.html" class="btn-categoria-menu">Volver</a>
</header>

<main>
    <div style="display: column; gap: 20px;">
    <h1 style="text-align:center; margin-top:20px;">📊 Panel de Ventas</h1>
    <button id="btnReporte" onclick="abrirReporteVentas()">🖨️ Generar Reporte</button>
    </div>
<div style="display: flex; gap: 20px;">
    <div class="dashboard-container">
        <!-- TABLA DE VENTAS -->
        <div class="tabla-container">
            <h2>📄 Ventas Realizadas</h2>
            <table class="tabla-ventas">
                <thead>
                    <tr>
                        <th>ID Factura</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if ($resultado_ventas && $resultado_ventas->num_rows > 0) {
                        while ($fila = $resultado_ventas->fetch_assoc()) {
                            echo "<tr>
                                <td>{$fila['fac_id']}</td>
                                <td>{$fila['fac_fecha']}</td>
                                <td>$ ".number_format($fila['fac_precioTotal'],2)."</td>
                                <td><button class='btn-detalle' onclick='verFactura({$fila['fac_id']})'>Ver Detalle</button></td>
                            </tr>";
                        }
                    } else {
                        echo "<tr><td colspan='4' style='text-align:center;'>No se han registrado ventas.</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
            <div class="paginacion">
                <?php if ($total_paginas > 1): ?>
                    <?php for ($i = 1; $i <= $total_paginas; $i++): ?>
                        <a href="?pagina=<?php echo $i; ?>" class="<?php echo ($i == $pagina) ? 'actual' : ''; ?>">
                            <?php echo $i; ?>
                        </a>
                    <?php endfor; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
    <div class="dashboard-container-graficos">
        <!-- GRÁFICOS -->
        <div class="graficos-container">
            <div>
                <h3>📈 Productos más vendidos</h3>
                <canvas id="graficaVentas" width="350" height="220"></canvas>
            </div>
            <div>
                <h3>💰 Ganancias por Día</h3>
                <canvas id="graficaGanancias" width="350" height="220"></canvas>
            </div>
        </div>
        <div class="graficos-container">
            <div>
                <h3>💰 Ganancias por Mes</h3>
                <canvas id="graficaGananciasMes" width="350" height="220"></canvas>
            </div>
            <div>
                <h3>📊 Ventas por Categoría</h3>
                <canvas id="graficaCategorias" width="350" height="220"></canvas>
            </div>
        </div>
    </div>

    <!-- MODAL DETALLE FACTURA -->
    <div id="modalFactura" class="modal" style="display:none;">
        <div class="modal-content">
            <span class="cerrar-agregar" onclick="cerrarModalDetalles()">&times;</span>
            <h3>Detalle de Factura</h3>
            <div id="detalleFactura">Cargando...</div>
        </div>
    </div>

</main>

<footer class="footer">
    <p>&copy; SENA 2025</p> ☎️ (+57) 320 123 4567
</footer>

<script src="js/script.js"></script>
<script>
    // Productos más vendidos
    const ctxVentas = document.getElementById('graficaVentas').getContext('2d');
    new Chart(ctxVentas, {
        type: 'bar',
        data: {
            labels: <?php echo json_encode($productos); ?>,
            datasets: [{
                label: 'Cantidad Vendida',
                data: <?php echo json_encode($ventas); ?>,
                backgroundColor: '#39A900'
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });

    // Ganancias diarias
    const ctxGanancias = document.getElementById('graficaGanancias').getContext('2d');
    new Chart(ctxGanancias, {
        type: 'line',
        data: {
            labels: <?php echo json_encode($fechas); ?>,
            datasets: [{
                label: 'Ganancias Diarias (COP)',
                data: <?php echo json_encode($totales_diarios); ?>,
                fill: false,
                borderColor: '#39A900',
                backgroundColor: '#39A900',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$ ' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ' $ ' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Ganancias por Mes
    const ctxGananciasMes = document.getElementById('graficaGananciasMes').getContext('2d');
    new Chart(ctxGananciasMes, {
        type: 'bar',
        data: {
            labels: <?php echo json_encode($meses); ?>,
            datasets: [{
                label: 'Ganancias Mensuales (COP)',
                data: <?php echo json_encode($ganancias_mensuales); ?>,
                backgroundColor: '#FF7043'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$ ' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ' $ ' + context.parsed.y.toLocaleString();
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });

    // Ventas por Categoría
    const ctxCategorias = document.getElementById('graficaCategorias').getContext('2d');
    new Chart(ctxCategorias, {
        type: 'pie',
        data: {
            labels: <?php echo json_encode($categorias); ?>,
            datasets: [{
                data: <?php echo json_encode($ventas_categoria); ?>,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#C9CBCF'
                ],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return label + ': ' + value + ' ventas';
                        }
                    }
                }
            }
        }
    });

    // Modal detalle factura
    function verFactura(idFactura) {
        document.getElementById('modalFactura').style.display = 'block';
        document.getElementById('detalleFactura').innerHTML = 'Cargando...';
        fetch('detalle_factura.php?id=' + idFactura)
            .then(r => r.text())
            .then(html => document.getElementById('detalleFactura').innerHTML = html);
    }
    function cerrarModalDetalles() {
        document.getElementById('modalFactura').style.display = 'none';
    }
    function abrirReporteVentas() {
        const ventana = window.open('', '_blank', 'width=900,height=700');
        ventana.document.write('<p>Cargando reporte...</p>');
        fetch('reporte_ventas.php')
            .then(res => res.text())
            .then(html => {
                ventana.document.open();
                ventana.document.write(html);
                ventana.document.close();
            })
            .catch(() => {
                ventana.document.body.innerHTML = '<p>Error al cargar el reporte.</p>';
            });
    }
</script>

</body>
</html>
