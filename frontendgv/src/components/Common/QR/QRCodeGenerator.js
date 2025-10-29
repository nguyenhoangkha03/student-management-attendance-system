// QRCodeGenerator.js
import React, { useState } from 'react';
import axios from 'axios';
import { QRCode } from 'react-qrcode-logo';

function QRCodeGenerator() {
  const [classId, setClassId] = useState('');
  const [scheduleId, setScheduleId] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [students, setStudents] = useState([]);

  // Đường dẫn công khai của Google Form (đã được publish) với /viewform
  const googleFormUrl = "https://docs.google.com/forms/d/1LjhUdN4WvC6Khp-J5CxNMLYUdO1yMSjhSye4hHIL6IU/viewform";

  const handleGenerateQRCode = async () => {
    try {
      // Gọi API Node để lấy danh sách sinh viên theo classId và scheduleId
      const response = await axios.post('https://23tg8v1m-3333.asse.devtunnels.ms/api/qr/student', { classId, scheduleId });
      // Giả sử API trả về { result: [ { id_sinh_vien: "...", ho_ten: "..." }, ... ] }
      const { result: studentsList } = response.data;
      setStudents(studentsList);
      
      // Tạo prefilled link cho Google Form
      // Thay "entry.1234567890" và "entry.0987654321" bằng entry ID thật của các trường bạn cần prefill
      const prefilledUrl = `${googleFormUrl}?entry.1234567890=${encodeURIComponent(classId)}&entry.0987654321=${encodeURIComponent(scheduleId)}`;
      setQrUrl(prefilledUrl);
    } catch (error) {
      console.error("Lỗi tạo mã QR:", error);
    }
  };

  return (
    <div>
      <h2>Tạo mã QR cho điểm danh</h2>
      <div>
        <label>Class ID: </label>
        <input
          type="text"
          placeholder="Nhập id lớp"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        />
      </div>
      <div>
        <label>Schedule ID: </label>
        <input
          type="text"
          placeholder="Nhập id lịch học"
          value={scheduleId}
          onChange={(e) => setScheduleId(e.target.value)}
        />
      </div>
      <button onClick={handleGenerateQRCode}>Tạo mã QR</button>
      
      {qrUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Mã QR (Quét để mở Google Form điểm danh)</h3>
          <QRCode value={qrUrl} size={256} />
          <p>URL: {qrUrl}</p>
        </div>
      )}

      {students && students.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Danh sách sinh viên (lớp {classId})</h3>
          <ul>
            {students.map(student => (
              <li key={student.id_sinh_vien}>
                {student.id_sinh_vien} - {student.ho_ten}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
