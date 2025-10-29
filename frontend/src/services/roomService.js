import axios from 'axios'

const API_URL = 'https://23tg8v1m-3333.asse.devtunnels.ms/api/room'

export const getRooms = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`)
        return response.data
    } catch(err){
        throw new Error('Error getting faculties')
    }
}

export const addRoom = async (room) => {
    try {
      const response = await axios.post(`${API_URL}/add`, room);
      return true
    } catch (error) {
      return false
    }
}

export const deleteRoom = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`)
      return true
    } catch (error) {
      return false
    }
}

export const updateRoom = async (id, room) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, room)
      return true
    } catch (error) {
      return false
    }
}

export const getRoomById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      return null
    }
}