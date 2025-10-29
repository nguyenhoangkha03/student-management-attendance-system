import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMajors, deleteMajor } from '../../services/majorService'
import { getFacultyById } from '../../services/facultyService'
import Toast from '../../components/Common/Toast'
import FacultyCell from '../../components/Common/FacultyGetName'

function Major(){
    const [majors, setMajors] = useState([])
    const [result, setResult] = useState(null)

    // Phan trang
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [limit, setLimit] = useState(0)


    useEffect(() => {
        async function fetchData(){
            const data = await getMajors()
            setMajors(data)
        }
        fetchData()
    }, [])

    const handleDelete = (id) => {
        async function DeleteData(){
            const result = await deleteMajor(id)
            if(result === true){
                setResult(result)
                setMajors(prev => 
                    prev.filter(major => major.id_nganh !== id)
                )
            }
        }
        DeleteData()
    }

    return (
        <div className="view-data">
            <div className="view__title">
                <h2>Quản Lý Ngành</h2>
                <Link to="/major/add">
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
                            <th>Mã Số Ngành</th>
                            <th>Tên Ngành</th>
                            <th>Số Tín Chỉ</th>
                            <th>Khoa</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {majors.map((major, index) => (
                        <tr key={index}>
                            <td>{major.msn}</td>
                            <td>{major.ten_nganh}</td>
                            <td>{major.tin_chi}</td>
                            <td>
                                <FacultyCell facultyId={major.id_khoa} />
                            </td>
                            <td>
                                <i class="fa-solid fa-trash"
                                    onClick={() => handleDelete(major.id_nganh)}
                                ></i>
                                <Link to={`/major/update/${major.id_nganh}`}>
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
                    Show <span>1</span> to <span>57</span> of <span>{majors.length}</span> entries
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

export default Major