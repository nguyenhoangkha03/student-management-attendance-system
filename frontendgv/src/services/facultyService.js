import axios from 'axios'

const API_URL = 'https://23tg8v1m-3333.asse.devtunnels.ms/api/faculty'

export const getFaculties = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`)
        return response.data
    } catch(err){
        throw new Error('Error getting faculties')
    }
}

export const addFaculty = async (faculty) => {
    try {
      const response = await axios.post(`${API_URL}/add`, faculty);
      return true
    } catch (error) {
      return false
    }
}

export const deleteFaculty = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return true
    } catch (error) {
      return false
    }
}

export const updateFaculty = async (id, faculty) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, faculty)
      return true
    } catch (error) {
      return false
    }
}

export const getFacultyById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      return false
    }
}