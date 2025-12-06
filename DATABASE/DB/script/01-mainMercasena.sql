-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 24, 2025 at 05:50 AM
-- Server version: 10.11.10-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u836772000_mercasena`
--
use mercasena;
DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizarContraseña` (IN `p_user` VARCHAR(255), IN `p_password` TEXT)   BEGIN 
update usuarios 
set usr_contrasena_hash = p_password
WHERE usr_id = p_user;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizarContraseñaPorCorreo` (IN `correo` TEXT, IN `p_password` TEXT)   BEGIN 
update usuarios 
set usr_contrasena_hash = p_password
WHERE usr_correo  = correo;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizarEstado_agotado` ()   BEGIN 
-- script queactualiza el estado del productio a agotado
update productos_subcategorias 
-- poniendo el estaod en pocas unidades
SET prodE_id  = 5
where subCat_existencias = 0;

END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizarEstado_disponible` ()   BEGIN 

-- script para devolver los cambios y dejarlo en disponible
update productos_subcategorias 
-- poniendo el estado en pocas unidades
SET prodE_id  = 3

where subCat_existencias >= subCat_minStock;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizarEstado_pocasUnidades` ()   BEGIN 
-- script para cambioart al estado de  cuando queda ocas unidades 
update productos_subcategorias 
-- poniendo el estaod en pocas unidades
SET prodE_id  = 6

where subCat_existencias <= subCat_minStock;

END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizarMinStockParaAlerta` (IN `prod_id` INT, IN `minStock` INT)   BEGIN 


update productos_subcategorias 
SET subCat_minStock  = minStock
WHERE subCat_id = prod_id;

END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizarPuntoVenta` (IN `p_puntVen_ID` INT, IN `nuevo_nombre` TEXT, IN `nuevo_encargado` TEXT, IN `nueva_metaAnual` DOUBLE, IN `nuevo_whatsapp` TEXT, IN `nueva_ubicacion` TEXT, IN `nuevo_centroFormacion` TEXT)   BEGIN
    UPDATE `punto_venta`
    SET 
        `puntVen_nombre` = nuevo_nombre,
        `puntv_encargado` = nuevo_encargado,
        `puntv_metaAnual` = nueva_metaAnual,
        `puntv_whatsapp` = nuevo_whatsapp,
        `puntVent_ubicacion` = nueva_ubicacion,
        `puntv_centroFormacion` = nuevo_centroFormacion
    WHERE `puntVen_ID` = p_puntVen_ID;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizar_estado_pedido` (IN `p_pedE_id` INT, IN `nuevo_estado` TEXT)   BEGIN
    UPDATE `estado_pedido`
    SET `pedE_estado` = nuevo_estado
    WHERE `pedE_id` = p_pedE_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizar_pedido` (IN `p_pedi_id` INT, IN `nuevo_preciototal` FLOAT, IN `nuevo_usr_id` INT)   BEGIN
    UPDATE `pedidos`
    SET `pedi_preciototal` = nuevo_preciototal,
        `usr_id` = nuevo_usr_id
    WHERE `pedi_id` = p_pedi_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizar_pedido_tiene_productos` (IN `p_pedProd_id` INT, IN `nuevo_subCat_id` INT, IN `nuevo_pedi_id` INT, IN `nuevo_precioParcial` FLOAT, IN `nueva_cantidad` FLOAT)   BEGIN
    UPDATE `pedidos_tiene_productos`
    SET `subCat_id` = nuevo_subCat_id,
        `pedi_id` = nuevo_pedi_id,
        `pedProd_precioParcial` = nuevo_precioParcial,
        `pedProd_cantidad` = nueva_cantidad
    WHERE `pedProd_id` = p_pedProd_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizar_producto` (IN `p_producto_id` INT, IN `nuevo_nombre` VARCHAR(255))   BEGIN
    UPDATE `productos`
    SET `prod_nombre` = nuevo_nombre
    WHERE `prod_id` = p_producto_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizar_producto_categoria` (IN `id` INT, IN `nueva_categoria` TINYTEXT)   BEGIN
    UPDATE
      `productos_categoria`
    SET
        `prodCat_categoria` = nueva_categoria
    WHERE
        `prodCat_id` = id ; 
        END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizar_producto_imagen` (IN `p_prodImg_id` INT, IN `p_prodImg_ruta` TEXT, IN `p_prodImg_miniatura` TINYINT)   BEGIN
    UPDATE `productos_imagenes`
    SET
        `prodImg_ruta` = p_prodImg_ruta,
        `prodImg_miniatura` = p_prodImg_miniatura  
    WHERE
        `prodImg_id` = p_prodImg_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizar_producto_medidaVenta` (IN `p_prodMed_id` INT, IN `p_medida` TEXT, IN `p_factor` INT)   BEGIN
    UPDATE
        `productos_medidaventa`
    SET
        `prodMed_medida` = p_medida,
        `prodMed_factor` = p_factor
    WHERE
        `prodMed_id` = p_prodMed_id ; END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizar_producto_subcategoria` (IN `p_subCat_id` INT, IN `p_prod_id` INT, IN `p_subCat_nombre` TEXT, IN `p_subCat_existencias` INT, IN `p_subCat_precio` DOUBLE, IN `p_prodMed_id` INT, IN `p_prodCat_id` INT)   BEGIN
    UPDATE `productos_subcategorias`
    SET
        `prod_id` = p_prod_id,
        `subCat_nombre` = p_subCat_nombre,
        `subCat_existencias` = p_subCat_existencias,
        `subCat_precio` = p_subCat_precio,
        `prodMed_id` = p_prodMed_id,
        `prodCat_id` = p_prodCat_id,
        `subCat_fechaActualizacion` = CURRENT_TIMESTAMP
    WHERE
        `subCat_id` = p_subCat_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `actualizar_usuario` (IN `id_usuario` VARCHAR(255), IN `p_nombre` TEXT, IN `p_direccion` TEXT, IN `telefono` TEXT, IN `p_nit` TEXT)   begin 
UPDATE usuarios SET
    usr_direccion = p_direccion,
	usr_nombre = p_nombre,
    usr_telefono = telefono,
    NIT = p_nit
    WHERE usr_id = id_usuario;
	
end$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `agregarTotalGlobal` (IN `totalPrecio` FLOAT(10,2))   BEGIN
  DECLARE totalVentasGlobal float(10,2);

  -- asigno el stock actual del producto que busque
  SELECT puntVen_totalVentas INTO totalVentasGlobal
  FROM punto_venta
  WHERE `puntVen_ID` = 1;

  UPDATE `punto_venta` SET `puntVen_totalVentas` = totalVentasGlobal + totalPrecio WHERE `punto_venta`.`puntVen_ID` = 1;

END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `analisisPedidos` (IN `p_prod_id` INT)   BEGIN 
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

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `analisisProductosINVDiario` (IN `id_prod` INT)   BEGIN
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
    
    
    -- para hacer que los productos cambien sus estados
    CALL actualizarEstado_disponible();
     CALL actualizarEstado_pocasUnidades();
      CALL actualizarEstado_agotado();
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `buscarFacturaPorFecha` (IN `fac_fecha` DATE)   BEGIN 
SELECT 
    f.fac_id AS id,
    f.fac_fecha AS fecha,
    f.usr_noRegistrado AS clienteNoRegistrado,
    COALESCE(u.usr_nombre, 'No Registrado') AS cliente,
    f.cant_productos AS cantidad,
    f.fac_precioTotal as precioTotal
FROM 
    facturas f
LEFT JOIN 
    usuarios u ON f.usr_id = u.usr_id
WHERE 
    f.fac_fechaBusqueda = fac_fecha
LIMIT 200;

END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `buscarFacturaPorFechaYUsuario` (IN `fac_fecha_p` DATE, IN `usuario` TEXT)   BEGIN 
SELECT f.fac_id as id ,f.fac_fecha as fecha ,f.fac_precioTotal as precioTotal, f.usr_noRegistrado as clienteNoRegistrado, u.usr_nombre, f.cant_productos as cantidad
FROM facturas f
LEFT JOIN usuarios u ON f.usr_id = u.usr_id
WHERE f.fac_fechaBusqueda = fac_fecha_p 
AND (f.usr_noRegistrado LIKE CONCAT('%', usuario, '%') OR u.usr_nombre LIKE CONCAT('%', usuario, '%'))
LIMIT 200;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `buscarFacturaPorNombreCliente` (IN `usuario` TEXT)   BEGIN 
SELECT f.fac_id as id ,f.fac_fecha as fecha ,f.fac_precioTotal as precioTotal ,f.usr_noRegistrado as clienteNoRegistrado, u.usr_nombre, f.cant_productos as cantidad
FROM facturas f
LEFT JOIN usuarios u  ON f.usr_id = u.usr_id
WHERE f.usr_noRegistrado  LIKE  CONCAT('%', usuario, '%') OR
u.usr_nombre LIKE CONCAT('%', usuario, '%')
limit 200; 

