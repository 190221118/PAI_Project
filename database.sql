SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Create database
DROP DATABASE IF EXISTS 'lab';
CREATE DATABASE 'lab';

-- Create table for clientes
USE `lab`;
DROP TABLE IF EXISTS clients;
CREATE TABLE clients (
  clientId int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  clientName varchar(255) NOT NULL,
  clientUsername varchar(20) NOT NULL UNIQUE,
  clientPassword varchar(50) NOT NULL,
  clientAddress varchar(255) NOT NULL,
  clientZipCode varchar(50) NOT NULL,
  clientDocument varchar(50) NOT NULL,
  clientEmail varchar(100) NOT NULL UNIQUE,
  clientGender varchar(1) NOT NULL,
  clientFone varchar(50) NOT NULL,
  clientBirthDate datetime NOT NULL,
  clientState varchar(1) NOT NULL,
  clientType varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

SET GLOBAL log_bin_trust_function_creators = 1;

-- Create function for the login validation
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
 

-- Insert default client
INSERT INTO `clients` 
( `clientName`, `clientUsername`, `clientPassword`, `clientAddress`, `clientZipCode`, `clientDocument`, `clientEmail`, `clientGender`, `clientFone`, `clientBirthDate`,`clientState`,`clientType`) VALUES
('Yasmin', 'yhage', md5('1234'), 'rua','8888','4534343','yashes20@yahoo.com.br','F','89898','1981-06-22 15:40:00','A','Admin');


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Create table for product categories
USE `lab`;
DROP TABLE IF EXISTS `productcategories`;
CREATE TABLE `productcategories` (
  `productCategoryId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `productCategoryName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- Create table for products
USE `lab`;
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `productId` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `productName` varchar(100) NOT NULL,
  `productDescription` varchar(250) NOT NULL,
  `productCategoryId` int(11) NOT NULL,
  `productImg` varchar(250) NOT NULL,
  `productPrice` decimal(5,2) NOT NULL,
  `productIsEnabled` tinyint NULL DEFAULT 1,
  FOREIGN KEY productCategoryId(productCategoryId) REFERENCES productcategories(productCategoryId)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- Insert into product categories default categories
INSERT INTO `lab`.`productcategories` (`productCategoryName`) VALUES ('Blazers');
INSERT INTO `lab`.`productcategories` (`productCategoryName`) VALUES ('Blusões e casacos');
INSERT INTO `lab`.`productcategories` (`productCategoryName`) VALUES ('Sweatshirt');
INSERT INTO `lab`.`productcategories` (`productCategoryName`) VALUES ('T-shirts e tops');
INSERT INTO `lab`.`productcategories` (`productCategoryName`) VALUES ('Camisas');
INSERT INTO `lab`.`productcategories` (`productCategoryName`) VALUES ('Vestidos');
INSERT INTO `lab`.`productcategories` (`productCategoryName`) VALUES ('Calças');
INSERT INTO `lab`.`productcategories` (`productCategoryName`) VALUES ('Jeans');
INSERT INTO `lab`.`productcategories` (`productCategoryName`) VALUES ('Saias');
INSERT INTO `lab`.`productcategories` (`productCategoryName`) VALUES ('Calções');