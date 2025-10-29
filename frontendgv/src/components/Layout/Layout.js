import { Routes, Route, useNavigate } from 'react-router-dom'
import Register from '../../pages/register/register'
import Account from '../../pages/Account/Account'; // gán page account
import TeacherDashboard from '../../pages/Teacher/TeacherDashboard'; // gán page account
import Attendance from '../../pages/Teacher/Attendance';
import Schedule from '../../pages/Teacher/Schedule1';
import UpdateInfo from '../../pages/Teacher/UpdateInfo';
import Grades from '../../pages/Teacher/Grades';
import Notifications from '../../pages/Teacher/Notifications';  
import Payroll from '../../pages/Teacher/Payroll';  
import Attendanceqr  from '../../pages/Teacher/Student Attendance qr ';  
import Lichsinhvien from "../../pages/sinhvien/lichsinhvien";
import Trangcanhansv from "../../pages/sinhvien/trangcanhansv";
import Profile from "../../pages/Teacher/Profile";
import DiemDanh from "../../pages/FaceID/input";
import NotFound from '../Common/404/404'
import "../../build/tailwind.css" // taiwind.css

function Layout(){

    return (
        <div className="bg-gray-100 overflow-x-hidden">
            <Routes>
                <Route path="/accounts" element={<Account />} />
                <Route path="/" element={<TeacherDashboard />} />
                <Route path="/teacher/attendance" element={<Attendance />} /> 
                <Route path="/teacher/Schedule" element={<Schedule />} /> 
                <Route path="/teacher/update-info" element={<UpdateInfo />} /> 
                <Route path="/teacher/grades" element={< Grades />} /> 
                <Route path="/teacher/notifications" element={< Notifications />} /> 
                <Route path="/teacher/payroll" element={< Payroll />} /> 
                <Route path="/register" element={<Register />} />
                <Route path="/teacher/attendance/Attendanceqr" element={< Attendanceqr />} /> 
                <Route path="/lichsinhvien" element={<Lichsinhvien />} />
                <Route path='/trangcanhansv' element={<Trangcanhansv/>} />
                <Route path='/FaceID/input' element={<DiemDanh/>}/>
                <Route path='/teacher/profile' element={<Profile/>}/>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default Layout