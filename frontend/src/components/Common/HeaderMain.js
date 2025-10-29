import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './HeaderMain.css'
import bell from '../../assets/imgs/bell.png'
import chat from '../../assets/imgs/chat.png'
import kingdom from '../../assets/imgs/united-kingdom.png'
import vietnam from '../../assets/imgs/vietnam.png'
import { Day, Month, HMS } from '../../services/handleTime'

function HeaderMain(){  

    const [searchState, setSearchState] = useState('hide')
    const [lightState, setLightState] = useState('dark')
    const searchRef = useRef(null)
    const inputRef = useRef(null)
    const closeIconRef = useRef(null)
    const lightRef = useRef(null)
    const navigate = useNavigate()

    const handleClick = () => {
        if(searchState === 'hide'){
            searchRef.current.classList.toggle('search-zoom-out')
            inputRef.current.classList.toggle('hideInput')
            inputRef.current.focus()
            closeIconRef.current.classList.toggle('hide')
            setSearchState('show')
        }
    }

    const handleClickCloseSearch = () => {
        setSearchState('hide')
        searchRef.current.classList.toggle('search-zoom-out')
        inputRef.current.classList.toggle('hideInput')
        closeIconRef.current.classList.toggle('hide')
    }

    const handleClickTheme = () => {
        if(lightState === 'dark'){
            lightRef.current.classList.add('light')
            setLightState('light')
        }
        else{
            lightRef.current.classList.remove('light')
            setLightState('dark')
        }
    }

    const timeRef = useRef()
    const [time, setTime] = useState('')
    useEffect(() => {
        const date = new Date()
        const interval = setInterval(() => {
            setTime(`
                ${HMS(date.getHours())}:${HMS(date.getMinutes())}:${HMS(date.getSeconds())} 
                | 
                ${Day(date.getDay())}, ${date.getDate()} - ${Month(date.getMonth())}, ${date.getFullYear()}
            `)
        }, 1000)

        return () => clearInterval(interval)
    }, [time])

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            const value = e.target.value
            if(('tài khoản, account, username, password').includes(value.toLowerCase())){
                navigate('/account')
            }
        }
    }

    return (
        <div className="header">
            <h1 ref={timeRef}>{time}</h1>
            <section className="section-header">
                <div 
                    className="header-search search-zoom-out"
                    onClick={handleClick}
                    ref={searchRef}
                >
                    <i className="fa-solid fa-magnifying-glass search"></i>
                    <input 
                        className="hideInput"
                        type="text" 
                        placeholder="Tìm kiếm..." 
                        ref={inputRef}   
                        onKeyDown={handleKeyDown}
                    />
                    <i 
                        className="fa-solid fa-xmark close hide"
                        onClick={handleClickCloseSearch}  
                        ref={closeIconRef}  
                    ></i>
                </div>
            </section>
            <section className="header-tools">
                <div className="message">
                    <span>5</span>
                    <img src={chat} alt="" />
                </div>
                <div className="notification">
                    <span>4</span>
                    <img src={bell} alt="" />
                </div>
                <div className="language">
                <img src={vietnam} alt="" />
                </div>
                <div 
                    className="theme"
                    onClick={handleClickTheme}
                >
                    <i 
                        class="fa-solid fa-lightbulb"
                        ref={lightRef}
                    ></i>
                </div>
            </section>
        </div>
    )
}

export default HeaderMain