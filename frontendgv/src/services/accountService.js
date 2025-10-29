import axios from 'axios'

const API_URL = 'https://23tg8v1m-3333.asse.devtunnels.ms/api/account'

export const getAccounts = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`)
        return response.data
    } catch(err){
        throw new Error('Error getting accounts')
    }
}

export const getTeacherAccounts = async () => {
  try {
      const response = await axios.get(`${API_URL}/list/teacher`)
      return response.data
  } catch(err){
      throw new Error('Error getting accounts')
  }
}

export const getStudentAccounts = async () => {
  try {
      const response = await axios.get(`${API_URL}/list/student`)
      return response.data
  } catch(err){
      throw new Error('Error getting accounts')
  }
}

export const getManagerAccounts = async () => {
  try {
      const response = await axios.get(`${API_URL}/list/manager`)
      return response.data
  } catch(err){
      throw new Error('Error getting accounts')
  }
}

export const addAccount = async (account) => {
    try {
      const response = await axios.post(`${API_URL}/add`, account);
      return true
    } catch (error) {
      return false
    }
}

export const deleteAccount = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return true
  } catch (error) {
    return false
  }
}

export const updateAccount = async (id, account) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, account)
    return true
  } catch (error) {
    console.error('Error updating account:', error)
    return false
  }
}

export const getAccountById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching account by ID:', error);
    return null;
  }
}

export const login = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, formData);
    return response
  } catch (error) {
    return false
  }
}
