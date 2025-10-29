const express = require("express");
const router = express.Router();
const diemDanhController = require("../controllers/diemdanhController");

router.post("/diem-danh", diemDanhController.addAttendance);

module.exports = router;
