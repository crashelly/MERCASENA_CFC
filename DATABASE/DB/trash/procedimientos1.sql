
DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`cliente`@`localhost` PROCEDURE `actualizarContraseña` (IN `p_user` VARCHAR(255), IN `p_password` TEXT)   BEGIN 
update usuarios 
set usr_contrasena_hash = p_password
WHERE usr_id = p_user;
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `actualizarContraseñaPorCorreo` (IN `correo` TEXT, IN `p_password` TEXT)   BEGIN 
update usuarios 
set usr_contrasena_hash = p_password
WHERE usr_correo  = correo;
END$$

-- CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_detalle_usuario` (IN `p_detUsr_id` INT, IN `p_tipoUsr_id` INT, IN `p_usr_id` VARCHAR(255))   BEGIN
--     UPDATE `mercasena`.`detalles_usuarios` SET 
--         tipoUsr_id = p_tipoUsr_id,
--         usr_id = p_usr_id 
--         WHERE detUsr_id = p_detUsr_id;
--     END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `actualizar_estado_pedido` (IN `p_pedE_id` INT, IN `nuevo_estado` TEXT)   BEGIN
    UPDATE `estado_pedido`
    SET `pedE_estado` = nuevo_estado
    WHERE `pedE_id` = p_pedE_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_pedido` (IN `p_pedi_id` INT, IN `nuevo_preciototal` FLOAT, IN `nuevo_usr_id` INT)   BEGIN
    UPDATE `pedidos`
    SET `pedi_preciototal` = nuevo_preciototal,
        `usr_id` = nuevo_usr_id
    WHERE `pedi_id` = p_pedi_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_pedido_tiene_productos` (IN `p_pedProd_id` INT, IN `nuevo_subCat_id` INT, IN `nuevo_pedi_id` INT, IN `nuevo_precioParcial` FLOAT, IN `nueva_cantidad` FLOAT)   BEGIN
    UPDATE `pedidos_tiene_productos`
    SET `subCat_id` = nuevo_subCat_id,
        `pedi_id` = nuevo_pedi_id,
        `pedProd_precioParcial` = nuevo_precioParcial,
        `pedProd_cantidad` = nueva_cantidad
    WHERE `pedProd_id` = p_pedProd_id;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `actualizar_producto` (IN `p_producto_id` INT, IN `nuevo_nombre` VARCHAR(255))   BEGIN
    UPDATE `mercasena`.`productos`
    SET `prod_nombre` = nuevo_nombre
    WHERE `prod_id` = p_producto_id;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `actualizar_producto_categoria` (IN `id` INT, IN `nueva_categoria` TINYTEXT)   BEGIN
    UPDATE
        `mercasena`.`productos_categoria`
    SET
        `prodCat_categoria` = nueva_categoria
    WHERE
        `prodCat_id` = id ; 
        END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `actualizar_producto_imagen` (IN `p_prodImg_id` INT, IN `p_prodImg_ruta` TEXT, IN `p_subCat_id` INT, IN `p_prodImg_miniatura` TINYINT)   BEGIN
    UPDATE `mercasena`.`productos_imagenes`
    SET
        `prodImg_ruta` = p_prodImg_ruta,
        `subCat_id` = p_subCat_id,
        `prodImg_miniatura` = p_prodImg_miniatura  
    WHERE
        `prodImg_id` = p_prodImg_id;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `actualizar_producto_medidaVenta` (IN `p_prodMed_id` INT, IN `p_medida` TEXT, IN `p_factor` INT)   BEGIN
    UPDATE
        `mercasena`.`productos_MedidaVenta`
    SET
        `prodMed_medida` = p_medida,
        `prodMed_factor` = p_factor
    WHERE
        `prodMed_id` = p_prodMed_id ; END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `actualizar_producto_subcategoria` (IN `p_subCat_id` INT, IN `p_prod_id` INT, IN `p_subCat_nombre` TEXT, IN `p_subCat_existencias` INT, IN `p_subCat_precio` DOUBLE, IN `p_prodMed_id` INT, IN `p_prodCat_id` INT)   BEGIN
    UPDATE `mercasena`.`productos_subcategorias`
    SET
        `prod_id` = p_prod_id,
        `subCat_nombre` = p_subCat_nombre,
        `subCat_existencias` = p_subCat_existencias,
        `subCat_precio` = p_subCat_precio,
        `prodMed_id` = p_prodMed_id,
        `prodCat_id` = p_prodCat_id
    WHERE
        `subCat_id` = p_subCat_id;
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `actualizar_usuario` (IN `id_usuario` VARCHAR(255), IN `p_nombre` TEXT, IN `p_direccion` TEXT, IN `telefono` TEXT, IN `p_nit` TEXT)   begin 
UPDATE usuarios SET
    usr_direccion = p_direccion,
	usr_nombre = p_nombre,
    usr_telefono = telefono,
    NIT = p_nit
    WHERE usr_id = id_usuario;
	
end$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `analisisPedidos` (IN `p_prod_id` INT)   BEGIN 
-- dexclaracion 
DECLARE stock_actual int;

-- asigno el stock actual del producto que busque 
   SELECT subCat_existencias  INTO stock_actual
    FROM productos_subcategorias
    WHERE subCat_id = p_prod_id;
    
    -- actualizo el estados de los productos de los pedidos si la cantidad solicitada es mayor al stock actual 
    UPDATE pedidos_tiene_productos ped_prod
    INNER JOIN pedidos ped ON ped_prod.pedi_id = ped.pedi_id
    SET ped_prod.pedProd_estado = 2,
    ped.pedE_id = 2
    WHERE 
    ped_prod.subCat_id = p_prod_id AND
    ped_prod.pedProd_cantidad > stock_actual;
    
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `analisisProductosINVDiario` (IN `id_prod` INT)   BEGIN
-- dexclaracion 
DECLARE stock_actual int;

-- asigno el stock actual del producto que busque 
   SELECT subCat_existencias  INTO stock_actual
    FROM productos_subcategorias
    WHERE subCat_id = id_prod;
    
    -- actualizo el estados de los productos de los pedidos si la cantidad solicitada es mayor al stock actual 
    UPDATE pedidos_tiene_productos ped_prod
    INNER JOIN pedidos ped 
    SET ped_prod.pedProd_estado = 1,
    ped.pedE_id = 1 
    WHERE 
    ped_prod.subCat_id = id_prod AND
    ped_prod.pedProd_cantidad < stock_actual;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `crearFacturaSinPedidoPrevio` (IN `p_usr_id` VARCHAR(255), IN `fac_precioTotal` FLOAT, IN `pedi_info` TEXT, IN `pedi_id` TEXT, IN `cant_productos_p` INT)   BEGIN
    INSERT INTO `mercasena`.`facturas` (
        `usr_noRegistrado`, `fac_precioTotal`, `pedi_info`,`pedi_id`,`cant_productos`
    ) VALUES (
        p_usr_id,  fac_precioTotal, pedi_info,pedi_id,cant_productos_p
    );
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `crear_detalle_usuario` (IN `p_usr_id` VARCHAR(255))   BEGIN 
        INSERT INTO `mercasena`.`detalles_usuarios`(usr_id ) 
        VALUES(p_usr_id ); 
    END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `crear_estado_pedido` (IN `p_estado` TEXT)   BEGIN
    INSERT INTO `estado_pedido`(`pedE_estado`)
    VALUES(p_estado);
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `crear_factura` (IN `p_usr_id` VARCHAR(45), IN `p_precioTotal` FLOAT, IN `pedi_info` TEXT, IN `pedi_id` TEXT, IN `cant_productos_p` INT)   BEGIN
    INSERT INTO `mercasena`.`facturas` (
        `usr_id`, `fac_precioTotal`, `pedi_info`,`pedi_id`,`cant_productos`
    ) VALUES (
        p_usr_id,  p_precioTotal, pedi_info,pedi_id,cant_productos_p
    );
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `crear_inventario_diario` (IN `p_subCat_id` INT, IN `p_prod_Nombre` TEXT, IN `p_observaciones` TEXT, IN `p_antiguaCantidad` INT, IN `p_nuevaCantidad` INT, IN `p_cantidadTotal` INT)   BEGIN
-- creo lo del inventario_diario
    INSERT INTO inventario_diario (
        subCat_id,
        prod_Nombre,
        invD_observaciones,
        antiguaCantidad,
        nuevaCantidad,
        cantidadTotal
      
    ) VALUES (
        p_subCat_id,
        p_prod_Nombre,
        p_observaciones,
        p_antiguaCantidad,
        p_nuevaCantidad,
        p_cantidadTotal
    );

    -- recargo el inventario con los datos
    CALL recargarInventario( p_subCat_id, p_nuevaCantidad);
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `crear_pedido` (IN `p_preciototal` FLOAT, IN `p_usr_id` VARCHAR(255), IN `p_id` VARCHAR(255))   BEGIN
    INSERT INTO `pedidos`(`pedi_id` ,`pedi_preciototal`, `usr_id`,`pedi_fechaCreacion`)
    VALUES(p_id,p_preciototal, p_usr_id,CURDATE());
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `crear_pedido_tiene_productos` (IN `p_subCat_id` INT, IN `p_pedi_id` VARCHAR(255), IN `p_precioParcial` FLOAT, IN `p_cantidad` FLOAT)   BEGIN
    INSERT INTO `pedidos_tiene_productos`(`subCat_id`, `pedi_id`, `pedProd_precioParcial`, `pedProd_cantidad`)
    VALUES(p_subCat_id, p_pedi_id, p_precioParcial, p_cantidad);
    
   	CALL  analisisPedidos(p_subCat_id);
    
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `crear_producto` (IN `p_nombre` VARCHAR(45))   BEGIN
    INSERT INTO `mercasena`.`productos`(`prod_nombre`)
    VALUES(p_nombre);
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `crear_producto_categoria` (IN `categoria` TINYTEXT)   BEGIN
    INSERT INTO `mercasena`.`productos_categoria`(`prodCat_categoria`)
VALUES(categoria); 
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `crear_producto_imagen` (IN `p_prodImg_ruta` TEXT, IN `p_subCat_id` INT, IN `p_prodImg_miniatura` TINYINT)   BEGIN
    INSERT INTO `mercasena`.`productos_imagenes`(
        `prodImg_ruta`,
        `subCat_id`,
        `prodImg_miniatura`
    )
    VALUES(
        p_prodImg_ruta,
        p_subCat_id,
        p_prodImg_miniatura
    );
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `Crear_producto_medidaVenta` (IN `p_medida` TEXT, IN `p_factor` INT)   BEGIN
    INSERT INTO `mercasena`.`productos_MedidaVenta`(`prodMed_medida`,`prodMed_factor`)
VALUES(p_medida,p_factor) ; END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `crear_producto_subcategoria` (IN `p_prod_id` INT, IN `p_subCat_nombre` TEXT, IN `p_subCat_existencias` INT, IN `p_subCat_precio` DOUBLE, IN `p_prodMed_id` INT, IN `p_prodCat_cantidad` INT, IN `p_prodCat_descripcion` VARCHAR(45), IN `p_prodCat_fechaExpiracion` DATE, IN `p_prodPes_id` INT, IN `p_prodE_id` INT, IN `p_prodCat_id` INT)   BEGIN
    INSERT INTO `mercasena`.`productos_subcategorias`(
        `prod_id`,
        `subCat_nombre`,
        `subCat_existencias`,
        `subCat_precio`,
        `prodMed_id`,
        `prodCat_cantidad`,
        `prodCat_descripcion`,
        `prodCat_fechaExpiracion`,
        `prodPes_id`,
        `prodE_id`,
        `prodCat_id`
    )
    VALUES(
        p_prod_id,
        p_subCat_nombre,
        p_subCat_existencias,
        p_subCat_precio,
        p_prodMed_id,
        p_prodCat_cantidad,
        p_prodCat_descripcion,
        p_prodCat_fechaExpiracion,
        p_prodPes_id,
        p_prodE_id,
        p_prodCat_id
    );
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `crear_usuario` (IN `p_id` VARCHAR(255), IN `p_usr_correo` TEXT, IN `p_clie_nombre` TINYTEXT, IN `p_password` TEXT)   BEGIN
    IF EXISTS (SELECT 1 FROM usuarios WHERE usr_correo = p_usr_correo) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario o correo electrónico ya existe.';
    ELSE
        INSERT INTO `mercasena`.`usuarios` (
            `usr_id`, `usr_correo`, `usr_nombre`, `usr_contrasena_hash`
        ) VALUES (
            p_id, p_usr_correo , p_clie_nombre, p_password
        );
        -- cuando se ingresa un usuario entonces tambien se agrega a la tabla de usuarios 
        CALL  crear_detalle_usuario(p_id);
    END IF;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `crear_venta` (IN `p_fac_id` INT, IN `p_prod_id` INT, IN `p_prod_cant` INT, IN `p_prod_precio` FLOAT)   BEGIN
	DECLARE stock_actual int;
    
    START TRANSACTION;
    
     SELECT subCat_existencias  INTO stock_actual
    FROM productos_subcategorias
    WHERE subCat_id = p_prod_id;
    
    IF stock_actual >= p_prod_cant THEN 
    
    INSERT INTO `ventas` (
        `fac_id`, `prod_id`, `prod_cant`, `prod_precio`
    ) VALUES (
        p_fac_id, p_prod_id, p_prod_cant, p_prod_precio
    );
    
    UPDATE productos_subcategorias 
    SET subCat_existencias = stock_actual - p_prod_cant
    WHERE subCat_id = p_prod_id;
    
   	CALL  analisisPedidos(p_prod_id);
    
    COMMIT;
    ELSE 
    ROLLBACK;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'no se pudo guardar la venta ya que la cantidad solicitada supero las existencias actuales del inventario';
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_detalle_usuario` (IN `p_detUsr_id` INT)   BEGIN DELETE FROM `mercasena`.`detalles_usuarios` WHERE detUsr_id = p_detUsr_id;
    END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `eliminar_estado_pedido` (IN `p_pedE_id` INT)   BEGIN
    DELETE FROM `estado_pedido`
    WHERE `pedE_id` = p_pedE_id;
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `eliminar_pedido` (IN `p_pedi_id` TEXT)   BEGIN
    DELETE FROM `pedidos`
    WHERE `pedi_id` = p_pedi_id;
