import { useState, useEffect } from "react"
import { getRoomById } from "../../service/roomService"
import Loader from "./Loader/Loader"

function Cell({ Id }) {
  const [name, setName] = useState("Loading...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const object = await getRoomById(Id)
        setName(object.ten_phong)
      } catch (error) {
        setName("Error loading")
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [Id]) 

  if(loading) {
    return <Loader />
  }
  
  return <span>{name}</span>
}

export default Cell