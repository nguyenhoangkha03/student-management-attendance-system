const Login = require('../models/loginModel');

exports.LoginUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin" });
    }

    Login.loginByUser(username, password, (err, result) => {
        if (err) {
            console.error("Lỗi khi truy vấn DB:", err);
            return res.status(500).json({ error: "Lỗi server" });
        }
    
        console.log("Kết quả truy vấn:", result); // Kiểm tra dữ liệu trả về
    
        if (result.length === 0) {
            return res.status(401).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
        }
    
        res.json({ message: "Đăng nhập thành công", user: result });
    });
    
};
