const Sinhvien = require('../models/studentModel')
const bcrypt = require('bcrypt');


exports.getAllStudents = (req, res) => {
    Sinhvien.getAll((err, result) => {
        if(err) {
            console.error("Lỗi khi truy vấn DB:", err)
            return res.status(500).json({ error: err.message })
        }
        // console.log("Dữ liệu trả về từ DB:", result)
        res.json(result)
    })
}

exports.getStudent = (req, res) => {
    const { id } = req.params; // id ở đây là id_sinh_vien
    Sinhvien.getById(id, (err, result) => {
        if(err) {
            console.error("Lỗi khi truy vấn DB:", err);
            return res.status(500).json({ error: err.message });
        }
        if(result.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy sinh viên" });
        }
        res.json(result[0]);
    });
}




exports.addStudent = (req, res) => {
    const newStudent = req.body
    Sinhvien.add(newStudent, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new student successfully', id: result.insertId})
    })
}

exports.updateStudent = (req, res) => {
    const updateS = req.body;
    Sinhvien.update(updateS, (err, result) => {
        if (err) {
            console.error("Lỗi khi cập nhật DB:", err);
            return res.status(500).json({ error: err.message });
        }
        // Kiểm tra nếu không có dòng nào bị ảnh hưởng (có thể id không tồn tại)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy sinh viên cần cập nhật" });
        }
        res.json({ message: "Cập nhật thông tin thành công", affectedRows: result.affectedRows });
    });
}



exports.changePassword = async (req, res) => {
    const { mat_khau_cu, mat_khau_moi, id_sinh_vien } = req.body;
    
    if (!mat_khau_cu || !mat_khau_moi || !id_sinh_vien) {
        return res.status(400).json({ error: "Thiếu thông tin cần thiết" });
    }

    try {
        Sinhvien.changePassword({ mat_khau_cu, mat_khau_moi, id_sinh_vien }, (err, result) => {
            if (err) {
                console.error("Lỗi khi cập nhật DB:", err);
                return res.status(500).json({ error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Không tìm thấy sinh viên hoặc không có sự thay đổi" });
            }

            res.json({ message: "Thay đổi mật khẩu thành công", affectedRows: result.affectedRows });
        });
    } catch (error) {
        console.error("Lỗi bcrypt:", error);
        res.status(500).json({ error: "Lỗi khi băm mật khẩu" });
    }
};