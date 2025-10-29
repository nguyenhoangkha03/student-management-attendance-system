const { saveImage } = require('../models/faceregisterModel');

const uploadImage = async (req, res) => {
  try {
    const { buffer } = req.file;
    const name = req.body.name || "default";
    const imagePath = await saveImage(buffer, name);
    res.json({ message: "Ảnh đã lưu!", imagePath });
  } catch (error) {
    console.error("Lỗi khi lưu ảnh:", error);
    res.status(500).json({ error: "Lỗi khi lưu ảnh!" });
  }
};

module.exports = { uploadImage };
