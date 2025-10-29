import { useState, useEffect } from 'react'
import { getSemesters } from '../../services/semesterService'

export default function DropMenuSemester({ valueUpdate, ref, onChange }){

    const [semesters, setSemesters] = useState([])
    useEffect(() => {
        async function fetchSemester() {
            try {
                const data = await getSemesters()
                setSemesters(data)
            } catch (error) {
                setSemesters([])
            }
        }
        fetchSemester()
    }, []) 

    const handleSelectChange = (e) => {
        if (onChange) {
            onChange({ target: { name: "id_hoc_ky", value: e.target.value } });
        }
    };


    return (
        <select ref={ref} name="id_hoc_ky" onChange={handleSelectChange}>
            <option value="" key="">--Chọn Học Kỳ--</option>
            {semesters.map(semester => (
                valueUpdate === semester.id_hoc_ky ?
                <option selected value={semester.id_hoc_ky} key={semester.id_hoc_ky}>{semester.ten_hoc_ky}</option>
                                                :
                <option value={semester.id_hoc_ky} key={semester.id_hoc_ky}>{semester.ten_hoc_ky}</option>
            ))}
        </select>
    )
}