-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2025 at 11:16 PM
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

-- DELIMITER $$
-- --
-- -- Procedures
-- --
-- CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_detalle_usuario` (IN `p_detUsr_id` INT, IN `p_tipoUsr_id` INT, IN `p_usr_id` int)   BEGIN
--     UPDATE `mercasena`.`detalles_usuarios` SET 
--         tipoUsr_id = p_tipoUsr_id,
--         usr_id = p_usr_id 
--         WHERE detUsr_id = p_detUsr_id;
--     END$$

-- CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_usuario` (IN `p_usr_id` int, IN `p_usr_nombre` TINYTEXT, IN `p_usr_direccion` TEXT, IN `p_usr_telefono` TEXT, IN `p_NIT` TEXT, IN `p_tipoUsr` INT(10), IN `p_usr_contrasena_hash` TEXT)   BEGIN
--     UPDATE `mercasena`.`usuarios`
--     SET
--         `usr_nombre` = p_usr_nombre,
--         `usr_direccion` = p_usr_direccion,
--         `usr_telefono` = p_usr_telefono,
--         `NIT` = p_NIT,
--         `tipoUsr` = p_tipoUsr,
--         `usr_contrasena_hash` =  p_usr_contrasena_hash
--     WHERE `usr_id` = p_usr_id;
-- END$$

-- CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_detalle_usuario` (IN `p_usr_id` INT)   BEGIN 
--         INSERT INTO `mercasena`.`detalles_usuarios`(usr_id ) 
--         VALUES(p_usr_id ); 
--     END$$

-- DELIMITER $$

-- CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_usuario` (
--     OUT p_usr_id INT,
--     IN `p_usr_correo` VARCHAR(45),
--     IN `p_usr_nombre` TINYTEXT,
--     IN `p_usr_direccion` TEXT,
--     IN `p_usr_telefono` TEXT,
--     IN `p_NIT` TEXT,
--     IN `p_tipoUsr` INT(10),
--     IN `p_usr_contrasena_hash` TEXT
-- )
-- BEGIN
--     -- Verificamos si el usuario ya existe
--     IF EXISTS (SELECT 1 FROM `usuarios` WHERE `usr_correo` = p_usr_correo) THEN
--         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario o correo electrónico ya existe.';
--     ELSE
--         -- Inserta el nuevo usuario
--         INSERT INTO `mercasena`.`usuarios` (
--             `usr_correo`, `usr_nombre`, `usr_direccion`, `usr_telefono`, `NIT`, `tipoUsr`, `usr_contrasena_hash`
--         ) VALUES (
--             p_usr_correo, p_usr_nombre, p_usr_direccion, p_usr_telefono, p_NIT, p_tipoUsr, p_usr_contrasena_hash
--         );

--         -- Sacamos el id del último registro creado
--         SET p_usr_id = LAST_INSERT_ID();

--         -- Lo agregamos a la tabla detalles usuarios
--         CALL crear_detalle_usuario(p_usr_id);
--     END IF;
-- END$$

-- DELIMITER ;

-- DELIMITER $$
-- CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_detalle_usuario` (IN `p_detUsr_id` INT)   BEGIN DELETE FROM `mercasena`.`detalles_usuarios` WHERE detUsr_id = p_detUsr_id;
--     END$$


-- DELIMITER ; 
-- CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_usuario` (IN `p_usr_id` VARCHAR(45))   BEGIN
--     DELETE FROM `mercasena`.`usuarios` WHERE `usr_id` = p_usr_id;
-- END$$

-- DELIMITER ;

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
-- Table structure for table `carrito`
--

