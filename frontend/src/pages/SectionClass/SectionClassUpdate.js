import { useEffect, useState, useRef } from 'react'
import { Link, useParams  } from 'react-router-dom'
import { updateSectionClass, getSectionClassById } from '../../services/sectionClassService'
import Toast from '../../components/Common/Toast'
import DropMenuTeacher from '../../components/Common/DropMenuTeacher'
import DropMenuSubject from '../../components/Common/DropMenuSubject'
import DropMenuRoom from '../../components/Common/DropMenuRoom'
import DropMenuSemester from '../../components/Common/DropMenuSemester'

function SectionClassUpdate(){
    const { id } = useParams()    
    const formRef = useRef()
    const [className, setClassName] = useState('')

    const [result, setResult] = useState(null)

    const [formData, setFormData] = useState({
        ms_lop_hoc_phan: '',
        id_mon_hoc: '',
        id_giang_vien: '',
        id_phong: '',
        id_hoc_ky: '',
        tong_so_tiet: '',
        tong_so_tiet_th: '',
        trang_thai: '1',
        hoc_phi: ''
    })

    useEffect(() => {
      async function fetchData(){
          const data = await getSectionClassById(id)
          setFormData({
            ms_lop_hoc_phan: data.ms_lop_hoc_phan,
            id_mon_hoc: data.id_mon_hoc,
            id_giang_vien: data.id_giang_vien,
            id_phong: data.id_phong,
            id_hoc_ky: data.id_hoc_ky,
            tong_so_tiet: data.tong_so_tiet,
            tong_so_tiet_th: data.tong_so_tiet_th,
            trang_thai: data.trang_thai,
            hoc_phi: data.hoc_phi
          })
          setClassName(data.id_lop_hoc_phan)
      }
      fetchData()
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await updateSectionClass(id, formData)
            if(returnCheck === true){
                setResult(true)
            }
        }
        sentData()
    }

    return (
        <div className="view-data">
            <div className="view__title add">
                <h2>Cập Nhật Lớp Học Phần ID - {className}</h2>
                <Link to="/sectionClass">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Mã Lớp Học Phần</h3>
                            <div>
                                <input value={formData.ms_lop_hoc_phan || ''} name="tong_so_tiet" onChange={handleChange} type="number" />
                            </div>
                        </div>
                        <div>
                            <h3>Môn Học</h3>
                            <DropMenuSubject valueUpdate={formData.id_mon_hoc || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Giảng Viên</h3>
                            <DropMenuTeacher valueUpdate={formData.id_giang_vien || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Phòng Học</h3>
                            <DropMenuRoom valueUpdate={formData.id_phong || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Học Kỳ</h3>
                            <DropMenuSemester valueUpdate={formData.id_hoc_ky || ''} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Tổng Số Tiết Lý Thuyết</h3>
                            <div>
                                <input value={formData.tong_so_tiet || ''} name="tong_so_tiet" onChange={handleChange} type="number" />
                            </div>
                        </div>
                        <div>
                            <h3>Tổng Số Tiết Thực Hành</h3>
                            <div>
                                <input value={formData.tong_so_tiet_th || ''} name="tong_so_tiet" onChange={handleChange} type="number" />
                            </div>
                        </div>
                        <div>
                            <h3>Trạng Thái</h3>
                            {formData.trang_thai === 1
                            ?
                                <select onChange={handleChange} name="trang_thai">
                                    <option value="1" selected key="active">Active</option>
                                    <option value="0" key="inactive">Inactive</option>
                                </select>
                            :
                                <select onChange={handleChange} name="trang_thai">
                                    <option value="1" key="active">Active</option>
                                    <option value="0" selected key="inactive">Inactive</option>
                                </select>
                            }
                        </div>
                        <div>
                            <h3>Học Phí</h3>
                            <div>
                                <input value={formData.hoc_phi || ''} name="hoc_phi" onChange={handleChange} type="number" />
                            </div>
                        </div>
                    </div>  
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Update</button>
                    <button type="button" onClick={() => {
                        setFormData({
                            ms_lop_hoc_phan: '',
                            id_mon_hoc: '',
                            id_giang_vien: '',
                            id_phong: '',
                            id_hoc_ky: '',
                            tong_so_tiet: '',
                            tong_so_tiet_th: '',
                            trang_thai: '1',
                            hoc_phi: ''
                        });
                    }}>Reset</button>
                </div>
            </form>
            {result === true ? <Toast 
                                    type="success" 
                                    message= "Updated Success"
                                    onClose={() => setResult(null)}/> : 
                                '' }
            {result === false ? <Toast 
                                    type="error" 
                                    message= "Update failed"   
                                    onClose={() => setResult(null)} /> : 
                                '' }
        </div>
    )
}

export default SectionClassUpdate