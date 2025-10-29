const db = require('../config/db')

const Teacher = {
    getAll: (callback) => {
        db.query('SELECT * FROM giang_vien', callback)
    },

    add: (teacher, callback) => {
        const { msgv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_khoa, imageBuffer } = teacher
        db.query(`INSERT INTO giang_vien(msgv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_khoa, image) 
                    VALUES (?,?,?,?,?,?,?,?,?)
                `
            , [msgv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_khoa, imageBuffer], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM giang_vien WHERE id_giang_vien = ?`, [id], callback)
    },

    update: (id, teacher, callback) => {
        const { msgv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_khoa, imageBuffer } = teacher
        const query = `UPDATE giang_vien 
                 SET msgv = ?, ho_ten = ?, ngay_sinh = ?, gioi_tinh = ?, dia_chi = ?, email = ?, sdt = ?, id_khoa = ?, image = ?
                 WHERE id_giang_vien = ?`;
        db.query(query, [msgv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_khoa, imageBuffer, id], callback);
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM giang_vien WHERE id_giang_vien = ?`, [id], callback);
    }
}

module.exports = Teacher