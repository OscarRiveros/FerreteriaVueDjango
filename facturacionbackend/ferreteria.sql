-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: ferreteria
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idcategoria` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idproducto` int NOT NULL,
  `codigoBarra` varchar(250) NOT NULL,
  `precioCompra` decimal(10,0) NOT NULL DEFAULT '0',
  `PrecioVenta` decimal(10,0) NOT NULL DEFAULT '0',
  `stock` int DEFAULT '0',
  `descripcion` varchar(45) NOT NULL,
  `categoria_idcategoria` int NOT NULL,
  `proveedor_idproveedor` int NOT NULL,
  PRIMARY KEY (`idproducto`,`categoria_idcategoria`,`proveedor_idproveedor`),
  UNIQUE KEY `codigoBarra_UNIQUE` (`codigoBarra`),
  KEY `fk_producto_categoria1_idx` (`categoria_idcategoria`),
  KEY `fk_producto_proveedor1_idx` (`proveedor_idproveedor`),
  CONSTRAINT `fk_producto_categoria1` FOREIGN KEY (`categoria_idcategoria`) REFERENCES `categoria` (`idcategoria`),
  CONSTRAINT `fk_producto_proveedor1` FOREIGN KEY (`proveedor_idproveedor`) REFERENCES `proveedor` (`idproveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_por_unidad_de_medida`
--

DROP TABLE IF EXISTS `producto_por_unidad_de_medida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_por_unidad_de_medida` (
  `producto_idproducto` int NOT NULL,
  `unidad_de_medida_idunidadMedida` int NOT NULL,
  `precioVenta` decimal(10,0) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`producto_idproducto`,`unidad_de_medida_idunidadMedida`),
  KEY `fk_producto_has_unidad_de_medida_unidad_de_medida1_idx` (`unidad_de_medida_idunidadMedida`),
  KEY `fk_producto_has_unidad_de_medida_producto_idx` (`producto_idproducto`),
  CONSTRAINT `fk_producto_has_unidad_de_medida_producto` FOREIGN KEY (`producto_idproducto`) REFERENCES `producto` (`idproducto`),
  CONSTRAINT `fk_producto_has_unidad_de_medida_unidad_de_medida1` FOREIGN KEY (`unidad_de_medida_idunidadMedida`) REFERENCES `unidad_de_medida` (`idunidadMedida`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_por_unidad_de_medida`
--

LOCK TABLES `producto_por_unidad_de_medida` WRITE;
/*!40000 ALTER TABLE `producto_por_unidad_de_medida` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto_por_unidad_de_medida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `idproveedor` int NOT NULL,
  `Nombre` varchar(245) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `ruc` varchar(45) NOT NULL,
  PRIMARY KEY (`idproveedor`),
  UNIQUE KEY `ruc_UNIQUE` (`ruc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad_de_medida`
--

DROP TABLE IF EXISTS `unidad_de_medida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidad_de_medida` (
  `idunidadMedida` int NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idunidadMedida`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad_de_medida`
--

LOCK TABLES `unidad_de_medida` WRITE;
/*!40000 ALTER TABLE `unidad_de_medida` DISABLE KEYS */;
/*!40000 ALTER TABLE `unidad_de_medida` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-25 11:30:07
