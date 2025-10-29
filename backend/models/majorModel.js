const db = require('../config/db')

const Major = {
    getAll: (callback) => {
        db.query('SELECT * FROM nganh', callback)
    },
    

    add: (major, callback) => {
        const { msn, ten_nganh, tin_chi, id_khoa } = major
        db.query(`INSERT INTO nganh(msn, ten_nganh, tin_chi, id_khoa) 
                    VALUES (?,?,?,?)
                `
            , [msn, ten_nganh, tin_chi, id_khoa], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM nganh WHERE id_nganh = ?`, [id], callback)
    },

    update: (id, major, callback) => {
        const { msn, ten_nganh, tin_chi, id_khoa } = major
        const query = `UPDATE nganh 
                 SET msn = ?, ten_nganh = ?, tin_chi = ?, id_khoa = ? 
                 WHERE id_nganh = ?`;
        db.query(query, [msn, ten_nganh, tin_chi, id_khoa, id], callback);
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM nganh WHERE id_nganh = ?`, [id], callback);
    }
}

module.exports = Major