import { useRef, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Sidebar.css'
import Logo from '../../assets/imgs/logo.png'
import useAuth from '../../hooks/useAuth' 

function Sidebar(){

    const [menuActive, setMenuActive] = useState()
    const sidebarRef = useRef(null)
    const nameAppRef = useRef(null)
    const sidebarTopRef = useRef(null)
    const logoRef = useRef(null)
    const sidebarBodyRef = useRef(null)
    const informationRef = useRef(null)
    const sidebarBottomRef = useRef(null)
    const userInfo = useAuth()
    const navigate = useNavigate()

    const handleClickMenu = className => {
        if(className !== menuActive){
            setMenuActive(className)
            localStorage.setItem('menuActive', className)
        }
    }

    useEffect(() => {
        const savedMenu = localStorage.getItem('menuActive')
        if(savedMenu){
            setMenuActive(savedMenu)
        }
        else {
            setMenuActive('home')
        }
    }, [])

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
            element.children[0].children[0].children[1].classList.toggle('hide')
            element.children[0].children[1].classList.toggle('hide')
        })

        informationRef.current.classList.toggle('hide')

        sidebarBottomRef.current.classList.toggle('zoom')

    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
        return
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
                    <img src={Logo} onClick={() => navigate('/')} alt="" ref={logoRef} />
                    <h1 ref={nameAppRef}>EduTrack</h1>
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
                <Link to="/">
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
                </Link>
                <Link to="/account">
                    <div 
                        className={`menu-item ${menuActive === 'account' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('account')}
                    >
                        <span>
                            <i className="fa-solid fa-user"></i>
                            <h2>Tài Khoản</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>  
                </Link>
                <Link to="/manager">
                    <div 
                        className={`menu-item ${menuActive === 'manager' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('manager')}
                    >
                        <span>
                            <i class="fa-solid fa-user-tie"></i>
                            <h2>Quản Lý</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>  
                </Link>
                <Link to="/faculty">
                    <div 
                        className={`menu-item ${menuActive === 'falcuty' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('falcuty')}
                    >
                        <span>
                            <i className="fa-solid fa-school"></i>
                            <h2>Khoa</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>         
                </Link>    
                <Link to="/major">
                    <div 
                        className={`menu-item ${menuActive === 'major' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('major')}
                    >
                        <span>
                            <i className="fa-solid fa-graduation-cap"></i>
                            <h2>Ngành</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>         
                </Link>    
                <Link to="/class">
                    <div 
                        className={`menu-item ${menuActive === 'class' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('class')}
                    >
                        <span>
                            <i className="fas fa-chalkboard-teacher"></i>
                            <h2>Lớp Học</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>         
                </Link>  
                <Link to="/teacher">
                    <div 
                        className={`menu-item ${menuActive === 'teacher' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('teacher')}
                    >
                        <span>
                            <i className="fa-solid fa-users"></i>
                            <h2>Giảng Viên</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>         
                </Link>  
                <Link to="/student">
                    <div 
                        className={`menu-item ${menuActive === 'student' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('student')}
                    >
                        <span>
                            <i class="bi bi-person-badge"></i>
                            <h2>Học Sinh</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>         
                </Link> 
                <Link to="/room">
                    <div 
                        className={`menu-item ${menuActive === 'room' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('room')}
                    >
                        <span>
                            <i class="bi bi-door-closed"></i>
                            <h2>Phòng Học</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>         
                </Link> 
                <Link to="/subject">
                    <div 
                        className={`menu-item ${menuActive === 'subject' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('subject')}
                    >
                        <span>
                            <i class="bi bi-book"></i>
                            <h2>Môn Học</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>         
                </Link> 
                <Link to="/semester">
                    <div 
                        className={`menu-item ${menuActive === 'semester' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('semester')}
                    >
                        <span>
                            <i class="bi bi-calendar"></i>
                            <h2>Học Kỳ</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>         
                </Link> 
                <Link to="/sectionClass">
                    <div 
                        className={`menu-item ${menuActive === 'sectionClass' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('sectionClass')}
                    >
                        <span>
                            <i class="fa fa-hand-paper"></i>
                            <h2>Lớp Học Phần</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>         
                </Link> 
                <Link to="/studentStudySection">
                    <div 
                        className={`menu-item ${menuActive === 'studentStudySection' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('studentStudySection')}
                    >
                        <span>
                            <i class="bi bi-pencil"></i>
                            <h2>Sinh Viên Học Phần</h2>
                        </span>
                        <i className="fa-solid fa-bullseye"></i>
                    </div>         
                </Link> 
            </section>
            <section className="sidebar-bottom" ref={sidebarBottomRef}>   
                <Link to="/profile">
                    <span
                        className={`${menuActive === 'information' ? 'active' : ''}`}
                        onClick={() => handleClickMenu('information')}
                        ref={informationRef}
                    >
                        <img src={userInfo ? userInfo.imageBase64 : 'k'} alt="" />
                        <div className="info">
                            <span className="name">{userInfo ? userInfo.ho_ten : ''}</span>
                            <span className="email">{userInfo ? userInfo.email : ''}</span>
                        </div>
                    </span>
                </Link>
                <span onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </span>
            </section>
        </div>
    )
}

export default Sidebar