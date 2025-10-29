import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSectionClasses, deleteSectionClass } from '../../services/sectionClassService'
import Toast from '../../components/Common/Toast'
import SubjectCell from '../../components/Common/SubjectGetName'
import TeacherCell from '../../components/Common/TeacherGetName'
import RoomCell from '../../components/Common/RoomGetName'
import SemesterCell from '../../components/Common/SemesterGetName'

function SectionClass(){
    const [sectionClasses, setSectionClasses] = useState([])
    const [result, setResult] = useState(null)

    // Phan trang
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [limit, setLimit] = useState(0)


    useEffect(() => {
        async function fetchData(){
            const data = await getSectionClasses()
            setSectionClasses(data)
        }
        fetchData()
    }, [])

    const handleDelete = (id) => {
        async function DeleteData(){
            const result = await deleteSectionClass(id)
            if(result === true){
                setResult(result)
                setSectionClasses(prev => 
                    prev.filter(sectionClass => sectionClass.id_lop_hoc_phan !== id)
                )
            }
        }
        DeleteData()
    }

    return (
        <div className="view-data">
            <div className="view__title">
                <h2>Quản Lý Lớp Học Phần</h2>
                <Link to="/sectionClass/add">
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
                            <th>Mã Lớp Học Phần</th>
                            <th>Môn Học</th>
                            <th>Giảng Viên</th>
                            <th>Phòng</th>
                            <th>Học Kỳ</th>
                            <th>Tổng Số Tiết LT</th>
                            <th>Tổng Số Tiết TH</th>
                            <th>Trạng Thái</th>
                            <th>Học Phí</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sectionClasses.map((sectionClass, index) => (
                        <tr key={index}>
                            <td>{sectionClass.ms_lop_hoc_phan}</td>
                            <td><SubjectCell Id={sectionClass.id_mon_hoc} /></td>
                            <td><TeacherCell teacherId={sectionClass.id_giang_vien} /></td>
                            <td><RoomCell Id={sectionClass.id_phong} /></td>
                            <td><SemesterCell Id={sectionClass.id_hoc_ky} /></td>
                            <td>{sectionClass.tong_so_tiet}</td>
                            <td>{sectionClass.tong_so_tiet_th}</td>
                            <td>{sectionClass.trang_thai}</td>
                            <td>{sectionClass.hoc_phi}</td>
                            <td>
                                <i class="fa-solid fa-trash"
                                    onClick={() => handleDelete(sectionClass.id_lop_hoc_phan)}
                                ></i>
                                <Link to={`/sectionClass/update/${sectionClass.id_lop_hoc_phan}`}>
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
                    Show <span>1</span> to <span>57</span> of <span>{sectionClasses.length}</span> entries
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

export default SectionClass