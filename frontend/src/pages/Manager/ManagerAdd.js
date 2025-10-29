import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { addManager } from '../../services/managerService'
import Toast from '../../components/Common/Toast'

function ManagerAdd(){
    const formRef = useRef()
    const [result, setResult] = useState(null)
    const [formData, setFormData] = useState({
        msm: '', ho_ten: '', ngay_sinh: '',
        gioi_tinh: '1', dia_chi: '', email: '',
        sdt: '', image: ''
    })

    const handleChange = (e) => {
        if(e.target.name === 'image'){
            setFormData({...formData, image: e.target.files[0]})
        }
        else{
            setFormData({...formData, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const dataToSend = new FormData()
        for(const key in formData){
            dataToSend.append(key, formData[key])
        }
        
        async function sentData(){
            try {
                const returnCheck = await addManager(dataToSend)
                if(returnCheck === true){
                    formRef.current.reset()
                    setResult(returnCheck)
                }
                else {
                    setResult(false)
                }
            } catch(e){
                setResult(false)
            }
        }
        sentData()
    }

    return (
        <div className="view-data">
            <div className="view__title add">
                <h2>Add New Manager</h2>
                <Link to="/manager">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>MSM</h3>
                            <input name="msm" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Ngày Sinh</h3>
                            <input name="ngay_sinh" onChange={handleChange} type="date" />
                        </div>
                        <div>
                            <h3>Địa Chỉ</h3>
                            <input name="dia_chi" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Số Điện Thoại</h3>
                            <input name="sdt" onChange={handleChange} type="number" />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Họ Tên</h3>
                            <input name="ho_ten" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Giới Tính</h3>
                            <select name="gioi_tinh" onChange={handleChange}>
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                            </select>
                        </div>
                        <div>
                            <h3>Email</h3>
                            <input name="email" onChange={handleChange} type="email" />
                        </div>
                        <div>
                            <h3>Hình Ảnh</h3>
                            <label></label>
                            <input name="image" onChange={handleChange} type="file" accept="image/*" />
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

export default ManagerAdd