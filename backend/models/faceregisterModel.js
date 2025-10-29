const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "./uploads");
let isCapturing = false; // Trạng thái đang chụp

// Đảm bảo thư mục tồn tại trước khi lưu
const ensureUploadDirExists = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("📂 Tạo lại thư mục uploads và khởi động lại server...");
    restartServer();
  }
};

// Hàm khởi động lại server
const restartServer = () => {
  console.log("🔄 Đang khởi động lại server...");
  process.exit(0);
};

// Theo dõi thư mục uploads
fs.watch(__dirname, (eventType, filename) => {
  if (eventType === "rename" && filename === "uploads") {
    console.log("❌ Thư mục uploads đã bị xóa hoặc đổi tên. Tạo lại và khởi động lại server...");
    ensureUploadDirExists();
  }
});

// Kiểm tra thư mục mỗi 5 giây
setInterval(ensureUploadDirExists, 5000);

// Hàm lưu ảnh
const saveImage = async (buffer, name) => {
  if (isCapturing) {
    console.log("⏳ Đang chụp ảnh, vui lòng đợi...");
    return;
  }

  isCapturing = true; // Bắt đầu quá trình chụp

  ensureUploadDirExists();
  const fileName = `image_${(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })).replace(/[,: /]/g, '_')}_${name.replace(/\s+/g, "_")}.jpg`;
  const filePath = path.join(uploadDir, fileName);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        isCapturing = false; // Đặt lại trạng thái nếu lỗi
        reject("Lỗi khi lưu file!");
      } else {
        console.log(`✅ Ảnh đã lưu: ${filePath}`);
        setTimeout(() => {
          isCapturing = false; // Đợi 500ms trước khi cho phép chụp tiếp
        }, 500);
        resolve(`/uploads/${fileName}`);
      }
    });
  });
};

module.exports = { saveImage };
