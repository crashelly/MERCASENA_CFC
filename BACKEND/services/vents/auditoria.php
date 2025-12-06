<?php
include '../modulos/conexion.php';

// Paginación
$por_pagina = 10;
$pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
$inicio = ($pagina > 1) ? ($pagina - 1) * $por_pagina : 0;

// Obtener auditorías paginadas
$auditorias_array = [];
$sql = "SELECT * FROM auditoria ORDER BY fecha ASC LIMIT $inicio, $por_pagina";
$resultado = $conexion->query($sql);
if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $auditorias_array[] = $fila;
    }
}

// Total de registros
$total_resultado = $conexion->query("SELECT COUNT(*) as total FROM auditoria");
$total_filas = $total_resultado->fetch_assoc()['total'];
$total_paginas = ceil($total_filas / $por_pagina);
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Auditorías</title>
    <link rel="stylesheet" href="css/styles.css">
</head>

<body>
<header>
    <a href="menu_admin.php" class="btn-categoria-menu">Volver</a>
    <div id="user-block">
        👤 <?php echo htmlspecialchars($_SESSION['usuario']); ?>
    </div>
</header>

    <h1>Registro de Auditorías</h1>

    <div class="auditoria-container">
        <?php if (count($auditorias_array) > 0): ?>
            <table class="tabla-auditorias" border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($auditorias_array as $audit): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($audit['id']); ?></td>
                            <td><?php echo htmlspecialchars($audit['usuario']); ?></td>
                            <td><?php echo htmlspecialchars($audit['fecha']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <div style="text-align: center; margin-top: 15px;">
                <?php if ($total_paginas > 1): ?>
                    <?php for ($i = 1; $i <= $total_paginas; $i++): ?>
                        <a href="?pagina=<?php echo $i; ?>" style="margin: 0 5px; padding: 6px 12px; background: <?php echo ($i == $pagina) ? '#4CAF50' : '#ccc'; ?>; color: #fff; text-decoration: none; border-radius: 4px;">
                            <?php echo $i; ?>
                        </a>
                    <?php endfor; ?>
                <?php endif; ?>
            </div>
        <?php else: ?>
            <p style="text-align:center;">No se encontraron registros de auditoría.</p>
        <?php endif; ?>
    </div>

    <footer class="footer">
        <p>&copy; SENA 2025</p>
        ☎️ (+57) 320 123 4567
    </footer>

    <script>
        function abrirMenu() {
            document.getElementById('pantallaDesplegable').style.width = '250px';
            document.getElementById('overlay').style.display = 'block';
        }

        function cerrarMenu() {
            document.getElementById('pantallaDesplegable').style.width = '0';
            document.getElementById('overlay').style.display = 'none';
        }
    </script>

</body>

</html>
