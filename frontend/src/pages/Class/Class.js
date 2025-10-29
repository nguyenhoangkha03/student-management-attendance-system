import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getClasses, deleteClass } from '../../services/classService'
import Toast from '../../components/Common/Toast'
import FacultyCell from '../../components/Common/FacultyGetName'
import MajorCell from '../../components/Common/MajorGetName'

function Classs(){
    const [classes, setClasses] = useState([])
    const [result, setResult] = useState(null)

    // Phan trang
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [limit, setLimit] = useState(0)


    useEffect(() => {
        async function fetchData(){
            const data = await getClasses()
            setClasses(data)
        }
        fetchData()
    }, [])

    const handleDelete = (id) => {
        async function DeleteData(){
            const result = await deleteClass(id)
            if(result === true){
                setResult(result)
                setClasses(prev => 
                    prev.filter(classs => classs.id_lop !== id)
                )
            }
        }
        DeleteData()
    }

    return (
        <div className="view-data">
            <div className="view__title">
                <h2>Class Management</h2>
                <Link to="/class/add">
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
                            <th>Tên Lớp</th>
                            <th>Khóa</th>
                            <th>Số Lượng SV</th>
                            <th>Năm</th>
                            <th>Ngành</th>
                            <th>Khoa</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {classes.map((classs, index) => (
                        <tr key={index}>
                            <td>{classs.ten_lop}</td>
                            <td>{classs.khoa}</td>
                            <td>{classs.so_luong_sv}</td>
                            <td>{classs.nam}</td>
                            <td>
                                <MajorCell Id={classs.id_nganh} />
                            </td>
                            <td>
                                <FacultyCell facultyId={classs.id_khoa} />
                            </td>
                            <td>
                                <i class="fa-solid fa-trash"
                                    onClick={() => handleDelete(classs.id_lop)}
                                ></i>
                                <Link to={`/class/update/${classs.id_lop}`}>
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
                    Show <span>1</span> to <span>57</span> of <span>{classes.length}</span> entries
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