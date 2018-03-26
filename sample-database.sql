-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 26, 2018 at 10:46 AM
-- Server version: 10.2.8-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node.ucp`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `password` varchar(512) NOT NULL,
  `score` int(8) NOT NULL DEFAULT 0,
  `adminLevel` int(1) NOT NULL DEFAULT 0,
  `rank` varchar(64) NOT NULL,
  `registered` datetime DEFAULT current_timestamp(),
  `lastLogin` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `vipExpire` datetime DEFAULT NULL,
  `banned` int(1) NOT NULL DEFAULT 0,
  `cash` int(11) NOT NULL DEFAULT 0,
  `kills` int(11) NOT NULL DEFAULT 0,
  `deaths` int(11) NOT NULL DEFAULT 0,
  `achs` int(11) NOT NULL DEFAULT 0,
  `onlineTime` int(11) NOT NULL DEFAULT 0,
  `racesWon` int(11) NOT NULL DEFAULT 0,
  `jobsDone` int(11) NOT NULL DEFAULT 0,
  `bounty` int(11) NOT NULL DEFAULT 0,
  `clan` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `name`, `password`, `score`, `adminLevel`, `rank`, `registered`, `lastLogin`, `vipExpire`, `banned`, `cash`, `kills`, `deaths`, `achs`, `onlineTime`, `racesWon`, `jobsDone`, `bounty`, `clan`) VALUES
(1, 'Mr._Test', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 4654, 5, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(3, 'Zeus', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 4654, 2, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(4, 'Owain', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 564, 3, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(5, 'Namare', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 5432, 8, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(6, 'April', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 13215, 4, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(7, 'Euno', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 8413, 6, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(8, 'Hellrocker', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 132, 23, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(9, 'Inferno', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 56412, 12, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(10, 'Jeffery', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 16, 45, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(11, 'Nablet', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 0, 78, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(12, 'icecoldkilla', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 215, 54, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(13, 'Tokkor', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 213, 23, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(14, 'Jadi', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 16, 31, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(15, 'Demo', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 646, 45, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(16, 'Kevin', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 321, 78, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(17, 'Names', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 794, 32, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(18, 'Hocke', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 315, 12, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(19, 'Marko', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 321, 23, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(20, 'Isaih', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 314, 23, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(21, 'Cody', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 846, 23, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(22, 'Jonas', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 3285, 4, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(23, 'Spider', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 321, 513, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(24, 'Super', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 321, 31, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(25, 'SkillZ', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 613, 321, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(26, 'BomberMan', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 318, 456, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(27, 'Kelly', '134C438C53509FF4E6F966883A7FBCF6E0DC49BECBA3093079AAD86E1AB44021C29D823212BC5313AA5A1E4724211EAF4795E339705408B5BBE56BF044D801CC', 46548, 561, 'Sergeant', '2017-11-20 00:00:00', '2018-02-22 03:53:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(28, 'NEBLYET', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 444, 31, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(29, 'Yuri', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 666, 31, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(30, 'Sahil', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 777, 45, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(31, 'Simran', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 888, 95, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(32, 'Siddharth', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 49954, 185, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme'),
(33, 'Test2', 'B913D5BBB8E461C2C5961CBE0EDCDADFD29F068225CEB37DA6DEFCF89849368F8C6C2EB6A4C4AC75775D032A0ECFDFE8550573062B653FE92FC7B8FB3B7BE8D6', 4654, 32, 'Sergeant', '2017-11-20 00:00:00', '2017-12-06 20:47:43', '2017-11-30 00:00:00', 0, 584543, 5678, 1234, 69, 45634, 10, 21, 71000, 'Good Gayme');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
CREATE TABLE IF NOT EXISTS `properties` (
  `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` tinyint(1) NOT NULL,
  `x` float(12,6) NOT NULL,
  `y` float(12,6) NOT NULL,
  `z` float(12,6) NOT NULL,
  `ownerID` int(6) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=168 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `type`, `x`, `y`, `z`, `ownerID`, `price`) VALUES
(1, 3, 2376.313477, 1680.604004, 11.023437, 21, 6586266),
(2, 1, 1466.521240, -1068.732422, 213.382812, 3, 7890914),
(3, 3, 2359.058105, 1674.316895, 11.023437, 8, 2909122),
(4, 3, 2359.152344, 1669.437378, 11.023437, 26, 5110929),
(5, 3, 2359.146240, 1659.030884, 11.023437, 16, 8324872),
(6, 3, 2359.404541, 1653.707642, 11.023437, 0, 3977669),
(7, 2, 2363.209229, 1644.010010, 11.023437, 17, 2781278),
(8, 3, 2368.341797, 1644.249756, 11.023437, 19, 7573588),
(9, 1, 2373.479980, 1644.141235, 11.023437, 3, 10048662),
(10, 2, -2286.369385, 798.718140, 49.445312, 13, 4765378),
(11, 0, -2303.587158, 799.560974, 48.478088, 26, 4262098),
(12, 2, -2321.828125, 798.553711, 45.184525, 27, 2453177),
(13, 3, -2340.144775, 798.940857, 41.846638, 27, 8080837),
(14, 1, -2358.487305, 798.603088, 38.347012, 13, 2580227),
(15, 0, -2303.230957, 818.389160, 48.615135, 24, 7177011),
(16, 0, -2321.954834, 818.627441, 45.206543, 5, 7603779),
(17, 2, -2340.062256, 817.555664, 41.863518, 19, 4284982),
(18, 1, -2358.340576, 817.580688, 38.376709, 3, 988269),
(19, 0, -2642.110107, 726.277771, 27.960938, 4, 9246417),
(20, 3, -2638.495850, 730.554749, 30.075718, 12, 5865122),
(21, 1, -2731.478027, 721.659729, 41.273438, 29, 9714199),
(22, 1, 206.703644, -1771.091797, 4.290058, 4, 4332869),
(23, 0, -2710.738281, 721.358276, 39.771675, 10, 3074512),
(24, 2, -2706.786621, 720.975342, 37.853237, 19, 1703974),
(25, 1, -2686.148193, 721.211548, 32.039314, 19, 2177858),
(26, 2, -2678.226074, 720.296265, 28.856354, 27, 320249),
(27, 3, -2739.959961, 746.470154, 49.807331, 15, 2143178),
(28, 2, -2739.794922, 755.107422, 52.982906, 4, 7087858),
(29, 0, -2739.593994, 758.943970, 54.382812, 6, 5446459),
(30, 1, -2739.837646, 771.660645, 54.382812, 3, 9089120),
(31, 2, -2740.230225, 789.229492, 54.382812, 18, 8274013),
(32, 0, -2740.177490, 797.698181, 53.140598, 0, 3039069),
(33, 2, -2739.824707, 801.664490, 53.062500, 3, 8380724),
(34, 0, -2709.837646, 804.745056, 49.976562, 4, 5586555),
(35, 3, -2698.964111, 804.466797, 49.970276, 22, 8556525),
(36, 3, -2687.750488, 804.585388, 49.976562, 14, 4927779),
(37, 0, -2677.313232, 804.463867, 49.976562, 21, 4500920),
(38, 1, -2670.492188, 804.719849, 49.976562, 26, 1601475),
(39, 0, -2659.718262, 804.816833, 49.976562, 3, 6723444),
(40, 3, -2899.262207, 458.430634, 5.718446, 26, 8110053),
(41, 1, -2946.191406, 473.722656, 4.914062, 15, 1045310),
(42, 0, -2645.393555, 804.473755, 49.976562, 28, 2285583),
(43, 0, -2642.303955, 817.637085, 49.984375, 18, 1797237),
(44, 1, -2652.355469, 818.169189, 49.984375, 18, 2333424),
(45, 3, -2666.831787, 818.146301, 49.984375, 26, 8414968),
(46, 2, -2685.007812, 817.667542, 49.984375, 27, 6903011),
(47, 0, -2737.179443, 821.138489, 53.269226, 19, 9779291),
(48, 0, -2731.786133, 809.933899, 53.062500, 17, 5413334),
(49, 1, -2741.532715, 836.706116, 56.490467, 25, 6362904),
(50, 0, 296.830200, -1335.676147, 53.441563, 13, 9437423),
(51, 1, 1271.215698, -2857.240479, 119.207809, 8, 9848619),
(52, 0, -2751.258545, 1244.127930, 11.815624, 25, 279181),
(53, 2, 43.072948, 2470.462158, 16.551527, 27, 389303),
(54, 0, 253.027359, -1222.901611, 75.274124, 26, 861964),
(55, 1, 2554.759033, -958.117981, 82.683647, 17, 295680),
(56, 0, 1701.592285, 621.325195, 10.846875, 24, 1300403),
(57, 0, 725.515198, -1446.428711, 17.000000, 23, 6311500),
(58, 3, 1124.217773, -2036.994385, 69.884819, 19, 9864660),
(59, 1, 1106.315674, -299.539551, 74.539062, 9, 3886070),
(60, 3, -24.203638, 2451.390869, 18.487812, 16, 6262687),
(61, 2, 2361.769287, 1648.563599, 10.820312, 17, 9375842),
(62, 1, 2366.192139, 1680.115845, 11.023437, 16, 4255386),
(63, 3, -2723.134033, -315.406769, 7.178581, 29, 2573449),
(64, 2, -241.960526, 1217.608887, 21.141014, 15, 761902),
(65, 2, -1259.251587, -469.682739, 15.888493, 12, 762559),
(66, 1, 868.785767, -28.170374, 63.195312, 11, 9648835),
(67, 3, 270.572052, -2223.467041, 4.409124, 8, 4064527),
(68, 2, -2949.523438, 1995.386719, 16.581251, 10, 8887132),
(69, 0, 1558.820312, -3100.000000, 6.656557, 19, 6357885),
(70, 1, 167.998657, -1770.789062, 4.406641, 17, 6228362),
(71, 1, 192.712906, -1771.025024, 4.265166, 21, 9013275),
(72, 3, 206.703644, -1771.091797, 4.290058, 23, 2582268),
(73, 3, -1864.831543, -1561.676270, 21.750000, 7, 9160602),
(74, 1, 1068.148560, 2409.823730, 11.975000, 13, 5183176),
(75, 0, 972.805664, 2427.011963, 10.836708, 4, 8074303),
(76, 3, 937.689758, 2428.611084, 10.839465, 3, 1351262),
(77, 2, 956.756531, 2443.229248, 10.825625, 12, 8971477),
(78, 3, 1939.811157, -4525.352539, 12.042187, 1, 9206734),
(79, 0, 1746.232300, -1202.515381, 97.669273, 2, 9720590),
(80, 0, 2376.165039, -1640.991089, 13.555706, 29, 9729880),
(81, 2, 304.007812, 1141.239624, 8.585937, 0, 9910798),
(82, 3, 1159.310791, -3009.018555, 21.907812, 9, 1638462),
(83, 0, 335.328766, -1814.798584, 4.351946, 12, 8403473),
(84, 2, 305.696869, -1811.169189, 4.419980, 13, 4105939),
(85, 3, 1347.460083, -481.109314, 56.511040, 26, 1284200),
(86, 2, 1926.152466, 2774.463379, 10.820312, 20, 1689872),
(87, 1, 1575.847412, 2840.976562, 10.820312, 4, 6118727),
(88, 2, 2796.579834, -1087.677124, 30.719810, 19, 2662995),
(89, 2, 1690.882690, -1461.486694, 13.546875, 0, 4690593),
(90, 0, -3163.333252, -1357.204834, 6.907812, 19, 981554),
(91, 2, -604.294678, 982.205811, 9.459483, 23, 3162083),
(92, 1, -615.304382, 1066.112793, 11.812942, 21, 7715922),
(93, 1, -637.090149, 1069.207520, 12.917098, 3, 4539751),
(94, 2, -679.071838, 1041.047119, 12.993750, 12, 5564090),
(95, 3, -716.170288, 1034.801880, 12.324676, 15, 6407271),
(96, 1, -15.765819, 1524.896362, 12.756023, 20, 1944828),
(97, 1, -1419.650757, -963.645691, 200.727142, 17, 6064903),
(98, 1, 2823.336670, 2140.618652, 14.661464, 18, 7398842),
(99, 2, 2452.396973, 1497.211548, 11.228235, 6, 8009341),
(100, 0, -750.772888, -2007.485229, 8.348437, 29, 6973229),
(101, 2, 682.172791, 1847.082764, 5.508705, 18, 1229444),
(102, 0, -2203.213867, 72.963432, 35.320312, 5, 783181),
(103, 3, -2203.224609, 66.940826, 35.320312, 16, 3145800),
(104, 3, 1489.104370, 714.769104, 10.820312, 8, 949941),
(105, 2, 1463.932983, 624.349365, 10.845602, 8, 5693665),
(106, 2, 1188.916626, 738.354614, 13.626125, 22, 6769398),
(107, 0, 860.600708, 1927.199219, 191.836884, 2, 7774112),
(108, 3, 1794.673096, -1305.730591, 131.734375, 25, 7389954),
(109, 0, 2498.612305, 1645.271973, 11.023437, 28, 7416758),
(110, 1, -2813.433594, -1524.012573, 140.843750, 15, 410717),
(111, 3, 1215.967773, 2684.646729, 11.652820, 6, 990756),
(112, 1, -418.663666, -1759.599854, 6.218750, 16, 8972490),
(113, 0, 1106.315674, -299.539551, 74.539062, 20, 2068031),
(114, 0, 2446.963379, 662.741638, 11.460937, 12, 2019352),
(115, 0, 2503.269287, 1646.394287, 10.820312, 0, 253148),
(116, 3, 3123.763916, 2172.263184, 6.780923, 23, 9218602),
(117, 0, 2808.576904, 2697.187256, 10.886037, 19, 2446059),
(118, 2, -3000.720215, -961.475525, 8.787529, 3, 4191451),
(119, 0, 1158.676270, -3010.010498, 21.290548, 20, 4196673),
(120, 1, -3011.091797, -955.845398, 8.787529, 29, 1189400),
(121, 2, 2446.108887, 689.461853, 11.460937, 13, 3460043),
(122, 0, 2508.549561, 1645.897461, 10.820312, 18, 3532513),
(123, 1, 22.397375, -2646.461670, 40.463474, 22, 7337643),
(124, 3, 2371.272705, 1680.260254, 11.023437, 27, 3479533),
(125, 0, 1158.810913, -3008.734863, 20.866913, 25, 584602),
(126, 0, 2884.865234, 2262.767090, 12.307812, 10, 8691579),
(127, 1, 2886.356201, 2257.380127, 12.307812, 29, 7532289),
(128, 2, -2050.451416, 2260.117188, 31.654964, 0, 9045976),
(129, 3, -2983.594727, -992.088013, 8.669480, 15, 1600080),
(130, 1, -2987.045410, -989.635925, 8.376470, 12, 4055908),
(131, 2, 1904.731812, -454.545197, 24.298491, 23, 2822974),
(132, 3, -3021.106934, -961.136536, 8.794626, 17, 2619590),
(133, 3, -1754.113770, 962.995728, 24.882812, 14, 9550395),
(134, 1, -1799.986328, 1204.502686, 25.125000, 20, 139902),
(135, 1, -1860.566772, 1114.143799, 45.445312, 4, 9555680),
(136, 0, -1842.515991, 1114.506348, 45.445312, 10, 9596880),
(137, 0, -1821.040161, 1116.416016, 45.996361, 5, 10021905),
(138, 3, -1776.127930, 1114.656372, 45.445312, 1, 129236),
(139, 0, -1732.156372, 1113.967651, 45.445312, 7, 4045166),
(140, 3, -1849.062622, 1032.738770, 49.029018, 23, 9414776),
(141, 2, -1846.972412, 1008.494507, 53.378529, 19, 2493546),
(142, 1, -3033.675781, -935.874756, 7.333043, 5, 2955556),
(143, 2, -815.587280, 2765.624512, 46.000000, 1, 8915662),
(144, 2, -814.455200, 2753.042969, 46.000000, 25, 5324512),
(145, 3, -21.330059, 1348.984375, 9.171875, 12, 9436601),
(146, 1, -825.458374, 2752.594482, 46.000000, 0, 7114507),
(147, 0, -826.955872, 2764.947510, 46.000000, 8, 6982975),
(148, 3, -838.433594, 2762.207031, 46.000000, 8, 319500),
(149, 3, -851.599304, 2761.037842, 46.000000, 13, 9728780),
(150, 1, -867.619873, 2761.635010, 46.000000, 14, 6953231),
(151, 0, -866.387573, 2749.798828, 46.000000, 17, 3534888),
(152, 3, -879.344971, 2748.313721, 46.000000, 5, 5768149),
(153, 2, -880.478333, 2760.596680, 46.000000, 18, 2194196),
(154, 2, 1623.420654, 2568.760498, 10.820312, 20, 6942308),
(155, 1, 1596.526733, 2568.074219, 10.820312, 1, 5045889),
(156, 0, 1564.246216, 2569.883057, 10.820312, 15, 9391325),
(157, 1, 1551.571411, 2568.281006, 10.820312, 25, 9086391),
(158, 1, 1513.262207, 2565.967285, 10.826543, 25, 1938231),
(159, 0, 1503.371948, 2568.037842, 10.820312, 14, 8162624),
(160, 2, -2102.385742, 1571.532593, 17.487530, 22, 6941821),
(161, 0, 2812.845947, 3168.756836, 12.075000, 24, 8009718),
(162, 2, 3384.359375, -614.014648, 17.357439, 5, 8950575),
(163, 1, 2493.729248, 3173.597412, 13.307812, 1, 6739446),
(164, 1, -2356.332275, -3157.400635, 6.407812, 24, 5503386),
(165, 0, -3012.409912, -956.648376, 4.555788, 2, 2627335),
(166, 1, -2971.000000, -995.689392, 7.604687, 29, 564126),
(167, 0, -2037.105469, 1705.128418, 2.020290, 17, 3503494);

-- --------------------------------------------------------

--
-- Table structure for table `ucp_sessions`
--

DROP TABLE IF EXISTS `ucp_sessions`;
CREATE TABLE IF NOT EXISTS `ucp_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(6) NOT NULL,
  `ssid` varchar(256) NOT NULL,
  `expiry` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `vid` int(11) NOT NULL,
  `vname` varchar(64) NOT NULL,
  `odo` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=310 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `uid`, `vid`, `vname`, `odo`) VALUES
