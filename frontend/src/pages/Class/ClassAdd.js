import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { addClass } from '../../services/classService'
import Toast from '../../components/Common/Toast'
import DropMenuFalcuty from '../../components/Common/DropMenuFalcuty'
import DropMenuMajor from '../../components/Common/DropMenuMajor'
function ClassAdd(){
    const formRef = useRef()
    const [result, setResult] = useState(null)
    const [formData, setFormData] = useState({
        ten_lop: '',
        khoa: '',
        so_luong_sv: '',
        nam: '',
        id_nganh: '',
        id_khoa: ''
    })

    const handleChange = (e) => {
        console.log(e.target.value);
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await addClass(formData)
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
                <h2>Thêm Mới Lớp Học</h2>
                <Link to="/class">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Tên Lớp</h3>
                            <input name="ten_lop" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Số Lượng SV</h3>
                            <input name="so_luong_sv" onChange={handleChange} type="number" />
                        </div>
                        <div>
                            <h3>Ngành</h3>
                            <DropMenuMajor onChange={handleChange} />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Khóa</h3>
                            <input name="khoa" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Năm</h3>
                            <input name="nam" onChange={handleChange} type="text" />
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

export default ClassAdd