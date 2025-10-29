import { useState, useEffect, memo } from "react"
import { getTeacherById } from "../../services/teacherService"

function TeacherCellMSGV({ teacherId }) {
  const [teacherMSGV, setTeacherMSGV] = useState("Loading...")
  console.log('re-render')
  useEffect(() => {
    async function fetchTeacher() {
      try {
        const teacher = await getTeacherById(teacherId)
        setTeacherMSGV(teacher.msgv)
      } catch (error) {
        console.error(error)
        setTeacherMSGV("Error loading")
      }
    }
    fetchTeacher()
  }, [teacherId]) 

  return <span>{teacherMSGV}</span>
}

export default memo(TeacherCellMSGV)