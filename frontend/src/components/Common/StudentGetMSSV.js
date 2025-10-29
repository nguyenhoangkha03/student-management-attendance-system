import { useState, useEffect } from "react"
import { getStudentById } from "../../services/studentService"

function StudentCellMSSV({ studentId }) {
  const [studentMSSV, setStudentMSSV] = useState("Loading...")

  useEffect(() => {
    async function fetchStudent() {
      try {
        const student = await getStudentById(studentId)
        setStudentMSSV(student.mssv)
      } catch (error) {
        console.error(error)
        setStudentMSSV("Error loading")
      }
    }
    fetchStudent()
  }, [studentId]) 

  return <span>{studentMSSV}</span>
}

export default StudentCellMSSV