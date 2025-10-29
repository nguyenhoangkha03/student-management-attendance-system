import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { uploadImage } from "../../services/faceregisterService";
import "../../pages/FaceID/test.css";

const CameraCapture = ({ valueInput }) => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);
  const [number, setNumber] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);

  const capture = async () => {
    if (images.length >= 5) return; // Dừng sau khi đủ 5 ảnh
    const imageSrc = webcamRef.current.getScreenshot();
    setImages((prev) => [...prev, imageSrc]);
    try {
      await uploadImage(imageSrc, valueInput);
      setNumber((prev) => prev + 1); // Tăng số ảnh sau khi upload thành công
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
    }
  };

  useEffect(() => {
    if (cameraReady) {
      let captureCount = 0;
      const interval = setInterval(async () => {
        if (captureCount < 5) {
          await capture(); // Đảm bảo chụp ảnh và upload xong rồi mới tiếp tục
          captureCount++;
        } else {
          clearInterval(interval);
        }
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [cameraReady]);

  useEffect(() => {
    const checkCamera = setTimeout(() => {
      setCameraReady(true);
    }, 2000);
    return () => clearTimeout(checkCamera);
  }, []);

  return (
    <>
      <div className="rightt"></div>
      <div className="leftt"></div>
      <div className="TTop">
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="textt">Đang đăng ký khuôn mặt</div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg shadow-lg w-80 h-60 webcam-flip"
          />
          <div className="text">Số ảnh đã chụp: <p className="text">{number}</p></div>
        </div>
      </div>
    </>
  );
};

export default CameraCapture;
