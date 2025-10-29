const express = require('express')
const cors = require('cors')
const svgCaptcha = require("svg-captcha")
const session = require("express-session")
const QRCode = require('qrcode')

const bodyParser = require('body-parser')
const facultyRoutes = require('./routes/faculty')
const accountRoutes = require('./routes/account')
const studentRoutes = require('./routes/student')
const classRoutes = require('./routes/class')
const teacherRoutes = require('./routes/teacher')
const managerRoutes = require('./routes/manager')
const roomRoutes = require('./routes/room')
const subjectRoutes = require('./routes/subject')
const semesterRoutes = require('./routes/semester')
const sectionClassRoutes = require('./routes/sectionClass')
const studentStudySectionRoutes = require('./routes/studentStudySection')
const scheduleRoutes = require('./routes/schedule')
const majorRoutes = require('./routes/major')
const rollCallRoutes = require('./routes/rollCall')
const faceRoutes = require('./routes/face')
const { loadModels } = require('./models/faceModel')
const faceregisterRouter = require('./routes/faceregister')
const diemDanhRoutes = require('./routes/diemdanh')
const studentModel = require('./models/studentModel')

const app = express()
const port = 3333
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://23tg8v1m-3001.asse.devtunnels.ms', 'https://23tg8v1m-3000.asse.devtunnels.ms', 'https://23tg8v1m-3002.asse.devtunnels.ms']
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

app.post('/api/qr/generate-qr', async (req, res) => {
  const { schedule_id } = req.body;
  if (!schedule_id) {
    return res.status(400).send('Vui lòng cung cấp schedule_id');
  }

  const formUrl = `https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?usp=pp_url&entry.12345678=${schedule_id}`;
  try {
    const qrImage = await QRCode.toDataURL(formUrl);
    res.send({ qrImage });
  } catch (error) {
    res.status(500).send('Lỗi khi tạo mã QR');
  }
})

app.post('/api/qr/student', (req, res) => {
  const { classId, scheduleId } = req.body;
  console.log(classId, scheduleId);
  studentModel.getByIdClass(classId, (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    if (result.length === 0) return res.status(404).json({ message: 'Major not found' })
    const qrData = { scheduleId, classId };
    res.json({ qrData, result });
  })

});


// (async () => {
//   try {
//     await loadModels();
//     console.log("✅ Face recognition models loaded successfully.");
//   } catch (error) {
//     console.error("❌ Error loading face recognition models:", error);
//   }
// })()

app.get("/captcha", (req, res) => {
  const captcha = svgCaptcha.create({
    noise: 2,
    color: true,
    size: 6,
  });

  req.session.captcha = captcha.text; 
  res.type("svg");
  res.status(200).send(captcha.data);
})
app.post("/verify-captcha", (req, res) => {
  console.log("Captcha trong session:", req.session.captcha);
  console.log("Người dùng nhập:", req.body.captchaInput);

  if (!req.session.captcha || req.body.captchaInput !== req.session.captcha) {
    return res.json({ success: false, message: "Captcha không hợp lệ!" });
  }

  req.session.captcha = null; 
  res.json({ success: true });
})

app.use('/api/faculty', facultyRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/class', classRoutes)
app.use('/api/teacher', teacherRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/manager', managerRoutes)
app.use('/api/room', roomRoutes)
app.use('/api/subject', subjectRoutes)
app.use('/api/semester', semesterRoutes)
app.use('/api/sectionClass', sectionClassRoutes)
app.use('/api/studentStudySection', studentStudySectionRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/major', majorRoutes)
app.use('/api/rollCall', rollCallRoutes)
app.use('/api/face', faceRoutes)
app.use('/api/faceregister', faceregisterRouter)
app.use("/api", diemDanhRoutes)
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`)
})

