import { useState } from "react"
import { useInfoStudent } from '../../components/Common/GetInfoStudent'
import CellClass from '../../components/Common/ClassGetName'
import CellFaculty from '../../components/Common/FacultyGetNameByClass'
import Loader from '../../components/Common/Loader/Loader'

function Profile(){
    const { data: infostudent, loading } = useInfoStudent()

    if(loading) {
      return <Loader />
    }


    return(
        <div className={`max-w-7xl mx-auto bg-white shadow-2xl rounded-lg  border border-gray-200  p-6 mt-28`}>
        <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex flex-col items-center w-full md:w-1/3 border p-4 rounded-lg shadow bg-[#e7ecf0]">
          <img
            src={infostudent.imageBase64}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full border shadow-md"
          />
        </div>
        <div className="flex-1 w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4 text-red-500 border-b pb-2">Thông tin cá nhân</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p className="flex items-center gap-2">
                <strong>Họ tên: </strong>
                <span>{infostudent.ho_ten}</span>
              </p>
              <p className="flex items-center gap-2">
                <strong>Ngày sinh: </strong>
                <span>{new Date(infostudent.ngay_sinh).toLocaleDateString('vi-VN')}</span>
              </p>
              <p className="flex items-center gap-2">
                <strong>Địa chỉ: </strong>
                <span>{infostudent.dia_chi}</span>
              </p>
              <p className="flex items-center gap-2">
                <strong>Số điện thoại: </strong>
                <span>{infostudent.sdt}</span>
              </p>
              <p className="flex items-center gap-2">
                <strong>Email: </strong>
                <span>{infostudent.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <strong>Giới tính: </strong>
                <span>{infostudent.gioi_tinh === 1 ? 'Nam' : 'Nữ'}</span>
              </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-6 border-t pt-4 text-blue-500">Thông tin học vấn</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4">
          <p className="flex items-center gap-2">
            <strong>MSSV: </strong>
            <span>{infostudent.mssv}</span>
          </p>
          <p className="flex items-center gap-2">
            <strong>Lớp: </strong>
            <span><CellClass Id={infostudent.id_lop} /></span>
          </p>
          <p className="flex items-center gap-2">
            <strong>Trạng thái: </strong>
            <span>Còn học</span>
          </p>
          <p className="flex items-center gap-2">
            <strong>Ngành: </strong>
            <span>Công Nghệ Thông Tin</span>
          </p>
          <p className="flex items-center gap-2">
            <strong>Khoa: </strong>
            <span><CellFaculty Id={infostudent.id_lop} /></span>
          </p>
          <p className="flex items-center gap-2">
            <strong>Loại hình đào tạo: </strong>
            <span>Chính quy</span>
          </p>
          <p className="flex items-center gap-2">
            <strong>Cơ sở: </strong>
            <span>Trường Đại học Harvard</span>
          </p>
      </div>
      <div className="flex justify-end mt-4">
      </div>
    </div>
    
  ); 

    
}
export default Profile;