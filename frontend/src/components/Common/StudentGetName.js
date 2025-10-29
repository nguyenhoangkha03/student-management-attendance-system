import { useState, useEffect } from "react"
import { getStudentById } from "../../services/studentService"

function StudentCellName({ studentId }) {
  const [studentName, setStudentName] = useState("Loading...")

  useEffect(() => {
    async function fetchStudent() {
      try {
        const student = await getStudentById(studentId)
        setStudentName(student.ho_ten)
      } catch (error) {
        console.error(error)
        setStudentName("Error loading")
      }
    }
    fetchStudent()
  }, [studentId]) 

  return <span>{studentName}</span>
}

export default StudentCellName