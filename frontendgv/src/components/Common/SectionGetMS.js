import { useState, useEffect } from "react"
import { getSectionClassById } from "../../services/sectionClassService"
import Loader from "./Loader/Loader"

function Cell({ Id }) {
  const [name, setName] = useState("Loading...")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const object = await getSectionClassById(Id)
        setName(object.ms_lop_hoc_phan)
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