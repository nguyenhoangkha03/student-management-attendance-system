import axios from 'axios'

const API_URL = 'https://23tg8v1m-3333.asse.devtunnels.ms/api/schedule'

export const getSchedules = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`)
        return response.data
    } catch(err){
        throw new Error('Error getting faculties')
    }
}

export const getJoinSchedulesByIdClass = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/class/${id}`)
        return response.data
    } catch(err){
        throw new Error('Error getting faculties')
    }
}

export const getJoinSchedulesByIdTeacher = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/teacher/${id}`)
        return response.data
    } catch(err){
        throw new Error('Error getting faculties')
    }
}

export const addSchedule = async (schedule) => {
    try {
      const response = await axios.post(`${API_URL}/add`, schedule);
      return true
    } catch (error) {
      return false
    }
}

export const deleteSchedule = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`)
      return true
    } catch (error) {
      return false
    }
}

export const updateSchedule = async (id, schedule) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, schedule)
      return true
    } catch (error) {
      return false
    }
}

export const getScheduleById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error) {
      return null
    }
}

export const getCountScheduleByIdStudentAndIdSemester = async (idStudent, idSemester) => {
  try {
    const response = await axios.get(`${API_URL}/count-schedule/${idStudent}/${idSemester}`)
    return response.data
  } catch (error) {
    return null
  }
}

export const getScheduleByIdSectionAndIdClassAndDay = async (idSection, idClass) => {
  try {
    const response = await axios.get(`${API_URL}/section-class/${idSection}/${idClass}`)
    return response.data
  } catch (error) {
    return null
  }
}