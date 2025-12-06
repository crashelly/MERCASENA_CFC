<?php
include 'modulos/conexion.php';

$sql_categorias = "SELECT prodCat_id, prodCat_categoria FROM productos_categoria";
$resultado_categorias = $conexion->query($sql_categorias);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Módulo de Categorías</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
<header>
    <a href="menu_admin.php" class="btn-categoria-menu">Volver</a>
    <div id="user-block">👤 <?php echo htmlspecialchars($_SESSION['usuario']); ?></div>
</header>

<main class="normal">
    <h1 class="titulo-productos">📚 Categorías Existentes</h1>
    <section>
        <div class="botones-categorias">
            <button class="btn-categoria" onclick="mostrarFormulario()">➕ Agregar Categoría</button>
        </div>
    </section>
    <div style="overflow-x: auto;">
        <table class="tabla-productos" border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php
                if ($resultado_categorias->num_rows > 0) {
                    while ($fila = $resultado_categorias->fetch_assoc()) {
                        echo "<tr>
                            <td>{$fila['prodCat_id']}</td>
                            <td>".htmlspecialchars($fila['prodCat_categoria'])."</td>
                            <td>
                                <button class='btn-editar' onclick=\"abrirModalEditar(
                                    '{$fila['prodCat_id']}',
                                    '".htmlspecialchars($fila['prodCat_categoria'], ENT_QUOTES)."'
                                )\">✏️</button>
                                <button class='btn-eliminar' onclick=\"eliminarCategoria({$fila['prodCat_id']})\">🗑️</button>
                            </td>
                        </tr>";
                    }
                } else {
                    echo "<tr><td colspan='3' style='text-align:center;'>No hay categorías registradas.</td></tr>";
                }
                ?>
            </tbody>
        </table>
    </div>
</main>

<!-- Modal Agregar Categoría -->
<div id="modal-agregar-categoria" class="modal">
    <div class="modal-content">
        <span class="cerrar-agregar" onclick="cerrarFormulario()">×</span>
        <h2>Agregar Categoría</h2>
        <form id="form-agregar-categoria">
            <label>Nombre:</label>
            <input type="text" name="nombre" required>
            <button type="submit">Agregar Categoría</button>
        </form>
    </div>
</div>

<!-- Modal Editar Categoría -->
<div id="modal-editar-categoria" class="modal">
    <div class="modal-content">
        <span class="cerrar-agregar" onclick="cerrarModalEditar()">×</span>
        <h2>Editar Categoría</h2>
        <form id="form-editar-categoria">
            <input type="hidden" name="id" id="edit-id">
            <label>Nombre:</label>
            <input type="text" name="nombre" id="edit-nombre" required>
            <button type="submit">Actualizar Categoría</button>
        </form>
    </div>
</div>

<footer class="footer">
    <p>&copy; SENA 2025</p> ☎️ (+57) 320 123 4567
</footer>

<script>
function mostrarFormulario() {
    document.getElementById('modal-agregar-categoria').style.display = 'block';
}
function cerrarFormulario() {
    document.getElementById('modal-agregar-categoria').style.display = 'none';
}
function abrirModalEditar(id, nombre) {
    document.getElementById('modal-editar-categoria').style.display = 'block';
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-nombre').value = nombre;
}
function cerrarModalEditar() {
    document.getElementById('modal-editar-categoria').style.display = 'none';
}
function eliminarCategoria(id) {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
        fetch('modulos/eliminar_categoria.php?id=' + id)
        .then(r => r.text())
        .then(m => { alert(m); location.reload(); });
    }
}
document.getElementById('form-agregar-categoria').addEventListener('submit', function(e){
    e.preventDefault();
    let data = new FormData(this);
    fetch('modulos/agregar_categoria.php',{method:'POST',body:data})
    .then(r=>r.text())
    .then(m=>{alert(m); cerrarFormulario(); location.reload();});
});
document.getElementById('form-editar-categoria').addEventListener('submit', function(e){
    e.preventDefault();
    let data = new FormData(this);
    fetch('modulos/actualizar_categoria.php',{method:'POST',body:data})
    .then(r=>r.text())
    .then(m=>{alert(m); cerrarModalEditar(); location.reload();});
});
</script>

</body>
</html>
<?php $conexion->close(); ?>
