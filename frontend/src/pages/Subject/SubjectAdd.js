import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { addSubject } from '../../services/subjectService'
import Toast from '../../components/Common/Toast'

function SubjectAdd(){
    const formRef = useRef()
    const [result, setResult] = useState(null)
    const [formData, setFormData] = useState({
        ma_mon_hoc: '',
        ten_mon: '',
        so_tc_lt: '',
        so_tc_th: '',
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await addSubject(formData)
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
                <h2>Add New Subject</h2>
                <Link to="/subject">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Mã môn học</h3>
                            <input name="ma_mon_hoc" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Tên môn</h3>
                            <input name="ten_mon" onChange={handleChange} type="text" />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Số tín chỉ lý thuyết</h3>
                            <input name="so_tc_lt" onChange={handleChange} type="number" />
                        </div>
                        <div>
                            <h3>Số tín chỉ thực hành</h3>
                            <input name="so_tc_th" onChange={handleChange} type="number" />
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

export default SubjectAdd