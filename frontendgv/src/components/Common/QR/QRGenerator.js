import React, { useState } from 'react';
import axios from 'axios';
import { QRCode } from 'react-qrcode-logo';
import './QRGenerator.css'

function QRCodeGenerator({classId, setHide, scheduleId}) {
  const [qrUrl, setQrUrl] = useState('');
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const attendanceUrl = "https://23tg8v1m-3001.asse.devtunnels.ms";

  const handleGenerateQRCode = async () => {
    try {
      // Gọi API Node để lấy danh sách sinh viên dựa trên classId, scheduleId (nếu cần hiển thị danh sách tại trang điểm danh)
      const response = await axios.post('https://23tg8v1m-3333.asse.devtunnels.ms/api/qr/student', { classId, scheduleId });
      const { result: studentsList, qrData } = response.data;
      setStudents(studentsList);
      
      const qrLink = `${attendanceUrl}?classId=${encodeURIComponent(classId)}&scheduleId=${encodeURIComponent(scheduleId)}`;
      setQrUrl(qrLink);

      setShowModal(true);
    } catch (error) {
      console.error("Lỗi tạo mã QR:", error);
    }
  };

  handleGenerateQRCode()

  const handleClose = (e) => {
    setShowModal(false) 
    setHide()
  };

  return (
    <div>
      <h2>Trang điểm danh</h2>
      {showModal && qrUrl && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 8, display: "flex", alignItems: "center", flexDirection: "column" }}>
            <h3 className="font-semibold text-2xl text-center mb-2 text-blue-500">Mã QR điểm danh</h3>
            <QRCode value={qrUrl} size={256} />
            <p className="text-base">Quét mã QR này bằng điện thoại để điểm danh</p>
            <button className="mt-2 py-2 border text-gray-900 border-blue-500" onClick={handleClose}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
