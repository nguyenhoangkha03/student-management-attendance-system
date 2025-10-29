import { useState, useEffect } from "react"
import { getSemesterById } from "../../services/semesterService"

function Cell({ Id }) {
  const [name, setName] = useState("Loading...")

  useEffect(() => {
    async function fetch() {
      try {
        const object = await getSemesterById(Id)
        setName(object.ten_hoc_ky)
      } catch (error) {
        setName("Error loading")
      }
    }
    fetch()
  }, [Id]) 

  return <span>{name}</span>
}

export default Cell