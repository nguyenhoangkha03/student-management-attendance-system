import { useState, useEffect } from "react"
import { getSemesterById } from "../../service/semesterService"

function Cell({ Id }) {
  const [name, setName] = useState("Loading...")

  useEffect(() => {
    async function fetch() {
      try {
        const object = await getSemesterById(Id)
        setName(object.ten_hoc_ky + ' - (' + object.nien_khoa + ')')
      } catch (error) {
        setName("Error loading")
      }
    }
    fetch()
  }, [Id]) 

  return <span>{name}</span>
}

export default Cell