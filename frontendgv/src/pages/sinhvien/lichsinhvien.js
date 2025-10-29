import React, { useState } from "react";

import dayjs from "dayjs";
// import isToday from "dayjs/plugin/isToday";
// import isoWeek from "dayjs/plugin/isoWeek";
// import Header from "../../components/Header";
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";

import "react-datepicker/dist/react-datepicker.css";
import { FaPrint, FaFileExcel, FaHome, FaUser, FaBook, FaClipboardList, FaUniversity, FaCalendarAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Lichsinhvien() {

  
const scheduleData = [
  { day: "Thứ 2", time: "Sáng", subject: "Phát triển phần mềm", room: "VT4", teacher: "Bùi Xuân Tùng", periods: "3 - 6", class: "KTPM2021A" },
  { day: "Thứ 4", time: "Sáng", subject: "Phát triển phần mềm", room: "VT4", teacher: "Bùi Xuân Tùng", periods: "3 - 6", class: "KTPM2021A" },
  { day: "Thứ 6", time: "Sáng", subject: "Phát triển phần mềm", room: "VT4", teacher: "Bùi Xuân Tùng", periods: "3 - 6", class: "KTPM2021B" },
  { day: "Chủ nhật", time: "Tối", subject: "Lập trình web", room: "VT12", teacher: "Nguyễn Phúc Hậu", periods: "7 - 10", class: "KTPM2021B" },
];
  const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
  const times = ["Sáng", "Chiều", "Tối"]
  const [scheduleType, setScheduleType] = useState("Lịch học");
  const [currentWeek, setCurrentWeek] = useState(dayjs());
  // Lấy ngày đầu tuần (Thứ 2)
  const getStartOfWeek = () => currentWeek.startOf("isoWeek");
  const weekDays = days.map((_, index) => getStartOfWeek().add(index, "day"));
  const [selectedDate, setSelectedDate] = useState(new Date()); // Đặt mặc định là ngày hiện tại
    // khao bao danh sach class
  const classList = ["Tất cả", "KTPM2021A", "KTPM2021B"];
  const [selectedClass, setSelectedClass] = useState("Tất cả");
  // Lọc dữ liệu theo lớp
  const filteredSchedule = selectedClass === "Tất cả"
  ? scheduleData
  : scheduleData.filter((item) => item.class === selectedClass);

    // Hàm xuất Excel
    const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(filteredSchedule);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Lịch Học");
      XLSX.writeFile(workbook, "lich_hoc.xlsx");
    };
  
  return (

    <div className="grid grid-cols-12 h-screen p-12 bg-[#e7ecf0]">

      {/* Sidebar */}
      <div className="col-span-2 bg-gray-100 p-5 space-y-2 text-sm rounded-lg shadow-md h-80">
        <h2 className="font-bold text-2xl font-extrabold text-center ">Menu</h2>
        <ul className="space-y-1">
          <li className="p-3 bg-white flex items-center gap-2 rounded-md shadow-sm"><FaHome /> <a>Trang chủ</a></li>
          <li className="p-3 bg-white flex items-center gap-2 rounded-md shadow-sm"><FaUser /> <a>Thông tin cá nhân</a></li>
          <li className="p-3 bg-white flex items-center gap-2 rounded-md shadow-sm"><FaBook /> <a>Kết quả học tập</a></li>
          <li className="p-3 bg-white flex items-center gap-2 rounded-md shadow-sm"><FaClipboardList /> <a>Lịch theo tuần</a></li>
          <li className="p-3 bg-white flex items-center gap-2 rounded-md shadow-sm"><FaUniversity /> <a>Đăng kí học phần</a></li>
        </ul>
      </div>

      {/* Schedule Table */}
      <div className="col-span-9 p-6 bg-white  rounded-lg shadow-2xl overflow-x-auto ml-6">

        <h1 className="text-2xl font-bold mb-4">{scheduleType} theo tuần</h1>

        {/* Filter Options */}
        <div className="flex items-center space-x-2 mb-4">

        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="border p-2 rounded-lg">
          {classList.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

          <select value={scheduleType} onChange={(e) => setScheduleType(e.target.value)} className="border p-2 rounded-lg">
            <option value="Lịch học">Lịch học</option>
            <option value="Lịch thi">Lịch thi</option>
          </select>
          <div>
            <DatePicker
              selected={selectedDate ? selectedDate : new Date()} // Nếu `null`, dùng ngày hiện tại
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Chọn ngày"
              className="border p-2 rounded-lg"
            />


          </div>
          <button
            onClick={() => setCurrentWeek(dayjs())}
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center gap-1">
            <FaCalendarAlt /> Hiện tại
          </button>
          <button onClick={exportToExcel} className="bg-green-500 text-white p-2 rounded-lg flex items-center gap-1">
          <FaFileExcel /> Xuất Excel
        </button>
          <button
            onClick={() => setCurrentWeek(currentWeek.subtract(1, "week"))}
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center gap-1">
            <FaArrowLeft /> Trở về
          </button>

          <button
            onClick={() => setCurrentWeek(currentWeek.add(1, "week"))}
            className="bg-blue-500 text-white p-2 rounded-lg flex items-center gap-1">
            Tiếp <FaArrowRight />
          </button>
        </div>

  {/* Schedule Table */}
        <table className="w-full border text-lg">
          <thead>
            <tr className="bg-blue-600 text-xl text-white">
              <th className="p-2 border border-gray-400">Ca học</th>
              {days.map((day, index) => (
                <th key={day} className="p-4 border text-center">
                  {day}
                  <div className="text-sm font-normal">{weekDays[index].format("DD/MM")}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time} className="bg-white text-base">
                <td className="p-3 border border-gray-400 text-center font-bold">{time}</td>
                {days.map((day) => {
                  const lesson = filteredSchedule.find((s) => s.day === day && s.time === time);
                  return (
                    <td key={day + time} className="p-3 border border-gray-400 h-32 text-center">
                      {lesson ? (
                        <div className="bg-green-500 text-white p-3 rounded-md text-sm shadow-sm">
                          <strong>{lesson.subject}</strong>
                          <div>Phòng: {lesson.room}</div>
                          <div>Tiết: {lesson.periods}</div>
                          <div>GV: {lesson.teacher}</div>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Lichsinhvien;
