import axios from 'axios'

const API_URL = 'https://23tg8v1m-3333.asse.devtunnels.ms/api/sectionClass'

export const getSectionClasses = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`)
        return response.data
    } catch(err){
        throw new Error('Error getting classes')
    }
}

export const addSectionClass = async (classs) => {
    try {
      const response = await axios.post(`${API_URL}/add`, classs);
      return true
    } catch (error) {
      return false
    }
}

export const deleteSectionClass = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return true
    } catch (error) {
      return false
    }
}

export const updateSectionClass = async (id, classs) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, classs)
      return true
    } catch (error) {
      return false
    }
}

export const getSectionClassById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
}