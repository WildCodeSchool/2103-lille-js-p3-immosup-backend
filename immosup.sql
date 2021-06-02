-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: immosup
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `accomodations`
--

DROP TABLE IF EXISTS `accomodations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accomodations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `district` varchar(32) NOT NULL,
  `address` varchar(64) NOT NULL,
  `city` varchar(32) NOT NULL,
  `furnished` tinyint(1) NOT NULL,
  `rent` int NOT NULL,
  `surface` int NOT NULL,
  `animals` int NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `id_user` int NOT NULL,
  `rooms` int NOT NULL,
  `ges` varchar(1) NOT NULL,
  `energyClass` varchar(1) NOT NULL,
  `type` varchar(45) NOT NULL,
  `describe` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_accomodations_1_idx` (`id_user`),
  CONSTRAINT `fk_accomodations_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accomodations`
--

LOCK TABLES `accomodations` WRITE;
/*!40000 ALTER TABLE `accomodations` DISABLE KEYS */;
/*!40000 ALTER TABLE `accomodations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id_user` int NOT NULL,
  `id_accomodation` int NOT NULL,
  KEY `fk_favorites_1_idx` (`id_user`),
  KEY `fk_favorites_2_idx` (`id_accomodation`),
  CONSTRAINT `fk_favorites_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_favorites_2` FOREIGN KEY (`id_accomodation`) REFERENCES `accomodations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchs`
--

DROP TABLE IF EXISTS `matchs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matchs` (
  `id_src` int NOT NULL,
  `id_dst` int NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_src`),
  KEY `fk_matchs_2_idx` (`id_dst`),
  CONSTRAINT `fk_matchs_1` FOREIGN KEY (`id_src`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_matchs_2` FOREIGN KEY (`id_dst`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchs`
--

LOCK TABLES `matchs` WRITE;
/*!40000 ALTER TABLE `matchs` DISABLE KEYS */;
/*!40000 ALTER TABLE `matchs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(64) NOT NULL,
  `id_user` int DEFAULT NULL,
  `id_accomodation` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_photos_1_idx` (`id_accomodation`),
  KEY `fk_photos_2_idx` (`id_user`),
  CONSTRAINT `fk_photos_1` FOREIGN KEY (`id_accomodation`) REFERENCES `accomodations` (`id`),
  CONSTRAINT `fk_photos_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `firstname` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `credits` int NOT NULL DEFAULT '0',
  `city` varchar(32) NOT NULL,
  `gender` tinyint(1) NOT NULL DEFAULT '0',
  `budget` int NOT NULL,
  `age` int NOT NULL,
  `animals` tinyint(1) NOT NULL,
  `aboutme` varchar(256) NOT NULL,
  `hobbies` varchar(256) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-02 13:57:15
