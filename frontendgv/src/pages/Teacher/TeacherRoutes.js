import { Routes, Route } from "react-router-dom";
import TeacherDashboard from "./TeacherDashboard";
import Schedule from "./Schedule";
import Grades from "./grades";
import Attendance from "./Attendance";
import UpdateInfo from "./UpdateInfo";
import Notifications from "./Notifications";
import Payroll from "./Payroll";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TeacherDashboard />}>
        <Route path="schedule" element={<Schedule />} />
        <Route path="grades" element={<Grades />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="update-info" element={<UpdateInfo />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="payroll" element={<Payroll />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;
