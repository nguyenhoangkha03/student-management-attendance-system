const db = require('../config/db')

const Manager = {
    getAll: (callback) => {
        db.query('SELECT * FROM manager', callback)
    },

    add: (manager, callback) => {
        const { msm, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, imageBuffer } = manager
        db.query(`INSERT INTO manager(msm, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, image) 
                    VALUES (?,?,?,?,?,?,?,?)
                `
            , [msm, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, imageBuffer], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM manager WHERE id_manager = ?`, [id], callback)
    },

    update: (id, manager, callback) => {
        const { msm, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, imageBuffer } = manager
        const query = `UPDATE manager 
                 SET msm = ?, ho_ten = ?, ngay_sinh = ?, gioi_tinh = ?, dia_chi = ?, email = ?, sdt = ?, image = ?
                 WHERE id_manager = ?`;
        db.query(query, [msm, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, imageBuffer, id], callback);
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM manager WHERE id_manager = ?`, [id], callback);
    }
}

module.exports = Manager