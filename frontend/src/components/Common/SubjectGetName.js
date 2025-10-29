import { useState, useEffect } from "react"
import { getSubjectById } from "../../services/subjectService"

function Cell({ Id }) {
  const [name, setName] = useState("Loading...")

  useEffect(() => {
    async function fetch() {
      try {
        const object = await getSubjectById(Id)
        setName(object.ten_mon)
      } catch (error) {
        setName("Error loading")
      }
    }
    fetch()
  }, [Id]) 

  return <span>{name}</span>
}

export default Cell