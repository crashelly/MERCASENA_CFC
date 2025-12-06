-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: facturacion
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animales`
--

DROP TABLE IF EXISTS `animales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `animales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `animal` varchar(50) NOT NULL,
  `raza` varchar(50) NOT NULL,
  `edad` int(11) NOT NULL,
  `estado_salud` text NOT NULL,
  `peso_medidas` varchar(100) NOT NULL,
  `produccion` text DEFAULT NULL,
  `caracteristicas` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `unidad_edad` varchar(10) NOT NULL DEFAULT 'años',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animales`
--

LOCK TABLES `animales` WRITE;
/*!40000 ALTER TABLE `animales` DISABLE KEYS */;
INSERT INTO `animales` VALUES (8,'Cerdo','Zungo',6,'bien','50kg','carne','sin una oreja',110000.00,'img/cerdo.png','meses'),(9,'gallina','Isa Brown',5,'bien','5kg','Huevos','pico largo',85000.00,'img/gallina.png','años'),(11,'gallina','Zungo',6,'hhhh','50kg','hhhh','hhhh',4555.00,'img/gallina.png','meses');
/*!40000 ALTER TABLE `animales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auditoria`
--

DROP TABLE IF EXISTS `auditoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auditoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditoria`
--

LOCK TABLES `auditoria` WRITE;
/*!40000 ALTER TABLE `auditoria` DISABLE KEYS */;
INSERT INTO `auditoria` VALUES (1,'admin','2025-05-19 15:58:07'),(2,'Juanito','2025-05-19 17:33:26'),(3,'admin','2025-05-19 17:36:52'),(4,'admin','2025-05-19 17:57:02'),(5,'Juanito','2025-05-19 17:57:28'),(6,'admin','2025-05-19 18:06:10'),(7,'Juanito','2025-05-19 18:08:30'),(8,'Juanito','2025-05-19 18:22:23'),(9,'Juanito','2025-05-19 18:27:03'),(10,'cuervo','2025-05-19 18:46:23'),(11,'culo','2025-05-19 18:49:16'),(12,'Juanito','2025-05-19 18:51:13'),(13,'Juanito','2025-05-19 18:53:51'),(14,'magola','2025-05-19 18:55:48'),(15,'Juan','2025-05-19 19:10:15'),(16,'admin','2025-05-20 14:12:14'),(17,'admin','2025-05-20 14:45:03'),(18,'admin','2025-05-21 14:29:51'),(19,'admin','2025-05-21 15:56:55'),(20,'admin','2025-05-21 17:21:02'),(21,'admin','2025-05-21 17:26:13'),(22,'admin','2025-05-26 15:17:59'),(23,'admin','2025-05-26 18:48:18'),(24,'admin','2025-06-01 23:33:19'),(25,'admin','2025-06-02 00:29:41'),(26,'admin','2025-06-02 00:33:33'),(27,'Juanito','2025-06-02 00:33:49'),(28,'admin','2025-06-02 02:07:49'),(29,' cuervo','2025-06-02 02:08:59'),(30,' cuervo','2025-06-02 02:24:33'),(31,'admin','2025-06-02 02:25:19'),(32,'juanito','2025-06-02 02:26:57'),(33,'juanito','2025-06-02 02:32:28'),(34,'admin','2025-06-02 02:33:07'),(35,' cuervo','2025-06-02 05:25:19'),(36,'admin','2025-06-02 05:25:51'),(37,' cuervo','2025-06-02 05:26:11'),(38,'admin','2025-06-02 05:37:29'),(39,'admin','2025-06-02 05:50:57'),(40,'sapo','2025-06-02 05:51:27'),(41,'sapo','2025-06-02 06:44:30'),(42,'juanito','2025-06-02 21:41:48'),(43,' cuervo','2025-06-02 23:18:07'),(44,' cuervo','2025-06-03 01:29:07'),(45,'sapo','2025-06-03 01:29:34'),(46,'sapo','2025-06-03 14:09:18'),(47,'juanito','2025-06-03 14:22:53'),(48,'sapo','2025-06-03 17:22:07'),(49,'juanito','2025-06-03 18:04:25'),(50,'sapo','2025-06-03 18:16:35'),(51,'cuervo','2025-06-03 18:47:05'),(52,'admin ','2025-06-03 18:48:17'),(53,'admin','2025-06-04 16:11:27'),(54,'admin','2025-06-04 16:57:50'),(55,'admin','2025-06-10 14:25:37'),(56,'Juanito','2025-06-10 15:24:56'),(57,'admin','2025-06-10 15:41:33'),(58,'Juanito','2025-06-10 16:03:08'),(59,'admin','2025-06-10 16:08:26'),(60,'admin','2025-06-10 17:37:27'),(61,'admin','2025-06-11 17:18:45'),(62,'Juanito','2025-06-11 17:19:14'),(63,'admin','2025-06-17 15:36:18'),(64,'Juanito','2025-06-17 15:37:42'),(65,'admin','2025-06-17 15:38:37'),(66,'admin','2025-06-17 15:58:49'),(67,'admin','2025-06-17 18:36:01'),(68,'admin','2025-06-17 18:36:21'),(69,'Juanito','2025-06-18 15:26:53'),(70,'admin','2025-06-18 15:33:17'),(71,'Juanito','2025-06-18 15:44:38'),(72,'admin','2025-06-18 15:46:05'),(73,'Juanito','2025-06-18 16:46:54'),(74,'admin','2025-06-18 17:45:03'),(75,'Juanito','2025-06-18 17:47:21');
/*!40000 ALTER TABLE `auditoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Frutas'),(2,'Comestibles'),(3,'Lacteos');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura_detalle`
--

DROP TABLE IF EXISTS `factura_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `factura_detalle` (
  `id_detalle` int(11) NOT NULL AUTO_INCREMENT,
  `id_factura` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `und_medida` varchar(55) NOT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_factura` (`id_factura`),
  CONSTRAINT `factura_detalle_ibfk_1` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id_factura`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura_detalle`
--

LOCK TABLES `factura_detalle` WRITE;
/*!40000 ALTER TABLE `factura_detalle` DISABLE KEYS */;
INSERT INTO `factura_detalle` VALUES (13,12,1,'Lulo',5000.00,4,'kilo',20000.00),(14,13,2,'Leche',12000.00,5,'litro',60000.00),(15,14,3,'Huevos',16000.00,5,'cubeta',80000.00),(16,15,3,'Huevos',16000.00,4,'cubeta',64000.00),(17,16,1,'Lulo',5000.00,3,'kilo',15000.00),(18,17,2,'Leche',12000.00,1,'litro',12000.00),(19,18,2,'Leche',12000.00,3,'litro',36000.00),(20,19,1,'Lulo',5000.00,3,'kilo',15000.00),(21,20,1,'Lulo',5000.00,5,'kilo',25000.00),(22,21,2,'Leche',12000.00,5,'litro',60000.00),(23,22,4,'Cafe',24000.00,5,'kilo',120000.00),(24,23,2,'Leche',12000.00,4,'litro',48000.00),(25,24,1,'Lulo',5000.00,5,'kilo',25000.00);
/*!40000 ALTER TABLE `factura_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facturas` (
  `id_factura` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_factura`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` VALUES (12,'2025-06-01 16:44:08',20000.00),(13,'2025-06-01 16:45:52',60000.00),(14,'2025-06-02 16:33:52',80000.00),(15,'2025-06-03 07:23:17',64000.00),(16,'2025-06-03 08:02:27',15000.00),(17,'2025-06-03 08:59:10',12000.00),(18,'2025-06-03 11:47:47',36000.00),(19,'2025-06-10 08:26:18',15000.00),(20,'2025-06-11 10:46:05',25000.00),(21,'2025-06-11 10:46:33',60000.00),(22,'2025-06-11 11:42:06',120000.00),(23,'2025-06-17 11:37:44',48000.00),(24,'2025-06-18 10:16:07',25000.00);
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario_diario`
--

DROP TABLE IF EXISTS `inventario_diario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventario_diario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `inventario_diario_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario_diario`
--

LOCK TABLES `inventario_diario` WRITE;
/*!40000 ALTER TABLE `inventario_diario` DISABLE KEYS */;
INSERT INTO `inventario_diario` VALUES (1,4,15,'2025-06-17'),(2,2,14,'2025-06-17'),(3,1,5,'2025-06-17');
/*!40000 ALTER TABLE `inventario_diario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `existencias` int(255) NOT NULL,
  `und_medida` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Lulo','cabezon',1,5000.00,15,'kilo','img/lulo.png'),(2,'Leche','Entera',3,12000.00,16,'litro','img/leche.png'),(3,'Huevos','Blancos o colorados',2,16000.00,11,'cubeta','img/huevo.png'),(4,'Cafe','Recien cosechado',2,24000.00,25,'kilo','img/cafe.png');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `rol` varchar(155) NOT NULL DEFAULT 'usuario',
  `clave` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','admin','$2y$10$SkjtVfohj.ocBlTe13y8jOrynUIJ37v/LA6jJ4X6rRB.BbOC62kYK'),(9,'Cuervo','usuario','$2y$10$eywESXySBoCyyMRQs5ycneUtoniScUUhSUnpeL.5CTWP2O5Z03zlC'),(10,'Juanito','usuario','$2y$10$jj6Pz1ZllymPoIai.mWKb.MGdeF4dRuy8Vrun3rQHCLaO/vZsdmbi'),(12,'Magolaa','usuario','$2y$10$0l48XzX4Ty0ldblcHnetzOqE5xy2Vfi/dQHPi6ffWVWQijM1SYYve');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL AUTO_INCREMENT,
  `fechaVenta` datetime DEFAULT current_timestamp(),
  `id_factura` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_venta`),
  KEY `ventas` (`id_factura`),
  CONSTRAINT `ventas` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id_factura`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (7,'2025-06-01 16:44:08',12),(8,'2025-06-01 16:45:52',13),(9,'2025-06-02 16:33:52',14),(10,'2025-06-03 07:23:17',15),(11,'2025-06-03 08:02:27',16),(12,'2025-06-03 08:59:10',17),(13,'2025-06-03 11:47:47',18),(14,'2025-06-10 08:26:18',19),(15,'2025-06-11 10:46:05',20),(16,'2025-06-11 10:46:33',21),(17,'2025-06-11 11:42:06',22),(18,'2025-06-17 11:37:44',23),(19,'2025-06-18 10:16:07',24);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-18 11:32:02
