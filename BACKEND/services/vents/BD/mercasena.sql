-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-07-2025 a las 16:24:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mercasena`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizarContraseña` (IN `p_user` VARCHAR(255), IN `p_password` TEXT)   BEGIN 
update usuarios 
set usr_contrasena_hash = p_password
WHERE usr_id = p_user;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizarContraseñaPorCorreo` (IN `correo` TEXT, IN `p_password` TEXT)   BEGIN 
update usuarios 
set usr_contrasena_hash = p_password
WHERE usr_correo  = correo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_detalle_usuario` (IN `p_detUsr_id` INT, IN `p_tipoUsr_id` INT, IN `p_usr_id` VARCHAR(255))   BEGIN
    UPDATE `mercasena`.`detalles_usuarios` SET 
        tipoUsr_id = p_tipoUsr_id,
        usr_id = p_usr_id 
        WHERE detUsr_id = p_detUsr_id;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_estado_pedido` (IN `p_pedE_id` INT, IN `nuevo_estado` TEXT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_producto` (IN `p_producto_id` INT, IN `nuevo_nombre` VARCHAR(255))   BEGIN
    UPDATE `mercasena`.`productos`
    SET `prod_nombre` = nuevo_nombre
    WHERE `prod_id` = p_producto_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_producto_categoria` (IN `id` INT, IN `nueva_categoria` TINYTEXT)   BEGIN
    UPDATE
        `mercasena`.`productos_categoria`
    SET
        `prodCat_categoria` = nueva_categoria
    WHERE
        `prodCat_id` = id ; 
        END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_producto_imagen` (IN `p_prodImg_id` INT, IN `p_prodImg_ruta` TEXT, IN `p_subCat_id` INT, IN `p_prodImg_miniatura` TINYINT)   BEGIN
    UPDATE `mercasena`.`productos_imagenes`
    SET
        `prodImg_ruta` = p_prodImg_ruta,
        `subCat_id` = p_subCat_id,
        `prodImg_miniatura` = p_prodImg_miniatura  
    WHERE
        `prodImg_id` = p_prodImg_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_producto_medidaVenta` (IN `p_prodMed_id` INT, IN `p_medida` TEXT, IN `p_factor` INT)   BEGIN
    UPDATE
        `mercasena`.`productos_MedidaVenta`
    SET
        `prodMed_medida` = p_medida,
        `prodMed_factor` = p_factor
    WHERE
        `prodMed_id` = p_prodMed_id ; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_producto_subcategoria` (IN `p_subCat_id` INT, IN `p_prod_id` INT, IN `p_subCat_nombre` TEXT, IN `p_subCat_existencias` INT, IN `p_subCat_precio` DOUBLE, IN `p_prodMed_id` INT, IN `p_prodCat_id` INT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_usuario` (IN `id_usuario` VARCHAR(255), IN `p_nombre` TEXT, IN `p_direccion` TEXT, IN `telefono` TEXT, IN `p_nit` TEXT)   begin 
UPDATE usuarios SET
    usr_direccion = p_direccion,
	usr_nombre = p_nombre,
    usr_telefono = telefono,
    NIT = p_nit
    WHERE usr_id = id_usuario;
	
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `analisisPedidos` (IN `p_prod_id` INT)   BEGIN 
-- dexclaracion 
DECLARE stock_actual int;

-- asigno el stock actual del producto que busque 
   SELECT subCat_existencias  INTO stock_actual
    FROM productos_subcategorias
    WHERE subCat_id = p_prod_id;
    
    -- actualizo el estados de los productos de los pedidos si la cantidad solicitada es mayor al stock actual 
    UPDATE pedidos_tiene_productos 
    SET pedProd_estado = 2
    WHERE 
    subCat_id = p_prod_id AND
    pedProd_cantidad > stock_actual;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `analisisProductosINVDiario` (IN `id_prod` INT)   BEGIN
-- dexclaracion 
DECLARE stock_actual int;

-- asigno el stock actual del producto que busque 
   SELECT subCat_existencias  INTO stock_actual
    FROM productos_subcategorias
    WHERE subCat_id = p_prod_id;
    
    -- actualizo el estados de los productos de los pedidos si la cantidad solicitada es mayor al stock actual 
    UPDATE pedidos_tiene_productos 
    SET pedProd_estado = 2
    WHERE 
    subCat_id = p_prod_id AND
    pedProd_cantidad < stock_actual;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crearFacturaSinPedidoPrevio` (IN `p_usr_id` VARCHAR(255), IN `fac_precioTotal` FLOAT, IN `pedi_info` TEXT, IN `pedi_id` TEXT, IN `cant_productos_p` INT)   BEGIN
    INSERT INTO `mercasena`.`facturas` (
        `usr_noRegistrado`, `fac_precioTotal`, `pedi_info`,`pedi_id`,`cant_productos`
    ) VALUES (
        p_usr_id,  fac_precioTotal, pedi_info,pedi_id,cant_productos_p
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_detalle_usuario` (IN `p_usr_id` VARCHAR(255))   BEGIN 
        INSERT INTO `mercasena`.`detalles_usuarios`(usr_id ) 
        VALUES(p_usr_id ); 
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_estado_pedido` (IN `p_estado` TEXT)   BEGIN
    INSERT INTO `estado_pedido`(`pedE_estado`)
    VALUES(p_estado);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_factura` (IN `p_usr_id` VARCHAR(45), IN `p_precioTotal` FLOAT, IN `pedi_info` TEXT, IN `pedi_id` TEXT, IN `cant_productos_p` INT)   BEGIN
    INSERT INTO `mercasena`.`facturas` (
        `usr_id`, `fac_precioTotal`, `pedi_info`,`pedi_id`,`cant_productos`
    ) VALUES (
        p_usr_id,  p_precioTotal, pedi_info,pedi_id,cant_productos_p
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_inventario_diario` (IN `p_subCat_id` INT, IN `p_prod_Nombre` TEXT, IN `p_observaciones` TEXT, IN `p_antiguaCantidad` INT, IN `p_nuevaCantidad` INT, IN `p_cantidadTotal` INT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_pedido` (IN `p_preciototal` FLOAT, IN `p_usr_id` VARCHAR(255), IN `p_id` VARCHAR(255))   BEGIN
    INSERT INTO `pedidos`(`pedi_id` ,`pedi_preciototal`, `usr_id`,`pedi_fechaCreacion`)
    VALUES(p_id,p_preciototal, p_usr_id,CURDATE());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_pedido_tiene_productos` (IN `p_subCat_id` INT, IN `p_pedi_id` VARCHAR(255), IN `p_precioParcial` FLOAT, IN `p_cantidad` FLOAT)   BEGIN
    INSERT INTO `pedidos_tiene_productos`(`subCat_id`, `pedi_id`, `pedProd_precioParcial`, `pedProd_cantidad`)
    VALUES(p_subCat_id, p_pedi_id, p_precioParcial, p_cantidad);
    
   	CALL  analisisPedidos(p_subCat_id);
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_producto` (IN `p_nombre` VARCHAR(45))   BEGIN
    INSERT INTO `mercasena`.`productos`(`prod_nombre`)
    VALUES(p_nombre);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_producto_categoria` (IN `categoria` TINYTEXT)   BEGIN
    INSERT INTO `mercasena`.`productos_categoria`(`prodCat_categoria`)
VALUES(categoria); 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_producto_imagen` (IN `p_prodImg_ruta` TEXT, IN `p_subCat_id` INT, IN `p_prodImg_miniatura` TINYINT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `Crear_producto_medidaVenta` (IN `p_medida` TEXT, IN `p_factor` INT)   BEGIN
    INSERT INTO `mercasena`.`productos_MedidaVenta`(`prodMed_medida`,`prodMed_factor`)
VALUES(p_medida,p_factor) ; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_producto_subcategoria` (IN `p_prod_id` INT, IN `p_subCat_nombre` TEXT, IN `p_subCat_existencias` INT, IN `p_subCat_precio` DOUBLE, IN `p_prodMed_id` INT, IN `p_prodCat_cantidad` INT, IN `p_prodCat_descripcion` VARCHAR(45), IN `p_prodCat_fechaExpiracion` DATE, IN `p_prodPes_id` INT, IN `p_prodE_id` INT, IN `p_prodCat_id` INT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_usuario` (IN `p_id` VARCHAR(255), IN `p_usr_correo` TEXT, IN `p_clie_nombre` TINYTEXT, IN `p_password` TEXT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_venta` (IN `p_fac_id` INT, IN `p_prod_id` INT, IN `p_prod_cant` INT, IN `p_prod_precio` FLOAT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_estado_pedido` (IN `p_pedE_id` INT)   BEGIN
    DELETE FROM `estado_pedido`
    WHERE `pedE_id` = p_pedE_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_pedido` (IN `p_pedi_id` TEXT)   BEGIN
    DELETE FROM `pedidos`
    WHERE `pedi_id` = p_pedi_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_pedido_tiene_producto` (IN `p_pedProd_id` INT)   BEGIN
    DELETE FROM `pedidos_tiene_productos`
    WHERE `pedProd_id` = p_pedProd_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_producto` (IN `p_producto_id` INT)   BEGIN
    DELETE FROM `mercasena`.`productos`
    WHERE `prod_id` = p_producto_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_producto_categoria` (IN `p_prodCat_id` INT(11))   BEGIN
    DELETE FROM `mercasena`.`productos_categoria` WHERE prodCat_id = p_prodCat_id ;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_producto_imagen` (IN `p_prodImg_id` INT)   BEGIN
    DELETE FROM `mercasena`.`productos_imagenes`
    WHERE `prodImg_id` = p_prodImg_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_producto_medidaVenta` (IN `p_prodMed_id` INT)   BEGIN
    DELETE
FROM
    `mercasena`.`productos_MedidaVenta`
WHERE
    `prodMed_id` = p_prodMed_id ; END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_producto_subcategoria` (IN `p_subCat_id` INT)   BEGIN
    DELETE FROM `mercasena`.`productos_subcategorias`
    WHERE `subCat_id` = p_subCat_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `esElPedidoDelUsuario` (IN `p_orderID` VARCHAR(255), IN `p_usrID` VARCHAR(255))   BEGIN 
SELECT * FROM pedidos WHERE pedi_id = p_orderID AND usr_id = p_usrID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerCantVentasHoy` (IN `fecha` DATE)   BEGIN
select count(*)  as cantidad  from  facturas  where fac_fechaBusqueda  = fecha;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerDetallesPedido` (IN `pediIDParam` TEXT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerFacInfoPorId` (IN `id` INT)   BEGIN 
select * from facturas where fac_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ObtenerIdFacturaPorPedido` (IN `pedido_id` TEXT)   BEGIN 
 select fac_id  as id  from facturas where pedi_id = pedido_id;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerInformacionProductoEdicion` (IN `p_id_prod` INT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerInfoUsuario` (IN `p_id_usuario` VARCHAR(255))   BEGIN 
SELECT usr_nombre as nombre ,usr_telefono as telefono , usr_direccion as direccion , NIT as nit FROM usuarios WHERE usr_id = p_id_usuario LIMIT 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerPedidoPorUsuario` (IN `p_usr_id` VARCHAR(255))   BEGIN 
SELECT p.pedi_id as id , ep.pedE_id as estadoId , ep.pedE_estado as estado,p.pedi_precioTotal as precioTotal, p.pedi_fechaHora as fechaHoraPedido FROM pedidos p 
                        INNER JOIN usuarios u ON p.usr_id = u.usr_id
                        INNER JOIN estado_pedido ep ON p.pedE_id= ep.pedE_id

                        WHERE p.usr_id = p_usr_id  ORDER BY pedi_fechaHora ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerProductosPorCategoria` (IN `p_cat` INT)   BEGIN 

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerProductosPorPedido` (IN `pedi_i_p` VARCHAR(255))   BEGIN 
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerTotalVendidoHoy` (IN `fecha` TINYTEXT)   BEGIN 
SELECT SUM(fac_precioTotal) as totalVendidoHoy from facturas where fac_fechaBusqueda = fecha;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtenerUsuarioPorEmail` (IN `userEmail` VARCHAR(255))   BEGIN
   SELECT du.tipoUsr_id as permiso , u.usr_id as userId , u.usr_correo as email, u.usr_nombre as name   FROM usuarios u
INNER JOIN detalles_usuarios du ON u.usr_id = du.usr_id
 WHERE usr_correo = userEmail;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `recargarInventario` (IN `prod_id` INT, IN `nuevasExistencias` INT)   BEGIN 
DECLARE antiguas_existencias int  ;
SELECT subCat_existencias INTO  antiguas_existencias from productos_subcategorias where subCat_id = prod_id;

UPDATE productos_subcategorias 
SET subCat_existencias = antiguas_existencias + nuevasExistencias
WHERE subCat_id = prod_id;

CALL analisisProductosINVDiario(prod_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `verificarExistenciaCorreo` (IN `correo` TEXT)   BEGIN 
select count(*) as verificacion from usuarios where usr_correo = correo;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animales`
--

CREATE TABLE `animales` (
  `ani_id` varchar(255) NOT NULL,
  `ani_raza` mediumtext DEFAULT NULL,
  `ani_tamano` mediumtext DEFAULT NULL,
  `ani_descripcion` longtext DEFAULT NULL,
  `ani_estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animales_estado`
--

CREATE TABLE `animales_estado` (
  `aniE_id` int(11) NOT NULL,
  `aniE_estado` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `audit_inventario_diario`
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
-- Estructura de tabla para la tabla `detalles_usuarios`
--

CREATE TABLE `detalles_usuarios` (
  `detUsr_id` int(11) NOT NULL,
  `tipoUsr_id` int(11) DEFAULT 2,
  `usr_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_facturas`
--

CREATE TABLE `estado_facturas` (
  `facE_id` int(11) NOT NULL,
  `facE_estado` tinytext DEFAULT NULL,
  `facE_fechaCreacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pedido`
--

CREATE TABLE `estado_pedido` (
  `pedE_id` int(11) NOT NULL,
  `pedE_estado` text DEFAULT NULL,
  `pedE_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `estado_pedido`
--

INSERT INTO `estado_pedido` (`pedE_id`, `pedE_estado`, `pedE_fechaCreacion`) VALUES
(1, 'Pendiente', '2025-04-23 03:25:41'),
(2, 'Por confirmar', '2025-04-26 23:43:51'),
(3, 'Cancelado\r\n', '2025-04-26 23:44:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `fac_id` int(11) NOT NULL,
  `usr_id` varchar(255) NOT NULL,
  `usr_noRegistrado` text NOT NULL,
  `fac_fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `fac_fechaBusqueda` date NOT NULL DEFAULT current_timestamp(),
  `fac_precioTotal` float NOT NULL,
  `cant_productos` int(11) NOT NULL,
  `pedi_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `pedi_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`fac_id`, `usr_id`, `usr_noRegistrado`, `fac_fecha`, `fac_fechaBusqueda`, `fac_precioTotal`, `cant_productos`, `pedi_info`, `pedi_id`) VALUES
(89, '0', '', '2025-07-01 08:53:17', '2025-07-01', 1200000, 1, '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fecha_ventas`
--

CREATE TABLE `fecha_ventas` (
  `ventaF_id` int(11) NOT NULL,
  `vent_id` int(11) NOT NULL,
  `ventaF_fecha` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario_diario`
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
-- Volcado de datos para la tabla `inventario_diario`
--

INSERT INTO `inventario_diario` (`invD_id`, `subCat_id`, `prod_Nombre`, `antiguaCantidad`, `nuevaCantidad`, `cantidadTotal`, `fecha_hora`, `fecha`, `invD_observaciones`) VALUES
(3, 74, 'LULO', 12, 12, 24, '2025-06-19 10:59:22', '2025-06-19', 'PRobando el modelo que no funciona'),
(4, 74, '   lulo  ', 24, 6, 30, '2025-06-19 11:00:21', '2025-06-19', 'salieron petardos'),
(5, 74, '   lulo  ', 30, 20, 50, '2025-06-19 11:03:37', '2025-06-19', 'salio todo bien'),
(6, 79, '   Cafe  Arabigo', 2, 20, 22, '2025-06-19 11:05:18', '2025-06-19', 'todo correcto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidoproductos_estado`
--

CREATE TABLE `pedidoproductos_estado` (
  `pedProdE_id` int(11) NOT NULL,
  `pedProdE_estado` tinytext NOT NULL,
  `prodPedE_cod` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `pedidoproductos_estado`
--

INSERT INTO `pedidoproductos_estado` (`pedProdE_id`, `pedProdE_estado`, `prodPedE_cod`) VALUES
(1, 'Activo', 'act'),
(2, 'fuera de las existencias', 'out');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `pedi_id` varchar(255) NOT NULL,
  `pedi_preciototal` float DEFAULT NULL,
  `pedE_id` int(11) NOT NULL DEFAULT 1,
  `pedi_fechaCreacion` date DEFAULT NULL,
  `pedi_fechaHora` datetime NOT NULL DEFAULT current_timestamp(),
  `usr_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_tiene_productos`
--

CREATE TABLE `pedidos_tiene_productos` (
  `pedProd_id` int(11) NOT NULL,
  `subCat_id` int(11) DEFAULT NULL,
  `pedi_id` varchar(255) DEFAULT NULL,
  `pedProd_precioParcial` float DEFAULT NULL,
  `pedProd_cantidad` float DEFAULT NULL,
  `pedProd_estado` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `prod_id` int(11) NOT NULL,
  `prod_nombre` varchar(45) DEFAULT NULL,
  `prod_fechaCreacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos`
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
(49, 'Cuervo', '2025-07-01 08:42:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_categoria`
--

CREATE TABLE `productos_categoria` (
  `prodCat_id` int(11) NOT NULL,
  `prodCat_fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  `prodCat_categoria` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos_categoria`
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
-- Estructura de tabla para la tabla `productos_estado`
--

CREATE TABLE `productos_estado` (
  `prodE_id` int(11) NOT NULL,
  `prodE_estado` text DEFAULT NULL,
  `prodE_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos_estado`
--

INSERT INTO `productos_estado` (`prodE_id`, `prodE_estado`, `prodE_fechaCreacion`) VALUES
(3, 'Disponible', '2025-03-17 21:56:37'),
(5, 'Agotado', '2025-03-17 22:42:21'),
(6, 'Pocas Unidades', '2025-03-17 22:47:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_imagenes`
--

CREATE TABLE `productos_imagenes` (
  `prodImg_id` int(11) NOT NULL,
  `prodImg_ruta` text DEFAULT NULL,
  `subCat_id` int(11) DEFAULT NULL,
  `prodImg_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `prodImg_miniatura` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos_imagenes`
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
(44, '/mercasena/public/images/perro2.jpg', 95, '2025-07-01 13:42:16', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_medidaventa`
--

CREATE TABLE `productos_medidaventa` (
  `prodMed_id` int(11) NOT NULL,
  `prodMed_medida` text DEFAULT NULL,
  `prodMed_factor` float NOT NULL DEFAULT 1,
  `prodMed_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos_medidaventa`
--

INSERT INTO `productos_medidaventa` (`prodMed_id`, `prodMed_medida`, `prodMed_factor`, `prodMed_fechaCreacion`) VALUES
(1, 'Centesimos', 1, '2025-03-17 23:18:54'),
(4, 'Cubeta', 30, '2025-03-18 20:06:14'),
(6, 'litros', 1, '2025-04-07 00:41:36'),
(13, 'Kilogramos', 1, '2025-05-05 16:44:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_pesoventa`
--

CREATE TABLE `productos_pesoventa` (
  `prodPes_id` int(11) NOT NULL,
  `prodPes_medida` text DEFAULT NULL,
  `prodPes_fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  `prodPes_numero` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos_pesoventa`
--

INSERT INTO `productos_pesoventa` (`prodPes_id`, `prodPes_medida`, `prodPes_fechaCreacion`, `prodPes_numero`) VALUES
(1, 'default', '2025-03-18 00:14:49', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_subcategorias`
--

CREATE TABLE `productos_subcategorias` (
  `subCat_id` int(11) NOT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `subCat_nombre` text DEFAULT NULL,
  `subCat_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `subCat_existencias` int(11) NOT NULL,
  `subCat_precio` double NOT NULL,
  `prodMed_id` int(11) NOT NULL,
  `prodCat_cantidad` int(11) NOT NULL,
  `prodCat_descripcion` text DEFAULT NULL,
  `prodCat_fechaExpiracion` date DEFAULT NULL,
  `prodPes_id` int(11) NOT NULL,
  `prodE_id` int(11) NOT NULL,
  `prodCat_id` int(11) NOT NULL,
  `subCat_minStock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos_subcategorias`
--

INSERT INTO `productos_subcategorias` (`subCat_id`, `prod_id`, `subCat_nombre`, `subCat_fechaCreacion`, `subCat_existencias`, `subCat_precio`, `prodMed_id`, `prodCat_cantidad`, `prodCat_descripcion`, `prodCat_fechaExpiracion`, `prodPes_id`, `prodE_id`, `prodCat_id`, `subCat_minStock`) VALUES
(63, 33, 'de Vaca', '2025-05-19 13:03:55', 994, 2000, 6, 1, NULL, NULL, 1, 3, 51, 0),
(66, 32, 'nose', '2025-05-19 13:10:13', 889, 887897, 4, 1, NULL, NULL, 1, 3, 52, 0),
(71, 31, 'Rojo', '2025-05-20 13:13:12', 253, 6000, 13, 1, NULL, NULL, 1, 3, 52, 0),
(72, 32, 'ninguna', '2025-05-20 13:19:19', 188, 2000, 13, 1, NULL, NULL, 1, 3, 49, 0),
(73, 36, 'parda', '2025-05-20 13:20:38', 119, 6000, 13, 1, NULL, NULL, 1, 3, 49, 0),
(74, 35, 'default', '2025-05-20 13:22:32', 49, 3000, 13, 1, NULL, NULL, 1, 3, 49, 0),
(75, 37, 'Hass', '2025-05-20 13:37:01', 20, 2000, 13, 1, NULL, NULL, 1, 3, 49, 0),
(76, 38, 'de Aliño', '2025-05-20 13:42:20', 85, 3000, 13, 1, NULL, NULL, 1, 3, 53, 0),
(79, 34, 'Arabigo', '2025-05-21 15:15:56', 20, 100000, 13, 1, NULL, NULL, 1, 3, 52, 0),
(80, 39, 'default', '2025-05-26 05:12:56', 5464, 200000, 13, 1, NULL, NULL, 1, 3, 50, 0),
(81, 38, 'default', '2025-05-26 05:14:58', 5464, 200000, 6, 1, NULL, NULL, 1, 3, 51, 0),
(82, 32, 'default', '2025-05-26 05:16:20', 5464, 200000, 13, 1, NULL, NULL, 1, 3, 51, 0),
(83, 32, 'default', '2025-05-26 05:17:21', 5464, 200000, 13, 1, NULL, NULL, 1, 3, 51, 0),
(84, 32, 'default', '2025-05-26 05:17:58', 5464, 200000, 13, 1, NULL, NULL, 1, 3, 51, 0),
(86, 37, 'sd', '2025-06-20 05:07:02', 233, 200000, 6, 1, NULL, NULL, 1, 3, 55, 0),
(87, 37, 'sd', '2025-06-20 05:07:34', 233, 200000, 6, 1, NULL, NULL, 1, 3, 55, 0),
(89, 36, 'default', '2025-06-20 05:18:17', 232, 3500000, 4, 1, NULL, NULL, 1, 3, 53, 0),
(90, 36, 'nose', '2025-06-20 05:22:22', 233, 3500000, 13, 1, NULL, NULL, 1, 3, 55, 0),
(91, 39, 'nose', '2025-06-20 05:27:40', 233, 3500000, 13, 1, NULL, NULL, 1, 3, 52, 0),
(92, 39, 'default', '2025-06-20 05:33:55', 7, 200000, 13, 1, NULL, NULL, 1, 3, 51, 0),
(93, 37, 'default', '2025-06-20 05:49:43', 34234, 234234, 4, 1, NULL, NULL, 1, 3, 55, 0),
(95, 49, 'Orgia', '2025-07-01 13:42:16', 9, 1200000, 1, 1, 'solo niños', '2025-07-31', 1, 3, 51, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `punto_venta`
--

CREATE TABLE `punto_venta` (
  `puntVen_ID` int(11) NOT NULL,
  `puntVen_nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `punto_venta`
--

INSERT INTO `punto_venta` (`puntVen_ID`, `puntVen_nombre`) VALUES
(1, 'Regional Caldas\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `punto_venta_imagenes`
--

CREATE TABLE `punto_venta_imagenes` (
  `puntImg_id` int(11) NOT NULL,
  `puntImg_ruta` text NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `punto_venta_imagenes`
--

INSERT INTO `punto_venta_imagenes` (`puntImg_id`, `puntImg_ruta`, `fecha_creacion`) VALUES
(3, '/public/assets/banner/images/fondo.png', '2025-05-05 08:48:10'),
(4, '/public/assets/banner/images/imglogin.png', '2025-05-05 08:48:10'),
(6, '/public/assets/banner/images/oferta_1.png', '2025-06-20 00:55:12'),
(7, '/public/assets/banner/images/oferta_2.png', '2025-06-20 00:55:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `tipoUsr_id` int(11) NOT NULL,
  `tipoUsr_tipo` enum('admin','auditor','proveedor','cliente','invitado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`tipoUsr_id`, `tipoUsr_tipo`) VALUES
(1, 'invitado'),
(2, 'cliente'),
(3, 'admin'),
(4, 'proveedor'),
(5, 'auditor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usr_id` varchar(255) NOT NULL,
  `usr_correo` text NOT NULL,
  `usr_nombre` tinytext NOT NULL,
  `usr_direccion` text DEFAULT NULL,
  `usr_telefono` text DEFAULT NULL,
  `usr_imagen` text NOT NULL,
  `NIT` text DEFAULT NULL,
  `tipoUsr` int(10) DEFAULT NULL,
  `usr_contrasena_hash` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `vent_id` int(11) NOT NULL,
  `vent_fechaVenta` timestamp NOT NULL DEFAULT current_timestamp(),
  `ven_fecha` date NOT NULL DEFAULT current_timestamp(),
  `fac_id` int(11) DEFAULT NULL,
  `prod_id` int(11) NOT NULL,
  `prod_cant` int(11) NOT NULL,
  `prod_precio` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`vent_id`, `vent_fechaVenta`, `ven_fecha`, `fac_id`, `prod_id`, `prod_cant`, `prod_precio`) VALUES
(87, '2025-07-01 13:53:17', '2025-07-01', 89, 95, 1, 1200000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `animales`
--
ALTER TABLE `animales`
  ADD PRIMARY KEY (`ani_id`),
  ADD KEY `ani_estado` (`ani_estado`);

--
-- Indices de la tabla `animales_estado`
--
ALTER TABLE `animales_estado`
  ADD PRIMARY KEY (`aniE_id`);

--
-- Indices de la tabla `detalles_usuarios`
--
ALTER TABLE `detalles_usuarios`
  ADD PRIMARY KEY (`detUsr_id`),
  ADD KEY `tipoUsr_id` (`tipoUsr_id`);

--
-- Indices de la tabla `estado_facturas`
--
ALTER TABLE `estado_facturas`
  ADD PRIMARY KEY (`facE_id`);

--
-- Indices de la tabla `estado_pedido`
--
ALTER TABLE `estado_pedido`
  ADD PRIMARY KEY (`pedE_id`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`fac_id`),
  ADD KEY `usuario_fk` (`usr_id`),
  ADD KEY `fechaBusqueda` (`fac_fechaBusqueda`),
  ADD KEY `Factura_usuarioNoRegistrado` (`usr_noRegistrado`(1024));

--
-- Indices de la tabla `fecha_ventas`
--
ALTER TABLE `fecha_ventas`
  ADD PRIMARY KEY (`ventaF_id`),
  ADD KEY `venta_fk` (`vent_id`);

--
-- Indices de la tabla `inventario_diario`
--
ALTER TABLE `inventario_diario`
  ADD PRIMARY KEY (`invD_id`);

--
-- Indices de la tabla `pedidoproductos_estado`
--
ALTER TABLE `pedidoproductos_estado`
  ADD PRIMARY KEY (`pedProdE_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedi_id`) USING BTREE,
  ADD KEY `pedidos_estado_fk` (`pedE_id`),
  ADD KEY `pedi_fechaCreacion` (`pedi_fechaCreacion`),
  ADD KEY `usuario__pedido_fk` (`usr_id`);

--
-- Indices de la tabla `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  ADD PRIMARY KEY (`pedProd_id`),
  ADD KEY `productos_ped_estado_fk` (`pedProd_estado`),
  ADD KEY `pedidoId_fk` (`pedi_id`),
  ADD KEY `producto_fk` (`subCat_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indices de la tabla `productos_categoria`
--
ALTER TABLE `productos_categoria`
  ADD PRIMARY KEY (`prodCat_id`);

--
-- Indices de la tabla `productos_estado`
--
ALTER TABLE `productos_estado`
  ADD PRIMARY KEY (`prodE_id`);

--
-- Indices de la tabla `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  ADD PRIMARY KEY (`prodImg_id`),
  ADD KEY `subCat_id` (`subCat_id`) USING BTREE;

--
-- Indices de la tabla `productos_medidaventa`
--
ALTER TABLE `productos_medidaventa`
  ADD PRIMARY KEY (`prodMed_id`);

--
-- Indices de la tabla `productos_pesoventa`
--
ALTER TABLE `productos_pesoventa`
  ADD PRIMARY KEY (`prodPes_id`);

--
-- Indices de la tabla `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  ADD PRIMARY KEY (`subCat_id`),
  ADD KEY `prodE_id_fk` (`prodE_id`),
  ADD KEY `prodMed_id_fk` (`prodMed_id`),
  ADD KEY `categorias_kf` (`prodCat_id`),
  ADD KEY `productos_fk` (`prod_id`);

--
-- Indices de la tabla `punto_venta`
--
ALTER TABLE `punto_venta`
  ADD PRIMARY KEY (`puntVen_ID`);

--
-- Indices de la tabla `punto_venta_imagenes`
--
ALTER TABLE `punto_venta_imagenes`
  ADD PRIMARY KEY (`puntImg_id`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`tipoUsr_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usr_id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`vent_id`),
  ADD KEY `fac_id` (`fac_id`),
  ADD KEY `ventas_ibfk_1` (`prod_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `animales_estado`
--
ALTER TABLE `animales_estado`
  MODIFY `aniE_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalles_usuarios`
--
ALTER TABLE `detalles_usuarios`
  MODIFY `detUsr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `estado_facturas`
--
ALTER TABLE `estado_facturas`
  MODIFY `facE_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado_pedido`
--
ALTER TABLE `estado_pedido`
  MODIFY `pedE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `fac_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT de la tabla `fecha_ventas`
--
ALTER TABLE `fecha_ventas`
  MODIFY `ventaF_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario_diario`
--
ALTER TABLE `inventario_diario`
  MODIFY `invD_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pedidoproductos_estado`
--
ALTER TABLE `pedidoproductos_estado`
  MODIFY `pedProdE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  MODIFY `pedProd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2037;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `productos_categoria`
--
ALTER TABLE `productos_categoria`
  MODIFY `prodCat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT de la tabla `productos_estado`
--
ALTER TABLE `productos_estado`
  MODIFY `prodE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  MODIFY `prodImg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `productos_medidaventa`
--
ALTER TABLE `productos_medidaventa`
  MODIFY `prodMed_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `productos_pesoventa`
--
ALTER TABLE `productos_pesoventa`
  MODIFY `prodPes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  MODIFY `subCat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT de la tabla `punto_venta`
--
ALTER TABLE `punto_venta`
  MODIFY `puntVen_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `punto_venta_imagenes`
--
ALTER TABLE `punto_venta_imagenes`
  MODIFY `puntImg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `tipoUsr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `vent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `animales`
--
ALTER TABLE `animales`
  ADD CONSTRAINT `animales_ibfk_1` FOREIGN KEY (`ani_estado`) REFERENCES `animales_estado` (`aniE_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalles_usuarios`
--
ALTER TABLE `detalles_usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipoUsr_id`) REFERENCES `tipo_usuario` (`tipoUsr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `fecha_ventas`
--
ALTER TABLE `fecha_ventas`
  ADD CONSTRAINT `venta_fk` FOREIGN KEY (`vent_id`) REFERENCES `ventas` (`vent_id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_estado_fk` FOREIGN KEY (`pedE_id`) REFERENCES `estado_pedido` (`pedE_id`),
  ADD CONSTRAINT `usuario__pedido_fk` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`);

--
-- Filtros para la tabla `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  ADD CONSTRAINT `pedidoId_fk` FOREIGN KEY (`pedi_id`) REFERENCES `pedidos` (`pedi_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `producto_fk` FOREIGN KEY (`subCat_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_ped_estado_fk` FOREIGN KEY (`pedProd_estado`) REFERENCES `pedidoproductos_estado` (`pedProdE_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  ADD CONSTRAINT `productos_imagenes_ibfk_1` FOREIGN KEY (`subCat_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  ADD CONSTRAINT `categorias_kf` FOREIGN KEY (`prodCat_id`) REFERENCES `productos_categoria` (`prodCat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `prioducto_medida_fk` FOREIGN KEY (`prodMed_id`) REFERENCES `productos_medidaventa` (`prodMed_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `productos_estado_fk` FOREIGN KEY (`prodE_id`) REFERENCES `productos_estado` (`prodE_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `productos_fk` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_factura_venta` FOREIGN KEY (`fac_id`) REFERENCES `facturas` (`fac_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
