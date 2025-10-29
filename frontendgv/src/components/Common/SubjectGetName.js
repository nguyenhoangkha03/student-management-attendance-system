import { useState, useEffect, useRef } from "react"
import { getSubjectById } from "../../services/subjectService"
import Loader from "./Loader/Loader"

function Cell({ Id }) {
  const [name, setName] = useState("Loading...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const object = await getSubjectById(Id)
        setName(object.ten_mon)
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