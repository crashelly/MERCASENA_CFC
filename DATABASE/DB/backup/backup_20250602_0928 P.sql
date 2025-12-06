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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_usuarios`
--

LOCK TABLES `detalles_usuarios` WRITE;
/*!40000 ALTER TABLE `detalles_usuarios` DISABLE KEYS */;
INSERT INTO `detalles_usuarios` VALUES (4,2,'user_@sad_68161b54dec5b9.05790676'),(5,2,'user_gude_68161d4d99f868.41078040'),(6,3,'user_colc_68161fc0da9cb6.62445674'),(7,2,'user_il.c_6816b8bdd69937.63435904'),(8,2,'user_ori._6816c1dcc33753.68201660'),(9,2,'user_avin_6817defc478cb0.02435510'),(10,2,'user_il.c_6818b75dc0ff86.65774177'),(11,2,'user_i270_6818b7d18f70d6.09896065'),(12,2,'user_il.c_6818b7fd2be733.25284915'),(13,2,'user_ail._681b69b2c406e9.71526647'),(14,2,'user_@gma_681b6ca274c626.56892170'),(15,2,'user_ison_682365a3af61e0.61268305'),(16,2,'user_l.co_68237519ae2821.70599125'),(17,2,'user_@gma_6824eb002b7ea8.48633040'),(18,2,'user_dro@_6824ec9b69fbb8.89019806'),(19,2,'user_l@gm_6824fd2f639b96.62426789'),(20,2,'user_6@gm_682a519b1aeb78.24661902'),(21,2,'user_.com_682dec5bd5c441.02040337'),(22,2,'user_gmai_683460d02d23b7.39929486');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_pedido`
--

