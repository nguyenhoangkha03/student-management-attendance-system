import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useInfoStudent } from '../../Common/GetInfoStudent' 
import Logo from '../../../assets/imgs/logo.png'
import FormPassword from '../../Common/FormPassword/FormPassword'
import Loader from '../../Common/Loader/Loader'

function Header(){

    const navigate = useNavigate()
    const location = useLocation()
    const { data: infoStudent, loading } = useInfoStudent()
    const menuRef = useRef(null)
    const passwordRef = useRef(null)
    const [openForm, setOpenForm] = useState(false)

    useEffect(() => {
        if(menuRef.current) {
            menuRef.current.classList.add('hidden')
        }
    }, [location.pathname])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
        return
    }

    if(loading) {
        return <Loader />
    }

    const handleChange = (e) => {
        if(e.key === 'Enter'){
            const value = e.target.value
            if(('lịch học, lịch, lich, lich hoc, thời khóa biểu').includes(value)){
                navigate('/schedule')
            }
            else if(('profile, thông tin, cá nhân, lý lịch').includes(value)){
                navigate('/profile')
            }
            else if(('đăng ký, đăng ký học phần, học phần, lớp học phần').includes(value)){
                navigate('/register-section')
            }
            else if(('kết quả, kết quả học tập, tổng kết, điểm').includes(value)){
                navigate('/result')
            }
            else {
                navigate('/404')
            }
        }
    }

    return (
        <header class="bg-white shadow fixed left-0 top-0 right-0 z-10" >
            <div class="container mx-auto px-8 py-4 flex justify-between items-center">
                <div class="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img alt="University Logo" class="h-10 object-cover" height="60" src={Logo} width="60"/>
                    <div class="ml-4">
                        <h1 class="text-xl font-bold text-pink-600">
                            TRƯỜNG ĐẠI HỌC HARVARD
                        </h1>
                        <p class="text-sm text-gray-500">
                            HARVARD UNIVERSITY
                        </p>
                    </div>
                </div>
                <div class="flex items-center border rounded-full px-4 py-2">
                    <input onKeyDown={handleChange} class="border-none outline-none text-gray-500" placeholder="Tìm kiếm..." type="text"/>
                    <i class="fas fa-search ml-2 text-gray-500 cursor-pointer"></i>
                </div>
                <div class="flex items-center justify-between w-64 text-gray-500">
                    <span class="cursor-pointer" onClick={() => navigate('/')}>
                        <i class="fa-solid fa-house-chimney"></i>
                        <span class="mx-4" href="facebook.com">Trang chủ</span>
                    </span>
                    <span class="cursor-pointer" onClick={() => navigate('/news')}>
                        <i class="fa-regular fa-bell"></i>
                        <a class="mx-4" href="#">Tin tức</a>
                    </span>
                </div>
                <div class="flex items-center cursor-pointer" onClick={() => menuRef.current.classList.toggle('hidden')}>
                    {infoStudent.imageBase64 === undefined 
                    ?
                      <span>Loading...</span>
                    :
                        <img alt="User Avatar" class="h-10 w-10 rounded-full object-cover" height="40" src={infoStudent.imageBase64} width="40"/>
                    } 
                    <span class="ml-2 text-gray-600 hover:text-blue-500 transition">
                        {infoStudent.ho_ten}
                    </span>
                    <i class="fa fa-caret-down user-account-name-caret-down text-gray-500 mx-3"></i>
                </div>
            </div>

            {/* Dropdown menu */}
            <div ref={menuRef} class="bg-white shadow-md w-44 absolute right-7 bottom-[-120px] hidden">
                <ul>
                    <li class="border-b border-gray-200 cursor-pointer" onClick={() => navigate('/profile')}>
                        <span href="#" class="block px-4 py-3 text-gray-700 hover:bg-gray-100">Thông tin cá nhân</span>
                    </li>
                    <li class="border-b border-gray-200 cursor-pointer" onClick={() => setOpenForm(true)}>
                        <span href="#" class="block px-4 py-3 text-gray-700 hover:bg-gray-100">Đổi mật khẩu</span>
                    </li>
                    <li className="cursor-pointer" onClick={handleLogout}>
                        <span href="#" class="block px-4 py-3 text-gray-700 hover:bg-gray-100">Đăng xuất</span>
                    </li>
                </ul>
            </div>

            <FormPassword ref={passwordRef} onReset={() => setOpenForm(false)} status={openForm === true ? 'show' : 'hidden'} />
        </header>
    )
}

export default Header