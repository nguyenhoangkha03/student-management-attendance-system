import { useState, useEffect } from "react"
import { getSectionClassById } from "../../services/sectionClassService"
import SubjectCell from "../../components/Common/SubjectGetName"

function cell({ Id }) { 
  const [section, setSection] = useState({})
  const [ms, setMs] = useState("Loading...")

  useEffect(() => {
    async function fetchMs() {
      try {
        const sectionClass = await getSectionClassById(Id)
        setSection(sectionClass)
        setMs(sectionClass.ma_lop_hoc_phan)
      } catch (error) {
        setMs("Error loading")
      }
    }
    fetchMs()
  }, [Id]) 

  return (
    <>
        <td>{ms}</td>
        <td><SubjectCell Id={section.id_mon_hoc} /></td>
    </>
  )
}

export default cell
