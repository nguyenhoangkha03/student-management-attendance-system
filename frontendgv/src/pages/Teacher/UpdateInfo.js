import React, { useState } from "react";
import logo from "../../assets/imgs/logo__1_-removebg-preview (1).png"; // Import your logo
import { Calendar, BookOpen, User, Bell, CheckCircle } from "lucide-react";
import userimg from "../../assets/imgs/alexander-hipp-iEEBWgY_6lA-unsplash.jpg";
import Header from "../../components/Header";
import { useInfoTeacher } from '../../components/Common/GetInfoTeacher'
import Loader from '../../components/Common/Loader/Loader'
const ProfilePage = () => {
  const [giangVien, setGiangVien] = useState({
    msgv: "GV123456",
    ho_ten: "Nguyễn Văn A",
    ngay_sinh: "1980-01-01",
    gioi_tinh: 1,
    dia_chi: "123 Main St, HCM",
    email: "nguyen@example.com",
    sdt: "0123456789",
    avatar: {userimg},
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const { data: infoTeacher, loading } = useInfoTeacher()

  if(loading) {
    return <Loader />
  }

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGiangVien((prevState) => ({
          ...prevState,
          avatar: reader.result, // Cập nhật avatar mới
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGiangVien((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thông tin đã được cập nhật!");
    setIsEditMode(false);
  };

  return (
    <div className="min-h-screen from-blue-800 text-white flex flex-col">
    <Header />
      <div className="flex flex-col items-center mt-10 mb-8 px-4">
        <h2 className="text-4xl font-extrabold text-black mb-6">Thông tin cá nhân</h2>

        {/* User Info Card */}
        <div className="w-full max-w-7xl p-6 border-4 border-gray-200 rounded-xl shadow-xl bg-white">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column (Avatar) */}
            <div className="md:w-1/3 flex justify-center items-center mb-6 md:mb-0">
              <div className="border-4 border-gray-300 rounded-full p-2">
                <img
                  src={infoTeacher.imageBase64}
                  alt="User Avatar"
                  className="h-40 w-40 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
                />
                {isEditMode && (
                  <input type="file" onChange={handleImageChange} className="mt-2" />
                )}
              </div>
            </div>

            {/* Right Column (User Information) */}
            <div className="md:w-2/3 space-y-6">
              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-700 text-lg">Mã giảng viên:</div>
                <div className="text-gray-500 text-lg">{infoTeacher.msgv}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-700 text-lg">Họ tên:</div>
                {isEditMode ? (
                  <input
                    type="text"
                    name="ho_ten"
                    value={infoTeacher.ho_ten}
                    onChange={handleChange}
                    className="text-gray-500 text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  />
                ) : (
                  <div className="text-gray-500 text-lg">{infoTeacher.ho_ten}</div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-700 text-lg">Ngày sinh:</div>
                {isEditMode ? (
                  <input
                    type="date"
                    name="ngay_sinh"
                    value={infoTeacher.ngay_sinh}
                    onChange={handleChange}
                    className="text-gray-500 text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  />
                ) : (
                  <div className="text-gray-500 text-lg">{infoTeacher.ngay_sinh.split('T')[0]}</div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-700 text-lg">Giới tính:</div>
                {isEditMode ? (
                  <select
                    name="gioi_tinh"
                    value={infoTeacher.gioi_tinh}
                    onChange={handleChange}
                    className="text-gray-500 text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  >
                    <option value={1}>Nam</option>
                    <option value={0}>Nữ</option>
                  </select>
                ) : (
                  <div className="text-gray-500 text-lg">
                    {infoTeacher.gioi_tinh === 1 ? "Nam" : "Nữ"}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-700 text-lg">Địa chỉ:</div>
                {isEditMode ? (
                  <input
                    type="text"
                    name="dia_chi"
                    value={infoTeacher.dia_chi}
                    onChange={handleChange}
                    className="text-gray-500 text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  />
                ) : (
                  <div className="text-gray-500 text-lg">{infoTeacher.dia_chi}</div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-700 text-lg">Email:</div>
                {isEditMode ? (
                  <input
                    type="email"
                    name="email"
                    value={infoTeacher.email}
                    onChange={handleChange}
                    className="text-gray-500 text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  />
                ) : (
                  <div className="text-gray-500 text-lg">{infoTeacher.email}</div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-700 text-lg">Số điện thoại:</div>
                {isEditMode ? (
                  <input
                    type="text"
                    name="sdt"
                    value={infoTeacher.sdt}
                    onChange={handleChange}
                    className="text-gray-500 text-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  />
                ) : (
                  <div className="text-gray-500 text-lg">{infoTeacher.sdt}</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-4 float-right">
            {isEditMode ? (
              <>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Cập nhật
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditMode(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                Chỉnh sửa thông tin
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
