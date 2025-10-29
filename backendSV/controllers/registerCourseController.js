const RegisterCourse = require('../models/registerCourseModel')

exports.getAllCourses = (req, res) => {
    RegisterCourse.getAllCourse((err, result) => {
        if(err) {
            console.error("Lỗi khi truy vấn DB:", err)
            return res.status(500).json({ error: err.message })
        }
        res.json(result)
    })
}

exports.registerCourse = (req, res) => {
    // Kiểm tra xem request body có dữ liệu hay không
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Missing request body" });
    }
    
    RegisterCourse.registerCourse(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Đăng ký môn học thành công', id: result.insertId });
    });
};



exports.getAllRegisterById = (req, res) => {
    const id = req.params.id;             // Lấy id sinh viên từ params
    const id_hoc_ky = req.query.id_hoc_ky;  // Lấy id_hoc_ky từ query (có thể truyền qua URL)
    
    RegisterCourse.getAllRegisterById(id, id_hoc_ky, (err, result) => {
        if (err) {
            console.error("Lỗi khi truy vấn DB:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
}


exports.deleteRegisterById = (req, res) => {
    const { idSinhVien, idLopHP } = req.query; // đổi tên idMonHoc thành idLopHP
    if (!idSinhVien || !idLopHP) {
        return res.status(400).json({ error: "Thiếu idSinhVien hoặc idLopHP" });
    }

    RegisterCourse.deleteRegisterById(idSinhVien, idLopHP, (err, result) => {
        if (err) {
            console.error("Lỗi khi truy vấn DB:", err);
            return res.status(500).json({ error: err.message });
        }
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Không tìm thấy đăng ký để xóa" });
        }
        res.json({ message: "Xóa đăng ký thành công", affectedRows: result.affectedRows });
    });
};


exports.getLopHocPhanBySemester = (req, res) => {
    const { id_hoc_ky } = req.query;
    if (!id_hoc_ky) {
      return res.status(400).json({ error: "Thiếu thông tin id_hoc_ky" });
    }
    RegisterCourse.getAllLopHocPhanBySemester(id_hoc_ky, (err, results) => {
      if (err) {
        console.error("Lỗi khi truy vấn DB:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  };

exports.getSemesters = (req, res) => {
    RegisterCourse.getSemesters((err, results) => {
      if (err) {
        console.error("Lỗi khi lấy danh sách học kỳ:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  };
  