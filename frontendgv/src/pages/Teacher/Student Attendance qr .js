import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StudentCheckIn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const scannedData = location.state?.scannedData || {};

    const [selectedClass, setSelectedClass] = useState("");
    const [selectedStudent, setSelectedStudent] = useState("");

    useEffect(() => {
        if (scannedData.class) {
            setSelectedClass(scannedData.class);
        }
    }, [scannedData]);

    const handleCheckIn = () => {
        if (!selectedStudent || !selectedClass) {
            alert("Vui lòng chọn đầy đủ thông tin!");
            return;
        }

        // Cập nhật trạng thái điểm danh
        alert(`✅ Sinh viên ${selectedStudent} đã điểm danh thành công!`);

        // Quay lại trang điểm danh hoặc trang chủ
        navigate("/teacher/attendance");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
                    ✅ Xác nhận điểm danh
                </h1>

                {/* Lớp học */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">📚 Lớp học</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        value={selectedClass}
                        disabled
                    >
                        <option value="">{scannedData.class || "Chọn lớp"}</option>
                    </select>
                </div>

                {/* Sinh viên */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-1">🎓 Sinh viên</label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        <option value="">Chọn sinh viên</option>
                        {scannedData.students?.map((student) => (
                            <option key={student.mssv} value={student.mssv}>
                                {student.name} ({student.mssv})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Nút điểm danh */}
                <button
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition duration-300"
                    onClick={handleCheckIn}
                >
                    📌 Xác nhận điểm danh
                </button>
            </div>
        </div>
    );
};

export default StudentCheckIn;
