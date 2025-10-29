import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as XLSX from 'xlsx';
import { detectFace } from '../../services/faceService';
import "../../pages/FaceID/test.css";
import {getStudentByMssv} from '../../services/studentService';
import {getClassById} from '../../services/classService';
import {getClassScheduleByClassIdAndDate } from '../../services/classscheduleService';
import {getSectionClassById} from '../../services/sectionClassService';
import {getSubjectById} from '../../services/subjectService'
import { useNavigate } from "react-router-dom";

const FaceRecognition = ({ selectedSubject }) => {
  const webcamRef = useRef(null);
  const [canCapture, setCanCapture] = useState(true);
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();
  // console.log("Môn học nhận được:", selectedSubject);

  const handleClick = () => {
    navigate("/teacher/attendance"); 
  };


  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     if (webcamRef.current && canCapture) {
  //       const imageSrc = webcamRef.current.getScreenshot();
  //       if (imageSrc) {
  //         setCanCapture(false);
  //         const result = await detectFace(imageSrc);
  //         if (result && result.shouldSave) {
  //           const data = await getStudentByMssv("217060166");
  //           const classed = await getClassById(data.id_lop);
  //           const classschedule = await getClassScheduleByClassIdAndDate(data.id_lop);
  //           const sectionClass = await getSectionClassById(classschedule[1].id_lop_hoc_phan);
  //           // const subject = await getSubjectById(sectionClass[1].id_mon_hoc);
  //           console.log("data", classschedule);
  //           console.log(sectionClass);
  //           // console.log(subject);
          
  //           // const classschedule = await getClassScheduleById(data.id_lop);
  //           // console.log("Dữ liệu lớp học phần: ",classschedule);
  //           setDataList((prevDataList) => [
  //             ...prevDataList,
  //             { MSSV: result.match, NAME: data.ho_ten,CLASS: classed.ten_lop,TIME: result.time },
  //           ]);
  //         }
  //         setCanCapture(true);
  //       }
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [canCapture]);

  const sendAttendance = async (id_sinh_vien, id_lich_hoc) => {
      if (!id_sinh_vien || !id_lich_hoc) {
          console.error("Thiếu thông tin sinh viên hoặc lịch học.");
          return;
      }

      try {
          // Lấy thời gian hiện tại (HH:mm:ss - định dạng 24h)
          const now = new Date();
          const timeString = now.toLocaleTimeString("en-GB", { hour12: false });

          const response = await fetch("https://23tg8v1m-3333.asse.devtunnels.ms/api/diem-danh", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  id_sinh_vien,
                  id_lich_hoc,
                  thoi_gian: timeString,
              }),
          });

          // Kiểm tra xem phản hồi từ server có hợp lệ không
          if (!response.ok) {
              throw new Error(`Lỗi server: ${response.status}`);
          }

          const data = await response.json();
          
          if (data.success) {
              console.log(`✅ Điểm danh thành công: ${data.message}`);
          } else {
              console.warn(`⚠️ Điểm danh thất bại: ${data.message}`);
          }
      } catch (error) {
          console.error("❌ Lỗi khi gửi điểm danh:", error);
      }
  };






  useEffect(() => {
    const interval = setInterval(async () => {
        if (webcamRef.current && canCapture) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                setCanCapture(false);
                const result = await detectFace(imageSrc);

                if (result && result.shouldSave) {
                    const data = await getStudentByMssv(result.match);
                    const classed = await getClassById(data.id_lop);
                    const classschedule = await getClassScheduleByClassIdAndDate(data.id_lop);

                    if (!classschedule || classschedule.length === 0) {
                        console.log("Không có lịch học hôm nay!");
                        setCanCapture(true);
                        return;
                    }

                    // Xác định buổi học hiện tại
                    const currentHour = new Date().getHours();
                    let currentSession;
                    if (currentHour < 12) {
                        currentSession = 1;
                    } else if (currentHour < 18) {
                        currentSession = 2;
                    } else {
                        currentSession = 3;
                    }

                    // Lọc danh sách lớp học phù hợp với buổi học hiện tại
                    const currentClasses = classschedule.filter(cls => {
                        const startPeriod = cls.tu_tiet;
                        return (startPeriod <= 5 && currentSession === 1) || 
                               (startPeriod > 5 && startPeriod <= 10 && currentSession === 2) ||
                               (startPeriod > 10 && currentSession === 3);
                    });

                    if (!currentClasses.length) {
                        console.log(`Không có môn học vào buổi ${currentSession}`);
                        setCanCapture(true);
                        return;
                    }

                    let sentAttendance = new Set(); // Lưu các ID đã điểm danh
                    let subjects = [];

                    for (let cls of currentClasses) {
                        const sectionClass = await getSectionClassById(cls.id_lop_hoc_phan);
                        if (sectionClass && sectionClass.id_mon_hoc) {
                            const subject = await getSubjectById(sectionClass.id_mon_hoc);
                            subjects.push(subject.ten_mon);

                            // Chỉ gửi điểm danh nếu chưa có trong danh sách
                            if (!sentAttendance.has(cls.id_lich_hoc)) {
                                await sendAttendance(data.id_sinh_vien, cls.id_lich_hoc, result.time);
                                sentAttendance.add(cls.id_lich_hoc);
                            }
                        }
                    }

                    // Cập nhật danh sách dữ liệu điểm danh
                    setDataList((prevDataList) => [
                        ...prevDataList,
                        { 
                            MSSV: result.match, 
                            NAME: data.ho_ten,
                            CLASS: classed.ten_lop,
                            SUBJECT: subjects.join(", "), 
                            TIME: result.time 
                        },
                    ]);
                }
                setCanCapture(true);
            }
        }
    }, 1000);

    return () => clearInterval(interval);
}, [canCapture]);









  // Lưu file Excel
  const saveToExcel = () => {
    if (dataList.length === 0) {
      alert("Không có dữ liệu để xuất!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(dataList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DanhSachDiemDanh");
    XLSX.writeFile(wb, "DiemDanh.xlsx");
  };

  return (
    <>
      <div className="Top"><h1>Nhận diện khuôn mặt</h1></div>
      <form style={{ textAlign: 'center' }} className="webcam-container">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 1640, height: 1480 }}
          style={{ width: 900, height: 580, borderRadius: 10 }}
          className="webcam-flip webcam-fullscreen"
        />
      </form>
      <div className="right">
        <table border="1">
          <thead>
            <tr>
              <th>Mã số sinh viên</th>
              <th>Tên sinh viên</th>
              <th>Lớp</th>
              <th>Môn học</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index}>
                <td>{item.MSSV}</td>
                <td>{item.NAME}</td>
                <td>{item.CLASS}</td>
                <td>{item.SUBJECT}</td>
                <td>{item.TIME}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={saveToExcel} className="button-export">Xuất file Excel</button>
      <button onClick={handleClick} className="button-exportt">Quay lại</button>

    </>
  );
};

export default FaceRecognition;
