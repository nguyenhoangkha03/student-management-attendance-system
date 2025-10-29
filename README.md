# Hệ Thống Quản Lý Sinh Viên và Điểm Danh

Hệ thống quản lý sinh viên tích hợp điểm danh bằng nhận diện khuôn mặt và QR code.

## 📋 Tổng Quan

Dự án gồm 3 ứng dụng frontend, 2 backend và 1 microservice phục vụ cho các đối tượng khác nhau:

-   **Manager**: Quản trị toàn bộ hệ thống
-   **Giảng viên**: Điểm danh và quản lý lớp học
-   **Sinh viên**: Xem lịch học, đăng ký môn, tra cứu điểm

## 🚀 Công Nghệ Sử Dụng

### Backend

-   Node.js + Express.js
-   MySQL
-   JWT Authentication
-   Face-API.js (Nhận diện khuôn mặt)
-   QR Code Generator
-   Bcrypt (Mã hóa mật khẩu)

### Frontend

-   React 19
-   React Router v6
-   Axios
-   TailwindCSS
-   Chart.js

## 📁 Cấu Trúc Dự Án

```
quan-ly-sinh-vien/
├── backend/          # Backend chính
├── backendSV/        # Backend cho sinh viên
├── frontend/         # Admin/Manager
├── frontendgv/       # Giảng viên
├── frontendsv/       # Sinh viên
└── microservice/     # Điểm danh QR code
```

## 🔧 Cài Đặt

### 1. Cài đặt Backend chính

```bash
cd backend
npm install
npm start
```

Backend chạy tại: `http://localhost:3333`

### 2. Cài đặt Backend SV

```bash
cd backendSV
npm install
npm start
```

### 3. Cài đặt Frontend Admin (Manager)

```bash
cd frontend
npm install
npm start
```

Chạy tại: `http://localhost:3000`

### 4. Cài đặt Frontend Giảng Viên

```bash
cd frontendgv
npm install
npm start
```

Chạy tại: `http://localhost:3001`

### 5. Cài đặt Frontend Sinh Viên

```bash
cd frontendsv
npm install
npm start
```

Chạy tại: `http://localhost:3002`

### 6. Cài đặt Microservice

```bash
cd microservice
npm install
npm start
```

## 🗄️ Cơ Sở Dữ Liệu

-   **Database**: MySQL
-   **Tên DB**: `quan_ly_diem`
-   Import file SQL có sẵn trong thư mục backend để tạo database

## 👥 Phân Quyền Người Dùng

### Manager

-   Quản lý khoa, ngành, lớp
-   Quản lý sinh viên, giảng viên
-   Quản lý môn học, lịch học
-   Xem báo cáo thống kê

### Giảng Viên

-   Điểm danh sinh viên (thủ công)
-   Điểm danh bằng nhận diện khuôn mặt
-   Tạo QR code điểm danh
-   Xem danh sách lớp học

### Sinh Viên

-   Xem lịch học
-   Đăng ký môn học
-   Tra cứu điểm
-   Xem thông tin cá nhân
-   Điểm danh qua QR code

## ✨ Tính Năng Chính

### 1. Quản Lý Sinh Viên

-   Thêm, sửa, xóa thông tin sinh viên
-   Phân lớp, phân khoa
-   Upload ảnh đại diện

### 2. Quản Lý Lớp Học

-   Tạo lớp học phần
-   Phân công giảng viên
-   Lên lịch học theo tuần

### 3. Điểm Danh

-   **Thủ công**: Click chọn sinh viên
-   **Nhận diện khuôn mặt**: Sử dụng Face-API.js
-   **QR Code**: Sinh viên quét mã để điểm danh
-   Lưu trữ lịch sử điểm danh

### 4. Đăng Ký Môn Học

-   Sinh viên đăng ký môn theo học kỳ
-   Kiểm tra điều kiện tiên quyết
-   Giới hạn số lượng sinh viên

### 5. Tra Cứu Điểm

-   Xem điểm theo môn học
-   Xem điểm theo học kỳ
-   Tính GPA tự động

## 🔐 Bảo Mật

-   Xác thực JWT Token
-   Mã hóa mật khẩu bằng Bcrypt
-   CAPTCHA khi đăng nhập
-   Phân quyền theo vai trò (Role-based)
-   Token tự động hết hạn

## 📝 API Endpoints

### Authentication

-   `POST /api/login` - Đăng nhập
-   `GET /api/captcha` - Lấy captcha

### Sinh Viên

-   `GET /api/sinhvien` - Danh sách sinh viên
-   `POST /api/sinhvien` - Thêm sinh viên
-   `PUT /api/sinhvien/:id` - Cập nhật sinh viên
-   `DELETE /api/sinhvien/:id` - Xóa sinh viên

### Điểm Danh

-   `GET /api/diemdanh` - Lấy danh sách điểm danh
-   `POST /api/diemdanh` - Điểm danh
-   `GET /api/diemdanh/:id` - Chi tiết điểm danh

### Môn Học

-   `GET /api/monhoc` - Danh sách môn học
-   `POST /api/monhoc` - Thêm môn học

## 🎯 Luồng Hoạt Động

1. **Manager** tạo khoa, ngành, lớp, thêm sinh viên & giảng viên
2. **Manager** tạo môn học, lịch học, phân công giảng viên
3. **Sinh viên** đăng ký môn học trong thời gian cho phép
4. **Giảng viên** điểm danh sinh viên theo lịch học:
    - Chọn lớp học và buổi học
    - Điểm danh thủ công hoặc dùng camera nhận diện
    - Hoặc tạo QR code cho sinh viên tự điểm danh
5. **Sinh viên** xem lịch sử điểm danh và điểm số

## 📱 Microservice QR Code

-   Nhận `classId` và `scheduleId` từ URL params
-   Hiển thị danh sách sinh viên trong lớp
-   Sinh viên chọn tên và nhấn "Điểm Danh"
-   Ghi nhận thời gian điểm danh vào database

## 🤝 Đóng Góp

Dự án được phát triển cho mục đích học tập và quản lý sinh viên.

## 📄 License

MIT License

---

**Phát triển bởi:** Nhóm báo cáo dự án cuối học phần Phát Triển Phần Mềm
**Năm:** 2024
