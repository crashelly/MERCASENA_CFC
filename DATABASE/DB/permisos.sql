

-- permisos sobre los procedimientos  para cliente
GRANT EXECUTE ON PROCEDURE `actualizarContraseña` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizarContraseñaPorCorreo` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizar_usuario` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_detalle_usuario` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_pedido` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_pedido_tiene_productos` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_usuario` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `eliminar_pedido` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `eliminar_pedido_tiene_producto` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `esElPedidoDelUsuario` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerFacInfoPorId` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `ObtenerIdFacturaPorPedido` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerInfoUsuario` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerProductosPorCategoria` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerProductosPorPedido` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerDetallesPedido` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerUsuarioPorEmail` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `verificarExistenciaCorreo` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizar_pedido` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_usuario` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_detalle_usuario` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerPedidoPorUsuario` TO 'cliente'@'localhost';
-- permisos
GRANT SELECT ON mercasena.animales TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.animales_estado TO 'cliente'@'localhost';
GRANT SELECT,INSERT  ON mercasena.detalles_usuarios TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.estado_pedido TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.estado_facturas TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.facturas TO 'cliente'@'localhost';
-- estos son las tablas que el ususario puede hacer crud
GRANT SELECT,INSERT,UPDATE ,DELETE  ON mercasena.pedidos TO 'cliente'@'localhost';
GRANT  SELECT,INSERT,UPDATE ,DELETE  ON mercasena.pedidos_tiene_productos TO 'cliente'@'localhost';
GRANT  SELECT,INSERT,UPDATE ,DELETE  ON mercasena.usuarios  TO 'cliente'@'localhost';

GRANT SELECT ON mercasena.pedidoproductos_estado TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.pedidoproductos_estado TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_categoria TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_estado TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_imagenes TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_medidaventa TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_pesoventa TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_subcategorias TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.punto_venta_imagenes TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.tipo_usuario TO 'cliente'@'localhost';

-- vistas 
GRANT SELECT ON `pseudoid` TO 'cliente'@'localhost';
-- GRANT SELECT ON mercasena.usuarios TO 'cliente'@'localhost';


-- permisos sobre procediminentos para admnisitrador

GRANT SELECT,INSERT,UPDATE,DELETE  ON mercasena.* TO 'administrador'@'localhost';

GRANT EXECUTE ON PROCEDURE `actualizar_estado_pedido` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `analisisPedidos` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizar_producto` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizar_producto_categoria` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizar_producto_imagen` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizar_producto_medidaVenta` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizar_producto_subcategoria` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `analisisProductosINVDiario` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_estado_pedido` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_factura` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_usuario` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_detalle_usuario` TO 'administrador'@'localhost';




GRANT EXECUTE ON PROCEDURE `crear_inventario_diario` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_producto` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_producto_categoria` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_producto_imagen` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `Crear_producto_medidaVenta` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_producto_subcategoria` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `crearFacturaSinPedidoPrevio` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `crear_venta` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `eliminar_estado_pedido` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `eliminar_pedido` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `eliminar_pedido_tiene_producto_admin` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `eliminar_producto` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `eliminar_producto_categoria` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `eliminar_producto_imagen` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `eliminar_producto_medidaVenta` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `eliminar_producto_subcategoria` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerCantVentasHoy` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerDetallesPedido` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerFacInfoPorId` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerInformacionProductoEdicion` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerPedidoPorUsuario` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerProductosPorPedido_admin` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerTotalVendidoHoy` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `recargarInventario` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `extraerIdImagen` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerInfoProductMinInfo` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizarMinStockParaAlerta` TO 'administrador'@'localhost';

GRANT EXECUTE ON PROCEDURE `actualizarEstado_pocasUnidades` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizarEstado_disponible` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizarEstado_agotado` TO 'administrador'@'localhost';

GRANT EXECUTE ON PROCEDURE `ObtenerIdFacturaPorPedido` TO 'administrador'@'localhost';

GRANT EXECUTE ON PROCEDURE `guardarImagenPublicitaria` TO 'administrador'@'localhost';

GRANT EXECUTE ON PROCEDURE `eliminarFotoPuntoVenta` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `obtenerRutaImagenPuntoVenta` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `buscarFacturaPorFecha` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `buscarFacturaPorNombreCliente` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `buscarFacturaPorFechaYUsuario` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizarPuntoVenta` TO 'administrador'@'localhost';
GRANT EXECUTE ON PROCEDURE `agregarTotalGlobal` TO 'administrador'@'localhost';
-- vistas 
GRANT SELECT ON `pseudoid` TO 'administrador'@'localhost';
GRANT SELECT ON `productosAgotadosYbajoStock` TO 'administrador'@'localhost';
GRANT SELECT ON `notificacionesCounter` TO 'administrador'@'localhost';
-- Apply changes
FLUSH PRIVILEGES;