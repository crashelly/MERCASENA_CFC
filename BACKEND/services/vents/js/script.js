function verFactura(idFactura) {
    fetch('detalle_factura.php?id=' + idFactura)
        .then(response => response.text())
        .then(html => {
            document.getElementById('detalleFactura').innerHTML = html;
            document.getElementById('modalFactura').style.display = 'block';
        })
        .catch(err => {
            document.getElementById('detalleFactura').innerHTML = 'Error al cargar los datos.';
        });
}

function cerrarModalDetalles() {
    document.getElementById('modalFactura').style.display = 'none';
}

// Cerrar modal
function cerrarModal() {
  document.getElementById('modal-detalles').style.display = 'none';
}

// Cambiar cantidad desde modal
function cambiarCantidad(valor) {
  productoActual.cantidad += valor;
  if (productoActual.cantidad < 1) productoActual.cantidad = 1;
  document.getElementById('cantidad-producto').innerText = productoActual.cantidad;
}

// Agregar producto al carrito
function agregarProductoAlCarrito() {
  const cantidad = parseInt(document.getElementById('cantidad-producto').innerText);
  const existencias = parseInt(document.getElementById('existencias-producto').innerText);
  const { id, nombre, precio, und_medida } = productoActual;

  // Verificar si la cantidad excede las existencias
  if (cantidad > existencias) {
    alert(`No puedes agregar más de ${existencias} unidades. Verifica el stock disponible.`);
    return; // Detener la función si no hay suficiente stock
  }

  const index = carrito.findIndex(p => p.id === id);
  if (index !== -1) {
    // Verifica que la suma no exceda existencias
    if (carrito[index].cantidad + cantidad > existencias) {
      alert(`Ya tienes ${carrito[index].cantidad} en el carrito. Solo puedes agregar ${existencias - carrito[index].cantidad} más.`);
      return;
    }
    carrito[index].cantidad += cantidad;
  } else {
    carrito.push({ id, nombre, precio, cantidad, und_medida });
  }

  alert(`${nombre} agregado al carrito`);
  cerrarModal();
}


