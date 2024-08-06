-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 20, 2023 at 08:13 AM
-- Server version: 8.0.32
-- PHP Version: 7.4.3-4ubuntu2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testpetdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int NOT NULL,
  `pet_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `appointment_date` datetime NOT NULL,
  `appointment_notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_management`
--

CREATE TABLE `doctor_management` (
  `id` int NOT NULL,
  `profile_id` int NOT NULL,
  `hospital_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `id` int NOT NULL,
  `profile_id` int NOT NULL,
  `userlimit` int NOT NULL DEFAULT '1',
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hospital_category`
--

CREATE TABLE `hospital_category` (
  `id` int NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet_management`
--

CREATE TABLE `pet_management` (
  `id` int NOT NULL,
  `pet_name` varchar(50) NOT NULL,
  `pet_type_id` int NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `age` int DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `owner_id` int NOT NULL,
  `last_vet_visit` date DEFAULT NULL,
  `next_vet_visit` date DEFAULT NULL,
  `food_brand` varchar(50) DEFAULT NULL,
  `food_type` enum('dry','wet','raw') NOT NULL,
  `food_amount` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet_owner_management`
--

CREATE TABLE `pet_owner_management` (
  `id` int NOT NULL,
  `profile_id` int NOT NULL,
  `hospital_id` int NOT NULL,
  `doctor_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet_type`
--

CREATE TABLE `pet_type` (
  `id` int NOT NULL,
  `pet_type` varchar(50) NOT NULL,
  `breed` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pet_type_mapping`
--

CREATE TABLE `pet_type_mapping` (
  `id` int NOT NULL,
  `doctor_id` int DEFAULT NULL,
  `pet_type_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int NOT NULL,
  `user_name` int DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `alt_phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `street_address` varchar(100) DEFAULT NULL,
  `city_name` varchar(50) DEFAULT NULL,
  `state_name` varchar(50) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pet_id` (`pet_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `id` (`id`,`pet_id`,`doctor_id`);

--
-- Indexes for table `doctor_management`
--
ALTER TABLE `doctor_management`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`profile_id`,`hospital_id`),
  ADD KEY `profile_id` (`profile_id`),
  ADD KEY `hospital_id` (`hospital_id`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `profile_id` (`profile_id`,`category_id`),
  ADD KEY `id_2` (`id`,`profile_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `hospital_category`
--
ALTER TABLE `hospital_category`
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Indexes for table `pet_management`
--
ALTER TABLE `pet_management`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`pet_type_id`,`owner_id`),
  ADD KEY `pet_type_id` (`pet_type_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `pet_owner_management`
--
ALTER TABLE `pet_owner_management`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`profile_id`,`hospital_id`,`doctor_id`),
  ADD KEY `profile_id` (`profile_id`),
  ADD KEY `hospital_id` (`hospital_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `pet_type`
--
ALTER TABLE `pet_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `pet_type_mapping`
--
ALTER TABLE `pet_type_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`doctor_id`,`pet_type_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`pet_id`) REFERENCES `pet_management` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor_management` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `doctor_management`
--
ALTER TABLE `doctor_management`
  ADD CONSTRAINT `doctor_management_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `doctor_management_ibfk_2` FOREIGN KEY (`hospital_id`) REFERENCES `hospital_category` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD CONSTRAINT `hospitals_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hospitals_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `hospital_category` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `pet_management`
--
ALTER TABLE `pet_management`
  ADD CONSTRAINT `pet_management_ibfk_1` FOREIGN KEY (`pet_type_id`) REFERENCES `pet_type` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pet_management_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `pet_owner_management` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `pet_owner_management`
--
ALTER TABLE `pet_owner_management`
  ADD CONSTRAINT `pet_owner_management_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pet_owner_management_ibfk_2` FOREIGN KEY (`id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pet_owner_management_ibfk_3` FOREIGN KEY (`hospital_id`) REFERENCES `hospital_category` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pet_owner_management_ibfk_4` FOREIGN KEY (`doctor_id`) REFERENCES `doctor_management` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `pet_type_mapping`
--
ALTER TABLE `pet_type_mapping`
  ADD CONSTRAINT `pet_type_mapping_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor_management` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
