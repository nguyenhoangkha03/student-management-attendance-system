const db = require('../config/db')

const Faculty = {
    getAll: (callback) => {
        db.query('SELECT * FROM khoa', callback)
    },
    

    add: (faculty, callback) => {
        const { ten_khoa, mo_ta, ngay_thanh_lap } = Faculty
        db.query(`INSERT INTO khoa(ten_khoa, mo_ta, ngay_thanh_lap) 
                    VALUES (?,?,?)
                `
            , [ten_khoa, mo_ta, ngay_thanh_lap], callback)
    }
}