END$$
CREATE DEFINER=`administrador`@`localhost` PROCEDURE `eliminar_pedido_admin` (IN `p_pedi_id` TEXT)   BEGIN
    DELETE FROM `pedidos`
    WHERE `pedi_id` = p_pedi_id;
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `eliminar_pedido_tiene_producto` (IN `p_pedProd_id` INT)   BEGIN
    DELETE FROM `pedidos_tiene_productos`
    WHERE `pedProd_id` = p_pedProd_id;
END$$
CREATE DEFINER=`administrador`@`localhost` PROCEDURE `eliminar_pedido_tiene_producto_admin` (IN `p_pedProd_id` INT)   BEGIN
    DELETE FROM `pedidos_tiene_productos`
    WHERE `pedProd_id` = p_pedProd_id;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `eliminar_producto` (IN `p_producto_id` INT)   BEGIN
    DELETE FROM `mercasena`.`productos`
    WHERE `prod_id` = p_producto_id;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `eliminar_producto_categoria` (IN `p_prodCat_id` INT(11))   BEGIN
    DELETE FROM `mercasena`.`productos_categoria` WHERE prodCat_id = p_prodCat_id ;

END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `eliminar_producto_imagen` (IN `p_prodImg_id` INT)   BEGIN
    DELETE FROM `mercasena`.`productos_imagenes`
    WHERE `prodImg_id` = p_prodImg_id;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `eliminar_producto_medidaVenta` (IN `p_prodMed_id` INT)   BEGIN
    DELETE
