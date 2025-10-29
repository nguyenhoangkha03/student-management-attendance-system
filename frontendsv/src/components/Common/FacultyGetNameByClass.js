import { useState, useEffect } from "react"
import { getClassById } from "../../service/classService"
import { getFacultyById } from '../../service/facultyService'

function Cell({ Id }) {
  const [name, setName] = useState("Loading...")

  useEffect(() => {
    async function fetch() {
      try {
        const objectClass = await getClassById(Id)
        async function fetchFaculty() {
            try {
              const object = await getFacultyById(objectClass.id_khoa)
              setName(object.ten_khoa)
            } catch (error) {
              setName("Error loading")
            }
        }
        fetchFaculty()
      } catch (error) {
        setName("Error loading")
      }
    }
    fetch()
  }, [Id]) 

  return <span>{name}</span>
}

export default Cell