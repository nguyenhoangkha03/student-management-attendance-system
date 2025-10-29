import axios from 'axios'

const API_URL = 'https://23tg8v1m-3333.asse.devtunnels.ms/api/semester'

export const getSemesters = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`)
        return response.data
    } catch(err){
        throw new Error('Error getting semesters')
    }
}

export const addSemester = async (semester) => {
    try {
      const response = await axios.post(`${API_URL}/add`, semester);
      return true
    } catch (error) {
      return false
    }
}

export const deleteSemester = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return true
    } catch (error) {
      return false
    }
}

export const updateSemester = async (id, semester) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, semester)
      return true
    } catch (error) {
      return false
    }
}

export const getSemesterById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      return false
    }
}