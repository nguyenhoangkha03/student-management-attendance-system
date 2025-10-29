import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { updateTeacher, getTeacherById } from '../../services/teacherService'
import Toast from '../../components/Common/Toast'
import DropMenuFalcuty from '../../components/Common/DropMenuFalcuty'
function ClassAdd(){
    const { id } = useParams()  

    const formRef = useRef()
    const [className, setClassName] = useState('')
    const [result, setResult] = useState(null)
    const [formData, setFormData] = useState({
        msgv: '', ho_ten: '', ngay_sinh: '',
        gioi_tinh: '1', dia_chi: '', email: '',
        sdt: '', id_khoa: '1', image: null
    })
    const [imageShow, setImageShow] = useState('')

    useEffect(() => {
        async function fetchData(){
            const data = await getTeacherById(id)
            console.log('gt', data.gioi_tinh)
            setFormData({
                msgv: data.msgv, ho_ten: data.ho_ten, ngay_sinh: data.ngay_sinh ? data.ngay_sinh.slice(0, 10) : "",
                gioi_tinh: data.gioi_tinh, dia_chi: data.dia_chi, email: data.email,
                sdt: data.sdt, id_khoa: data.id_khoa, image: null
            })
            setImageShow(data.imageBase64)
            setClassName(data.ho_ten)
        }
        fetchData()
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value)
        if(e.target.name === 'image'){
            setFormData({...formData, image: e.target.files[0]})
        }
        else{
            setFormData({...formData, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        console.log(formData)
        const dataToSend = new FormData()
        for(const key in formData){
            dataToSend.append(key, formData[key])
        }
        
        async function sentData(){
            try {
                const returnCheck = await updateTeacher(id, dataToSend)
                if(returnCheck === true){
                    formRef.current.reset()
                    setResult(true)
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
                <h2>Update Teacher - {className}</h2>
                <Link to="/teacher">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>MSGV</h3>
                            <input name="msgv" value={formData.msgv || ''} onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Ngày Sinh</h3>
                            <input name="ngay_sinh" value={formData.ngay_sinh || ''} onChange={handleChange} type="date" />
                        </div>
                        <div>
                            <h3>Địa Chỉ</h3>
                            <input name="dia_chi" value={formData.dia_chi || ''} onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Số Điện Thoại</h3>
                            <input name="sdt" value={formData.sdt || ''} onChange={handleChange} type="number" />
                        </div>
                        <div>
                            <h3>Khoa</h3>
                            <DropMenuFalcuty valueUpdate={formData.id_khoa || ''} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Họ Tên</h3>
                            <input name="ho_ten" value={formData.ho_ten || ''} onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Giới Tính</h3>
                            {formData.gioi_tinh === 1
                            ?
                                <select name="gioi_tinh" onChange={handleChange}>
                                    <option selected value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                </select>
                            :
                                <select name="gioi_tinh" onChange={handleChange}>
                                    <option value="1">Nam</option>
                                    <option selected value="0">Nữ</option>
                                </select>
                            }
                        </div>
                        <div>
                            <h3>Email</h3>
                            <input name="email" value={formData.email || ''} onChange={handleChange} type="email" />
                        </div>
                        <div>
                            <h3>Hình Ảnh</h3>
                            <label></label>
                            <input name="image" onChange={handleChange} type="file" accept="image/*" />
                        </div>
                        <div>
                            <img src={imageShow} alt="" />
                        </div>
                    </div>  
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Update</button>
                    <button type="button" onClick={() => {
                        formRef.current.reset()
                    }}>Reset</button>
                </div>
            </form>
            {result === true ? <Toast 
                                    type="success" 
                                    message="Update successfully"  
                                    onClose={() => setResult(null)}/> : 
                                '' }
            {result === false ? <Toast 
                                    type="error" 
                                    message="Update error"  
                                    onClose={() => setResult(null)} /> : 
                                '' }
        </div>
    )
}

export default ClassAdd