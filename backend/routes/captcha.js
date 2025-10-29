const express = require("express")
const session = require("express-session")
const cors = require("cors")
const svgCaptcha = require("svg-captcha")

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// API tạo captcha
app.get("/captcha", (req, res) => {
  const captcha = svgCaptcha.create({
    noise: 2,
    color: true,
    size: 6,
  });

  req.session.captcha = captcha.text; // Lưu captcha vào session
  res.type("svg");
  res.status(200).send(captcha.data);
});

// API kiểm tra captcha
app.post("/verify-captcha", (req, res) => {
  const { captchaInput } = req.body;

  if (!req.session.captcha || captchaInput !== req.session.captcha) {
    return res.json({ success: false, message: "Captcha không hợp lệ!" });
  }

  req.session.captcha = null; // Xóa captcha sau khi xác minh thành công
  res.json({ success: true });
});

module.exports = app