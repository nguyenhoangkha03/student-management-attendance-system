const db = require('../config/db')

const RollCall = {
    getAll: (callback) => {
        db.query('SELECT * FROM diem_danh', callback)
    },
    

    add: (faculty, now, callback) => {
        const { id_lich_hoc, id_sinh_vien, status } = faculty
        db.query(`INSERT INTO diem_danh(id_lich_hoc, id_sinh_vien, status) 
                    VALUES (?,?,?)
                `
            , [id_lich_hoc, id_sinh_vien, status], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM diem_danh WHERE id_diem_danh = ?`, [id], callback)
    },

    update: (id, faculty, now, callback) => {
        const { id_lich_hoc, id_sinh_vien, status } = faculty
        const query = `UPDATE diem_danh 
                 SET thoi_gian = ?, id_lich_hoc = ?, id_sinh_vien = ?, status = ?
                 WHERE id_diem_danh = ?`;
        db.query(query, [now, id_lich_hoc, id_sinh_vien, status, id], callback);
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM diem_danh WHERE id_diem_danh = ?`, [id], callback);
    }
}

module.exports = RollCall