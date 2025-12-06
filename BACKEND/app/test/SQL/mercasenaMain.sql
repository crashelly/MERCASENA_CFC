-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2025 at 04:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mercasena`
--

DELIMITER $$
--
-- Procedures
--
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_producto_subcategoria` (IN `p_subCat_id` INT, IN `p_prod_id` INT, IN `p_subCat_nombre` TEXT, IN `p_subCat_existencias` INT, IN `p_subCat_precio` DOUBLE, IN `p_prodMed_id` INT, IN `p_prodCat_cantidad` INT, IN `p_prodCat_descripcion` VARCHAR(45), IN `p_prodCat_fechaExpiracion` DATE, IN `p_prodPes_id` INT, IN `p_prodE_id` INT, IN `p_prodCat_id` INT)   BEGIN
    UPDATE `mercasena`.`productos_subcategorias`
    SET
        `prod_id` = p_prod_id,
        `subCat_nombre` = p_subCat_nombre,
        `subCat_existencias` = p_subCat_existencias,
        `subCat_precio` = p_subCat_precio,
        `prodMed_id` = p_prodMed_id,
        `prodCat_cantidad` = p_prodCat_cantidad,
        `prodCat_descripcion` = p_prodCat_descripcion,
        `prodCat_fechaExpiracion` = p_prodCat_fechaExpiracion,
        `prodPes_id` = p_prodPes_id,
        `prodE_id` = p_prodE_id,
        `prodCat_id` = p_prodCat_id
    WHERE
        `subCat_id` = p_subCat_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_estado_pedido` (IN `p_estado` TEXT)   BEGIN
    INSERT INTO `estado_pedido`(`pedE_estado`)
    VALUES(p_estado);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_pedido` (IN `p_preciototal` FLOAT, IN `p_usr_id` INT, IN `p_id` VARCHAR(255))   BEGIN
    INSERT INTO `pedidos`(`pedi_id` ,`pedi_preciototal`, `usr_id`,`pedi_fechaCreacion`)
    VALUES(p_id,p_preciototal, p_usr_id,CURDATE());
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_pedido_tiene_productos` (IN `p_subCat_id` INT, IN `p_pedi_id` VARCHAR(255), IN `p_precioParcial` FLOAT, IN `p_cantidad` FLOAT)   BEGIN
    INSERT INTO `pedidos_tiene_productos`(`subCat_id`, `pedi_id`, `pedProd_precioParcial`, `pedProd_cantidad`)
    VALUES(p_subCat_id, p_pedi_id, p_precioParcial, p_cantidad);
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_estado_pedido` (IN `p_pedE_id` INT)   BEGIN
    DELETE FROM `estado_pedido`
    WHERE `pedE_id` = p_pedE_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_pedido` (IN `p_pedi_id` INT)   BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `procedimiento_1` ()   BEGIN  
    select AVG(cuota) as cuota_media , AVG(ventas) as ventas_medias FROM empleados ;  
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `animales_estado`
--

CREATE TABLE `animales_estado` (
  `aniE_id` int(11) NOT NULL,
  `aniE_estado` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
-- Table structure for table `carrito`
--

CREATE TABLE `carrito` (
  `car_id` varchar(255) NOT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `car_fechaCreacion` datetime DEFAULT NULL,
  `usr_id` int(11) DEFAULT NULL,
  `car_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detalles_usuarios`
--

CREATE TABLE `detalles_usuarios` (
  `detUsr_id` int(11) NOT NULL,
  `tipoUsr_id` int(11) DEFAULT 2,
  `usr_id` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `detalles_usuarios`
--

INSERT INTO `detalles_usuarios` (`detUsr_id`, `tipoUsr_id`, `usr_id`) VALUES
(3, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `estado_carrito`
--

CREATE TABLE `estado_carrito` (
  `EC_id` int(11) NOT NULL,
  `EC_estado_carrito` text DEFAULT NULL,
  `EC_fechaCreacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estado_facturas`
--

CREATE TABLE `estado_facturas` (
  `facE_id` int(11) NOT NULL,
  `facE_estado` tinytext DEFAULT NULL,
  `facE_fechaCreacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estado_pedido`
--

CREATE TABLE `estado_pedido` (
  `pedE_id` int(11) NOT NULL,
  `pedE_estado` text DEFAULT NULL,
  `pedE_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `estado_pedido`
