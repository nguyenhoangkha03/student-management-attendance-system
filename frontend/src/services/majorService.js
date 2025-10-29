import axios from 'axios'

const API_URL = 'https://23tg8v1m-3333.asse.devtunnels.ms/api/major'

export const getMajors = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`)
        return response.data
    } catch(err){
        throw new Error('Error getting Majors')
    }
}

export const addMajors = async (majors) => {
    try {
      const response = await axios.post(`${API_URL}/add`, majors);
      return true
    } catch (error) {
      return false
    }
}

export const deleteMajor = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return true
    } catch (error) {
      return false
    }
}

export const updateMajor = async (id, major) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, major)
      return true
    } catch (error) {
      return false
    }
}

export const getMajorById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
}