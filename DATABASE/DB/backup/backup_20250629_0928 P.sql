-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: mercasena
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
  `ani_id` varchar(255) NOT NULL,
  `ani_raza` mediumtext DEFAULT NULL,
  `ani_tamano` mediumtext DEFAULT NULL,
  `ani_descripcion` longtext DEFAULT NULL,
  `ani_estado` int(11) DEFAULT NULL,
  PRIMARY KEY (`ani_id`),
  KEY `ani_estado` (`ani_estado`),
  CONSTRAINT `animales_ibfk_1` FOREIGN KEY (`ani_estado`) REFERENCES `animales_estado` (`aniE_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animales`
--

LOCK TABLES `animales` WRITE;
/*!40000 ALTER TABLE `animales` DISABLE KEYS */;
/*!40000 ALTER TABLE `animales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animales_estado`
--

DROP TABLE IF EXISTS `animales_estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `animales_estado` (
  `aniE_id` int(11) NOT NULL AUTO_INCREMENT,
  `aniE_estado` text DEFAULT NULL,
  PRIMARY KEY (`aniE_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animales_estado`
--

LOCK TABLES `animales_estado` WRITE;
/*!40000 ALTER TABLE `animales_estado` DISABLE KEYS */;
/*!40000 ALTER TABLE `animales_estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_inventario_diario`
--

DROP TABLE IF EXISTS `audit_inventario_diario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_inventario_diario`
--

LOCK TABLES `audit_inventario_diario` WRITE;
/*!40000 ALTER TABLE `audit_inventario_diario` DISABLE KEYS */;
/*!40000 ALTER TABLE `audit_inventario_diario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `cantidad_pedidos`
--

DROP TABLE IF EXISTS `cantidad_pedidos`;
/*!50001 DROP VIEW IF EXISTS `cantidad_pedidos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `cantidad_pedidos` AS SELECT
 1 AS `cantidad` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `detalles_usuarios`
--

DROP TABLE IF EXISTS `detalles_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalles_usuarios` (
  `detUsr_id` int(11) NOT NULL AUTO_INCREMENT,
  `tipoUsr_id` int(11) DEFAULT 2,
  `usr_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`detUsr_id`),
  KEY `tipoUsr_id` (`tipoUsr_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipoUsr_id`) REFERENCES `tipo_usuario` (`tipoUsr_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_usuarios`
--

LOCK TABLES `detalles_usuarios` WRITE;
/*!40000 ALTER TABLE `detalles_usuarios` DISABLE KEYS */;
INSERT INTO `detalles_usuarios` VALUES (4,2,'user_@sad_68161b54dec5b9.05790676'),(5,2,'user_gude_68161d4d99f868.41078040'),(6,3,'user_colc_68161fc0da9cb6.62445674'),(7,2,'user_il.c_6816b8bdd69937.63435904'),(8,2,'user_ori._6816c1dcc33753.68201660'),(9,2,'user_avin_6817defc478cb0.02435510'),(10,2,'user_il.c_6818b75dc0ff86.65774177'),(11,2,'user_i270_6818b7d18f70d6.09896065'),(12,2,'user_il.c_6818b7fd2be733.25284915'),(13,2,'user_ail._681b69b2c406e9.71526647'),(14,2,'user_@gma_681b6ca274c626.56892170'),(15,2,'user_ison_682365a3af61e0.61268305'),(16,2,'user_l.co_68237519ae2821.70599125'),(17,2,'user_@gma_6824eb002b7ea8.48633040'),(18,2,'user_dro@_6824ec9b69fbb8.89019806'),(19,2,'user_l@gm_6824fd2f639b96.62426789'),(20,2,'user_6@gm_682a519b1aeb78.24661902'),(21,2,'user_.com_682dec5bd5c441.02040337'),(22,2,'user_gmai_683460d02d23b7.39929486'),(23,2,'user_gmai_683f013de0bd12.57775401'),(24,2,'user_ulli_6850034385b7c0.16999860'),(25,2,'user_ison_68501cc697a9a5.28349657'),(26,2,'user_mail_68501e99bc2775.27159032'),(27,2,'user_.com_68503f3f045ba1.91842729');
/*!40000 ALTER TABLE `detalles_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_facturas`
--

DROP TABLE IF EXISTS `estado_facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado_facturas` (
  `facE_id` int(11) NOT NULL AUTO_INCREMENT,
  `facE_estado` tinytext DEFAULT NULL,
  `facE_fechaCreacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`facE_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_facturas`
--

LOCK TABLES `estado_facturas` WRITE;
/*!40000 ALTER TABLE `estado_facturas` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado_facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_pedido`
--

DROP TABLE IF EXISTS `estado_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estado_pedido` (
  `pedE_id` int(11) NOT NULL AUTO_INCREMENT,
  `pedE_estado` text DEFAULT NULL,
  `pedE_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`pedE_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_pedido`
--

LOCK TABLES `estado_pedido` WRITE;
/*!40000 ALTER TABLE `estado_pedido` DISABLE KEYS */;
INSERT INTO `estado_pedido` VALUES (1,'Pendiente','2025-04-23 03:25:41'),(2,'Por confirmar','2025-04-26 23:43:51'),(3,'Cancelado\r\n','2025-04-26 23:44:01'),(4,'Guardado','2025-06-25 12:51:09');
/*!40000 ALTER TABLE `estado_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facturas` (
  `fac_id` int(11) NOT NULL AUTO_INCREMENT,
  `usr_id` varchar(255) NOT NULL,
  `usr_noRegistrado` text NOT NULL,
  `fac_fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `fac_fechaBusqueda` date NOT NULL DEFAULT current_timestamp(),
  `fac_precioTotal` float NOT NULL,
  `cant_productos` int(11) NOT NULL,
  `pedi_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `pedi_id` text NOT NULL,
  PRIMARY KEY (`fac_id`),
  KEY `usuario_fk` (`usr_id`),
  KEY `fechaBusqueda` (`fac_fechaBusqueda`),
  KEY `Factura_usuarioNoRegistrado` (`usr_noRegistrado`(1024))
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` VALUES (75,'user_6@gm_682a519b1aeb78.24661902','','2025-06-17 08:36:33','2025-06-17',324000,3,'[{\"pedidoId\":\"ped_2025-06-17_68516ecf82f365.27467124\",\"precioTotal\":324000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-17\",\"telefono\":-1068350462,\"direccion  \":null,\"nit\":1033423412,\"productos\":[{\"id\":\"74\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"6000\"},{\"id\":\"79\",\"cantidad\":\"3\",\"name\":\"Kilogramos -  Cafe Arabigo\",\"precioUnitario\":\"100000\",\"precio\":\"300000\"},{\"id\":\"73\",\"cantidad\":\"3\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"18000\"}]}]','ped_2025-06-17_68516ecf82f365.27467124'),(76,'user_ison_68501cc697a9a5.28349657','','2025-06-17 11:00:53','2025-06-17',1242000,3,'[{\"pedidoId\":\"ped_2025-06-17_685173267309e9.06462993\",\"precioTotal\":1242000,\"Usuario\":\"Yeison \",\"fecha\":\"2025-06-17\",\"telefono\":-1068350462,\"direccion\":null,\"nit\":1033423412,\"productos\":[{\"id\":\"71\",\"cantidad\":\"4\",\"name\":\"Kilogramos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"24000\"},{\"id\":\"76\",\"cantidad\":\"6\",\"name\":\"Kilogramos -  Tomate de Ali\\u00f1o\",\"precioUnitario\":\"3000\",\"precio\":\"18000\"},{\"id\":\"79\",\"cantidad\":\"12\",\"name\":\"Kilogramos -  Cafe Arabigo\",\"precioUnitario\":\"100000\",\"precio\":\"1200000\"}]}]','ped_2025-06-17_685173267309e9.06462993'),(77,'user_6@gm_682a519b1aeb78.24661902','','2025-06-17 11:02:55','2025-06-17',14000,3,'[{\"pedidoId\":\"ped_2025-06-17_6851707d4e60b7.47488232\",\"precioTotal\":14000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-17\",\"telefono\":-1068350462,\"direccion\":null,\"nit\":null,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa ninguna\",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"76\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Tomate de Ali\\u00f1o\",\"precioUnitario\":\"3000\",\"precio\":\"6000\"},{\"id\":\"75\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Aguacate Hass\",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-06-17_6851707d4e60b7.47488232'),(78,'user_6@gm_682a519b1aeb78.24661902','','2025-06-17 11:10:06','2025-06-17',4000,1,'[{\"pedidoId\":\"ped_2025-06-17_685192e33797a8.76904041\",\"precioTotal\":4000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-17\",\"telefono\":-1068350462,\"direccion\":null,\"nit\":null,\"productos\":[{\"id\":\"63\",\"cantidad\":\"2\",\"name\":\"litros -  leche de Vaca\",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-06-17_685192e33797a8.76904041'),(79,'user_6@gm_682a519b1aeb78.24661902','','2025-06-17 11:14:19','2025-06-17',4000,1,'[{\"pedidoId\":\"ped_2025-06-17_685193d0ce22e4.26928142\",\"precioTotal\":4000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-17\",\"telefono\":-1068350462,\"direccion\":null,\"nit\":null,\"productos\":[{\"id\":\"75\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Aguacate Hass\",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-06-17_685193d0ce22e4.26928142'),(80,'user_6@gm_682a519b1aeb78.24661902','','2025-06-17 11:24:26','2025-06-17',100000,1,'[{\"pedidoId\":\"ped_2025-06-17_685196aa90fd04.45958245\",\"precioTotal\":100000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-17\",\"telefono\":-1068350462,\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"79\",\"cantidad\":\"1\",\"name\":\"Kilogramos -  Cafe Arabigo\",\"precioUnitario\":\"100000\",\"precio\":\"100000\"}]}]','ped_2025-06-17_685196aa90fd04.45958245'),(81,'user_6@gm_682a519b1aeb78.24661902','','2025-06-17 11:25:54','2025-06-17',100000,1,'[{\"pedidoId\":\"ped_2025-06-17_685196e08ab546.63099396\",\"precioTotal\":100000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-17\",\"telefono\":-1068350462,\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"79\",\"cantidad\":\"1\",\"name\":\"Kilogramos -  Cafe Arabigo\",\"precioUnitario\":\"100000\",\"precio\":\"100000\"}]}]','ped_2025-06-17_685196e08ab546.63099396'),(82,'user_6@gm_682a519b1aeb78.24661902','','2025-06-19 19:49:13','2025-06-19',12000,1,'[{\"pedidoId\":\"ped_2025-06-20_6854adcf46f427.63172386\",\"precioTotal\":12000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-20\",\"telefono\":-1068350462,\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"71\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"}]}]','ped_2025-06-20_6854adcf46f427.63172386'),(83,'user_6@gm_682a519b1aeb78.24661902','','2025-06-19 19:51:28','2025-06-19',18000,1,'[{\"pedidoId\":\"ped_2025-06-20_685492af8d3a98.97347998\",\"precioTotal\":18000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-20\",\"telefono\":-1068350462,\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"71\",\"cantidad\":\"3\",\"name\":\"Kilogramos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"18000\"}]}]','ped_2025-06-20_685492af8d3a98.97347998'),(84,'user_6@gm_682a519b1aeb78.24661902','','2025-06-19 19:53:15','2025-06-19',4000,1,'[{\"pedidoId\":\"ped_2025-06-20_6854b0c1627c91.81407979\",\"precioTotal\":4000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-20\",\"telefono\":-1068350462,\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa ninguna\",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-06-20_6854b0c1627c91.81407979'),(85,'user_6@gm_682a519b1aeb78.24661902','','2025-06-19 19:55:06','2025-06-19',72000,2,'[{\"pedidoId\":\"ped_2025-06-20_6854b0cd904208.97546873\",\"precioTotal\":72000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-20\",\"telefono\":-1068350462,\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"72\",\"cantidad\":\"3\",\"name\":\"Kilogramos -  Feijoa ninguna\",\"precioUnitario\":\"2000\",\"precio\":\"6000\"},{\"id\":\"71\",\"cantidad\":\"11\",\"name\":\"Kilogramos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"66000\"}]}]','ped_2025-06-20_6854b0cd904208.97546873'),(86,'user_6@gm_682a519b1aeb78.24661902','','2025-06-19 20:00:09','2025-06-19',207000,3,'[{\"pedidoId\":\"ped_2025-06-20_6854b18c4eaf93.26235216\",\"precioTotal\":207000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-20\",\"telefono\":-1068350462,\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"63\",\"cantidad\":\"2\",\"name\":\"litros -  leche de Vaca\",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"79\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Cafe Arabigo\",\"precioUnitario\":\"100000\",\"precio\":\"200000\"},{\"id\":\"74\",\"cantidad\":\"1\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"3000\"}]}]','ped_2025-06-20_6854b18c4eaf93.26235216'),(87,'user_6@gm_682a519b1aeb78.24661902','','2025-06-19 20:18:37','2025-06-19',132000,2,'[{\"pedidoId\":\"ped_2025-06-20_6854b6cf946794.47954775\",\"precioTotal\":132000,\"Usuario\":\"Jesus David Buitrago\",\"fecha\":\"2025-06-20\",\"telefono\":-1068350462,\"direccion\":\"Calle31 # 14 a 61 barrio galan\",\"nit\":\"\",\"productos\":[{\"id\":\"71\",\"cantidad\":\"21\",\"name\":\"Kilogramos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"126000\"},{\"id\":\"73\",\"cantidad\":\"1\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"6000\"}]}]','ped_2025-06-20_6854b6cf946794.47954775'),(88,'','','2025-06-25 08:38:30','2025-06-25',10000,1,'{\"customer\":\"\",\"customersPhone\":0,\"customerNit\":0,\"customerEmail\":0,\"customerAddress\":0,\"orderID\":\"\",\"total\":100328,\"products\":[{\"id\":\"79\",\"cantidad\":\"1\",\"name\":\"Kilogramos -  Cafe  Arabigo\",\"precioUnitario\":\"100000\",\"precio\":\"100000\"}]}','sin pedido ,facturado desde cero');
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fecha_ventas`
--

DROP TABLE IF EXISTS `fecha_ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fecha_ventas` (
  `ventaF_id` int(11) NOT NULL AUTO_INCREMENT,
  `vent_id` int(11) NOT NULL,
  `ventaF_fecha` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ventaF_id`),
  KEY `venta_fk` (`vent_id`),
  CONSTRAINT `venta_fk` FOREIGN KEY (`vent_id`) REFERENCES `ventas` (`vent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fecha_ventas`
--

LOCK TABLES `fecha_ventas` WRITE;
/*!40000 ALTER TABLE `fecha_ventas` DISABLE KEYS */;
/*!40000 ALTER TABLE `fecha_ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario_diario`
--

DROP TABLE IF EXISTS `inventario_diario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventario_diario` (
  `invD_id` int(11) NOT NULL AUTO_INCREMENT,
  `subCat_id` int(11) NOT NULL,
  `prod_Nombre` text NOT NULL,
  `antiguaCantidad` int(11) NOT NULL,
  `nuevaCantidad` int(11) NOT NULL,
  `cantidadTotal` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `invD_observaciones` text NOT NULL,
  PRIMARY KEY (`invD_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario_diario`
--

LOCK TABLES `inventario_diario` WRITE;
/*!40000 ALTER TABLE `inventario_diario` DISABLE KEYS */;
INSERT INTO `inventario_diario` VALUES (3,74,'LULO',12,12,24,'2025-06-19 10:59:22','2025-06-19','PRobando el modelo que no funciona'),(4,74,'   lulo  ',24,6,30,'2025-06-19 11:00:21','2025-06-19','salieron petardos'),(5,74,'   lulo  ',30,20,50,'2025-06-19 11:03:37','2025-06-19','salio todo bien'),(6,79,'   Cafe  Arabigo',2,20,22,'2025-06-19 11:05:18','2025-06-19','todo correcto'),(7,79,'   Cafe  Arabigo',20,5,25,'2025-06-25 07:23:50','2025-06-25','todo en orden'),(8,79,'   Cafe  Arabigo',20,5,25,'2025-06-25 07:24:00','2025-06-25','todo en orden'),(9,79,'   Cafe  Arabigo',30,5,35,'2025-06-25 07:27:18','2025-06-25','todo ok'),(10,79,'   Cafe  Arabigo',30,5,35,'2025-06-25 07:31:50','2025-06-25','nose'),(11,79,'   Cafe  Arabigo',30,5,35,'2025-06-25 07:34:39','2025-06-25',''),(12,79,'   Cafe  Arabigo',15,20,35,'2025-06-25 07:40:59','2025-06-25',''),(13,79,'   Cafe  Arabigo',35,1,36,'2025-06-25 07:44:20','2025-06-25',''),(14,79,'   Cafe  Arabigo',17,30,47,'2025-06-25 07:48:23','2025-06-25',''),(15,79,'   Cafe  Arabigo',15,9,24,'2025-06-25 08:09:23','2025-06-25',''),(16,74,'   Lulo  ',49,30,79,'2025-06-29 17:01:08','2025-06-29','Creo que salio');
/*!40000 ALTER TABLE `inventario_diario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidoproductos_estado`
--

DROP TABLE IF EXISTS `pedidoproductos_estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidoproductos_estado` (
  `pedProdE_id` int(11) NOT NULL AUTO_INCREMENT,
  `pedProdE_estado` tinytext NOT NULL,
  `prodPedE_cod` tinytext NOT NULL,
  PRIMARY KEY (`pedProdE_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidoproductos_estado`
--

LOCK TABLES `pedidoproductos_estado` WRITE;
/*!40000 ALTER TABLE `pedidoproductos_estado` DISABLE KEYS */;
INSERT INTO `pedidoproductos_estado` VALUES (1,'Activo','act'),(2,'fuera de las existencias','out');
/*!40000 ALTER TABLE `pedidoproductos_estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos` (
  `pedi_id` varchar(255) NOT NULL,
  `pedi_preciototal` float DEFAULT NULL,
  `pedE_id` int(11) NOT NULL DEFAULT 1,
  `pedi_fechaCreacion` date DEFAULT NULL,
  `pedi_fechaHora` datetime NOT NULL DEFAULT current_timestamp(),
  `usr_id` varchar(255) NOT NULL,
  PRIMARY KEY (`pedi_id`) USING BTREE,
  KEY `pedidos_estado_fk` (`pedE_id`),
  KEY `pedi_fechaCreacion` (`pedi_fechaCreacion`),
  KEY `usuario__pedido_fk` (`usr_id`),
  CONSTRAINT `pedidos_estado_fk` FOREIGN KEY (`pedE_id`) REFERENCES `estado_pedido` (`pedE_id`),
  CONSTRAINT `usuario__pedido_fk` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES ('ped_2025-06-09_6846db81ea13a3.01311132',407000,1,'2025-06-09','2025-06-09 08:02:57','user_l.co_68237519ae2821.70599125'),('ped_2025-06-16_68501c6c80cfb5.07133607',248000,1,'2025-06-16','2025-06-16 08:30:20','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c6eb41210.40337616',248000,1,'2025-06-16','2025-06-16 08:30:22','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c7940f8c4.29920941',248000,1,'2025-06-16','2025-06-16 08:30:33','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c795369d6.27535719',248000,1,'2025-06-16','2025-06-16 08:30:33','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c7b640c06.72754072',248000,1,'2025-06-16','2025-06-16 08:30:35','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c7b97fc47.16440488',248000,1,'2025-06-16','2025-06-16 08:30:35','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c8243d3d3.65597766',248000,1,'2025-06-16','2025-06-16 08:30:42','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c828cdf48.61201015',248000,1,'2025-06-16','2025-06-16 08:30:42','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c82bec927.56176270',248000,1,'2025-06-16','2025-06-16 08:30:42','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c8347f330.48832396',248000,1,'2025-06-16','2025-06-16 08:30:43','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c8465a4d5.60890617',248000,1,'2025-06-16','2025-06-16 08:30:44','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c869114c4.11848710',248000,1,'2025-06-16','2025-06-16 08:30:46','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_68501c86d9df97.65872949',248000,1,'2025-06-16','2025-06-16 08:30:46','user_ulli_6850034385b7c0.16999860'),('ped_2025-06-16_6850494155f1e2.81569888',630000,1,'2025-06-16','2025-06-16 11:41:37','user_ison_68501cc697a9a5.28349657'),('ped_2025-06-17_6851731ee4f3c9.86290064',1290000,1,'2025-06-17','2025-06-17 08:52:30','user_ison_68501cc697a9a5.28349657'),('ped_2025-06-25_685be8d30689e9.17800699',2300000,1,'2025-06-25','2025-06-25 07:17:23','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-25_685bf4711d8921.97242252',100000,1,'2025-06-25','2025-06-25 08:06:57','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-25_685bf572585da2.21746890',6000,1,'2025-06-25','2025-06-25 08:11:14','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-25_685bff7e39e088.44369275',42000,1,'2025-06-25','2025-06-25 08:54:06','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-25_685c0004118289.64317195',2110000,1,'2025-06-25','2025-06-25 08:56:20','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-25_685c17f8441957.25733472',30000,1,'2025-06-25','2025-06-25 10:38:32','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-28_685f2bdf64ba49.58507352',8000,1,'2025-06-27','2025-06-27 18:40:15','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-28_685f589e2d2063.42234630',12000,1,'2025-06-27','2025-06-27 21:51:10','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-28_685f5a68c2ca08.78156207',28000,1,'2025-06-27','2025-06-27 21:58:48','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-28_685f5accabb421.25699879',20000,1,'2025-06-27','2025-06-27 22:00:28','user_6@gm_682a519b1aeb78.24661902');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos_tiene_productos`
--

DROP TABLE IF EXISTS `pedidos_tiene_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos_tiene_productos` (
  `pedProd_id` int(11) NOT NULL AUTO_INCREMENT,
  `subCat_id` int(11) DEFAULT NULL,
  `pedi_id` varchar(255) DEFAULT NULL,
  `pedProd_precioParcial` float DEFAULT NULL,
  `pedProd_cantidad` float DEFAULT NULL,
  `pedProd_estado` int(2) NOT NULL DEFAULT 1,
  PRIMARY KEY (`pedProd_id`),
  KEY `productos_ped_estado_fk` (`pedProd_estado`),
  KEY `pedidoId_fk` (`pedi_id`),
  KEY `producto_fk` (`subCat_id`),
  CONSTRAINT `pedidoId_fk` FOREIGN KEY (`pedi_id`) REFERENCES `pedidos` (`pedi_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `producto_fk` FOREIGN KEY (`subCat_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `productos_ped_estado_fk` FOREIGN KEY (`pedProd_estado`) REFERENCES `pedidoproductos_estado` (`pedProdE_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2058 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos_tiene_productos`
--

LOCK TABLES `pedidos_tiene_productos` WRITE;
/*!40000 ALTER TABLE `pedidos_tiene_productos` DISABLE KEYS */;
INSERT INTO `pedidos_tiene_productos` VALUES (1871,72,'ped_2025-06-09_6846db81ea13a3.01311132',4000,2,2),(1872,79,'ped_2025-06-09_6846db81ea13a3.01311132',400000,4,1),(1873,74,'ped_2025-06-09_6846db81ea13a3.01311132',3000,1,1),(1890,63,'ped_2025-06-16_68501c6c80cfb5.07133607',4000,2,1),(1891,71,'ped_2025-06-16_68501c6c80cfb5.07133607',12000,2,1),(1892,72,'ped_2025-06-16_68501c6c80cfb5.07133607',4000,2,1),(1893,73,'ped_2025-06-16_68501c6c80cfb5.07133607',12000,2,2),(1894,74,'ped_2025-06-16_68501c6c80cfb5.07133607',6000,2,1),(1895,75,'ped_2025-06-16_68501c6c80cfb5.07133607',4000,2,1),(1896,76,'ped_2025-06-16_68501c6c80cfb5.07133607',6000,2,1),(1897,79,'ped_2025-06-16_68501c6c80cfb5.07133607',200000,2,1),(1898,63,'ped_2025-06-16_68501c6eb41210.40337616',4000,2,1),(1899,71,'ped_2025-06-16_68501c6eb41210.40337616',12000,2,1),(1900,72,'ped_2025-06-16_68501c6eb41210.40337616',4000,2,1),(1901,73,'ped_2025-06-16_68501c6eb41210.40337616',12000,2,2),(1902,74,'ped_2025-06-16_68501c6eb41210.40337616',6000,2,1),(1903,75,'ped_2025-06-16_68501c6eb41210.40337616',4000,2,1),(1904,76,'ped_2025-06-16_68501c6eb41210.40337616',6000,2,1),(1905,79,'ped_2025-06-16_68501c6eb41210.40337616',200000,2,1),(1906,63,'ped_2025-06-16_68501c7940f8c4.29920941',4000,1,1),(1907,71,'ped_2025-06-16_68501c7940f8c4.29920941',12000,1,1),(1908,72,'ped_2025-06-16_68501c7940f8c4.29920941',4000,1,1),(1909,73,'ped_2025-06-16_68501c7940f8c4.29920941',12000,1,2),(1910,74,'ped_2025-06-16_68501c7940f8c4.29920941',6000,1,1),(1911,75,'ped_2025-06-16_68501c7940f8c4.29920941',4000,1,1),(1912,76,'ped_2025-06-16_68501c7940f8c4.29920941',6000,1,1),(1913,79,'ped_2025-06-16_68501c7940f8c4.29920941',200000,1,1),(1914,63,'ped_2025-06-16_68501c795369d6.27535719',4000,1,1),(1915,71,'ped_2025-06-16_68501c795369d6.27535719',12000,1,1),(1916,72,'ped_2025-06-16_68501c795369d6.27535719',4000,1,1),(1917,73,'ped_2025-06-16_68501c795369d6.27535719',12000,1,2),(1918,74,'ped_2025-06-16_68501c795369d6.27535719',6000,1,1),(1919,75,'ped_2025-06-16_68501c795369d6.27535719',4000,1,1),(1920,76,'ped_2025-06-16_68501c795369d6.27535719',6000,1,1),(1921,79,'ped_2025-06-16_68501c795369d6.27535719',200000,1,1),(1922,63,'ped_2025-06-16_68501c7b640c06.72754072',4000,1,1),(1923,71,'ped_2025-06-16_68501c7b640c06.72754072',12000,1,1),(1924,72,'ped_2025-06-16_68501c7b640c06.72754072',4000,1,1),(1925,73,'ped_2025-06-16_68501c7b640c06.72754072',12000,1,2),(1926,74,'ped_2025-06-16_68501c7b640c06.72754072',6000,1,1),(1927,75,'ped_2025-06-16_68501c7b640c06.72754072',4000,1,1),(1928,76,'ped_2025-06-16_68501c7b640c06.72754072',6000,1,1),(1929,79,'ped_2025-06-16_68501c7b640c06.72754072',200000,1,1),(1930,63,'ped_2025-06-16_68501c7b97fc47.16440488',4000,1,1),(1931,71,'ped_2025-06-16_68501c7b97fc47.16440488',12000,1,1),(1932,72,'ped_2025-06-16_68501c7b97fc47.16440488',4000,1,1),(1933,73,'ped_2025-06-16_68501c7b97fc47.16440488',12000,1,2),(1934,74,'ped_2025-06-16_68501c7b97fc47.16440488',6000,1,1),(1935,75,'ped_2025-06-16_68501c7b97fc47.16440488',4000,1,1),(1936,76,'ped_2025-06-16_68501c7b97fc47.16440488',6000,1,1),(1937,79,'ped_2025-06-16_68501c7b97fc47.16440488',200000,1,1),(1938,63,'ped_2025-06-16_68501c8243d3d3.65597766',4000,1,1),(1939,71,'ped_2025-06-16_68501c8243d3d3.65597766',12000,1,1),(1940,72,'ped_2025-06-16_68501c8243d3d3.65597766',4000,1,1),(1941,73,'ped_2025-06-16_68501c8243d3d3.65597766',12000,1,2),(1942,74,'ped_2025-06-16_68501c8243d3d3.65597766',6000,1,1),(1943,75,'ped_2025-06-16_68501c8243d3d3.65597766',4000,1,1),(1944,76,'ped_2025-06-16_68501c8243d3d3.65597766',6000,1,1),(1945,79,'ped_2025-06-16_68501c8243d3d3.65597766',200000,1,1),(1946,63,'ped_2025-06-16_68501c828cdf48.61201015',4000,1,1),(1947,71,'ped_2025-06-16_68501c828cdf48.61201015',12000,1,1),(1948,72,'ped_2025-06-16_68501c828cdf48.61201015',4000,1,1),(1949,73,'ped_2025-06-16_68501c828cdf48.61201015',12000,1,2),(1950,74,'ped_2025-06-16_68501c828cdf48.61201015',6000,1,1),(1951,75,'ped_2025-06-16_68501c828cdf48.61201015',4000,1,1),(1952,76,'ped_2025-06-16_68501c828cdf48.61201015',6000,1,1),(1953,79,'ped_2025-06-16_68501c828cdf48.61201015',200000,1,1),(1954,63,'ped_2025-06-16_68501c82bec927.56176270',4000,1,1),(1955,71,'ped_2025-06-16_68501c82bec927.56176270',12000,1,1),(1956,72,'ped_2025-06-16_68501c82bec927.56176270',4000,1,1),(1957,73,'ped_2025-06-16_68501c82bec927.56176270',12000,1,2),(1958,74,'ped_2025-06-16_68501c82bec927.56176270',6000,1,1),(1959,75,'ped_2025-06-16_68501c82bec927.56176270',4000,1,1),(1960,76,'ped_2025-06-16_68501c82bec927.56176270',6000,1,1),(1961,79,'ped_2025-06-16_68501c82bec927.56176270',200000,1,1),(1962,63,'ped_2025-06-16_68501c8347f330.48832396',4000,1,1),(1963,71,'ped_2025-06-16_68501c8347f330.48832396',12000,1,1),(1964,72,'ped_2025-06-16_68501c8347f330.48832396',4000,1,1),(1965,73,'ped_2025-06-16_68501c8347f330.48832396',12000,1,2),(1966,74,'ped_2025-06-16_68501c8347f330.48832396',6000,1,1),(1967,75,'ped_2025-06-16_68501c8347f330.48832396',4000,1,1),(1968,76,'ped_2025-06-16_68501c8347f330.48832396',6000,1,1),(1969,79,'ped_2025-06-16_68501c8347f330.48832396',200000,1,1),(1970,63,'ped_2025-06-16_68501c8465a4d5.60890617',4000,1,1),(1971,71,'ped_2025-06-16_68501c8465a4d5.60890617',12000,1,1),(1972,72,'ped_2025-06-16_68501c8465a4d5.60890617',4000,1,1),(1973,73,'ped_2025-06-16_68501c8465a4d5.60890617',12000,1,2),(1974,74,'ped_2025-06-16_68501c8465a4d5.60890617',6000,1,1),(1975,75,'ped_2025-06-16_68501c8465a4d5.60890617',4000,1,1),(1976,76,'ped_2025-06-16_68501c8465a4d5.60890617',6000,1,1),(1977,79,'ped_2025-06-16_68501c8465a4d5.60890617',200000,1,1),(1978,63,'ped_2025-06-16_68501c869114c4.11848710',4000,1,1),(1979,71,'ped_2025-06-16_68501c869114c4.11848710',12000,1,1),(1980,72,'ped_2025-06-16_68501c869114c4.11848710',4000,1,1),(1981,73,'ped_2025-06-16_68501c869114c4.11848710',12000,1,2),(1982,74,'ped_2025-06-16_68501c869114c4.11848710',6000,1,1),(1983,75,'ped_2025-06-16_68501c869114c4.11848710',4000,1,1),(1984,76,'ped_2025-06-16_68501c869114c4.11848710',6000,1,1),(1985,79,'ped_2025-06-16_68501c869114c4.11848710',200000,1,1),(1986,63,'ped_2025-06-16_68501c86d9df97.65872949',4000,1,1),(1987,71,'ped_2025-06-16_68501c86d9df97.65872949',12000,1,1),(1988,72,'ped_2025-06-16_68501c86d9df97.65872949',4000,1,1),(1989,73,'ped_2025-06-16_68501c86d9df97.65872949',12000,1,2),(1990,74,'ped_2025-06-16_68501c86d9df97.65872949',6000,1,1),(1991,75,'ped_2025-06-16_68501c86d9df97.65872949',4000,1,1),(1992,76,'ped_2025-06-16_68501c86d9df97.65872949',6000,1,1),(1993,79,'ped_2025-06-16_68501c86d9df97.65872949',200000,1,1),(1996,63,'ped_2025-06-16_6850494155f1e2.81569888',6000,3,1),(1997,73,'ped_2025-06-16_6850494155f1e2.81569888',24000,4,2),(1998,79,'ped_2025-06-16_6850494155f1e2.81569888',600000,6,1),(2006,71,'ped_2025-06-17_6851731ee4f3c9.86290064',24000,4,1),(2007,76,'ped_2025-06-17_6851731ee4f3c9.86290064',18000,6,1),(2008,73,'ped_2025-06-17_6851731ee4f3c9.86290064',48000,8,2),(2009,79,'ped_2025-06-17_6851731ee4f3c9.86290064',1200000,12,1),(2037,79,'ped_2025-06-25_685be8d30689e9.17800699',2300000,23,2),(2041,79,'ped_2025-06-25_685bf4711d8921.97242252',100000,1,1),(2042,71,'ped_2025-06-25_685bf572585da2.21746890',6000,1,1),(2044,75,'ped_2025-06-25_685bff7e39e088.44369275',42000,21,2),(2045,75,'ped_2025-06-25_685c0004118289.64317195',2000,1,1),(2046,79,'ped_2025-06-25_685c0004118289.64317195',2100000,21,2),(2047,72,'ped_2025-06-25_685c0004118289.64317195',2000,1,1),(2048,73,'ped_2025-06-25_685c0004118289.64317195',6000,1,1),(2049,73,'ped_2025-06-25_685c17f8441957.25733472',18000,3,1),(2050,72,'ped_2025-06-25_685c17f8441957.25733472',12000,6,1),(2051,63,'ped_2025-06-28_685f2bdf64ba49.58507352',8000,4,1),(2052,73,'ped_2025-06-28_685f589e2d2063.42234630',12000,2,1),(2055,72,'ped_2025-06-28_685f5a68c2ca08.78156207',4000,2,1),(2056,71,'ped_2025-06-28_685f5accabb421.25699879',12000,2,1),(2057,72,'ped_2025-06-28_685f5accabb421.25699879',8000,4,1);
/*!40000 ALTER TABLE `pedidos_tiene_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `prod_id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_nombre` varchar(45) DEFAULT NULL,
  `prod_fechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`prod_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (31,'Frijol','2025-05-19 07:17:31'),(32,'Feijoa','2025-05-19 07:36:46'),(33,'leche','2025-05-19 07:59:49'),(34,'Cafe','2025-05-19 08:05:49'),(35,'Lulo','2025-05-19 08:18:24'),(36,'papa','2025-05-20 08:20:19'),(37,'Aguacate','2025-05-20 08:35:32'),(38,'Tomate','2025-05-20 08:41:33'),(39,'nueces','2025-05-20 08:45:59'),(40,'Huevos','2025-05-24 18:57:26');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_categoria`
--

DROP TABLE IF EXISTS `productos_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_categoria` (
  `prodCat_id` int(11) NOT NULL AUTO_INCREMENT,
  `prodCat_fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  `prodCat_categoria` tinytext DEFAULT NULL,
  PRIMARY KEY (`prodCat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_categoria`
--

LOCK TABLES `productos_categoria` WRITE;
/*!40000 ALTER TABLE `productos_categoria` DISABLE KEYS */;
INSERT INTO `productos_categoria` VALUES (49,'2025-05-05 16:36:12','Frutas'),(50,'2025-05-07 02:17:10','Comestibles'),(51,'2025-05-07 14:00:48','lacteos'),(52,'2025-05-19 12:18:48','Granos'),(53,'2025-05-20 13:40:00','Legumbres'),(55,'2025-06-18 12:44:03','Carnicos');
/*!40000 ALTER TABLE `productos_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_estado`
--

DROP TABLE IF EXISTS `productos_estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_estado` (
  `prodE_id` int(11) NOT NULL AUTO_INCREMENT,
  `prodE_estado` text DEFAULT NULL,
  `prodE_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`prodE_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_estado`
--

LOCK TABLES `productos_estado` WRITE;
/*!40000 ALTER TABLE `productos_estado` DISABLE KEYS */;
INSERT INTO `productos_estado` VALUES (3,'Disponible','2025-03-17 21:56:37'),(5,'Agotado','2025-03-17 22:42:21'),(6,'Pocas Unidades','2025-03-17 22:47:56');
/*!40000 ALTER TABLE `productos_estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_imagenes`
--

DROP TABLE IF EXISTS `productos_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_imagenes` (
  `prodImg_id` int(11) NOT NULL AUTO_INCREMENT,
  `prodImg_ruta` text DEFAULT NULL,
  `subCat_id` int(11) DEFAULT NULL,
  `prodImg_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `prodImg_miniatura` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`prodImg_id`),
  KEY `subCat_id` (`subCat_id`) USING BTREE,
  CONSTRAINT `productos_imagenes_ibfk_1` FOREIGN KEY (`subCat_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_imagenes`
--

LOCK TABLES `productos_imagenes` WRITE;
/*!40000 ALTER TABLE `productos_imagenes` DISABLE KEYS */;
INSERT INTO `productos_imagenes` VALUES (26,'/mercasena/public/images/leche.png',63,'2025-05-19 13:04:10',1),(33,'/mercasena/public/images/frijo.png',71,'2025-05-20 13:13:27',1),(34,'/mercasena/public/images/feijoa.png',72,'2025-05-20 13:19:34',1),(35,'/mercasena/public/images/papas.jpg',73,'2025-05-20 13:20:53',1),(36,'/mercasena/public/images/lulo.png',74,'2025-05-20 13:22:47',1),(37,'/mercasena/public/images/aguacate.jpg',75,'2025-05-20 13:37:15',1),(38,'/mercasena/public/images/tomate.png',76,'2025-05-20 13:42:35',1),(41,'/mercasena/public/images/cafe.png',79,'2025-05-21 15:16:11',1);
/*!40000 ALTER TABLE `productos_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_medidaventa`
--

DROP TABLE IF EXISTS `productos_medidaventa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_medidaventa` (
  `prodMed_id` int(11) NOT NULL AUTO_INCREMENT,
  `prodMed_medida` text DEFAULT NULL,
  `prodMed_factor` float NOT NULL DEFAULT 1,
  `prodMed_fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`prodMed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_medidaventa`
--

LOCK TABLES `productos_medidaventa` WRITE;
/*!40000 ALTER TABLE `productos_medidaventa` DISABLE KEYS */;
INSERT INTO `productos_medidaventa` VALUES (1,'Centesimos',1,'2025-03-17 23:18:54'),(4,'Cubeta',30,'2025-03-18 20:06:14'),(6,'litros',1,'2025-04-07 00:41:36'),(13,'Kilogramos',1,'2025-05-05 16:44:27');
/*!40000 ALTER TABLE `productos_medidaventa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_pesoventa`
--

DROP TABLE IF EXISTS `productos_pesoventa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_pesoventa` (
  `prodPes_id` int(11) NOT NULL AUTO_INCREMENT,
  `prodPes_medida` text DEFAULT NULL,
  `prodPes_fechaCreacion` timestamp NULL DEFAULT current_timestamp(),
  `prodPes_numero` int(11) DEFAULT 1,
  PRIMARY KEY (`prodPes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_pesoventa`
--

LOCK TABLES `productos_pesoventa` WRITE;
/*!40000 ALTER TABLE `productos_pesoventa` DISABLE KEYS */;
INSERT INTO `productos_pesoventa` VALUES (1,'default','2025-03-18 00:14:49',1);
/*!40000 ALTER TABLE `productos_pesoventa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_subcategorias`
--

DROP TABLE IF EXISTS `productos_subcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos_subcategorias` (
  `subCat_id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`subCat_id`),
  KEY `prodE_id_fk` (`prodE_id`),
  KEY `prodMed_id_fk` (`prodMed_id`),
  KEY `categorias_kf` (`prodCat_id`),
  KEY `productos_fk` (`prod_id`),
  CONSTRAINT `categorias_kf` FOREIGN KEY (`prodCat_id`) REFERENCES `productos_categoria` (`prodCat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `prioducto_medida_fk` FOREIGN KEY (`prodMed_id`) REFERENCES `productos_medidaventa` (`prodMed_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `productos_estado_fk` FOREIGN KEY (`prodE_id`) REFERENCES `productos_estado` (`prodE_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `productos_fk` FOREIGN KEY (`prod_id`) REFERENCES `productos` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_subcategorias`
--

LOCK TABLES `productos_subcategorias` WRITE;
/*!40000 ALTER TABLE `productos_subcategorias` DISABLE KEYS */;
INSERT INTO `productos_subcategorias` VALUES (63,33,'de Vaca','2025-05-19 13:03:55','2025-06-29 19:17:16',994,2000,6,1,NULL,NULL,1,3,51,0),(66,32,'nose','2025-05-19 13:10:13','2025-06-29 19:17:16',889,887897,4,1,NULL,NULL,1,3,52,0),(71,31,'Rojo','2025-05-20 13:13:12','2025-06-29 19:17:16',253,6000,13,1,NULL,NULL,1,3,52,0),(72,32,'default','2025-05-20 13:19:19','2025-06-29 19:40:40',188,2000,13,1,NULL,NULL,1,3,49,0),(73,36,'parda','2025-05-20 13:20:38','2025-06-29 19:17:16',119,6000,13,1,NULL,NULL,1,3,49,0),(74,35,'default','2025-05-20 13:22:32','2025-06-29 19:17:16',79,3000,13,1,NULL,NULL,1,3,49,0),(75,37,'Hass','2025-05-20 13:37:01','2025-06-29 19:17:16',20,2000,13,1,NULL,NULL,1,3,49,0),(76,38,'de Aliño','2025-05-20 13:42:20','2025-06-29 19:17:16',85,3000,13,1,NULL,NULL,1,3,53,0),(79,34,'Arabigo','2025-05-21 15:15:56','2025-06-29 21:27:59',400,700000,13,1,NULL,NULL,1,3,52,0),(80,39,'default','2025-05-26 05:12:56','2025-06-29 19:17:16',5464,200000,13,1,NULL,NULL,1,3,50,0),(81,38,'default','2025-05-26 05:14:58','2025-06-29 19:17:16',5464,200000,6,1,NULL,NULL,1,3,51,0),(82,32,'default','2025-05-26 05:16:20','2025-06-29 19:17:16',5464,200000,13,1,NULL,NULL,1,3,51,0),(83,32,'default','2025-05-26 05:17:21','2025-06-29 19:17:16',5464,200000,13,1,NULL,NULL,1,3,51,0),(84,32,'default','2025-05-26 05:17:58','2025-06-29 19:17:16',5464,200000,13,1,NULL,NULL,1,3,51,0),(86,37,'sd','2025-06-20 05:07:02','2025-06-29 19:17:16',233,200000,6,1,NULL,NULL,1,3,55,0),(87,37,'sd','2025-06-20 05:07:34','2025-06-29 19:17:16',233,200000,6,1,NULL,NULL,1,3,55,0),(89,36,'default','2025-06-20 05:18:17','2025-06-29 19:17:16',233,3500000,4,1,NULL,NULL,1,3,53,0),(90,36,'nose','2025-06-20 05:22:22','2025-06-29 19:17:16',233,3500000,13,1,NULL,NULL,1,3,55,0),(91,39,'nose','2025-06-20 05:27:40','2025-06-29 19:17:16',233,3500000,13,1,NULL,NULL,1,3,52,0),(92,39,'default','2025-06-20 05:33:55','2025-06-29 19:17:16',7,200000,13,1,NULL,NULL,1,3,51,0),(93,37,'default','2025-06-20 05:49:43','2025-06-29 19:17:16',34234,234234,4,1,NULL,NULL,1,3,55,0),(94,31,'nose','2025-06-25 13:58:49','2025-06-29 19:17:16',345,45,13,1,NULL,NULL,1,3,53,0),(95,32,'nose','2025-06-25 14:01:36','2025-06-29 19:17:16',34535,25345,13,1,NULL,NULL,1,3,53,0),(96,32,'34535','2025-06-25 14:06:37','2025-06-29 19:17:16',345345,354345,13,1,NULL,NULL,1,3,55,0),(97,31,'default','2025-06-25 14:11:56','2025-06-29 19:17:16',234,24,13,1,NULL,NULL,1,3,55,0),(98,31,'default','2025-06-25 14:14:26','2025-06-29 19:17:16',2342,24234,6,1,NULL,NULL,1,3,53,0),(99,31,'default','2025-06-25 14:20:01','2025-06-29 19:17:16',43434,343443,13,1,NULL,NULL,1,3,53,0),(100,32,'default','2025-06-25 14:22:20','2025-06-29 19:17:16',234,234,6,1,NULL,NULL,1,3,53,0),(101,32,'default','2025-06-25 14:27:10','2025-06-29 19:17:16',234,23242243,13,1,NULL,NULL,1,3,53,0),(102,32,'default','2025-06-25 14:29:55','2025-06-29 19:17:16',2342,2424,13,1,NULL,NULL,1,3,55,0),(103,40,'default','2025-06-25 15:47:54','2025-06-29 19:17:16',234,14500,4,1,NULL,NULL,1,3,50,0),(104,31,'default','2025-06-25 16:51:06','2025-06-29 19:17:16',242,23423,13,1,NULL,NULL,1,3,53,0),(105,31,'default','2025-06-25 16:52:12','2025-06-29 19:17:16',535,34535,13,1,NULL,NULL,1,3,52,0),(106,33,'default','2025-06-25 16:53:43','2025-06-29 19:17:16',5646,46456,6,1,NULL,NULL,1,3,53,0),(107,33,'default','2025-06-25 16:55:21','2025-06-29 19:17:16',567567,45675675,13,1,NULL,NULL,1,3,53,0),(108,31,'default','2025-06-25 18:24:30','2025-06-29 19:17:16',1321,3464,13,1,NULL,NULL,1,3,53,0),(109,33,'default','2025-06-25 19:47:50','2025-06-29 19:17:16',234234,456546,6,1,NULL,NULL,1,3,53,0),(110,37,'default','2025-06-29 13:06:37','2025-06-29 19:17:16',45646,100000,4,1,NULL,NULL,1,3,55,0),(111,37,'default','2025-06-29 13:09:31','2025-06-29 19:17:16',45353,200000,4,1,NULL,NULL,1,3,55,0),(120,37,'default','2025-06-29 20:06:04','2025-06-29 19:17:16',345,3500000,13,1,NULL,NULL,1,3,53,0);
/*!40000 ALTER TABLE `productos_subcategorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `pseudoid`
--

DROP TABLE IF EXISTS `pseudoid`;
/*!50001 DROP VIEW IF EXISTS `pseudoid`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `pseudoid` AS SELECT
 1 AS `id` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `punto_venta`
--

DROP TABLE IF EXISTS `punto_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `punto_venta` (
  `puntVen_ID` int(11) NOT NULL AUTO_INCREMENT,
  `puntVen_nombre` text NOT NULL,
  PRIMARY KEY (`puntVen_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punto_venta`
--

LOCK TABLES `punto_venta` WRITE;
/*!40000 ALTER TABLE `punto_venta` DISABLE KEYS */;
INSERT INTO `punto_venta` VALUES (1,'Regional Caldas\r\n');
/*!40000 ALTER TABLE `punto_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `punto_venta_imagenes`
--

DROP TABLE IF EXISTS `punto_venta_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `punto_venta_imagenes` (
  `puntImg_id` int(11) NOT NULL AUTO_INCREMENT,
  `puntImg_ruta` text NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`puntImg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punto_venta_imagenes`
--

LOCK TABLES `punto_venta_imagenes` WRITE;
/*!40000 ALTER TABLE `punto_venta_imagenes` DISABLE KEYS */;
INSERT INTO `punto_venta_imagenes` VALUES (3,'/public/assets/banner/images/fondo.png','2025-05-05 08:48:10'),(4,'/public/assets/banner/images/imglogin.png','2025-05-05 08:48:10'),(6,'/public/assets/banner/images/oferta_1.png','2025-06-20 00:55:12'),(7,'/public/assets/banner/images/oferta_2.png','2025-06-20 00:55:12');
/*!40000 ALTER TABLE `punto_venta_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_usuario` (
  `tipoUsr_id` int(11) NOT NULL AUTO_INCREMENT,
  `tipoUsr_tipo` enum('admin','auditor','proveedor','cliente','invitado') NOT NULL,
  PRIMARY KEY (`tipoUsr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,'invitado'),(2,'cliente'),(3,'admin'),(4,'proveedor'),(5,'auditor');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `todainformacionsobreproductos`
--

DROP TABLE IF EXISTS `todainformacionsobreproductos`;
/*!50001 DROP VIEW IF EXISTS `todainformacionsobreproductos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `todainformacionsobreproductos` AS SELECT
 1 AS `productoID`,
  1 AS `productoPadreID`,
  1 AS `estadoID`,
  1 AS `categoriaID`,
  1 AS `medidaID`,
  1 AS `variacion`,
  1 AS `existencias`,
  1 AS `precio`,
  1 AS `descripcion`,
  1 AS `categoria`,
  1 AS `fechaCreacion`,
  1 AS `producto`,
  1 AS `medidaVenta`,
  1 AS `estado`,
  1 AS `imagen` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `ultimoidporfecha`
--

DROP TABLE IF EXISTS `ultimoidporfecha`;
/*!50001 DROP VIEW IF EXISTS `ultimoidporfecha`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `ultimoidporfecha` AS SELECT
 1 AS `id` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `usr_id` varchar(255) NOT NULL,
  `usr_correo` text NOT NULL,
  `usr_nombre` tinytext NOT NULL,
  `usr_direccion` text DEFAULT NULL,
  `usr_telefono` text DEFAULT NULL,
  `usr_imagen` text NOT NULL,
  `NIT` text DEFAULT NULL,
  `tipoUsr` int(10) DEFAULT NULL,
  `usr_contrasena_hash` text NOT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('user_.com_682dec5bd5c441.02040337','juan@gmail.com','colchonate con la comodidad de la casa','calle 123','1234567890','','1234567890',NULL,'$2y$10$pSUfWekzwh9yD8hBHWo4N.T2yuLmisdTPG6JgGbT.CUXqTHS58uUS'),('user_.com_68503f3f045ba1.91842729','sofia@gmail.com','sad sofia ',NULL,NULL,'',NULL,NULL,'$2y$10$KxfOz19yGpo2QIR0LXutbuCKQvSUG5exv0i0BgZ0Z49JeekH8mfeO'),('user_6@gm_682a519b1aeb78.24661902','buitragoagudeloj006@gmail.com','Jesus David Buitrago','Calle31 # 14 a 61 barrio galan','3226616834','','',NULL,'$2y$10$usWBUtpsMmd6lgWW/aybAOKTOB8BcnilPB9ZCAZtEWdT1x.KB9wtG'),('user_@gma_681b6ca274c626.56892170','dani@gmail.com','Daniel Felipe Grajales',NULL,NULL,'',NULL,NULL,'$2y$10$q.PCEuyTi5CPNejGQNZ8DejJu0YZZPj8arpKw.cDfv6JfF0fayONq'),('user_@gma_6824eb002b7ea8.48633040','yeshua@gmail.com','Jesus David Buitrago Agudelo',NULL,NULL,'',NULL,NULL,'$2y$10$0zvaGgocuOAtBVQOPUkOUuYRJ/cuzhailxC.Xm4UCMC6KILd08DsG'),('user_@sad_68161b54dec5b9.05790676','sa@sad','sad',NULL,NULL,'',NULL,NULL,'$2y$10$X85rE/br8SE74LNxCxfAAupY5.qUXyo9EwkJBQvgXAdcsYDbYH9Ty'),('user_ail._681b69b2c406e9.71526647','carlos@gmail.com','Carlos Andres Loaiza Rendon',NULL,NULL,'',NULL,NULL,'$2y$10$5D0HEQg6toHaCz2vvBXtzOYpINZHuD6gDvchlAbb1rBcmqV/V/Q.S'),('user_avin_6817defc478cb0.02435510','davinci@gmail.com','Leonardo Davinci',NULL,NULL,'',NULL,NULL,'$2y$10$PRcODT2OK9DqdlVT5r9Qbu1IaF69ybdYa/sqxJyN2yqgt25b1Flnq'),('user_colc_68161fc0da9cb6.62445674','admin@gmail.com','Crashelly',NULL,NULL,'',NULL,NULL,'$2y$10$VozF1hMDkfwpVKk4yCGIp.YVHH8dfI6HSiUXsivZDi.1n6wC3xzfe'),('user_dro@_6824ec9b69fbb8.89019806','alejandro@gmail.com','Alejandro Posada',NULL,NULL,'',NULL,NULL,'$2y$10$U7zw8VnZq/rKkN7dBZeTbOoABjPsX61iKr20U3g1BS8iBErlY7UfO'),('user_gmai_683460d02d23b7.39929486','adso@gmail.com','Alejandro Posada Castaño',NULL,NULL,'',NULL,NULL,'$2y$10$mRvQVlOZpeJvktxWByf2b.IxYO5DkEqzlNzweApVaV1SG.iwNjMze'),('user_gmai_683f013de0bd12.57775401','salome@gmail.com','Salome Rodriguez Rios',NULL,NULL,'',NULL,NULL,'$2y$10$tiY7a6McRXHxxt1BAz.KLusVAT731Mcisu8XvJHuWpRBlBR3w3K32'),('user_gude_68161d4d99f868.41078040','buitragoagudeloj007@gmail.com','Jesus David Buitrago Agudelo',NULL,NULL,'',NULL,NULL,'$2y$10$Pl4p7Llc1Je9kQpP.KuixeBkWzFzCLTtghIQg3bDUc8BtYDsmyTLG'),('user_i270_6818b7d18f70d6.09896065','yamori2708@gmail.com','Yeison ',NULL,NULL,'',NULL,NULL,'$2y$10$WJNCR0PguViZePZhb7iw2.odqndz7tMAIZb/GkxWLp78TA9FIU7Ha'),('user_il.c_6816b8bdd69937.63435904','papa@gmail.com','Luis Evelio Buitrago Giraldo',NULL,NULL,'',NULL,NULL,'$2y$10$3T5UkpdC4XDGSIQC.VnTwO62W.hyYETGWYIKxXS7nvaeZ/pXyTk6y'),('user_il.c_6818b75dc0ff86.65774177','r0772284@gmail.com','Alejandro Posada Castaño',NULL,NULL,'',NULL,NULL,'$2y$10$.nhR8EwIBn8Q4Xm9fXpOA.hLnOgYU3vp0mPaM1wwNBPFS5pHQAI/.'),('user_il.c_6818b7fd2be733.25284915','yamori@gmail.com','Yeison Acevedo',NULL,NULL,'',NULL,NULL,'$2y$10$qBDhShEn0QDTSXypk2agZu0/0BPKqSZtlInbyY6fj2QcGyh64yniC'),('user_ison_682365a3af61e0.61268305','yeison@gmail.com','Yeison Stiven ',NULL,NULL,'',NULL,NULL,'$2y$10$EpD.Kw767ncRt3zR0qvpouIXTzCg7WKETHo2JjYvPTKKORuZsqYji'),('user_ison_68501cc697a9a5.28349657','yeison123@gmail.com','Yeison ',NULL,NULL,'',NULL,NULL,'$2y$10$ZFHHgVENxzhOAV7B7RHby.yD1n0H5VbeRV8pzDqv3iRj/c9cgPWTq'),('user_l.co_68237519ae2821.70599125','danielito@gmail.com','Daniel Felipe Grajales','Calle 69B # 24-03','3224455321','','1033423412',NULL,'$2y$10$kFDSAVewe3Fkczj38C222erjht8geUvqqJHOGAppWiNvbJBQylVAO'),('user_l@gm_6824fd2f639b96.62426789','Daniel@gmail.com','Daniel Grajales ',NULL,NULL,'',NULL,NULL,'$2y$10$MnlTxnjl6rzU7RU14aJd6ePldt4Ljulhq/d2S4gEpnt2eMIKHTLNm'),('user_mail_68501e99bc2775.27159032','dg930603@gmail.com','Daniel Grajales',NULL,NULL,'',NULL,NULL,'$2y$10$WyK1aXfN7av/MqBuR7hjSOO9yMfNLbGfNxmCredXaw6Dhf.YcJHrG'),('user_ori._6816c1dcc33753.68201660','mori@mori.com','EL mori',NULL,NULL,'',NULL,NULL,'$2y$10$PYx69HMbHIKoCiY.TnQHIeCzNgfw8tRmW3cHKMmZQiU/CiVYJlxvu'),('user_ulli_6850034385b7c0.16999860','sulliv95@gmail.com','miguel martinez','cra32B #100d-35','3004447985','','',NULL,'$2y$10$nPzHDISgzXUBB4smAcT5MOu0pXxDxjmUsxHePemn0OQ0u6OOI4e5O');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventas` (
  `vent_id` int(11) NOT NULL AUTO_INCREMENT,
  `vent_fechaVenta` timestamp NOT NULL DEFAULT current_timestamp(),
  `ven_fecha` date NOT NULL DEFAULT current_timestamp(),
  `fac_id` int(11) DEFAULT NULL,
  `prod_id` int(11) NOT NULL,
  `prod_cant` int(11) NOT NULL,
  `prod_precio` float NOT NULL,
  PRIMARY KEY (`vent_id`),
  KEY `fac_id` (`fac_id`),
  KEY `ventas_ibfk_1` (`prod_id`),
  CONSTRAINT `fk_factura_venta` FOREIGN KEY (`fac_id`) REFERENCES `facturas` (`fac_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (39,'2025-06-05 17:57:51','2025-06-05',NULL,75,1,2000),(40,'2025-06-05 17:57:51','2025-06-05',NULL,75,1,2000),(41,'2025-06-05 17:59:38','2025-06-05',NULL,75,1,2000),(42,'2025-06-05 17:59:38','2025-06-05',NULL,74,2,6000),(43,'2025-06-08 05:31:46','2025-06-08',NULL,79,1,100000),(44,'2025-06-12 04:29:33','2025-06-11',NULL,63,1,24000),(45,'2025-06-12 04:29:33','2025-06-11',NULL,71,1,6000),(46,'2025-06-12 04:49:24','2025-06-11',NULL,73,0,0),(47,'2025-06-12 04:49:24','2025-06-11',NULL,74,1,3000),(48,'2025-06-13 01:37:29','2025-06-12',NULL,63,2,4000),(49,'2025-06-13 01:37:29','2025-06-12',NULL,71,2,12000),(50,'2025-06-13 01:42:47','2025-06-12',NULL,76,2,6000),(51,'2025-06-13 01:42:47','2025-06-12',NULL,71,2,12000),(52,'2025-06-13 01:45:33','2025-06-12',NULL,73,2,12000),(53,'2025-06-13 01:45:33','2025-06-12',NULL,76,2,6000),(54,'2025-06-13 01:53:08','2025-06-12',NULL,72,2,4000),(55,'2025-06-13 01:53:08','2025-06-12',NULL,71,2,12000),(56,'2025-06-13 01:57:03','2025-06-12',NULL,72,2,4000),(57,'2025-06-13 01:57:03','2025-06-12',NULL,76,2,6000),(58,'2025-06-13 01:57:03','2025-06-12',NULL,75,3,6000),(59,'2025-06-13 15:09:13','2025-06-13',NULL,72,1,2000),(60,'2025-06-13 15:09:13','2025-06-13',NULL,76,1,3000),(61,'2025-06-13 15:09:13','2025-06-13',NULL,75,1,2000),(62,'2025-06-17 13:36:34','2025-06-17',75,74,2,6000),(63,'2025-06-17 13:36:34','2025-06-17',75,79,3,300000),(64,'2025-06-17 13:36:34','2025-06-17',75,73,3,18000),(65,'2025-06-17 16:00:54','2025-06-17',76,71,4,24000),(66,'2025-06-17 16:00:55','2025-06-17',76,76,6,18000),(67,'2025-06-17 16:00:55','2025-06-17',76,79,12,1200000),(68,'2025-06-17 16:02:56','2025-06-17',77,72,2,4000),(69,'2025-06-17 16:02:56','2025-06-17',77,76,2,6000),(70,'2025-06-17 16:02:56','2025-06-17',77,75,2,4000),(71,'2025-06-17 16:10:07','2025-06-17',78,63,2,4000),(72,'2025-06-17 16:14:20','2025-06-17',79,75,2,4000),(73,'2025-06-17 16:24:27','2025-06-17',80,79,1,100000),(74,'2025-06-17 16:25:55','2025-06-17',81,79,1,100000),(75,'2025-06-20 00:49:14','2025-06-19',82,71,2,12000),(76,'2025-06-20 00:51:29','2025-06-19',83,71,3,18000),(77,'2025-06-20 00:53:16','2025-06-19',84,72,2,4000),(78,'2025-06-20 00:55:07','2025-06-19',85,72,3,6000),(79,'2025-06-20 00:55:07','2025-06-19',85,71,11,66000),(80,'2025-06-20 01:00:10','2025-06-19',86,63,2,4000),(81,'2025-06-20 01:00:10','2025-06-19',86,79,2,200000),(82,'2025-06-20 01:00:10','2025-06-19',86,74,1,3000),(83,'2025-06-20 01:18:38','2025-06-19',87,71,21,126000),(84,'2025-06-20 01:18:38','2025-06-19',87,73,1,6000),(85,'2025-06-25 13:38:31','2025-06-25',88,79,1,100000);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `cantidad_pedidos`
--

/*!50001 DROP VIEW IF EXISTS `cantidad_pedidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cantidad_pedidos` AS select count(0) AS `cantidad` from `pedidos` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pseudoid`
--

/*!50001 DROP VIEW IF EXISTS `pseudoid`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pseudoid` AS select max(`facturas`.`fac_id` + 1) AS `id` from `facturas` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `todainformacionsobreproductos`
--

/*!50001 DROP VIEW IF EXISTS `todainformacionsobreproductos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `todainformacionsobreproductos` AS select `ps`.`subCat_id` AS `productoID`,`ps`.`prod_id` AS `productoPadreID`,`ps`.`prodE_id` AS `estadoID`,`ps`.`prodCat_id` AS `categoriaID`,`ps`.`prodMed_id` AS `medidaID`,`ps`.`subCat_nombre` AS `variacion`,`ps`.`subCat_existencias` AS `existencias`,`ps`.`subCat_precio` AS `precio`,`ps`.`prodCat_descripcion` AS `descripcion`,`pc`.`prodCat_categoria` AS `categoria`,`pc`.`prodCat_fechaCreacion` AS `fechaCreacion`,`p`.`prod_nombre` AS `producto`,`pm`.`prodMed_medida` AS `medidaVenta`,`pe`.`prodE_estado` AS `estado`,`pi`.`prodImg_ruta` AS `imagen` from (((((`productos_subcategorias` `ps` join `productos` `p` on(`ps`.`prod_id` = `p`.`prod_id`)) join `productos_medidaventa` `pm` on(`ps`.`prodMed_id` = `pm`.`prodMed_id`)) join `productos_estado` `pe` on(`ps`.`prodE_id` = `pe`.`prodE_id`)) join `productos_categoria` `pc` on(`ps`.`prodCat_id` = `pc`.`prodCat_id`)) join `productos_imagenes` `pi` on(`ps`.`subCat_id` = `pi`.`subCat_id`)) order by `ps`.`subCat_fechaCreacion` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ultimoidporfecha`
--

/*!50001 DROP VIEW IF EXISTS `ultimoidporfecha`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ultimoidporfecha` AS select `facturas`.`fac_id` AS `id` from `facturas` order by `facturas`.`fac_fecha` desc limit 0,1 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-29 21:30:18
