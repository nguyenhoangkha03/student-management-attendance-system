const db = require('../config/db')

const SectionClass = {
    getAll: (callback) => {
        db.query('SELECT * FROM sv_hoc_hp', callback)
    },
    

    add: (studyStudySection, callback) => {
        const { id_sinh_vien, id_lop_hoc_phan, ngay_dang_ky, thu, diem_giua_ky, diem_cuoi_ky, diem_tong_ket } = studyStudySection
        db.query(`INSERT INTO sv_hoc_hp(id_sinh_vien, id_lop_hoc_phan, ngay_dang_ky, thu, diem_giua_ky, diem_cuoi_ky, diem_tong_ket) 
                    VALUES (?,?,?,?,?,?,?)
                `
            , [id_sinh_vien, id_lop_hoc_phan, ngay_dang_ky, thu, diem_giua_ky, diem_cuoi_ky, diem_tong_ket], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM sv_hoc_hp WHERE id_sv_hoc_hp = ?`, [id], callback)
    },

    update: (id, studyStudySection, callback) => {
        const { id_sinh_vien, id_lop_hoc_phan, ngay_dang_ky, thu, diem_giua_ky, diem_cuoi_ky, diem_tong_ket } = studyStudySection
        const query = `UPDATE sv_hoc_hp 
                 SET id_sinh_vien = ?, id_lop_hoc_phan = ?, ngay_dang_ky = ?, thu = ?, diem_giua_ky = ?, diem_cuoi_ky = ?, diem_tong_ket = ? 
                 WHERE id_sv_hoc_hp = ?`;
        db.query(query, [id_sinh_vien, id_lop_hoc_phan, ngay_dang_ky, thu, diem_giua_ky, diem_cuoi_ky, diem_tong_ket, id], callback);
    },

    updateScore: (id, studyStudySection, callback) => {
        const { diem_giua_ky, diem_cuoi_ky, diem_tong_ket } = studyStudySection
        const query = `UPDATE sv_hoc_hp 
                 SET diem_giua_ky = ?, diem_cuoi_ky = ?, diem_tong_ket = ? 
                 WHERE id_sv_hoc_hp = ?`;
        db.query(query, [diem_giua_ky, diem_cuoi_ky, diem_tong_ket, id], callback);
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM sv_hoc_hp WHERE id_sv_hoc_hp = ?`, [id], callback);
    },

    getByIdSection: (id, callback) => {
        db.query(`SELECT * FROM sv_hoc_hp WHERE id_lop_hoc_phan = ?`, [id], callback);
    }
}

module.exports = SectionClass