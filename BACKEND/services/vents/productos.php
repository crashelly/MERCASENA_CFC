<?php
include 'modulos/conexion.php';

// Paginación
$productosPorPagina = 5;
$paginaActual = isset($_GET['pagina']) ? max(1, intval($_GET['pagina'])) : 1;
$offset = ($paginaActual - 1) * $productosPorPagina;

// Contar total de productos
$sql_total = "SELECT COUNT(*) AS total FROM productos_subcategorias";
$res_total = $conexion->query($sql_total);
$totalProductos = $res_total->fetch_assoc()['total'];
$totalPaginas = ceil($totalProductos / $productosPorPagina);

// Consulta productos con subcategoría, categoría, medida y miniatura (con LIMIT)
$sql_productos = "SELECT 
    ps.subCat_id AS id,
    p.prod_nombre AS nombre,
    ps.subCat_nombre AS variacion,
    ps.prodCat_descripcion AS descripcion,
    c.prodCat_id AS categoria_id,
    c.prodCat_categoria AS categoria,
    ps.subCat_precio AS precio,
    ps.subCat_existencias AS existencias,
    m.prodMed_id,
    m.prodMed_medida AS und_medida,
    pi.prodImg_ruta AS imagen
FROM productos_subcategorias ps
JOIN productos p ON ps.prod_id = p.prod_id
JOIN productos_categoria c ON ps.prodCat_id = c.prodCat_id
JOIN productos_medidaventa m ON ps.prodMed_id = m.prodMed_id
LEFT JOIN productos_imagenes pi ON ps.subCat_id = pi.subCat_id AND pi.prodImg_miniatura = 1
ORDER BY ps.subCat_id ASC
LIMIT $productosPorPagina OFFSET $offset";
$resultado_productos = $conexion->query($sql_productos);

// Categorías y medidas para selects
$sql_categorias = "SELECT prodCat_id, prodCat_categoria FROM productos_categoria";
$resultado_categorias = $conexion->query($sql_categorias);

$sql_medidas = "SELECT prodMed_id, prodMed_medida FROM productos_medidaventa";
$resultado_medidas = $conexion->query($sql_medidas);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Módulo de Productos</title>
    <link rel="stylesheet" href="css/styles.css">
    <style>
        .paginacion {
            margin: 20px 0;
            text-align: center;
        }
        .paginacion a, .paginacion span {
            display: inline-block;
            padding: 6px 12px;
            margin: 0 2px;
            border-radius: 4px;
            border: 1px solid #56b847;
            color: #56b847;
            text-decoration: none;
            font-weight: bold;
            background: #fff;
            transition: background 0.2s, color 0.2s;
        }
        .paginacion a:hover {
            background: #56b847;
            color: #fff;
        }
        .paginacion .actual {
            background: #56b847;
            color: #fff;
            border: 1px solid #388e3c;
        }
    </style>
</head>
<body>
<header>
    <a href="menu_admin.php" class="btn-categoria-menu">Volver</a>
</header>

