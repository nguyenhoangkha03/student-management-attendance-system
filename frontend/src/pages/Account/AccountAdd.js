import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { addAccount } from '../../services/accountService'
import Toast from '../../components/Common/Toast'
import DropMenuTeacher from '../../components/Common/DropMenuTeacher'
import DropMenuStudent from '../../components/Common/DropMenuStudent'
import DropMenuManager from '../../components/Common/DropMenuManager'
import ButtonBack from '../../components/Common/ButtonBack/ButtonBack'
function AccountAdd(){
    const formRef = useRef()
    const [result, setResult] = useState(null)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        vai_tro: '',
        trang_thai: '1',
        id_giang_vien: '',
        id_sinh_vien: '',
        id_manager: ''
    })

    const refTeacher = useRef(null)
    const refStudent = useRef(null)
    const refManager = useRef(null)

    const handleChange = (e) => {
        if(e.target.name === 'id_giang_vien'){
            setFormData({...formData, vai_tro: 'teacher', id_giang_vien: e.target.value, id_sinh_vien: '', id_manager: ''})
            refStudent.current.selectedIndex = 0
            refManager.current.selectedIndex = 0
        }
        else if(e.target.name === 'id_sinh_vien'){
            setFormData({...formData, vai_tro: 'student', id_sinh_vien: e.target.value, id_giang_vien: '', id_manager: ''})
            refTeacher.current.selectedIndex = 0
            refManager.current.selectedIndex = 0
        }
        else if(e.target.name === 'id_manager'){
            setFormData({...formData, vai_tro: 'manager', id_manager: e.target.value, id_giang_vien: '', id_sinh_vien: ''})
            refStudent.current.selectedIndex = 0
            refTeacher.current.selectedIndex = 0
        }
        else {
            setFormData({...formData, [e.target.name]: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await addAccount(formData)
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
            <h2 className='text-xl'>Thêm Mới Tài Khoản</h2>
                <Link to="/account">
                    <ButtonBack>Trở Về</ButtonBack>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Username</h3>
                            <input name="username" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Password</h3>
                            <input name="password" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Vai Trò</h3>
                            <input readOnly value={formData.vai_tro} name='vai_tro' type="text" />
                        </div>
                        <div>
                            <h3>Trạng Thái</h3>
                            <select onChange={handleChange} name="trang_thai">
                                <option value="1" key="active">Hoạt động</option>
                                <option value="0" key="inactive">Không hoạt động</option>
                            </select>
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Quản Lý</h3>
                            <DropMenuManager ref={refManager} onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Giảng Viên</h3>
                            <DropMenuTeacher ref={refTeacher} onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Sinh Viên</h3>
                            <DropMenuStudent ref={refStudent} onChange={handleChange} />
                        </div>
                    </div>  
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Lưu</button>
                    <button type="button" onClick={() => {
                        formRef.current.reset()
                    }}>Tạo mới</button>
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

export default AccountAdd