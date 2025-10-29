import { useState, useEffect } from 'react'
import { getRooms } from '../../services/roomService'

export default function DropMenuRoom({ valueUpdate, ref, onChange }){

    const [rooms, setRooms] = useState([])
    useEffect(() => {
        async function fetchRoom() {
            try {
                const data = await getRooms()
                setRooms(data)
            } catch (error) {
                setRooms([])
            }
        }
        fetchRoom()
    }, []) 

    const handleSelectChange = (e) => {
        if (onChange) {
            onChange({ target: { name: "id_phong", value: e.target.value } });
        }
    };


    return (
        <select ref={ref} name="id_phong" onChange={handleSelectChange}>
            <option value="" key="">--Chọn Phòng Học--</option>
            {rooms.map(room => (
                valueUpdate === room.id_phong ?
                <option selected value={room.id_phong} key={room.id_phong}>{room.ten_phong}</option>
                                                :
                <option value={room.id_phong} key={room.id_phong}>{room.ten_phong}</option>
            ))}
        </select>
    )
}