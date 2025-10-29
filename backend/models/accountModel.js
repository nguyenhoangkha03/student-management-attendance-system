const db = require('../config/db')

const Account = {
    getAll: (callback) => {
        db.query('SELECT * FROM tai_khoan', callback)
    },

    getAllTeacher: (callback) => {
        db.query('SELECT * FROM tai_khoan WHERE id_giang_vien IS NOT NULL', callback)
    },

    getAllStudent: (callback) => {
        db.query('SELECT * FROM tai_khoan WHERE id_sinh_vien IS NOT NULL', callback)
    },

    getAllManager: (callback) => {
        db.query('SELECT * FROM tai_khoan WHERE id_manager IS NOT NULL', callback)
    },

    add: (taiKhoan, callback) => {
        const { username, password, vai_tro, trang_thai, id_giang_vien, id_sinh_vien, id_manager } = taiKhoan

        const idGiangVien = id_giang_vien === "" ? null : id_giang_vien;
        const idSinhVien = id_sinh_vien === "" ? null : id_sinh_vien;
        const idManager = id_manager === "" ? null : id_manager;

        db.query(`INSERT INTO tai_khoan(username, password, vai_tro
                    , trang_thai, id_giang_vien, id_sinh_vien, id_manager) 
                    VALUES (?,?,?,?,?,?,?)
                `
            , [username, password, vai_tro, trang_thai, idGiangVien, idSinhVien, idManager], callback)
    },

    delete: (id, callback) => {
        db.query(`DELETE FROM tai_khoan WHERE id_tai_khoan = ?`, [id], callback)
    },

    update: (id, taiKhoan, callback) => {
        const { username, password, vai_tro, trang_thai, id_giang_vien, id_sinh_vien, id_manager } = taiKhoan

        const idGiangVien = id_giang_vien === "" ? null : id_giang_vien;
        const idSinhVien = id_sinh_vien === "" ? null : id_sinh_vien;
        const idManager = id_manager === "" ? null : id_manager;

        const query = `UPDATE tai_khoan 
                 SET username = ?, password = ?, vai_tro = ?, trang_thai = ?, id_giang_vien = ? , id_sinh_vien = ?, id_manager = ?
                 WHERE id_tai_khoan = ?`;
        db.query(query, [username, password, vai_tro, trang_thai, idGiangVien, idSinhVien, idManager, id], callback);
    },

    updatePassword: (taiKhoan, callback) => {
        const { username, password} = taiKhoan


        const query = `UPDATE tai_khoan 
                 SET password = ?
                 WHERE username = ?`;
        db.query(query, [password, username], callback);
    },
   
    checkLogin: (taikhoan, callback) => {
        const {  username, password } = taikhoan
        db.query(`
            SELECT * FROM tai_khoan WHERE username = ? AND password = ?`
        , [username, password], callback)
    },

    getByUsername: (username, callback) => {
        db.query(`
            SELECT * FROM tai_khoan WHERE username = ?`
        , [username], callback)
    },

    getById: (id, callback) => {
        db.query(`SELECT * FROM tai_khoan WHERE id_tai_khoan = ?`, [id], callback);
    }
}

module.exports = Account