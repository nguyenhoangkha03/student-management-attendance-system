const db = require('../config/db')

const Schedule = {
    getAll: (callback) => {
        db.query('SELECT * FROM lich_hoc', callback)
    },
    

    add: (schedule, callback) => {
        const { ngay, session, so_tiet, tu_tiet, den_tiet, id_lop_hoc_phan, id_lop, loai } = schedule
        db.query(`INSERT INTO lich_hoc(ngay, session, so_tiet, tu_tiet, den_tiet, id_lop_hoc_phan, id_lop, loai) 
                    VALUES (?,?,?,?,?,?,?,?)
                `
            , [ngay, session, so_tiet, tu_tiet, den_tiet, id_lop_hoc_phan, id_lop, loai], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM lich_hoc WHERE id_lich_hoc = ?`, [id], callback)
    },

    update: (id, schedule, callback) => {
        const { ngay, session, so_tiet, tu_tiet, den_tiet, id_lop_hoc_phan, id_lop, loai } = schedule
        const query = `UPDATE lich_hoc 
                 SET ngay = ?, session = ?, so_tiet = ?, tu_tiet = ?, den_tiet = ? , id_lop_hoc_phan = ?, id_lop = ?, loai = ?
                 WHERE id_lich_hoc = ?`;
        db.query(query, [ngay, session, so_tiet, tu_tiet, den_tiet, id_lop_hoc_phan, id_lop, loai, id], callback);
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM lich_hoc WHERE id_lich_hoc = ?`, [id], callback)
    },

    getAllJoinByIdClass: (id, callback) => {
        db.query(`SELECT id_mon_hoc, lich_hoc.id_lop, lich_hoc.id_lop_hoc_phan, loai, session, so_tiet, tu_tiet, den_tiet, id_phong, id_giang_vien, ngay
                    FROM lich_hoc JOIN lop_hoc_phan 
                    ON lich_hoc.id_lop_hoc_phan = lop_hoc_phan.id_lop_hoc_phan 
                    WHERE lich_hoc.id_lop = ?`, [id], callback)
    },

    getAllJoinByIdTeacher: (id, callback) => {
        db.query(`SELECT id_mon_hoc, lich_hoc.id_lop, lich_hoc.id_lop_hoc_phan, loai, session, so_tiet, tu_tiet, den_tiet, id_phong, id_giang_vien, ngay
                    FROM lich_hoc JOIN lop_hoc_phan 
                    ON lich_hoc.id_lop_hoc_phan = lop_hoc_phan.id_lop_hoc_phan 
                    WHERE id_giang_vien = ?`, [id], callback)
    },

    getAllByIdClassAndDateNow: (id, callback) => {
        const today = new Date().toISOString().split('T')[0];
        db.query(
            `SELECT lh.*, mh.ten_mon, lh.session
             FROM lich_hoc lh
             JOIN lop_hoc_phan lhp ON lh.id_lop_hoc_phan = lhp.id_lop_hoc_phan
             JOIN mon_hoc mh ON lhp.id_mon_hoc = mh.id_mon_hoc
             WHERE lh.id_lop = ? AND lh.ngay = ?
             ORDER BY lh.session`, 
            [id, today], 
            callback
        );
    },

    getCountByIdStudentAndIdSemester: (id, callback) => {
        const { idStudent, idSemester } = id
        db.query(`SELECT COUNT(*) AS COUNT FROM lop_hoc_phan 
                    INNER JOIN sv_hoc_hp ON lop_hoc_phan.id_lop_hoc_phan = sv_hoc_hp.id_lop_hoc_phan
                    INNER JOIN lich_hoc ON lich_hoc.id_lop_hoc_phan = lop_hoc_phan.id_lop_hoc_phan
                    WHERE id_sinh_vien = ? AND id_hoc_ky = ?`, [idStudent, idSemester], callback)
    },

    getByIdSectionAndClassAndDay: (id, now, callback) => {
        const { idSection, idClass } = id
        db.query(`SELECT * from lich_hoc
                    WHERE id_lop_hoc_phan = ? AND id_lop = ? AND ngay = ?`, [idSection, idClass, now], callback)
    }
}

module.exports = Schedule