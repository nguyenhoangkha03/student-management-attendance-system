import { use, useRef, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './Sidebar.css'
function Sidebar(){

    const [menuActive, setMenuActive] = useState(0)
    const sidebarRef = useRef(null)
    const nameAppRef = useRef(null)
    const sidebarTopRef = useRef(null)
    const logoRef = useRef(null)
    const sidebarBodyRef = useRef(null)
    const informationRef = useRef(null)
    const sidebarBottomRef = useRef(null)

    const handleClickMenu = className => {
        if(className !== menuActive){
            setMenuActive(className)
        }
    }

    const handleClickZoom = (e) => {
        sidebarRef.current.classList.toggle('zoom')
        sidebarTopRef.current.classList.toggle('zoom')
        nameAppRef.current.classList.toggle('to-fly-hide')
        if(sidebarRef.current.classList.contains('zoom')){
            e.target.firstChild.classList.remove('fa-angle-left')
            e.target.firstChild.classList.add('fa-angle-right')
        }
        else{
            e.target.firstChild.classList.remove('fa-angle-left')
            e.target.firstChild.classList.add('fa-angle-left')
        }
        Array.from(sidebarBodyRef.current.children).forEach(element => {
            element.children[0].children[1].classList.toggle('hide')
            element.children[1].classList.toggle('hide')
        })

        informationRef.current.classList.toggle('hide')

        sidebarBottomRef.current.classList.toggle('zoom')

    }
    
    return (    
        <div 
            className="sidebar"
            ref={sidebarRef}
        >
            <section 
                className="sidebar-top"
                ref={sidebarTopRef}
            >
                <span>
                    <img src="./assets/imgs/logo.png" alt="" ref={logoRef} />
                    <h1 ref={nameAppRef}>Learning</h1>
                </span>
                <span
                    onClick={handleClickZoom}
                >
                    <i 
                        className="fa-solid fa-angle-left"
                    ></i>
                </span>
            </section>
            <section className="sidebar-body" ref={sidebarBodyRef}>
                <div 
                    className={`menu-item ${menuActive === 'home' ? 'active' : ''}`}
                    onClick={() => handleClickMenu('home')}    
                >
                    <span>
                        <i className="fa-solid fa-house"></i>
                        <h2>Dashboard</h2>
                    </span>
                    <i className="fa-solid fa-bullseye"></i>
                </div> 
                <div 
                    className={`menu-item ${menuActive === 'account' ? 'active' : ''}`}
                    onClick={() => handleClickMenu('account')}
                >
                    <span>
                        <i className="fa-solid fa-user"></i>
                        <h2>Accounts</h2>
                    </span>
                    <i className="fa-solid fa-bullseye"></i>
                </div>         
                <div 
                    className={`menu-item ${menuActive === 'falcuty' ? 'active' : ''}`}
                    onClick={() => handleClickMenu('falcuty')}
                >
                    <span>
                        <i className="fa-solid fa-school"></i>
                        <h2>Faculty</h2>
                    </span>
                    <i className="fa-solid fa-bullseye"></i>
                </div>         
                <div 
                    className={`menu-item ${menuActive === 'class' ? 'active' : ''}`}
                    onClick={() => handleClickMenu('class')}
                >
                    <span>
                        <i className="fas fa-chalkboard-teacher"></i>
                        <h2>Class</h2>
                    </span>
                    <i className="fa-solid fa-bullseye"></i>
                </div>         
                <div 
                    className={`menu-item ${menuActive === 'teacher' ? 'active' : ''}`}
                    onClick={() => handleClickMenu('teacher')}
                >
                    <span>
                        <i className="fa-solid fa-users"></i>
                        <h2>Lecturer</h2>
                    </span>
                    <i className="fa-solid fa-bullseye"></i>
                </div>         
                {/* <div 
                    className={`menu-item ${menuActive === 'teacher' ? 'active' : ''}`}
                    onClick={() => handleClickMenu('teacher')}
                >
                    <span>
                        <i className="fa-solid fa-users"></i>
                        <h2>Giảng Viên</h2>
                    </span>
                    <i className="fa-solid fa-bullseye"></i>
                </div>          */}
            </section>
            <section className="sidebar-bottom" ref={sidebarBottomRef}>   
                <span
                    className={`${menuActive === 'information' ? 'active' : ''}`}
                    onClick={() => handleClickMenu('information')}
                    ref={informationRef}
                >
                    <img src="./assets/imgs/avatar.jpg" alt="" />
                    <div className="info">
                        <span className="name">Nguyen Hoang Kha</span>
                        <span className="email">nhkhacntt16@gmail.com</span>
                    </div>
                </span>
                <span>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </span>
            </section>
        </div>
    )
}

export default Sidebar