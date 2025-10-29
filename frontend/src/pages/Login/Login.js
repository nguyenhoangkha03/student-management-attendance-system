import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/accountService'
import VideoStartLogin from '../../assets/videos/StartLogin.mp4'
import VideoPassToUser from '../../assets/videos/PassToUser.mp4'
import VideoUserToPass from '../../assets/videos/UserToPass.mp4'
import VideoLogin from '../../assets/videos/login.mp4'
import CloseEye from '../../assets/imgs/eye-close.png'
import OpenEye from '../../assets/imgs/eye-open.png'
import './Login.css'

function Login(){
    const usernameRef = useRef()
    const passwordRef = useRef()
    const videoRef = useRef()
    const count = useRef(0)
    const errorRef = useRef()
    const bubble1 = useRef()
    const bubble2 = useRef()
    const bubble3 = useRef()
    
    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [token, setToken] = useState('')

    const usernameInputRef = useRef()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    useEffect(() => {
        usernameRef.current.focus()

        setTimeout(() => {
            videoRef.current.pause()   
        }, 1500)
    }, [])

    const handleFocus = (e) => {
        if(e.target.classList.contains('username')){
            usernameRef.current.parentElement.classList.add('active')
            usernameRef.current.previousElementSibling.classList.add('active')
            e.target.focus()

            passwordRef.current.parentElement.classList.remove('active')
            passwordRef.current.previousElementSibling.classList.remove('active')
            passwordRef.current.blur()

            if(count.current > 0){
                videoRef.current.src = VideoPassToUser
            }
            else {
                count.current++
            }
        }
        else{
            passwordRef.current.parentElement.classList.add('active')
            passwordRef.current.previousElementSibling.classList.add('active')
            e.target.focus()

            usernameRef.current.parentElement.classList.remove('active')
            usernameRef.current.previousElementSibling.classList.remove('active')
            usernameRef.current.blur()

            videoRef.current.src = VideoUserToPass
        }
        
    }

    const hideError = () => {
        bubble3.current.innerHTML = ''

        errorRef.current.classList.remove('show')
        bubble1.current.classList.remove('show')
        bubble2.current.classList.remove('show')
        bubble3.current.classList.remove('show')
    }

    const showError = (message) => {
        bubble3.current.innerHTML = ''

        errorRef.current.classList.add('show')
        bubble1.current.classList.add('show')
        bubble2.current.classList.add('show')
        bubble3.current.classList.add('show')

        bubble3.current.innerHTML = message
    }

    const handleShowPassword = (e) => {
        if(e.target.classList.contains('show')){
            e.target.classList.toggle('show')
            e.target.src = CloseEye
            passwordRef.current.classList.toggle('show')
        }
        else {
            e.target.classList.toggle('show')
            e.target.src = OpenEye
            passwordRef.current.classList.toggle('show')
        }
    }

    const validateUsername = (username) => {
        username = username.trim()
        
        if(!username) {
            showError('Username không được để trống!')
            return false
        }

        if(username.length < 5){
            showError('Username phải chứa ít nhất 8 ký tự!')
            return false
        }
        
        hideError()
        return true
    }

    const validatePassword = (password) => {
        password = password.trim()

        if (!password) {
            showError("Password không được để trống!")
            return false
        } 
        if (password.length < 5) {
            showError("Password phải có ít nhất 8 ký tự")
            return false
        } 

        hideError()
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!validateUsername(formData.username)){
            return false
        }
        if(!validatePassword(formData.password)){
            return false
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
                showError("Tài khoản mật khẩu không đúng!")
            }
        }
        goLogin()
    }  
    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
    }

    return ( 
        <div className="login">
            <div className="login__form">
                <img src="./assets/imgs/logo.png" alt="" />
                <form
                    method="POST"
                    action="/api/login"
                    onSubmit={handleSubmit}
                >
                    <div className="login__form__content">
                        <h1>Login To Manager</h1>
                        <div 
                            className="show-error-login"
                            ref={errorRef}
                        >
                            <div className="bubble-1" ref={bubble1}></div>
                            <div className="bubble-2" ref={bubble2}></div>
                            <div className="bubble-3" ref={bubble3}></div>
                        </div>
                        <video ref={videoRef} autoPlay muted src={VideoLogin}></video>
                        <div 
                            className="container-login-input"
                        >
                            <i className="fa fa-user" />
                            <input 
                                type="text" 
                                placeholder="Username"  
                                className="username" 
                                name="username"
                                ref={usernameRef}
                                onChange={handleChange}
                                onFocus={handleFocus}
                            />
                        </div>
                        <div 
                            className="container-login-input"
                        >
                            <i class="fa-solid fa-lock"></i>
                            <input 
                                type="text" 
                                placeholder="Password"    
                                className="password"
                                name="password"
                                ref={passwordRef}
                                onChange={handleChange}
                                onFocus={handleFocus}
                            />
                            <img className="show-password" onClick={handleShowPassword} src={CloseEye} alt="" />
                        </div>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login