FROM
    `mercasena`.`productos_MedidaVenta`
WHERE
    `prodMed_id` = p_prodMed_id ; END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `eliminar_producto_subcategoria` (IN `p_subCat_id` INT)   BEGIN
    DELETE FROM `mercasena`.`productos_subcategorias`
    WHERE `subCat_id` = p_subCat_id;
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `esElPedidoDelUsuario` (IN `p_orderID` VARCHAR(255), IN `p_usrID` VARCHAR(255))   BEGIN 
SELECT * FROM pedidos WHERE pedi_id = p_orderID AND usr_id = p_usrID;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `obtenerCantVentasHoy` (IN `fecha` DATE)   BEGIN
select count(*)  as cantidad  from  facturas  where fac_fechaBusqueda  = fecha;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `obtenerDetallesPedido` (IN `pediIDParam` TEXT)   BEGIN
    SELECT
        p.pedi_id AS id,
        ep.pedE_id AS estadoId,
        u.usr_nombre AS usuario,
        u.usr_telefono AS usuarioTelefono,
        u.usr_correo AS usuarioEmail,
        u.usr_direccion AS usuarioDireccion,
        u.NIT AS nit,
        ep.pedE_estado AS estado,
        p.pedi_precioTotal AS precioTotal,
        p.pedi_fechaHora AS fechaHoraPedido
    FROM
        pedidos p
    INNER JOIN usuarios u ON
        p.usr_id = u.usr_id
    INNER JOIN estado_pedido ep ON
        p.pedE_id = ep.pedE_id
    WHERE p.pedi_id = pediIDParam;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `obtenerFacInfoPorId_admin` (IN `id` INT)   BEGIN 
