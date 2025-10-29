import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { addRoom } from '../../services/roomService'
import Toast from '../../components/Common/Toast'

function RoomAdd(){
    const formRef = useRef()
    const [result, setResult] = useState(null)
    const [formData, setFormData] = useState({
        ten_phong: '',
        so_cho: '',
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await addRoom(formData)
            if(returnCheck === true){
                formRef.current.reset()
                setResult(returnCheck)
            }
        }
        sentData()
    }

    return (
        <div className="view-data">
            <div className="view__title add">
                <h2>Add New Room</h2>
                <Link to="/room">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Tên phòng</h3>
                            <input name="ten_phong" onChange={handleChange} type="text" />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Số chỗ</h3>
                            <input name="so_cho" onChange={handleChange} type="number" />
                        </div>
                    </div>  
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Add</button>
                    <button type="button" onClick={() => {
                        formRef.current.reset()
                    }}>Reset</button>
                </div>
            </form>
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

export default RoomAdd