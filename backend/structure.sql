-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2025 at 10:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quan_ly_diem`
--

-- --------------------------------------------------------

--
-- Table structure for table `diem_danh`
--

CREATE TABLE `diem_danh` (
  `id_diem_danh` int(11) NOT NULL,
  `thoi_gian` datetime DEFAULT NULL,
  `id_lich_hoc` int(11) DEFAULT NULL,
  `id_sinh_vien` int(11) DEFAULT NULL,
  `status` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `giang_vien`
--

CREATE TABLE `giang_vien` (
  `id_giang_vien` int(11) NOT NULL,
  `msgv` varchar(20) DEFAULT NULL,
  `ho_ten` varchar(100) DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `gioi_tinh` tinyint(4) DEFAULT NULL,
  `dia_chi` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `sdt` varchar(20) DEFAULT NULL,
  `id_khoa` int(11) DEFAULT NULL,
  `image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hinh_anh`
--

CREATE TABLE `hinh_anh` (
  `id_hinh_anh` int(11) NOT NULL,
  `hinh_anh` longblob DEFAULT NULL,
  `id_sinh_vien` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hoc_ky`
--

CREATE TABLE `hoc_ky` (
  `id_hoc_ky` int(11) NOT NULL,
  `ten_hoc_ky` varchar(50) DEFAULT NULL,
  `ngay_bat_dau` date DEFAULT NULL,
  `ngay_ket_thuc` date DEFAULT NULL,
  `nien_khoa` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khoa`
--

CREATE TABLE `khoa` (
  `id_khoa` int(11) NOT NULL,
  `ten_khoa` varchar(100) DEFAULT NULL,
  `mo_ta` text DEFAULT NULL,
  `ngay_thanh_lap` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lich_hoc`
--

CREATE TABLE `lich_hoc` (
  `id_lich_hoc` int(11) NOT NULL,
  `id_lop_hoc_phan` int(11) DEFAULT NULL,
  `so_tiet` int(11) DEFAULT NULL,
  `tu_tiet` int(11) DEFAULT NULL,
  `den_tiet` int(11) DEFAULT NULL,
  `session` int(11) DEFAULT NULL,
  `ngay` date DEFAULT NULL,
  `id_lop` int(11) DEFAULT NULL,
  `loai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lich_thi`
--

CREATE TABLE `lich_thi` (
  `id_lich_thi` int(11) NOT NULL,
  `thu` int(11) DEFAULT NULL,
  `ngay` date DEFAULT NULL,
  `id_lop_hoc_phan` int(11) DEFAULT NULL,
  `so_tiet` int(11) DEFAULT NULL,
  `tu_tiet` int(11) DEFAULT NULL,
  `den_tiet` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lop`
--

CREATE TABLE `lop` (
  `id_lop` int(11) NOT NULL,
  `ten_lop` varchar(100) DEFAULT NULL,
  `khoa` int(11) DEFAULT NULL,
  `so_luong_sv` int(11) DEFAULT NULL,
  `nam` varchar(20) DEFAULT NULL,
  `id_khoa` int(11) DEFAULT NULL,
  `id_nganh` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lop_hoc_phan`
--

CREATE TABLE `lop_hoc_phan` (
  `id_lop_hoc_phan` int(11) NOT NULL,
  `id_mon_hoc` int(11) DEFAULT NULL,
  `id_giang_vien` int(11) DEFAULT NULL,
  `id_phong` int(11) DEFAULT NULL,
  `id_hoc_ky` int(11) DEFAULT NULL,
  `id_lop` int(11) DEFAULT NULL,
  `tong_so_tiet` int(11) DEFAULT NULL,
  `trang_thai` tinyint(4) DEFAULT NULL,
  `hoc_phi` int(11) DEFAULT NULL,
  `ms_lop_hoc_phan` varchar(20) DEFAULT NULL,
  `tong_so_tiet_th` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `id_manager` int(11) NOT NULL,
  `msm` varchar(20) DEFAULT NULL,
  `ho_ten` varchar(100) DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `gioi_tinh` tinyint(4) DEFAULT NULL,
  `dia_chi` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `sdt` varchar(20) DEFAULT NULL,
  `image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mon_hoc`
--

CREATE TABLE `mon_hoc` (
  `id_mon_hoc` int(11) NOT NULL,
  `ma_mon_hoc` varchar(50) DEFAULT NULL,
  `ten_mon` varchar(100) DEFAULT NULL,
  `so_tc_lt` int(11) DEFAULT NULL,
  `so_tc_th` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nganh`
--

CREATE TABLE `nganh` (
  `id_nganh` int(11) NOT NULL,
  `msn` varchar(50) DEFAULT NULL,
  `ten_nganh` varchar(100) DEFAULT NULL,
  `id_khoa` int(11) DEFAULT NULL,
  `tin_chi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phong`
--

CREATE TABLE `phong` (
  `id_phong` int(11) NOT NULL,
  `ten_phong` varchar(50) DEFAULT NULL,
  `so_cho` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sinh_vien`
--

CREATE TABLE `sinh_vien` (
  `id_sinh_vien` int(11) NOT NULL,
  `mssv` varchar(20) DEFAULT NULL,
  `ho_ten` varchar(100) DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `gioi_tinh` tinyint(4) DEFAULT NULL,
  `dia_chi` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `sdt` varchar(20) DEFAULT NULL,
  `id_lop` int(11) DEFAULT NULL,
  `image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sv_hoc_hp`
--

CREATE TABLE `sv_hoc_hp` (
  `id_sv_hoc_hp` int(11) NOT NULL,
  `id_sinh_vien` int(11) DEFAULT NULL,
  `id_lop_hoc_phan` int(11) DEFAULT NULL,
  `ngay_dang_ky` date DEFAULT NULL,
  `thu` tinyint(4) DEFAULT NULL,
  `diem_giua_ky` decimal(10,0) DEFAULT NULL,
  `diem_cuoi_ky` decimal(10,0) DEFAULT NULL,
  `diem_tong_ket` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `id_tai_khoan` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `vai_tro` varchar(50) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `trang_thai` tinyint(4) DEFAULT NULL,
  `id_giang_vien` int(11) DEFAULT NULL,
  `id_sinh_vien` int(11) DEFAULT NULL,
  `id_manager` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `diem_danh`
--
ALTER TABLE `diem_danh`
  ADD PRIMARY KEY (`id_diem_danh`),
  ADD KEY `id_lich_hoc` (`id_lich_hoc`),
  ADD KEY `id_sinh_vien` (`id_sinh_vien`);

--
-- Indexes for table `giang_vien`
--
ALTER TABLE `giang_vien`
  ADD PRIMARY KEY (`id_giang_vien`),
  ADD KEY `id_khoa` (`id_khoa`);

--
-- Indexes for table `hinh_anh`
--
ALTER TABLE `hinh_anh`
  ADD PRIMARY KEY (`id_hinh_anh`),
  ADD KEY `id_sinh_vien` (`id_sinh_vien`);

--
-- Indexes for table `hoc_ky`
--
ALTER TABLE `hoc_ky`
  ADD PRIMARY KEY (`id_hoc_ky`);

--
-- Indexes for table `khoa`
--
ALTER TABLE `khoa`
  ADD PRIMARY KEY (`id_khoa`);

--
-- Indexes for table `lich_hoc`
--
ALTER TABLE `lich_hoc`
  ADD PRIMARY KEY (`id_lich_hoc`),
  ADD KEY `id_lop_hoc_phan` (`id_lop_hoc_phan`),
  ADD KEY `fk_lop` (`id_lop`);

--
-- Indexes for table `lich_thi`
--
ALTER TABLE `lich_thi`
  ADD PRIMARY KEY (`id_lich_thi`),
  ADD KEY `id_lop_hoc_phan` (`id_lop_hoc_phan`);

--
-- Indexes for table `lop`
--
ALTER TABLE `lop`
  ADD PRIMARY KEY (`id_lop`),
  ADD KEY `id_khoa` (`id_khoa`),
  ADD KEY `fk_nganh` (`id_nganh`);

--
-- Indexes for table `lop_hoc_phan`
--
ALTER TABLE `lop_hoc_phan`
  ADD PRIMARY KEY (`id_lop_hoc_phan`),
  ADD KEY `id_mon_hoc` (`id_mon_hoc`),
  ADD KEY `id_giang_vien` (`id_giang_vien`),
  ADD KEY `id_phong` (`id_phong`),
  ADD KEY `id_hoc_ky` (`id_hoc_ky`),
  ADD KEY `id_lop` (`id_lop`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id_manager`);

--
-- Indexes for table `mon_hoc`
--
ALTER TABLE `mon_hoc`
  ADD PRIMARY KEY (`id_mon_hoc`);

--
-- Indexes for table `nganh`
--
ALTER TABLE `nganh`
  ADD PRIMARY KEY (`id_nganh`),
  ADD KEY `id_khoa` (`id_khoa`);

--
-- Indexes for table `phong`
--
ALTER TABLE `phong`
  ADD PRIMARY KEY (`id_phong`);

--
-- Indexes for table `sinh_vien`
--
ALTER TABLE `sinh_vien`
  ADD PRIMARY KEY (`id_sinh_vien`),
  ADD KEY `id_lop` (`id_lop`);

--
-- Indexes for table `sv_hoc_hp`
--
ALTER TABLE `sv_hoc_hp`
  ADD PRIMARY KEY (`id_sv_hoc_hp`),
  ADD KEY `id_sinh_vien` (`id_sinh_vien`),
  ADD KEY `id_lop_hoc_phan` (`id_lop_hoc_phan`);

--
-- Indexes for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`id_tai_khoan`),
  ADD KEY `id_giang_vien` (`id_giang_vien`),
  ADD KEY `fk_id_sinh_vien` (`id_sinh_vien`),
  ADD KEY `fk_manager` (`id_manager`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diem_danh`
--
ALTER TABLE `diem_danh`
  MODIFY `id_diem_danh` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `giang_vien`
--
ALTER TABLE `giang_vien`
  MODIFY `id_giang_vien` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hinh_anh`
--
ALTER TABLE `hinh_anh`
  MODIFY `id_hinh_anh` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hoc_ky`
--
ALTER TABLE `hoc_ky`
  MODIFY `id_hoc_ky` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khoa`
--
ALTER TABLE `khoa`
  MODIFY `id_khoa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lich_hoc`
--
ALTER TABLE `lich_hoc`
  MODIFY `id_lich_hoc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lich_thi`
--
ALTER TABLE `lich_thi`
  MODIFY `id_lich_thi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lop`
--
ALTER TABLE `lop`
  MODIFY `id_lop` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lop_hoc_phan`
--
ALTER TABLE `lop_hoc_phan`
  MODIFY `id_lop_hoc_phan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id_manager` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mon_hoc`
--
ALTER TABLE `mon_hoc`
  MODIFY `id_mon_hoc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nganh`
--
ALTER TABLE `nganh`
  MODIFY `id_nganh` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phong`
--
ALTER TABLE `phong`
  MODIFY `id_phong` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sinh_vien`
--
ALTER TABLE `sinh_vien`
  MODIFY `id_sinh_vien` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sv_hoc_hp`
--
ALTER TABLE `sv_hoc_hp`
  MODIFY `id_sv_hoc_hp` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `id_tai_khoan` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `diem_danh`
--
ALTER TABLE `diem_danh`
  ADD CONSTRAINT `diem_danh_ibfk_1` FOREIGN KEY (`id_lich_hoc`) REFERENCES `lich_hoc` (`id_lich_hoc`),
  ADD CONSTRAINT `diem_danh_ibfk_2` FOREIGN KEY (`id_sinh_vien`) REFERENCES `sinh_vien` (`id_sinh_vien`);

--
-- Constraints for table `giang_vien`
--
ALTER TABLE `giang_vien`
  ADD CONSTRAINT `giang_vien_ibfk_1` FOREIGN KEY (`id_khoa`) REFERENCES `khoa` (`id_khoa`);

--
-- Constraints for table `hinh_anh`
--
ALTER TABLE `hinh_anh`
  ADD CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`id_sinh_vien`) REFERENCES `sinh_vien` (`id_sinh_vien`);

--
-- Constraints for table `lich_hoc`
--
ALTER TABLE `lich_hoc`
  ADD CONSTRAINT `fk_lop` FOREIGN KEY (`id_lop`) REFERENCES `lop` (`id_lop`),
  ADD CONSTRAINT `lich_hoc_ibfk_1` FOREIGN KEY (`id_lop_hoc_phan`) REFERENCES `lop_hoc_phan` (`id_lop_hoc_phan`);

--
-- Constraints for table `lich_thi`
--
ALTER TABLE `lich_thi`
  ADD CONSTRAINT `lich_thi_ibfk_1` FOREIGN KEY (`id_lop_hoc_phan`) REFERENCES `lop_hoc_phan` (`id_lop_hoc_phan`);

--
-- Constraints for table `lop`
--
ALTER TABLE `lop`
  ADD CONSTRAINT `fk_nganh` FOREIGN KEY (`id_nganh`) REFERENCES `nganh` (`id_nganh`),
  ADD CONSTRAINT `lop_ibfk_1` FOREIGN KEY (`id_khoa`) REFERENCES `khoa` (`id_khoa`);

--
-- Constraints for table `lop_hoc_phan`
--
ALTER TABLE `lop_hoc_phan`
  ADD CONSTRAINT `lop_hoc_phan_ibfk_1` FOREIGN KEY (`id_mon_hoc`) REFERENCES `mon_hoc` (`id_mon_hoc`),
  ADD CONSTRAINT `lop_hoc_phan_ibfk_2` FOREIGN KEY (`id_giang_vien`) REFERENCES `giang_vien` (`id_giang_vien`),
  ADD CONSTRAINT `lop_hoc_phan_ibfk_3` FOREIGN KEY (`id_phong`) REFERENCES `phong` (`id_phong`),
  ADD CONSTRAINT `lop_hoc_phan_ibfk_4` FOREIGN KEY (`id_hoc_ky`) REFERENCES `hoc_ky` (`id_hoc_ky`),
  ADD CONSTRAINT `lop_hoc_phan_ibfk_5` FOREIGN KEY (`id_lop`) REFERENCES `lop` (`id_lop`);

--
-- Constraints for table `nganh`
--
ALTER TABLE `nganh`
  ADD CONSTRAINT `nganh_ibfk_1` FOREIGN KEY (`id_khoa`) REFERENCES `khoa` (`id_khoa`);

--
-- Constraints for table `sinh_vien`
--
ALTER TABLE `sinh_vien`
  ADD CONSTRAINT `sinh_vien_ibfk_1` FOREIGN KEY (`id_lop`) REFERENCES `lop` (`id_lop`);

--
-- Constraints for table `sv_hoc_hp`
--
ALTER TABLE `sv_hoc_hp`
  ADD CONSTRAINT `sv_hoc_hp_ibfk_1` FOREIGN KEY (`id_sinh_vien`) REFERENCES `sinh_vien` (`id_sinh_vien`),
  ADD CONSTRAINT `sv_hoc_hp_ibfk_2` FOREIGN KEY (`id_lop_hoc_phan`) REFERENCES `lop_hoc_phan` (`id_lop_hoc_phan`);

--
-- Constraints for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD CONSTRAINT `fk_id_sinh_vien` FOREIGN KEY (`id_sinh_vien`) REFERENCES `sinh_vien` (`id_sinh_vien`),
  ADD CONSTRAINT `fk_manager` FOREIGN KEY (`id_manager`) REFERENCES `manager` (`id_manager`),
  ADD CONSTRAINT `tai_khoan_ibfk_1` FOREIGN KEY (`id_giang_vien`) REFERENCES `giang_vien` (`id_giang_vien`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
