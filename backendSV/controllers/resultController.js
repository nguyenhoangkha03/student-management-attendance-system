const Result = require('../models/resultModel');

exports.getResultById = async (req, res) => {
    const { sinhVienId } = req.params;
    Result.getAllById(sinhVienId, (err, result) => {  // Truyền sinhVienId vào
        if (err) {
            console.error("Lỗi khi truy vấn DB:", err);
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy sinh viên" });
        }
        res.json(result); // Trả về toàn bộ mảng kết quả
    });
};


exports.getCourses = async (req, res) => {
    Result.getAllCourse((err, result) => {
        if(err) {
            console.error("Lỗi khi truy vấn DB:", err)
            return res.status(500).json({ error: err.message })
        }
        // console.log("Dữ liệu trả về từ DB:", result)
        res.json(result)
    })
}