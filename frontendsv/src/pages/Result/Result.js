import { useInfoStudent } from '../../components/Common/GetInfoStudent' 
import { getAllJoinSectionClassesByIdStudent } from '../../service/sectionClassService' 
import { useEffect, useState, Fragment } from 'react'
import CellSemester from '../../components/Common/SemesterGetName'
import CellSubject from '../../components/Common/SubjectGetName'
import Loader from '../../components/Common/Loader/Loader'

function Result() {

    const { data: infoStudent, loading } = useInfoStudent()
    const [data, setData] = useState([])

    useEffect(() => {
        if(infoStudent && infoStudent.id_sinh_vien){
        async function getData(){
            const data = await getAllJoinSectionClassesByIdStudent(infoStudent.id_sinh_vien)

            const groupedBySemester = data.reduce((acc, item) => {
            if (!acc[item.id_hoc_ky]) {
                acc[item.id_hoc_ky] = []
            }
            acc[item.id_hoc_ky].push(item)
            return acc
            }, {})

            const sortedMap = new Map(
            Object.entries(groupedBySemester)
                .map(([key, value]) => [Number(key), value])
                .sort((a, b) => b[0] - a[0])
            )
            setData(sortedMap)
        }
        getData()
    }
    }, [infoStudent])

    if (loading || !infoStudent) {
        return <Loader />;
    }
    

    return (
        <div class="container mx-auto p-4 mt-20 bg-[#e7ecf0]">
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
                <div class="bg-white p-4 flex items-center">
                    <i class="fas fa-bars text-xl mr-2"></i>
                    <h1 class="text-xl font-bold">Kết quả học tập</h1>
                </div>
                <div class="p-4">
                    <div class="bg-yellow-100 p-2 text-center text-red-600 font-bold">CHUẨN ĐẦU RA</div>
                    <table class="w-full mt-4 border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="border border-gray-300 p-2">STT</th>
                                <th class="border border-gray-300 p-2">Loại chứng chỉ</th>
                                <th class="border border-gray-300 p-2">Theo quy định</th>
                                <th class="border border-gray-300 p-2">Đã nộp</th>
                                <th class="border border-gray-300 p-2">Xác nhận</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="border border-gray-300 p-2 text-center">1</td>
                                <td class="border border-gray-300 p-2">Kỹ năng mềm</td>
                                <td class="border border-gray-300 p-2">Chứng chỉ Kỹ năng mềm</td>
                                <td class="border border-gray-300 p-2 text-center">Chưa hoàn tất</td>
                                <td class="border border-gray-300 p-2 text-center">Chưa hoàn tất</td>
                            </tr>
                            <tr>
                                <td class="border border-gray-300 p-2 text-center">2</td>
                                <td class="border border-gray-300 p-2">Kỹ năng nghề</td>
                                <td class="border border-gray-300 p-2">Chứng chỉ Kỹ năng nghề</td>
                                <td class="border border-gray-300 p-2 text-center">Chưa hoàn tất</td>
                                <td class="border border-gray-300 p-2 text-center">Chưa hoàn tất</td>
                            </tr>
                            <tr>
                                <td class="border border-gray-300 p-2 text-center">3</td>
                                <td class="border border-gray-300 p-2">Ngoại ngữ</td>
                                <td class="border border-gray-300 p-2">Chứng chỉ Ngoại ngữ B1</td>
                                <td class="border border-gray-300 p-2 text-center">Chưa hoàn tất</td>
                                <td class="border border-gray-300 p-2 text-center">Chưa hoàn tất</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="w-full mt-4 border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="border border-gray-300 p-2" rowspan="2">STT</th>
                                <th class="border border-gray-300 p-2" rowspan="2">Mã lớp học phần</th>
                                <th class="border border-gray-300 p-2" rowspan="2">Tên môn học/học phần</th>
                                <th class="border border-gray-300 p-2" rowspan="2">Số tín chỉ</th>
                                <th class="border border-gray-300 p-2" colspan="3">Thường xuyên</th>
                                <th class="border border-gray-300 p-2" colspan="2">Cuối kỳ</th>
                                <th class="border border-gray-300 p-2" rowspan="2">Điểm tổng kết</th>
                                <th class="border border-gray-300 p-2" rowspan="2">Thang điểm 4</th>
                                <th class="border border-gray-300 p-2" rowspan="2">Điểm chữ</th>
                                <th class="border border-gray-300 p-2" rowspan="2">Xếp loại</th>
                                <th class="border border-gray-300 p-2" rowspan="2">Ghi chú</th>
                                <th class="border border-gray-300 p-2" colspan="2">Điểm thi KN</th>
                                <th class="border border-gray-300 p-2" rowspan="2">Đạt</th>
                            </tr>
                            <tr class="bg-gray-100">
                                <th class="border border-gray-300 p-2">1</th>
                                <th class="border border-gray-300 p-2">2</th>
                                <th class="border border-gray-300 p-2">3</th>
                                <th class="border border-gray-300 p-2">1</th>
                                <th class="border border-gray-300 p-2">2</th>
                                <th class="border border-gray-300 p-2">KN 1</th>
                                <th class="border border-gray-300 p-2">KN 2</th>
                            </tr>
                        </thead>
                        <tbody>
                        {[...data].map(([semester, items], index) => {
                            let count = 0
                            let tb10 = 0
                            let tb4 = 0
                            let countTC = 0
                        return (
                            <Fragment key={semester}>
                                <tr class="bg-gray-200">
                                    <td class="border border-gray-300 p-2 text-left text-blue-600 font-bold" colspan="24"><CellSemester Id={semester} /></td>
                                </tr>
                                {items.map((item, pos) => {
                                    let diem_chu = ''
                                    let xep_loai = ''
                                    let diem_4 = (item.diem_giua_ky * 0.4 + item.diem_cuoi_ky * 0.6)* 0.4
                                    countTC += item.tong_so_tiet / 15 + item.tong_so_tiet_th / 30
                                    tb10 += (item.diem_giua_ky * 0.4 + item.diem_cuoi_ky * 0.6) * (item.tong_so_tiet / 15 + item.tong_so_tiet_th / 30)
                                    tb4 += ((item.diem_giua_ky * 0.4 + item.diem_cuoi_ky * 0.6)* 0.4) * (item.tong_so_tiet / 15 + item.tong_so_tiet_th / 30)
                                    if(diem_4 >= 3.6){
                                        diem_chu = 'A'
                                        xep_loai = 'Xuất sắc'
                                    }
                                    else if(diem_4 >= 3.2){
                                        diem_chu = 'B+'
                                        xep_loai = 'Giỏi'
                                    }
                                    else if(diem_4 >= 2.5){
                                        diem_chu = 'B'
                                        xep_loai = 'Khá'
                                    }
                                    else if(diem_4 >= 2){
                                        diem_chu = 'C+'
                                        xep_loai = 'Trung bình khá'
                                    }
                                    else if(diem_4 >= 1.5){
                                        diem_chu = 'C'
                                        xep_loai = 'Trung bình'
                                    }
                                    else if(diem_4 >= 1.0){
                                        diem_chu = 'D+'
                                        xep_loai = 'Yếu'
                                    }
                                    else {
                                        diem_chu = 'F'
                                        xep_loai = 'Kém'
                                    }

                                return (
                                    <tr>
                                        <td class="border border-gray-300 p-2 text-center">{++count}</td>
                                        <td class="border border-gray-300 p-2 text-center">{item.ms_lop_hoc_phan}</td>
                                        <td class="border border-gray-300 p-2"><CellSubject Id={item.id_mon_hoc} /></td>
                                        <td class="border border-gray-300 p-2 text-center">{item.tong_so_tiet / 15 + item.tong_so_tiet_th / 30}</td>
                                        <td class="border border-gray-300 p-2 text-center">{item.diem_giua_ky !== null ? item.diem_giua_ky : '' }</td>
                                        <td class="border border-gray-300 p-2 text-center"></td>
                                        <td class="border border-gray-300 p-2 text-center"></td>
                                        <td class="border border-gray-300 p-2 text-center"></td>
                                        <td class="border border-gray-300 p-2 text-center">{item.diem_cuoi_ky !== null ? item.diem_cuoi_ky : '' }</td>
                                        <td class="border border-gray-300 p-2 text-center">{item.diem_cuoi_ky !== null ? (item.diem_giua_ky && (item.diem_giua_ky * 0.4 + item.diem_cuoi_ky * 0.6)) : ''}</td>
                                        <td class="border border-gray-300 p-2 text-center">{item.diem_cuoi_ky !== null ?  ((item.diem_giua_ky && (item.diem_giua_ky * 0.4 + item.diem_cuoi_ky * 0.6)* 0.4)) : ''}</td>
                                        <td class="border border-gray-300 p-2 text-center">
                                            {item.diem_cuoi_ky !== null ? diem_chu : ''}
                                        </td>
                                        <td class="border border-gray-300 p-2 text-center">{item.diem_cuoi_ky !== null ? xep_loai : ''}</td>
                                        <td class="border border-gray-300 p-2 text-center"></td>
                                        <td class="border border-gray-300 p-2 text-center"></td>
                                        <td class="border border-gray-300 p-2 text-center"></td>
                                        <td class="border border-gray-300 p-2 text-center">{item.diem_cuoi_ky !== null ? <i class="fas fa-check text-green-500"></i> : '' }</td>
                                    </tr>
                                )})}
                                <tr class="bg-white">
                                    <td class="border border-gray-300 p-2 text-left" colspan="2">Điểm trung bình học kỳ hệ 10: { tb10 / countTC }</td>
                                    <td class="border border-gray-300 p-2 text-left" colspan="15">Điểm trung bình tích lũy (hệ 4): { tb4 / countTC }</td>
                                </tr>
                                <tr class="bg-white">
                                    <td class="border border-gray-300 p-2 text-left" colspan="2">Điểm trung bình tích lũy: { tb10 / countTC }</td>
                                    <td class="border border-gray-300 p-2 text-left" colspan="15">Điểm trung bình tích lũy (hệ 4): { tb4 / countTC }</td>
                                </tr>
                                <tr class="bg-white">
                                    <td class="border border-gray-300 p-2 text-left" colspan="2">Tổng số tín chỉ đã đăng ký: {countTC}</td>
                                    <td class="border border-gray-300 p-2 text-left" colspan="15">Tổng số tín chỉ tích lũy: </td>
                                </tr>
                                <tr class="bg-white">
                                    <td class="border border-gray-300 p-2 text-left" colspan="2">Tổng số tính chỉ đạt: </td>
                                    <td class="border border-gray-300 p-2 text-left" colspan="15">Tổng số tín chỉ nợ tính đến hiện tại: 0</td>
                                </tr>
                                <tr class="bg-white">
                                    <td class="border border-gray-300 p-2 text-left" colspan="2">Xếp loại học lực tích lũy: Xuất sắc</td>
                                    <td class="border border-gray-300 p-2 text-left" colspan="15">Xếp loại rèn luyện học kỳ: Khá</td>
                                </tr>
                            </Fragment>
                            
                        )})}
                            
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Result