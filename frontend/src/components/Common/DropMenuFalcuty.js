import { useState, useEffect } from 'react'
import { getFaculties } from '../../services/facultyService'

export default function DropMenuFalcuty({ valueUpdate, onChange }){

    const [faculties, setFaculties] = useState([])
    useEffect(() => {
        async function fetchFaculty() {
            try {
                const data = await getFaculties()
                setFaculties(data)
            } catch (error) {
                console.error(error)
                setFaculties([])
            }
        }
        fetchFaculty()
    }, []) 

    const handleSelectChange = (e) => {
        if (onChange) {
            onChange({ target: { name: "id_khoa", value: e.target.value } });
        }
    };


    return (
        <select name="id_khoa" onChange={handleSelectChange}>
            <option value="" key="">--Chọn Khoa--</option>
            {faculties.map(faculty => (
                valueUpdate === faculty.id_khoa ?
                <option selected value={faculty.id_khoa} key={faculty.id_khoa}>{faculty.ten_khoa}</option>
                                                :
                <option value={faculty.id_khoa} key={faculty.id_khoa}>{faculty.ten_khoa}</option>
            ))}
        </select>
    )
}