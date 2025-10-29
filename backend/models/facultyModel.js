const db = require('../config/db')

const Faculty = {
    getAll: (callback) => {
        db.query('SELECT * FROM khoa', callback)
    },
    

    add: (faculty, callback) => {
        const { ten_khoa, mo_ta, ngay_thanh_lap } = faculty
        db.query(`INSERT INTO khoa(ten_khoa, mo_ta, ngay_thanh_lap) 
                    VALUES (?,?,?)
                `
            , [ten_khoa, mo_ta, ngay_thanh_lap], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM khoa WHERE id_khoa = ?`, [id], callback)
    },

    update: (id, faculty, callback) => {
        const { ten_khoa, mo_ta, ngay_thanh_lap } = faculty
        const query = `UPDATE khoa 
                 SET ten_khoa = ?, mo_ta = ?, ngay_thanh_lap = ? 
                 WHERE id_khoa = ?`;
        db.query(query, [ten_khoa, mo_ta, ngay_thanh_lap, id], callback);
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM khoa WHERE id_khoa = ?`, [id], callback);
    }
}

module.exports = Faculty