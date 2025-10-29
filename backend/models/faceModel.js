// Theo dõi thư mục uploads và tự động cập nhật danh sách khuôn mặt khi có thay đổi
const fs = require('fs');
const path = require('path');
const canvas = require('canvas');
const faceapi = require('face-api.js');
const { Canvas, Image, ImageData, createCanvas } = canvas;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

let knownFaces = [];
let knownNames = [];
let checkedInNames = [];
let modelsLoaded = false;
let debounceTimer;

// 📌 Tải mô hình nhận diện khuôn mặt
async function loadModels() {
  if (modelsLoaded) {
    console.log("✅ Models already loaded, skipping...");
    return;
  }

  const modelPath = path.join(__dirname, './models_face');
  console.log("📂 Loading models from:", modelPath);

  try {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);

    modelsLoaded = true;
    console.log('✅ Models loaded successfully');
  } catch (error) {
    console.error("❌ Error loading models:", error);
  }
}

// 📌 Load ảnh từ thư mục uploads để lấy danh sách khuôn mặt đã biết
async function loadKnownFaces() {
  const uploadDir = path.join(__dirname, './uploads');

  if (!fs.existsSync(uploadDir)) {
    console.error("❌ Uploads folder not found:", uploadDir);
    return;
  }

  try {
    knownFaces = [];
    knownNames = [];

    const files = fs.readdirSync(uploadDir).filter(file => /\.(jpg|jpeg|png)$/i.test(file));
    
    if (files.length === 0) {
      console.warn("⚠️ No images found in uploads folder.");
      return;
    }

    for (const file of files) {
      const imgPath = path.join(uploadDir, file);
      const img = await canvas.loadImage(imgPath);
      const imgCanvas = createCanvas(img.width, img.height);
      const ctx = imgCanvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
    
      const detections = await faceapi.detectSingleFace(imgCanvas)
        .withFaceLandmarks()
        .withFaceDescriptor();
    
      if (detections) {
        knownFaces.push(detections.descriptor);
        const match = file.match(/(\d+)(?=\.\w+$)/);
        const name = match ? match[0] : file.split('.')[0];
        knownNames.push(name);
        console.log(`✅ Loaded face: ${file} as ${name}`);
      } else {
        console.warn(`⚠️ No face detected in ${file}, skipping.`);
      }
    }
  } catch (error) {
    console.error("❌ Error loading known faces:", error);
  }
}

// 📌 Theo dõi thư mục uploads để tự động cập nhật khi có thay đổi
function watchUploadsDirectory() {
  const uploadDir = path.join(__dirname, './uploads');
  if (fs.existsSync(uploadDir)) {
    fs.watch(uploadDir, (eventType, filename) => {
      if (filename && /\.(jpg|jpeg|png)$/i.test(filename)) {
        console.log(`🔄 Detected change in uploads: ${eventType} - ${filename}`);

        // Debounce loadKnownFaces to prevent excessive calls
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          console.log('⚡ Updating known faces...');
          await loadKnownFaces();
        }, 20000); // Chỉ gọi loadKnownFaces sau 1 giây nếu không có thay đổi nào khác
      }
    });
    console.log('👀 Watching uploads directory for changes...');
  } else {
    console.error('❌ Uploads directory does not exist for watching.');
  }
}

// 📌 Nhận diện khuôn mặt từ ảnh client gửi lên
async function recognizeFace(imageData) {
  console.log("🖼 Image Data Length:", imageData.length);

  const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
  const imgBuffer = Buffer.from(base64Data, 'base64');

  let img;
  try {
    img = await canvas.loadImage(imgBuffer);
    console.log("✅ Image loaded successfully");
  } catch (err) {
    console.error("❌ Load Image Error:", err);
    return { match: 'Image load failed', time: getVietnamTime() };
  }

  const imgCanvas = createCanvas(img.width, img.height);
  const ctx = imgCanvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);

  try {
    const detections = await faceapi.detectSingleFace(imgCanvas)
      .withFaceLandmarks()
      .withFaceDescriptor();
    
    if (!detections) {
      return { match: 'No face detected', time: getVietnamTime(), shouldSave: false };
    }

    let bestMatch = { name: 'unknown', distance: 1.0 };
    const detection = detections.descriptor;

    knownFaces.forEach((knownFace, i) => {
      const distance = faceapi.euclideanDistance(knownFace, detection);
      if (distance < bestMatch.distance) {
        bestMatch = { name: knownNames[i], distance };
      }
    });

    const confidence = (1 - bestMatch.distance).toFixed(2);

    if (bestMatch.distance < 0.6) {
      if (checkedInNames.includes(bestMatch.name)) {
        return { match: "Đã điểm danh", confidence, time: getVietnamTime(), shouldSave: true };
      }
      checkedInNames.push(bestMatch.name);
      return { match: bestMatch.name, confidence, time: getVietnamTime(), shouldSave: true };
    }

    return { match: 'unknown', confidence, time: getVietnamTime(), shouldSave: false };
  } catch (error) {
    console.error("❌ Face Detection Error:", error);
    return { match: 'Error in face detection', time: getVietnamTime(), shouldSave: false };
  }
}

// 📌 Hàm lấy thời gian Việt Nam
function getVietnamTime() {
  return new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
}

// Gọi load models, khuôn mặt đã biết và theo dõi thư mục khi khởi động server
(async () => {
  await loadModels();
  await loadKnownFaces();
  watchUploadsDirectory();
})();

module.exports = { loadModels, recognizeFace };