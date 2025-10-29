import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteAccount, getManagerAccounts, getTeacherAccounts, getStudentAccounts } from '../../services/accountService'
import { getTeachers } from '../../services/teacherService'
import { getStudents } from '../../services/studentService'
import { getManagers } from '../../services/managerService'
import Toast from '../../components/Common/Toast'
import ButtonOpenAdd from '../../components/Common/ButtonOpenAdd/ButtonOpenAdd'

import TableAccountTeacher from './TableAccountTeacher'
import TableAccountStudent from './TableAccountStudent'
import TableAccountManager from './TableAccountManager'

function Account(){
    const [result, setResult] = useState(null)
    const [type, setType] = useState('teacher')
    const [accounts, setAccounts] = useState([])
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])
    const [managers, setManagers] = useState([])

    // Phan trang
    
    
    useEffect(() => {
        async function getDataTeachers(){
            const data = await getTeachers()
            setTeachers(data)
        }
        getDataTeachers()

        async function getDataStudents(){
            const data = await getStudents()
            setStudents(data)
        }
        getDataStudents()

        async function getDataManagers(){
            const data = await getManagers()
            setManagers(data)
        }
        getDataManagers()
    }, [])

    useEffect(() => {
        if(type === 'teacher'){
            async function fetchData(){
                const data = await getTeacherAccounts()
                setAccounts(data)
            }
            fetchData()
        }
        else if(type === 'manager'){
            async function fetchData(){
                const data = await getManagerAccounts()
                setAccounts(data)
            }
            fetchData()
        }
        else{
            async function fetchData(){
                const data = await getStudentAccounts()
                setAccounts(data)
            }
            fetchData()
        }
        
    }, [type])

    const handleDelete = (id) => {
        async function DeleteData(){
            const result = await deleteAccount(id)
            if(result === true){
                setResult(result)
                setAccounts(prev => 
                    prev.filter(account => account.id_tai_khoan !== id)
                )
            }
        }
        DeleteData()
    }

    const handleSelect = (e) => {
        setType(e.target.value)
    }

    return (
        <div className="view-data">
            <div className="view__title">
                <h2 className='text-xl'>Quản Lý Tài Khoản</h2>
                <Link to="/account/add">
                    <ButtonOpenAdd>Thêm Mới</ButtonOpenAdd>
                </Link>
            </div>
            <div className="view__top">
                <div className="view__top__entries">
                    Hiển thị
                    <select>
                        <option value="10" key="10">10</option>
                        <option value="25" key="25">25</option>
                        <option value="50" key="50">50</option>
                        <option value="100" key="100">100</option>
                    </select>
                    mục
                </div>
                <div className="view__top__type">
                    {type === 'manager'
                    ?
                        <select onChange={handleSelect}>
                            <option value="manager" selected  key="manager">Quản lý</option>
                            <option value="teacher"  key="teacher">Giảng viên</option>
                            <option value="student"  key="student">Sinh viên</option>
                        </select>
                    :
                        type === 'teacher'?
                            <select onChange={handleSelect}>
                                <option value="manager"  key="manager">Quản lý</option>
                                <option value="teacher" selected  key="teacher">Giảng viên</option>
                                <option value="student"  key="student">Sinh viên</option>
                            </select>
                        :
                            <select onChange={handleSelect}>
                                <option value="manager"  key="manager">Quản lý</option>
                                <option value="teacher"  key="teacher">Giảng viên</option>
                                <option value="student" selected  key="student">Sinh viên</option>
                            </select>
                    }
                </div>
                <div className="view__top__search">
                    Tìm kiếm:
                    <input type="text" placeholder='Tìm tài khoản...' />
                </div>
            </div>
            <div className="view__body">
            {type === 'manager'
                ?
                    <TableAccountManager accountManagers={accounts} handleDelete={handleDelete} managers={managers} /> 
                :
                    type === 'teacher'?
                        <TableAccountTeacher accountTeachers={accounts} handleDelete={handleDelete} teachers={teachers} /> 
                    :
                        <TableAccountStudent accountStudents={accounts} handleDelete={handleDelete} students={students} /> 
            }
            </div>
            <div className="view__bottom">
                <div className="view__bottom__total">
                    Hiển thị <span>1</span> đến <span>57</span> trong <span>{accounts.length}</span> mục
                </div>
                <div className="view__bottom__pagination">
                    <button disabled>Trước</button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>Sau</button>
                </div>
            </div>
            
            {result === true ? <Toast 
                                    type="success" 
                                    message="Delete successfully"  
                                    onClose={() => setResult(null)}/> : 
                                '' }
            {result === false ? <Toast 
                                    type="error" 
                                    message="Delete error"  
                                    onClose={() => setResult(null)} /> : 
                                '' }
        </div>
    )
}

export default Account