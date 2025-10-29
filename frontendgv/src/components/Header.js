import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Calendar, BookOpen, CheckCircle, Bell, User, Menu, UserCircle, LogOut, X } from "lucide-react";
import logo from "../assets/imgs/logo__1_-removebg-preview (1).png";
import { useInfoTeacher } from './Common/GetInfoTeacher'
import Loader from '../components/Common/Loader/Loader'

const menuItems = [
  { title: "Xem lịch dạy", path: "/teacher/schedule", icon: <Calendar size={18} /> },
  { title: "Quản lý điểm", path: "/teacher/grades", icon: <BookOpen size={18} /> },
  { title: "Điểm danh", path: "/teacher/attendance", icon: <CheckCircle size={18} /> },
  { title: "Xem thông báo", path: "/teacher/notifications", icon: <Bell size={18} /> },
  { title: "Trang cá nhân", path: "/teacher/profile", icon: <User size={18} /> },
  // { title: "Điểm danh", path: "/FaceID/input", icon: <User size={18} /> },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { data: infoTeacher, loading } = useInfoTeacher()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  if(loading) {
    return <Loader />
  }

  const handleLogout = () => {
      localStorage.removeItem('token')
      navigate('/login')
      return
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed z-50 left-0 top-0 right-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 p-4 flex items-center justify-between shadow-lg rounded-lg mx-1">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-2 transition duration-300 
                ${location.pathname === item.path ? "text-yellow-300 font-bold" : "text-white hover:text-gray-300"}`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* User Profile & Dropdown */}
        <div className="relative group">
          <div className="flex items-center space-x-4 cursor-pointer">
            <span className="hidden sm:block text-white font-medium">{infoTeacher.ho_ten}</span>
            <img
              src={infoTeacher.imageBase64}
              alt="User Avatar"
              className="h-12 w-12 rounded-full border-2 border-white"
            />
          </div>

          {/* Dropdown */}
          <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ul className="p-4 text-black space-y-2">
              <li className="flex items-center space-x-2">
                <UserCircle size={20} className="text-gray-600" />    
                <Link to="/teacher/Update-Info" className="hover:text-blue-500 transition">Thông tin cá nhân</Link>
              </li>
              <li className="flex items-center space-x-2" onClick={handleLogout}>
                <LogOut size={20} className="text-gray-600" />
                <Link to="" className="hover:text-blue-500 transition">Đăng xuất</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 bg-white text-blue-500 rounded-lg"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-64 h-full shadow-lg p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-600 hover:text-black p-2 rounded-lg absolute top-4 right-4"
            >
              <X size={24} />
            </button>

            <ul className="mt-10 space-y-4">
              {menuItems.map((item) => (
                <li key={item.path} className="flex items-center space-x-3">
                  {item.icon}
                  <Link
                    to={item.path}
                    className={`block w-full p-2 rounded-lg transition 
                    ${location.pathname === item.path ? "text-blue-500 font-bold" : "text-gray-700 hover:text-gray-900"}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
