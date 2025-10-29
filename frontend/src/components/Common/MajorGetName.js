import { useState, useEffect } from "react"
import { getMajorById } from "../../services/majorService"

function Cell({ Id }) {
  const [name, setName] = useState("Loading...")

  useEffect(() => {
    async function fetch() {
      try {
        const object = await getMajorById(Id)
        setName(object.ten_nganh)
      } catch (error) {
        setName("Error loading")
      }
    }
    fetch()
  }, [Id]) 

  return <span>{name}</span>
}

export default Cell