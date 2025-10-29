import { useState, useEffect } from "react"
import { getClassById } from "../../services/classService"

function ClassCell({ classId }) {
  const [className, setClassName] = useState("Loading...")

  useEffect(() => {
    async function fetchClass() {
      try {
        const classs = await getClassById(classId)
        setClassName(classs.ten_lop)
      } catch (error) {
        console.error(error)
        setClassName("Error loading")
      }
    }
    fetchClass()
  }, [classId]) 

  return <span>{className}</span>
}

export default ClassCell