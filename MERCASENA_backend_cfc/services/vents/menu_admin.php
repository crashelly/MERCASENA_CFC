<?php
include 'modulos/conexion.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <title>Menú Administrador</title>
  <link rel="stylesheet" href="css/styles.css">
  <style>
    .navbar {
      display: flex;
      align-items: center;
      background-color: #56b847;
      padding: 15px 30px;
      color: white;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
      margin-bottom: 20px;
    }

    .navbar h2 {
      margin: 0 auto;
      font-size: 1.5rem;
      user-select: none;
      color: rgb(13, 94, 17);
    }

    .container {
      max-width: 1000px;
      margin: auto;
      padding: 40px 20px;
      text-align: center;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    h1 {
      color: #56b847;
      font-size: 2.5rem;
      margin-bottom: 10px;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    }

    .intro {
      font-size: 1.1rem;
      margin-bottom: 40px;
      color: #56b847;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    .card {
      background-color: rgba(232, 245, 233, 0.9);
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      padding: 30px;
      transition: transform 0.2s;
      color: #56b847;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.25);
    }

    .card h2 {
      margin-bottom: 10px;
      color: #56b847;
      font-weight: 700;
    }

    .card img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      margin-bottom: 15px;
      color: #56b847;
    }

    .card button {
      background-color: #2e7d32;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      margin-top: auto;
      transition: background-color 0.3s;
    }

    .card button:hover {
      background-color: #388e3c;
    }

    .logout-card {
      cursor: pointer;
      user-select: none;
    }

    /* Modal Styles */
    #modalInventario {
      display: none;
      position: fixed;
      z-index: 9999;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.6);
    }

    #modalInventario .modal-content {
      background-color: #fff;
      margin: 10% auto;
      padding: 20px 30px;
      border: 2px solid #56b847;
      border-radius: 12px;
      max-width: 700px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
      text-align: left;
      color: #333;
      font-family: Arial, sans-serif;
    }

    #modalInventario h1,
    #modalInventario h2 {
      color: #56b847;
      margin-bottom: 20px;
      text-align: center;
    }

    #productos-container .producto-row {
      display: flex;
      gap: 15px;
      align-items: center;
      margin-bottom: 15px;
    }

    #productos-container select,
    #productos-container input[type="number"] {
      flex: 1;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 1rem;
      box-sizing: border-box;
      margin: 0;
      width: auto;
    }

    #productos-container button.remove-producto {
      flex-shrink: 0;
      background-color: #d9534f;
      border: none;
      color: white;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 6px;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }

    #productos-container button.remove-producto:hover {
      background-color: #c9302c;
    }

    #agregarProducto {
      background-color: #56b847;
      color: white;
      padding: 10px 18px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      transition: background-color 0.3s ease;
      margin-bottom: 20px;
      display: block;
      width: 100%;
    }

    #agregarProducto:hover {
      background-color: #3e7d30;
    }

    #modalInventario .buttons {
      display: flex;
      justify-content: space-between;
      gap: 15px;
    }

    #modalInventario button[type="submit"] {
      background-color: #56b847;
      color: white;
      padding: 10px 18px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      transition: background-color 0.3s ease;
      flex: 1;
    }

    #modalInventario button[type="submit"]:hover {
      background-color: #3e7d30;
    }

    #modalInventario button.cancel {
      background-color: #ccc;
      color: #333;
      padding: 10px 18px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      transition: background-color 0.3s ease;
      flex: 1;
    }

    #modalInventario button.cancel:hover {
      background-color: #999;
    }
  </style>
</head>