LOCK TABLES `estado_pedido` WRITE;
/*!40000 ALTER TABLE `estado_pedido` DISABLE KEYS */;
INSERT INTO `estado_pedido` VALUES (1,'Pendiente','2025-04-23 03:25:41'),(2,'Por confirmar','2025-04-26 23:43:51'),(3,'Cancelado\r\n','2025-04-26 23:44:01');
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
  `fac_fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `fac_precioTotal` float NOT NULL,
  `pedi_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `pedi_id` text NOT NULL,
  PRIMARY KEY (`fac_id`),
  KEY `usuario_fk` (`usr_id`),
  CONSTRAINT `usuario_fk` FOREIGN KEY (`usr_id`) REFERENCES `usuarios` (`usr_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facturas`
--

LOCK TABLES `facturas` WRITE;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` VALUES (2,'user_il.c_6816b8bdd69937.63435904','2025-05-17 16:52:07',2334,'',''),(3,'user_il.c_6816b8bdd69937.63435904','2025-05-17 16:53:00',0,'{\n    \"pedidoId\": \"ped_2025-05-15_68255abe48e8a7.21465208\",\n    \"precioTotal\": 0,\n    \"Usuario\": \"Carlos Andres Loaiza Rendon\",\n    \"fecha\": \"2025-04-29 07:40:00\",\n    \"estado\": \"Pendiente\",\n    \"estadoID\": 1,\n    \"productos\": [\n        {\n            \"estado\": 1,\n            \"nombre\": \"Huevos\",\n            \"variante\": \"JUMBO\",\n            \"medida\": \"Cubeta\",\n            \"cantidad\": 0,\n            \"precioParcialProducto\": 0\n        }\n    ]\n}',''),(4,'user_il.c_6816b8bdd69937.63435904','2025-05-17 16:53:33',2334,'{\r\n    \"pedidoId\": \"ped_2025-05-15_68255abe48e8a7.21465208\",\r\n    \"precioTotal\": 0,\r\n    \"Usuario\": \"Carlos Andres Loaiza Rendon\",\r\n    \"fecha\": \"2025-04-29 07:40:00\",\r\n    \"estado\": \"Pendiente\",\r\n    \"estadoID\": 1,\r\n    \"productos\": [\r\n        {\r\n            \"estado\": 1,\r\n            \"nombre\": \"Huevos\",\r\n            \"variante\": \"JUMBO\",\r\n            \"medida\": \"Cubeta\",\r\n            \"cantidad\": 0,\r\n            \"precioParcialProducto\": 0\r\n        }\r\n    ]\r\n}',''),(5,'user_il.c_6816b8bdd69937.63435904','2025-05-17 16:55:42',2334,'{\r\n    \"pedidoId\": \"ped_2025-05-15_68255abe48e8a7.21465208\",\r\n    \"precioTotal\": 0,\r\n    \"Usuario\": \"Carlos Andres Loaiza Rendon\",\r\n    \"fecha\": \"2025-04-29 07:40:00\",\r\n    \"estado\": \"Pendiente\",\r\n    \"estadoID\": 1,\r\n    \"productos\": [\r\n        {\r\n            \"estado\": 1,\r\n            \"nombre\": \"Huevos\",\r\n            \"variante\": \"JUMBO\",\r\n            \"medida\": \"Cubeta\",\r\n            \"cantidad\": 0,\r\n            \"precioParcialProducto\": 0\r\n        }\r\n    ]\r\n}',''),(6,'user_il.c_6816b8bdd69937.63435904','2025-05-17 16:56:33',23433,'{\n    \"pedidoId\": \"ped_2025-05-15_68255abe48e8a7.21465208\",\n    \"precioTotal\": 23433,\n    \"Usuario\": \"Carlos Andres Loaiza Rendon\",\n    \"fecha\": \"2025-04-29 07:40:00\",\n    \"estado\": \"Pendiente\",\n    \"estadoID\": 1,\n    \"productos\": [\n        {\n            \"estado\": 1,\n            \"nombre\": \"Huevos\",\n            \"variante\": \"JUMBO\",\n            \"medida\": \"Cubeta\",\n            \"cantidad\": 0,\n            \"precioParcialProducto\": 0\n        }\n    ]\n}',''),(7,'user_@gma_6824eb002b7ea8.48633040','2025-05-21 08:48:18',324345,'nose',''),(8,'user_l.co_68237519ae2821.70599125','2025-05-23 21:17:51',1000,'[{\"pedidoId\":\"ped_2025-05-24_683134511a4367.63837025\",\"precioTotal\":1000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"73\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"},{\"id\":\"74\",\"cantidad\":\"3\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"9000\"},{\"id\":\"75\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Aguacate Hass\",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]',''),(9,'user_6@gm_682a519b1aeb78.24661902','2025-05-23 21:31:21',1000,'[{\"pedidoId\":\"ped_2025-05-24_68312f5ae3e9f2.56052825\",\"precioTotal\":1000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"79\",\"cantidad\":\"3\",\"name\":\"Kilogramos -  Cafe  \",\"precioUnitario\":\"100000\",\"precio\":\"300000\"}]}]',''),(10,'user_6@gm_682a519b1aeb78.24661902','2025-05-24 18:28:43',1000,'[{\"pedidoId\":\"ped_2025-05-25_6832514d13e305.36929577\",\"precioTotal\":1000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"71\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Frijol  Rojo  \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"73\",\"cantidad\":\"30\",\"name\":\"Kilogramos -  papa  parda  \",\"precioUnitario\":\"6000\",\"precio\":\"192000\"}]}]',''),(11,'user_l.co_68237519ae2821.70599125','2025-05-24 18:40:02',1000,'[{\"pedidoId\":\"ped_2025-05-25_683255eb80d868.06420304\",\"precioTotal\":1000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"73\",\"cantidad\":\"1\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"6000\"}]}]',''),(12,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 13:38:27',22000,'[{\"pedidoId\":\"ped_2025-05-25_68325079b0cd97.20596350\",\"precioTotal\":22000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"73\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"},{\"id\":\"74\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]',''),(13,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 13:39:37',22000,'[{\"pedidoId\":\"ped_2025-05-25_68325079b0cd97.20596350\",\"precioTotal\":22000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"73\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"},{\"id\":\"74\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]',''),(14,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 13:47:02',22000,'[{\"pedidoId\":\"ped_2025-05-25_68325079b0cd97.20596350\",\"precioTotal\":22000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"73\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"},{\"id\":\"74\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]','ped_2025-05-25_68325079b0cd97.20596350'),(15,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 14:56:36',22000,'[{\"pedidoId\":\"ped_2025-05-25_68325079b0cd97.20596350\",\"precioTotal\":22000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"73\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"},{\"id\":\"74\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]','ped_2025-05-25_68325079b0cd97.20596350'),(16,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 14:57:23',22000,'[{\"pedidoId\":\"ped_2025-05-25_68325079b0cd97.20596350\",\"precioTotal\":22000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"73\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"},{\"id\":\"74\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]','ped_2025-05-25_68325079b0cd97.20596350'),(17,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 15:00:17',22000,'[{\"pedidoId\":\"ped_2025-05-25_68325079b0cd97.20596350\",\"precioTotal\":22000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"73\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"},{\"id\":\"74\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]','ped_2025-05-25_68325079b0cd97.20596350'),(18,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 15:00:24',22000,'[{\"pedidoId\":\"ped_2025-05-25_68325079b0cd97.20596350\",\"precioTotal\":22000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"73\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"},{\"id\":\"74\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]','ped_2025-05-25_68325079b0cd97.20596350'),(19,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 16:21:23',22000,'[{\"pedidoId\":\"ped_2025-05-25_68325079b0cd97.20596350\",\"precioTotal\":22000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"73\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"},{\"id\":\"74\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]','ped_2025-05-25_68325079b0cd97.20596350'),(20,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 16:27:49',22000,'[{\"pedidoId\":\"ped_2025-05-25_68325079b0cd97.20596350\",\"precioTotal\":22000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"73\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  papa parda\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"},{\"id\":\"74\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  lulo \",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]','ped_2025-05-25_68325079b0cd97.20596350'),(21,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 16:30:14',4000,'[{\"pedidoId\":\"ped_2025-05-25_6832514d13e305.36929577\",\"precioTotal\":4000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-05-25_6832514d13e305.36929577'),(22,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 16:30:23',4000,'[{\"pedidoId\":\"ped_2025-05-25_6832514d13e305.36929577\",\"precioTotal\":4000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-05-25_6832514d13e305.36929577'),(23,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 16:33:46',4000,'[{\"pedidoId\":\"ped_2025-05-25_6832514d13e305.36929577\",\"precioTotal\":4000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-05-25_6832514d13e305.36929577'),(24,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 16:34:23',4000,'[{\"pedidoId\":\"ped_2025-05-25_6832514d13e305.36929577\",\"precioTotal\":4000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-05-25_6832514d13e305.36929577'),(25,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 16:34:48',4000,'[{\"pedidoId\":\"ped_2025-05-25_6832528511ecb7.49077870\",\"precioTotal\":4000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-05-25_6832528511ecb7.49077870'),(26,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 16:40:52',16000,'[{\"pedidoId\":\"ped_2025-05-25_6832528511ecb7.49077870\",\"precioTotal\":16000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"8\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"16000\"}]}]','ped_2025-05-25_6832528511ecb7.49077870'),(27,'user_6@gm_682a519b1aeb78.24661902','2025-05-25 16:44:52',4000,'[{\"pedidoId\":\"ped_2025-05-25_6832528511ecb7.49077870\",\"precioTotal\":4000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-05-25_6832528511ecb7.49077870'),(28,'user_l.co_68237519ae2821.70599125','2025-05-26 10:13:28',24000,'[{\"pedidoId\":\"ped_2025-05-26_68345e01617459.08864165\",\"precioTotal\":24000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"76\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Tomate de Ali\\u00f1o\",\"precioUnitario\":\"3000\",\"precio\":\"6000\"},{\"id\":\"73\",\"cantidad\":\"3\",\"name\":\"Kilogramos -  papa  parda\",\"precioUnitario\":\"6000\",\"precio\":\"18000\"}]}]','ped_2025-05-26_68345e01617459.08864165'),(29,'user_l.co_68237519ae2821.70599125','2025-05-26 10:18:24',826000,'[{\"pedidoId\":\"ped_2025-05-26_683485e286e993.65459338\",\"precioTotal\":826000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"63\",\"cantidad\":\"4\",\"name\":\"litros -  leche de Vaca\",\"precioUnitario\":\"2000\",\"precio\":\"8000\"},{\"id\":\"72\",\"cantidad\":\"6\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"12000\"},{\"id\":\"79\",\"cantidad\":\"8\",\"name\":\"Kilogramos -  Cafe Arabigo\",\"precioUnitario\":\"100000\",\"precio\":\"800000\"},{\"id\":\"71\",\"cantidad\":\"1\",\"name\":\"Kilogramos -  Frijol  Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"6000\"}]}]','ped_2025-05-26_683485e286e993.65459338'),(30,'user_l.co_68237519ae2821.70599125','2025-05-26 10:28:09',18000,'[{\"pedidoId\":\"ped_2025-05-26_683462498c4ef1.30518658\",\"precioTotal\":18000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"63\",\"cantidad\":\"3\",\"name\":\"litros -  leche de Vaca\",\"precioUnitario\":\"2000\",\"precio\":\"6000\"},{\"id\":\"71\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"12000\"}]}]','ped_2025-05-26_683462498c4ef1.30518658'),(31,'user_l.co_68237519ae2821.70599125','2025-05-26 10:34:13',14000,'[{\"pedidoId\":\"ped_2025-05-26_683489795e4129.34750843\",\"precioTotal\":14000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"63\",\"cantidad\":\"7\",\"name\":\"litros -  leche de Vaca\",\"precioUnitario\":\"2000\",\"precio\":\"14000\"}]}]','ped_2025-05-26_683489795e4129.34750843'),(32,'user_l.co_68237519ae2821.70599125','2025-05-26 10:36:53',10000,'[{\"pedidoId\":\"ped_2025-05-26_68348a80555120.40166686\",\"precioTotal\":10000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"63\",\"cantidad\":\"3\",\"name\":\"litros -  leche de Vaca\",\"precioUnitario\":\"2000\",\"precio\":\"6000\"},{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-05-26_68348a80555120.40166686'),(33,'user_l.co_68237519ae2821.70599125','2025-05-26 10:38:27',8000,'[{\"pedidoId\":\"ped_2025-05-26_68348aea1e9015.12911725\",\"precioTotal\":8000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"63\",\"cantidad\":\"2\",\"name\":\"litros -  leche de Vaca\",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-05-26_68348aea1e9015.12911725'),(34,'user_l.co_68237519ae2821.70599125','2025-05-26 10:39:50',8000,'[{\"pedidoId\":\"ped_2025-05-26_68348aea1e9015.12911725\",\"precioTotal\":8000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"63\",\"cantidad\":\"2\",\"name\":\"litros -  leche de Vaca\",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-05-26_68348aea1e9015.12911725'),(35,'user_l.co_68237519ae2821.70599125','2025-05-26 10:41:35',8000,'[{\"pedidoId\":\"ped_2025-05-26_68348aea1e9015.12911725\",\"precioTotal\":8000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"63\",\"cantidad\":\"2\",\"name\":\"litros -  leche de Vaca\",\"precioUnitario\":\"2000\",\"precio\":\"4000\"},{\"id\":\"72\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"4000\"}]}]','ped_2025-05-26_68348aea1e9015.12911725'),(36,'user_ail._681b69b2c406e9.71526647','2025-05-26 10:48:24',3000,'[{\"pedidoId\":\"ped_2025-05-26_68348d0fe14a83.41344863\",\"precioTotal\":3000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"76\",\"cantidad\":\"1\",\"name\":\"Kilogramos -  Tomate de Ali\\u00f1o\",\"precioUnitario\":\"3000\",\"precio\":\"3000\"}]}]','ped_2025-05-26_68348d0fe14a83.41344863'),(37,'user_ail._681b69b2c406e9.71526647','2025-05-26 11:11:49',6000,'[{\"pedidoId\":\"ped_2025-05-26_6834921b1a7046.71125440\",\"precioTotal\":6000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"76\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Tomate de Ali\\u00f1o\",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]','ped_2025-05-26_6834921b1a7046.71125440'),(38,'user_ail._681b69b2c406e9.71526647','2025-05-26 11:12:27',6000,'[{\"pedidoId\":\"ped_2025-05-26_6834924717b715.79582767\",\"precioTotal\":6000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"76\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Tomate de Ali\\u00f1o\",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]','ped_2025-05-26_6834924717b715.79582767'),(39,'user_ail._681b69b2c406e9.71526647','2025-05-26 11:13:46',6000,'[{\"pedidoId\":\"ped_2025-05-26_6834932b6cf2a2.89831889\",\"precioTotal\":6000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"76\",\"cantidad\":\"2\",\"name\":\"Kilogramos -  Tomate de Ali\\u00f1o\",\"precioUnitario\":\"3000\",\"precio\":\"6000\"}]}]','ped_2025-05-26_6834932b6cf2a2.89831889'),(40,'user_6@gm_682a519b1aeb78.24661902','2025-06-02 15:26:23',6000,'[{\"pedidoId\":\"ped_2025-06-02_683dff2384b9a8.53955308\",\"precioTotal\":6000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"72\",\"cantidad\":\"3\",\"name\":\"Kilogramos -  Feijoa \",\"precioUnitario\":\"2000\",\"precio\":\"6000\"}]}]','ped_2025-06-02_683dff2384b9a8.53955308'),(41,'user_6@gm_682a519b1aeb78.24661902','2025-06-02 16:08:27',60000,'[{\"pedidoId\":\"ped_2025-06-02_683e12ab3eaf22.09566689\",\"precioTotal\":60000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"71\",\"cantidad\":\"10\",\"name\":\"Kilogramos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"60000\"}]}]','ped_2025-06-02_683e12ab3eaf22.09566689'),(42,'user_6@gm_682a519b1aeb78.24661902','2025-06-02 16:11:55',42000,'[{\"pedidoId\":\"ped_2025-06-02_683e13611695c3.17805813\",\"precioTotal\":42000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"71\",\"cantidad\":\"7\",\"name\":\"Kilogramos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"42000\"}]}]','ped_2025-06-02_683e13611695c3.17805813'),(43,'user_6@gm_682a519b1aeb78.24661902','2025-06-02 17:58:58',30000,'[{\"pedidoId\":\"ped_2025-06-02_683e14aac76dc2.81206342\",\"precioTotal\":30000,\"Usuario\":true,\"fecha\":true,\"productos\":[{\"id\":\"71\",\"cantidad\":\"5\",\"name\":\"Kilogramos -  Frijol Rojo\",\"precioUnitario\":\"6000\",\"precio\":\"30000\"}]}]','ped_2025-06-02_683e14aac76dc2.81206342');
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
INSERT INTO `pedidos` VALUES ('ped_2025-05-30_6838e1f4161ca9.64210774',10000,1,'2025-05-29','2025-05-29 17:38:44','user_l.co_68237519ae2821.70599125'),('ped_2025-05-30_6838e226f405f0.14857098',10001,1,'2025-05-29','2025-05-29 17:39:35','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-05-30_6838eb39683d50.14514671',203000,1,'2025-05-29','2025-05-29 18:18:17','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-05-30_6838ec36ac3193.90203739',18000,1,'2025-05-29','2025-05-29 18:22:30','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-05-30_6838ecbf9aafe8.38049132',27000,1,'2025-05-29','2025-05-29 18:24:47','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-05-31_683b7bb077d726.79956347',3000,1,'2025-05-31','2025-05-31 16:59:12','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-02_683de82fa973f0.16094314',16000,1,'2025-06-02','2025-06-02 13:06:39','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-02_683e077b07e753.21863542',9000,1,'2025-06-02','2025-06-02 15:20:11','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-02_683e134254cff1.99786359',66000,1,'2025-06-02','2025-06-02 16:10:26','user_6@gm_682a519b1aeb78.24661902'),('ped_2025-06-03_683e2c9d67da98.95908670',54000,1,'2025-06-02','2025-06-02 17:58:37','user_colc_68161fc0da9cb6.62445674'),('ped_2025-06-03_683e33ae50ee25.44369490',3000,1,'2025-06-02','2025-06-02 18:28:46','user_colc_68161fc0da9cb6.62445674'),('ped_2025-06-03_683e345e3c81d7.54584714',3000,1,'2025-06-02','2025-06-02 18:31:42','user_colc_68161fc0da9cb6.62445674'),('ped_2025-06-03_683e345e4648e7.29550641',3000,1,'2025-06-02','2025-06-02 18:31:42','user_colc_68161fc0da9cb6.62445674'),('ped_2025-06-03_683e3547abf010.61249461',3000,1,'2025-06-02','2025-06-02 18:35:35','user_colc_68161fc0da9cb6.62445674');
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
) ENGINE=InnoDB AUTO_INCREMENT=1852 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos_tiene_productos`
--

LOCK TABLES `pedidos_tiene_productos` WRITE;
/*!40000 ALTER TABLE `pedidos_tiene_productos` DISABLE KEYS */;
INSERT INTO `pedidos_tiene_productos` VALUES (1819,76,'ped_2025-05-30_6838e1f4161ca9.64210774',6000,2,2),(1820,72,'ped_2025-05-30_6838e1f4161ca9.64210774',4000,2,1),(1821,72,'ped_2025-05-30_6838e226f405f0.14857098',1,1,1),(1822,75,'ped_2025-05-30_6838e226f405f0.14857098',4000,2,1),(1823,74,'ped_2025-05-30_6838e226f405f0.14857098',6000,2,1),(1824,76,'ped_2025-05-30_6838eb39683d50.14514671',3000,1,1),(1825,79,'ped_2025-05-30_6838eb39683d50.14514671',200000,2,1),(1828,76,'ped_2025-05-30_6838ec36ac3193.90203739',12000,4,2),(1829,63,'ped_2025-05-30_6838ec36ac3193.90203739',6000,3,1),(1830,76,'ped_2025-05-30_6838ecbf9aafe8.38049132',9000,3,2),(1831,63,'ped_2025-05-30_6838ecbf9aafe8.38049132',6000,3,1),(1832,71,'ped_2025-05-30_6838ecbf9aafe8.38049132',12000,2,1),(1835,76,'ped_2025-05-31_683b7bb077d726.79956347',1,1,1),(1836,63,'ped_2025-06-02_683de82fa973f0.16094314',4000,2,1),(1837,71,'ped_2025-06-02_683de82fa973f0.16094314',12000,2,1),(1840,76,'ped_2025-06-02_683e077b07e753.21863542',9000,3,2),(1842,71,'ped_2025-06-02_683e134254cff1.99786359',66000,11,2),(1846,73,'ped_2025-06-03_683e2c9d67da98.95908670',1,1,1),(1847,71,'ped_2025-06-03_683e2c9d67da98.95908670',48000,8,2),(1848,76,'ped_2025-06-03_683e33ae50ee25.44369490',1,1,1),(1849,76,'ped_2025-06-03_683e345e3c81d7.54584714',1,1,1),(1850,76,'ped_2025-06-03_683e345e4648e7.29550641',1,1,1),(1851,76,'ped_2025-06-03_683e3547abf010.61249461',3000,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (31,'Frijol','2025-05-19 07:17:31'),(32,'Feijoa','2025-05-19 07:36:46'),(33,'leche','2025-05-19 07:59:49'),(34,'Cafe','2025-05-19 08:05:49'),(35,'lulo','2025-05-19 08:18:24'),(36,'papa','2025-05-20 08:20:19'),(37,'Aguacate','2025-05-20 08:35:32'),(38,'Tomate','2025-05-20 08:41:33'),(39,'nueces','2025-05-20 08:45:59'),(40,'Huevos','2025-05-24 18:57:26');
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_categoria`
--

LOCK TABLES `productos_categoria` WRITE;
/*!40000 ALTER TABLE `productos_categoria` DISABLE KEYS */;
INSERT INTO `productos_categoria` VALUES (49,'2025-05-05 16:36:12','Frutas'),(50,'2025-05-07 02:17:10','Comestibles'),(51,'2025-05-07 14:00:48','lacteos'),(52,'2025-05-19 12:18:48','Granos'),(53,'2025-05-20 13:40:00','Legumbres');
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_medidaventa`
--

LOCK TABLES `productos_medidaventa` WRITE;
/*!40000 ALTER TABLE `productos_medidaventa` DISABLE KEYS */;
INSERT INTO `productos_medidaventa` VALUES (1,'Kilogramos',1,'2025-03-17 23:18:54'),(4,'Cubeta',30,'2025-03-18 20:06:14'),(6,'litros',1,'2025-04-07 00:41:36'),(13,'Kilogramos',1,'2025-05-05 16:44:27');
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
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_subcategorias`
--

LOCK TABLES `productos_subcategorias` WRITE;
/*!40000 ALTER TABLE `productos_subcategorias` DISABLE KEYS */;
INSERT INTO `productos_subcategorias` VALUES (63,33,'de Vaca','2025-05-19 13:03:55',1,2000,6,1,NULL,NULL,1,3,51,0),(66,32,'nose','2025-05-19 13:10:13',889,887897,4,1,NULL,NULL,1,3,52,0),(71,31,'Rojo','2025-05-20 13:13:12',5,6000,13,1,NULL,NULL,1,3,52,0),(72,32,'default','2025-05-20 13:19:19',2,2000,13,1,NULL,NULL,1,3,49,0),(73,36,'parda','2025-05-20 13:20:38',27,6000,13,1,NULL,NULL,1,3,49,0),(74,35,'default','2025-05-20 13:22:32',20,3000,13,1,NULL,NULL,1,3,49,0),(75,37,'Hass','2025-05-20 13:37:01',20,2000,13,1,NULL,NULL,1,3,49,0),(76,38,'de Aliño','2025-05-20 13:42:20',1,3000,13,1,NULL,NULL,1,3,53,0),(79,34,'Arabigo','2025-05-21 15:15:56',22,100000,13,1,NULL,NULL,1,3,52,0),(80,39,'default','2025-05-26 05:12:56',5464,200000,13,1,NULL,NULL,1,3,50,0),(81,38,'default','2025-05-26 05:14:58',5464,200000,6,1,NULL,NULL,1,3,51,0),(82,32,'default','2025-05-26 05:16:20',5464,200000,13,1,NULL,NULL,1,3,51,0),(83,32,'default','2025-05-26 05:17:21',5464,200000,13,1,NULL,NULL,1,3,51,0),(84,32,'default','2025-05-26 05:17:58',5464,200000,13,1,NULL,NULL,1,3,51,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punto_venta_imagenes`
--

LOCK TABLES `punto_venta_imagenes` WRITE;
/*!40000 ALTER TABLE `punto_venta_imagenes` DISABLE KEYS */;
INSERT INTO `punto_venta_imagenes` VALUES (3,'/public/assets/banner/images/fondo.png','2025-05-05 08:48:10'),(4,'/public/assets/banner/images/imglogin.png','2025-05-05 08:48:10');
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
INSERT INTO `usuarios` VALUES ('user_.com_682dec5bd5c441.02040337','juan@gmail.com','colchonate con la comodidad de la casa','calle 123','1234567890','','1234567890',NULL,'$2y$10$pSUfWekzwh9yD8hBHWo4N.T2yuLmisdTPG6JgGbT.CUXqTHS58uUS'),('user_6@gm_682a519b1aeb78.24661902','buitragoagudeloj006@gmail.com','Jesus David Buitrago','Calle31 # 14 a 61 barrio galan','3226616834','','',NULL,'$2y$10$cQ0A502BJieGa5w5RNWFGOvD.SaAWfYKHSgLpcZ2byYmYdJO0OVM6'),('user_@gma_681b6ca274c626.56892170','dani@gmail.com','Daniel Felipe Grajales',NULL,NULL,'',NULL,NULL,'$2y$10$q.PCEuyTi5CPNejGQNZ8DejJu0YZZPj8arpKw.cDfv6JfF0fayONq'),('user_@gma_6824eb002b7ea8.48633040','yeshua@gmail.com','Jesus David Buitrago Agudelo',NULL,NULL,'',NULL,NULL,'$2y$10$0zvaGgocuOAtBVQOPUkOUuYRJ/cuzhailxC.Xm4UCMC6KILd08DsG'),('user_@sad_68161b54dec5b9.05790676','sa@sad','sad',NULL,NULL,'',NULL,NULL,'$2y$10$X85rE/br8SE74LNxCxfAAupY5.qUXyo9EwkJBQvgXAdcsYDbYH9Ty'),('user_ail._681b69b2c406e9.71526647','carlos@gmail.com','Carlos Andres Loaiza Rendon',NULL,NULL,'',NULL,NULL,'$2y$10$5D0HEQg6toHaCz2vvBXtzOYpINZHuD6gDvchlAbb1rBcmqV/V/Q.S'),('user_avin_6817defc478cb0.02435510','davinci@gmail.com','Leonardo Davinci',NULL,NULL,'',NULL,NULL,'$2y$10$PRcODT2OK9DqdlVT5r9Qbu1IaF69ybdYa/sqxJyN2yqgt25b1Flnq'),('user_colc_68161fc0da9cb6.62445674','admin@gmail.com','Crashelly',NULL,NULL,'',NULL,NULL,'$2y$10$.00cHhnX0UswMFrI2hOS.O2NP1Cq5r87JJmJk5hJ47wUermwiFWh6'),('user_dro@_6824ec9b69fbb8.89019806','alejandro@gmail.com','Alejandro Posada',NULL,NULL,'',NULL,NULL,'$2y$10$U7zw8VnZq/rKkN7dBZeTbOoABjPsX61iKr20U3g1BS8iBErlY7UfO'),('user_gmai_683460d02d23b7.39929486','adso@gmail.com','Alejandro Posada Castaño',NULL,NULL,'',NULL,NULL,'$2y$10$mRvQVlOZpeJvktxWByf2b.IxYO5DkEqzlNzweApVaV1SG.iwNjMze'),('user_gude_68161d4d99f868.41078040','buitragoagudeloj007@gmail.com','Jesus David Buitrago Agudelo',NULL,NULL,'',NULL,NULL,'$2y$10$Pl4p7Llc1Je9kQpP.KuixeBkWzFzCLTtghIQg3bDUc8BtYDsmyTLG'),('user_i270_6818b7d18f70d6.09896065','yamori2708@gmail.com','Yeison ',NULL,NULL,'',NULL,NULL,'$2y$10$WJNCR0PguViZePZhb7iw2.odqndz7tMAIZb/GkxWLp78TA9FIU7Ha'),('user_il.c_6816b8bdd69937.63435904','papa@gmail.com','Luis Evelio Buitrago Giraldo',NULL,NULL,'',NULL,NULL,'$2y$10$3T5UkpdC4XDGSIQC.VnTwO62W.hyYETGWYIKxXS7nvaeZ/pXyTk6y'),('user_il.c_6818b75dc0ff86.65774177','r0772284@gmail.com','Alejandro Posada Castaño',NULL,NULL,'',NULL,NULL,'$2y$10$.nhR8EwIBn8Q4Xm9fXpOA.hLnOgYU3vp0mPaM1wwNBPFS5pHQAI/.'),('user_il.c_6818b7fd2be733.25284915','yamori@gmail.com','Yeison Acevedo',NULL,NULL,'',NULL,NULL,'$2y$10$qBDhShEn0QDTSXypk2agZu0/0BPKqSZtlInbyY6fj2QcGyh64yniC'),('user_ison_682365a3af61e0.61268305','yeison@gmail.com','Yeison Stiven ',NULL,NULL,'',NULL,NULL,'$2y$10$EpD.Kw767ncRt3zR0qvpouIXTzCg7WKETHo2JjYvPTKKORuZsqYji'),('user_l.co_68237519ae2821.70599125','danielito@gmail.com','Daniel Felipe Grajales','Calle 69B # 24-03','3224455321','','1033423412',NULL,'$2y$10$kFDSAVewe3Fkczj38C222erjht8geUvqqJHOGAppWiNvbJBQylVAO'),('user_l@gm_6824fd2f639b96.62426789','Daniel@gmail.com','Daniel Grajales ',NULL,NULL,'',NULL,NULL,'$2y$10$MnlTxnjl6rzU7RU14aJd6ePldt4Ljulhq/d2S4gEpnt2eMIKHTLNm'),('user_ori._6816c1dcc33753.68201660','mori@mori.com','EL mori',NULL,NULL,'',NULL,NULL,'$2y$10$PYx69HMbHIKoCiY.TnQHIeCzNgfw8tRmW3cHKMmZQiU/CiVYJlxvu');
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
  `fac_id` int(11) DEFAULT NULL,
  `prod_id` int(11) NOT NULL,
  `prod_cant` int(11) NOT NULL,
  `prod_precio` float NOT NULL,
  PRIMARY KEY (`vent_id`),
  KEY `fac_id` (`fac_id`),
  KEY `ventas_ibfk_1` (`prod_id`),
  CONSTRAINT `fk_factura_venta` FOREIGN KEY (`fac_id`) REFERENCES `facturas` (`fac_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `productos_subcategorias` (`subCat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,'2025-05-25 21:40:25',25,72,2,4000),(2,'2025-05-25 21:40:53',25,72,8,16000),(3,'2025-05-25 21:44:53',25,72,2,4000),(4,'2025-05-26 15:13:29',28,76,2,6000),(5,'2025-05-26 15:13:29',28,73,3,18000),(6,'2025-05-26 15:18:25',29,63,4,8000),(7,'2025-05-26 15:18:25',29,72,6,12000),(8,'2025-05-26 15:18:25',29,79,8,800000),(9,'2025-05-26 15:18:25',29,71,1,6000),(10,'2025-05-26 15:28:10',30,63,3,6000),(11,'2025-05-26 15:28:10',30,71,2,12000),(12,'2025-05-26 15:34:14',31,63,7,14000),(13,'2025-05-26 15:36:55',32,63,3,6000),(14,'2025-05-26 15:36:55',32,72,2,4000),(15,'2025-05-26 15:38:28',33,63,2,4000),(16,'2025-05-26 15:48:25',36,76,1,3000),(17,'2025-05-26 16:11:50',37,76,2,6000),(18,'2025-05-26 16:12:28',38,76,2,6000),(19,'2025-05-26 16:13:47',39,76,2,6000),(20,'2025-06-02 20:26:24',40,72,3,6000),(21,'2025-06-02 21:08:28',41,71,10,60000),(22,'2025-06-02 21:11:56',42,71,7,42000),(23,'2025-06-02 22:58:59',43,71,5,30000);
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
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
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
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `todainformacionsobreproductos` AS select `ps`.`subCat_id` AS `productoID`,`ps`.`prod_id` AS `productoPadreID`,`ps`.`prodE_id` AS `estadoID`,`ps`.`prodCat_id` AS `categoriaID`,`ps`.`prodMed_id` AS `medidaID`,`ps`.`subCat_nombre` AS `variacion`,`ps`.`subCat_existencias` AS `existencias`,`ps`.`subCat_precio` AS `precio`,`ps`.`prodCat_descripcion` AS `descripcion`,`pc`.`prodCat_categoria` AS `categoria`,`pc`.`prodCat_fechaCreacion` AS `fechaCreacion`,`p`.`prod_nombre` AS `producto`,`pm`.`prodMed_medida` AS `medidaVenta`,`pe`.`prodE_estado` AS `estado`,`pi`.`prodImg_ruta` AS `imagen` from (((((`productos_subcategorias` `ps` join `productos` `p` on(`ps`.`prod_id` = `p`.`prod_id`)) join `productos_medidaventa` `pm` on(`ps`.`prodMed_id` = `pm`.`prodMed_id`)) join `productos_estado` `pe` on(`ps`.`prodE_id` = `pe`.`prodE_id`)) join `productos_categoria` `pc` on(`ps`.`prodCat_id` = `pc`.`prodCat_id`)) join `productos_imagenes` `pi` on(`ps`.`subCat_id` = `pi`.`subCat_id`)) order by `ps`.`subCat_fechaCreacion` desc */;
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

-- Dump completed on 2025-06-02 22:46:24
