import axios from "axios";

const API_URL = "https://23tg8v1m-3333.asse.devtunnels.ms/api/faceregister"; // Đúng cấu trúc endpoint

// Gửi ảnh lên server
export const uploadImage = async (imageSrc, valueInput) => {
  try {
    // Chuyển đổi ảnh sang Blob
    const blob = await fetch(imageSrc).then((res) => res.blob());

    // Tạo FormData để gửi dữ liệu multipart/form-data
    const formData = new FormData();
    formData.append("image", blob, "snapshot.jpg");
    formData.append("name", valueInput);

    // Gửi yêu cầu POST lên server
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Trả về đường dẫn ảnh nếu thành công
    return response.data.imagePath;
  } catch (error) {
    console.error("Lỗi khi lưu ảnh:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error("Upload failed");
  }
};
