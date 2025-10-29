import { Link } from "react-router-dom";
import { Calendar, BookOpen, CheckCircle, RefreshCw, Bell, DollarSign, Menu } from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import logo from "../../assets/imgs/logo__1_-removebg-preview (1).png";

const TeacherDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col  from-blue-800">
      <Header />

      {/* Banner Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center ">
          <div className="">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Cổng thông tin giáo viên <span className="text-blue-500">chuyên nghiệp</span>
            </h1>
            <p className="mt-4 text-gray-700">
              Quản lý lịch dạy, điểm số và các chức năng khác một cách dễ dàng.
            </p>
            <div className="mt-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
              <Link to="/teacher/schedule" className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition">Quản lý lịch dạy</Link>
              <Link to="/teacher/notifications" className="px-6 py-3 bg-gray-300 text-gray-800 font-bold rounded-lg shadow-lg hover:bg-gray-400 transition">Xem thông báo</Link>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg" alt="Dashboard" className="w-full rounded-lg shadow-md" />
            <div className="absolute top-6 left-6 bg-white text-blue-600 p-3 rounded-lg shadow-lg">
              ✅ Dễ dàng quản lý
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const menuItems = [
  { path: "/teacher/schedule", title: "Xem lịch dạy", icon: <Calendar size={20} /> },
  { path: "/teacher/grades", title: "Quản lý điểm", icon: <BookOpen size={20} /> },
  { path: "/teacher/attendance", title: "Điểm danh", icon: <CheckCircle size={20} /> },
  { path: "/teacher/notifications", title: "Xem thông báo", icon: <Bell size={20} /> },
  { path: "/teacher/payroll", title: "Chấm công", icon: <DollarSign size={20} /> },
];

export default TeacherDashboard;