import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { addSemester } from '../../services/semesterService'
import Toast from '../../components/Common/Toast'

function SemesterAdd(){
    const formRef = useRef()
    const [result, setResult] = useState(null)
    const [formData, setFormData] = useState({
        ten_hoc_ky: '',
        nien_khoa: '',
        ngay_bat_dau: '',
        ngay_ket_thuc: '',
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await addSemester(formData)
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
                <h2>Add New Semester</h2>
                <Link to="/semester">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Tên học kỳ</h3>
                            <input name="ten_hoc_ky" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Niên Khóa</h3>
                            <input name="nien_khoa" onChange={handleChange} type="text" />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Ngày bắt đầu</h3>
                            <input name="ngay_bat_dau" onChange={handleChange} type="date" />
                        </div>
                        <div>
                            <h3>Ngày kết thúc</h3>
                            <input name="ngay_ket_thuc" onChange={handleChange} type="date" />
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

export default SemesterAdd