END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crearFacturaSinPedidoPrevio` (IN `p_usr_id` VARCHAR(255), IN `fac_precioTotal` FLOAT, IN `pedi_info` TEXT, IN `pedi_id` TEXT, IN `cant_productos_p` INT)   BEGIN
    INSERT INTO `facturas` (
        `usr_noRegistrado`, `fac_precioTotal`, `pedi_info`,`pedi_id`,`cant_productos`
    ) VALUES (
        p_usr_id,  fac_precioTotal, pedi_info,pedi_id,cant_productos_p
    );
    -- ejecucion de agregar eso a las ventas
     CALL agregarTotalGlobal(fac_precioTotal);
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_detalle_usuario` (IN `p_usr_id` VARCHAR(255))   BEGIN 
        INSERT INTO `detalles_usuarios`(usr_id ) 
        VALUES(p_usr_id ); 
    END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_estado_pedido` (IN `p_estado` TEXT)   BEGIN
    INSERT INTO `estado_pedido`(`pedE_estado`)
    VALUES(p_estado);
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_factura` (IN `p_usr_id` VARCHAR(45), IN `p_precioTotal` FLOAT, IN `pedi_info` TEXT, IN `pedi_id` TEXT, IN `cant_productos_p` INT)   BEGIN
    INSERT INTO `facturas` (
        `usr_id`, `fac_precioTotal`, `pedi_info`,`pedi_id`,`cant_productos`
    ) VALUES (
        p_usr_id,  p_precioTotal, pedi_info,pedi_id,cant_productos_p
    );
     CALL agregarTotalGlobal(p_precioTotal);
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_inventario_diario` (IN `p_subCat_id` INT, IN `p_prod_Nombre` TEXT, IN `p_observaciones` TEXT, IN `p_antiguaCantidad` INT, IN `p_nuevaCantidad` INT, IN `p_cantidadTotal` INT)   BEGIN
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

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_pedido` (IN `p_preciototal` FLOAT, IN `p_usr_id` VARCHAR(255), IN `p_id` VARCHAR(255))   BEGIN
DECLARE currentHour DATETIME;
DECLARE currentDateTime TIME;

    DECLARE currentDateTimePlusOneHour DATETIME;
    DECLARE currentTimePlusOneHour TIME;
       SET currentHour = CURTIME();
    -- Get the current date and time
    SET currentDateTime = NOW();
    
    -- Calculate current time plus one hour
    SET currentDateTimePlusOneHour = DATE_ADD(currentDateTime, INTERVAL 1 HOUR);
     SET currentTimePlusOneHour = ADDTIME(currentHour, '01:00:00');

    INSERT INTO `pedidos`(`pedi_id` ,`pedi_preciototal`, `usr_id`,`pedi_fechaCreacion`,`pedi_expiracion`,`pedi_horaExpiracion`)
    VALUES(p_id,p_preciototal, p_usr_id,CURDATE(),currentDateTimePlusOneHour,currentTimePlusOneHour);
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_pedido_tiene_productos` (IN `p_subCat_id` INT, IN `p_pedi_id` VARCHAR(255), IN `p_precioParcial` FLOAT, IN `p_cantidad` FLOAT)   BEGIN
    INSERT INTO `pedidos_tiene_productos`(`subCat_id`, `pedi_id`, `pedProd_precioParcial`, `pedProd_cantidad`)
    VALUES(p_subCat_id, p_pedi_id, p_precioParcial, p_cantidad);
    
   	CALL  analisisPedidos(p_subCat_id);
    
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_producto` (IN `p_nombre` VARCHAR(45))   BEGIN
    INSERT INTO `productos`(`prod_nombre`)
    VALUES(p_nombre);
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_producto_categoria` (IN `categoria` TINYTEXT)   BEGIN
    INSERT INTO `productos_categoria`(`prodCat_categoria`)
VALUES(categoria); 
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_producto_imagen` (IN `p_prodImg_ruta` TEXT, IN `p_subCat_id` INT, IN `p_prodImg_miniatura` TINYINT)   BEGIN
    INSERT INTO `productos_imagenes`(
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

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `Crear_producto_medidaVenta` (IN `p_medida` TEXT, IN `p_factor` INT)   BEGIN
    INSERT INTO `productos_medidaventa`(`prodMed_medida`,`prodMed_factor`)
VALUES(p_medida,p_factor) ; END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_producto_subcategoria` (IN `p_prod_id` INT, IN `p_subCat_nombre` TEXT, IN `p_subCat_existencias` INT, IN `p_subCat_precio` DOUBLE, IN `p_prodMed_id` INT, IN `p_prodCat_cantidad` INT, IN `p_prodCat_descripcion` VARCHAR(45), IN `p_prodCat_fechaExpiracion` DATE, IN `p_prodPes_id` INT, IN `p_prodE_id` INT, IN `p_prodCat_id` INT)   BEGIN
    INSERT INTO `productos_subcategorias`(
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

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_usuario` (IN `p_id` VARCHAR(255), IN `p_usr_correo` TEXT, IN `p_clie_nombre` TINYTEXT, IN `p_password` TEXT)   BEGIN
    IF EXISTS (SELECT 1 FROM usuarios WHERE usr_correo = p_usr_correo) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario o correo electrónico ya existe.';
    ELSE
        -- cuando se ingresa un usuario entonces tambien se agrega a la tabla de usuarios 
         
        INSERT INTO `usuarios` (
            `usr_id`, `usr_correo`, `usr_nombre`, `usr_contrasena_hash`
        ) VALUES (
            p_id, p_usr_correo , p_clie_nombre, p_password
        );
        CALL  crear_detalle_usuario(p_id);
    
    END IF;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `crear_venta` (IN `p_fac_id` INT, IN `p_prod_id` INT, IN `p_prod_cant` INT, IN `p_prod_precio` FLOAT)   BEGIN
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
     -- para hacer que los productos cambien sus estados
 
      CALL actualizarEstado_pocasUnidades();
       CALL actualizarEstado_agotado();
    
    COMMIT;
    ELSE 
    ROLLBACK;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'no se pudo guardar la venta ya que la cantidad solicitada supero las existencias actuales del inventario';
    END IF;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminarFotoPuntoVenta` (IN `ID` INT)   BEGIN
DELETE from punto_venta_imagenes where puntImg_id = ID;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminar_detalle_usuario` (IN `p_detUsr_id` INT)   BEGIN DELETE FROM `mercasena`.`detalles_usuarios` WHERE detUsr_id = p_detUsr_id;
    END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminar_estado_pedido` (IN `p_pedE_id` INT)   BEGIN
    DELETE FROM `estado_pedido`
    WHERE `pedE_id` = p_pedE_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminar_pedido` (IN `p_pedi_id` TEXT)   BEGIN
    DELETE FROM `pedidos`
    WHERE `pedi_id` = p_pedi_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminar_pedido_admin` (IN `p_pedi_id` TEXT)   BEGIN
    DELETE FROM `pedidos`
    WHERE `pedi_id` = p_pedi_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminar_pedido_tiene_producto` (IN `p_pedProd_id` INT)   BEGIN
    DELETE FROM `pedidos_tiene_productos`
    WHERE `pedProd_id` = p_pedProd_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminar_pedido_tiene_producto_admin` (IN `p_pedProd_id` INT)   BEGIN
    DELETE FROM `pedidos_tiene_productos`
    WHERE `pedProd_id` = p_pedProd_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminar_producto` (IN `p_producto_id` INT)   BEGIN
    DELETE FROM `productos`
    WHERE `prod_id` = p_producto_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminar_producto_categoria` (IN `p_prodCat_id` INT(11))   BEGIN
    DELETE FROM `productos_categoria` WHERE prodCat_id = p_prodCat_id ;

END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminar_producto_imagen` (IN `p_prodImg_id` INT)   BEGIN
    DELETE FROM `productos_imagenes`
    WHERE `prodImg_id` = p_prodImg_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminar_producto_medidaVenta` (IN `p_prodMed_id` INT)   BEGIN
    DELETE
FROM
    `productos_medidaventa`
WHERE
    `prodMed_id` = p_prodMed_id ; END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `eliminar_producto_subcategoria` (IN `p_subCat_id` INT)   BEGIN
    DELETE FROM `productos_subcategorias`
    WHERE `subCat_id` = p_subCat_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `esElPedidoDelUsuario` (IN `p_orderID` VARCHAR(255), IN `p_usrID` VARCHAR(255))   BEGIN 
SELECT * FROM pedidos WHERE pedi_id = p_orderID AND usr_id = p_usrID;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `extraerIdImagen` ()   BEGIN
SELECT pi.prodImg_id as id  FROM     `productos_imagenes` pi
INNER JOIN productos_subcategorias ps ON pi.subCat_id = ps.subCat_id ORDER BY ps.subCat_fechaActualizacion DESC LIMIT 1;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `guardarImagenPublicitaria` (IN `ruta` TEXT)   BEGIN
insert into punto_venta_imagenes (puntImg_ruta) VALUES(ruta);
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerCantVentasHoy` (IN `fecha` DATE)   BEGIN
select count(*)  as cantidad  from  facturas  where fac_fechaBusqueda  = fecha;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerDetallesPedido` (IN `pediIDParam` TEXT)   BEGIN
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

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerFacInfoPorId` (IN `id` INT)   BEGIN 
select * from facturas where fac_id = id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerFacInfoPorId_admin` (IN `id` INT)   BEGIN 
select * from facturas where fac_id = id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `ObtenerIdFacturaPorPedido` (IN `pedido_id` TEXT)   BEGIN 
 select fac_id  as id  from facturas where pedi_id = pedido_id;
 END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `ObtenerIdFacturaPorPedido_admin` (IN `pedido_id` TEXT)   BEGIN 
 select fac_id  as id  from facturas where pedi_id = pedido_id;
 END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerInfoProductMinInfo` (IN `prod_id` INT)   BEGIN
select ps.subCat_id  as id , ps.subCat_nombre as variacion , p.prod_nombre as producto , pm.prodMed_medida as medida , ps.subCat_minStock as minimoStock from productos_subcategorias ps 
INNER JOIn productos p ON ps.prod_id = p.prod_id
INNER JOIN productos_medidaventa pm  on ps.prodMed_id = pm.prodMed_id
WHERE ps.subCat_id = prod_id;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerInformacionProductoEdicion` (IN `p_id_prod` INT)   BEGIN
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

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerInfoUsuario` (IN `p_id_usuario` VARCHAR(255))   BEGIN 
SELECT usr_nombre as nombre ,usr_telefono as telefono , usr_direccion as direccion , NIT as nit FROM usuarios WHERE usr_id = p_id_usuario LIMIT 1;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerPedidoPorUsuario` (IN `p_usr_id` VARCHAR(255))   BEGIN 
SELECT p.pedi_id as id , ep.pedE_id as estadoId , ep.pedE_estado as estado,p.pedi_precioTotal as precioTotal, p.pedi_fechaHora as fechaHoraPedido FROM pedidos p 
                        INNER JOIN usuarios u ON p.usr_id = u.usr_id
                        INNER JOIN estado_pedido ep ON p.pedE_id= ep.pedE_id

                        WHERE p.usr_id = p_usr_id  ORDER BY pedi_fechaHora DESC;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerProductosPorCategoria` (IN `p_cat` INT)   BEGIN 

SELECT 
     ps.subCat_id as id,
     ps.subCat_existencias as existencias,
     ps.subCat_nombre as subCategoria,
     ps.subCat_precio * ps.prodCat_Cantidad as precio,
    p.prod_nombre as nombre,
     mv.prodMed_medida as medidaVenta,
     pi.prodImg_ruta as rutaImagen,
     ps.prodCat_Cantidad as cantidad,
       pe.prodE_estado as estado,
    pe.prodE_id as estadoID

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
     INNER JOIN 
	productos_estado pe ON ps.prodE_id = pe.prodE_id
 WHERE 
     ps.prodCat_id = p_cat  AND  pi.prodImg_miniatura = 1 AND ps.subCat_visible = 1;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerProductosPorPedido` (IN `pedi_i_p` VARCHAR(255))   BEGIN 
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

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerProductosPorPedido_admin` (IN `pedi_i_p` VARCHAR(255))   BEGIN 
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

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerRutaImagenPuntoVenta` (IN `ID` INT)   BEGIN
SELECT puntImg_ruta as ruta  from punto_venta_imagenes where puntImg_id = ID; 
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerTotalVendidoHoy` (IN `fecha` TINYTEXT)   BEGIN 
SELECT SUM(fac_precioTotal) as totalVendidoHoy from facturas where fac_fechaBusqueda = fecha;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `obtenerUsuarioPorEmail` (IN `userEmail` VARCHAR(255))   BEGIN 
   SELECT du.tipoUsr_id as permiso , u.usr_id as userId , u.usr_correo as email, u.usr_nombre as name   FROM usuarios u
INNER JOIN detalles_usuarios du ON u.usr_id = du.usr_id
 WHERE usr_correo = userEmail;
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `recargarInventario` (IN `prod_id` INT, IN `nuevasExistencias` INT)   BEGIN 
DECLARE antiguas_existencias int  ;
SELECT subCat_existencias INTO  antiguas_existencias from productos_subcategorias where subCat_id = prod_id;

UPDATE productos_subcategorias 
SET subCat_existencias = antiguas_existencias + nuevasExistencias
WHERE subCat_id = prod_id;

 CALL analisisProductosINVDiario(prod_id);
END$$

CREATE DEFINER=`u836772000_chucho`@`127.0.0.1` PROCEDURE `verificarExistenciaCorreo` (IN `correo` TEXT)   BEGIN 
select count(*) as verificacion from usuarios where usr_correo = correo;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `animales`
--

CREATE TABLE `animales` (
  `ani_id` varchar(255) NOT NULL,
  `ani_raza` mediumtext DEFAULT NULL,
  `ani_tamano` mediumtext DEFAULT NULL,
  `ani_descripcion` longtext DEFAULT NULL,
  `ani_estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `animales_estado`
--

CREATE TABLE `animales_estado` (
  `aniE_id` int(11) NOT NULL,
  `aniE_estado` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `audit_inventario_diario`
--

CREATE TABLE `audit_inventario_diario` (
  `audit_invD_id` int(11) NOT NULL,
  `audit_subCat_id` int(11) NOT NULL,
  `audit_prod_Nombre` int(11) NOT NULL,
  `audit_antiguaCantidad` int(11) NOT NULL,
  `audit_nuevaCantidad` int(11) NOT NULL,
  `audit_cantidadTotal` int(11) NOT NULL,
  `audit_fecha_hora` datetime NOT NULL DEFAULT current_timestamp(),
  `audit_fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `cantidad_pedidos`
-- (See below for the actual view)
--
CREATE TABLE `cantidad_pedidos` (
`cantidad` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `detalles_usuarios`
--

CREATE TABLE `detalles_usuarios` (
  `detUsr_id` int(11) NOT NULL,
  `tipoUsr_id` int(11) DEFAULT 2,
  `usr_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `detalles_usuarios`
--

INSERT INTO `detalles_usuarios` (`detUsr_id`, `tipoUsr_id`, `usr_id`) VALUES
(4, 2, 'user_@sad_68161b54dec5b9.05790676'),
(5, 2, 'user_gude_68161d4d99f868.41078040'),
(6, 3, 'user_colc_68161fc0da9cb6.62445674'),
(7, 2, 'user_il.c_6816b8bdd69937.63435904'),
(8, 2, 'user_ori._6816c1dcc33753.68201660'),
(9, 2, 'user_avin_6817defc478cb0.02435510'),
(10, 2, 'user_il.c_6818b75dc0ff86.65774177'),
(11, 2, 'user_i270_6818b7d18f70d6.09896065'),
(12, 2, 'user_il.c_6818b7fd2be733.25284915'),
(13, 2, 'user_ail._681b69b2c406e9.71526647'),
(14, 2, 'user_@gma_681b6ca274c626.56892170'),
(15, 2, 'user_ison_682365a3af61e0.61268305'),
(16, 2, 'user_l.co_68237519ae2821.70599125'),
(17, 2, 'user_@gma_6824eb002b7ea8.48633040'),
(18, 2, 'user_dro@_6824ec9b69fbb8.89019806'),
(19, 2, 'user_l@gm_6824fd2f639b96.62426789'),
(20, 2, 'user_6@gm_682a519b1aeb78.24661902'),
(21, 2, 'user_.com_682dec5bd5c441.02040337'),
(22, 2, 'user_gmai_683460d02d23b7.39929486'),
(23, 2, 'user_gmai_683f013de0bd12.57775401'),
(24, 2, 'user_ulli_6850034385b7c0.16999860'),
(25, 2, 'user_ison_68501cc697a9a5.28349657'),
(26, 2, 'user_mail_68501e99bc2775.27159032'),
(27, 2, 'user_.com_68503f3f045ba1.91842729'),
(29, 2, 'user_iece_686de4ba0c6eb0.13900546'),
(30, 2, 'o2535s2asdadwaASasdasDAW'),
(31, 2, 'o2535s2asdadwaASas57664dasDAW'),
(32, 2, 'o2535s2asdadwaAnghffsDAW'),
(33, 2, 'o253435asdadwaAnghffsDAW'),
(34, 2, 'o253435asdadaswqdswaAnghffsDAW'),
(35, 2, 'user_l.co_686dea32086e93.60599065'),
(36, 2, 'user_atal_686deab0871765.29503655'),
(37, 2, 'user_l030_687db9e38671c2.04962698'),
(38, 2, 'user_gmai_687e7f7a5486a2.97039125'),
(39, 2, 'user_du.c_687e817bdf8661.23508285'),
(40, 2, 'user_falo_687e81d5549723.23884441'),
(41, 2, 'user_uan1_687e8650e41c86.34789433'),
(42, 2, 'user_y@gm_688046698481f7.02891216');

-- --------------------------------------------------------

--
-- Table structure for table `estado_facturas`
--

CREATE TABLE `estado_facturas` (
  `facE_id` int(11) NOT NULL,
  `facE_estado` tinytext DEFAULT NULL,
  `facE_fechaCreacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estado_pedido`
--

CREATE TABLE `estado_pedido` (
  `pedE_id` int(11) NOT NULL,
  `pedE_estado` text DEFAULT NULL,
  `pedE_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `estado_pedido`
--

INSERT INTO `estado_pedido` (`pedE_id`, `pedE_estado`, `pedE_fechaCreacion`) VALUES
(1, 'Pendiente', '2025-04-23 03:25:41'),
(2, 'Por confirmar', '2025-04-26 23:43:51'),
(3, 'Cancelado\r\n', '2025-04-26 23:44:01'),
(4, 'Guardado', '2025-06-25 12:51:09');

-- --------------------------------------------------------

--
-- Table structure for table `facturas`
--

CREATE TABLE `facturas` (
  `fac_id` int(11) NOT NULL,
  `usr_id` varchar(255) NOT NULL,
  `usr_noRegistrado` text NOT NULL,
  `fac_fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `fac_fechaBusqueda` date NOT NULL DEFAULT current_timestamp(),
  `fac_fechaValidacionSalida` datetime NOT NULL DEFAULT current_timestamp(),
  `fac_fueValidada` boolean NOT NULL DEFAULT 0,
  `fac_precioTotal` float NOT NULL,
  `cant_productos` int(11) NOT NULL,
  `pedi_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `pedi_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `facturas`
--

INSERT INTO `facturas` (`fac_id`, `usr_id`, `usr_noRegistrado`, `fac_fecha`, `fac_fechaBusqueda`, `fac_precioTotal`, `cant_productos`, `pedi_info`, `pedi_id`) VALUES
(1, 'user_6@gm_682a519b1aeb78.24661902', '', '2025-07-19 15:29:10', '2025-07-19', 50000, 2, '[{\"pedidoId\":\"ped_2025-07-19_687bff59960e48.25329352\",\"precioTotal\":50000,\"Usuario\":\"Jesus David Buitrago\",\"encargadoPuntoVenta\":\"Kevin Valencia\",\"fecha\":\"2025-07-19\",\"telefono\":\"3226616834\",\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"129\",\"cantidad\":\"2\",\"name\":\"Kilos -  Cerdo Chamorro\",\"precioUnitario\":\"10000\",\"precio\":\"20000\"},{\"id\":\"130\",\"cantidad\":\"3\",\"name\":\"Kilos -  Cerdo Chuletero\",\"precioUnitario\":\"10000\",\"precio\":\"30000\"}]}]', 'ped_2025-07-19_687bff59960e48.25329352'),
(2, '', 'Yeison Stiven ', '2025-07-19 15:30:07', '2025-07-19', 25000, 1, '[{\"precioTotal\":25576,\"Usuario\":\"Yeison Stiven \",\"encargadoPuntoVenta\":\"Kevin Valencia\",\"fecha\":\"2025-07-19\",\"telefono\":\"3226616834\",\"direccion\":\"\",\"nit\":\"\",\"productos\":[{\"id\":\"145\",\"cantidad\":\"5\",\"name\":\"Unidad -  pasas  \",\"precioUnitario\":\"5000\",\"precio\":\"25000\"}]}]', 'sin pedido ,facturado desde cero'),
(3, 'user_6@gm_682a519b1aeb78.24661902', '', '2025-07-19 15:35:58', '2025-07-19', 6000, 1, '[{\"pedidoId\":\"ped_2025-07-19_687c019de32d16.34645379\",\"precioTotal\":6000,\"Usuario\":\"Jesus David Buitrago\",\"encargadoPuntoVenta\":\"Kevin Valencia\",\"fecha\":\"2025-07-19\",\"telefono\":\"3226616834\",\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"71\",\"cantidad\":\"1\",\"name\":\"Kilos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"6000\"}]}]', 'ped_2025-07-19_687c019de32d16.34645379'),
(4, 'user_6@gm_682a519b1aeb78.24661902', '', '2025-07-19 16:04:38', '2025-07-19', 6000, 1, '[{\"pedidoId\":\"ped_2025-07-19_687c02028e3727.70347703\",\"precioTotal\":6000,\"Usuario\":\"Jesus David Buitrago\",\"encargadoPuntoVenta\":\"Kevin Valencia\",\"fecha\":\"2025-07-19\",\"telefono\":\"3226616834\",\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"71\",\"cantidad\":\"1\",\"name\":\"Kilos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"6000\"}]}]', 'ped_2025-07-19_687c02028e3727.70347703'),
(5, '', 'Daniel Felipe Grajales', '2025-07-19 16:05:41', '2025-07-19', 2000, 1, '[{\"precioTotal\":\"2000\",\"Usuario\":\"Daniel Felipe Grajales\",\"encargadoPuntoVenta\":\"Kevin Valencia\",\"fecha\":\"2025-07-19\",\"telefono\":\"\",\"direccion\":\"Calle 69B # 24-03\",\"nit\":\"\",\"productos\":[{\"id\":\"142\",\"cantidad\":\"1\",\"name\":\"Kilos -  Limones  \",\"precioUnitario\":\"2000\",\"precio\":\"2000\"}]}]', 'sin pedido ,facturado desde cero'),
(6, '', 'Yeison Stiven', '2025-07-19 16:07:01', '2025-07-19', 2000, 1, '[{\"precioTotal\":\"\",\"Usuario\":\"Yeison Stiven\",\"encargadoPuntoVenta\":\"Yeison Stiven Acevedo\",\"fecha\":\"2025-07-19\",\"telefono\":\"3226616834\",\"direccion\":\"Calle 24#23 A 21\",\"nit\":\"\",\"productos\":[{\"id\":\"142\",\"cantidad\":\"1\",\"name\":\"Kilos -  Limones  \",\"precioUnitario\":\"2000\",\"precio\":\"2000\"}]}]', 'sin pedido ,facturado desde cero'),
(7, '', 'Luis Evelio Buitrago', '2025-07-19 16:58:10', '2025-07-19', 400000, 1, '[{\"precioTotal\":\"400000\",\"Usuario\":\"Luis Evelio Buitrago\",\"encargadoPuntoVenta\":\"Yeison Stiven Acevedo\",\"fecha\":\"2025-07-19\",\"telefono\":\"3226616834\",\"direccion\":\"Calle 24#23 A 21\",\"nit\":\"\",\"productos\":[{\"id\":\"143\",\"cantidad\":\"2\",\"name\":\"Cubetas -  Huevos  \",\"precioUnitario\":\"200000\",\"precio\":\"400000\"}]}]', 'sin pedido ,facturado desde cero'),
(8, 'user_6@gm_682a519b1aeb78.24661902', '', '2025-07-19 17:06:51', '2025-07-19', 24000, 3, '[{\"pedidoId\":\"ped_2025-07-20_687c15f1dff5e5.06838849\",\"precioTotal\":24000,\"Usuario\":\"Jesus David Buitrago\",\"encargadoPuntoVenta\":\"Yeison Stiven Acevedo\",\"fecha\":\"2025-07-20\",\"telefono\":\"3226616834\",\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"63\",\"cantidad\":\"3\",\"name\":\"litros -  leche de Vaca\",\"precioUnitario\":\"2000\",\"precio\":\"6000\"},{\"id\":\"71\",\"cantidad\":\"2\",\"name\":\"Kilos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"},{\"id\":\"74\",\"cantidad\":\"2\",\"name\":\"Kilos -  Lulo  \",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]', 'ped_2025-07-20_687c15f1dff5e5.06838849'),
(9, '', 'Daniel Felipe Grajales', '2025-07-22 01:57:51', '2025-07-22', 2000, 1, '[{\"precioTotal\":\"2000\",\"Usuario\":\"Daniel Felipe Grajales\",\"encargadoPuntoVenta\":\"Yeison Stiven Acevedo\",\"fecha\":\"2025-07-22\",\"telefono\":\"3217279967\",\"direccion\":\"\",\"nit\":\"\",\"productos\":[{\"id\":\"72\",\"cantidad\":\"1\",\"name\":\"Kilos -  Feijoa  \",\"precioUnitario\":\"2000\",\"precio\":\"2000\"}]}]', 'sin pedido ,facturado desde cero'),
(10, '', 'Daniel Felipe Grajales', '2025-07-22 02:03:58', '2025-07-22', 10000, 1, '[{\"precioTotal\":\"10000\",\"Usuario\":\"Daniel Felipe Grajales\",\"encargadoPuntoVenta\":\"Yeison Stiven Acevedo\",\"fecha\":\"2025-07-22\",\"telefono\":\"3217279967\",\"direccion\":\"\",\"nit\":\"\",\"productos\":[{\"id\":\"132\",\"cantidad\":\"1\",\"name\":\"Kilos -  Cerdo  Aguja\",\"precioUnitario\":\"10000\",\"precio\":\"10000\"}]}]', 'sin pedido ,facturado desde cero'),
(11, '', 'Jesus David Buitrago Agudelo', '2025-07-22 02:06:47', '2025-07-22', 10000, 1, '[{\"precioTotal\":\"10000\",\"Usuario\":\"Jesus David Buitrago Agudelo\",\"encargadoPuntoVenta\":\"Yeison Stiven Acevedo\",\"fecha\":\"2025-07-22\",\"telefono\":\"3226616834\",\"direccion\":\"Calle busquela cn carrera encuentrela\",\"nit\":\"\",\"productos\":[{\"id\":\"140\",\"cantidad\":\"1\",\"name\":\"Kilos -  Cerdo  Rabo\",\"precioUnitario\":\"10000\",\"precio\":\"10000\"}]}]', 'sin pedido ,facturado desde cero'),
(12, 'user_6@gm_682a519b1aeb78.24661902', '', '2025-07-22 02:07:01', '2025-07-22', 12000, 1, '[{\"pedidoId\":\"ped_2025-07-21_687dae936aaf00.86214619\",\"precioTotal\":12000,\"Usuario\":\"Bertulfio David Buitrago\",\"encargadoPuntoVenta\":\"Yeison Stiven Acevedo\",\"fecha\":\"2025-07-22\",\"telefono\":\"3226616833\",\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"73\",\"cantidad\":\"2\",\"name\":\"Kilos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"}]}]', 'ped_2025-07-21_687dae936aaf00.86214619'),
(13, 'user_6@gm_682a519b1aeb78.24661902', '', '2025-07-22 03:42:16', '2025-07-22', 10000, 1, '[{\"pedidoId\":\"ped_2025-07-21_687dbd6e64ad37.64738056\",\"precioTotal\":10000,\"Usuario\":\"Bertulfio David Buitrago\",\"encargadoPuntoVenta\":\"Yeison Stiven Acevedo\",\"fecha\":\"2025-07-22\",\"telefono\":\"3226616833\",\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"129\",\"cantidad\":\"1\",\"name\":\"Kilos -  Cerdo Chamorro\",\"precioUnitario\":\"10000\",\"precio\":\"10000\"}]}]', 'ped_2025-07-21_687dbd6e64ad37.64738056'),
(14, '', 'Jesus David Buitrago Agudelo', '2025-07-22 03:44:04', '2025-07-22', 134000, 1, '[{\"precioTotal\":\"12000\",\"Usuario\":\"Jesus David Buitrago Agudelo\",\"encargadoPuntoVenta\":\"Yeison Stiven Acevedo\",\"fecha\":\"2025-07-22\",\"telefono\":\"3226616834\",\"direccion\":\"Calle busquela cn carrera encuentrela\",\"nit\":\"\",\"productos\":[{\"id\":\"142\",\"cantidad\":\"6\",\"name\":\"Kilos -  Limones  \",\"precioUnitario\":\"2000\",\"precio\":\"134000\"}]}]', 'sin pedido ,facturado desde cero');

-- --------------------------------------------------------

--
-- Table structure for table `fecha_ventas`
--

CREATE TABLE `fecha_ventas` (
  `ventaF_id` int(11) NOT NULL,
  `vent_id` int(11) NOT NULL,
  `ventaF_fecha` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventario_diario`
--

CREATE TABLE `inventario_diario` (
  `invD_id` int(11) NOT NULL,
  `subCat_id` int(11) NOT NULL,
  `prod_Nombre` text NOT NULL,
  `antiguaCantidad` int(11) NOT NULL,
  `nuevaCantidad` int(11) NOT NULL,
  `cantidadTotal` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `invD_observaciones` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventario_diario`
--

INSERT INTO `inventario_diario` (`invD_id`, `subCat_id`, `prod_Nombre`, `antiguaCantidad`, `nuevaCantidad`, `cantidadTotal`, `fecha_hora`, `fecha`, `invD_observaciones`) VALUES
(3, 74, 'LULO', 12, 12, 24, '2025-06-19 10:59:22', '2025-06-19', 'PRobando el modelo que no funciona'),
(4, 74, '   lulo  ', 24, 6, 30, '2025-06-19 11:00:21', '2025-06-19', 'salieron petardos'),
(5, 74, '   lulo  ', 30, 20, 50, '2025-06-19 11:03:37', '2025-06-19', 'salio todo bien'),
(6, 79, '   Cafe  Arabigo', 2, 20, 22, '2025-06-19 11:05:18', '2025-06-19', 'todo correcto'),
(7, 79, '   Cafe  Arabigo', 20, 5, 25, '2025-06-25 07:23:50', '2025-06-25', 'todo en orden'),
(8, 79, '   Cafe  Arabigo', 20, 5, 25, '2025-06-25 07:24:00', '2025-06-25', 'todo en orden'),
(9, 79, '   Cafe  Arabigo', 30, 5, 35, '2025-06-25 07:27:18', '2025-06-25', 'todo ok'),
(10, 79, '   Cafe  Arabigo', 30, 5, 35, '2025-06-25 07:31:50', '2025-06-25', 'nose'),
(11, 79, '   Cafe  Arabigo', 30, 5, 35, '2025-06-25 07:34:39', '2025-06-25', ''),
(12, 79, '   Cafe  Arabigo', 15, 20, 35, '2025-06-25 07:40:59', '2025-06-25', ''),
(13, 79, '   Cafe  Arabigo', 35, 1, 36, '2025-06-25 07:44:20', '2025-06-25', ''),
(14, 79, '   Cafe  Arabigo', 17, 30, 47, '2025-06-25 07:48:23', '2025-06-25', ''),
(15, 79, '   Cafe  Arabigo', 15, 9, 24, '2025-06-25 08:09:23', '2025-06-25', ''),
(16, 74, '   Lulo  ', 49, 30, 79, '2025-06-29 17:01:08', '2025-06-29', 'Creo que salio'),
(17, 76, '   Tomate  de Aliño', 85, 30, 115, '2025-06-30 18:47:41', '2025-06-30', 'Todo good'),
(18, 75, '   Aguacate  Hass', 0, 10, 10, '2025-06-30 18:48:45', '2025-06-30', 'se recogieron esta mañana'),
(19, 75, '   Aguacate  Hass', 10, 0, 10, '2025-06-30 19:08:43', '2025-06-30', ''),
(20, 73, '   papa  parda', 19, 30, 49, '2025-07-01 08:04:23', '2025-07-01', ''),
(21, 73, '   papa  parda', 0, 3, 3, '2025-07-01 10:32:46', '2025-07-01', ''),
(22, 73, '   papa  parda', 0, 20, 20, '2025-07-05 19:44:25', '2025-07-05', ''),
(23, 131, '   Cerdo  Costillar', 15, 1, 16, '2025-07-05 19:46:14', '2025-07-05', ''),
(24, 138, '   Cerdo  Pierna', 19, 6, 25, '2025-07-06 23:37:41', '2025-07-06', ''),
(25, 136, '   Cerdo  Paletilla', 20, 6, 26, '2025-07-06 23:37:41', '2025-07-06', ''),
(26, 138, '   Cerdo  Pierna', 19, 8, 27, '2025-07-06 23:38:28', '2025-07-06', ''),
(27, 136, '   Cerdo  Paletilla', 20, 8, 28, '2025-07-06 23:38:28', '2025-07-06', ''),
(28, 74, '   Lulo  ', 72, 20, 92, '2025-07-08 11:10:05', '2025-07-08', ''),
(29, 141, '   Cerdo  Solomillo', 20, 10, 30, '2025-07-08 11:10:05', '2025-07-08', ''),
(30, 131, '   Cerdo  Costillar', 0, 10, 10, '2025-07-08 11:10:05', '2025-07-08', ''),
(31, 74, '   Lulo  ', 92, 10, 102, '2025-07-08 23:37:02', '2025-07-08', ''),
(32, 139, '   Cerdo  Pulpa', 0, 1, 1, '2025-07-12 19:30:48', '2025-07-12', ''),
(33, 75, '   Aguacate  Hass', 5, 5, 10, '2025-07-17 23:52:31', '2025-07-17', ''),
(34, 131, '   Cerdo  Costillar', 10, 10, 20, '2025-07-17 23:52:31', '2025-07-17', ''),
(35, 132, '   Cerdo  Aguja', 23, 1, 24, '2025-07-22 03:42:52', '2025-07-22', ''),
(36, 142, '   Limones  ', 4, 2, 6, '2025-07-22 03:43:37', '2025-07-22', '');

-- --------------------------------------------------------

--
-- Stand-in structure for view `notificacionescounter`
-- (See below for the actual view)
--
CREATE TABLE `notificacionescounter` (
`cantidad` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `pedidoproductos_estado`
--

CREATE TABLE `pedidoproductos_estado` (
  `pedProdE_id` int(11) NOT NULL,
  `pedProdE_estado` tinytext NOT NULL,
  `prodPedE_cod` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `pedidoproductos_estado`
--

INSERT INTO `pedidoproductos_estado` (`pedProdE_id`, `pedProdE_estado`, `prodPedE_cod`) VALUES
(1, 'Activo', 'act'),
(2, 'fuera de las existencias', 'out');

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `pedi_id` varchar(255) NOT NULL,
  `pedi_preciototal` float DEFAULT NULL,
  `pedE_id` int(11) NOT NULL DEFAULT 1,
  `pedi_fechaCreacion` date DEFAULT NULL,
  `pedi_expiracion` datetime NOT NULL,
  `pedi_horaExpiracion` time NOT NULL,
  `pedi_fechaHora` datetime NOT NULL DEFAULT current_timestamp(),
  `usr_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`pedi_id`, `pedi_preciototal`, `pedE_id`, `pedi_fechaCreacion`, `pedi_expiracion`, `pedi_horaExpiracion`, `pedi_fechaHora`, `usr_id`) VALUES
('ped_2025-07-20_687c3b6edffb18.12644265', 6000, 1, '2025-07-19', '2025-07-19 20:42:22', '20:42:22', '2025-07-19 19:42:22', 'user_6@gm_682a519b1aeb78.24661902'),
('ped_2025-07-20_687c3bb3ce2413.00402979', 4000, 1, '2025-07-19', '2025-07-19 20:43:31', '20:43:31', '2025-07-19 19:43:31', 'user_6@gm_682a519b1aeb78.24661902'),
('ped_2025-07-20_687c47c167faf9.29587266', 226500, 1, '2025-07-19', '2025-07-19 21:34:57', '21:34:57', '2025-07-19 20:34:57', 'user_6@gm_682a519b1aeb78.24661902'),
('ped_2025-07-21_687dbd48c87f88.76866884', 10000, 1, '2025-07-21', '2025-07-21 05:08:40', '05:08:40', '2025-07-21 04:08:40', 'user_6@gm_682a519b1aeb78.24661902'),
('ped_2025-07-21_687dbd5ab50ac7.84568713', 10000, 1, '2025-07-21', '2025-07-21 05:08:58', '05:08:58', '2025-07-21 04:08:58', 'user_6@gm_682a519b1aeb78.24661902'),
('ped_2025-07-21_687dbd657cd233.18589292', 10000, 1, '2025-07-21', '2025-07-21 05:09:09', '05:09:09', '2025-07-21 04:09:09', 'user_6@gm_682a519b1aeb78.24661902'),
('ped_2025-07-21_687dbf36e47582.37404295', 90000, 1, '2025-07-21', '2025-07-21 05:16:54', '05:16:54', '2025-07-21 04:16:54', 'user_6@gm_682a519b1aeb78.24661902'),
('ped_2025-07-21_687dc038136328.07945840', 43500, 1, '2025-07-21', '2025-07-21 05:21:12', '05:21:12', '2025-07-21 04:21:12', 'user_6@gm_682a519b1aeb78.24661902'),
('ped_2025-07-21_687e81c3ce5c87.55151605', 7000, 1, '2025-07-21', '2025-07-21 19:06:59', '19:06:59', '2025-07-21 18:06:59', 'user_du.c_687e817bdf8661.23508285'),
('ped_2025-07-21_687e8223242c45.24127412', 32000, 1, '2025-07-21', '2025-07-21 19:08:35', '19:08:35', '2025-07-21 18:08:35', 'user_falo_687e81d5549723.23884441'),
('ped_2025-07-21_687e83c4b4f167.78900438', 20000, 1, '2025-07-21', '2025-07-21 19:15:32', '19:15:32', '2025-07-21 18:15:32', 'user_6@gm_682a519b1aeb78.24661902'),
('ped_2025-07-23_688045e1beef37.38645342', 12000, 1, '2025-07-23', '2025-07-23 03:16:01', '03:16:01', '2025-07-23 02:16:01', 'user_6@gm_682a519b1aeb78.24661902'),
('ped_2025-07-23_688046989463a7.82032538', 16000, 1, '2025-07-23', '2025-07-23 03:19:04', '03:19:04', '2025-07-23 02:19:04', 'user_y@gm_688046698481f7.02891216'),
('ped_2025-07-23_6880f53f9a1b44.09925122', 16000, 1, '2025-07-23', '2025-07-23 15:44:15', '15:44:15', '2025-07-23 14:44:15', 'user_du.c_687e817bdf8661.23508285');

-- --------------------------------------------------------

--
-- Table structure for table `pedidos_tiene_productos`
--

CREATE TABLE `pedidos_tiene_productos` (
  `pedProd_id` int(11) NOT NULL,
  `subCat_id` int(11) DEFAULT NULL,
  `pedi_id` varchar(255) DEFAULT NULL,
  `pedProd_precioParcial` float DEFAULT NULL,
  `pedProd_cantidad` float DEFAULT NULL,
  `pedProd_estado` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `pedidos_tiene_productos`
--

INSERT INTO `pedidos_tiene_productos` (`pedProd_id`, `subCat_id`, `pedi_id`, `pedProd_precioParcial`, `pedProd_cantidad`, `pedProd_estado`) VALUES
(2222, 71, 'ped_2025-07-20_687c3b6edffb18.12644265', 6000, 1, 1),
(2223, 63, 'ped_2025-07-20_687c3bb3ce2413.00402979', 4000, 2, 1),
(2224, 127, 'ped_2025-07-20_687c47c167faf9.29587266', 14500, 1, 1),
(2225, 79, 'ped_2025-07-20_687c47c167faf9.29587266', 200000, 2, 1),
(2226, 76, 'ped_2025-07-20_687c47c167faf9.29587266', 12000, 4, 1),
(2228, 129, 'ped_2025-07-21_687dbd48c87f88.76866884', 10000, 1, 1),
(2229, 129, 'ped_2025-07-21_687dbd5ab50ac7.84568713', 10000, 1, 1),
(2230, 129, 'ped_2025-07-21_687dbd657cd233.18589292', 10000, 1, 1),
(2232, 129, 'ped_2025-07-21_687dbf36e47582.37404295', 30000, 3, 1),
(2233, 130, 'ped_2025-07-21_687dbf36e47582.37404295', 30000, 3, 1),
(2234, 132, 'ped_2025-07-21_687dbf36e47582.37404295', 30000, 3, 1),
(2235, 127, 'ped_2025-07-21_687dc038136328.07945840', 43500, 3, 1),
(2236, 72, 'ped_2025-07-21_687e81c3ce5c87.55151605', 4000, 2, 1),
(2237, 74, 'ped_2025-07-21_687e81c3ce5c87.55151605', 3000, 1, 1),
(2238, 72, 'ped_2025-07-21_687e8223242c45.24127412', 14000, 7, 1),
(2239, 74, 'ped_2025-07-21_687e8223242c45.24127412', 18000, 6, 1),
(2240, 133, 'ped_2025-07-21_687e83c4b4f167.78900438', 10000, 1, 1),
(2241, 132, 'ped_2025-07-21_687e83c4b4f167.78900438', 10000, 1, 1),
(2258, 74, 'ped_2025-07-23_688045e1beef37.38645342', 6000, 2, 1),
(2259, 76, 'ped_2025-07-23_688045e1beef37.38645342', 6000, 2, 1),
(2260, 63, 'ped_2025-07-23_688046989463a7.82032538', 4000, 2, 1),
(2261, 71, 'ped_2025-07-23_688046989463a7.82032538', 12000, 2, 1),
(2262, 76, 'ped_2025-07-23_6880f53f9a1b44.09925122', 6000, 2, 1),
(2263, 145, 'ped_2025-07-23_6880f53f9a1b44.09925122', 10000, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `prod_id` int(11) NOT NULL,
  `prod_nombre` varchar(45) DEFAULT NULL,
  `prod_fechaCreacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`prod_id`, `prod_nombre`, `prod_fechaCreacion`) VALUES
(31, 'Frijol', '2025-05-19 07:17:31'),
(32, 'Feijoa', '2025-05-19 07:36:46'),
(33, 'leche', '2025-05-19 07:59:49'),
(34, 'Cafe', '2025-05-19 08:05:49'),
(35, 'Lulo', '2025-05-19 08:18:24'),
(36, 'papa', '2025-05-20 08:20:19'),
(37, 'Aguacate', '2025-05-20 08:35:32'),
(38, 'Tomate', '2025-05-20 08:41:33'),
(39, 'nueces', '2025-05-20 08:45:59'),
(40, 'Huevos', '2025-05-24 18:57:26'),
(48, 'Cerdo', '2025-07-01 10:49:55'),
(50, 'Res', '2025-07-01 10:51:30'),
(51, 'Limones', '2025-07-07 08:59:19'),
(52, 'Galletas', '2025-07-18 02:16:41'),
(53, 'pasas', '2025-07-18 02:19:19');

-- --------------------------------------------------------

--
-- Stand-in structure for view `productosagotadosybajostock`
-- (See below for the actual view)
--
CREATE TABLE `productosagotadosybajostock` (
`producto` varchar(45)
,`variacion` text
,`estado` text
,`estadoID` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `productos_categoria`
--

CREATE TABLE `productos_categoria` (
  `prodCat_id` int(11) NOT NULL,
  `prodCat_fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  `prodCat_categoria` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `productos_categoria`
--

INSERT INTO `productos_categoria` (`prodCat_id`, `prodCat_fechaCreacion`, `prodCat_categoria`) VALUES
(49, '2025-05-05 16:36:12', 'Frutas'),
(50, '2025-05-07 02:17:10', 'Comestibles'),
(51, '2025-05-07 14:00:48', 'lacteos'),
(52, '2025-05-19 12:18:48', 'Granos'),
(53, '2025-05-20 13:40:00', 'Legumbres'),
(55, '2025-06-18 12:44:03', 'Carnicos');

-- --------------------------------------------------------

--
-- Table structure for table `productos_estado`
--

CREATE TABLE `productos_estado` (
  `prodE_id` int(11) NOT NULL,
  `prodE_estado` text DEFAULT NULL,
  `prodE_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `productos_estado`
--

INSERT INTO `productos_estado` (`prodE_id`, `prodE_estado`, `prodE_fechaCreacion`) VALUES
(3, 'Disponible', '2025-03-17 21:56:37'),
(5, 'Agotado', '2025-03-17 22:42:21'),
(6, 'Pocas Unidades', '2025-03-17 22:47:56');

-- --------------------------------------------------------

--
-- Table structure for table `productos_imagenes`
--

CREATE TABLE `productos_imagenes` (
  `prodImg_id` int(11) NOT NULL,
  `prodImg_ruta` text DEFAULT NULL,
  `subCat_id` int(11) DEFAULT NULL,
  `prodImg_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `prodImg_miniatura` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `productos_imagenes`
--

INSERT INTO `productos_imagenes` (`prodImg_id`, `prodImg_ruta`, `subCat_id`, `prodImg_fechaCreacion`, `prodImg_miniatura`) VALUES
(26, '/mercasena/public/images/leche.png', 63, '2025-05-19 13:04:10', 1),
(33, '/mercasena/public/images/frijo.png', 71, '2025-05-20 13:13:27', 1),
(34, '/mercasena/public/images/feijoa.png', 72, '2025-05-20 13:19:34', 1),
(35, '/mercasena/public/images/papas.jpg', 73, '2025-05-20 13:20:53', 1),
(36, '/mercasena/public/images/lulo.png', 74, '2025-05-20 13:22:47', 1),
(37, '/mercasena/public/images/aguacate.jpg', 75, '2025-05-20 13:37:15', 1),
(38, '/mercasena/public/images/tomate.png', 76, '2025-05-20 13:42:35', 1),
(41, '/mercasena/public/images/cafe.png', 79, '2025-05-21 15:16:11', 1),
(57, '/mercasena/public/images/Group 75.png', 127, '2025-07-01 15:40:00', 1),
(59, '/mercasena/public/images/Chamorro.png', 129, '2025-07-01 15:52:24', 1),
(60, '/mercasena/public/images/Chuletero.png', 130, '2025-07-01 16:03:56', 1),
(61, '/mercasena/public/images/Costillar.png', 131, '2025-07-01 16:05:04', 1),
(62, '/mercasena/public/images/Aguja.png', 132, '2025-07-01 16:26:00', 1),
(63, '/mercasena/public/images/Espinazo.png', 133, '2025-07-01 16:30:59', 1),
(64, '/mercasena/public/images/Lomo.png', 134, '2025-07-01 16:33:45', 1),
(65, '/mercasena/public/images/Manitas.png', 135, '2025-07-01 16:34:31', 1),
(66, '/mercasena/public/images/Paletilla.png', 136, '2025-07-01 16:36:34', 1),
(67, '/mercasena/public/images/Pecho.png', 137, '2025-07-01 16:37:34', 1),
(68, '/mercasena/public/images/Pierna.png', 138, '2025-07-01 16:38:21', 1),
(69, '/mercasena/public/images/Pulpa.png', 139, '2025-07-01 16:39:05', 1),
(70, '/mercasena/public/images/Rabo.png', 140, '2025-07-01 16:39:58', 1),
(71, '/mercasena/public/images/Solomillo.png', 141, '2025-07-01 16:40:49', 1),
(72, '/mercasena/public/images/limones.png', 142, '2025-07-07 14:00:27', 1),
(73, '/mercasena/public/images/R.jpg', 143, '2025-07-14 21:58:21', 1),
(75, '/mercasena/public/images/R.jpg', 145, '2025-07-18 07:19:59', 1),
(76, '/mercasena/public/images/IMG_20240228_171420-scaled.jpg', 146, '2025-07-22 03:01:18', 1);

-- --------------------------------------------------------

--
-- Table structure for table `productos_medidaventa`
--

CREATE TABLE `productos_medidaventa` (
  `prodMed_id` int(11) NOT NULL,
  `prodMed_medida` text DEFAULT NULL,
  `prodMed_factor` float NOT NULL DEFAULT 1,
  `prodMed_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `productos_medidaventa`
--

INSERT INTO `productos_medidaventa` (`prodMed_id`, `prodMed_medida`, `prodMed_factor`, `prodMed_fechaCreacion`) VALUES
(1, 'Centesimo', 1, '2025-03-17 23:18:54'),
(4, 'Cubetas', 30, '2025-03-18 20:06:14'),
(6, 'litros', 1, '2025-04-07 00:41:36'),
(13, 'Kilos', 1, '2025-05-05 16:44:27'),
(15, 'Unidad', 1, '2025-07-18 07:16:51');

-- --------------------------------------------------------

--
-- Table structure for table `productos_pesoventa`
--

CREATE TABLE `productos_pesoventa` (
  `prodPes_id` int(11) NOT NULL,
  `prodPes_medida` text DEFAULT NULL,
  `prodPes_fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  `prodPes_numero` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `productos_pesoventa`
--

INSERT INTO `productos_pesoventa` (`prodPes_id`, `prodPes_medida`, `prodPes_fechaCreacion`, `prodPes_numero`) VALUES
(1, 'default', '2025-03-18 00:14:49', 1);

-- --------------------------------------------------------

--
-- Table structure for table `productos_subcategorias`
--

CREATE TABLE `productos_subcategorias` (
  `subCat_id` int(11) NOT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `subCat_nombre` text DEFAULT NULL,
  `subCat_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `subCat_fechaActualizacion` datetime NOT NULL DEFAULT current_timestamp(),
  `subCat_existencias` int(11) NOT NULL,
  `subCat_precio` double NOT NULL,
  `prodMed_id` int(11) NOT NULL,
  `prodCat_cantidad` int(11) NOT NULL,
  `prodCat_descripcion` text DEFAULT NULL,
  `prodCat_fechaExpiracion` date DEFAULT NULL,
  `prodPes_id` int(11) NOT NULL,
  `prodE_id` int(11) NOT NULL,
  `prodCat_id` int(11) NOT NULL,
  `subCat_minStock` int(11) NOT NULL,
  `subCat_visible` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `productos_subcategorias`
--

INSERT INTO `productos_subcategorias` (`subCat_id`, `prod_id`, `subCat_nombre`, `subCat_fechaCreacion`, `subCat_fechaActualizacion`, `subCat_existencias`, `subCat_precio`, `prodMed_id`, `prodCat_cantidad`, `prodCat_descripcion`, `prodCat_fechaExpiracion`, `prodPes_id`, `prodE_id`, `prodCat_id`, `subCat_minStock`, `subCat_visible`) VALUES
(63, 33, 'de Vaca', '2025-05-19 13:03:55', '2025-06-29 19:17:16', 935, 2000, 6, 1, NULL, NULL, 1, 3, 51, 0, 1),
(66, 32, 'nose', '2025-05-19 13:10:13', '2025-06-29 19:17:16', 889, 887897, 4, 1, NULL, NULL, 1, 3, 52, 0, 1),
(71, 31, 'Rojo', '2025-05-20 13:13:12', '2025-06-29 19:17:16', 242, 6000, 13, 1, NULL, NULL, 1, 3, 52, 0, 1),
(72, 32, 'default', '2025-05-20 13:19:19', '2025-06-29 19:40:40', 173, 2000, 13, 1, NULL, NULL, 1, 3, 49, 0, 1),
(73, 36, 'parda', '2025-05-20 13:20:38', '2025-06-29 19:17:16', 17, 6000, 13, 1, NULL, NULL, 1, 3, 49, 15, 1),
(74, 35, 'default', '2025-05-20 13:22:32', '2025-06-29 19:17:16', 99, 3000, 13, 1, NULL, NULL, 1, 3, 49, 0, 1),
(75, 37, 'Hass', '2025-05-20 13:37:01', '2025-06-29 19:17:16', 0, 2000, 13, 1, NULL, NULL, 1, 5, 49, 6, 1),
(76, 38, 'de Aliño', '2025-05-20 13:42:20', '2025-06-29 19:17:16', 110, 3000, 13, 1, NULL, NULL, 1, 3, 53, 100, 1),
(79, 34, 'Arabigo', '2025-05-21 15:15:56', '2025-07-01 10:36:53', 397, 100000, 13, 1, NULL, NULL, 1, 3, 52, 40, 1),
(80, 39, 'default', '2025-05-26 05:12:56', '2025-06-29 19:17:16', 5464, 200000, 13, 1, NULL, NULL, 1, 3, 50, 0, 1),
(81, 38, 'default', '2025-05-26 05:14:58', '2025-06-29 19:17:16', 5464, 200000, 6, 1, NULL, NULL, 1, 3, 51, 0, 1),
(82, 32, 'default', '2025-05-26 05:16:20', '2025-06-29 19:17:16', 5464, 200000, 13, 1, NULL, NULL, 1, 3, 51, 0, 1),
(83, 32, 'default', '2025-05-26 05:17:21', '2025-06-29 19:17:16', 5464, 200000, 13, 1, NULL, NULL, 1, 3, 51, 0, 1),
(84, 32, 'default', '2025-05-26 05:17:58', '2025-06-29 19:17:16', 5464, 200000, 13, 1, NULL, NULL, 1, 3, 51, 0, 1),
(86, 37, 'sd', '2025-06-20 05:07:02', '2025-06-29 19:17:16', 233, 200000, 6, 1, NULL, NULL, 1, 3, 55, 0, 1),
(87, 37, 'sd', '2025-06-20 05:07:34', '2025-06-29 19:17:16', 233, 200000, 6, 1, NULL, NULL, 1, 3, 55, 0, 1),
(89, 36, 'default', '2025-06-20 05:18:17', '2025-06-29 19:17:16', 233, 3500000, 4, 1, NULL, NULL, 1, 3, 53, 0, 1),
(90, 36, 'nose', '2025-06-20 05:22:22', '2025-06-29 19:17:16', 233, 3500000, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(91, 39, 'nose', '2025-06-20 05:27:40', '2025-06-29 19:17:16', 233, 3500000, 13, 1, NULL, NULL, 1, 3, 52, 0, 1),
(92, 39, 'default', '2025-06-20 05:33:55', '2025-06-29 19:17:16', 7, 200000, 13, 1, NULL, NULL, 1, 3, 51, 0, 1),
(93, 37, 'default', '2025-06-20 05:49:43', '2025-06-29 19:17:16', 34234, 234234, 4, 1, NULL, NULL, 1, 3, 55, 0, 1),
(94, 31, 'nose', '2025-06-25 13:58:49', '2025-06-29 19:17:16', 345, 45, 13, 1, NULL, NULL, 1, 3, 53, 0, 1),
(95, 32, 'nose', '2025-06-25 14:01:36', '2025-06-29 19:17:16', 34535, 25345, 13, 1, NULL, NULL, 1, 3, 53, 0, 1),
(96, 32, '34535', '2025-06-25 14:06:37', '2025-06-29 19:17:16', 345345, 354345, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(97, 31, 'default', '2025-06-25 14:11:56', '2025-06-29 19:17:16', 234, 24, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(98, 31, 'default', '2025-06-25 14:14:26', '2025-06-29 19:17:16', 2342, 24234, 6, 1, NULL, NULL, 1, 3, 53, 0, 1),
(99, 31, 'default', '2025-06-25 14:20:01', '2025-06-29 19:17:16', 43434, 343443, 13, 1, NULL, NULL, 1, 3, 53, 0, 1),
(100, 32, 'default', '2025-06-25 14:22:20', '2025-06-29 19:17:16', 234, 234, 6, 1, NULL, NULL, 1, 3, 53, 0, 1),
(101, 32, 'default', '2025-06-25 14:27:10', '2025-06-29 19:17:16', 234, 23242243, 13, 1, NULL, NULL, 1, 3, 53, 0, 1),
(102, 32, 'default', '2025-06-25 14:29:55', '2025-06-29 19:17:16', 2342, 2424, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(103, 40, 'default', '2025-06-25 15:47:54', '2025-06-29 19:17:16', 234, 14500, 4, 1, NULL, NULL, 1, 3, 50, 0, 1),
(104, 31, 'default', '2025-06-25 16:51:06', '2025-06-29 19:17:16', 242, 23423, 13, 1, NULL, NULL, 1, 3, 53, 0, 1),
(105, 31, 'default', '2025-06-25 16:52:12', '2025-06-29 19:17:16', 535, 34535, 13, 1, NULL, NULL, 1, 3, 52, 0, 1),
(106, 33, 'default', '2025-06-25 16:53:43', '2025-06-29 19:17:16', 5646, 46456, 6, 1, NULL, NULL, 1, 3, 53, 0, 1),
(107, 33, 'default', '2025-06-25 16:55:21', '2025-06-29 19:17:16', 567567, 45675675, 13, 1, NULL, NULL, 1, 3, 53, 0, 1),
(108, 31, 'default', '2025-06-25 18:24:30', '2025-06-29 19:17:16', 1321, 3464, 13, 1, NULL, NULL, 1, 3, 53, 0, 1),
(109, 33, 'default', '2025-06-25 19:47:50', '2025-06-29 19:17:16', 234234, 456546, 6, 1, NULL, NULL, 1, 3, 53, 0, 1),
(110, 37, 'default', '2025-06-29 13:06:37', '2025-06-29 19:17:16', 45646, 100000, 4, 1, NULL, NULL, 1, 3, 55, 0, 1),
(111, 37, 'default', '2025-06-29 13:09:31', '2025-06-29 19:17:16', 45353, 200000, 4, 1, NULL, NULL, 1, 3, 55, 0, 1),
(120, 37, 'default', '2025-06-29 20:06:04', '2025-06-29 19:17:16', 345, 3500000, 13, 1, NULL, NULL, 1, 3, 53, 0, 1),
(127, 40, 'Jumbo', '2025-07-01 15:39:44', '2025-07-01 10:39:44', 208, 14500, 4, 1, NULL, NULL, 1, 3, 50, 0, 1),
(129, 48, 'Chamorro', '2025-07-01 15:52:07', '2025-07-01 10:52:07', 4, 10000, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(130, 48, 'Chuletero', '2025-07-01 16:03:41', '2025-07-01 11:03:41', 13, 10000, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(131, 48, 'Costillar', '2025-07-01 16:04:49', '2025-07-01 11:04:49', 3, 10000, 13, 1, NULL, NULL, 1, 6, 55, 15, 1),
(132, 48, 'Aguja', '2025-07-01 16:25:44', '2025-07-01 11:31:39', 24, 10000, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(133, 48, 'Espinazo', '2025-07-01 16:30:44', '2025-07-01 11:30:44', 19, 10000, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(134, 48, 'Lomo', '2025-07-01 16:33:29', '2025-07-01 11:33:29', 20, 10000, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(135, 48, 'Manitas', '2025-07-01 16:34:15', '2025-07-01 11:34:15', 20, 10000, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(136, 48, 'Paletilla', '2025-07-01 16:36:18', '2025-07-01 11:36:18', 34, 10000, 13, 1, NULL, NULL, 1, 3, 55, 30, 1),
(137, 48, 'Pecho', '2025-07-01 16:37:18', '2025-07-01 11:41:02', 20, 10000, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(138, 48, 'Pierna', '2025-07-01 16:38:04', '2025-07-01 11:38:04', 32, 10000, 13, 1, NULL, NULL, 1, 3, 55, 30, 1),
(139, 48, 'Pulpa', '2025-07-01 16:38:49', '2025-07-01 11:38:49', 1, 10000, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(140, 48, 'Rabo', '2025-07-01 16:39:41', '2025-07-01 11:41:12', 19, 10000, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(141, 48, 'Solomillo', '2025-07-01 16:40:34', '2025-07-01 11:40:34', 29, 10000, 13, 1, NULL, NULL, 1, 3, 55, 0, 1),
(142, 51, 'default', '2025-07-07 14:00:11', '2025-07-07 09:00:11', 0, 2000, 13, 1, NULL, NULL, 1, 5, 53, 5, 1),
(143, 40, 'default', '2025-07-14 21:58:06', '2025-07-18 02:15:38', 53, 200000, 4, 1, NULL, NULL, 1, 3, 51, 2, 1),
(145, 53, 'default', '2025-07-18 07:19:42', '2025-07-18 02:19:42', 9, 5000, 15, 1, NULL, NULL, 1, 3, 50, 0, 1),
(146, 40, 'default', '2025-07-22 03:01:02', '2025-07-22 03:01:02', 9, 5000, 4, 1, NULL, NULL, 1, 3, 53, 0, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `pseudoid`
-- (See below for the actual view)
--
CREATE TABLE `pseudoid` (
`id` bigint(12)
);

-- --------------------------------------------------------

--
-- Table structure for table `punto_venta`
--

CREATE TABLE `punto_venta` (
  `puntVen_ID` int(11) NOT NULL,
  `puntVen_nombre` text NOT NULL,
  `puntv_encargado` text NOT NULL,
  `puntv_metaAnual` double NOT NULL,
  `puntVen_totalVentas` double NOT NULL,
  `puntv_whatsapp` text NOT NULL,
  `puntv_progreso` double NOT NULL,
  `puntVent_ubicacion` text NOT NULL,
  `puntv_centroFormacion` text NOT NULL,
  `punt_photo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `punto_venta`
--

INSERT INTO `punto_venta` (`puntVen_ID`, `puntVen_nombre`, `puntv_encargado`, `puntv_metaAnual`, `puntVen_totalVentas`, `puntv_whatsapp`, `puntv_progreso`, `puntVent_ubicacion`, `puntv_centroFormacion`, `punt_photo`) VALUES
(1, 'Regional Caldas', 'Heber', 1600000, 691000, '3116153846', 9762000, 'Manizales, Caldas', 'Centro para la Formacion Cafetera', '');

-- --------------------------------------------------------

--
-- Table structure for table `punto_venta_imagenes`
--

CREATE TABLE `punto_venta_imagenes` (
  `puntImg_id` int(11) NOT NULL,
  `puntImg_ruta` text NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `punto_venta_imagenes`
--

INSERT INTO `punto_venta_imagenes` (`puntImg_id`, `puntImg_ruta`, `fecha_creacion`) VALUES
(6, '/public/assets/banner/images/oferta_1.png', '2025-06-20 00:55:12'),
(28, '/public/assets/banner/images/ChatGPT Image 7 jul 2025, 08_24_06.png', '2025-07-07 00:21:22'),
(29, '/public/assets/banner/images/grupomerc.png', '2025-07-07 00:29:19'),
(30, '/public/assets/banner/images/Promoción de Bananas y Lulos.png', '2025-07-07 08:57:55'),
(33, '/public/assets/banner/images/puntodeventa.jpg', '2025-07-23 14:43:12');

-- --------------------------------------------------------

--
-- Table structure for table `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `tipoUsr_id` int(11) NOT NULL,
  `tipoUsr_tipo` enum('admin','auditor','proveedor','cliente','invitado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`tipoUsr_id`, `tipoUsr_tipo`) VALUES
(1, 'invitado'),
(2, 'cliente'),
(3, 'admin'),
(4, 'proveedor'),
(5, 'auditor');

-- --------------------------------------------------------

--
-- Stand-in structure for view `todainformacionsobreproductos`
-- (See below for the actual view)
--
CREATE TABLE `todainformacionsobreproductos` (
`productoID` int(11)
,`productoPadreID` int(11)
,`estadoID` int(11)
,`categoriaID` int(11)
,`medidaID` int(11)
,`variacion` text
,`existencias` int(11)
,`precio` double
,`descripcion` text
,`categoria` tinytext
,`fechaCreacion` timestamp
,`producto` varchar(45)
,`medidaVenta` text
,`estado` text
,`imagen` text
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ultimoidporfecha`
-- (See below for the actual view)
--
CREATE TABLE `ultimoidporfecha` (
`id` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `usr_id` varchar(255) NOT NULL,
  `usr_correo` text NOT NULL,
  `usr_nombre` tinytext NOT NULL,
  `usr_direccion` text DEFAULT NULL,
  `usr_telefono` text DEFAULT NULL,
  `usr_imagen` text DEFAULT NULL,
  `usr_fechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `NIT` text DEFAULT NULL,
  `tipoUsr` int(10) DEFAULT NULL,
  `usr_contrasena_hash` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`usr_id`, `usr_correo`, `usr_nombre`, `usr_direccion`, `usr_telefono`, `usr_imagen`, `usr_fechaCreacion`, `NIT`, `tipoUsr`, `usr_contrasena_hash`) VALUES
('o253435asdadaswqdswaAnghffsDAW', 'zapa433t2o@gmail.com ', 'me lo invente tambien', NULL, NULL, NULL, '2025-07-08 23:03:17', NULL, NULL, 'se lo pregunte a la IA'),
('o253435asdadwaAnghffsDAW', 'zapa3t2o@gmail.com ', 'me lo invente tambien', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, 'se lo pregunte a la IA'),
('o2535s2asdadwaAnghffsDAW', 'zapat2o@gmail.com ', 'me lo invente tambien', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, 'se lo pregunte a la IA'),
('o2535s2asdadwaASas57664dasDAW', 'zapato@gmail.com ', 'me lo invente tambien', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, 'se lo pregunte a la IA'),
('o2535s2asdadwaASasdasDAW', 'me lo inventePero mas reenente buenasdo no tan ', 'me lo invente tambien', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, 'se lo pregunte a la IA'),
('oads2', 'me lo invente ', 'me lo invente tambien', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, 'se lo pregunte a la IA'),
('oads2asdadwa', 'me lo inventePero mas difreenente ', 'me lo invente tambien', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, 'se lo pregunte a la IA'),
('oads2asdadwaASasdasDAW', 'me lo inventePero mas difreenente buenasdo no tan ', 'me lo invente tambien', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, 'se lo pregunte a la IA'),
('oads2asdadwaASDAW', 'me lo inventePero mas difreenente bueno no tan ', 'me lo invente tambien', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, 'se lo pregunte a la IA'),
('user_.com_682dec5bd5c441.02040337', 'juan@gmail.com', 'colchonate con la comodidad de la casa', 'calle 123', '1234567890', '', '2025-07-08 00:00:00', '1234567890', NULL, '$2y$10$pSUfWekzwh9yD8hBHWo4N.T2yuLmisdTPG6JgGbT.CUXqTHS58uUS'),
('user_.com_68503f3f045ba1.91842729', 'sofia@gmail.com', 'sad sofia ', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$KxfOz19yGpo2QIR0LXutbuCKQvSUG5exv0i0BgZ0Z49JeekH8mfeO'),
('user_6@gm_682a519b1aeb78.24661902', 'buitragoagudeloj006@gmail.com', 'Jesus David Buitrago', 'Calle31 # 14 a 61 barrio galan', '3226616833', '', '2025-07-08 00:00:00', '', NULL, '$2y$10$un5MaYHcbfYhW1aqJNJtC.qNc4hC0QWceIvf0.VrtwkiZN54ASyhS'),
('user_@gma_681b6ca274c626.56892170', 'dani@gmail.com', 'Daniel Felipe Grajales', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$q.PCEuyTi5CPNejGQNZ8DejJu0YZZPj8arpKw.cDfv6JfF0fayONq'),
('user_@gma_6824eb002b7ea8.48633040', 'yeshua@gmail.com', 'Jesus David Buitrago Agudelo', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$0zvaGgocuOAtBVQOPUkOUuYRJ/cuzhailxC.Xm4UCMC6KILd08DsG'),
('user_@sad_68161b54dec5b9.05790676', 'sa@sad', 'sad', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$X85rE/br8SE74LNxCxfAAupY5.qUXyo9EwkJBQvgXAdcsYDbYH9Ty'),
('user_ail._681b69b2c406e9.71526647', 'carlos@gmail.com', 'Carlos Andres Loaiza Rendon', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$5D0HEQg6toHaCz2vvBXtzOYpINZHuD6gDvchlAbb1rBcmqV/V/Q.S'),
('user_amor_6863fcb960e795.17832213', 'yamori28@gmail.com', 'Yeison Stiven Acevedo Loaiza', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$3FKD/n9PBYQUwi.zZe/i9.NSZKQC2WnDv76KPemaxllga.Iham4Dq'),
('user_atal_686deab0871765.29503655', 'matalokas300@gmail.com', 'no se se me olvido', NULL, NULL, NULL, '2025-07-08 23:06:08', NULL, NULL, '$2y$10$QwoRiOsE9cRhkBA0bbtX5e0r/M6WxE28zQBVFf.VC8DlHig0SpLIe'),
('user_avin_6817defc478cb0.02435510', 'davinci@gmail.com', 'Leonardo Davinci', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$PRcODT2OK9DqdlVT5r9Qbu1IaF69ybdYa/sqxJyN2yqgt25b1Flnq'),
('user_colc_68161fc0da9cb6.62445674', 'admin@gmail.com', 'Crashelly', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$VozF1hMDkfwpVKk4yCGIp.YVHH8dfI6HSiUXsivZDi.1n6wC3xzfe'),
('user_dro@_6824ec9b69fbb8.89019806', 'alejandro@gmail.com', 'Alejandro Posada', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$U7zw8VnZq/rKkN7dBZeTbOoABjPsX61iKr20U3g1BS8iBErlY7UfO'),
('user_du.c_687e817bdf8661.23508285', 'daniel030693@misena.edu.co', 'Daniel Felipe Grajales Gálvez ', NULL, NULL, NULL, '2025-07-21 18:05:47', NULL, NULL, '$2y$10$hT8g.KAt1XH6jgHA.RVo.eSsQn/3Gbyz9Z4CrRW9l.CUwdoUdwQQa'),
('user_falo_687e81d5549723.23884441', 'rafaloaiza@gmail.com', 'Rafael ', NULL, NULL, NULL, '2025-07-21 18:07:17', NULL, NULL, '$2y$10$W01ARLurH2QOFA9kEAf4M.EesP0iQShrtUG4USdWCGeBLt80o.L3C'),
('user_gmai_683460d02d23b7.39929486', 'adso@gmail.com', 'Alejandro Posada Castaño', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$mRvQVlOZpeJvktxWByf2b.IxYO5DkEqzlNzweApVaV1SG.iwNjMze'),
('user_gmai_683f013de0bd12.57775401', 'salome@gmail.com', 'Salome Rodriguez Rios', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$tiY7a6McRXHxxt1BAz.KLusVAT731Mcisu8XvJHuWpRBlBR3w3K32'),
('user_gmai_686de19f4b4016.52349285', 'buitragoagudeloj008@gmail.com', 'Daniel Felipe Grajales', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$ucUX7KyTI1W323lGeETygO/LxcrnU6FMuoFFLVJwENux0eqaTrlYu'),
('user_gmai_687e7f7a5486a2.97039125', 'yeison2708@gmail.com', 'Yeison Bertulfio Roberto Acevedo', '', '', NULL, '2025-07-21 17:57:14', '', NULL, '$2y$10$MGU6hIyG4jiU2bRblBMli.WPL0MoezeHkOHKXu8DcA1sMa/EpHE3W'),
('user_gude_68161d4d99f868.41078040', 'buitragoagudeloj007@gmail.com', 'Jesus David Buitrago Agudelo', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$Pl4p7Llc1Je9kQpP.KuixeBkWzFzCLTtghIQg3bDUc8BtYDsmyTLG'),
('user_i270_6818b7d18f70d6.09896065', 'yamori2708@gmail.com', 'Yeison ', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$WJNCR0PguViZePZhb7iw2.odqndz7tMAIZb/GkxWLp78TA9FIU7Ha'),
('user_iece_686de4ba0c6eb0.13900546', 'donEliecer@gmail.com', 'Elicer Gaitan ', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$.NPV0WPUi6ugahqWYC5nLu90tm0O3h8s3mSXhCwitn9OuFmwxVQAW'),
('user_il.c_6816b8bdd69937.63435904', 'papa@gmail.com', 'Luis Evelio Buitrago Giraldo', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$3T5UkpdC4XDGSIQC.VnTwO62W.hyYETGWYIKxXS7nvaeZ/pXyTk6y'),
('user_il.c_6818b75dc0ff86.65774177', 'r0772284@gmail.com', 'Alejandro Posada Castaño', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$.nhR8EwIBn8Q4Xm9fXpOA.hLnOgYU3vp0mPaM1wwNBPFS5pHQAI/.'),
('user_il.c_6818b7fd2be733.25284915', 'yamori@gmail.com', 'Yeison Acevedo', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$qBDhShEn0QDTSXypk2agZu0/0BPKqSZtlInbyY6fj2QcGyh64yniC'),
('user_il.c_686de1cd10e0e6.62369088', 'buitragoagudeloj0010@gmail.com', 'Daniel Felipe Grajales', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$WawkVoSqbixyubB0MlV2DOsbbLT6VDiAurSU8vJd4TfDs2Iu84tUS'),
('user_ison_682365a3af61e0.61268305', 'yeison@gmail.com', 'Yeison Stiven ', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$EpD.Kw767ncRt3zR0qvpouIXTzCg7WKETHo2JjYvPTKKORuZsqYji'),
('user_ison_68501cc697a9a5.28349657', 'yeison123@gmail.com', 'Yeison ', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$ZFHHgVENxzhOAV7B7RHby.yD1n0H5VbeRV8pzDqv3iRj/c9cgPWTq'),
('user_l.co_68237519ae2821.70599125', 'danielito@gmail.com', 'Daniel Felipe Grajales', 'Calle 69B # 24-03', '3224455321', '', '2025-07-08 00:00:00', '1033423412', NULL, '$2y$10$kFDSAVewe3Fkczj38C222erjht8geUvqqJHOGAppWiNvbJBQylVAO'),
('user_l.co_686dea32086e93.60599065', 'botasLocas2@gmail.com', 'no se se me olvido', NULL, NULL, NULL, '2025-07-08 23:04:02', NULL, NULL, '$2y$10$JXIRq5SeyOHwX/8Z2cpaM.Vb34l.VfH2SeqilnJln5fqTEHIpAnTO'),
('user_l030_687db9e38671c2.04962698', 'daniel030693@misena.edu', 'Daniel Felipe Grajales', NULL, NULL, NULL, '2025-07-21 03:54:11', NULL, NULL, '$2y$10$VgadLZdMWD9/Vd0ycsmktu9aDQJKpeTN7sZCWTn/4dVFcTKuQr78a'),
('user_l@gm_6824fd2f639b96.62426789', 'Daniel@gmail.com', 'Daniel Grajales ', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$MnlTxnjl6rzU7RU14aJd6ePldt4Ljulhq/d2S4gEpnt2eMIKHTLNm'),
('user_mail_68501e99bc2775.27159032', 'dg930603@gmail.com', 'Daniel Grajales', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$WyK1aXfN7av/MqBuR7hjSOO9yMfNLbGfNxmCredXaw6Dhf.YcJHrG'),
('user_mail_6863fcad096d12.27526722', 'yamori08@gmail.com', 'Yeison Stiven Acevedo Loaiza', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$y7AHTNWOhrhcjyZ.7147weVfQy0ED6MoqmZ9bURhPKlTznp44qRdK'),
('user_mail_686c8f2a862909.84057189', 'test3@gmail.com', 'Daniel Felipe Grajales', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$/mjBy6VfiZhpZXCc2pa2Du.h1qOa/9pMVs84KkU5L83v9U5jZRfOy'),
('user_mail_686c8fb010a9f3.99557287', 'testteo3@gmail.com', 'Daniel Felipe Grajales', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$iMSp0hvwnBVx0Ofc.YET8uPKA0RryyR21yDtO51PykcQXTBDjndFu'),
('user_oagu_686de3f6cd1785.68421066', 'buitragoagudeloj001340@gmail.com', 'Daniel Felipe Grajales', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$FWuuSjIQJBKSRIB5YuCvROyKUVjC7apUvAor80Nz3EG1QL17zVU7W'),
('user_ori._6816c1dcc33753.68201660', 'mori@mori.com', 'EL mori', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$PYx69HMbHIKoCiY.TnQHIeCzNgfw8tRmW3cHKMmZQiU/CiVYJlxvu'),
('user_test_686c9287c468d5.37792071', 'testteo4@gmail.com', 'Daniel Felipe Grajales', NULL, NULL, '', '2025-07-08 00:00:00', NULL, NULL, '$2y$10$GjWar4f3rWZK6GvJ3xeUSeMksRxYx9yI7E.6eQPzW6jAQxxI37mrK'),
('user_uan1_687e8650e41c86.34789433', 'juan1235@gmail.com', 'Juan', NULL, NULL, NULL, '2025-07-21 18:26:24', NULL, NULL, '$2y$10$Zq/YSfacAMmfRxaZt7wO3etOIj4Z37YTTHrLODgimjjz7WzItY5Iq'),
('user_ulli_6850034385b7c0.16999860', 'sulliv95@gmail.com', 'miguel martinez', 'cra32B #100d-35', '3004447985', '', '2025-07-08 00:00:00', '', NULL, '$2y$10$nPzHDISgzXUBB4smAcT5MOu0pXxDxjmUsxHePemn0OQ0u6OOI4e5O'),
('user_y@gm_688046698481f7.02891216', 'crashelly@gmail.com', 'Mauro de Jesus Estrada', NULL, NULL, NULL, '2025-07-23 02:18:17', NULL, NULL, '$2y$10$XZ2bhaHXPSRqt7tKIqWdxe3iHNlvY.63WqU1ZLdUee5p5Wl.ElTJ2');

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

CREATE TABLE `ventas` (
  `vent_id` int(11) NOT NULL,
  `vent_fechaVenta` timestamp NOT NULL DEFAULT current_timestamp(),
  `ven_fecha` date NOT NULL DEFAULT current_timestamp(),
  `fac_id` int(11) DEFAULT NULL,
  `prod_id` int(11) NOT NULL,
  `prod_cant` int(11) NOT NULL,
  `prod_precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `ventas`
--

INSERT INTO `ventas` (`vent_id`, `vent_fechaVenta`, `ven_fecha`, `fac_id`, `prod_id`, `prod_cant`, `prod_precio`) VALUES
(1, '2025-07-19 20:29:11', '2025-07-19', 1, 129, 2, 20000),
(2, '2025-07-19 20:29:11', '2025-07-19', 1, 130, 3, 30000),
(3, '2025-07-19 20:30:08', '2025-07-19', 2, 145, 5, 25000),
(4, '2025-07-19 20:36:00', '2025-07-19', 3, 71, 1, 6000),
(5, '2025-07-19 21:04:39', '2025-07-19', 4, 71, 1, 6000),
(6, '2025-07-19 21:05:42', '2025-07-19', 5, 142, 1, 2000),
(7, '2025-07-19 21:07:02', '2025-07-19', 6, 142, 1, 2000),
(8, '2025-07-19 21:58:11', '2025-07-19', 7, 143, 2, 400000),
(9, '2025-07-19 22:06:52', '2025-07-19', 8, 63, 3, 6000),
(10, '2025-07-19 22:06:52', '2025-07-19', 8, 71, 2, 12000),
(11, '2025-07-19 22:06:52', '2025-07-19', 8, 74, 2, 6000),
(12, '2025-07-22 02:06:48', '2025-07-22', 11, 140, 1, 10000),
(13, '2025-07-22 02:07:02', '2025-07-22', 12, 73, 2, 12000),
(14, '2025-07-22 03:42:17', '2025-07-22', 13, 129, 1, 10000),
(15, '2025-07-22 03:44:05', '2025-07-22', 14, 142, 6, 134000);

-- --------------------------------------------------------

--
-- Structure for view `cantidad_pedidos`
--
DROP TABLE IF EXISTS `cantidad_pedidos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`u836772000_chucho`@`127.0.0.1` SQL SECURITY DEFINER VIEW `cantidad_pedidos`  AS SELECT count(0) AS `cantidad` FROM `pedidos` ;

-- --------------------------------------------------------

--
-- Structure for view `notificacionescounter`
--
DROP TABLE IF EXISTS `notificacionescounter`;

CREATE ALGORITHM=UNDEFINED DEFINER=`u836772000_chucho`@`127.0.0.1` SQL SECURITY DEFINER VIEW `notificacionescounter`  AS SELECT count(0) AS `cantidad` FROM ((`productos_subcategorias` `ps` join `productos` `p` on(`ps`.`prod_id` = `p`.`prod_id`)) join `productos_estado` `pe` on(`ps`.`prodE_id` = `pe`.`prodE_id`)) WHERE `ps`.`prodE_id` = 5 OR `ps`.`prodE_id` = 6 ;

-- --------------------------------------------------------

--
-- Structure for view `productosagotadosybajostock`
--
DROP TABLE IF EXISTS `productosagotadosybajostock`;

CREATE ALGORITHM=UNDEFINED DEFINER=`u836772000_chucho`@`127.0.0.1` SQL SECURITY DEFINER VIEW `productosagotadosybajostock`  AS SELECT `p`.`prod_nombre` AS `producto`, `ps`.`subCat_nombre` AS `variacion`, `pe`.`prodE_estado` AS `estado`, `pe`.`prodE_id` AS `estadoID` FROM ((`productos_subcategorias` `ps` join `productos` `p` on(`ps`.`prod_id` = `p`.`prod_id`)) join `productos_estado` `pe` on(`ps`.`prodE_id` = `pe`.`prodE_id`)) WHERE `ps`.`prodE_id` = 5 OR `ps`.`prodE_id` = 6 ;

-- --------------------------------------------------------

--
-- Structure for view `pseudoid`
--
DROP TABLE IF EXISTS `pseudoid`;

CREATE ALGORITHM=UNDEFINED DEFINER=`u836772000_chucho`@`127.0.0.1` SQL SECURITY DEFINER VIEW `pseudoid`  AS SELECT max(`facturas`.`fac_id` + 1) AS `id` FROM `facturas` ;

-- --------------------------------------------------------

--
-- Structure for view `todainformacionsobreproductos`
--
DROP TABLE IF EXISTS `todainformacionsobreproductos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`u836772000_chucho`@`127.0.0.1` SQL SECURITY DEFINER VIEW `todainformacionsobreproductos`  AS SELECT `ps`.`subCat_id` AS `productoID`, `ps`.`prod_id` AS `productoPadreID`, `ps`.`prodE_id` AS `estadoID`, `ps`.`prodCat_id` AS `categoriaID`, `ps`.`prodMed_id` AS `medidaID`, `ps`.`subCat_nombre` AS `variacion`, `ps`.`subCat_existencias` AS `existencias`, `ps`.`subCat_precio` AS `precio`, `ps`.`prodCat_descripcion` AS `descripcion`, `pc`.`prodCat_categoria` AS `categoria`, `pc`.`prodCat_fechaCreacion` AS `fechaCreacion`, `p`.`prod_nombre` AS `producto`, `pm`.`prodMed_medida` AS `medidaVenta`, `pe`.`prodE_estado` AS `estado`, `pi`.`prodImg_ruta` AS `imagen` FROM (((((`productos_subcategorias` `ps` join `productos` `p` on(`ps`.`prod_id` = `p`.`prod_id`)) join `productos_medidaventa` `pm` on(`ps`.`prodMed_id` = `pm`.`prodMed_id`)) join `productos_estado` `pe` on(`ps`.`prodE_id` = `pe`.`prodE_id`)) join `productos_categoria` `pc` on(`ps`.`prodCat_id` = `pc`.`prodCat_id`)) join `productos_imagenes` `pi` on(`ps`.`subCat_id` = `pi`.`subCat_id`)) ORDER BY `ps`.`subCat_fechaCreacion` DESC ;

-- --------------------------------------------------------

--
-- Structure for view `ultimoidporfecha`
--
DROP TABLE IF EXISTS `ultimoidporfecha`;

CREATE ALGORITHM=UNDEFINED DEFINER=`u836772000_chucho`@`127.0.0.1` SQL SECURITY DEFINER VIEW `ultimoidporfecha`  AS SELECT `facturas`.`fac_id` AS `id` FROM `facturas` ORDER BY `facturas`.`fac_fecha` DESC LIMIT 0, 1 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animales`
--
ALTER TABLE `animales`
  ADD PRIMARY KEY (`ani_id`),
  ADD KEY `ani_estado` (`ani_estado`);

--
-- Indexes for table `animales_estado`
--
ALTER TABLE `animales_estado`
  ADD PRIMARY KEY (`aniE_id`);

--
-- Indexes for table `detalles_usuarios`
--
ALTER TABLE `detalles_usuarios`
  ADD PRIMARY KEY (`detUsr_id`),
  ADD KEY `tipoUsr_id` (`tipoUsr_id`);

--
-- Indexes for table `estado_facturas`
--
ALTER TABLE `estado_facturas`
  ADD PRIMARY KEY (`facE_id`);

--
-- Indexes for table `estado_pedido`
--
ALTER TABLE `estado_pedido`
  ADD PRIMARY KEY (`pedE_id`);

--
-- Indexes for table `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`fac_id`),
  ADD KEY `usuario_fk` (`usr_id`),
  ADD KEY `fechaBusqueda` (`fac_fechaBusqueda`),
  ADD KEY `Factura_usuarioNoRegistrado` (`usr_noRegistrado`(1024));

--
-- Indexes for table `fecha_ventas`
--
ALTER TABLE `fecha_ventas`
  ADD PRIMARY KEY (`ventaF_id`),
  ADD KEY `venta_fk` (`vent_id`);

--
-- Indexes for table `inventario_diario`
--
ALTER TABLE `inventario_diario`
  ADD PRIMARY KEY (`invD_id`);

--
-- Indexes for table `pedidoproductos_estado`
--
ALTER TABLE `pedidoproductos_estado`
  ADD PRIMARY KEY (`pedProdE_id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedi_id`) USING BTREE,
  ADD KEY `pedidos_estado_fk` (`pedE_id`),
  ADD KEY `pedi_fechaCreacion` (`pedi_fechaCreacion`),
  ADD KEY `usuario__pedido_fk` (`usr_id`);

--
-- Indexes for table `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  ADD PRIMARY KEY (`pedProd_id`),
  ADD KEY `productos_ped_estado_fk` (`pedProd_estado`),
  ADD KEY `pedidoId_fk` (`pedi_id`),
  ADD KEY `producto_fk` (`subCat_id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indexes for table `productos_categoria`
--
ALTER TABLE `productos_categoria`
  ADD PRIMARY KEY (`prodCat_id`);

--
-- Indexes for table `productos_estado`
--
ALTER TABLE `productos_estado`
  ADD PRIMARY KEY (`prodE_id`);

--
-- Indexes for table `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  ADD PRIMARY KEY (`prodImg_id`),
  ADD KEY `subCat_id` (`subCat_id`) USING BTREE;

--
-- Indexes for table `productos_medidaventa`
--
ALTER TABLE `productos_medidaventa`
  ADD PRIMARY KEY (`prodMed_id`);

--
-- Indexes for table `productos_pesoventa`
--
ALTER TABLE `productos_pesoventa`
  ADD PRIMARY KEY (`prodPes_id`);

--
-- Indexes for table `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  ADD PRIMARY KEY (`subCat_id`),
  ADD KEY `prodE_id_fk` (`prodE_id`),
  ADD KEY `prodMed_id_fk` (`prodMed_id`),
  ADD KEY `categorias_kf` (`prodCat_id`),
  ADD KEY `productos_fk` (`prod_id`);

--
-- Indexes for table `punto_venta`
--
ALTER TABLE `punto_venta`
  ADD PRIMARY KEY (`puntVen_ID`);

--
-- Indexes for table `punto_venta_imagenes`
--
ALTER TABLE `punto_venta_imagenes`
  ADD PRIMARY KEY (`puntImg_id`);

--
-- Indexes for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`tipoUsr_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usr_id`);

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`vent_id`),
  ADD KEY `fac_id` (`fac_id`),
  ADD KEY `ventas_ibfk_1` (`prod_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animales_estado`
--
ALTER TABLE `animales_estado`
  MODIFY `aniE_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detalles_usuarios`
--
ALTER TABLE `detalles_usuarios`
  MODIFY `detUsr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `estado_facturas`
--
ALTER TABLE `estado_facturas`
  MODIFY `facE_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estado_pedido`
--
ALTER TABLE `estado_pedido`
  MODIFY `pedE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `facturas`
--
ALTER TABLE `facturas`
  MODIFY `fac_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `fecha_ventas`
--
ALTER TABLE `fecha_ventas`
  MODIFY `ventaF_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventario_diario`
--
ALTER TABLE `inventario_diario`
  MODIFY `invD_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `pedidoproductos_estado`
--
ALTER TABLE `pedidoproductos_estado`
  MODIFY `pedProdE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  MODIFY `pedProd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2264;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `productos_categoria`
--
ALTER TABLE `productos_categoria`
  MODIFY `prodCat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `productos_estado`
--
ALTER TABLE `productos_estado`
  MODIFY `prodE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  MODIFY `prodImg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `productos_medidaventa`
--
ALTER TABLE `productos_medidaventa`
  MODIFY `prodMed_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `productos_pesoventa`
--
ALTER TABLE `productos_pesoventa`
  MODIFY `prodPes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  MODIFY `subCat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT for table `punto_venta`
--
ALTER TABLE `punto_venta`
  MODIFY `puntVen_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `punto_venta_imagenes`
--
ALTER TABLE `punto_venta_imagenes`
  MODIFY `puntImg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `tipoUsr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ventas`
--
ALTER TABLE `ventas`
  MODIFY `vent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `animales`
--
ALTER TABLE `animales`
  ADD CONSTRAINT `animales_ibfk_1` FOREIGN KEY (`ani_estado`) REFERENCES `animales_estado` (`aniE_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detalles_usuarios`
--
ALTER TABLE `detalles_usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipoUsr_id`) REFERENCES `tipo_usuario` (`tipoUsr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fecha_ventas`
--
ALTER TABLE `fecha_ventas`
  ADD CONSTRAINT `venta_fk` FOREIGN KEY (`vent_id`) REFERENCES `ventas` (`vent_id`);

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_estado_fk` FOREIGN KEY (`pedE_id`) REFERENCES `estado_pedido` (`pedE_id`),
  ADD CONSTRAINT `usuario__pedido_fk` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`);

--
-- Constraints for table `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  ADD CONSTRAINT `pedidoId_fk` FOREIGN KEY (`pedi_id`) REFERENCES `pedidos` (`pedi_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `producto_fk` FOREIGN KEY (`subCat_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_ped_estado_fk` FOREIGN KEY (`pedProd_estado`) REFERENCES `pedidoproductos_estado` (`pedProdE_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  ADD CONSTRAINT `productos_imagenes_ibfk_1` FOREIGN KEY (`subCat_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  ADD CONSTRAINT `categorias_kf` FOREIGN KEY (`prodCat_id`) REFERENCES `productos_categoria` (`prodCat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `prioducto_medida_fk` FOREIGN KEY (`prodMed_id`) REFERENCES `productos_medidaventa` (`prodMed_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `productos_estado_fk` FOREIGN KEY (`prodE_id`) REFERENCES `productos_estado` (`prodE_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `productos_fk` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_factura_venta` FOREIGN KEY (`fac_id`) REFERENCES `facturas` (`fac_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
