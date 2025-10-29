const db = require('../config/db')

const Classs = {
    getAll: (callback) => {
        db.query('SELECT * FROM lop', callback)
    },
    

    add: (classs, callback) => {
        const { ten_lop, khoa, so_luong_sv, nam, id_khoa, id_nganh } = classs
        db.query(`INSERT INTO lop(ten_lop, khoa, so_luong_sv, nam, id_khoa, id_nganh) 
                    VALUES (?,?,?,?,?,?)
                `
            , [ten_lop, khoa, so_luong_sv, nam, id_khoa, id_nganh], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM lop WHERE id_lop = ?`, [id], callback)
    },

    update: (id, classs, callback) => {
        const { ten_lop, khoa, so_luong_sv, nam, id_khoa, id_nganh } = classs
        const query = `UPDATE lop 
                 SET ten_lop = ?, khoa = ?, so_luong_sv = ?, nam = ?, id_khoa = ?, id_nganh = ?
                 WHERE id_lop = ?`;
        db.query(query, [ten_lop, khoa, so_luong_sv, nam, id_khoa, id_nganh, id], callback);
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM lop WHERE id_lop = ?`, [id], callback);
    },

    getByIdSemester: (id, callback) => {
        db.query(`SELECT DISTINCT sinh_vien.id_lop FROM lop_hoc_phan 
                    INNER JOIN sv_hoc_hp ON lop_hoc_phan.id_lop_hoc_phan = sv_hoc_hp.id_lop_hoc_phan
                    INNER JOIN sinh_vien ON sv_hoc_hp.id_sinh_vien = sinh_vien.id_sinh_vien
                    WHERE lop_hoc_phan.id_lop_hoc_phan = ?`, [id], callback);
    }
}

module.exports = Classs