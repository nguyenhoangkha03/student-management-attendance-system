import { useState, useEffect } from 'react'
import { getTeachers } from '../../services/teacherService'

export default function DropMenuTeacher({ valueUpdate, ref, onChange }){

    const [teachers, setTeachers] = useState([])
    useEffect(() => {
        async function fetchTeacher() {
            try {
                const data = await getTeachers()
                setTeachers(data)
            } catch (error) {
                console.error(error)
                setTeachers([])
            }
        }
        fetchTeacher()
    }, []) 

    const handleSelectChange = (e) => {
        if (onChange) {
            onChange({ target: { name: "id_giang_vien", value: e.target.value } });
        }
    };


    return (
        <select ref={ref} name="id_giang_vien" onChange={handleSelectChange}>
            <option value="" key="">--Chọn Giảng Viên--</option>
            {teachers.map(teacher => (
                valueUpdate === teacher.id_giang_vien ?
                <option selected value={teacher.id_giang_vien} key={teacher.id_giang_vien}>{teacher.ho_ten}</option>
                                                :
                <option value={teacher.id_giang_vien} key={teacher.id_giang_vien}>{teacher.ho_ten}</option>
            ))}
        </select>
    )
}