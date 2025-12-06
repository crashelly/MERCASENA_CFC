<?php
include '../mercasena/modulos/conexion.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Facturación</title>
    <link rel="stylesheet" href="css/styles.css">
</head>

<body>
    <header>
<button id="boton-carrito" onclick="mostrarCarrito()">🛒 Carrito</button>
    <button class="btn-categoria-menu" onclick="abrirMenu()">Menú</button>
    <div id="pantallaDesplegable" class="pantalla-desplegable">
  <a href="javascript:void(0)" class="cerrar-btn" onclick="cerrarMenu()">&times;</a>
  <h2>Selecciona categoría</h2>
  <a href="menu_usuario.php">Inicio</a>
  <a href="menu_admin.php">Admin</a>
  <a href="index.html" >Cerrar Sesión</a>
</div>
    <div id="overlay" class="overlay" onclick="cerrarMenu()"></div>
</header>
    <section class="seccion-carrusel">
    <!-- Aquí va el carrusel -->
    <div class="carrusel">
      <div class="carrusel-fotos">
        <img src="img/campo2.jpeg" class="carrusel-imagen activa" alt="Imagen 1">
        <img src="img/campo.jpeg" class="carrusel-imagen" alt="Imagen 2">
      </div>
      <button class="carrusel-btn izq" onclick="cambiarImagen(-1)">❮</button>
      <button class="carrusel-btn der" onclick="cambiarImagen(1)">❯</button>
    </div>
  </section>
    <section>
        <div class="botones-categorias">
            <?php
            $sql_categorias = "SELECT prodCat_categoria FROM productos_categoria ORDER BY prodCat_categoria ASC";
            $res_categorias = $conexion->query($sql_categorias);
            if ($res_categorias && $res_categorias->num_rows > 0) {
                while ($cat = $res_categorias->fetch_assoc()) {
                    $cat_nombre = htmlspecialchars($cat['prodCat_categoria']);
                    echo "<button class='btn-categoria' onclick=\"filtrarProductos('{$cat_nombre}')\">{$cat_nombre}</button>";
                }
            }
            ?>
            <button class="btn-categoria" onclick="mostrarTodosProductos()">🔄 Mostrar Todos</button>
        </div>
    </section>

    <main id="productos-container"></main>

    <!-- Modal de detalles -->
<div id="modal-detalles" class="modal">
  <div class="modal-content">
    <span class="cerrar-detalles" onclick="cerrarModal()">×</span>
    <h2 id="titulo-producto"></h2>
    <img id="imagen-producto" alt="Imagen del producto" style="max-width: 100%; max-height: 200px; display: block; margin-bottom: 15px;">
    <label>Descripción</label>
    <p id="descripcion-producto"></p>
    <label>Precio</label>
    <p id="precio-producto"></p>
    <label>Existencias actuales</label>
    <p id="existencias-producto"></p>
    <label>Unidad de medida</label>
    <p id="und_medida-producto"></p>

    <div style="margin-top: 15px; margin-bottom: 10px">
      <label>¿Cuántas desea comprar?</label>
      <div style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
        <button class="btn-detalle" onclick="cambiarCantidad(-1)">−</button>
        <span id="cantidad-producto">1</span>
        <button class="btn-detalle" onclick="cambiarCantidad(1)">+</button>
      </div>
    </div>
    <button class="btn-finalizar" onclick="agregarProductoAlCarrito()">Agregar al carrito</button>
  </div>
</div>


    <!-- Mensajes de éxito o error -->
    <div id="message" class="success" style="display: none;">
        Producto agregado exitosamente.
    </div>
    <div id="message-error" class="error" style="display: none;">
        Hubo un error al agregar el producto.
    </div>

    <footer class="footer">
        <p>&copy;SENA 2025 </p>
        ☎️ (+57) 320 123 4567
    </footer>

    <!-- Modal del carrito -->
    <div id="modal-carrito" class="modal">
  <div class="modal-content">
    <span class="cerrar-detalles" onclick="cerrarCarrito()">×</span>
    <h2>🛒 Tu Carrito</h2>
    <ul id="lista-carrito"></ul>
    <p id="total-carrito">Total: $0</p>
    <div class="botones-carrito">
  <button class="btn-carrito" onclick="vaciarCarrito()">🗑️ Vaciar Carrito</button>
  <button class="btn-carrito" onclick="finalizarCompra()">✅ Finalizar Pedido</button>
</div>
  </div>
</div>

    <!-- Contenedor oculto para la vista de impresión -->
<div id="factura" style="display:none;">
  <p style="text-align: center;">Fecha: <span id="fecha-factura"></span></p>
  
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <thead>
      <tr>
        <th style="border: 1px solid #000; padding: 8px; text-align: left;">#</th>
        <th style="border: 1px solid #000; padding: 8px; text-align: left;">Producto</th>
        <th style="border: 1px solid #000; padding: 8px; text-align: left;">Precio</th>
        <th style="border: 1px solid #000; padding: 8px; text-align: left;">Cantidad</th>
        <th style="border: 1px solid #000; padding: 8px; text-align: left;">Subtotal</th>
      </tr>
    </thead>
    <tbody id="productos-factura">
      <!-- Los productos se agregarán aquí dinámicamente -->
    </tbody>
  </table>

  <h3 style="text-align: right; margin-top: 20px;">Total: $<span id="total-factura"></span></h3>
</div>

<script src="js/script2.js"></script>
</body>

</html>
