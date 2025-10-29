import { useState, useEffect } from 'react'
import { getMajors } from '../../services/majorService'

export default function DropMenuMajor({ valueUpdate, onChange }){

    const [majors, setMajors] = useState([])
    useEffect(() => {
        async function fetchMajor() {
            try {
                const data = await getMajors()
                setMajors(data)
            } catch (error) {
                console.error(error)
                setMajors([])
            }
        }
        fetchMajor()
    }, []) 

    const handleSelectChange = (e) => {
        if (onChange) {
            onChange({ target: { name: "id_nganh", value: e.target.value } });
        }
    };


    return (
        <select name="id_nganh" onChange={handleSelectChange}>
            <option value="" key="">--Chọn Ngành--</option>
            {majors.map(major => (
                valueUpdate === major.id_nganh ?
                <option selected value={major.id_nganh} key={major.id_nganh}>{major.ten_nganh}</option>
                                                :
                <option value={major.id_nganh} key={major.id_nganh}>{major.ten_nganh}</option>
            ))}
        </select>
    )
}