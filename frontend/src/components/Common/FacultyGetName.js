import { useState, useEffect } from "react"
import { getFacultyById } from "../../services/facultyService"

function FacultyCell({ facultyId }) {
  const [facultyName, setFacultyName] = useState("Loading...")

  useEffect(() => {
    async function fetchFaculty() {
      try {
        const faculty = await getFacultyById(facultyId)
        setFacultyName(faculty.ten_khoa)
      } catch (error) {
        console.error(error)
        setFacultyName("Error loading")
      }
    }
    fetchFaculty()
  }, [facultyId]) 

  return <span>{facultyName}</span>
}

export default FacultyCell