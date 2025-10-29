const db = require('../config/db')

const Faculty = {
    getAll: (callback) => {
        db.query('SELECT * FROM hinh_anh', callback)
    },

    add: (image, callback) => {
        const { hinh_anh, id_sinh_vien } = image
        db.query(`INSERT INTO khoa(hinh_anh, id_sinh_vien) 
                    VALUES (?,?)
                `
            , [hinh_anh, id_sinh_vien], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM hinh_anh WHERE id_hinh_anh = ?`, [id], callback)
    },

    // update: (id, faculty, callback) => {
    //     const { ten_khoa, mo_ta, ngay_thanh_lap } = faculty
    //     const query = `UPDATE khoa 
    //              SET ten_khoa = ?, mo_ta = ?, ngay_thanh_lap = ? 
    //              WHERE id_khoa = ?`;
    //     db.query(query, [ten_khoa, mo_ta, ngay_thanh_lap, id], callback);
    // },

    getByIdImage: (id, callback) => {
        db.query(`SELECT * FROM hinh_anh WHERE id_hinh_anh = ?`, [id], callback);
    },

    getByIdStudent: (id, callback) => {
        db.query(`SELECT * FROM hinh_anh WHERE id_sinh_vien = ?`, [id], callback);
    }
}

module.exports = Faculty