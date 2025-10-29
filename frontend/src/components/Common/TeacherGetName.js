import { useState, useEffect, memo } from "react"
import { getTeacherById } from "../../services/teacherService"

function TeacherCell({ teacherId }) {
  const [teacherName, setTeacherName] = useState("Loading...")

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const teacher = await getTeacherById(teacherId)
        setTeacherName(teacher.ho_ten)
      } catch (error) {
        console.error(error)
        setTeacherName("Error loading")
      }
    }
    fetchTeacher()
  }, [teacherId]) 

  return <span>{teacherName}</span>
}

export default memo(TeacherCell)

