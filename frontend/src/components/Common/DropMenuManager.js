import { useState, useEffect } from 'react'
import { getManagers } from '../../services/managerService'

export default function DropMenuManager({ valueUpdate, ref, onChange }){

    const [managers, setManagers] = useState([])
    useEffect(() => {
        async function fetchManager() {
            try {
                const data = await getManagers()
                setManagers(data)
            } catch (error) {
                setManagers([])
            }
        }
        fetchManager()
    }, []) 

    const handleSelectChange = (e) => {
        if (onChange) {
            onChange({ target: { name: "id_manager", value: e.target.value } });
        }
    };


    return (
        <select ref={ref} name="id_manager" onChange={handleSelectChange}>
            <option value="" key="">--Chọn Quản Lý--</option>
            {managers.map(manager => (
                valueUpdate === manager.id_manager ?
                <option selected value={manager.id_manager} key={manager.id_manager}>{manager.ho_ten}</option>
                                                :
                <option value={manager.id_manager} key={manager.id_manager}>{manager.ho_ten}</option>
            ))}
        </select>
    )
}