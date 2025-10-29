const db = require('../config/db')

const Subject = {
    getAll: (callback) => {
        db.query('SELECT * FROM mon_hoc', callback)
    },

    add: (subject, callback) => {
        const { ma_mon_hoc, ten_mon, so_tc_lt, so_tc_th } = subject
        db.query(`INSERT INTO mon_hoc(ma_mon_hoc, ten_mon, so_tc_lt, so_tc_th) 
                    VALUES (?,?,?,?)
                `
            , [ma_mon_hoc, ten_mon, so_tc_lt, so_tc_th], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM mon_hoc WHERE id_mon_hoc) = ?`, [id], callback)
    },

    update: (id, subject, callback) => {
        const { ma_mon_hoc, ten_mon, so_tc_lt, so_tc_th } = subject
        const query = `UPDATE mon_hoc 
                SET ma_mon_hoc = ?, ten_mon = ?, so_tc_lt = ?, so_tc_th = ?
                WHERE id_mon_hoc = ?`
        db.query(query, [ma_mon_hoc, ten_mon, so_tc_lt, so_tc_th, id], callback)
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM mon_hoc WHERE id_mon_hoc = ?`, [id], callback);
    }
}

module.exports = Subject