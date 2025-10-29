const db = require('../config/db')

const Student = {
    getAll: (callback) => {
        db.query('SELECT * FROM sinh_vien', callback)
    },
    

    add: (sinhVien, callback) => {
        const { mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop, imageBuffer } = sinhVien
        db.query(`INSERT INTO sinh_vien(mssv, ho_ten, 
                    ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop, image) 
                    VALUES (?,?,?,?,?,?,?,?,?)
                `
            , [mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop, imageBuffer], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM sinh_vien WHERE id_sinh_vien = ?`, [id], callback)
    },

    update: (id, student, callback) => {
        const { mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop, imageBuffer } = student
        const query = `UPDATE sinh_vien 
                 SET mssv = ?, ho_ten = ?, ngay_sinh = ?, gioi_tinh = ?, dia_chi = ?, email = ?, sdt = ?, id_lop = ?, image = ?
                 WHERE id_sinh_vien = ?`;
        db.query(query, [mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop, imageBuffer, id], callback);
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM sinh_vien WHERE id_sinh_vien = ?`, [id], callback);
    },

    getByIdClass: (id, callback) => {
        db.query(`SELECT * FROM sinh_vien WHERE id_lop = ?`, [id], callback);
    },

    getByIdClassAndIdSection: (id, callback) => {
        const { idClass, idSection } = id
        db.query(`SELECT * FROM sinh_vien 
                    LEFT JOIN sv_hoc_hp ON sinh_vien.id_sinh_vien = sv_hoc_hp.id_sinh_vien
                    AND sv_hoc_hp.id_lop_hoc_phan = ?
                    WHERE id_lop = ? `, [idSection, idClass], callback);
    },

    getByIdClassAndIdSectionAndIdSchedule: (id, callback) => {
        const { idClass, idSection, idSchedule } = id
        db.query(`SELECT sinh_vien.id_sinh_vien as idsv, sinh_vien.*, sv_hoc_hp.*, diem_danh.* FROM sinh_vien 
                    LEFT JOIN sv_hoc_hp ON sinh_vien.id_sinh_vien = sv_hoc_hp.id_sinh_vien
                    AND sv_hoc_hp.id_lop_hoc_phan = ?
                    LEFT JOIN diem_danh ON sinh_vien.id_sinh_vien = diem_danh.id_sinh_vien
                    AND diem_danh.id_lich_hoc = ?
                    WHERE sinh_vien.id_lop = ?`, [idSection, idSchedule, idClass], callback);
    },

    getByName: (name, callback) => {
        db.query(`SELECT * FROM sinh_vien WHERE ho_ten LIKE ?`, [name], callback);
    },

    getByMSSV: (mssv, callback) => {
        db.query(`SELECT * FROM sinh_vien WHERE mssv = ?`, [mssv], callback);
    }
}

module.exports = Student