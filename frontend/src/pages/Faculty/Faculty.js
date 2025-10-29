import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFaculties, deleteFaculty } from '../../services/facultyService'
import { format, parseISO } from 'date-fns'
import Toast from '../../components/Common/Toast'

function Faculty(){
    const [faculties, setFaculties] = useState([])
    const [result, setResult] = useState(null)

    // Phan trang
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [limit, setLimit] = useState(0)


    useEffect(() => {
        async function fetchData(){
            const data = await getFaculties()
            setFaculties(data)
            setTotal(result)
        }
        fetchData()
    }, [])

    useEffect(() => {
        
    })

    const handleDelete = (id) => {
        async function DeleteData(){
            const result = await deleteFaculty(id)
            if(result === true){
                setResult(result)
                setFaculties(prev => 
                    prev.filter(faculty => faculty.id_khoa !== id)
                )
            }
        }
        DeleteData()
    }

    return (
        <div className="view-data">
            <div className="view__title faculty">
                <h2>Faculty Management</h2>
                <Link to="/faculty/add">
                    <button>Add New</button>
                </Link>
            </div>
            <div className="view__top faculty">
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
            <div className="view__body faculty">
                <table>
                    <thead>
                        <tr>
                            <th>Tên Khoa</th>
                            <th>Mô Tả</th>
                            <th>Ngày Thành Lập</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {faculties.map((faculty, index) => (
                        <tr key={index}>
                            <td>{faculty.ten_khoa}</td>
                            <td>{faculty.mo_ta}</td>
                            <td>{faculty.ngay_thanh_lap
                                    ? format(parseISO(faculty.ngay_thanh_lap), 'dd/MM/yyyy')
                                    :
                                    ''
                                }</td>
                            <td>
                                <i class="fa-solid fa-trash"
                                    onClick={() => handleDelete(faculty.id_khoa)}
                                ></i>
                                <Link to={`/faculty/update/${faculty.id_khoa}`}>
                                    <i class="fa-solid fa-pen"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="view__bottom faculty">
                <div className="view__bottom__total">
                    Show <span>1</span> to <span>57</span> of <span>{faculties.length}</span> entries
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

export default Faculty