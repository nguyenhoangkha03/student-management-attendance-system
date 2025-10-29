import axios from 'axios';

const API_URL = 'https://23tg8v1m-3333.asse.devtunnels.ms/api/face';

// Gửi ảnh để nhận diện khuôn mặt
export const detectFace = async (image) => {
    try {
        const response = await axios.post(`${API_URL}/detect`, { image });
        return response.data;
    } catch (error) {
        console.error('Error detecting face:', error);
        return null;
    }
};


