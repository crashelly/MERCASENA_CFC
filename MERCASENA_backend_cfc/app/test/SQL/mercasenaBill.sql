
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 01, 2025 at 03:13 PM
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
-- Table structure for table `carrito`
--

CREATE TABLE `carrito` (
  `car_id` varchar(255) NOT NULL,
  `subCat_Id` int(11) DEFAULT NULL,
  `car_fechaCreacion` datetime DEFAULT NULL,
  `usr_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carrito_tiene_productos`
--

CREATE TABLE `carrito_tiene_productos` (
  `carsubCat_Id` int(11) NOT NULL,
  `car_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `subCat_Id` int(11) NOT NULL,
  `carProd_precioParcial` float NOT NULL,
  `carProd_cant` int(11) NOT NULL,
  `carProd_categoria` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `carProd_fecha` datetime DEFAULT current_timestamp(),
  `carProd_fechaEdicion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Table structure for table `facturas`
--

CREATE TABLE `facturas` (
  `fac_id` int(11) NOT NULL,
  `usr_id` int(11) NOT NULL,
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
  `subCat_Id` int(11) DEFAULT NULL
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
  `usr_id` int(11) NOT NULL,
  `pedi_cantidad` float DEFAULT NULL,
  `pedi_peso` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pedidos_tiene_productos_subcategorias`
--

CREATE TABLE `pedidos_tiene_productos_subcategorias` (
  `prodSubCat_id` int(11) NOT NULL,
  `pedi_id` int(11) NOT NULL,
  `subCat_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productos_subcategorias`
--

CREATE TABLE `productos_subcategorias` (
  `subCat_Id` int(11) NOT NULL,
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
  `prod_id` int(11) DEFAULT NULL,
  `prod_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `prod_id` int(11) NOT NULL,
  `prodCat_fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  `prodCat_categoria` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`prod_id`, `prodCat_fechaCreacion`, `prodCat_categoria`) VALUES
(3, '2025-03-15 16:55:38', 'Lacteos'),
(8, '2025-03-15 17:25:33', 'verduras'),
(9, '2025-03-17 02:42:05', 'frutas'),
(10, '2025-03-28 23:43:59', 'Animales'),
(11, '2025-03-28 23:43:59', 'Embutidos'),
(12, '2025-03-31 12:08:06', 'Daniel');

-- --------------------------------------------------------

--
-- Table structure for table `productos_subcategorias_estado`
--

CREATE TABLE `productos_subcategorias_estado` (
  `prodE_id` int(11) NOT NULL,
  `prodE_estado` text DEFAULT NULL,
  `prodE_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productos_subcategorias_estado`
--

INSERT INTO `productos_subcategorias_estado` (`prodE_id`, `prodE_estado`, `prodE_fechaCreacion`) VALUES
(3, 'carls', '2025-03-17 21:56:37'),
(5, 'Agotado', '2025-03-17 22:42:21'),
(6, 'Agotado', '2025-03-17 22:47:56'),
(7, 'Agotado', '2025-03-17 22:47:57'),
(8, 'Kilogramos', '2025-03-17 23:16:57'),
(9, 'Kilogramos', '2025-03-17 23:17:47'),
(10, 'Kilogramos', '2025-03-17 23:18:04');

-- --------------------------------------------------------

--
-- Table structure for table `productos_subcategorias_imagenes`
--

CREATE TABLE `productos_subcategorias_imagenes` (
  `prodImg_id` int(11) NOT NULL,
  `prodImg_ruta` text DEFAULT NULL,
  `subCat_Id` int(11) DEFAULT NULL,
  `prodImg_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `prodImg_miniatura` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productos_subcategorias_medidaventa`
--

CREATE TABLE `productos_subcategorias_medidaventa` (
  `prodMed_id` int(11) NOT NULL,
  `prodMed_medida` text DEFAULT NULL,
  `prodMed_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productos_subcategorias_medidaventa`
--

INSERT INTO `productos_subcategorias_medidaventa` (`prodMed_id`, `prodMed_medida`, `prodMed_fechaCreacion`) VALUES
(1, 'Kilogramos', '2025-03-17 23:18:54'),
(3, 'libras', '2025-03-17 23:30:42'),
(4, 'Cubeta', '2025-03-18 20:06:14');

-- --------------------------------------------------------

--
-- Table structure for table `productos_subcategorias_pesoventa`
--

CREATE TABLE `productos_subcategorias_pesoventa` (
  `prodPes_id` int(11) NOT NULL,
  `prodPes_medida` text DEFAULT NULL,
  `prodPes_fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  `prodPes_numero` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `productos_subcategorias_pesoventa`
--

INSERT INTO `productos_subcategorias_pesoventa` (`prodPes_id`, `prodPes_medida`, `prodPes_fechaCreacion`, `prodPes_numero`) VALUES
(1, 'default', '2025-03-18 00:14:49', 1);

-- --------------------------------------------------------

--
-- Table structure for table `futuroProducto`
--

CREATE TABLE `futuroProducto` (
  `prod_id` int(11) NOT NULL,
  `subCat_Id` int(11) DEFAULT NULL,
  `subCat_categoria` text DEFAULT NULL,
  `subCat_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
(1, 'elpepe@gmaiñ.com', 'nombre', 'direccion', '3224455342', 'nose', 1, '23422345');

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
  ADD KEY `carrito_ibfk_1` (`usr_id`);

--
-- Indexes for table `carrito_tiene_productos`
--
ALTER TABLE `carrito_tiene_productos`
  ADD PRIMARY KEY (`carsubCat_Id`),
  ADD KEY `subCat_Id` (`subCat_Id`),
  ADD KEY `carProd_categoria` (`carProd_categoria`),
  ADD KEY `prod_id` (`prod_id`),
  ADD KEY `carrito_tiene_productos_ibfk_6` (`car_id`);

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
  ADD KEY `subCat_Id` (`subCat_Id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedi_id`,`usr_id`),
  ADD KEY `usr_id` (`usr_id`);

--
-- Indexes for table `pedidos_tiene_productos_subcategorias`
--
ALTER TABLE `pedidos_tiene_productos_subcategorias`
  ADD PRIMARY KEY (`prodSubCat_id`),
  ADD KEY `pedi_id` (`pedi_id`),
  ADD KEY `subCat_Id` (`subCat_Id`);

--
-- Indexes for table `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  ADD PRIMARY KEY (`subCat_Id`),
  ADD KEY `prodMed_id` (`prodMed_id`),
  ADD KEY `prodPes_id` (`prodPes_id`),
  ADD KEY `prodE_id` (`prodE_id`),
  ADD KEY `prod_id` (`prod_id`),
  ADD KEY `productos_subcategorias_ibfk_5` (`prod_id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indexes for table `productos_subcategorias_estado`
--
ALTER TABLE `productos_subcategorias_estado`
  ADD PRIMARY KEY (`prodE_id`);

--
-- Indexes for table `productos_subcategorias_imagenes`
--
ALTER TABLE `productos_subcategorias_imagenes`
  ADD PRIMARY KEY (`prodImg_id`),
  ADD KEY `subCat_Id` (`subCat_Id`);

--
-- Indexes for table `productos_subcategorias_medidaventa`
--
ALTER TABLE `productos_subcategorias_medidaventa`
  ADD PRIMARY KEY (`prodMed_id`);

--
-- Indexes for table `productos_subcategorias_pesoventa`
--
ALTER TABLE `productos_subcategorias_pesoventa`
  ADD PRIMARY KEY (`prodPes_id`);

--
-- Indexes for table `futuroProducto`
--
ALTER TABLE `futuroProducto`
  ADD PRIMARY KEY (`prod_id`),
  ADD KEY `subCat_Id` (`subCat_Id`);

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
-- AUTO_INCREMENT for table `carrito_tiene_productos`
--
ALTER TABLE `carrito_tiene_productos`
  MODIFY `carsubCat_Id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `pedidos_tiene_productos_subcategorias`
--
ALTER TABLE `pedidos_tiene_productos_subcategorias`
  MODIFY `prodSubCat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  MODIFY `subCat_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `productos_subcategorias_estado`
--
ALTER TABLE `productos_subcategorias_estado`
  MODIFY `prodE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productos_subcategorias_imagenes`
--
ALTER TABLE `productos_subcategorias_imagenes`
  MODIFY `prodImg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `productos_subcategorias_medidaventa`
--
ALTER TABLE `productos_subcategorias_medidaventa`
  MODIFY `prodMed_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `productos_subcategorias_pesoventa`
--
ALTER TABLE `productos_subcategorias_pesoventa`
  MODIFY `prodPes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `futuroProducto`
--
ALTER TABLE `futuroProducto`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carrito_tiene_productos`
--
ALTER TABLE `carrito_tiene_productos`
  ADD CONSTRAINT `carrito_tiene_productos_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `futuroProducto` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carrito_tiene_productos_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `futuroProducto` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carrito_tiene_productos_ibfk_3` FOREIGN KEY (`subCat_Id`) REFERENCES `productos_subcategorias` (`subCat_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carrito_tiene_productos_ibfk_4` FOREIGN KEY (`carProd_categoria`) REFERENCES `productos` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carrito_tiene_productos_ibfk_5` FOREIGN KEY (`prod_id`) REFERENCES `futuroProducto` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carrito_tiene_productos_ibfk_6` FOREIGN KEY (`car_id`) REFERENCES `carrito` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `inventario_base_ibfk_1` FOREIGN KEY (`subCat_Id`) REFERENCES `productos_subcategorias` (`subCat_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pedidos_tiene_productos_subcategorias`
--
ALTER TABLE `pedidos_tiene_productos_subcategorias`
  ADD CONSTRAINT `pedidos_tiene_productos_subcategorias_ibfk_1` FOREIGN KEY (`pedi_id`) REFERENCES `pedidos` (`pedi_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_tiene_productos_subcategorias_ibfk_2` FOREIGN KEY (`subCat_Id`) REFERENCES `productos_subcategorias` (`subCat_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productos_subcategorias`
--
ALTER TABLE `productos_subcategorias`
  ADD CONSTRAINT `productos_subcategorias_ibfk_1` FOREIGN KEY (`prodMed_id`) REFERENCES `productos_subcategorias_medidaventa` (`prodMed_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_subcategorias_ibfk_2` FOREIGN KEY (`prodPes_id`) REFERENCES `productos_subcategorias_pesoventa` (`prodPes_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_subcategorias_ibfk_3` FOREIGN KEY (`prodE_id`) REFERENCES `productos_subcategorias_estado` (`prodE_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_subcategorias_ibfk_4` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_subcategorias_ibfk_5` FOREIGN KEY (`prod_id`) REFERENCES `futuroProducto` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productos_subcategorias_imagenes`
--
ALTER TABLE `productos_subcategorias_imagenes`
  ADD CONSTRAINT `productos_subcategorias_imagenes_ibfk_1` FOREIGN KEY (`subCat_Id`) REFERENCES `productos_subcategorias` (`subCat_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `futuroProducto`
--
ALTER TABLE `futuroProducto`
  ADD CONSTRAINT `futuroProducto_ibfk_1` FOREIGN KEY (`subCat_Id`) REFERENCES `productos_subcategorias` (`subCat_Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
