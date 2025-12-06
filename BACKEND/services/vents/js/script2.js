let carrito = [];
let productoActual = {};
const animalesArray = window.animalesArray || [];
let animalActual = null;
let indiceImagen = 0;
let indiceActual = 0;

function obtenerFechaMySQL() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

function mostrarMensaje(mensaje, exito) {
  const div = document.getElementById(exito ? 'message' : 'message-error');
  div.textContent = mensaje;
  div.style.display = 'block';
  setTimeout(() => { div.style.display = 'none'; }, 3000);
}

function cerrarModal() {
  document.getElementById('modal-detalles').style.display = 'none';
}

function cerrarModalDetalles() {
  document.getElementById('modalFactura').style.display = 'none';
}

window.onclick = function (event) {
  const modalDetalles = document.getElementById("modal-detalles");
  if (event.target == modalDetalles) {
    modalDetalles.style.display = "none";
  }
};

function detalles(id, nombre, descripcion, precio, existencias, und_medida, imagen, variacion = '') {
  productoActual = { id, nombre, variacion, descripcion, precio, cantidad: 1, existencias, und_medida, imagen };
  document.getElementById('titulo-producto').innerText = variacion ? `${nombre} - ${variacion}` : nombre;
  document.getElementById('descripcion-producto').innerText = descripcion;
  document.getElementById('precio-producto').innerText = "$" + precio;
  document.getElementById('existencias-producto').innerText = existencias;
  document.getElementById('und_medida-producto').innerText = und_medida;
  document.getElementById('cantidad-producto').innerText = 1;
  document.getElementById('imagen-producto').src = imagen;
  document.getElementById('imagen-producto').alt = nombre;
  document.getElementById('modal-detalles').style.display = 'block';
}

function cambiarCantidad(valor) {
  productoActual.cantidad += valor;
  if (productoActual.cantidad < 1) productoActual.cantidad = 1;
  document.getElementById('cantidad-producto').innerText = productoActual.cantidad;
}