(1, 1, 425, 'Inferno', 0),
(2, 1, 545, 'Sand King', 0),
(3, 1, 455, 'Dumper', 0),
(4, 1, 500, 'NRG', 0),
(5, 1, 588, 'PCJ-600', 52),
(6, 1, 437, 'Bus', 512),
(7, 1, 452, 'Speeder', 120),
(8, 1, 457, 'Caddy', 12),
(9, 1, 465, 'RC Raider', 56),
(10, 1, 471, 'Quad', 95),
(11, 1, 486, 'Bulldozer', 352),
(12, 1, 488, 'News Maverick', 1021),
(13, 1, 522, 'NRG', 879),
(14, 2, 400, 'Vehicle Name', 0),
(15, 2, 415, 'Vehicle Name', 0),
(16, 2, 475, 'Vehicle Name', 0),
(17, 2, 510, 'Vehicle Name', 0),
(18, 2, 578, 'Vehicle Name', 52),
(19, 2, 487, 'Vehicle Name', 512),
(20, 2, 462, 'Vehicle Name', 120),
(21, 2, 427, 'Vehicle Name', 12),
(22, 2, 465, 'Vehicle Name', 56),
(23, 2, 482, 'Vehicle Name', 95),
(24, 2, 436, 'Vehicle Name', 352),
(25, 2, 418, 'Vehicle Name', 1022),
(26, 2, 512, 'Vehicle Name', 879),
(27, 3, 407, 'Vehicle Name', 0),
(28, 3, 414, 'Vehicle Name', 0),
(29, 3, 475, 'Vehicle Name', 0),
(30, 3, 516, 'Vehicle Name', 0),
(31, 3, 571, 'Vehicle Name', 53),
(32, 3, 482, 'Vehicle Name', 513),
(33, 3, 463, 'Vehicle Name', 120),
(34, 3, 428, 'Vehicle Name', 13),
(35, 3, 467, 'Vehicle Name', 56),
(36, 3, 484, 'Vehicle Name', 95),
(37, 3, 434, 'Vehicle Name', 353),
(38, 3, 419, 'Vehicle Name', 1023),
(39, 3, 517, 'Vehicle Name', 879),
(40, 4, 411, 'Vehicle Name', 47),
(41, 4, 554, 'Vehicle Name', 23),
(42, 4, 481, 'Vehicle Name', 60),
(43, 4, 437, 'Vehicle Name', 26),
(44, 4, 532, 'Vehicle Name', 18),
(45, 4, 449, 'Vehicle Name', 97),
(46, 4, 519, 'Vehicle Name', 41),
(47, 4, 497, 'Vehicle Name', 40),
(48, 4, 567, 'Vehicle Name', 60),
(49, 4, 525, 'Vehicle Name', 0),
(50, 5, 573, 'Vehicle Name', 2),
(51, 5, 497, 'Vehicle Name', 55),
(52, 5, 566, 'Vehicle Name', 43),
(53, 5, 492, 'Vehicle Name', 84),
(54, 5, 548, 'Vehicle Name', 63),
(55, 5, 570, 'Vehicle Name', 48),
(56, 5, 569, 'Vehicle Name', 52),
(57, 5, 529, 'Vehicle Name', 84),
(58, 5, 461, 'Vehicle Name', 51),
(59, 5, 531, 'Vehicle Name', 60),
(60, 6, 467, 'Vehicle Name', 92),
(61, 6, 575, 'Vehicle Name', 25),
(62, 6, 400, 'Vehicle Name', 43),
(63, 6, 525, 'Vehicle Name', 12),
(64, 6, 434, 'Vehicle Name', 28),
(65, 6, 585, 'Vehicle Name', 42),
(66, 6, 427, 'Vehicle Name', 97),
(67, 6, 401, 'Vehicle Name', 59),
(68, 6, 583, 'Vehicle Name', 72),
(69, 6, 464, 'Vehicle Name', 67),
(70, 7, 411, 'Vehicle Name', 53),
(71, 7, 446, 'Vehicle Name', 57),
(72, 7, 541, 'Vehicle Name', 96),
(73, 7, 417, 'Vehicle Name', 92),
(74, 7, 596, 'Vehicle Name', 50),
(75, 7, 555, 'Vehicle Name', 77),
(76, 7, 548, 'Vehicle Name', 85),
(77, 7, 485, 'Vehicle Name', 68),
(78, 7, 595, 'Vehicle Name', 36),
(79, 7, 437, 'Vehicle Name', 38),
(80, 8, 571, 'Vehicle Name', 6),
(81, 8, 424, 'Vehicle Name', 98),
(82, 8, 437, 'Vehicle Name', 79),
(83, 8, 587, 'Vehicle Name', 60),
(84, 8, 419, 'Vehicle Name', 72),
(85, 8, 589, 'Vehicle Name', 95),
(86, 8, 420, 'Vehicle Name', 79),
(87, 8, 564, 'Vehicle Name', 15),
(88, 8, 558, 'Vehicle Name', 38),
(89, 8, 539, 'Vehicle Name', 29),
(90, 9, 447, 'Vehicle Name', 47),
(91, 9, 465, 'Vehicle Name', 11),
(92, 9, 559, 'Vehicle Name', 95),
(93, 9, 560, 'Vehicle Name', 82),
(94, 9, 586, 'Vehicle Name', 21),
(95, 9, 405, 'Vehicle Name', 30),
(96, 9, 581, 'Vehicle Name', 37),
(97, 9, 573, 'Vehicle Name', 14),
(98, 9, 523, 'Vehicle Name', 97),
(99, 9, 442, 'Vehicle Name', 69),
(100, 10, 463, 'Vehicle Name', 75),
(101, 10, 471, 'Vehicle Name', 64),
(102, 10, 507, 'Vehicle Name', 19),
(103, 10, 534, 'Vehicle Name', 46),
(104, 10, 403, 'Vehicle Name', 5),
(105, 10, 499, 'Vehicle Name', 73),
(106, 10, 461, 'Vehicle Name', 65),
(107, 10, 471, 'Vehicle Name', 50),
(108, 10, 528, 'Vehicle Name', 8),
(109, 10, 525, 'Vehicle Name', 92),
(110, 11, 407, 'Vehicle Name', 92),
(111, 11, 572, 'Vehicle Name', 29),
(112, 11, 551, 'Vehicle Name', 93),
(113, 11, 472, 'Vehicle Name', 36),
(114, 11, 499, 'Vehicle Name', 73),
(115, 11, 558, 'Vehicle Name', 53),
(116, 11, 495, 'Vehicle Name', 82),
(117, 11, 502, 'Vehicle Name', 92),
(118, 11, 591, 'Vehicle Name', 79),
(119, 11, 594, 'Vehicle Name', 33),
(120, 12, 504, 'Vehicle Name', 9),
(121, 12, 580, 'Vehicle Name', 40),
(122, 12, 546, 'Vehicle Name', 29),
(123, 12, 542, 'Vehicle Name', 5),
(124, 12, 479, 'Vehicle Name', 83),
(125, 12, 474, 'Vehicle Name', 64),
(126, 12, 545, 'Vehicle Name', 33),
(127, 12, 434, 'Vehicle Name', 27),
(128, 12, 493, 'Vehicle Name', 60),
(129, 12, 429, 'Vehicle Name', 71),
(130, 13, 504, 'Vehicle Name', 35),
(131, 13, 515, 'Vehicle Name', 16),
(132, 13, 558, 'Vehicle Name', 57),
(133, 13, 430, 'Vehicle Name', 49),
(134, 13, 410, 'Vehicle Name', 7),
(135, 13, 532, 'Vehicle Name', 83),
(136, 13, 593, 'Vehicle Name', 55),
(137, 13, 594, 'Vehicle Name', 17),
(138, 13, 578, 'Vehicle Name', 32),
(139, 13, 465, 'Vehicle Name', 3),
(140, 14, 416, 'Vehicle Name', 61),
(141, 14, 515, 'Vehicle Name', 72),
(142, 14, 461, 'Vehicle Name', 67),
(143, 14, 431, 'Vehicle Name', 55),
(144, 14, 566, 'Vehicle Name', 32),
(145, 14, 412, 'Vehicle Name', 67),
(146, 14, 511, 'Vehicle Name', 83),
(147, 14, 457, 'Vehicle Name', 16),
(148, 14, 565, 'Vehicle Name', 38),
(149, 14, 468, 'Vehicle Name', 42),
(150, 15, 447, 'Vehicle Name', 93),
(151, 15, 488, 'Vehicle Name', 27),
(152, 15, 531, 'Vehicle Name', 10),
(153, 15, 520, 'Vehicle Name', 21),
(154, 15, 564, 'Vehicle Name', 43),
(155, 15, 445, 'Vehicle Name', 89),
(156, 15, 544, 'Vehicle Name', 30),
(157, 15, 438, 'Vehicle Name', 86),
(158, 15, 410, 'Vehicle Name', 24),
(159, 15, 580, 'Vehicle Name', 69),
(160, 16, 558, 'Vehicle Name', 6),
(161, 16, 504, 'Vehicle Name', 47),
(162, 16, 471, 'Vehicle Name', 35),
(163, 16, 552, 'Vehicle Name', 31),
(164, 16, 421, 'Vehicle Name', 96),
(165, 16, 564, 'Vehicle Name', 27),
(166, 16, 415, 'Vehicle Name', 26),
(167, 16, 459, 'Vehicle Name', 92),
(168, 16, 595, 'Vehicle Name', 92),
(169, 16, 427, 'Vehicle Name', 86),
(170, 17, 456, 'Vehicle Name', 67),
(171, 17, 596, 'Vehicle Name', 87),
(172, 17, 432, 'Vehicle Name', 17),
(173, 17, 406, 'Vehicle Name', 79),
(174, 17, 412, 'Vehicle Name', 0),
(175, 17, 482, 'Vehicle Name', 28),
(176, 17, 443, 'Vehicle Name', 26),
(177, 17, 538, 'Vehicle Name', 44),
(178, 17, 553, 'Vehicle Name', 14),
(179, 17, 491, 'Vehicle Name', 46),
(180, 18, 490, 'Vehicle Name', 36),
(181, 18, 410, 'Vehicle Name', 45),
(182, 18, 423, 'Vehicle Name', 72),
(183, 18, 424, 'Vehicle Name', 25),
(184, 18, 544, 'Vehicle Name', 98),
(185, 18, 597, 'Vehicle Name', 11),
(186, 18, 457, 'Vehicle Name', 72),
(187, 18, 423, 'Vehicle Name', 73),
(188, 18, 470, 'Vehicle Name', 98),
(189, 18, 495, 'Vehicle Name', 63),
(190, 19, 525, 'Vehicle Name', 8),
(191, 19, 537, 'Vehicle Name', 80),
(192, 19, 492, 'Vehicle Name', 75),
(193, 19, 565, 'Vehicle Name', 40),
(194, 19, 501, 'Vehicle Name', 61),
(195, 19, 458, 'Vehicle Name', 48),
(196, 19, 428, 'Vehicle Name', 77),
(197, 19, 533, 'Vehicle Name', 46),
(198, 19, 492, 'Vehicle Name', 14),
(199, 19, 441, 'Vehicle Name', 75),
(200, 20, 559, 'Vehicle Name', 95),
(201, 20, 402, 'Vehicle Name', 56),
(202, 20, 546, 'Vehicle Name', 6),
(203, 20, 530, 'Vehicle Name', 89),
(204, 20, 505, 'Vehicle Name', 8),
(205, 20, 407, 'Vehicle Name', 93),
(206, 20, 438, 'Vehicle Name', 24),
(207, 20, 554, 'Vehicle Name', 72),
(208, 20, 446, 'Vehicle Name', 2),
(209, 20, 568, 'Vehicle Name', 43),
(210, 21, 534, 'Vehicle Name', 91),
(211, 21, 504, 'Vehicle Name', 78),
(212, 21, 433, 'Vehicle Name', 4),
(213, 21, 500, 'Vehicle Name', 36),
(214, 21, 427, 'Vehicle Name', 92),
(215, 21, 495, 'Vehicle Name', 15),
(216, 21, 536, 'Vehicle Name', 72),
(217, 21, 435, 'Vehicle Name', 25),
(218, 21, 577, 'Vehicle Name', 27),
(219, 21, 555, 'Vehicle Name', 66),
(220, 22, 582, 'Vehicle Name', 57),
(221, 22, 577, 'Vehicle Name', 36),
(222, 22, 501, 'Vehicle Name', 77),
(223, 22, 437, 'Vehicle Name', 20),
(224, 22, 426, 'Vehicle Name', 41),
(225, 22, 401, 'Vehicle Name', 55),
(226, 22, 429, 'Vehicle Name', 99),
(227, 22, 504, 'Vehicle Name', 28),
(228, 22, 459, 'Vehicle Name', 50),
(229, 22, 513, 'Vehicle Name', 36),
(230, 23, 562, 'Vehicle Name', 59),
(231, 23, 494, 'Vehicle Name', 70),
(232, 23, 583, 'Vehicle Name', 43),
(233, 23, 416, 'Vehicle Name', 80),
(234, 23, 502, 'Vehicle Name', 27),
(235, 23, 493, 'Vehicle Name', 28),
(236, 23, 447, 'Vehicle Name', 94),
(237, 23, 584, 'Vehicle Name', 13),
(238, 23, 516, 'Vehicle Name', 88),
(239, 23, 465, 'Vehicle Name', 36),
(240, 24, 555, 'Vehicle Name', 19),
(241, 24, 443, 'Vehicle Name', 27),
(242, 24, 587, 'Vehicle Name', 78),
(243, 24, 452, 'Vehicle Name', 5),
(244, 24, 551, 'Vehicle Name', 28),
(245, 24, 441, 'Vehicle Name', 3),
(246, 24, 550, 'Vehicle Name', 16),
(247, 24, 492, 'Vehicle Name', 1),
(248, 24, 480, 'Vehicle Name', 71),
(249, 24, 579, 'Vehicle Name', 67),
(250, 25, 553, 'Vehicle Name', 33),
(251, 25, 489, 'Vehicle Name', 29),
(252, 25, 529, 'Vehicle Name', 8),
(253, 25, 473, 'Vehicle Name', 56),
(254, 25, 542, 'Vehicle Name', 37),
(255, 25, 594, 'Vehicle Name', 21),
(256, 25, 516, 'Vehicle Name', 5),
(257, 25, 488, 'Vehicle Name', 98),
(258, 25, 455, 'Vehicle Name', 8),
(259, 25, 516, 'Vehicle Name', 24),
(260, 26, 561, 'Vehicle Name', 67),
(261, 26, 536, 'Vehicle Name', 39),
(262, 26, 449, 'Vehicle Name', 79),
(263, 26, 522, 'Vehicle Name', 97),
(264, 26, 562, 'Vehicle Name', 46),
(265, 26, 590, 'Vehicle Name', 38),
(266, 26, 557, 'Vehicle Name', 71),
(267, 26, 565, 'Vehicle Name', 21),
(268, 26, 483, 'Vehicle Name', 79),
(269, 26, 575, 'Vehicle Name', 16),
(270, 27, 442, 'Vehicle Name', 77),
(271, 27, 530, 'Vehicle Name', 35),
(272, 27, 477, 'Vehicle Name', 64),
(273, 27, 448, 'Vehicle Name', 50),
(274, 27, 459, 'Vehicle Name', 56),
(275, 27, 537, 'Vehicle Name', 59),
(276, 27, 410, 'Vehicle Name', 5),
(277, 27, 414, 'Vehicle Name', 44),
(278, 27, 464, 'Vehicle Name', 7),
(279, 27, 538, 'Vehicle Name', 62),
(280, 28, 449, 'Vehicle Name', 88),
(281, 28, 465, 'Vehicle Name', 28),
(282, 28, 562, 'Vehicle Name', 25),
(283, 28, 490, 'Vehicle Name', 39),
(284, 28, 437, 'Vehicle Name', 47),
(285, 28, 442, 'Vehicle Name', 56),
(286, 28, 511, 'Vehicle Name', 51),
(287, 28, 558, 'Vehicle Name', 35),
(288, 28, 482, 'Vehicle Name', 98),
(289, 28, 460, 'Vehicle Name', 87),
(290, 29, 545, 'Vehicle Name', 98),
(291, 29, 410, 'Vehicle Name', 46),
(292, 29, 454, 'Vehicle Name', 73),
(293, 29, 561, 'Vehicle Name', 22),
(294, 29, 411, 'Vehicle Name', 27),
(295, 29, 462, 'Vehicle Name', 6),
(296, 29, 438, 'Vehicle Name', 81),
(297, 29, 531, 'Vehicle Name', 88),
(298, 29, 504, 'Vehicle Name', 25),
(299, 29, 512, 'Vehicle Name', 35),
(300, 30, 528, 'Vehicle Name', 37),
(301, 30, 424, 'Vehicle Name', 95),
(302, 30, 474, 'Vehicle Name', 69),
(303, 30, 526, 'Vehicle Name', 75),
(304, 30, 560, 'Vehicle Name', 8),
(305, 30, 554, 'Vehicle Name', 5),
(306, 30, 430, 'Vehicle Name', 97),
(307, 30, 577, 'Vehicle Name', 41),
(308, 30, 546, 'Vehicle Name', 43),
(309, 30, 574, 'Vehicle Name', 72);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;