import { useState, useEffect } from "react"
import { getRoomById } from "../../services/roomService"

function Cell({ Id }) {
  const [name, setName] = useState("Loading...")

  useEffect(() => {
    async function fetch() {
      try {
        const object = await getRoomById(Id)
        setName(object.ten_phong)
      } catch (error) {
        setName("Error loading")
      }
    }
    fetch()
  }, [Id]) 

  return <span>{name}</span>
}

export default Cell