CREATE TABLE `carrito` (
  `car_id` varchar(255) NOT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `car_total` double DEFAULT NULL,
  `car_fechaCreacion` datetime DEFAULT NULL,
  `usr_id` int DEFAULT NULL,
  `car_prodCantidad` float DEFAULT NULL,
  `car_prodPrecioTotal` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
-- -------------------------------------------------

--
-- Table structure for table `detalles_usuarios`
--

CREATE TABLE `detalles_usuarios` (
  `detUsr_id` int(11) NOT NULL,
  `tipoUsr_id` int(11) DEFAULT 2,
  `usr_id` int(12) DELIMITER $$

CREATE PROCEDURE get_user_id_by_email (
    IN p_usr_correo VARCHAR(45),
    OUT p_usr_id INT
)
BEGIN
    -- Retrieve the user ID based on the email
    SELECT usr_id INTO p_usr_id
    FROM usuarios
    WHERE usr_correo = p_usr_correo
    LIMIT 1;
END$$

DELIMITER ;
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `detalles_usuarios`
--

INSERT INTO `detalles_usuarios` (`detUsr_id`, `tipoUsr_id`, `usr_id`) VALUES
(3, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `facturas`
--

CREATE TABLE `facturas` (
  `fac_id` int(11) NOT NULL,
  `usr_id` int NOT NULL,
  `fac_fecha` datetime NOT NULL,
  `fac_pesoProducto` float NOT NULL,
  `fac_precioTotal` float NOT NULL,
  `fac_direccion` mediumtext DEFAULT NULL,
  `pedi_id` int(11) DEFAULT NULL,
  `fac_estado` enum('pendiente de pago','cancelado','pagado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fecha_ventas`
--

CREATE TABLE `fecha_ventas` (
  `ventaF_id` int(11) NOT NULL,
  `ventaF_fecha` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventario_base`
--

CREATE TABLE `inventario_base` (
  `invbase_id` int(11) NOT NULL,
  `prod_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `pedi_id` int(11) NOT NULL,
  `pedi_preciototal` float DEFAULT NULL,
  `pedi_fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  `pedi_unidadMedida` text DEFAULT NULL,
  `usr_id` int NOT NULL,
  `pedi_cantidad` float DEFAULT NULL,
  `pedi_peso` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pedidos_tiene_productos`
--

CREATE TABLE `pedidos_tiene_productos` (
  `pedprod_id` int(11) NOT NULL,
  `pedi_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `prod_id` int(11) NOT NULL,
  `prod_nombre` varchar(45) DEFAULT NULL,
  `prod_existencias` int(11) DEFAULT NULL,
  `prod_precio` double DEFAULT NULL,
  `prodMed_id` int(11) DEFAULT NULL,
  `prod_cantidad` int(11) DEFAULT NULL,
  `prod_tamaño` varchar(45) DEFAULT NULL,
  `prod_fechaExpiracion` date DEFAULT NULL,
  `prodPes_id` int(11) DEFAULT NULL,
  `prodCaducidad` date DEFAULT NULL,
  `prodE_id` int(11) DEFAULT NULL,
  `prodCat_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`prod_id`, `prod_nombre`, `prod_existencias`, `prod_precio`, `prodMed_id`, `prod_cantidad`, `prod_tamaño`, `prod_fechaExpiracion`, `prodPes_id`, `prodCaducidad`, `prodE_id`, `prodCat_id`) VALUES
(1, 'tomate', 100, 2000, 1, 1, '1', '2025-03-10', 1, '2025-03-27', 7, 9),
(3, 'huevo', 100, 600, 4, 30, 'AAA', '2025-03-24', 1, '2025-03-24', 7, 9);

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
(3, '2025-03-15 16:55:38', 'Inactivo'),
(8, '2025-03-15 17:25:33', 'verduras'),
(9, '2025-03-17 02:42:05', 'frutas');

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
(3, 'carls', '2025-03-17 21:56:37'),
(5, 'Agotado', '2025-03-17 22:42:21'),
(6, 'Agotado', '2025-03-17 22:47:56'),
(7, 'Agotado', '2025-03-17 22:47:57'),
(8, 'Kilogramos', '2025-03-17 23:16:57'),
(9, 'Kilogramos', '2025-03-17 23:17:47'),
(10, 'Kilogramos', '2025-03-17 23:18:04');

-- --------------------------------------------------------

--
-- Table structure for table `productos_imagenes`
--

CREATE TABLE `productos_imagenes` (
  `prodImg_id` int(11) NOT NULL,
  `prodImg_ruta` text DEFAULT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `prodImg_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `prodImg_miniatura` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productos_imagenes`
--

INSERT INTO `productos_imagenes` (`prodImg_id`, `prodImg_ruta`, `prod_id`, `prodImg_fechaCreacion`, `prodImg_miniatura`) VALUES
(1, 'https://th.bing.com/th/id/OIP._9LS3zZggRbF6vQrgKxLKAHaE8?w=238&h=180&c=7&r=0&o=5&pid=1.7', 3, '2025-03-18 21:48:20', 1),
(3, 'https://static.wixstatic.com/media/e497f8_cebab8cf74ce40d9b2267fb9e01456af~mv2.png/v1/fill/w_384,h_384,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/cut-out-egg.png', 1, '2025-03-19 00:57:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `productos_medidaventa`
--

CREATE TABLE `productos_medidaventa` (
  `prodMed_id` int(11) NOT NULL,
  `prodMed_medida` text DEFAULT NULL,
  `prodMed_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productos_medidaventa`
--

INSERT INTO `productos_medidaventa` (`prodMed_id`, `prodMed_medida`, `prodMed_fechaCreacion`) VALUES
(1, 'Kilogramos', '2025-03-17 23:18:54'),
(3, 'libras', '2025-03-17 23:30:42'),
(4, 'Cubeta', '2025-03-18 20:06:14');

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
  `subCat_categoria` text DEFAULT NULL,
  `subCat_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proveedor`
--


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
  `usr_id` int ,
  `usr_correo` TEXT NOT NULL ,
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

-- --------------------------------------------------------

--
-- Table structure for table `ventas`
--

CREATE TABLE `ventas` (
  `vent_id` int(11) NOT NULL,
  `vent_fechaVenta` timestamp NOT NULL DEFAULT current_timestamp(),
  `fac_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  ADD KEY `prod_id` (`prod_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usr_id`),
  ADD UNIQUE (`usr_correo`);

--
-- Indexes for table `detalles_usuarios`
--



ALTER TABLE `detalles_usuarios`
  ADD PRIMARY KEY (`detUsr_id`),
  ADD KEY `tipoUsr_id` (`tipoUsr_id`),
  ADD KEY `usr_id` (`usr_id`);

--
-- Indexes for table `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`fac_id`),
  ADD KEY `usr_id` (`usr_id`),
  ADD KEY `pedi_id` (`pedi_id`);

--
-- Indexes for table `fecha_ventas`
--
ALTER TABLE `fecha_ventas`
  ADD PRIMARY KEY (`ventaF_id`);

--
-- Indexes for table `inventario_base`
--
ALTER TABLE `inventario_base`
  ADD PRIMARY KEY (`invbase_id`),
  ADD KEY `prod_id` (`prod_id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedi_id`,`usr_id`),
  ADD KEY `usr_id` (`usr_id`);

--
-- Indexes for table `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  ADD PRIMARY KEY (`pedprod_id`),
  ADD KEY `pedi_id` (`pedi_id`),
  ADD KEY `prod_id` (`prod_id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`prod_id`),
  ADD KEY `prodMed_id` (`prodMed_id`),
  ADD KEY `prodPes_id` (`prodPes_id`),
  ADD KEY `prodE_id` (`prodE_id`),
  ADD KEY `prodCat_id` (`prodCat_id`);

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
  ADD KEY `prod_id` (`prod_id`);

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
  ADD KEY `prod_id` (`prod_id`);


--
-- Indexes for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`tipoUsr_id`);

--
-- Indexes for table `usuarios`

--
-- Indexes for table `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`vent_id`),
  ADD KEY `fac_id` (`fac_id`);

--
-- AUTO_INCREMENT for dumped tables
--
ALTER TABLE `usuarios`
  MODIFY `usr_id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `inventario_base`
--
ALTER TABLE `inventario_base`
  MODIFY `invbase_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `pedi_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  MODIFY `pedprod_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `productos_categoria`
--
ALTER TABLE `productos_categoria`
  MODIFY `prodCat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `productos_estado`
--
ALTER TABLE `productos_estado`
  MODIFY `prodE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  MODIFY `prodImg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `productos_medidaventa`
--
ALTER TABLE `productos_medidaventa`
  MODIFY `prodMed_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `productos_pesoventa`
--
ALTER TABLE `productos_pesoventa`
  MODIFY `prodPes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  MODIFY `subCat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `tipoUsr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;



INSERT INTO `usuarios` (`usr_correo`, `usr_nombre`, `usr_direccion`, `usr_telefono`, `NIT`, `tipoUsr`, `usr_contrasena_hash`) VALUES
('elpepe@gmaiñ.com', 'nombre', 'direccion', '3224455342', 'nose', 1, '23422345');

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
  ADD CONSTRAINT `facturas_ibfk_2` FOREIGN KEY (`pedi_id`) REFERENCES `pedidos` (`pedi_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `inventario_base`
--
ALTER TABLE `inventario_base`
  ADD CONSTRAINT `inventario_base_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pedidos_tiene_productos`
--
ALTER TABLE `pedidos_tiene_productos`
  ADD CONSTRAINT `pedidos_tiene_productos_ibfk_1` FOREIGN KEY (`pedi_id`) REFERENCES `pedidos` (`pedi_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_tiene_productos_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`prodMed_id`) REFERENCES `productos_medidaventa` (`prodMed_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`prodPes_id`) REFERENCES `productos_pesoventa` (`prodPes_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`prodE_id`) REFERENCES `productos_estado` (`prodE_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_ibfk_4` FOREIGN KEY (`prodCat_id`) REFERENCES `productos_categoria` (`prodCat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productos_imagenes`
--
ALTER TABLE `productos_imagenes`
  ADD CONSTRAINT `productos_imagenes_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  ADD CONSTRAINT `productos_subcategorias_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`fac_id`) REFERENCES `facturas` (`fac_id`) ON DELETE CASCADE ON UPDATE CASCADE;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
