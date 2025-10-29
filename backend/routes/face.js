const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { detectFace } = require('../controllers/faceController');

const router = express.Router();

router.use(cors());
router.use(bodyParser.json({ limit: '10mb' }));
router.use(bodyParser.urlencoded({ extended: true }));

// 📌 Định nghĩa endpoint nhận diện khuôn mặt
router.post('/detect', detectFace);


module.exports = router;