select * from facturas where fac_id = id;
END$$
CREATE DEFINER=`cliente`@`localhost` PROCEDURE `obtenerFacInfoPorId` (IN `id` INT)   BEGIN 
select * from facturas where fac_id = id;
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `ObtenerIdFacturaPorPedido` (IN `pedido_id` TEXT)   BEGIN 
 select fac_id  as id  from facturas where pedi_id = pedido_id;
 END$$
CREATE DEFINER=`administrador`@`localhost` PROCEDURE `ObtenerIdFacturaPorPedido_admin` (IN `pedido_id` TEXT)   BEGIN 
 select fac_id  as id  from facturas where pedi_id = pedido_id;
 END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `obtenerInformacionProductoEdicion` (IN `p_id_prod` INT)   BEGIN
SELECT 
ps.subCat_id as id,
ps.prodCat_id as categoria ,
ps.subCat_precio as precio ,
ps.prodMed_id as medida,
ps.subCat_nombre as variacion,
ps.prod_id as prod_id,
ps.subCat_existencias as existencias,
pi.prodImg_ruta as rutaImagen
 FROM productos_subcategorias ps
 INNER JOIN  productos_imagenes pi ON ps.subCat_id = pi.subCat_id 
         WHERE ps.subCat_id = p_id_prod;
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `obtenerInfoUsuario` (IN `p_id_usuario` VARCHAR(255))   BEGIN 
SELECT usr_nombre as nombre ,usr_telefono as telefono , usr_direccion as direccion , NIT as nit FROM usuarios WHERE usr_id = p_id_usuario LIMIT 1;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `obtenerPedidoPorUsuario` (IN `p_usr_id` VARCHAR(255))   BEGIN 
SELECT p.pedi_id as id , ep.pedE_id as estadoId , ep.pedE_estado as estado,p.pedi_precioTotal as precioTotal, p.pedi_fechaHora as fechaHoraPedido FROM pedidos p 
                        INNER JOIN usuarios u ON p.usr_id = u.usr_id
                        INNER JOIN estado_pedido ep ON p.pedE_id= ep.pedE_id

                        WHERE p.usr_id = p_usr_id  ORDER BY pedi_fechaHora ASC;
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `obtenerProductosPorCategoria` (IN `p_cat` INT)   BEGIN 