function agregarProductoAlCarrito() {
  const cantidad = parseInt(document.getElementById('cantidad-producto').innerText);
  const existencias = parseInt(document.getElementById('existencias-producto').innerText);
  const { id, nombre, precio, und_medida } = productoActual;

  if (cantidad > existencias) {
    alert(`No puedes agregar más de ${existencias} unidades.`);
    return;
  }

  const index = carrito.findIndex(p => p.id === id);
  if (index !== -1) {
    if (carrito[index].cantidad + cantidad > existencias) {
      alert(`Ya tienes ${carrito[index].cantidad}. Solo puedes agregar ${existencias - carrito[index].cantidad} más.`);
      return;
    }
    carrito[index].cantidad += cantidad;
  } else {
    carrito.push({ id, nombre, precio, cantidad, und_medida });
  }

  alert(`${nombre} agregado al carrito`);
  cerrarModal();
}

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
      <strong>${producto.nombre}</strong> - $${producto.precio} x ${producto.cantidad} ${producto.und_medida}
      <button class='btn-editar' onclick="editarCantidad(${index})">✏️ Editar</button>
      <button class='btn-eliminar' onclick="eliminarDelCarrito(${index})">🗑️ Eliminar</button>
    `;
    lista.appendChild(item);
  });

  totalElemento.innerText = `Total: $${total}`;
  document.getElementById('modal-carrito').style.display = 'block';
}

function editarCantidad(index) {
  const nuevaCantidad = parseInt(prompt("¿Nueva cantidad?", carrito[index].cantidad));
  if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
    carrito[index].cantidad = nuevaCantidad;
    mostrarCarrito();
  }
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}

function cerrarCarrito() {
  document.getElementById('modal-carrito').style.display = 'none';
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const fecha = obtenerFechaMySQL();
  let total = 0;
  let productosHTML = '';

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    productosHTML += `
      <tr>
        <td style="border:1px solid #000; padding:5px;">${index + 1}</td>
        <td style="border:1px solid #000; padding:5px;">${producto.nombre}</td>
        <td style="border:1px solid #000; padding:5px;">$${producto.precio}</td>
        <td style="border:1px solid #000; padding:5px;">${producto.cantidad}</td>
        <td style="border:1px solid #000; padding:5px;">${producto.und_medida}</td>
        <td style="border:1px solid #000; padding:5px;">$${subtotal}</td>
      </tr>
    `;
  });

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
            <th style="border: 1px solid #000; padding: 6px;">UND MEDIDA.</th>
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

  // Guardar la factura en la base de datos
  fetch('modulos/guardar_factura.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ carrito, total, fecha })
  })
  .then(res => res.text())
  .then(console.log)
  .catch(console.error);

  // Mostrar la factura para imprimir
  const ventana = window.open('', '_blank');
  ventana.document.write(`<html><head><title>Factura</title></head><body>${facturaHTML}</body></html>`);
  ventana.document.close();
  ventana.print();

  vaciarCarrito();
  cerrarCarrito();
}

function mostrarProductos(productosFiltrados) {
  const contenedor = document.getElementById('productos-container');
  contenedor.innerHTML = productosFiltrados.length === 0
    ? "<p>No hay productos disponibles en esta categoría.</p>"
    : productosFiltrados.map(prod => {
      const nombre = prod.nombre.replace(/'/g, "\\'");
      const variacion = (prod.variacion || '').replace(/'/g, "\\'");
      const descripcion = (prod.descripcion || 'Sin descripción').replace(/'/g, "\\'");
      return `
        <div class="card">
          <img src="${prod.imagen}" alt="${prod.nombre}">
          <h3>${prod.nombre}${prod.variacion ? ' - ' + prod.variacion : ''}</h3>
          <strong>$${prod.precio}</strong><br>
          <span>Stock: ${prod.existencias} ${prod.und_medida}</span><br>
          <button onclick="detalles(${prod.id}, '${nombre}', '${descripcion}', ${prod.precio}, ${prod.existencias}, '${prod.und_medida}', '${prod.imagen}', '${variacion}')">Detalles</button>
        </div>
      `;
    }).join('');
}

function mostrarTodosProductos() {
  fetch('modulos/productos.php')
    .then(res => res.json())
    .then(mostrarProductos)
    .catch(console.error);
}

function filtrarProductos(categoria) {
  fetch(`modulos/productos.php?categoria=${encodeURIComponent(categoria)}`)
    .then(res => res.json())
    .then(mostrarProductos)
    .catch(console.error);
}

// Carrusel de imágenes
const imagenes = document.querySelectorAll('.carrusel-imagen');

function mostrarImagen(index) {
  imagenes.forEach((img, i) => {
    img.classList.toggle('activa', i === index);
  });
}

function cambiarImagen(direccion) {
  indiceActual += direccion;
  if (indiceActual < 0) indiceActual = imagenes.length - 1;
  if (indiceActual >= imagenes.length) indiceActual = 0;
  mostrarImagen(indiceActual);
}

// Cambio automático cada 5 segundos
setInterval(() => cambiarImagen(1), 5000);

// Mostrar la primera imagen al cargar
document.addEventListener("DOMContentLoaded", () => {
  mostrarImagen(indiceActual);
});

// Animales (si aplica)
function mostrarDetalles(id) {
  const animal = animalesArray[id];
  if (!animal) return;
  animalActual = animal;

  document.getElementById('titulo-animal').innerText = `${animal.animal} (${animal.raza})`;
  document.getElementById('imagen-animal').src = animal.imagen;
  document.getElementById('raza-animal').innerText = animal.raza;
  document.getElementById('edad-animal').innerText = `${animal.edad} ${animal.unidad_edad}`;
  document.getElementById('estado-salud-animal').innerText = animal.estado_salud;
  document.getElementById('peso-medidas-animal').innerText = animal.peso_medidas;
  document.getElementById('produccion-animal').innerText = animal.produccion;
  document.getElementById('caracteristicas-animal').innerText = animal.caracteristicas;
  document.getElementById('precio-animal').innerText = `$${animal.precio}`;
  document.getElementById('modal-detalles').style.display = 'flex';
}

document.addEventListener("DOMContentLoaded", () => {
  const animalesContainer = document.getElementById('animales-container');
  if (!animalesContainer) return;

  animalesArray.forEach((animal, index) => {
    const card = document.createElement("div");
    card.classList.add("animal-card");

    card.innerHTML = `
      <img src="${animal.imagen}" alt="${animal.animal}">
      <h3>${animal.animal} (${animal.raza})</h3>
      <p><strong>Precio:</strong> $${animal.precio}</p>
      <button onclick="mostrarDetalles(${index})">Detalles</button>
    `;

    animalesContainer.appendChild(card);
  });
});

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
