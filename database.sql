SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS 'lab';
CREATE DATABASE 'lab';

DROP TABLE IF EXISTS `clients`;
CREATE TABLE `clients` (
  `clientId` int(11) NOT NULL AUTO_INCREMENT,
  `clientName` varchar(255) NOT NULL,
  `clientUsername` varchar(20) NOT NULL,
  `clientPassword` varchar(50) NOT NULL,
  `clientAddress` varchar(255) NOT NULL,
  `clientZipCode` varchar(50) NOT NULL,
  `clientDocument` varchar(50) NOT NULL,
  `clientEmail` varchar(100) NOT NULL,
  `clientGender` varchar(1) NOT NULL,
  `clientFone` varchar(50) NOT NULL,
  `clientBirthDate` datetime NOT NULL,
   PRIMARY KEY (clientId)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

SET GLOBAL log_bin_trust_function_creators = 1;

USE `lab`;
DROP function IF EXISTS `fun_login_validation`;

DELIMITER $$
USE `lab`$$
CREATE FUNCTION `fun_login_validation`(p_clientUsername VARCHAR(20)  
                , p_clientPassword VARCHAR(50) ) RETURNS INT(1)  
 BEGIN  
 DECLARE l_ret            INT(1) DEFAULT 0;  
     SET l_ret = IFNULL((SELECT DISTINCT 1  
                       FROM clients  
                      WHERE clientUsername = p_clientUsername  
                       AND clientPassword = MD5(p_clientPassword)),0);                           
 RETURN l_ret;  
 END$$
 
INSERT INTO `clients` 
( `clientName`, `clientUsername`, `clientPassword`, `clientAddress`, `clientZipCode`, `clientDocument`, `clientEmail`, `clientGender`, `clientFone`, `clientBirthDate`) VALUES
('Yasmin', 'yhage', '1234', 'rua','8888','4534343','yashes20@yahoo.com.br','F','89898','1981-06-22 15:40:00');

INSERT INTO `country` (`id`, `name`, `shortName`) VALUES
(1, 'Portugal', 'PT');

DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `birthDate` datetime NOT NULL,
  `idCountry` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

INSERT INTO `person` (`id`, `name`, `birthDate`, `idCountry`) VALUES
(1, 'Rui', '1986-05-06 00:00:00', 1);




ALTER TABLE `person`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
