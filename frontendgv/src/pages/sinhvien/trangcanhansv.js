import React, { useState } from "react";
function Trangcanhansv(){
    const [studentInfo, setStudentInfo] = useState({
        "Họ tên": "Đinh Trọng Nghĩa",
        "Ngày sinh": "29/05/2003",
        "Nơi sinh": "Tỉnh An Giang",
        "Số điện thoại": "0363980754",
        "Email": "dtnghia-cntt16@tdu.edu.vn",
        "Giới tính": "Nam",
        "Mã sinh viên": "217060161",
        "Lớp học": "DHCNTT16B",
        "Trạng thái": "Đang học",
        "Ngành": "Công nghệ thông tin",
        "Khoa": "Khoa Kỹ thuật Công nghệ",
        "Loại hình đào tạo": "Chính quy",
        "Cơ sở": "Trường Đại học Tây Đô"
      });
      const [isEditing, setIsEditing] = useState(false);
      const [profileImage, setProfileImage] = useState("/path-to-image.jpg");
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name !== "Loại hình đào tạo" && name !== "Cơ sở") {
          setStudentInfo((prev) => ({ ...prev, [name]: value }));
        }
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setProfileImage(imageUrl);
        }
      };
    
    return(
        <div className={`max-w-7xl mx-auto bg-white shadow-2xl rounded-lg  border border-gray-200  p-6 my-20`}>
        <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex flex-col items-center w-full md:w-1/3 border p-4 rounded-lg shadow">
          <img
            src={profileImage}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full border shadow-md"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 ml-52"
            />
          )}
        </div>
        <div className="flex-1 w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Thông tin cá nhân</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            {Object.entries(studentInfo).slice(0, 6).map(([label, value]) => (
              <p key={label} className="flex items-center gap-2">
                <strong>{label}:</strong>
                {isEditing ? (
                  <input 
                    type="text" 
                    name={label} 
                    value={value} 
                    onChange={handleChange} 
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <span>{value}</span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-6 border-t pt-4 text-gray-800">Thông tin học vấn</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4">
        {Object.entries(studentInfo).slice(6).map(([label, value]) => (
          <p key={label} className="flex items-center gap-2">
            <strong>{label}:</strong>
            {isEditing && label !== "Loại hình đào tạo" && label !== "Cơ sở" ? (
              <input 
                type="text" 
                name={label} 
                value={value} 
                onChange={handleChange} 
                className="border p-1 rounded w-full"
              />
            ) : (
              <span>{value}</span>
            )}
          </p>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
        >
          {isEditing ? "Lưu thay đổi" : "Sửa hồ sơ"}
        </button>
      </div>
    </div>
    
  ); 

    
}
export default Trangcanhansv;