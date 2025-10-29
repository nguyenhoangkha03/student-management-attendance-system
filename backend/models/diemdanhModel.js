// const db = require("../config/db"); 

// const DiemDanh = {
//     addAttendance: (id_sinh_vien, id_lich_hoc, thoi_gian, callback) => {
//         console.log("📌 Dữ liệu nhận được:", { id_sinh_vien, id_lich_hoc, thoi_gian });

//         if (!id_sinh_vien || !id_lich_hoc) {
//             console.error("❌ Lỗi: Thiếu ID sinh viên hoặc lịch học.");
//             return callback(new Error("Thiếu dữ liệu"), null);
//         }

//         const checkQuery = `SELECT * FROM diem_danh WHERE id_sinh_vien = ? AND id_lich_hoc = ?`;
        
//         db.query(checkQuery, [id_sinh_vien, id_lich_hoc], (err, results) => {
//             if (err) {
//                 console.error("❌ Lỗi khi kiểm tra điểm danh:", err);
//                 return callback(err, null);
//             }

//             if (results.length > 0) {
//                 console.log(`⚠️ Sinh viên ${id_sinh_vien} đã được điểm danh trước đó.`);
//                 return callback(null, { message: "Sinh viên đã điểm danh trước đó." });
//             }

//             // Thực hiện INSERT
//             const insertQuery = `INSERT INTO diem_danh (id_sinh_vien, id_lich_hoc, thoi_gian) VALUES (?, ?, ?)`;
            
//             db.query(insertQuery, [id_sinh_vien, id_lich_hoc, thoi_gian], (err, result) => {
//                 if (err) {
//                     console.error("❌ Lỗi khi chèn dữ liệu:", err);
//                     return callback(err, null);
//                 }
//                 console.log(`✅ Điểm danh thành công! ID: ${result.insertId}`);
//                 callback(null, result);
//             });
//         });
//     }
// };

// module.exports = DiemDanh;

const db = require("../config/db"); 

const DiemDanh = {
    addAttendance: (id_sinh_vien, id_lich_hoc, thoi_gian, callback) => {
        console.log("📌 Dữ liệu nhận được:", { id_sinh_vien, id_lich_hoc, thoi_gian });

        if (!id_sinh_vien || !id_lich_hoc) {
            console.error("❌ Lỗi: Thiếu ID sinh viên hoặc lịch học.");
            return callback(new Error("Thiếu dữ liệu"), null);
        }

        // Bỏ qua kiểm tra trùng lặp, cho phép điểm danh nhiều lần
        const insertQuery = `INSERT INTO diem_danh (id_sinh_vien, id_lich_hoc, thoi_gian) VALUES (?, ?, ?)`;
        
        db.query(insertQuery, [id_sinh_vien, id_lich_hoc, thoi_gian], (err, result) => {
            if (err) {
                console.error("❌ Lỗi khi chèn dữ liệu:", err);
                return callback(err, null);
            }
            console.log(`✅ Điểm danh thành công! ID: ${result.insertId}`);
            callback(null, result);
        });
    }
};

module.exports = DiemDanh;
