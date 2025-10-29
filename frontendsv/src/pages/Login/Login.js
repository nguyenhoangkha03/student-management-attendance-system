import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../service/accountService'
import backgroundLeft from '../../assets/imgs/background-login-left.jpg'
import Toast from '../../components/Common/Toast/Toast'
import logo from '../../assets/imgs/logo.png'
import Captcha from "../../components/Common/Captcha/Captcha";
import './Login.css'

function Login() {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const [timeoutId, setTimeoutId] = useState(null)
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    const usernameRef = useRef(null)
    const [captchaVerified, setCaptchaVerified] = useState(false)
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
        console.log(formData)
    }

    const handleClick = () => {
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        if(!formData.username){
            setError('Vui lòng nhập mã sinh viên')
            const Id = setTimeout(() => {
                setError(null)
            }, 6000)
            setTimeoutId(Id)
            return
        }
        if(!formData.password){
            setError('Vui lòng nhập mật khẩu')
            const Id = setTimeout(() => {
                setError(null)
            }, 6000)
            setTimeoutId(Id)
            return
        }
        async function goLogin(){
            const response = await login(formData)
            console.log(response)
            if(response){
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                navigate('/')
            }
            else {
                setError("Tài khoản mật khẩu không đúng!")
                const Id = setTimeout(() => {
                    setError(null)
                }, 6000)
                setTimeoutId(Id)
                return
            }
        }
        goLogin()
    }

    useEffect(() => {
        usernameRef.current.focus()

        return () => clearTimeout(timeoutId);
    }, [timeoutId])


    return (
        <div class="relative overflow-hidden">
            <div className="login">
                <div className="login__left">
                    <img src={backgroundLeft} alt="" />
                </div>
                <div className="login__right">
                    <div className="login-container">
                        <img  src={logo} alt="" />
                        <h1>CỔNG THÔNG TIN SINH VIÊN</h1>
                        <h2>ĐĂNG NHẬP HỆ THỐNG</h2>
                        <input ref={usernameRef} onChange={handleChange} type="text" name="username" placeholder="Nhập mã sinh viên" />
                        <input onChange={handleChange} type="password"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleClick()
                                }
                            }}
                        name="password" placeholder="Nhập mật khẩu" />
                        <div className="check-graduate">
                            <input type="checkbox" value="graduate" id="graduate" />
                            <label for="graduate">Đã tốt nghiệp</label>
                        </div>
                        <div className="captcha">
                            <Captcha onVerify={setCaptchaVerified} click={handleClick} set={() => setError('Lỗi captcha!')} />
                        </div>
                    </div>
                </div>
            </div>
            {error && <Toast type="error" message={error} onClose={() => setError(null)} />}
        </div>
    )
}

export default Login