import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSemesters, deleteSemester } from '../../services/semesterService'
import { format, parseISO } from 'date-fns'
import Toast from '../../components/Common/Toast'

function Semester(){
    const [semesters, setSemesters] = useState([])
    const [result, setResult] = useState(null)

    // Phan trang
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [limit, setLimit] = useState(0)


    useEffect(() => {
        async function fetchData(){
            const data = await getSemesters()
            setSemesters(data)
            setTotal(result)
        }
        fetchData()
    }, [])

    const handleDelete = (id) => {
        async function DeleteData(){
            const result = await deleteSemester(id)
            if(result === true){
                setResult(result)
                setSemesters(prev => 
                    prev.filter(semester => semester.id_hoc_ky !== id)
                )
            }
        }
        DeleteData()
    }

    return (
        <div className="view-data">
            <div className="view__title">
                <h2>Semester Management</h2>
                <Link to="/semester/add">
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
                            <th>Tên Học Kỳ</th>
                            <th>Niên Khóa</th>
                            <th>Ngày Bắt Đầu</th>
                            <th>Ngày Kết Thúc</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {semesters.map((semester, index) => (
                        <tr key={index}>
                            <td>{semester.ten_hoc_ky}</td>
                            <td>{semester.nien_khoa}</td>
                            <td>{semester.ngay_bat_dau
                                    ? format(parseISO(semester.ngay_bat_dau), 'dd/MM/yyyy')
                                    :
                                    ''
                                }</td>
                            <td>{semester.ngay_ket_thuc
                                    ? format(parseISO(semester.ngay_ket_thuc), 'dd/MM/yyyy')
                                    :
                                    ''
                                }</td>
                            <td>
                                <i class="fa-solid fa-trash"
                                    onClick={() => handleDelete(semester.id_hoc_ky)}
                                ></i>
                                <Link to={`/semester/update/${semester.id_hoc_ky}`}>
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
                    Show <span>1</span> to <span>57</span> of <span>{semesters.length}</span> entries
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

export default Semester