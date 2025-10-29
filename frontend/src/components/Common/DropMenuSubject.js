import { useState, useEffect } from 'react'
import { getSubjects } from '../../services/subjectService'

export default function DropMenuSubject({ valueUpdate, ref, onChange }){

    const [subjects, setSubjects] = useState([])
    useEffect(() => {
        async function fetchSubject() {
            try {
                const data = await getSubjects()
                setSubjects(data)
            } catch (error) {
                setSubjects([])
            }
        }
        fetchSubject()
    }, []) 

    const handleSelectChange = (e) => {
        if (onChange) {
            onChange({ target: { name: "id_mon_hoc", value: e.target.value } });
        }
    };


    return (
        <select ref={ref} name="id_mon_hoc" onChange={handleSelectChange}>
            <option value="" key="">--Chọn Môn Học--</option>
            {subjects.map(subject => (
                valueUpdate === subject.id_mon_hoc ?
                <option selected value={subject.id_mon_hoc} key={subject.id_mon_hoc}>{subject.ten_mon}</option>
                                                :
                <option value={subject.id_mon_hoc} key={subject.id_mon_hoc}>{subject.ten_mon}</option>
            ))}
        </select>
    )
}