SELECT 
     ps.subCat_id as id,
     ps.subCat_nombre as subCategoria,
     ps.subCat_precio * ps.prodCat_Cantidad as precio,
    p.prod_nombre as nombre,
     mv.prodMed_medida as medidaVenta,
     pi.prodImg_ruta as rutaImagen,
     ps.prodCat_Cantidad as cantidad

 FROM 
     productos_subcategorias ps 
 INNER JOIN 
     productos p ON ps.prod_id = p.prod_id
 INNER JOIN 
     productos_medidaventa mv ON ps.prodMed_id = mv.prodMed_id 
 INNER JOIN  
 	productos_categoria pc on ps.prodCat_id = pc.prodCat_id
 INNER JOIN 
     productos_imagenes pi ON ps.subCat_id = pi.subCat_id 
 WHERE 
     ps.prodCat_id = p_cat  AND  pi.prodImg_miniatura = 1;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `obtenerProductosPorPedido_admin` (IN `pedi_i_p` VARCHAR(255))   BEGIN 
SELECT pp.pedProd_estado as estado, p.prod_nombre as nombre , 
pi.prodImg_ruta as imagen ,
ps.subCat_nombre as variante , pm.prodMed_medida as medida , pp.pedProd_cantidad as cantidad , pp.pedProd_precioParcial as precioParcialProducto
                    FROM pedidos_tiene_productos pp
                    INNER JOIN productos_subcategorias ps ON pp.subCat_id =ps.subCat_id
                    INNER JOIN productos p ON ps.prod_id = p.prod_id
                    INNER JOIN productos_medidaventa pm ON ps.prodMed_id =  pm.prodMed_id
                    INNER JOIN pedidoproductos_estado pee ON pp.pedProd_estado = pee.pedProdE_id
                    INNER JOIN productos_imagenes pi  ON ps.subCat_id = pi.subCat_id 
                    WHERE  pedi_id = pedi_i_p;

