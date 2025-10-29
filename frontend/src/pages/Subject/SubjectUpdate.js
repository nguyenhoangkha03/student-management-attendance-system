import { useEffect, useState, useRef } from 'react'
import { Link, useParams  } from 'react-router-dom'
import { updateSubject, getSubjectById } from '../../services/subjectService'
import Toast from '../../components/Common/Toast'
function SubjectUpdate(){
    const { id } = useParams()    
    const formRef = useRef()
    const [subjectName, setSubjectName] = useState('')

    const [result, setResult] = useState(null)

    const [formData, setFormData] = useState({
        ma_mon_hoc: '',
        ten_mon: '',
        so_tc_lt: '',
        so_tc_th: '',
    })

    useEffect(() => {
      async function fetchData(){
          const data = await getSubjectById(id)
          setFormData({
            ma_mon_hoc: data.ma_mon_hoc,
            ten_mon: data.ten_mon,
            so_tc_lt: data.so_tc_lt,
            so_tc_th: data.so_tc_th,
          })
          setSubjectName(data.ten_mon)
      }
      fetchData()
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await updateSubject(id, formData)
            if(returnCheck === true){
                setResult(true)
            }
        }
        sentData()
    }

    return (
        <div className="view-data">
            <div className="view__title add">
                <h2>Update Subject - {subjectName}</h2>
                <Link to="/subject">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Mã môn học</h3>
                            <input name="ma_mon_hoc" value={formData.ma_mon_hoc || ''} onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Tên môn</h3>
                            <input name="ten_mon" value={formData.ten_mon || ''} onChange={handleChange} type="text" />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Số tín chỉ lý thuyết</h3>
                            <input name="so_tc_lt" value={formData.so_tc_lt || ''} onChange={handleChange} type="number" />
                        </div>
                        <div>
                            <h3>Số tín chỉ thực hành</h3>
                            <input name="so_tc_th" value={formData.so_tc_th || ''} onChange={handleChange} type="number" />
                        </div>
                    </div>  
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Update</button>
                    <button type="button" onClick={() => {
                        setFormData({
                            ma_mon_hoc: '',
                            ten_mon: '',
                            so_tc_lt: '',
                            so_tc_th: '',
                        })
                    }}>Reset</button>
                </div>
            </form>
            {result === true ? <Toast 
                                    type="success" 
                                    message= "Update successfully"
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

export default SubjectUpdate