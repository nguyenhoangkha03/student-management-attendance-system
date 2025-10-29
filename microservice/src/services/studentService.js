import axios from "axios"

console.log("Axios:", axios)
const API_URL = 'https://23tg8v1m-3333.asse.devtunnels.ms/api/student'

export const getStudents = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`)
        return response.data
    } catch(err){
        throw new Error('Error getting students')
    }
}

export const addStudent = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data'}
      });
      return true
    } catch (error) {
      return false
    }
}

export const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return true
    } catch (error) {
      return false
    }
}

export const updateStudent = async (id, classs) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, classs)
      return true
    } catch (error) {
      return false
    }
}

export const getStudentById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
}

export const getStudentByIdClass = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/class/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
}

export const getStudentByIdClassAndIdSection = async (idClass, idSection) => {
  try {
    const response = await axios.get(`${API_URL}/class-section/${idClass}/${idSection}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export const getStudentByIdClassAndIdSectionAndIdSchedule = async (idClass, idSection, idSchedule) => {
  try {
    const response = await axios.get(`${API_URL}/class-section-schedule/${idClass}/${idSection}/${idSchedule}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export const getStudentByName = async (name) => {
    try {
      const response = await axios.get(`${API_URL}/name/${name}`);
      return response.data;
    } catch (error) {
      return null;
    }
}

export const getStudentByMssv = async (mssv) =>{
  try {
    const response = await axios.get(`${API_URL}/mssv/${mssv}`);
    return response.data;
  }catch{
    return null;
  }
}
