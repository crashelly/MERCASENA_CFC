SELECT 
    ps.subCat_id as id,
    ps.subCat_nombre as subCategoria,
    ps.subCat_precio * ps.subCat_cantidad as precio,
    p.prod_nombre as nombre,
    mv.prodMed_medida as medidaVenta,
    ps.subCat_cantidad as cantidad
    pi.prodImg_ruta as rutaImagen
FROM 
    productos_subcategorias ps 
INNER JOIN 
    productos p ON ps.prod_id = p.prod_id
INNER JOIN 
    productos_medidaventa mv ON ps.prodMed_id = mv.prodMed_id 
INNER JOIN  
	productos_categoria pc on ps.subCat_id = pc.prodCat_id
INNER JOIN 
    productos_imagenes pi ON ps.subCat_id = pi.subCat_id ;

GRANT SELECT ON mercasena.animales TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.animales_estado TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.detalles_usuarios TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.estado_facturas TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.estado_pedido TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.facturas TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.pedidoproductos_estado TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_categoria TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_estado TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_imagenes TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_medidaventa TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_pesoventa TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.productos_subcategorias TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.punto_venta_imagenes TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.punto_venta TO 'cliente'@'localhost';
GRANT SELECT ON mercasena.tipo_usuario TO 'cliente'@'localhost';

FLUSH PRIVILEGES;


GRANT SELECT ON mercasena.pedidoproductos_estado TO 'cliente'@'localhost';
-- Todos los permisos en una base de datos
GRANT ALL PRIVILEGES ON mercasena.pedidos TO 'cliente'@'localhost';
GRANT ALL PRIVILEGES ON mercasena.pedidos_tiene_productos TO 'cliente'@'localhost';
GRANT ALL PRIVILEGES ON mercasena.usuarios TO 'cliente'@'localhost';






    SELECT 
    ps.subCat_id as id,
    ps.subCat_nombre as subCategoria,
    ps.subCat_precio * ps.subCat_cantidad as precio,
    p.prod_nombre as nombre,
    mv.prodMed_medida as medidaVenta,
    pi.prodImg_ruta as rutaImagen,
    ps.subCat_cantidad as cantidad
FROM 
    productos_subcategorias ps 
INNER JOIN 
    productos p ON ps.prod_id = p.prod_id
INNER JOIN 
    productos_medidaventa mv ON ps.prodMed_id = mv.prodMed_id 
INNER JOIN  
	productos_categoria pc on ps.subCat_id = pc.prodCat_id
INNER JOIN 
    productos_imagenes pi ON ps.subCat_id = pi.subCat_id 
WHERE 
    ps.prodCat_id = 9 AND pi.prodImg_miniatura = 1;