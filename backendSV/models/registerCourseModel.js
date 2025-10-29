const db = require('../config/db')

const RegisterCourse = {
    getAllCourse: (callback) => {
        db.query('SELECT * FROM mon_hoc', callback);
    },

    registerCourse: (register, callback) => {
        const { ngay_dang_ky, id_sinh_vien, id_lop_hoc_phan } = register;
    
        db.query(
            `INSERT INTO sv_hoc_hp(id_sinh_vien, id_lop_hoc_phan, ngay_dang_ky, thu, diem_giua_ky, diem_cuoi_ky, diem_tong_ket) 
             VALUES (?,?,?,NULL,NULL,NULL,NULL)`,
             [id_sinh_vien, id_lop_hoc_phan, ngay_dang_ky],
             callback
        );
    },

    
    getAllRegisterById: (id, id_hoc_ky, callback) => {
        let sql = `
            SELECT sv.*, 
                lhp.id_mon_hoc, 
                mh.msm, 
                mh.ten_mon, 
                mh.so_tc_lt, 
                mh.loai_mon, 
                mh.so_tc_th,
                hk.ten_hoc_ky, 
                hk.ngay_bat_dau, 
                hk.ngay_ket_thuc
            FROM sv_hoc_hp sv
            JOIN lop_hoc_phan lhp ON sv.id_lop_hoc_phan = lhp.id_lop_hoc_phan
            JOIN mon_hoc mh ON lhp.id_mon_hoc = mh.id_mon_hoc
            JOIN hoc_ky hk ON lhp.id_hoc_ky = hk.id_hoc_ky
            WHERE sv.id_sinh_vien = ?
        `;

        const params = [id];

        // Nếu có id_hoc_ky thì thêm điều kiện lọc theo học kỳ
        if (id_hoc_ky) {
            sql += " AND hk.id_hoc_ky = ?";
            params.push(id_hoc_ky);
        }

        db.query(sql, params, callback);
    },

    
    
    deleteRegisterById: (idSinhVien, idLopHP, callback) => {
        const checkQuery = `
            SELECT diem_giua_ky, diem_cuoi_ky, diem_tong_ket FROM sv_hoc_hp 
            WHERE id_sinh_vien = ? AND id_lop_hoc_phan = ?
        `;
    
        db.query(checkQuery, [idSinhVien, idLopHP], (err, results) => {
            if (err) return callback(err, null);
    
            if (results.length === 0) {
                return callback(null, { error: "Không tìm thấy đăng ký để xóa" });
            }
    
            const { diem_giua_ky, diem_cuoi_ky, diem_tong_ket } = results[0];
    
            if (diem_giua_ky !== null || diem_cuoi_ky !== null || diem_tong_ket !== null) {
                return callback(null, { error: "Không thể xóa vì đã có điểm" });
            }
    
            // Nếu chưa có điểm thì thực hiện xóa
            db.query(
                "DELETE FROM sv_hoc_hp WHERE id_sinh_vien = ? AND id_lop_hoc_phan = ?", 
                [idSinhVien, idLopHP], 
                callback
            );
        });
    },
    

    getAllLopHocPhanBySemester: (id_hoc_ky, callback) => {
        const sql = `
          SELECT lhp.*, mh.msm, mh.ten_mon, mh.so_tc_lt, mh.so_tc_th, mh.loai_mon, hk.ten_hoc_ky
          FROM lop_hoc_phan lhp
          JOIN mon_hoc mh ON lhp.id_mon_hoc = mh.id_mon_hoc
          JOIN hoc_ky hk ON lhp.id_hoc_ky = hk.id_hoc_ky
          WHERE hk.id_hoc_ky = ?
        `;
        db.query(sql, [id_hoc_ky], callback);
      },
    
    getSemesters: (callback) => {
        const sql = `
          SELECT id_hoc_ky, ten_hoc_ky, ngay_bat_dau, ngay_ket_thuc
          FROM hoc_ky
          ORDER BY ngay_bat_dau ASC
        `;
        db.query(sql, callback);
      },
    
}

module.exports = RegisterCourse;