// Mostrar productos
function mostrarProductos(productosFiltrados) {
  const contenedor = document.getElementById('productos-container');
  contenedor.innerHTML = '';

  if (productosFiltrados.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles en esta categoría.</p>";
    return;
  }

  productosFiltrados.forEach(prod => {
    const nombre = prod.nombre.replace(/'/g, "\\'");
    const descripcion = prod.descripcion ? prod.descripcion.replace(/'/g, "\\'") : '';
    const productoHTML = `
      <div class="card">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <strong>$${prod.precio}</strong><br>
        <button onclick="detalles(${prod.id}, '${nombre}', '${descripcion}', ${prod.precio}, ${prod.existencias}, '${prod.und_medida}', '${prod.imagen}')">Detalles</button>
      </div>
    `;
    contenedor.innerHTML += productoHTML;
  });
}

// Mostrar todos los productos
function mostrarTodosProductos() {
  fetch('../facturacion/modulos/productos.php')
    .then(response => response.json())
    .then(productos => {
      mostrarProductos(productos);
    })
    .catch(error => {
      console.error('Error al obtener todos los productos:', error);
    });
}

const animalesArray = window.animalesArray || [];
let animalActual = null;
let indiceImagen = 0;

function cambiarImagen(direccion) {
    const imagenes = document.querySelectorAll('.carrusel-imagen');
    if (imagenes.length === 0) return;
    imagenes[indiceImagen].classList.remove('activa');
    indiceImagen = (indiceImagen + direccion + imagenes.length) % imagenes.length;
    imagenes[indiceImagen].classList.add('activa');
}

setInterval(() => cambiarImagen(1), 3000);

function mostrarDetalles(id) {
    const animal = animalesArray[id];
    if (!animal) return;
    animalActual = animal;
    document.getElementById('titulo-animal').innerText = animal.animal + ' (' + animal.raza + ')';
    document.getElementById('imagen-animal').src = animal.imagen;
    document.getElementById('raza-animal').innerText = animal.raza;
    document.getElementById('edad-animal').innerText = animal.edad + ' ' + animal.unidad_edad;
    document.getElementById('estado-salud-animal').innerText = animal.estado_salud;
    document.getElementById('peso-medidas-animal').innerText = animal.peso_medidas;
    document.getElementById('produccion-animal').innerText = animal.produccion;
    document.getElementById('caracteristicas-animal').innerText = animal.caracteristicas;
    document.getElementById('precio-animal').innerText = '$' + animal.precio;
    document.getElementById('modal-detalles').style.display = 'flex';
}

function abrirMenu() {
    document.getElementById('pantallaDesplegable').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function cerrarMenu() {
    document.getElementById('pantallaDesplegable').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function mostrarCarrito() {
    document.getElementById('modal-carrito').style.display = 'flex';
    actualizarCarrito();
}

function cerrarCarrito() {
    document.getElementById('modal-carrito').style.display = 'none';
}

function agregarAlCarrito() {
    if (!animalActual) return;
    carrito.push(animalActual);
    actualizarCarrito();
    cerrarModal();
    mostrarMensaje('Producto agregado exitosamente.', true);
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = '';
    let total = 0;
    carrito.forEach((item) => {
        total += parseFloat(item.precio);
        const li = document.createElement('li');
        li.textContent = `${item.animal} (${item.raza}) - $${item.precio}`;
        lista.appendChild(li);
    });
    document.getElementById('total-carrito').innerText = 'Total: $' + total.toFixed(2);
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarMensaje('El carrito está vacío.', false);
        return;
    }
    carrito = [];
    actualizarCarrito();
    mostrarMensaje('Compra finalizada exitosamente.', true);
    cerrarCarrito();
}

function mostrarMensaje(mensaje, exito) {
    const div = document.getElementById(exito ? 'message' : 'message-error');
    div.textContent = mensaje;
    div.style.display = 'block';
    setTimeout(() => { div.style.display = 'none'; }, 3000);
}

// Generar las cards dinámicamente
document.addEventListener("DOMContentLoaded", () => {
    const animalesContainer = document.getElementById('animales-container');
    if (!animalesContainer) return;

    animalesArray.forEach((animal, index) => {
        const card = document.createElement("div");
        card.classList.add("animal-card");

        const img = document.createElement("img");
        img.src = animal.imagen;
        img.alt = animal.animal;

        const title = document.createElement("h3");
        title.textContent = `${animal.animal} (${animal.raza})`;

        const price = document.createElement("p");
        price.innerHTML = `<strong>Precio:</strong> $${animal.precio}`;

        const button = document.createElement("button");
        button.textContent = "Detalles";
        button.addEventListener("click", () => mostrarDetalles(index));

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(button);

        animalesContainer.appendChild(card);
    });
});

// Filtrar productos por categoría
function filtrarProductos(categoria) {
  fetch(`../facturacion/modulos/productos.php?categoria=${categoria}`)
    .then(response => response.json())
    .then(productos => {
      mostrarProductos(productos);
    })
    .catch(error => {
      console.error('Error al obtener los productos:', error);
    });
}

// Mostrar carrito
function mostrarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total-carrito');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const item = document.createElement('li');
    item.innerHTML = `
      <strong>${producto.nombre}</strong> - $${producto.precio} x ${producto.cantidad}
      <button class='btn-editar' onclick="editarCantidad(${index})">✏️ Editar</button>
      <button class='btn-eliminar' onclick="eliminarDelCarrito(${index})">🗑️ Eliminar</button>
    `;
    lista.appendChild(item);
  });

  totalElemento.innerText = `Total: $${total}`;
  document.getElementById('modal-carrito').style.display = 'block';
}

// Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}

// Cerrar carrito
function cerrarCarrito() {
  document.getElementById('modal-carrito').style.display = 'none';
}

// Editar cantidad de un producto en el carrito
function editarCantidad(index) {
  const nuevaCantidad = parseInt(prompt("¿Nueva cantidad?", carrito[index].cantidad));
  if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
    carrito[index].cantidad = nuevaCantidad;
    mostrarCarrito();
  }
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
}

