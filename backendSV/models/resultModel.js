const db = require('../config/db')

const Result = {
    // getAllById: (sinhVienId, callback) => {
    //     db.query('SELECT * FROM dang_ky WHERE id_sinh_vien = ?', [sinhVienId], callback);
    // },
    getAllById: (sinhVienId, callback) => {
        const query = `
            SELECT 
                mon_hoc.ten_mon, 
                mon_hoc.so_tc_lt,
                mon_hoc.so_tc_th,
                sv_hoc_hp.diem_giua_ky, 
                sv_hoc_hp.diem_cuoi_ky, 
                sv_hoc_hp.diem_tong_ket,
                hoc_ky.ten_hoc_ky
            FROM sv_hoc_hp
            INNER JOIN lop_hoc_phan ON sv_hoc_hp.id_lop_hoc_phan = lop_hoc_phan.id_lop_hoc_phan
            INNER JOIN mon_hoc ON lop_hoc_phan.id_mon_hoc = mon_hoc.id_mon_hoc
            INNER JOIN hoc_ky ON lop_hoc_phan.id_hoc_ky = hoc_ky.id_hoc_ky
            WHERE sv_hoc_hp.id_sinh_vien = ?;
        `;
        db.query(query, [sinhVienId], callback);
    },
    
    
    getAll: (callback) => {
        db.query('SELECT * FROM dang_ky', callback);
    },

    getAllCourse: (callback) => {
        db.query('SELECT * FROM mon_hoc', callback);
    }
}

module.exports = Result;