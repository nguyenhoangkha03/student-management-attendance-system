import React, { useState } from "react";

import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import Header from "../../components/Header";

import 'react-calendar/dist/Calendar.css';
const Schedule = () => {
  const [selectedWeek, setSelectedWeek] = useState("17/02/2025");
  const [selectedSession, setSelectedSession] = useState("Tất cả");
  const [selectedClass, setSelectedClass] = useState("Tất cả");
  const [selectedType, setSelectedType] = useState("Tất cả");
  // lịchlịch
  const [selectedDate, setSelectedDate] = useState(new Date()); // Giữ trạng thái ngày đã chọn
  const scheduleData = {
    "17/02/2025": {
      Monday: [
        { session: "Sáng", subject: "Phát triển phần mềm", details: "DHCMTT16B - 030100261802", time: "Tiết 3 - 6", room: "VT4", teacher: "Bùi Xuân Tùng", class: "DHCMTT16B", type: "Lịch học" },
        { session: "Chiều", subject: "Lập trình web với PHP và MySQL", details: "DHCMTT16B - KNN-TH-0102", time: "Tiết 12 - 14", room: "VT12", teacher: "Nguyễn Phúc Hậu", class: "DHCMTT16B", type: "Lịch thực hành" },
        { session: "Tối", subject: "Thực hành PHP", details: "DHCMTT16B - KNN-TH-0203", time: "Tiết 15 - 17", room: "VT14", teacher: "Trần Minh Hoàng", class: "DHCMTT16B", type: "Lịch thi" },
      ],
    }
  };

  const currentSchedule = scheduleData[selectedWeek] || {};

  const daysOfWeek = [
    { label: "Thứ 2", key: "Monday" },
    { label: "Thứ 3", key: "Tuesday" },
    { label: "Thứ 4", key: "Wednesday" },
    { label: "Thứ 5", key: "Thursday" },
    { label: "Thứ 6", key: "Friday" },
    { label: "Thứ 7", key: "Saturday" },
    { label: "Chủ nhật", key: "Sunday" },
  ];

  const sessions = ["Tất cả", "Sáng", "Chiều", "Tối"];
  const classList = ["Tất cả", "DHCMTT16B", "DHCMTT16A"];
  const types = ["Tất cả", "Lịch học", "Lịch thực hành", "Lịch thi"];
  // hàm tuần sausau
  const handleNextWeek = () => {
    const nextWeek = dayjs(selectedWeek, "DD/MM/YYYY").add(1, "week").format("DD/MM/YYYY");
    setSelectedWeek(nextWeek);
  };
  // hàm tuần hiện tại
  const handleCurrentWeek = () => {
    const currentWeek = dayjs().startOf('isoWeek').format("DD/MM/YYYY");
    setSelectedWeek(currentWeek);
  };
  // hàm ngày lịch
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const weekStart = dayjs(date).startOf('isoWeek').format("DD/MM/YYYY");
    setSelectedWeek(weekStart);
  };
  //   const filteredSchedule = (currentSchedule?.[day.key] || []).filter(
  //   (item) =>
  //     (selectedSession === "Tất cả" || item.session === selectedSession) && // Kiểm tra nếu người dùng chọn tất cả thì không lọc
  //     item.session === session && // Lọc đúng buổi sáng/chiều/tối
  //     (selectedClass === "Tất cả" || item.class === selectedClass) &&
  //     (selectedType === "Tất cả" || item.type === selectedType)
  // );


  return (
    <div className="min-h-screen from-blue-800 to-white text-black flex flex-col">
      <Header />

      <div className="flex flex-wrap  md:flex-nowrap lg:justify-center gap-4 p-4">
        {/* Chọn tuần */}
        <div className="flex flex-justify-between items-center sm:flex-row gap-2">
          <Calendar className="text-blue-600 w-5 h-5" />
          <button
            onClick={handleCurrentWeek}
            className="lg:px-4 lg:py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Tuần hiện tại
          </button>
          <button
            onClick={handleNextWeek}
            className="lg:px-4 lg:py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Tuần sau
          </button>
          
        {/* Chọn ngày */}
        <div className="flex flex-justify-between items-center sm:flex-row gap-2">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="border rounded-lg shadow-md"
          />
          <div>
            <span className="text-gray-700">Ngày đã chọn: {selectedDate.toLocaleDateString()}</span>
          </div>
        </div>
        </div>


        {/* Chọn buổi */}
        <div className="flex flex-col lg:flex-row w-full sm:w-auto md:flex flex-wrap">
          <span className="text-gray-700 lg:mt-3 lg:mr-2">Chọn buổi:</span>
          <select
            className="px-4 py-2 border rounded-lg shadow-md w-full sm:w-auto"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
          >
            {sessions.map((session) => (
              <option key={session} value={session}>
                {session}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn lớp */}
        <div className="flex flex-col lg:flex-row w-full sm:w-auto">
          <span className="text-gray-700 lg:mt-3 lg:mr-2">Chọn lớp:</span>
          <select
            className="px-4 py-2 border rounded-lg shadow-md w-full sm:w-auto"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classList.map((classItem) => (
              <option key={classItem} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn lịch */}
        <div className="flex flex-col lg:flex-row w-full sm:w-auto">
          <span className="text-gray-700 lg:mt-3 lg:mr-2">Chọn lịch:</span>
          <select
            className="px-4 py-2 border rounded-lg shadow-md w-full sm:w-auto"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>


      <div className="overflow-x-auto p-3">
        <div className="min-w-[900px]">
          <table className="w-full table-auto border-collapse border border-blue-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-4 border border-blue-300">Buổi</th>
                {daysOfWeek.map((day) => (
                  <th key={day.key} className="py-2 px-4 border border-blue-300 text-center">{day.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.slice(1).map((session) => (
                <tr key={session}>
                  <td className="py-2 px-4 border border-blue-300 font-semibold text-center">{session}</td>
                  {daysOfWeek.map((day) => {
                    // Lọc dữ liệu theo buổi (sáng, chiều, tối), lớp học, loại lịch
                    const filteredSchedule = (currentSchedule?.[day.key] || []).filter(
                      (item) =>
                        item.session === session &&
                        (selectedClass === "Tất cả" || item.class === selectedClass) &&
                        (selectedType === "Tất cả" || item.type === selectedType)
                    );

                    console.log(`Lọc ${session} - ${day.label}:`, filteredSchedule); // Debug log

                    return (
                      <td key={day.key} className="py-2 px-4 border border-blue-300 w-96 align-top">
                        <div className="flex flex-col gap-3">
                          {filteredSchedule.length > 0 ? (
                            filteredSchedule.map((item, index) => (
                              <div
                              key={index}
                              className={`p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 
                                ${item.type === "Lịch thực hành" ? "bg-green-200" : item.type === "Lịch thi" ? "bg-blue-200" : "bg-white"}`}
                            >
                              <p className="font-bold text-lg text-blue-800">{item.subject}</p>
                              <p className="text-sm text-gray-700">{item.details}</p>
                              <p className="text-xs text-gray-600"><strong>Phòng học:</strong> {item.room}</p>
                              <p className="text-xs text-gray-500">Giảng viên: {item.teacher}</p>
                            </div>
                            
                            ))
                          ) : (
                            <p className="text-xs text-center text-gray-500">Không có lịch</p>
                          )}
                        </div>
                      </td>

                    );
                  })}
                </tr>
              ))}
            </tbody>





          </table>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
