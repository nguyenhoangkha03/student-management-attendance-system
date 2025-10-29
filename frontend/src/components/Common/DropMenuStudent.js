import { useState, useEffect } from 'react'
import { getStudents } from '../../services/studentService'

export default function DropMenuStudent({ valueUpdate, ref, onChange }){

    const [students, setStudents] = useState([])
    useEffect(() => {
        async function fetchStudent() {
            try {
                const data = await getStudents()
                setStudents(data)
            } catch (error) {
                console.error(error)
                setStudents([])
            }
        }
        fetchStudent()
    }, []) 

    const handleSelectChange = (e) => {
        if (onChange) {
            onChange({ target: { name: "id_sinh_vien", value: e.target.value } });
        }
    };


    return (
        <select ref={ref} name="id_sinh_vien" onChange={handleSelectChange}>
            <option value="" key="">--Chọn Sinh Viên--</option>
            {students.map(student => (
                valueUpdate === student.id_sinh_vien ?
                <option selected value={student.id_sinh_vien} key={student.id_sinh_vien}>{student.ho_ten}</option>
                                                :
                <option value={student.id_sinh_vien} key={student.id_sinh_vien}>{student.ho_ten}</option>
            ))}
        </select>
    )
}