<main class="normal">
    <h1 class="titulo-productos">📦 Productos Existentes</h1>
    <section>
        <div class="botones-categorias">
            <button class="btn-categoria" onclick="mostrarFormulario()">➕ Agregar Producto</button>
        </div>
    </section>
    <div style="overflow-x: auto;">
        <table class="tabla-productos" border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Variación</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Existencias</th>
                    <th>Unidad</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                if ($resultado_productos && $resultado_productos->num_rows > 0) {
                    while ($fila = $resultado_productos->fetch_assoc()) {
                        $img = $fila['imagen'] ? htmlspecialchars($fila['imagen']) : 'img/default.png';
                        echo "<tr>
                            <td>{$fila['id']}</td>
                            <td>".htmlspecialchars($fila['nombre'])."</td>
                            <td>".htmlspecialchars($fila['variacion'])."</td>
                            <td>".htmlspecialchars($fila['descripcion'])."</td>
                            <td>".htmlspecialchars($fila['categoria'])."</td>
                            <td>$ ".number_format($fila['precio'],2)."</td>
                            <td>{$fila['existencias']}</td>
                            <td>".htmlspecialchars($fila['und_medida'])."</td>
                            <td><img src='{$img}' alt='Imagen' style='width:60px;max-height:60px;object-fit:cover;'></td>
                            <td>
                                <button class='btn-editar' onclick=\"abrirModalEditar(
                                    '{$fila['id']}',
                                    '".htmlspecialchars($fila['nombre'], ENT_QUOTES)."',
                                    '".htmlspecialchars($fila['variacion'], ENT_QUOTES)."',
                                    '".htmlspecialchars($fila['descripcion'], ENT_QUOTES)."',
                                    '{$fila['categoria_id']}',
                                    '{$fila['precio']}',
                                    '{$fila['existencias']}',
                                    '{$fila['prodMed_id']}',
                                    '{$img}'
                                )\">✏️</button>
                                <button class='btn-eliminar' onclick=\"eliminarProducto({$fila['id']})\">🗑️</button>
                                <button onclick=\"detalles(
                                    ${fila['id']},
                                    '".htmlspecialchars($fila['nombre'], ENT_QUOTES)."',
                                    '".htmlspecialchars($fila['descripcion'], ENT_QUOTES)."',
                                    {$fila['precio']},
                                    {$fila['existencias']},
                                    '".htmlspecialchars($fila['und_medida'], ENT_QUOTES)."',
                                    '{$img}',
                                    '".htmlspecialchars($fila['variacion'], ENT_QUOTES)."'
                                )\">Detalles</button>
                            </td>
                        </tr>";
                    }
                } else {
                    echo "<tr><td colspan='10' style='text-align:center;'>No hay productos registrados.</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>

    <!-- PAGINACIÓN -->
    <div class="paginacion">
        <?php if ($paginaActual > 1): ?>
            <a href="?pagina=1">&laquo; Primero</a>
            <a href="?pagina=<?php echo $paginaActual-1; ?>">&lt; Anterior</a>
        <?php endif; ?>
        <?php
        // Mostrar máximo 5 páginas alrededor de la actual
        $rango = 2;
        for ($i = max(1, $paginaActual-$rango); $i <= min($totalPaginas, $paginaActual+$rango); $i++):
        ?>
            <?php if ($i == $paginaActual): ?>
                <span class="actual"><?php echo $i; ?></span>
            <?php else: ?>
                <a href="?pagina=<?php echo $i; ?>"><?php echo $i; ?></a>
            <?php endif; ?>
        <?php endfor; ?>
        <?php if ($paginaActual < $totalPaginas): ?>
            <a href="?pagina=<?php echo $paginaActual+1; ?>">Siguiente &gt;</a>
            <a href="?pagina=<?php echo $totalPaginas; ?>">Último &raquo;</a>
        <?php endif; ?>
    </div>
    <!-- FIN PAGINACIÓN -->

</main>

<!-- Modal Agregar Producto -->
<div id="modal-agregar-producto" class="modal">
    <div class="modal-content">
        <span class="cerrar-agregar" onclick="cerrarFormulario()">×</span>
        <h2>Agregar Producto</h2>
        <form id="form-agregar-producto" enctype="multipart/form-data">
            <label>Nombre:</label>
            <input type="text" name="nombre" required>
            <label>Variación:</label>
            <input type="text" name="variacion" required>
            <label>Descripción:</label>
            <textarea name="descripcion" required></textarea>
            <label>Categoría:</label>
            <select name="categoria_id" required>
                <option value="">Seleccione una categoría</option>
                <?php
                $resultado_categorias->data_seek(0);
                while ($fila = $resultado_categorias->fetch_assoc()) {
                    echo "<option value='{$fila['prodCat_id']}'>".htmlspecialchars($fila['prodCat_categoria'])."</option>";
                }
                ?>
            </select>
            <label>Precio:</label>
            <input type="number" name="precio" min="0" step="0.01" required>
            <label>Existencias:</label>
            <input type="number" name="existencias" min="0" required>
            <label>Unidad de Medida:</label>
            <select name="und_medida" required>
                <option value="">Seleccione una unidad</option>
                <?php
                $resultado_medidas->data_seek(0);
                while ($fila = $resultado_medidas->fetch_assoc()) {
                    echo "<option value='{$fila['prodMed_id']}'>".htmlspecialchars($fila['prodMed_medida'])."</option>";
                }
                ?>
            </select>
            <label>Cantidad por unidad:</label>
            <input type="number" name="cantidad" min="1" value="1" required>
            <label>Fecha de expiración:</label>
            <input type="date" name="fecha_expiracion">
            <label>Imagen:</label>
            <input type="file" name="imagen" accept="image/*" required>
            <button type="submit">Agregar Producto</button>
        </form>
    </div>
</div>

<!-- Modal Editar Producto -->
<div id="modal-editar-producto" class="modal">
    <div class="modal-content">
        <span class="cerrar-agregar" onclick="cerrarModalEditar()">×</span>
        <h2>Editar Producto</h2>
        <form id="form-editar-producto" enctype="multipart/form-data">
            <input type="hidden" name="id" id="edit-id">
            <label>Nombre:</label>
            <input type="text" name="nombre" id="edit-nombre" required>
            <label>Variación:</label>
            <input type="text" name="variacion" id="edit-variacion" required>
            <label>Descripción:</label>
            <textarea name="descripcion" id="edit-descripcion" required></textarea>
            <label>Categoría:</label>
            <select name="categoria_id" id="edit-categoria" required>
                <option value="">Seleccione una categoría</option>
                <?php
                $resultado_categorias->data_seek(0);
                while ($fila = $resultado_categorias->fetch_assoc()) {
                    echo "<option value='{$fila['prodCat_id']}'>".htmlspecialchars($fila['prodCat_categoria'])."</option>";
                }
                ?>
            </select>
            <label>Precio:</label>
            <input type="number" name="precio" id="edit-precio" min="0" step="0.01" required>
            <label>Existencias:</label>
            <input type="number" name="existencias" id="edit-existencias" min="0" required>
            <label>Unidad de Medida:</label>
            <select name="und_medida" id="edit-und_medida" required>
                <option value="">Seleccione una unidad</option>
                <?php
                $resultado_medidas->data_seek(0);
                while ($fila = $resultado_medidas->fetch_assoc()) {
                    echo "<option value='{$fila['prodMed_id']}'>".htmlspecialchars($fila['prodMed_medida'])."</option>";
                }
                ?>
            </select>
            <label>Imagen actual:</label>
            <img id="edit-imagen" src="" width="80">
            <label>Nueva imagen:</label>
            <input type="file" name="imagen">
            <button type="submit">Actualizar Producto</button>
        </form>
    </div>
</div>

<footer class="footer">
    <p>&copy; SENA 2025</p> ☎️ (+57) 320 123 4567
</footer>

<script src="js/script.js"></script>
<script>
function mostrarFormulario() {
    document.getElementById('modal-agregar-producto').style.display = 'block';
}
function cerrarFormulario() {
    document.getElementById('modal-agregar-producto').style.display = 'none';
}
function abrirModalEditar(id, nombre, variacion, descripcion, categoria_id, precio, existencias, und_medida, imagen) {
    document.getElementById('modal-editar-producto').style.display = 'block';
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-nombre').value = nombre;
    document.getElementById('edit-variacion').value = variacion;
    document.getElementById('edit-descripcion').value = descripcion;
    document.getElementById('edit-precio').value = precio;
    document.getElementById('edit-existencias').value = existencias;
    document.getElementById('edit-und_medida').value = und_medida;
    document.getElementById('edit-imagen').src = imagen;
    document.getElementById('edit-categoria').value = categoria_id;
}
function cerrarModalEditar() {
    document.getElementById('modal-editar-producto').style.display = 'none';
}
function eliminarProducto(id) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
        fetch('modulos/eliminar_producto.php?id=' + id)
        .then(r => r.text())
        .then(m => { alert(m); location.reload(); });
    }
}
document.getElementById('form-agregar-producto').addEventListener('submit', function(e){
    e.preventDefault();
    let data = new FormData(this);
    fetch('modulos/agregar_producto.php',{method:'POST',body:data})
    .then(r=>r.text())
    .then(m=>{alert(m); cerrarFormulario(); location.reload();});
});
document.getElementById('form-editar-producto').addEventListener('submit', function(e){
    e.preventDefault();
    let data = new FormData(this);
    fetch('modulos/actualizar_producto.php',{method:'POST',body:data})
    .then(r=>r.text())
    .then(m=>{alert(m); cerrarModalEditar(); location.reload();});
});
</script>
</body>
</html>
<?php $conexion->close(); ?>
