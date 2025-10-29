import { useInfoTeacher } from '../../components/Common/GetInfoTeacher'
import CellClass from '../../components/Common/ClassGetName'
import CellFaculty from '../../components/Common/FacultyGetNameByClass'
import Loader from '../../components/Common/Loader/Loader'
import Header from "../../components/Header";

function Profile(){
    const { data: infoTeacher, loading } = useInfoTeacher()

    if(loading) {
      return <Loader />
    }


    return(
      <div className="min-h-screen from-blue-800 to-white text-black flex flex-col mt-24">
      <Header />
        <div style={{width: '90%'}} className={`mx-auto bg-white shadow-2xl rounded-lg  border border-gray-200 mt-6 p-6`}>
        <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex flex-col items-center w-full md:w-1/3 border p-4 rounded-lg shadow bg-[#e7ecf0]">
          <img
            src={infoTeacher.imageBase64}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full border shadow-md"
          />
        </div>
        <div className="flex-1 w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4 text-red-500 border-b pb-2">Thông tin cá nhân</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p className="flex items-center gap-2 text-gray-700 text-base">
                <strong>Họ tên: </strong>
                <span>{infoTeacher.ho_ten}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700 text-base">
                <strong>Ngày sinh: </strong>
                <span>{new Date(infoTeacher.ngay_sinh).toLocaleDateString('vi-VN')}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700 text-base">
                <strong>Địa chỉ: </strong>
                <span>{infoTeacher.dia_chi}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700 text-base">
                <strong>Số điện thoại: </strong>
                <span>{infoTeacher.sdt}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700 text-base">
                <strong>Email: </strong>
                <span>{infoTeacher.email}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700 text-base">
                <strong>Giới tính: </strong>
                <span>{infoTeacher.gioi_tinh === 1 ? 'Nam' : 'Nữ'}</span>
              </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-6 border-t pt-4 text-blue-500">Thông tin trình độ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-4">
          <p className="flex items-center gap-2 text-gray-700 text-base">
            <strong>MSGV: </strong>
            <span>{infoTeacher.msgv}</span>
          </p>
          <p className="flex items-center gap-2 text-gray-700 text-base">
            <strong>Chứng chỉ: </strong>
            <span>AWS Certified Cloud Practitioner, CISA, CISSP, PMP.</span>
          </p>
          <p className="flex items-center gap-2 text-gray-700 text-base">
            <strong>Cấp bậc: </strong>
            <span>Tiến sĩ AI Harvard</span>
          </p>
          <p className="flex items-center gap-2 text-gray-700 text-base">
            <strong>Kinh nghiệm: </strong>
            <span>Nghiên cứu ChatGPT, Nòng cót AWS, Đồng sáng lập Google.</span>
          </p>
          <p className="flex items-center gap-2 text-gray-700 text-base">
            <strong>Khoa: </strong>
            <span><CellFaculty Id={infoTeacher.id_khoa} /></span>
          </p>
          <p className="flex items-center gap-2 text-gray-700 text-base">
            <strong>Language: </strong>
            <span>English, French, Japanese, Korean, Spanish, German.</span>
          </p>
          <p className="flex items-center gap-2 text-gray-700 text-base">
            <strong>Cơ sở: </strong>
            <span>Trường Đại học Harvard</span>
          </p>
      </div>
      <div className="flex justify-end mt-4">
      </div>
    </div>
    </div>
  ); 

    
}
export default Profile;