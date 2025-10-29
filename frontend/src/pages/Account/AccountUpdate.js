import { useEffect, useState, useRef } from 'react'
import { Link, useParams  } from 'react-router-dom'
import { updateAccount, getAccountById } from '../../services/accountService'
import Toast from '../../components/Common/Toast'
import DropMenuTeacher from '../../components/Common/DropMenuTeacher'
import DropMenuStudent from '../../components/Common/DropMenuStudent'
import DropMenuManager from '../../components/Common/DropMenuManager'
import ButtonBack from '../../components/Common/ButtonBack/ButtonBack'

function AccountUpdate(){
    const { id } = useParams()    
    const formRef = useRef()
    const [username, setUsername] = useState('')

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

    useEffect(() => {
      async function fetchData(){
          const data = await getAccountById(id)
          console.log(data)
          setFormData({
            username: data.username,
            password: data.password,
            vai_tro: data.vai_tro,
            trang_thai: data.trang_thai,
            id_giang_vien: data.id_giang_vien,
            id_sinh_vien: data.id_sinh_vien,
            id_manager: data.id_manager
          })
          setUsername(data.username)
      }
      fetchData()
    }, [])

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
            const returnCheck = await updateAccount(id, formData)
            if(returnCheck === true){
                setResult(true)
            }
        }
        sentData()
    }

    return (
        <div className="view-data">
            <div className="view__title add">
                <h2 className='text-xl'>Cập Nhật Tài Khoản - {username}</h2>
                <Link to="/account">
                    <ButtonBack>Back</ButtonBack>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Username</h3>
                            <input name="username" value={formData.username} onChange={handleChange} type="text" />
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
                            {formData.trang_thai === 1
                            ?
                                <select onChange={handleChange} name="trang_thai">
                                    <option value="1" selected key="active">Hoạt động</option>
                                    <option value="0" key="inactive">Không hoạt động</option>
                                </select>
                            :
                                <select onChange={handleChange} name="trang_thai">
                                    <option value="1" key="active">Hoạt động</option>
                                    <option value="0" selected key="inactive">Không hoạt động</option>
                                </select>
                            }
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Quản Lý</h3>
                            <DropMenuManager valueUpdate={formData.id_manager || ''} ref={refManager} onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Giảng Viên</h3>
                            <DropMenuTeacher valueUpdate={formData.id_giang_vien || ''} ref={refTeacher} onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Sinh Viên</h3>
                            <DropMenuStudent valueUpdate={formData.id_sinh_vien || ''} ref={refStudent} onChange={handleChange} />
                        </div>
                    </div>  
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Lưu</button>
                    <button type="button" onClick={() => {
                        setFormData({
                            username: '',
                            password: '',
                            vai_tro: '',
                            trang_thai: '1',
                            id_giang_vien: '',
                            id_sinh_vien: '',
                            id_manager: ''
                        });
                    }}>Làm Mới</button>
                </div>
            </form>
            {result === true ? <Toast 
                                    type="success" 
                                    message="Update Success"  
                                    onClose={() => setResult(true)}/> : 
                                '' }
            {result === false ? <Toast 
                                    type="error" 
                                    message="Update Failure"  
                                    onClose={() => setResult(false)} /> : 
                                '' }
        </div>
    )
}

export default AccountUpdate