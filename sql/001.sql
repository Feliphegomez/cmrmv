-- --------------------------------------------------------
-- Host:                         dataservix.com
-- Versión del servidor:         5.7.24-0ubuntu0.16.04.1 - (Ubuntu)
-- SO del servidor:              Linux
-- HeidiSQL Versión:             9.5.0.5324
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para mvltda_cmr
CREATE DATABASE IF NOT EXISTS `mvltda_cmr` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mvltda_cmr`;

-- Volcando estructura para tabla mvltda_cmr.arl
DROP TABLE IF EXISTS `arl`;
CREATE TABLE IF NOT EXISTS `arl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`),
  KEY `code_key` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.clients
DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `identification_type` int(11) NOT NULL,
  `identification_number` varchar(50) NOT NULL,
  `social_reason` varchar(100) NOT NULL,
  `tradename` varchar(100) NOT NULL,
  `society_type` int(11) NOT NULL,
  `geo_departament` int(11) NOT NULL,
  `geo_city` int(11) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `geo_address` varchar(100) NOT NULL,
  `legal_representative` int(11) NOT NULL,
  `contact_principal` int(11) NOT NULL,
  `contact_alternative` int(11) DEFAULT NULL,
  `enable_audit` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_clients_types_clients` (`type`),
  KEY `FK_clients_types_identifications` (`identification_type`),
  KEY `FK_clients_geo_departments` (`geo_departament`),
  KEY `FK_clients_contacts` (`legal_representative`),
  KEY `FK_clients_contacts_2` (`contact_principal`),
  KEY `FK_clients_contacts_3` (`contact_alternative`),
  KEY `FK_clients_types_societys` (`society_type`),
  KEY `FK_clients_geo_city` (`geo_city`),
  CONSTRAINT `FK_clients_contacts` FOREIGN KEY (`legal_representative`) REFERENCES `contacts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_clients_contacts_2` FOREIGN KEY (`contact_principal`) REFERENCES `contacts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_clients_contacts_3` FOREIGN KEY (`contact_alternative`) REFERENCES `contacts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_clients_geo_departments` FOREIGN KEY (`geo_departament`) REFERENCES `geo_departments` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_clients_types_clients` FOREIGN KEY (`type`) REFERENCES `types_clients` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_clients_types_identifications` FOREIGN KEY (`identification_type`) REFERENCES `types_identifications` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_clients_types_societys` FOREIGN KEY (`society_type`) REFERENCES `types_societys` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.contacts
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identification_type` int(11) DEFAULT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `second_name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) NOT NULL,
  `second_surname` varchar(50) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `phone_mobile` varchar(20) DEFAULT NULL,
  `mail` varchar(200) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `geo_address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_contacts_types_identifications` (`identification_type`),
  KEY `FK_contacts_geo_departments` (`department`),
  KEY `FK_contacts_geo_citys` (`city`),
  CONSTRAINT `FK_contacts_geo_citys` FOREIGN KEY (`city`) REFERENCES `geo_citys` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_contacts_geo_departments` FOREIGN KEY (`department`) REFERENCES `geo_departments` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_contacts_types_identifications` FOREIGN KEY (`identification_type`) REFERENCES `types_identifications` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.crew_vehicles
DROP TABLE IF EXISTS `crew_vehicles`;
CREATE TABLE IF NOT EXISTS `crew_vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `charge` int(11) NOT NULL,
  `vehicle` int(11) NOT NULL,
  `employee` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_drivers_vehicles_persons` (`employee`),
  KEY `FK_drivers_vehicles_vehicles` (`vehicle`),
  KEY `id` (`id`),
  KEY `FK_crew_vehicles_employee_charges` (`charge`),
  CONSTRAINT `FK_crew_vehicles_employees` FOREIGN KEY (`employee`) REFERENCES `employees` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_crew_vehicles_types_charges` FOREIGN KEY (`charge`) REFERENCES `types_charges` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_crew_vehicles_vehicles` FOREIGN KEY (`vehicle`) REFERENCES `vehicles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.employees
DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `second_name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `second_surname` varchar(50) DEFAULT NULL,
  `identification_type` int(11) DEFAULT NULL,
  `identification_number` varchar(50) DEFAULT NULL,
  `identification_date_expedition` varchar(50) DEFAULT NULL,
  `birthdate` varchar(50) DEFAULT NULL,
  `blood_type` int(11) DEFAULT NULL,
  `blood_rh` int(11) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `number_phone` varchar(50) DEFAULT NULL,
  `number_mobile` varchar(50) DEFAULT NULL,
  `company_date_entry` varchar(50) DEFAULT NULL,
  `company_date_out` varchar(50) DEFAULT NULL,
  `company_mail` varchar(50) DEFAULT NULL,
  `company_number_phone` varchar(50) DEFAULT NULL,
  `company_number_mobile` varchar(50) DEFAULT NULL,
  `avatar` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `eps` int(11) DEFAULT NULL,
  `arl` int(11) DEFAULT NULL,
  `pension_fund` int(11) DEFAULT NULL,
  `compensation_fund` int(11) DEFAULT NULL,
  `severance_fund` int(11) DEFAULT NULL,
  `reason_resignation` int(11) DEFAULT NULL,
  `geo_departament` int(11) DEFAULT NULL,
  `geo_city` int(11) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `geo_address` varchar(100) DEFAULT NULL,
  `observations` text,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_persons_arl` (`arl`),
  KEY `FK_persons_blood_rhs` (`blood_rh`),
  KEY `FK_persons_blood_types` (`blood_type`),
  KEY `FK_persons_compensation_funds` (`compensation_fund`),
  KEY `FK_persons_eps` (`eps`),
  KEY `FK_persons_identification_types` (`identification_type`),
  KEY `FK_persons_pension_funds` (`pension_fund`),
  KEY `FK_persons_status_employee` (`status`),
  KEY `FK_persons_severance_funds` (`severance_fund`),
  KEY `FK_employees_geo_departments` (`geo_departament`),
  KEY `FK_employees_geo_citys` (`geo_city`),
  KEY `FK_employees_pictures` (`avatar`),
  KEY `FK_employees_types_reasons_resignation` (`reason_resignation`),
  CONSTRAINT `FK_employees_arl` FOREIGN KEY (`arl`) REFERENCES `arl` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_eps` FOREIGN KEY (`eps`) REFERENCES `eps` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_funds_compensations` FOREIGN KEY (`compensation_fund`) REFERENCES `funds_compensations` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_funds_pensions` FOREIGN KEY (`pension_fund`) REFERENCES `funds_pensions` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_funds_severances` FOREIGN KEY (`severance_fund`) REFERENCES `funds_severances` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_geo_citys` FOREIGN KEY (`geo_city`) REFERENCES `geo_citys` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_geo_departments` FOREIGN KEY (`geo_departament`) REFERENCES `geo_departments` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_pictures` FOREIGN KEY (`avatar`) REFERENCES `pictures` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_status_employee` FOREIGN KEY (`status`) REFERENCES `status_employees` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_types_blood` FOREIGN KEY (`blood_type`) REFERENCES `types_bloods` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_types_blood_rhs` FOREIGN KEY (`blood_rh`) REFERENCES `types_bloods_rhs` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_types_identifications` FOREIGN KEY (`identification_type`) REFERENCES `types_identifications` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_employees_types_reasons_resignation` FOREIGN KEY (`reason_resignation`) REFERENCES `types_reasons_resignations` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.eps
DROP TABLE IF EXISTS `eps`;
CREATE TABLE IF NOT EXISTS `eps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`),
  KEY `code_key` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.funds_compensations
DROP TABLE IF EXISTS `funds_compensations`;
CREATE TABLE IF NOT EXISTS `funds_compensations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.funds_pensions
DROP TABLE IF EXISTS `funds_pensions`;
CREATE TABLE IF NOT EXISTS `funds_pensions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.funds_severances
DROP TABLE IF EXISTS `funds_severances`;
CREATE TABLE IF NOT EXISTS `funds_severances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.galery_vehicles
DROP TABLE IF EXISTS `galery_vehicles`;
CREATE TABLE IF NOT EXISTS `galery_vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `picture` int(11) NOT NULL,
  `vehicle` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `FK_galery_vehicles_images` (`picture`),
  KEY `FK_galery_vehicles_vehicles` (`vehicle`),
  CONSTRAINT `FK_galery_vehicles_pictures` FOREIGN KEY (`picture`) REFERENCES `pictures` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_galery_vehicles_vehicles` FOREIGN KEY (`vehicle`) REFERENCES `vehicles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.geo_citys
DROP TABLE IF EXISTS `geo_citys`;
CREATE TABLE IF NOT EXISTS `geo_citys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `department` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `departamento_id` (`department`),
  KEY `id` (`id`),
  CONSTRAINT `FK_citys_departments_citys` FOREIGN KEY (`department`) REFERENCES `geo_departments` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1101 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.geo_departments
DROP TABLE IF EXISTS `geo_departments`;
CREATE TABLE IF NOT EXISTS `geo_departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.pictures
DROP TABLE IF EXISTS `pictures`;
CREATE TABLE IF NOT EXISTS `pictures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `size` int(32) NOT NULL,
  `src` mediumtext NOT NULL,
  `type` varchar(50) NOT NULL,
  `create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.services
DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `type_medition` int(11) NOT NULL,
  `price` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`),
  KEY `FK_services_payments_types` (`type_medition`),
  CONSTRAINT `FK_services_types_meditions` FOREIGN KEY (`type_medition`) REFERENCES `types_meditions` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.status_employees
DROP TABLE IF EXISTS `status_employees`;
CREATE TABLE IF NOT EXISTS `status_employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.status_registrations
DROP TABLE IF EXISTS `status_registrations`;
CREATE TABLE IF NOT EXISTS `status_registrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.status_services
DROP TABLE IF EXISTS `status_services`;
CREATE TABLE IF NOT EXISTS `status_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `color` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`color`),
  KEY `id` (`id`),
  KEY `code_key` (`color`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.status_vehicles
DROP TABLE IF EXISTS `status_vehicles`;
CREATE TABLE IF NOT EXISTS `status_vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.types_bloods
DROP TABLE IF EXISTS `types_bloods`;
CREATE TABLE IF NOT EXISTS `types_bloods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.types_bloods_rhs
DROP TABLE IF EXISTS `types_bloods_rhs`;
CREATE TABLE IF NOT EXISTS `types_bloods_rhs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.types_charges
DROP TABLE IF EXISTS `types_charges`;
CREATE TABLE IF NOT EXISTS `types_charges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.types_clients
DROP TABLE IF EXISTS `types_clients`;
CREATE TABLE IF NOT EXISTS `types_clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.types_contacts
DROP TABLE IF EXISTS `types_contacts`;
CREATE TABLE IF NOT EXISTS `types_contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.types_fuels
DROP TABLE IF EXISTS `types_fuels`;
CREATE TABLE IF NOT EXISTS `types_fuels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.types_identifications
DROP TABLE IF EXISTS `types_identifications`;
CREATE TABLE IF NOT EXISTS `types_identifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.types_meditions
DROP TABLE IF EXISTS `types_meditions`;
CREATE TABLE IF NOT EXISTS `types_meditions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `code` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.types_reasons_resignations
DROP TABLE IF EXISTS `types_reasons_resignations`;
CREATE TABLE IF NOT EXISTS `types_reasons_resignations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.types_societys
DROP TABLE IF EXISTS `types_societys`;
CREATE TABLE IF NOT EXISTS `types_societys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.types_vehicles
DROP TABLE IF EXISTS `types_vehicles`;
CREATE TABLE IF NOT EXISTS `types_vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nick` varchar(50) DEFAULT NULL,
  `hash` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla mvltda_cmr.vehicles
DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `license_plate` varchar(50) NOT NULL COMMENT 'Placa',
  `brand` varchar(150) DEFAULT NULL COMMENT 'Marca',
  `model` varchar(150) DEFAULT NULL COMMENT 'Modelo',
  `type_vehicle` int(11) NOT NULL COMMENT 'Tipo de vehiculo',
  `passangers_capacity` int(11) DEFAULT NULL COMMENT 'Capacidad de pasajeros',
  `type_fuel` int(11) NOT NULL COMMENT 'Combustible',
  `cilindraje` varchar(50) DEFAULT NULL COMMENT 'Cilindraje',
  `holder` int(11) NOT NULL COMMENT 'Titular',
  `propietary` int(11) NOT NULL COMMENT 'Propietario',
  `card_propiety_number` varchar(250) DEFAULT NULL COMMENT 'Numero Tarjeta Propiedad',
  `chassis_number` varchar(100) DEFAULT NULL COMMENT 'Numero chasis',
  `soat_number` varchar(100) DEFAULT NULL COMMENT 'Numero SOAT',
  `third_party_number` varchar(100) DEFAULT NULL COMMENT 'Numero Poliza Terceros',
  `soat_date_expiration` date DEFAULT NULL COMMENT 'Fecha Vencimiento SOAT',
  `third_party_date_expiration` date DEFAULT NULL COMMENT 'Fecha Vencimiento Poliza Terceros',
  `capacity_with_enhancement` varchar(100) DEFAULT NULL COMMENT 'Capacidad con Realce',
  `capacity_without_enhancement` varchar(100) DEFAULT NULL COMMENT 'Capacidad sin Realce',
  `base_weight` varchar(100) DEFAULT NULL COMMENT 'Peso Base Vehiculo',
  `rent_cost` varchar(100) DEFAULT NULL COMMENT 'Costo de renta',
  `status` int(11) NOT NULL COMMENT 'Estado',
  PRIMARY KEY (`id`),
  UNIQUE KEY `license_plate` (`license_plate`),
  KEY `id` (`id`),
  KEY `FK_vehicles_categorys_vehicles` (`type_vehicle`),
  KEY `FK_vehicles_fuel_types` (`type_fuel`),
  KEY `FK_vehicles_status_vehicles` (`status`),
  KEY `FK_vehicles_contacts` (`holder`),
  KEY `FK_vehicles_contacts_2` (`propietary`),
  CONSTRAINT `FK_vehicles_categorys_vehicles` FOREIGN KEY (`type_vehicle`) REFERENCES `types_vehicles` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_vehicles_contacts` FOREIGN KEY (`holder`) REFERENCES `contacts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_vehicles_contacts_2` FOREIGN KEY (`propietary`) REFERENCES `contacts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_vehicles_status_vehicles` FOREIGN KEY (`status`) REFERENCES `status_vehicles` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_vehicles_types_fuels` FOREIGN KEY (`type_fuel`) REFERENCES `types_fuels` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- La exportación de datos fue deseleccionada.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

