import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../Account/Account.css'
import '../Account/AccountAdd.css'
import { addFaculty } from '../../services/facultyService'
import Toast from '../../components/Common/Toast'
function Faculty(){
    const formRef = useRef()
    const [result, setResult] = useState(null)
    const [formData, setFormData] = useState({
        ten_khoa: '',
        mo_ta: '',
        ngay_thanh_lap: '',
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        async function sentData(){
            const returnCheck = await addFaculty(formData)
            if(returnCheck === true){
                formRef.current.reset()
                setResult(returnCheck)
            }
        }
        sentData()
    }

    return (
        <div className="view-data">
            <div className="view__title add">
                <h2>Add New Faculty</h2>
                <Link to="/faculty">
                    <button>Back</button>
                </Link>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} action="/">
                <div className="view__top__add">
                    <div className="view__add__left">
                        <div>
                            <h3>Name</h3>
                            <input name="ten_khoa" onChange={handleChange} type="text" />
                        </div>
                        <div>
                            <h3>Founding data</h3>
                            <input name="ngay_thanh_lap" onChange={handleChange} type="date" />
                        </div>
                    </div>
                    <div className="view__add__right">
                        <div>
                            <h3>Description</h3>
                            <input name="mo_ta" onChange={handleChange} type="text" />
                        </div>
                    </div>  
                </div>
                <div className="view__bottom__add">
                    <button
                        type="submit"
                        >Add</button>
                    <button type="button" onClick={() => {
                        formRef.current.reset()
                    }}>Reset</button>
                </div>
            </form>
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