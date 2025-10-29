import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { addMajors } from '../../services/majorService'
import Toast from '../../components/Common/Toast'
import DropMenuFalcuty from '../../components/Common/DropMenuFalcuty'
function MajorAdd(){
    const formRef = useRef()
    const [result, setResult] = useState(null)
    const [formData, setFormData] = useState({
        msn: '',
        ten_nganh: '',
        tin_chi: '',
        id_khoa: ''
    })

    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await addMajors(formData)
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
                <h2>Thêm Mới Ngành</h2>
                <Link to="/major">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Mã Số Ngành</h3>
                            <input name="msn" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Tên Ngành</h3>
                            <input name="ten_nganh" onChange={handleChange} type="text" />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Tín Chỉ</h3>
                            <input name="tin_chi" onChange={handleChange} type="number" />
                        </div>
                        <div>
                            <h3>Khoa</h3>
                            <DropMenuFalcuty onChange={handleChange} />
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

export default MajorAdd