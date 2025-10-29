const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controllers/faceregisterController"); // Đảm bảo đúng đường dẫn

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("image"), uploadImage);

module.exports = router;