<body>

  <div class="navbar">
    <h2>Pagina Principal - Administradores</h2>
  </div>

  <div class="container">
    <h1>Modulos Administrador</h1>
    <p class="intro">Aquí puedes gestionar usuarios, productos y más.</p>

    <div class="grid">
      <div class="card">
        <img src="https://img.icons8.com/ios-filled/100/145214/user-group-man-man.png" alt="Usuarios">
        <h2>Usuarios</h2>
        <button onclick="window.location.href='usuarios.php'">Ir a Usuarios</button>
      </div>
      <div class="card">
        <img src="https://img.icons8.com/ios-filled/100/145214/shopping-cart.png" alt="Productos">
        <h2>Productos</h2>
        <button onclick="window.location.href='productos.php'">Ir a Productos</button>
      </div>
      <div class="card">
        <img src="https://img.icons8.com/ios-filled/100/145214/tags.png" alt="Categorías">
        <h2>Categorías</h2>
        <button onclick="window.location.href='categorias.php'">Ir a Categorías</button>
      </div>
      <div class="card">
        <img src="https://img.icons8.com/ios-filled/100/145214/bill.png" alt="Facturación">
        <h2>Ventas</h2>
        <button onclick="window.location.href='ventas.php'">Ir a ventas</button>
      </div>
      <div class="card">
        <img src="https://img.icons8.com/ios-filled/100/145214/pets.png" alt="Animales">
        <h2>Ver Animales</h2>
        <button onclick="window.location.href='animales.php'">Ir a Animales</button>
      </div>
      <div class="card logout-card" onclick="window.location.href='#'">
        <img src="https://img.icons8.com/ios-filled/100/145214/package.png" alt="Pedidos">
        <h2>Pedidos</h2>
        <button onclick="window.location.href='#'">Ir a Pedidos</button>
      </div>
      <div class="card logout-card" onclick="window.location.href='auditoria.php'">
        <img src="https://img.icons8.com/ios-filled/100/145214/search--v1.png" alt="Auditorias">
        <h2>Auditorias</h2>
        <button onclick="window.location.href='auditoria.php'">Ir a Auditorias</button>
      </div>
      <div class="card logout-card" onclick="window.location.href='index.php'">
        <img src="https://img.icons8.com/ios-filled/100/145214/exit.png" alt="Cerrar sesión">
        <h2>Cerrar sesión</h2>
      </div>
    </div>
  </div>

  <!-- Modal para inventario múltiple -->
  <div id="modalInventario">
    <div class="modal-content">
      <h1>Bienvenido Administrador</h1>
      <h2>Inventario Productos del Día</h2>
      <form id="formInventario" action="guardar_inventario.php" method="post">
        <div id="productos-container">
          <div class="producto-row" style="margin-bottom: 15px;">
            <select name="productoId[]" required>
              <option value="" disabled selected>Selecciona un producto</option>
              <?php
              // Mostrar nombre del producto y variación
              $query = $conexion->query(
                "SELECT ps.subCat_id, CONCAT(p.prod_nombre, ' - ', ps.subCat_nombre) AS nombre
                 FROM productos_subcategorias ps
                 JOIN productos p ON ps.prod_id = p.prod_id
                 ORDER BY p.prod_nombre, ps.subCat_nombre"
              );
              while ($row = $query->fetch_assoc()) {
                  echo '<option value="'.$row['subCat_id'].'">'.htmlspecialchars($row['nombre']).'</option>';
              }
              ?>
            </select>
            <input type="number" name="cantidadInventario[]" min="0" placeholder="Cantidad" required>
            <button type="button" class="remove-producto">Eliminar</button>
          </div>
        </div>
        <button type="button" id="agregarProducto">+ Agregar otro producto</button>
        <div style="margin-top: 20px;">
          <button type="submit">Guardar inventario</button>
          <button style="margin-top: 20px;" type="button" class="cancel" id="cancelModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>

  <footer style="font-size: 14px;margin-top: auto; text-align: center; padding: 10px; color: white; background-color: #56b847;">
    <p>&copy; SENA 2025</p> ☎️ (+57) 320 123 4567
  </footer>

  <script>
    // Mostrar el modal al cargar la página
    window.onload = function () {
      document.getElementById('modalInventario').style.display = 'block';
    };

    // Cerrar el modal al pulsar "Cancelar"
    document.getElementById('cancelModal').addEventListener('click', function () {
      document.getElementById('modalInventario').style.display = 'none';
    });

    // Opcional: cerrar el modal si se hace clic fuera del contenido
    window.onclick = function (event) {
      const modal = document.getElementById('modalInventario');
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    // Función para eliminar fila
    document.addEventListener('click', function(e) {
      if(e.target.classList.contains('remove-producto')) {
        const row = e.target.closest('.producto-row');
        if(document.querySelectorAll('.producto-row').length > 1) {
          row.remove();
        } else {
          alert('Debe haber al menos un producto.');
        }
      }
    });

    // Función para agregar fila nueva
    document.getElementById('agregarProducto').addEventListener('click', function() {
      const container = document.getElementById('productos-container');
      const newRow = document.querySelector('.producto-row').cloneNode(true);

      // Resetear valores del clon
      newRow.querySelector('select').value = '';
      newRow.querySelector('input').value = '';

      container.appendChild(newRow);
    });

    // Cancelar modal
    document.getElementById('cancelModal').addEventListener('click', function() {
      document.getElementById('modalInventario').style.display = 'none';
    });
  </script>
</body>
</html>
