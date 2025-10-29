const db = require('../config/db')

const Semester = {
    getAll: (callback) => {
        db.query('SELECT * FROM hoc_ky', callback)
    },
    

    add: (semester, callback) => {
        const { ten_hoc_ky, nien_khoa, ngay_bat_dau, ngay_ket_thuc } = semester
        db.query(`INSERT INTO hoc_ky(ten_hoc_ky, nien_khoa, ngay_bat_dau, ngay_ket_thuc) 
                    VALUES (?,?,?,?)
                `
            , [ten_hoc_ky, nien_khoa, ngay_bat_dau, ngay_ket_thuc], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM hoc_ky WHERE id_hoc_ky = ?`, [id], callback)
    },

    update: (id, faculty, callback) => {
        const { ten_hoc_ky, nien_khoa, ngay_bat_dau, ngay_ket_thuc } = faculty
        const query = `UPDATE hoc_ky 
                 SET ten_hoc_ky = ?, nien_khoa = ?, ngay_bat_dau = ?, ngay_ket_thuc = ? 
                 WHERE id_hoc_ky = ?`;
        db.query(query, [ten_hoc_ky, nien_khoa, ngay_bat_dau, ngay_ket_thuc, id], callback);
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM hoc_ky WHERE id_hoc_ky = ?`, [id], callback);
    }
}

module.exports = Semester