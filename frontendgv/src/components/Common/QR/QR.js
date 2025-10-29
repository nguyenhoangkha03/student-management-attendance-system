import React, { useState } from 'react';

function QR() {
  const [scheduleId, setScheduleId] = useState(381);
  const [qrImage, setQrImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleGenerateQR = async () => {
    try {
      const response = await fetch('https://23tg8v1m-3333.asse.devtunnels.ms/api/qr/generate-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedule_id: scheduleId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Lỗi từ server: ${errorText}`); 
        return;
      }

      const data = await response.json();
      setQrImage(data.qrImage); 
      setShowModal(true); 
    } catch (error) {
      console.error('Lỗi khi tạo mã QR:', error);
      alert(`Đã xảy ra lỗi: ${error.message}`); 
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  handleGenerateQR()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* <input
        type="text"
        value={scheduleId}
        onChange={(e) => setScheduleId(e.target.value)}
        placeholder="Nhập mã lịch học"
        className="p-2 border border-gray-300 rounded mb-4 w-64"
      />
      <button
        onClick={handleGenerateQR}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Tạo mã QR
      </button> */}

      {true && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center">MÃ QR ĐIỂM DANH</h3>
            <img src={qrImage} alt="QR Code" className="border border-gray-300 p-2" />
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QR;