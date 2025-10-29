const DiemDanh = require("../models/diemdanhModel");

exports.addAttendance = (req, res) => {
    let { students, id_sinh_vien, id_lich_hoc, thoi_gian } = req.body;

    // 🟢 Trường hợp: Nhận diện khuôn mặt gửi lên (chỉ có 1 sinh viên)
    if (id_sinh_vien && id_lich_hoc && thoi_gian) {
        console.log(`📌 Nhận điểm danh từ nhận diện khuôn mặt: ${id_sinh_vien}, ${id_lich_hoc}, ${thoi_gian}`);

        DiemDanh.addAttendance(id_sinh_vien, id_lich_hoc, thoi_gian, (err, result) => {
            if (err) {
                console.error("❌ Lỗi khi lưu điểm danh:", err);
                return res.status(500).json({ success: false, message: "Lỗi khi lưu điểm danh!" });
            }
            return res.json({ success: true, message: "Điểm danh thành công!" });
        });
        return; // Dừng lại sau khi xử lý xong một sinh viên
    }

    // 🟢 Trường hợp: Điểm danh thủ công gửi danh sách sinh viên
    if (!students || students.length === 0) {
        return res.status(400).json({ success: false, message: "Không có sinh viên nào để điểm danh!" });
    }

    console.log("📌 Nhận điểm danh từ danh sách sinh viên:", students);

    let processedCount = 0;
    let hasError = false;

    students.forEach(({ id_sinh_vien, id_lich_hoc, thoi_gian }) => {
        console.log(`📌 Điểm danh sinh viên: ${id_sinh_vien}, Lịch học: ${id_lich_hoc}, Thời gian: ${thoi_gian}`);

        if (!id_sinh_vien || !id_lich_hoc) {
            console.error("❌ Dữ liệu không hợp lệ:", { id_sinh_vien, id_lich_hoc });
            hasError = true;
            processedCount++;
            return;
        }

        DiemDanh.addAttendance(id_sinh_vien, id_lich_hoc, thoi_gian, (err, result) => {
            processedCount++;
            if (err) {
                console.error("❌ Lỗi khi lưu điểm danh:", err);
                hasError = true;
            }

            if (processedCount === students.length) {
                if (hasError) {
                    return res.status(500).json({ success: false, message: "Có lỗi xảy ra khi lưu điểm danh!" });
                } else {
                    return res.json({ success: true, message: "Điểm danh thành công!" });
                }
            }
        });
    });
};