END$$
CREATE DEFINER=`cliente`@`localhost` PROCEDURE `obtenerProductosPorPedido` (IN `pedi_i_p` VARCHAR(255))   BEGIN 
SELECT pp.pedProd_estado as estado, p.prod_nombre as nombre , 
pi.prodImg_ruta as imagen ,
ps.subCat_nombre as variante , pm.prodMed_medida as medida , pp.pedProd_cantidad as cantidad , pp.pedProd_precioParcial as precioParcialProducto
                    FROM pedidos_tiene_productos pp
                    INNER JOIN productos_subcategorias ps ON pp.subCat_id =ps.subCat_id
                    INNER JOIN productos p ON ps.prod_id = p.prod_id
                    INNER JOIN productos_medidaventa pm ON ps.prodMed_id =  pm.prodMed_id
                    INNER JOIN pedidoproductos_estado pee ON pp.pedProd_estado = pee.pedProdE_id
                    INNER JOIN productos_imagenes pi  ON ps.subCat_id = pi.subCat_id 
                    WHERE  pedi_id = pedi_i_p;

END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `obtenerTotalVendidoHoy` (IN `fecha` TINYTEXT)   BEGIN 
SELECT SUM(fac_precioTotal) as totalVendidoHoy from facturas where fac_fechaBusqueda = fecha;
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `obtenerUsuarioPorEmail` (IN `userEmail` VARCHAR(255))   BEGIN 
   SELECT du.tipoUsr_id as permiso , u.usr_id as userId , u.usr_correo as email, u.usr_nombre as name   FROM usuarios u
INNER JOIN detalles_usuarios du ON u.usr_id = du.usr_id
 WHERE usr_correo = userEmail;
END$$

CREATE DEFINER=`administrador`@`localhost` PROCEDURE `recargarInventario` (IN `prod_id` INT, IN `nuevasExistencias` INT)   BEGIN 
DECLARE antiguas_existencias int  ;
SELECT subCat_existencias INTO  antiguas_existencias from productos_subcategorias where subCat_id = prod_id;

UPDATE productos_subcategorias 
SET subCat_existencias = antiguas_existencias + nuevasExistencias
WHERE subCat_id = prod_id;

 CALL analisisProductosINVDiario(prod_id);
END$$

CREATE DEFINER=`cliente`@`localhost` PROCEDURE `verificarExistenciaCorreo` (IN `correo` TEXT)   BEGIN 
select count(*) as verificacion from usuarios where usr_correo = correo;
END$$

DELIMITER ;
