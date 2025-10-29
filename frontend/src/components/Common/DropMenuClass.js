import { useState, useEffect } from 'react'
import { getClasses } from '../../services/classService'

export default function DropMenuClass({ valueUpdate, onChange }){

    const [classes, setClasses] = useState([])
    useEffect(() => {
        async function fetchClass() {
            try {
                const data = await getClasses()
                setClasses(data)
            } catch (error) {
                console.error(error)
                setClasses([])
            }
        }
        fetchClass()
    }, []) 

    const handleSelectChange = (e) => {
        if (onChange) {
            onChange({ target: { name: "id_lop", value: e.target.value } });
        }
    };


    return (
        <select name="id_lop" onChange={handleSelectChange}>
            <option selected value="">--Chọn Lớp--</option>
            {classes.map(classs => (
                valueUpdate === classs.id_lop ?
                <option selected value={classs.id_lop} key={classs.id_lop}>{classs.ten_lop}</option>
                                                :
                <option value={classs.id_lop} key={classs.id_lop}>{classs.ten_lop}</option>
            ))}
        </select>
    )
}