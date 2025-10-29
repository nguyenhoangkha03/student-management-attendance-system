const db = require('../config/db')
const crypto = require('crypto');

const Sinhvien = {
    getAll: (callback) => {
        db.query('SELECT * FROM sinh_vien', callback)
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM sinh_vien WHERE id_sinh_vien = ?', [id], callback)
    },    
    

    add: (sinhVien, callback) => {
        const { mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop } = sinhVien
        db.query(`INSERT INTO sinh_vien(mssv, ho_ten, 
                    ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop) 
                    VALUES (?,?,?,?,?,?,?,?)
                `
            , [mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop], callback)
    },

    update: (sinhVien, callback) => {
        const { mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop, id_sinh_vien } = sinhVien;
        db.query(
            `UPDATE sinh_vien 
             SET mssv = ?, ho_ten = ?, ngay_sinh = ?, gioi_tinh = ?, dia_chi = ?, email = ?, sdt = ?, id_lop = ? 
             WHERE id_sinh_vien = ?`,
            [mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop, id_sinh_vien],
            callback
        );
    },

    changePassword: async (sinhVien, callback) => {
        const { mat_khau_cu, mat_khau_moi, id_sinh_vien } = sinhVien;
    
        if (!mat_khau_cu || !mat_khau_moi || !id_sinh_vien) {
            return callback(new Error("Dữ liệu không hợp lệ"), null);
        }
    
        try {
            // Lấy mật khẩu hiện tại từ cơ sở dữ liệu
            const query = 'SELECT password FROM tai_khoan WHERE id_sinh_vien = ?';
            db.query(query, [id_sinh_vien], async (err, result) => {
                if (err) {
                    console.error("Lỗi truy vấn SQL:", err);
                    return callback(err, null);
                }
    
                if (result.length === 0) {
                    return callback(new Error("Không tìm thấy tài khoản"), null);
                }
    
                const currentPassword = result[0].password;
    
                // Mã hóa mật khẩu cũ bằng MD5 trước khi so sánh
                const matKhauCuMD5 = crypto.createHash('md5').update(mat_khau_cu).digest('hex');
    
                if (matKhauCuMD5 !== currentPassword) {
                    return callback(new Error("Mật khẩu cũ không đúng"), null);
                }
    
                // Mã hóa mật khẩu mới cũng bằng MD5
                const matKhauMoiMD5 = crypto.createHash('md5').update(mat_khau_moi).digest('hex');
    
                // Cập nhật mật khẩu mới
                const updateQuery = 'UPDATE tai_khoan SET password = ? WHERE id_sinh_vien = ?';
                db.query(updateQuery, [matKhauMoiMD5, id_sinh_vien], (err, result) => {
                    if (err) {
                        console.error("Lỗi truy vấn SQL:", err);
                        return callback(err, null);
                    }
    
                    console.log("Kết quả truy vấn:", result);
                    callback(null, result);
                });
            });
        } catch (error) {
            console.error("Lỗi xử lý:", error);
            callback(error, null);
        }
    }
    
    
}

module.exports = Sinhvien;