--

INSERT INTO `estado_pedido` (`pedE_id`, `pedE_estado`, `pedE_fechaCreacion`) VALUES
(1, 'Pendiente', '2025-04-23 03:25:41'),
(2, 'Por confirmar', '2025-04-26 23:43:51'),
(3, 'Cancelado\r\n', '2025-04-26 23:44:01');

-- --------------------------------------------------------

--
-- Table structure for table `facturas`
--

CREATE TABLE `facturas` (
  `fac_id` int(11) NOT NULL,
  `usr_id` int(11) NOT NULL,
  `fac_fecha` datetime NOT NULL,
  `fac_precioTotal` float NOT NULL,
  `pedi_id` varchar(256) DEFAULT NULL,
  `fac_estado` enum('pendiente de pago','cancelado','pagado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fecha_ventas`
--

CREATE TABLE `fecha_ventas` (
  `ventaF_id` int(11) NOT NULL,
  `vent_id` int(11) NOT NULL,
  `ventaF_fecha` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pedidoproductos_estado`
--

CREATE TABLE `pedidoproductos_estado` (
  `pedProdE_id` int(11) NOT NULL,
  `pedProdE_estado` tinytext NOT NULL,
  `prodPedE_cod` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  `pedi_fechaHora` datetime NOT NULL DEFAULT current_timestamp(),
  `usr_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`pedi_id`, `pedi_preciototal`, `pedE_id`, `pedi_fechaCreacion`, `pedi_fechaHora`, `usr_id`) VALUES
('ped_2025-04-27_680d936a3844d5.67407353', 886000, 1, '2025-04-26', '2025-04-26 21:16:10', 1),
('ped_2025-04-27_680d937c366824.23454204', 1028000, 1, '2025-04-26', '2025-04-26 21:16:28', 1),
('ped_2025-04-27_680d938a9db9b6.87741285', 752000, 1, '2025-04-26', '2025-04-26 21:16:42', 1),
('ped_2025-04-27_680d93990f8b05.46568998', 1376000, 1, '2025-04-26', '2025-04-26 21:16:57', 1),
('ped_2025-04-27_680d939d0154e9.17231139', 1578000, 1, '2025-04-26', '2025-04-26 21:17:01', 1),
('ped_2025-04-27_680d93b13300e4.65738161', 324000, 1, '2025-04-26', '2025-04-26 21:17:21', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pedidos_tiene_productos`
--

INSERT INTO `pedidos_tiene_productos` (`pedProd_id`, `subCat_id`, `pedi_id`, `pedProd_precioParcial`, `pedProd_cantidad`, `pedProd_estado`) VALUES
(79, 26, 'ped_2025-04-27_680d936a3844d5.67407353', 400000, 4, 1),
(80, 27, 'ped_2025-04-27_680d936a3844d5.67407353', 6000, 3, 1),
(81, 28, 'ped_2025-04-27_680d936a3844d5.67407353', 480000, 3, 1),
(82, 26, 'ped_2025-04-27_680d937c366824.23454204', 300000, 3, 1),
(83, 27, 'ped_2025-04-27_680d937c366824.23454204', 10000, 5, 1),
(84, 28, 'ped_2025-04-27_680d937c366824.23454204', 640000, 4, 1),
(85, 33, 'ped_2025-04-27_680d937c366824.23454204', 6000, 3, 1),
(86, 29, 'ped_2025-04-27_680d937c366824.23454204', 72000, 4, 1),
(87, 26, 'ped_2025-04-27_680d938a9db9b6.87741285', 200000, 2, 1),
(88, 27, 'ped_2025-04-27_680d938a9db9b6.87741285', 6000, 3, 1),
(89, 28, 'ped_2025-04-27_680d938a9db9b6.87741285', 480000, 3, 1),
(90, 33, 'ped_2025-04-27_680d938a9db9b6.87741285', 6000, 3, 1),
(91, 29, 'ped_2025-04-27_680d938a9db9b6.87741285', 54000, 3, 1),
(92, 30, 'ped_2025-04-27_680d938a9db9b6.87741285', 6000, 3, 1),
(93, 26, 'ped_2025-04-27_680d93990f8b05.46568998', 400000, 4, 1),
(94, 27, 'ped_2025-04-27_680d93990f8b05.46568998', 10000, 5, 1),
(95, 28, 'ped_2025-04-27_680d93990f8b05.46568998', 960000, 6, 1),
(96, 30, 'ped_2025-04-27_680d93990f8b05.46568998', 6000, 3, 1),
(97, 26, 'ped_2025-04-27_680d939d0154e9.17231139', 600000, 6, 1),
(98, 27, 'ped_2025-04-27_680d939d0154e9.17231139', 12000, 6, 1),
(99, 28, 'ped_2025-04-27_680d939d0154e9.17231139', 960000, 6, 1),
(100, 30, 'ped_2025-04-27_680d939d0154e9.17231139', 6000, 3, 1),
(101, 28, 'ped_2025-04-27_680d93b13300e4.65738161', 320000, 2, 1),
(102, 27, 'ped_2025-04-27_680d93b13300e4.65738161', 4000, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `prod_id` int(11) NOT NULL,
  `prod_nombre` varchar(45) DEFAULT NULL,
  `prod_fechaCreacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`prod_id`, `prod_nombre`, `prod_fechaCreacion`) VALUES
(4, 'tomate OwOlini', '2025-04-20 18:30:53'),
(6, 'Papa', '2025-04-20 18:30:53'),
(7, 'carbon kiwi', '2025-04-20 18:30:53'),
(8, 'cafe', '2025-04-20 18:30:53'),
(9, 'leche', '2025-04-20 18:30:53'),
(10, 'panela', '2025-04-20 18:30:53'),
(11, 'leche', '2025-04-20 18:30:53'),
(12, 'vebollas', '2025-04-20 18:30:53'),
(13, 'lechisima', '2025-04-20 18:30:53'),
(14, 'Manzana', '2025-04-20 18:30:53'),
(15, 'naranja', '2025-04-20 18:30:53'),
(16, 'Huevos', '2025-04-20 18:30:53'),
(17, NULL, '2025-04-20 20:24:03'),
(18, NULL, '2025-04-20 20:24:12'),
(19, 'Perror', '2025-04-20 20:30:48'),
(20, 'papas', '2025-04-22 07:41:36');

-- --------------------------------------------------------

--
-- Table structure for table `productos_categoria`
--

CREATE TABLE `productos_categoria` (
  `prodCat_id` int(11) NOT NULL,
  `prodCat_fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  `prodCat_categoria` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productos_categoria`
--

INSERT INTO `productos_categoria` (`prodCat_id`, `prodCat_fechaCreacion`, `prodCat_categoria`) VALUES
(3, '2025-03-15 16:55:38', 'LacteosCuerdos'),
(8, '2025-03-15 17:25:33', 'verduras'),
(9, '2025-03-17 02:42:05', 'frutas'),
(10, '2025-03-28 23:43:59', 'Animales'),
(11, '2025-03-28 23:43:59', 'Embutidos'),
(12, '2025-03-31 12:08:06', 'Daniel'),
(13, '2025-04-05 21:50:15', 'Pescados'),
(14, '2025-04-06 23:21:54', 'ccina'),
(15, '2025-04-06 23:30:48', 'paisas'),
(16, '2025-04-07 00:25:59', 'sopas'),
(17, '2025-04-07 00:33:48', NULL),
(18, '2025-04-07 03:13:55', '4534'),
(19, '2025-04-07 03:14:29', 'cancer'),
(20, '2025-04-07 03:20:05', 'putin'),
(21, '2025-04-07 13:03:42', 'yEISON'),
(22, '2025-04-08 12:20:35', 'comestibles'),
(23, '2025-04-08 12:28:06', 'frutas ricas'),
(24, '2025-04-10 20:06:00', 'adso'),
(25, '2025-04-11 01:30:09', 'MOri'),
(26, '2025-04-11 02:30:03', 'Juan'),
(27, '2025-04-17 22:44:46', 'nosesisirva'),
(28, '2025-04-18 02:32:25', 'Metales'),
(29, '2025-04-18 03:53:54', 'Perror'),
(30, '2025-04-18 03:54:20', 'Perrro'),
(31, '2025-04-20 05:20:08', '456'),
(32, '2025-04-20 05:21:07', '4453');

-- --------------------------------------------------------

--
-- Table structure for table `productos_estado`
--

CREATE TABLE `productos_estado` (
  `prodE_id` int(11) NOT NULL,
  `prodE_estado` text DEFAULT NULL,
  `prodE_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productos_imagenes`
--

INSERT INTO `productos_imagenes` (`prodImg_id`, `prodImg_ruta`, `subCat_id`, `prodImg_fechaCreacion`, `prodImg_miniatura`) VALUES
(4, 'https://th.bing.com/th/id/OIP.QmOnS7e1x9BYanxTCCx12wHaEO?rs=1&pid=ImgDetMain', 22, '2025-04-08 02:44:27', 1),
(7, 'http://192.168.1.33/mercasena/public/images/35.png', 26, '2025-04-08 03:02:11', 1),
(8, 'http://192.168.1.33/mercasena/public/images/naran-jass.jpg', 27, '2025-04-08 03:31:47', 1),
(9, 'http://192.168.1.33/mercasena/public/images/huevo.png', 28, '2025-04-08 12:23:41', 1),
(10, 'http://192.168.1.33/mercasena/public/images/huevo.png', 29, '2025-04-08 12:26:33', 1),
(11, 'http://192.168.1.33/mercasena/public/images/naran-jass.jpg', 30, '2025-04-08 12:29:13', 1),
(12, 'http://192.168.1.33/mercasena/public/images/huevo.png', 33, '2025-04-11 01:33:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `productos_medidaventa`
--

CREATE TABLE `productos_medidaventa` (
  `prodMed_id` int(11) NOT NULL,
  `prodMed_medida` text DEFAULT NULL,
  `prodMed_factor` float NOT NULL DEFAULT 1,
  `prodMed_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productos_medidaventa`
--

INSERT INTO `productos_medidaventa` (`prodMed_id`, `prodMed_medida`, `prodMed_factor`, `prodMed_fechaCreacion`) VALUES
(1, 'Kilogramos', 1, '2025-03-17 23:18:54'),
(3, 'libras Griegas', 0, '2025-03-17 23:30:42'),
(4, 'Cubeta', 30, '2025-03-18 20:06:14'),
(5, 'libras esterlinas', 0, '2025-04-05 21:55:18'),
(6, 'litros', 1, '2025-04-07 00:41:36'),
(7, 'nose', 13, '2025-04-18 02:25:59'),
(8, 'Pelos', 3, '2025-04-18 02:31:29'),
(9, 'Perros', 2344350, '2025-04-20 05:49:18'),
(10, 'Perros', 453, '2025-04-20 20:17:50');

-- --------------------------------------------------------

--
-- Table structure for table `productos_pesoventa`
--

CREATE TABLE `productos_pesoventa` (
  `prodPes_id` int(11) NOT NULL,
  `prodPes_medida` text DEFAULT NULL,
  `prodPes_fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  `prodPes_numero` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
-- Dumping data for table `productos_subcategorias`
--

INSERT INTO `productos_subcategorias` (`subCat_id`, `prod_id`, `subCat_nombre`, `subCat_fechaCreacion`, `subCat_existencias`, `subCat_precio`, `prodMed_id`, `prodCat_cantidad`, `prodCat_descripcion`, `prodCat_fechaExpiracion`, `prodPes_id`, `prodE_id`, `prodCat_id`, `subCat_minStock`) VALUES
(13, 9, 'no pregunte', '2025-04-07 02:06:10', 433, 14453, 6, 1, NULL, NULL, 1, 3, 3, 0),
(14, 6, 'criolla', '2025-04-07 02:07:06', 100, 2000, 1, 1, NULL, NULL, 1, 3, 3, 0),
(15, 9, 'de cabra', '2025-04-07 02:11:04', 200, 25000, 6, 1, NULL, NULL, 1, 3, 3, 0),
(16, 7, 'rata', '2025-04-07 03:09:19', 34345, 345345, 1, 1, NULL, NULL, 1, 3, 8, 0),
(17, 6, 'criolla', '2025-04-07 03:23:48', 3777, 100000, 3, 1, NULL, NULL, 1, 6, 8, 0),
(18, 14, 'adan', '2025-04-07 13:05:29', 30, 20000, 1, 1, NULL, NULL, 1, 3, 9, 0),
(19, 6, 'weed', '2025-04-08 02:26:38', 453, 12345, 3, 1, NULL, NULL, 1, 3, 8, 0),
(20, 6, '3453', '2025-04-08 02:34:19', 34534, 345345, 3, 1, NULL, NULL, 1, 3, 8, 0),
(21, 7, '3453', '2025-04-08 02:35:13', 34534, 345345, 1, 1, NULL, NULL, 1, 3, 10, 0),
(22, 6, 'lula', '2025-04-08 02:39:52', 10000, 10000, 3, 1, NULL, NULL, 1, 3, 8, 0),
(23, 6, 'rtygh', '2025-04-08 02:48:41', 34534556, 45445, 1, 1, NULL, NULL, 1, 3, 8, 0),
(24, 12, 'criolla', '2025-04-08 02:53:55', 345345, 345345345, 1, 1, NULL, NULL, 1, 3, 10, 0),
(25, 12, '45646', '2025-04-08 02:57:26', 4566, 100000, 1, 1, NULL, NULL, 1, 3, 8, 0),
(26, 12, 'btdfg', '2025-04-08 03:01:40', 4566, 100000, 1, 1, NULL, NULL, 1, 3, 9, 0),
(27, 15, 'pura', '2025-04-08 03:31:17', 30, 2000, 1, 1, NULL, NULL, 1, 6, 9, 0),
(28, 16, 'AAA', '2025-04-08 12:23:05', 10, 160000, 4, 1, NULL, NULL, 1, 3, 22, 0),
(29, 16, 'JUMBO', '2025-04-08 12:26:03', 20, 18000, 4, 1, NULL, NULL, 1, 5, 22, 0),
(30, 15, 'Tangelo', '2025-04-08 12:28:43', 20, 2000, 1, 1, NULL, NULL, 1, 3, 23, 0),
(31, 13, 'nose', '2025-04-10 20:05:28', 100, 20000, 6, 1, NULL, NULL, 1, 3, 8, 0),
(32, 11, 'quesuda', '2025-04-11 01:31:06', 2, 2000, 6, 1, NULL, NULL, 1, 3, 25, 0),
(33, 11, 'quesuda', '2025-04-11 01:32:29', 2, 2000, 6, 1, NULL, NULL, 1, 3, 25, 0),
(34, 8, 'Gonzales', '2025-04-11 02:30:48', 23, 500000, 1, 1, NULL, NULL, 1, 3, 26, 0),
(35, 8, 'Gonzales', '2025-04-11 02:31:09', 23, 500000, 1, 1, NULL, NULL, 1, 3, 26, 0),
(36, 8, 'Gonzales', '2025-04-11 02:31:48', 23, 500000, 1, 1, NULL, NULL, 1, 3, 26, 0),
(37, 8, 'Gonzales', '2025-04-11 02:35:11', 23, 500000, 1, 1, NULL, NULL, 1, 3, 26, 0),
(38, 8, 'Gonzales', '2025-04-11 02:36:17', 23, 500000, 1, 1, NULL, NULL, 1, 3, 26, 0),
(39, 8, 'Gonzales', '2025-04-11 02:36:34', 23, 500000, 1, 1, NULL, NULL, 1, 3, 26, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `tipoUsr_id` int(11) NOT NULL,
  `tipoUsr_tipo` enum('admin','auditor','proveedor','cliente','invitado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `usr_id` int(11) NOT NULL,
  `usr_correo` text NOT NULL,
  `usr_nombre` tinytext NOT NULL,
  `usr_direccion` text DEFAULT NULL,
  `usr_telefono` text DEFAULT NULL,
  `NIT` text DEFAULT NULL,
  `tipoUsr` int(10) DEFAULT NULL,
  `usr_contrasena_hash` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`usr_id`, `usr_correo`, `usr_nombre`, `usr_direccion`, `usr_telefono`, `NIT`, `tipoUsr`, `usr_contrasena_hash`) VALUES
(1, 'elpepe@gmaiñ.com', 'Carlos Andres Loaiza Rendon', 'direccion', '3224455342', 'nose', 1, '23422345');

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

CREATE TABLE `ventas` (
  `vent_id` int(11) NOT NULL,
  `vent_fechaVenta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fac_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure for view `cantidad_pedidos`
--
DROP TABLE IF EXISTS `cantidad_pedidos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `cantidad_pedidos`  AS SELECT count(0) AS `cantidad` FROM `pedidos` ;

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
-- Indexes for table `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`car_id`),
  ADD KEY `carrito_ibfk_1` (`usr_id`),
  ADD KEY `estado_carrito_fk` (`car_estado`);

--
-- Indexes for table `detalles_usuarios`
--
ALTER TABLE `detalles_usuarios`
  ADD PRIMARY KEY (`detUsr_id`),
  ADD KEY `tipoUsr_id` (`tipoUsr_id`),
  ADD KEY `usr_id` (`usr_id`);

--
-- Indexes for table `estado_carrito`
--
ALTER TABLE `estado_carrito`
  ADD PRIMARY KEY (`EC_id`);

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
  ADD KEY `usr_id` (`usr_id`),
  ADD KEY `pedido_id_fk` (`pedi_id`);

--
-- Indexes for table `fecha_ventas`
--
ALTER TABLE `fecha_ventas`
  ADD PRIMARY KEY (`ventaF_id`),
  ADD KEY `venta_fk` (`vent_id`);

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
  ADD KEY `usuario_fk` (`usr_id`),
  ADD KEY `pedidos_estado_fk` (`pedE_id`),
  ADD KEY `pedi_fechaCreacion` (`pedi_fechaCreacion`);

--
-- Indexes for table `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  ADD PRIMARY KEY (`pedProd_id`),
  ADD KEY `producto_fk` (`subCat_id`),
  ADD KEY `productos_ped_estado_fk` (`pedProd_estado`),
  ADD KEY `pedidoId_fk` (`pedi_id`);

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
-- Indexes for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`tipoUsr_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usr_id`),
  ADD UNIQUE KEY `usr_correo` (`usr_correo`) USING HASH;

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`vent_id`),
  ADD KEY `fac_id` (`fac_id`);

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
  MODIFY `detUsr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `estado_carrito`
--
ALTER TABLE `estado_carrito`
  MODIFY `EC_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estado_facturas`
--
ALTER TABLE `estado_facturas`
  MODIFY `facE_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estado_pedido`
--
ALTER TABLE `estado_pedido`
  MODIFY `pedE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `facturas`
--
ALTER TABLE `facturas`
  MODIFY `fac_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fecha_ventas`
--
ALTER TABLE `fecha_ventas`
  MODIFY `ventaF_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pedidoproductos_estado`
--
ALTER TABLE `pedidoproductos_estado`
  MODIFY `pedProdE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  MODIFY `pedProd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `productos_categoria`
--
ALTER TABLE `productos_categoria`
  MODIFY `prodCat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `productos_estado`
--
ALTER TABLE `productos_estado`
  MODIFY `prodE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  MODIFY `prodImg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `productos_medidaventa`
--
ALTER TABLE `productos_medidaventa`
  MODIFY `prodMed_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productos_pesoventa`
--
ALTER TABLE `productos_pesoventa`
  MODIFY `prodPes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  MODIFY `subCat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `tipoUsr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ventas`
--
ALTER TABLE `ventas`
  MODIFY `vent_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `animales`
--
ALTER TABLE `animales`
  ADD CONSTRAINT `animales_ibfk_1` FOREIGN KEY (`ani_estado`) REFERENCES `animales_estado` (`aniE_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estado_carrito_fk` FOREIGN KEY (`car_estado`) REFERENCES `estado_carrito` (`EC_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `detalles_usuarios`
--
ALTER TABLE `detalles_usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipoUsr_id`) REFERENCES `tipo_usuario` (`tipoUsr_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedido_id_fk` FOREIGN KEY (`pedi_id`) REFERENCES `pedidos` (`pedi_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
  ADD CONSTRAINT `usuario_fk` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`);

--
-- Constraints for table `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  ADD CONSTRAINT `pedidoId_fk` FOREIGN KEY (`pedi_id`) REFERENCES `pedidos` (`pedi_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `producto_fk` FOREIGN KEY (`subCat_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `productos_ped_estado_fk` FOREIGN KEY (`pedProd_estado`) REFERENCES `pedidoproductos_estado` (`pedProdE_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  ADD CONSTRAINT `productos_imagenes_ibfk_1` FOREIGN KEY (`subCat_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  ADD CONSTRAINT `categorias_kf` FOREIGN KEY (`prodCat_id`) REFERENCES `productos_categoria` (`prodCat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `prioducto_medida_fk` FOREIGN KEY (`prodMed_id`) REFERENCES `productos_medidaventa` (`prodMed_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `productos_estado_fk` FOREIGN KEY (`prodE_id`) REFERENCES `productos_estado` (`prodE_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_fk` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
