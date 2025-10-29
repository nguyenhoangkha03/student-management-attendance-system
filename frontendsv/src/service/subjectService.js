import axios from 'axios'

const API_URL = 'https://23tg8v1m-3333.asse.devtunnels.ms/api/subject'

export const getSubjects = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`)
        return response.data
    } catch(err){
        throw new Error('Error getting faculties')
    }
}

export const addSubject = async (subject) => {
    try {
      const response = await axios.post(`${API_URL}/add`, subject);
      return true
    } catch (error) {
      return false
    }
}

export const deleteSubject = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`)
      return true
    } catch (error) {
      return false
    }
}

export const updateSubject = async (id, subject) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, subject)
      return true
    } catch (error) {
      return false
    }
}

export const getSubjectById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      return null
    }
}