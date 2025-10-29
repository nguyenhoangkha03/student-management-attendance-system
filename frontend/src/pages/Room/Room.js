import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRooms, deleteRoom } from '../../services/roomService'
import Toast from '../../components/Common/Toast'

function Room(){
    const [rooms, setRooms] = useState([])
    const [result, setResult] = useState(null)

    // Phan trang
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [limit, setLimit] = useState(0)


    useEffect(() => {
        async function fetchData(){
            const data = await getRooms()
            setRooms(data)
        }
        fetchData()
    }, [])

    const handleDelete = (id) => {
        async function DeleteData(){
            const result = await deleteRoom(id)
            if(result === true){
                setResult(result)
                setRooms(prev => 
                    prev.filter(room => room.id_phong !== id)
                )
            }
        }
        DeleteData()
    }

    return (
        <div className="view-data">
            <div className="view__title">
                <h2>Room Management</h2>
                <Link to="/room/add">
                    <button>Add New</button>
                </Link>
            </div>
            <div className="view__top">
                <div className="view__top__entries">
                    Show
                    <select>
                        <option value="10" key="10">10</option>
                        <option value="25" key="25">25</option>
                        <option value="50" key="50">50</option>
                        <option value="100" key="100">100</option>
                    </select>
                    entries
                </div>
                <div className="view__top__search">
                    Search:
                    <input type="text" />
                </div>
            </div>
            <div className="view__body faculty">
                <table>
                    <thead>
                        <tr>
                            <th>Tên Phòng</th>
                            <th>Số Chỗ</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {rooms.map((room, index) => (
                        <tr key={index}>
                            <td>{room.ten_phong}</td>
                            <td>{room.so_cho}</td>
                            <td>
                                <i class="fa-solid fa-trash"
                                    onClick={() => handleDelete(room.id_phong)}
                                ></i>
                                <Link to={`/room/update/${room.id_phong}`}>
                                    <i class="fa-solid fa-pen"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="view__bottom">
                <div className="view__bottom__total">
                    Show <span>1</span> to <span>57</span> of <span>{rooms.length}</span> entries
                </div>
                <div className="view__bottom__pagination">
                    <button disabled>Previous</button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>Next</button>
                </div>
            </div>
            
            {result === true ? <Toast 
                                    type="success" 
                                    message="Add successfully"  
                                    onClose={() => setResult(null)}/> : 
                                '' }
            {result === false ? <Toast 
                                    type="error" 
                                    message="Add error"  
                                    onClose={() => setResult(null)} /> : 
                                '' }
        </div>
    )
}

export default Room