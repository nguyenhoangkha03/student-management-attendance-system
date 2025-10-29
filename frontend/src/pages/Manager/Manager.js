import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getManagers, deleteManager } from '../../services/managerService'
import { format, parseISO } from 'date-fns'
import Toast from '../../components/Common/Toast'

function Manager(){
    const [managers, setManagers] = useState([])
    const [result, setResult] = useState(null)


    // Phan trang
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentItems, setCurrentItems] = useState([])
    const [firstItemIndex, setFirstItemIndex] = useState(0)
    const [lastItemIndex, setLastItemIndex] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    let indexOfLastItem = ''
    let indexOfFirstItem = ''

    useEffect(() => {
        indexOfLastItem = currentPage * itemsPerPage
        indexOfFirstItem = indexOfLastItem - itemsPerPage
        setCurrentItems(managers.slice(indexOfFirstItem, indexOfLastItem))
        setTotalPages(Math.ceil(managers.length / itemsPerPage))

        setFirstItemIndex((currentPage - 1) * itemsPerPage + 1)
        setLastItemIndex(Math.min(currentPage * itemsPerPage, managers.length))
    }, [managers, currentPage])


    useEffect(() => {
        async function fetchData(){
            const data = await getManagers()
            setManagers(data)
        }
        fetchData()
    }, [])

    const handleDelete = (id) => {
        async function DeleteData(){
            const result = await deleteManager(id)
            if(result === true){
                setResult(result)
                setManagers(prev => 
                    prev.filter(manager => manager.id_manager !== id)
                )
            }
        }
        DeleteData()
    }

    if(managers.length === 0) {
        return <p>Không có dữ li</p>
    }

    return (
        <div className="view-data">
            <div className="view__title">
                <h2>Manager Management</h2>
                <Link to="/manager/add">
                    <button>Add New</button>
                </Link>
            </div>
            <div className="view__top">
                <div className="view__top__entries">
                    Show
                    <select onChange={(e) => {
                        setItemsPerPage(e.target.value)
                        setCurrentPage(1)
                    }}>
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
                            <th>MSM</th>
                            <th>Họ Tên</th>
                            <th>Ngày Sinh</th>
                            <th>Giới Tính</th>
                            <th>Địa Chỉ</th>
                            <th>Email</th>
                            <th>SĐT</th>
                            <th>Hình Ảnh</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((manager, index) => (
                        <tr key={index}>
                            <td>{manager.msm}</td>
                            <td>{manager.ho_ten}</td>
                            <td>{manager.ngay_sinh
                                    ? format(parseISO(manager.ngay_sinh), 'dd/MM/yyyy')
                                    :
                                    ''
                                }</td>
                            <td>{manager.gioi_tinh === 1 ? 'Nam' : 'Nữ'}</td>
                            <td>{manager.dia_chi}</td>
                            <td>{manager.email}</td>
                            <td>{manager.sdt}</td>
                            <td>
                                
                                {manager.image ? (
                                    <img src={manager.image} alt="" />
                                ) : (
                                    'Không có Ảnh'
                                )}
                            </td>
                            <td>
                                <i class="fa-solid fa-trash"
                                    onClick={() => handleDelete(manager.id_manager)}
                                ></i>
                                <Link to={`/manager/update/${manager.id_manager}`}>
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
                    Hiển thị <span>{firstItemIndex}</span> đến <span>{lastItemIndex}</span> trong <span>{managers.length}</span> mục
                </div>
                <div className="view__bottom__pagination">
                    <button 
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >Trước</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                            key={number}
                            onClick={() => setCurrentPage(number)}
                            style={{ backgroundColor: currentPage === number ? 'lightblue' : 'white' }}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >Sau</button>
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

export default Manager