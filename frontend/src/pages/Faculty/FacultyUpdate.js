import { useEffect, useState, useRef } from 'react'
import { Link, useParams  } from 'react-router-dom'
import '../Account/Account.css'
import '../Account/AccountAdd.css'
import { updateFaculty, getFacultyById } from '../../services/facultyService'
import Toast from '../../components/Common/Toast'

function FacultyUpdate(){
    const { id } = useParams()    
    const formRef = useRef()
    const [facultyName, setFacultyName] = useState('')

    const [result, setResult] = useState(null)

    const [formData, setFormData] = useState({
        ten_khoa: '',
        mo_ta: '',
        ngay_thanh_lap: '',
    })

    useEffect(() => {
      async function fetchData(){
          const data = await getFacultyById(id)
          setFormData({
            ten_khoa: data.ten_khoa,
            mo_ta: data.mo_ta,
            ngay_thanh_lap: data.ngay_thanh_lap ? data.ngay_thanh_lap.slice(0, 10) : ""
          })
          setFacultyName(data.ten_khoa)
      }
      fetchData()
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await updateFaculty(id, formData)
            if(returnCheck === true){
                setResult(true)
            }
        }
        sentData()
    }

    return (
        <div className="view-data">
            <div className="view__title add">
                <h2>Update Faculty - {facultyName}</h2>
                <Link to="/faculty">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Name</h3>
                            <input name="ten_khoa" value={formData.ten_khoa || ''} onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Founding data</h3>
                            <input name="ngay_thanh_lap" value={formData.ngay_thanh_lap || ''} onChange={handleChange} type="date" />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Description</h3>
                            <input name="mo_ta" value={formData.mo_ta || ''} onChange={handleChange} type="text" />
                        </div>
                    </div>  
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Update</button>
                    <button type="button" onClick={() => {
                        setFormData({
                          ten_khoa: '',
                          mo_ta: '',
                          ngay_thanh_lap: ''
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

export default FacultyUpdate