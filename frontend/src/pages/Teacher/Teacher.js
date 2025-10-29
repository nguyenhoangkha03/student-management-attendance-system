import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getTeachers, deleteTeacher } from '../../services/teacherService'
import { format, parseISO } from 'date-fns'
import Toast from '../../components/Common/Toast'
import FacultyCell from '../../components/Common/FacultyGetName'

function Classs(){
    const [teachers, setTeachers] = useState([])
    const [result, setResult] = useState(null)

    // Phan trang
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [limit, setLimit] = useState(0)


    useEffect(() => {
        async function fetchData(){
            const data = await getTeachers()
            console.log(data); 
            setTeachers(data)
        }
        fetchData()
    }, [])

    const handleDelete = (id) => {
        async function DeleteData(){
            const result = await deleteTeacher(id)
            if(result === true){
                setResult(result)
                setTeachers(prev => 
                    prev.filter(teacher => teacher.id_giang_vien !== id)
                )
            }
        }
        DeleteData()
    }

    return (
        <div className="view-data">
            <div className="view__title">
                <h2>Teacher Management</h2>
                <Link to="/teacher/add">
                    <button>Add New</button>
                </Link>
            </div>
            <div className="view__top">
                <div className="view__top__entries">
                    Show
                    <select>
                        <option value="10" key="10">10</option>
                        <option value="25" key="25">25</option>
                        <option value="50" key="50">50</option>
                        <option value="100" key="100">100</option>
                    </select>
                    entries
                </div>
                <div className="view__top__search">
                    Search:
                    <input type="text" />
                </div>
            </div>
            <div className="view__body">
                <table>
                    <thead>
                        <tr>
                            <th>MSGV</th>
                            <th>Họ Tên</th>
                            <th>Ngày Sinh</th>
                            <th>Giới Tính</th>
                            <th>Địa Chỉ</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Khoa</th>
                            <th>Hình Ảnh</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {teachers.map((teacher, index) => (
                        <tr key={index}>
                            <td>{teacher.msgv}</td>
                            <td>{teacher.ho_ten}</td>
                            <td>{teacher.ngay_sinh
                                    ? format(parseISO(teacher.ngay_sinh), 'dd/MM/yyyy')
                                    :
                                    ''
                                }</td>
                            <td>{teacher.gioi_tinh === 1 ? 'Nam' : 'Nữ'}</td>
                            <td>{teacher.dia_chi}</td>
                            <td>{teacher.email}</td>
                            <td>{teacher.sdt}</td>
                            <td>
                                <FacultyCell facultyId={teacher.id_khoa} />
                            </td>
                            <td>
                                
                                {teacher.image ? (
                                    <img src={teacher.image} alt="" />
                                ) : (
                                    'Không có Ảnh'
                                )}
                            </td>
                            <td>
                                <i class="fa-solid fa-trash"
                                    onClick={() => handleDelete(teacher.id_giang_vien)}
                                ></i>
                                <Link to={`/teacher/update/${teacher.id_giang_vien}`}>
                                    <i class="fa-solid fa-pen"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="view__bottom">
                <div className="view__bottom__total">
                    Show <span>1</span> to <span>57</span> of <span>{teachers.length}</span> entries
                </div>
                <div className="view__bottom__pagination">
                    <button disabled>Previous</button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>Next</button>
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

export default Classs