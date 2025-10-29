import { useState, useEffect } from "react"
import { getClassById } from "../../service/classService"
import Loader from "./Loader/Loader"

function Cell({ Id }) {
  const [name, setName] = useState("Loading...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const object = await getClassById(Id)
        setName(object.ten_lop)
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