import { useEffect, useState, useRef } from 'react'
import { Link, useParams  } from 'react-router-dom'
import { updateRoom, getRoomById } from '../../services/roomService'
import Toast from '../../components/Common/Toast'
function RoomUpdate(){
    const { id } = useParams()    
    const formRef = useRef()
    const [roomName, setRoomName] = useState('')

    const [result, setResult] = useState(null)

    const [formData, setFormData] = useState({
        ten_phong: '',
        so_cho: ''
    })

    useEffect(() => {
      async function fetchData(){
          const data = await getRoomById(id)
          setFormData({
            ten_phong: data.ten_phong,
            so_cho: data.so_cho,
          })
          setRoomName(data.ten_phong)
      }
      fetchData()
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await updateRoom(id, formData)
            if(returnCheck === true){
                setResult(true)
            }
        }
        sentData()
    }

    return (
        <div className="view-data">
            <div className="view__title add">
                <h2>Update Room - {roomName}</h2>
                <Link to="/room">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Tên phòng</h3>
                            <input name="ten_phong" value={formData.ten_phong || ''} onChange={handleChange} type="text" />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Số chỗ</h3>
                            <input name="so_cho" value={formData.so_cho || ''} onChange={handleChange} type="text" />
                        </div>
                    </div>  
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Update</button>
                    <button type="button" onClick={() => {
                        setFormData({
                          ten_phong: '',
                          so_cho: ''
                        });
                    }}>Reset</button>
                </div>
            </form>
            {result === true ? <Toast 
                                    type="success" 
                                    message= "Update successfully"
                                    onClose={() => setResult(null)}/> : 
                                '' }
            {result === false ? <Toast 
                                    type="error" 
                                    message= "Update failed" 
                                    onClose={() => setResult(null)} /> : 
                                '' }
        </div>
    )
}

export default RoomUpdate