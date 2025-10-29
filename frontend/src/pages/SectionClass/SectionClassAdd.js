import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { addSectionClass } from '../../services/sectionClassService'
import Toast from '../../components/Common/Toast'
import DropMenuTeacher from '../../components/Common/DropMenuTeacher'
import DropMenuSubject from '../../components/Common/DropMenuSubject'
import DropMenuRoom from '../../components/Common/DropMenuRoom'
import DropMenuSemester from '../../components/Common/DropMenuSemester'
function ClassAdd(){
    const formRef = useRef()
    const [result, setResult] = useState(null)
    const [formData, setFormData] = useState({
        ms_lop_hoc_phan: '',
        id_mon_hoc: '',
        id_giang_vien: '',
        id_phong: '',
        id_hoc_ky: '',
        tong_so_tiet: '',
        tong_so_tiet_th: '',
        trang_thai: '1',
        hoc_phi: ''
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await addSectionClass(formData)
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
                <h2>Tạo Mới Lớp Học Phần</h2>
                <Link to="/sectionClass">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Mã Lớp Học Phần</h3>
                            <div>
                                <input name="ms_lop_hoc_phan" onChange={handleChange} type="number" />
                            </div>
                        </div>
                        <div>
                            <h3>Môn Học</h3>
                            <DropMenuSubject onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Giảng Viên</h3>
                            <DropMenuTeacher onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Phòng Học</h3>
                            <DropMenuRoom onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Học Kỳ</h3>
                            <DropMenuSemester onChange={handleChange} />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Tổng Số Tiết Lý Thuyết</h3>
                            <div>
                                <input name="tong_so_tiet" onChange={handleChange} type="number" />
                            </div>
                        </div>
                        <div>
                            <h3>Tổng Số Tiết Thực Hành</h3>
                            <div>
                                <input name="tong_so_tiet_th" onChange={handleChange} type="number" />
                            </div>
                        </div>
                        <div>
                            <h3>Trạng Thái</h3>
                            <select onChange={handleChange} name="trang_thai">
                                <option value="1" key="active">Active</option>
                                <option value="0" key="inactive">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <h3>Học Phí</h3>
                            <div>
                                <input name="hoc_phi" onChange={handleChange} type="number" />
                            </div>
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