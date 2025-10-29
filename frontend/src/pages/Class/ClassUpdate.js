import { useEffect, useState, useRef } from 'react'
import { Link, useParams  } from 'react-router-dom'
import { updateClass, getClassById } from '../../services/classService'
import Toast from '../../components/Common/Toast'
import DropMenuFalcuty from '../../components/Common/DropMenuFalcuty'
import DropMenuMajor from '../../components/Common/DropMenuMajor'

function ClassUpdate(){
    const { id } = useParams()    
    const formRef = useRef()
    const [className, setClassName] = useState('')

    const [result, setResult] = useState({
       message: '',
       type: null
    })

    const [formData, setFormData] = useState({
        ten_lop: '',
        khoa: '',
        so_luong_sv: '',
        nam: '',
        id_nganh: '',
        id_khoa: ''
    })

    useEffect(() => {
      async function fetchData(){
          const data = await getClassById(id)
          setFormData({
            ten_lop: data.ten_lop,
            khoa: data.khoa,
            so_luong_sv: data.so_luong_sv,
            nam: data.nam,
            id_nganh: data.id_nganh,
            id_khoa: data.id_khoa
          })
          setClassName(data.ten_lop)
      }
      fetchData()
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value);
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await updateClass(id, formData)
            if(returnCheck === true){
                setResult({
                  message: 'Update class successfully',
                  type:true
                })
            }
        }
        sentData()
    }

    return (
        <div className="view-data">
            <div className="view__title add">
                <h2>Update Class - {className}</h2>
                <Link to="/class">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Tên Lớp</h3>
                            <input name="ten_lop" value={formData.ten_lop || ''} onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Số Lượng SV</h3>
                            <input name="so_luong_sv" value={formData.so_luong_sv || ''} onChange={handleChange} type="number" />
                        </div>
                        <div>
                            <h3>Ngành</h3>
                            <DropMenuMajor valueUpdate={formData.id_nganh || ''} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Khóa</h3>
                            <input name="khoa" value={formData.khoa || ''} onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Năm</h3>
                            <input name="nam" value={formData.nam || ''} onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Khoa</h3>
                            <DropMenuFalcuty valueUpdate={formData.id_khoa || ''} onChange={handleChange} />
                        </div>
                    </div>  
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Update</button>
                    <button type="button" onClick={() => {
                        setFormData({
                            ten_lop: '',
                            khoa: '',
                            so_luong_sv: '',
                            nam: '',
                            id_nganh: '',
                            id_khoa: ''
                        });
                    }}>Reset</button>
                </div>
            </form>
            {result.type === true ? <Toast 
                                    type="success" 
                                    message={result.message}  
                                    onClose={() => setResult({ message: '',
                                      type: null })}/> : 
                                '' }
            {result.type === false ? <Toast 
                                    type="error" 
                                    message={result.message}  
                                    onClose={() => setResult({ message: '',
                                      type: null })} /> : 
                                '' }
        </div>
    )
}

export default ClassUpdate