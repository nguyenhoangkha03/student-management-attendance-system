import { useEffect, useState, useRef } from 'react'
import { Link, useParams  } from 'react-router-dom'
import { updateMajor, getMajorById } from '../../services/majorService'
import Toast from '../../components/Common/Toast'
import DropMenuFalcuty from '../../components/Common/DropMenuFalcuty'

function ClassUpdate(){
    const { id } = useParams()    
    const formRef = useRef()
    const [majorName, setMajorName] = useState('')

    const [result, setResult] = useState(null)

    const [formData, setFormData] = useState({
        msn: '',
        ten_nganh: '',
        tin_chi: '',
        id_khoa: ''
    })

    useEffect(() => {
      async function fetchData(){
          const data = await getMajorById(id)
          setFormData({
            msn: data.msn,
            ten_nganh: data.ten_nganh,
            tin_chi: data.tin_chi,
            id_khoa: data.id_khoa
          })
          setMajorName(data.ten_nganh)
      }
      fetchData()
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await updateMajor(id, formData)
            if(returnCheck === true){
                setResult(true)
            }
            else {
                setResult(false)
            }
        }
        sentData()
    }

    return (
        <div className="view-data">
            <div className="view__title add">
                <h2>Update Major - {majorName}</h2>
                <Link to="/major">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Mã Số Ngành</h3>
                            <input value={formData.msn || ''} name="msn" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Tên Ngành</h3>
                            <input value={formData.ten_nganh || ''} name="ten_nganh" onChange={handleChange} type="text" />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Tín Chỉ</h3>
                            <input value={formData.tin_chi || ''} name="tin_chi" onChange={handleChange} type="number" />
                        </div>
                        <div>
                            <h3>Khoa</h3>
                            <DropMenuFalcuty onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Update</button>
                    <button type="button" onClick={() => {
                        setFormData({
                            msn: '',
                            ten_nganh: '',
                            tin_chi: '',
                            id_khoa: ''
                        });
                    }}>Reset</button>
                </div>
            </form>
            {result === true ? <Toast 
                                    type="success" 
                                    message="Updated successfully" 
                                    onClose={() => setResult(null)}/> : 
                                '' }
            {result === false ? <Toast 
                                    type="error" 
                                    message="Update failed"  
                                    onClose={() => setResult(null)} /> : 
                                '' }
        </div>
    )
}

export default ClassUpdate