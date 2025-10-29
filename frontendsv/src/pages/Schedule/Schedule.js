import { useState, useEffect, useRef } from "react";
import { getJoinSchedulesByIdClass } from '../../service/scheduleService'
import { useInfoStudent } from '../../components/Common/GetInfoStudent'

import CellClass from '../../components/Common/ClassGetName'
import CellSubject from '../../components/Common/SubjectGetName'
import CellTeacher from '../../components/Common/TeacherGetName'
import CellRoom from '../../components/Common/RoomGetNam'
import CellSectionMS from '../../components/Common/SectionGetMS'
import Loader from '../../components/Common/Loader/Loader'

function Schedule() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [weekDates, setWeekDates] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [scheduleType, setScheduleType] = useState("all")
  // const infoStudent = InfoStudent()
  const { data: infoStudent, loading } = useInfoStudent()
  const [data, setData] = useState([])
  const [load, setLoad] = useState(true)
  const ref = useRef(null)
  
  useEffect(() => {
    if(infoStudent && infoStudent.id_lop){
      async function getSchedule(){
        const data  = await getJoinSchedulesByIdClass(infoStudent.id_lop)
        setData(data)
      }
      getSchedule()
    }
  }, [infoStudent])
  
  
  const newData = data.map(item => ({
    id_mon_hoc: item.id_mon_hoc,
    id_lop: item.id_lop, 
    loai: item.loai,
    session: item.session,
    so_tiet: item.so_tiet,
    tu_tiet: item.tu_tiet,
    den_tiet: item.den_tiet,
    id_phong: item.id_phong,
    id_giang_vien: item.id_giang_vien,
    id_lop_hoc_phan: item.id_lop_hoc_phan,
    // ngay: new Date(item.ngay).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }).split(" ")[1]
    ngay: item.ngay
  }))

  const groupedBySession = newData.reduce((acc, item) => {
    if (!acc[item.ngay]) {
      acc[item.ngay] = []
    }
    acc[item.ngay].push(item);
    return acc;
  }, {})

  
  function getSessionData(obj, key) {
    return obj[key] || null;
  }


  const calculateWeekDates = (date, offset) => {
    const baseDate = new Date(date);
    baseDate.setDate(baseDate.getDate() + offset * 7);
    const dayOfWeek = baseDate.getDay();
    const diff = baseDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    const monday = new Date(baseDate);
    monday.setDate(diff);
    const week = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
    setWeekDates(week);
  };

  useEffect(() => {
    calculateWeekDates(selectedDate, weekOffset);
  }, [selectedDate, weekOffset])

  // if (loading || !infoStudent || Object.keys(groupedBySession).length === 0) {
  //   return <Loader />;
  // }

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate)) {
      setSelectedDate(newDate);
      setWeekOffset(0); 
    }
  };

  const handlePrevWeek = () => {
    setWeekOffset((prev) => prev - 1);
  };

  const handleNextWeek = () => {
    setWeekOffset((prev) => prev + 1);
  };

  const handleCurrentWeek = () => {
    setSelectedDate(new Date());
    setWeekOffset(0);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleScheduleTypeChange = (e) => {
    setScheduleType(e.target.value);
  };

  useEffect(() => {
    ref.current = setTimeout(() => {
      setLoad(false)
    }, 1)
    return () => {
      clearTimeout(ref.current)
      setLoad(true)
    }
  }, [selectedDate, weekDates, weekOffset])

  if(load === true){
    return <Loader />
  }

  return (
    <div className="container mx-auto px-10 py-3 mt-20 relative">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4 justify-between">
          <h1 className="text-lg font-bold text-gray-700">Lịch học, lịch thi theo tuần</h1>
          <div className="flex flex-1 justify-end items-center">
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="schedule"
                  value="all"
                  className="form-radio text-gray-600"
                  checked={scheduleType === "all"}
                  onChange={handleScheduleTypeChange}
                />
                <span className="text-gray-600">Tất cả</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="schedule"
                  value="class"
                  className="form-radio text-gray-600"
                  checked={scheduleType === "class"}
                  onChange={handleScheduleTypeChange}
                />
                <span className="text-gray-600">Lịch học</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="schedule"
                  value="exam"
                  className="form-radio text-gray-600"
                  checked={scheduleType === "exam"}
                  onChange={handleScheduleTypeChange}
                />
                <span className="text-gray-600">Lịch thi</span>
              </label>
            </div>
            <div className="flex items-center space-x-2 ml-5">
              <input
                type="date"
                className="border border-gray-300 rounded p-1 outline-none"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={handleDateChange}
              />
              <button className="bg-blue-500 text-white p-2 rounded">
                <i className="fas fa-calendar-alt"></i>
              </button>
            </div>
            <div className="flex items-center space-x-2 ml-2">
              <button className="bg-blue-500 text-white p-2 rounded" onClick={handleCurrentWeek}>
                Hiện tại
              </button>
              <button className="bg-blue-500 text-white p-2 rounded" onClick={handlePrint}>
                In lịch
              </button>
              <button className="bg-blue-500 text-white p-2 rounded" onClick={handlePrevWeek}>
                {"< Trở về"}
              </button>
              <button className="bg-blue-500 text-white p-2 rounded" onClick={handleNextWeek}>
                {"Tiếp >"}
              </button>
              <button className="bg-blue-500 text-white p-2 rounded">
                <i className="fas fa-expand"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="border rounded-lg shadow-md overflow-hidden mt-4">
          <table className="w-full border-collapse border-2 border-gray-400 bg-white">
            <thead>
              <tr className="bg-blue-100 text-blue-600 text-center">
                <th className="border p-4 border-gray-400">Ca học</th>
                {weekDates.map((date, index) => (
                  <th key={index} className="border p-4 border-gray-400">
                    {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"][index]}
                    <br />
                    {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 text-center bg-[#ffffce] font-bold text-xl h-60">Sáng</td>
                {weekDates.map((date, index) => {
                    const [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()]
                    const dateHere = new Date(year, month, day)
                    if(getSessionData(groupedBySession, dateHere.toISOString())){
                      const arr = getSessionData(groupedBySession, dateHere.toISOString())
                      let pos1 = -1
                      let pos2 = -1
                      let posTH = -1
                      arr.map((item, index) => {
                        if(item.session === 1){
                          if(item.loai === 2){
                            posTH = index
                          }
                          else {
                            if(item.so_tiet === 2){
                              pos1 = index
                            }
                            else {
                              pos2 = index
                            }
                          }
                        }
                      })

                      if(posTH > -1){
                        return (
                          <td
                            key={index}
                            className="border p-4 relative border-gray-400 min-h-[80px]"
                            style={{
                              backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                                linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                              backgroundSize: "55px 55px",
                            }}
                          >
                          <div className={` bg-green-500 text-white p-4 text-sm rounded-lg w-32 mx-auto text-center`}>
                            <strong><CellSubject Id={arr[posTH].id_mon_hoc} /></strong>
                            <p><CellClass Id={arr[posTH].id_lop} /> - </p>
                            <p><CellSectionMS Id={arr[posTH].id_lop_hoc_phan} /></p>
                            <p>Tiết: {arr[posTH].tu_tiet} - {arr[posTH].den_tiet}</p>
                            <p>Phòng: VT4</p>
                            <p>GV: <CellTeacher Id={arr[posTH].id_giang_vien} /></p>
                          </div>
                        </td>
                        )
                      }

                      else {
                        if(pos1 > -1 && pos2 > -1){
                          return (
                            <td
                              key={index}
                              className="border p-4 relative border-gray-400 min-h-[80px]"
                              style={{
                                backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                                  linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                                backgroundSize: "55px 55px",
                              }}
                            >
                            <div className={` bg-gray-300 text-black p-4 text-sm rounded-lg w-32 mx-auto text-center`}>
                              <strong><CellSubject Id={arr[pos2].id_mon_hoc} /></strong>
                              <p><CellClass Id={arr[pos2].id_lop} /> - </p>
                              <p><CellSectionMS Id={arr[pos2].id_lop_hoc_phan} /></p>
                              <p>Tiết: {arr[pos2].tu_tiet} - {arr[pos2].den_tiet}</p>
                              <p>Phòng: <CellRoom Id={arr[pos2].id_phong} /></p>
                              <p>GV: <CellTeacher Id={arr[pos2].id_giang_vien} /></p>
                            </div>
                            <div className={` mt-2 bg-gray-300 text-black p-4 text-sm rounded-lg w-32 mx-auto text-center`}>
                              <strong><CellSubject Id={arr[pos1].id_mon_hoc} /></strong>
                              <p><CellClass Id={arr[pos1].id_lop} /> - </p>
                              <p><CellSectionMS Id={arr[pos1].id_lop_hoc_phan} /></p>
                              <p>Tiết: {arr[pos1].tu_tiet} - {arr[pos1].den_tiet}</p>
                              <p>Phòng: <CellRoom Id={arr[pos1].id_phong} /></p>
                              <p>GV: <CellTeacher Id={arr[pos1].id_giang_vien} /></p>
                            </div>
                          </td>
                          )
                        }
                        else if(pos1 > -1 && pos2 === -1){
                          return (
                            <td
                              key={index}
                              className="border p-4 relative border-gray-400 min-h-[80px] "
                              style={{
                                backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                                  linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                                backgroundSize: "55px 55px",
                              }}
                            >
                            <div className={` mt-2 bg-gray-300 text-black p-4 text-sm rounded-lg w-32 mx-auto text-center`}>
                              <strong><CellSubject Id={arr[pos1].id_mon_hoc} /></strong>
                              <p><CellClass Id={arr[pos1].id_lop} /> - </p>
                              <p><CellSectionMS Id={arr[pos1].id_lop_hoc_phan} /></p>
                              <p>Tiết: {arr[pos1].tu_tiet} - {arr[pos1].den_tiet}</p>
                              <p>Phòng: <CellRoom Id={arr[pos1].id_phong} /></p>
                              <p>GV: <CellTeacher Id={arr[pos1].id_giang_vien} /></p>
                            </div>
                          </td>
                          )
                        }
                        else if(pos1 === -1 && pos2 > -1){
                          return (
                            <td
                              key={index}
                              className="border p-4 relative border-gray-400 min-h-[80px]"
                              style={{
                                backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                                  linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                                backgroundSize: "55px 55px",
                              }}
                            >
                            <div className={` bg-gray-300 text-black p-4 text-sm rounded-lg w-32 mx-auto text-center`}>
                              <strong><CellSubject Id={arr[pos2].id_mon_hoc} /></strong>
                              <p><CellClass Id={arr[pos2].id_lop} /> - </p>
                              <p><CellSectionMS Id={arr[pos2].id_lop_hoc_phan} /></p>
                              <p>Tiết: {arr[pos2].tu_tiet} - {arr[pos2].den_tiet}</p>
                              <p>Phòng: <CellRoom Id={arr[pos2].id_phong} /></p>
                              <p>GV: <CellTeacher Id={arr[pos2].id_giang_vien} /></p>
                            </div>
                          </td>
                          )
                        }
                        else {
                          return(
                            <td
                              key={index}
                              className="border p-4 relative border-gray-400 min-h-[80px]"
                              style={{
                                backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                                  linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                                backgroundSize: "55px 55px",
                              }}
                            >
  
                              </td>
                          )
                        }
                      } 
                    }
                    else {
                      return(
                        <td
                          key={index}
                          className="border p-4 relative border-gray-400 min-h-[80px]"
                          style={{
                            backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                              linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                            backgroundSize: "55px 55px",
                          }}
                        >

                          </td>
                      )
                    }
                    })}
              </tr>
              <tr>
                <td className="border border-gray-400 text-center bg-[#ffffce] font-bold text-xl">Chiều</td>
                {weekDates.map((date, index) => {
                    const [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()]
                    const dateHere = new Date(year, month, day)
                    if(getSessionData(groupedBySession, dateHere.toISOString())){
                      const arr = getSessionData(groupedBySession, dateHere.toISOString())
                      let pos1 = -1
                      let pos2 = -1
                      let posTH = -1
                      arr.map((item, index) => {
                        if(item.session === 2){
                          if(item.loai === 2){
                            posTH = index
                          }
                          else {
                            if(item.so_tiet === 2){
                              pos1 = index
                            }
                            else {
                              pos2 = index
                            }
                          }
                        }
                      })

                      if(posTH > -1){
                        return (
                          <td
                            key={index}
                            className="border p-4 relative border-gray-400 min-h-[80px]"
                            style={{
                              backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                                linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                              backgroundSize: "55px 55px",
                            }}
                          >
                          <div className={` bg-green-500 text-white p-4 text-sm rounded-lg w-32 mx-auto text-center`}>
                            <strong><CellSubject Id={arr[posTH].id_mon_hoc} /></strong>
                            <p><CellClass Id={arr[posTH].id_lop} /> - </p>
                            <p><CellSectionMS Id={arr[posTH].id_lop_hoc_phan} /></p>
                            <p>Tiết: {arr[posTH].tu_tiet} - {arr[posTH].den_tiet}</p>
                            <p>Phòng: VT4</p>
                            <p>GV: <CellTeacher Id={arr[posTH].id_giang_vien} /></p>
                          </div>
                        </td>
                        )
                      }

                      else {
                        if(pos1 > -1 && pos2 > -1){
                          return (
                            <td
                              key={index}
                              className="border p-4 relative border-gray-400 min-h-[80px] h-60"
                              style={{
                                backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                                  linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                                backgroundSize: "55px 55px",
                              }}
                            >
                            <div className={` bg-gray-300 text-black p-4 text-sm rounded-lg w-32 mx-auto text-center`}>
                              <strong><CellSubject Id={arr[pos2].id_mon_hoc} /></strong>
                              <p><CellClass Id={arr[pos2].id_lop} /> - </p>
                              <p><CellSectionMS Id={arr[pos2].id_lop_hoc_phan} /></p>
                              <p>Tiết: {arr[pos2].tu_tiet} - {arr[pos2].den_tiet}</p>
                              <p>Phòng: <CellRoom Id={arr[pos2].id_phong} /></p>
                              <p>GV: <CellTeacher Id={arr[pos2].id_giang_vien} /></p>
                            </div>
                            <div className={` mt-2 bg-gray-300 text-black p-4 text-sm rounded-lg w-32 mx-auto text-center`}>
                              <strong><CellSubject Id={arr[pos1].id_mon_hoc} /></strong>
                              <p><CellClass Id={arr[pos1].id_lop} /> - </p>
                              <p><CellSectionMS Id={arr[pos1].id_lop_hoc_phan} /></p>
                              <p>Tiết: {arr[pos1].tu_tiet} - {arr[pos1].den_tiet}</p>
                              <p>Phòng: <CellRoom Id={arr[pos1].id_phong} /></p>
                              <p>GV: <CellTeacher Id={arr[pos1].id_giang_vien} /></p>
                            </div>
                          </td>
                          )
                        }
                        else if(pos1 > -1 && pos2 === -1){
                          return (
                            <td
                              key={index}
                              className="border p-4 relative border-gray-400 min-h-[80px]"
                              style={{
                                backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                                  linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                                backgroundSize: "55px 55px",
                              }}
                            >
                            <div className={` mt-2 bg-gray-300 text-black p-4 text-sm rounded-lg w-32 mx-auto text-center`}>
                              <strong><CellSubject Id={arr[pos1].id_mon_hoc} /></strong>
                              <p><CellClass Id={arr[pos1].id_lop} /> - </p>
                              <p><CellSectionMS Id={arr[pos1].id_lop_hoc_phan} /></p>
                              <p>Tiết: {arr[pos1].tu_tiet} - {arr[pos1].den_tiet}</p>
                              <p>Phòng: <CellRoom Id={arr[pos1].id_phong} /></p>
                              <p>GV: <CellTeacher Id={arr[pos1].id_giang_vien} /></p>
                            </div>
                          </td>
                          )
                        }
                        else if(pos1 === -1 && pos2 > -1){
                          return (
                            <td
                              key={index}
                              className="border p-4 relative border-gray-400 min-h-[80px]"
                              style={{
                                backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                                  linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                                backgroundSize: "55px 55px",
                              }}
                            >
                            <div className={` bg-gray-300 text-black p-4 text-sm rounded-lg w-32 mx-auto text-center`}>
                              <strong><CellSubject Id={arr[pos2].id_mon_hoc} /></strong>
                              <p><CellClass Id={arr[pos2].id_lop} /> - </p>
                              <p><CellSectionMS Id={arr[pos2].id_lop_hoc_phan} /></p>
                              <p>Tiết: {arr[pos2].tu_tiet} - {arr[pos2].den_tiet}</p>
                              <p>Phòng: <CellRoom Id={arr[pos2].id_phong} /></p>
                              <p>GV: <CellTeacher Id={arr[pos2].id_giang_vien} /></p>
                            </div>
                          </td>
                          )
                        }
                        else {
                          return(
                            <td
                              key={index}
                              className="border p-4 relative border-gray-400 min-h-[80px]"
                              style={{
                                backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                                  linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                                backgroundSize: "55px 55px",
                              }}
                            >
  
                              </td>
                          )
                        }
                      }   
                    }
                    else {
                      return(
                        <td
                          key={index}
                          className="border p-4 relative border-gray-400 min-h-[80px] h-60"
                          style={{
                            backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                              linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                            backgroundSize: "55px 55px",
                          }}
                        >

                          </td>
                      )
                    }
                    })}
              </tr>
              <tr>
                <td className="h-60 border p-4 border-gray-400 text-center bg-[#ffffce] font-bold text-xl">Tối </td>
                {weekDates.map((date, index) => {
                    
                      return(
                        <td
                          key={index}
                          className="border p-4 relative border-gray-400 min-h-[80px]"
                          style={{
                            backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                              linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                            backgroundSize: "55px 55px",
                          }}
                        >
                          </td>
                      )
                })
                } 
                  
              </tr>
              {/* {["Sáng", "Chiều", "Tối"].map((session, sessionIndex) => (
                <tr key={sessionIndex}>
                  <td className="border p-4 bg-yellow-100 font-bold text-center border-gray-400 min-h-[80px]">
                    {session}
                  </td>
                  {weekDates.map((_, dayIndex) => (
                    <td
                      key={dayIndex}
                      className="border p-4 relative border-gray-400 min-h-[80px]"
                      style={{
                        backgroundImage: `linear-gradient(0deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent),
                                          linear-gradient(90deg, transparent 24%, #E1E1E1 25%, #E1E1E1 26%, transparent 27%,transparent 74%, #E1E1E1 75%, #E1E1E1 76%, transparent 77%,transparent)`,
                        backgroundSize: "55px 55px",
                      }}
                    >
                      {renderScheduleItem(session, dayIndex)}
                    </td>
                  ))}
                </tr>
              ))} */}
            </tbody>
          </table>
          <div className="flex justify-center gap-4 p-4 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 bg-gray-200 inline-block"></span> Lịch học lý thuyết
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 bg-green-500 inline-block"></span> Lịch học thực hành
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 bg-blue-300 inline-block"></span> Lịch học trực tuyến
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 bg-yellow-300 inline-block"></span> Lịch thi
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 bg-red-500 inline-block"></span> Lịch tạm ngưng
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;