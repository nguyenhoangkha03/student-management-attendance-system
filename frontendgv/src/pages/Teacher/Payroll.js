import React, { useState } from "react";
import Header from "../../components/Header";

const attendanceData = [
    { id: 1, date: "01/02/2024", hours: 4, class: "10A1", subject: "Toán", faculty: "Khoa học máy tính", semester: "Học kỳ 1", checked: false },
    { id: 2, date: "02/02/2024", hours: 5, class: "11B2", subject: "Văn", faculty: "Hệ thống thông tin", semester: "Học kỳ 2", checked: false },
    { id: 3, date: "03/02/2024", hours: 6, class: "12C3", subject: "Lý", faculty: "Khoa học máy tính", semester: "Học kỳ 1", checked: false },
];

export default function AttendanceTable() {
    const [attendance, setAttendance] = useState(attendanceData);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedFaculty, setSelectedFaculty] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");

    const handleCheck = (id) => {
        setAttendance(prevAttendance =>
            prevAttendance.map(record =>
                record.id === id ? { ...record, checked: !record.checked } : record
            )
        );
    };

    const filteredAttendance = attendance.filter(record => 
        (selectedClass ? record.class === selectedClass : true) &&
        (selectedSubject ? record.subject === selectedSubject : true) &&
        (selectedFaculty ? record.faculty === selectedFaculty : true) &&
        (selectedSemester ? record.semester === selectedSemester : true)
    );

    const handleSave = () => {
        console.log("Dữ liệu điểm danh đã được lưu:", attendance);
    }

    return (
        <div className="min-h-screen from-blue-800 to-white text-black flex flex-col ">
            <Header />
            <div className="p-5">
                <h1 className="text-2xl font-bold mb-4 text-center">Giáo Viên Điểm Danh</h1>
                <div className="mb-4 flex gap-4 flex-wrap md:flex-nowrap ">
                    <div className="md:flex  lg:items-center ">
                        <label className="mr-2 font-medium">Chọn lớp:</label>
                        <select className="p-2 border rounded" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                            <option value="">Tất cả</option>
                            <option value="10A1">10A1</option>
                            <option value="11B2">11B2</option>
                            <option value="12C3">12C3</option>
                        </select>
                    </div>
                    <div className="md:flex lg:items-center">
                        <label className="mr-2 font-medium ">Chọn môn:</label>
                        <select className="p-2 border rounded" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                            <option value="">Tất cả</option>
                            <option value="Toán">Toán</option>
                            <option value="Văn">Văn</option>
                            <option value="Lý">Lý</option>
                        </select>
                    </div >
                    <div className="lg:w-60 flex lg:items-center  ">
                        <label className=" font-medium ">Chọn khoa:</label>
                        <select className="p-2 border rounded " value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)}>
                            <option value="">Tất cả</option>
                            <option value="Khoa học máy tính">Khoa học máy tính</option>
                            <option value="Hệ thống thông tin">Hệ thống thông tin</option>
                        </select>
                    </div>
                    <div className="md:flex  lg:items-center">
                        <label className="mr-2 font-medium">Chọn học kỳ:</label>
                        <select className="p-2 border rounded" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                            <option value="">Tất cả</option>
                            <option value="Học kỳ 1">Học kỳ 1</option>
                            <option value="Học kỳ 2">Học kỳ 2</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-y-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className=" bg-blue-600 text-white uppercase text-sm">
                                <th className="py-3 px-4 text-left">STT</th>
                                <th className="py-3 px-4 text-left">Ngày dạy</th>
                                <th className="py-3 px-4 text-left">Số tiết</th>
                                <th className="py-3 px-4 text-left">Lớp</th>
                                <th className="py-3 px-4 text-left">Môn</th>
                                <th className="py-3 px-4 text-left">Khoa</th>
                                <th className="py-3 px-4 text-left">Học kỳ</th>
                                <th className="py-3 px-4 text-left">Điểm danh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttendance.map((record, index) => (
                                <tr key={record.id} className="border-b">
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{record.date}</td>
                                    <td className="py-3 px-4">{record.hours}</td>
                                    <td className="py-3 px-4">{record.class}</td>
                                    <td className="py-3 px-4">{record.subject}</td>
                                    <td className="py-3 px-4">{record.faculty}</td>
                                    <td className="py-3 px-4">{record.semester}</td>
                                    <td className="py-3 px-4"><input type="checkbox" checked={record.checked} onChange={() => handleCheck(record.id)} className="w-5 h-5" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition float-right">Lưu</button>
            </div>
        </div>
    );
}
