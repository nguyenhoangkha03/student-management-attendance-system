const db = require('../config/db')

const Room = {
    getAll: (callback) => {
        db.query('SELECT * FROM phong', callback)
    },

    add: (room, callback) => {
        const { ten_phong, so_cho } = room
        db.query(`INSERT INTO phong(ten_phong, so_cho) 
                    VALUES (?,?)
                `
            , [ten_phong, so_cho], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM phong WHERE id_phong) = ?`, [id], callback)
    },

    update: (id, room, callback) => {
        const { ten_phong, so_cho } = room
        const query = `UPDATE phong 
                SET ten_phong = ?, so_cho = ?
                WHERE id_phong = ?`
        db.query(query, [ten_phong, so_cho, id], callback)
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM phong WHERE id_phong = ?`, [id], callback);
    }
}

module.exports = Room