import { useEffect, useState, useRef } from 'react'
import { Link, useParams  } from 'react-router-dom'
import { updateSemester, getSemesterById } from '../../services/semesterService'
import Toast from '../../components/Common/Toast'

function SemesterUpdate(){
    const { id } = useParams()    
    const formRef = useRef()
    const [semesterName, setSemesterName] = useState('')

    const [result, setResult] = useState(null)

    const [formData, setFormData] = useState({
        ten_hoc_ky: '',
        nien_khoa: '',
        ngay_bat_dau: '',
        ngay_ket_thuc: '',
    })

    useEffect(() => {
      async function fetchData(){
          const data = await getSemesterById(id)
          setFormData({
            ten_hoc_ky: data.ten_hoc_ky,
            nien_khoa: data.nien_khoa,
            ngay_bat_dau: data.ngay_bat_dau ? data.ngay_bat_dau.slice(0, 10) : "",
            ngay_ket_thuc: data.ngay_ket_thuc ? data.ngay_ket_thuc.slice(0, 10) : ""
          })
          setSemesterName(data.ten_hoc_ky)
      }
      fetchData()
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await updateSemester(id, formData)
            if(returnCheck === true){
                setResult(true)
            }
        }
        sentData()
    }

    return (
        <div className="view-data">
            <div className="view__title add">
                <h2>Update Semester - {semesterName}</h2>
                <Link to="/semester">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Tên học kỳ</h3>
                            <input name="ten_hoc_ky" value={formData.ten_hoc_ky || ''} onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Niên Khóa</h3>
                            <input name="nien_khoa" value={formData.nien_khoa || ''} onChange={handleChange} type="text" />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Ngày bắt đầu</h3>
                            <input name="ngay_bat_dau" value={formData.ngay_bat_dau || ''} onChange={handleChange} type="date" />
                        </div>
                        <div>
                            <h3>Ngày kết thúc</h3>
                            <input name="ngay_ket_thuc" value={formData.ngay_ket_thuc || ''} onChange={handleChange} type="date" />
                        </div>
                    </div>  
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Update</button>
                    <button type="button" onClick={() => {
                        setFormData({
                            ten_hoc_ky: '',
                            nien_khoa: '',
                            ngay_bat_dau: '',
                            ngay_ket_thuc: '',
                        });
                    }}>Reset</button>
                </div>
            </form>
            {result === true ? <Toast 
                                    type="success" 
                                    message= "Updated successfully" 
                                    onClose={() => setResult(null)}/> : 
                                '' }
            {result === false ? <Toast 
                                    type="error" 
                                    message= "Updated failed" 
                                    onClose={() => setResult(null)} /> : 
                                '' }
        </div>
    )
}

export default SemesterUpdate