// Finalizar compra y generar factura imprimible
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  // Construir tabla con productos
  let productosHTML = '';
  let total = 0;
  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    productosHTML += `
      <tr>
        <td style="border:1px solid #000; padding:5px;">${index + 1}</td>
        <td style="border:1px solid #000; padding:5px;">${producto.nombre}</td>
        <td style="border:1px solid #000; padding:5px;">$${producto.precio}</td>
        <td style="border:1px solid #000; padding:5px;">${producto.cantidad}</td>
        <td style="border:1px solid #000; padding:5px;">$${subtotal}</td>
      </tr>
    `;
  });

  // Fecha de la compra
  function obtenerFechaMySQL() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const fecha = obtenerFechaMySQL();


  // Armar la factura completa
  const facturaHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #000; border: 2px solid #000; max-width: 800px; margin: auto; background-color: #CECBBB;">

  <div style="text-align: center; margin-bottom: 20px;">
    <img src="img/sena.png" alt="SENA" style="height: 80px;">
    <h2 style="margin: 5px 0;">COMERCIALIZADORA DIDÁCTICA</h2>
    <p style="margin: 0;">SERVICIO NACIONAL DE APRENDIZAJE - SENA</p>
    <p style="margin: 0;">REGIONAL CALDAS</p>
    <h3 style="margin: 5px 0;">COMPROBANTE MERCASENA</h3>
  </div>

  <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
    <div>
      <p><strong>FECHA:</strong> ${fecha}</p>
    </div>
    <div>
      <p><strong>COMPROBANTE DE VENTA N°</strong> <span style="border: 1px solid #000; padding: 2px 10px;">${Math.floor(Math.random()*9000)+1000}</span></p>
    </div>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr>
      <td style="border: 1px solid #000; padding: 8px; width: 50%;"><strong>CLIENTE: Juan Andres Jimenez</strong></td>
      <td style="border: 1px solid #000; padding: 8px; width: 50%;"><strong>C.C / NIT: 123456789</strong></td>
    </tr>
    <tr>
      <td style="border: 1px solid #000; padding: 8px;"><strong>DIRECCIÓN: calle viva 106</strong></td>
      <td style="border: 1px solid #000; padding: 8px;"><strong>TELÉFONO / CELULAR: 123 456789</strong></td>
    </tr>
  </table>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <thead>
      <tr style="background: #AFADA1;">
        <th style="border: 1px solid #000; padding: 6px;">PROD.</th>
        <th style="border: 1px solid #000; padding: 6px;">DESCRIPCIÓN</th>
        <th style="border: 1px solid #000; padding: 6px;">Vr. UNIT.</th>
        <th style="border: 1px solid #000; padding: 6px;">CANT.</th>
        <th style="border: 1px solid #000; padding: 6px;">Vr. TOTAL</th>
      </tr>
    </thead>
    <tbody>
      ${productosHTML}
    </tbody>
  </table>

  <div style="display: flex; justify-content: space-between; margin-top: 30px;">
    <p>Recibí: Juan Jimenez</p>
    <h3 style="text-align: right;">TOTAL: $${total}</h3>
  </div>

</div>

  `;

  fetch('../facturacion/modulos/guardar_factura.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    carrito: carrito,
    total: total,
    fecha: fecha
  })
})
.then(response => response.text())
.then(data => {
  console.log("Factura guardada:", data);
})
.catch(error => {
  console.error('Error al guardar factura:', error);
});


  // Mostrar factura en ventana nueva y llamar impresión
  const ventana = window.open('', '_blank');
  ventana.document.write(`<html><head><title>Factura</title></head><body>${facturaHTML}</body></html>`);
  ventana.document.close();
  ventana.print();

  // Vaciar carrito y cerrar modal
  vaciarCarrito();
  cerrarCarrito();
}

function abrirMenu() {
  document.getElementById("pantallaDesplegable").style.width = "250px";
  document.getElementById("overlay").style.display = "block";
}

function cerrarMenu() {
  document.getElementById("pantallaDesplegable").style.width = "0";
  document.getElementById("overlay").style.display = "none";
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
