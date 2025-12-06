-- Revoke all privileges from the 'cliente' user
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'cliente'@'localhost';

-- Drop the 'cliente' user from the database
DROP USER 'cliente'@'localhost';
-- Revoke all privileges from the 'cliente' user
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'admin'@'localhost';

-- Drop the 'cliente' user from the database
DROP USER 'admin'@'localhost';








-- para borrar lo de arriba 



-- Create the 'cliente' user with SELECT permissions
CREATE USER 'cliente'@'localhost' IDENTIFIED BY '';






-- permisos sobre los procedimientos 
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
GRANT EXECUTE ON PROCEDURE `obtenerUsuarioPorEmail` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `verificarExistenciaCorreo` TO 'cliente'@'localhost';
GRANT EXECUTE ON PROCEDURE `actualizar_pedido` TO 'cliente'@'localhost';
-- permisos
GRANT SELECT ON mercasena.animales TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.animales_estado TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.detalles_usuarios TO 'cliente'@'localhost';
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
-- GRANT SELECT ON mercasena.usuarios TO 'cliente'@'localhost';


-- Create the 'administrador' user with full permissions
CREATE USER 'administrador'@'localhost' IDENTIFIED BY 'admin_password';
GRANT SELECT,INSERT,UPDATE,DELETE  ON mercasena.* TO 'administrador'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;