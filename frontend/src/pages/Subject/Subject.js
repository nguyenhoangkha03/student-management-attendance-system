import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSubjects, deleteSubject } from '../../services/subjectService'
import Toast from '../../components/Common/Toast'

function Subject(){
    const [subjects, setSubjects] = useState([])
    const [result, setResult] = useState(null)

    // Phan trang
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [limit, setLimit] = useState(0)

    useEffect(() => {
        async function fetchData(){
            const data = await getSubjects()
            setSubjects(data)
        }
        fetchData()
    }, [])

    const handleDelete = (id) => {
        async function DeleteData(){
            const result = await deleteSubject(id)
            if(result === true){
                setResult(result)
                setSubjects(prev => 
                    prev.filter(subject => subject.id_mon_hoc !== id)
                )
            }
        }
        DeleteData()
    }

    return (
        <div className="view-data">
            <div className="view__title">
                <h2>Subject Management</h2>
                <Link to="/subject/add">
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
            <div className="view__body faculty">
                <table>
                    <thead>
                        <tr>
                            <th>MSM</th>
                            <th>Tên Môn</th>
                            <th>Số Tín Chỉ Lý Thuyết</th>
                            <th>Số Tín Chỉ Thực Hành</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {subjects.map((subject, index) => (
                        <tr key={index}>
                            <td>{subject.ma_mon_hoc}</td>
                            <td>{subject.ten_mon}</td>
                            <td>{subject.so_tc_lt}</td>
                            <td>{subject.so_tc_th}</td>
                            <td>
                                <i class="fa-solid fa-trash"
                                    onClick={() => handleDelete(subject.id_mon_hoc)}
                                ></i>
                                <Link to={`/subject/update/${subject.id_mon_hoc}`}>
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
                    Show <span>1</span> to <span>57</span> of <span>{subjects.length}</span> entries
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

export default Subject