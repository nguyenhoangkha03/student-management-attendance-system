import { useState, useEffect } from "react"
import { getTeacherById } from "../../service/teacherService"
import Loader from "./Loader/Loader"

function Cell({ Id }) {
  const [name, setName] = useState("Loading...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const object = await getTeacherById(Id)
        setName(object.ho_ten)
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