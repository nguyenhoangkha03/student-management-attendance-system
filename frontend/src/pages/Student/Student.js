import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getStudents, deleteStudent } from '../../services/studentService'
import { format, parseISO } from 'date-fns'
import Toast from '../../components/Common/Toast'
import ClassCell from '../../components/Common/ClassGetName'

function Student(){
    const [students, setStudents] = useState([])
    const [result, setResult] = useState(null)

    // Phan trang
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [limit, setLimit] = useState(0)


    useEffect(() => {
        async function fetchData(){
            try {
                const data = await getStudents();
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error.message);
            }
        }
        fetchData()
    }, [])

    const handleDelete = (id) => {
        async function DeleteData(){
            const result = await deleteStudent(id)
            if(result === true){
                setResult(result)
                setStudents(prev => 
                    prev.filter(student => student.id_sinh_vien !== id)
                )
            }
        }
        DeleteData()
    }

    return (
        <div className="view-data">
            <div className="view__title">
                <h2>Student Management</h2>
                <Link to="/student/add">
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
                            <th>MSSV</th>
                            <th>Họ Tên</th>
                            <th>Ngày Sinh</th>
                            <th>Giới Tính</th>
                            <th>Địa Chỉ</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Lớp</th>
                            <th>Hình Ảnh</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.mssv}</td>
                            <td>{student.ho_ten}</td>
                            <td>{student.ngay_sinh
                                ? format(parseISO(student.ngay_sinh), 'dd/MM/yyyy')
                                : ''
                                }
                            </td>
                            <td>{student.gioi_tinh === 1 ? 'Nam' : 'Nữ'}</td>
                            <td>{student.dia_chi}</td>
                            <td>{student.email}</td>
                            <td>{student.sdt}</td>
                            <td>
                                <ClassCell classId={student.id_lop} />
                            </td>
                            <td>
                                
                                {student.image ? (
                                    <img src={student.image} alt="" />
                                ) : (
                                    'Không có Ảnh'
                                )}
                            </td>
                            <td>
                                <i class="fa-solid fa-trash"
                                    onClick={() => handleDelete(student.id_sinh_vien)}
                                ></i>
                                <Link to={`/student/update/${student.id_sinh_vien}`}>
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
                    Show <span>1</span> to <span>57</span> of <span>{students.length}</span> entries
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

export default Student


