-- Crear base de datos
CREATE DATABASE IF NOT EXISTS `base_datos`;
USE `base_datos`;

-- Crear tablas
CREATE TABLE IF NOT EXISTS `productos` (
    `id_producto` INT NOT NULL AUTO_INCREMENT,
    `nombre_producto` VARCHAR(50) NOT NULL,
    `precio` DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (`id_producto`)
);

CREATE TABLE IF NOT EXISTS `facturas` (
    `id_factura` INT NOT NULL AUTO_INCREMENT,
    `fecha` DATE NOT NULL,
    `total` DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (`id_factura`)
);

CREATE TABLE IF NOT EXISTS `clientes` (
    `id_cliente` INT NOT NULL AUTO_INCREMENT,
    `nombre_cliente` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id_cliente`)
);

-- Insertar datos
INSERT INTO `productos` (`nombre_producto`, `precio`) VALUES ('Producto 1', 20.00), ('Producto 2', 30.00), ('Producto 3', 40.00);
INSERT INTO `clientes` (`nombre_cliente`) VALUES ('Cliente 1'), ('Cliente 2'), ('Cliente 3');
INSERT INTO `facturas` (`fecha`, `total`) VALUES ('2025-01-01', 100.00), ('2025-01-02', 200.00), ('2025-01-03', 300.00);

-- Crear procedimientos
DELIMITER //
CREATE PROCEDURE `agregar_factura` (IN `p_fecha` DATE, IN `p_total` DECIMAL(10,2))
BEGIN
    INSERT INTO `facturas` (`fecha`, `total`) VALUES (`p_fecha`, `p_total`);
END //
CREATE PROCEDURE `eliminar_factura` (IN `p_id_factura` INT)
BEGIN
    DELETE FROM `facturas` WHERE `id_factura` = `p_id_factura`;
END //
CREATE PROCEDURE `agregar_detalle_factura` (IN `p_id_factura` INT, IN `p_id_producto` INT, IN `p_cantidad` INT)
BEGIN
    INSERT INTO `detalle_facturas` (`id_factura`, `id_producto`, `cantidad`) VALUES (`p_id_factura`, `p_id_item`, `p_cantidad`);
END //
CREATE PROCEDURE `eliminar_detalle_factura` (IN `p_id_detalle` INT)
BEGIN
    DELETE FROM `detalle_facturas` WHERE `id_detalle` = `p_id_detalle`;
END //

-- Volver a la instruccion normal
DELIMITER ;
