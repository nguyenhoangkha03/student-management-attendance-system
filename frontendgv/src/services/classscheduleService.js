import axios from 'axios'

const API_URL = 'https://23tg8v1m-3333.asse.devtunnels.ms/api/schedule'

export const getClassSchedule = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`)
        return response.data
    } catch(err){
        throw new Error('Error getting classesSchedule')
    }
}


export const getClassScheduleById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/class/date/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
}

export const getClassScheduleByClassIdAndDate = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/class/date/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
}