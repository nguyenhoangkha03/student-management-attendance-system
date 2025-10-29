import { Link } from 'react-router-dom'
import { InfoStudent } from '../../components/Common/GetInfoStudent-NL' 
import { getAllJoinSectionClassesByIdStudent } from '../../service/sectionClassService' 
import { useEffect, useState, useRef } from 'react'
import { Chart, registerables  } from 'chart.js'

function Home() {

  const chartRef = useRef()
  const infoStudent = InfoStudent()

  Chart.register(...registerables)
  let myChart = null

  // useEffect(() => {
  //   if(infoStudent.id_sinh_vien !== undefined){
  //     async function getData(){
  //       const data = await getAllJoinSectionClassesByIdStudent(infoStudent.id_sinh_vien)

  //       const groupedBySemester = data.reduce((acc, item) => {
  //         if (!acc[item.id_hoc_ky]) {
  //           acc[item.id_hoc_ky] = []
  //         }
  //         acc[item.id_hoc_ky].push(item)
  //         return acc
  //       }, {})

  //       const sortedMap = new Map(
  //         Object.entries(groupedBySemester)
  //           .map(([key, value]) => [Number(key), value])
  //           .sort((a, b) => b[0] - a[0]) // Sắp xếp giảm dần
  //       );

  //       setData(sortedMap)
  //     }
  //     getData()
  //   }
  // }, [infoStudent])

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (myChart) {
          myChart.destroy();
      }

          myChart = new Chart(ctx, {
              type: "bar",
              data: {
                  labels: ["Công nghệ Web", "Khai khoáng dữ liệu", "Lập trình nhúng IoT", "Lập trình truyền thông"],
                  datasets: [
                      {
                          label: "Điểm của bạn",
                          data: [9.5, 8.3, 9, 9],
                          backgroundColor: "rgba(255, 99, 132, 0.8)",
                          borderColor: "rgba(255, 99, 132, 1)",
                          borderWidth: 1,
                      },
                      {
                          label: "Điểm TB lớp học phần",
                          data: [9.5, 8.3, 9, 9],
                          type: "line",
                          fill: false,
                          borderColor: "rgba(255, 205, 86, 1)",
                          backgroundColor: "rgba(255, 205, 86, 0.8)",
                          borderWidth: 2,
                          pointBackgroundColor: "rgba(255, 205, 86, 1)",
                          pointBorderColor: "#fff",
                          pointHoverBackgroundColor: "#fff",
                          pointHoverBorderColor: "rgba(255, 205, 86, 1)",
                      },
                  ],
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true,
                          title: {
                              display: true,
                              text: "Điểm TB học phần",
                              color: "#3b82f6",
                              font: {
                                  size: 14,
                                  weight: "bold",
                              },
                          },
                      },
                      x: {
                          title: {
                              display: true,
                              color: "#3b82f6",
                              font: {
                                  size: 14,
                                  weight: "bold",
                              },
                          },
                      },
                  },
                  plugins: {
                      legend: {
                          display: false,
                      },
                      tooltip: {
                          callbacks: {
                              label: function (context) {
                                  let label = context.dataset.label || "";
                                  if (label) {
                                      label += ": ";
                                  }
                                  if (context.parsed.y !== null) {
                                      label += context.parsed.y;
                                  }
                                  return label;
                              },
                          },
                      },
                  },
              },
          });
      }

      return () => {
          if (myChart) {
              myChart.destroy();
          }
      };
  }, [])

  return (
    <main class="container mx-auto px-10 py-6 mt-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="flex items-center">
            {infoStudent.imageBase64 === undefined 
            ?
              <h1>Loading...</h1>
            :
              <img
                alt="Student Photo"
                class="h-24 w-24 rounded-lg object-cover"
                height="100"
                src={infoStudent.imageBase64}
                width="100"
              />
            }
            <div class="ml-4">
              <h2 class="text-xl font-bold">Thông tin sinh viên</h2>
              <div class="flex items-center mt-2">
                <span class="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  2023-2024
                </span>
                <span class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs ml-2">
                  2022-2023
                </span>
              </div>
            </div>
          </div>
          <div class="mt-4 flex">
            <div className="flex-1">
                <p>
                    <strong>MSSV: </strong>
                    {infoStudent.mssv}
                </p>
                <p class="my-1">
                    <strong>Họ tên: </strong>
                    {infoStudent.ho_ten}
                </p>
                <p>
                    <strong>Giới tính: </strong>
                    {infoStudent.gioi_tinh === undefined 
                    ?
                      <span>Loading...</span>
                    :
                      infoStudent.gioi_tinh === 1 ? 'Nam' : 'Nữ'
                    } 
                </p>
            </div>
            <div className="flex-1">
                <p>
                    <strong>Ngày sinh: </strong>
                    {infoStudent && infoStudent.ngay_sinh 
                    ? new Date(infoStudent.ngay_sinh).toLocaleDateString('vi-VN') 
                    : "Loading..."}
                </p>
                <p class="my-1">
                    <strong>Nơi sinh: </strong>
                    {infoStudent.dia_chi}
                </p>
                <p>
                    <strong>Trạng thái: </strong>
                    Đang học
                </p>
            </div>
          </div>
          <div className="text-blue-500 mt-2 cursor-pointer" >
            <Link to="/profile">
              Xem chi tiết
            </Link>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-xl font-bold">Nhắc nhở mới, chưa xem</h2>
          <div class="mt-1">
            <p class="text-5xl font-bold mt-4">5</p>
            <p className="mt-4 text-justify">
              TRƯỜNG ĐẠI HỌC HARVARD - Thông báo lịch học thay đổi - Lập trình
              web với PHP và MYSQL - Ngày 11/03/2025, Tiết 12-14, Phòng CR_VT12
            </p>
            <div class="text-blue-500 inline-block mt-5" href="#" >
              <Link to="/news">
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
            <Link to="/schedule" class="flex-1">
              <div class="cursor-pointer px-4 rounded-lg h-full shadow bg-[#e0fbff] flex-1 flex flex-col justify-center relative">
                  <h2 class="text-xl font-bold">Lịch học trong tuần</h2>
                  <div class="mt-2">
                      <p class="text-3xl font-bold">5</p>
                      <span class="text-blue-500 inline-block mt-1" href="#">
                          Xem chi tiết
                      </span>
                  </div>
                  <div class="absolute right-4 text-blue-500 h-8 w-8 rounded-[50%] flex items-center justify-center border border-blue-500">
                      <i class="fa fa-calendar"></i>
                  </div>
              </div>
            </Link>
            <Link to="/examSchedule" class="flex-1">
            <div class="cursor-pointer bg-[#fff2d4] px-4 rounded-lg h-full shadow flex-1 flex flex-col justify-center relative">
                <h2 class="text-xl font-bold">Lịch thi trong tuần</h2>
                <div class="mt-1">
                    <p class="text-3xl font-bold">0</p>
                    <span class="text-orange-500 inline-block mt-1" href="#">
                        Xem chi tiết
                    </span>
                </div>
                <div class="absolute right-4 text-orange-500 h-8 w-8 rounded-[50%] flex items-center justify-center border border-orange-500">
                    <i class="fa-regular fa-calendar-check"></i>
                </div>
            </div>
            </Link>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-6 gap-6 mt-6">
        <Link to="/result">
          <div class="bg-white p-4 rounded-lg shadow text-center cursor-pointer">
            <i class="fas fa-chart-bar text-2xl text-blue-500"></i>
            <p class="mt-2">Kết quả học tập</p>
          </div>
        </Link>
        <Link to="/schedule">
          <div class="bg-white p-4 rounded-lg shadow text-center cursor-pointer">
            <i class="fas fa-calendar-alt text-2xl text-blue-500"></i>
            <p class="mt-2">Lịch theo tuần</p>
          </div>
        </Link>
        <Link to="/register-section">
          <div class="bg-white p-4 rounded-lg shadow text-center cursor-pointer">
            <i class="fas fa-book text-2xl text-blue-500"></i>
            <p class="mt-2">Đăng ký học phần</p>
          </div>
        </Link>
        <Link to="/schedule">
          <div class="bg-white p-4 rounded-lg shadow text-center cursor-pointer">
            <i class="fas fa-tasks text-2xl text-blue-500"></i>
            <p class="mt-2">Lịch theo tiến độ</p>
          </div>
        </Link>
        <Link to="/debt">
          <div class="bg-white p-4 rounded-lg shadow text-center cursor-pointer">
            <i class="fas fa-dollar-sign text-2xl text-blue-500"></i>
            <p class="mt-2">Tra cứu công nợ</p>
          </div>
        </Link>
        <Link to="/pay-online">
          <div class="bg-white p-4 rounded-lg shadow text-center cursor-pointer">
            <i class="fas fa-credit-card text-2xl text-blue-500"></i>
            <p class="mt-2">Thanh toán trực tuyến</p>
          </div>
        </Link>
        {/* <div class="bg-white p-4 rounded-lg shadow text-center">
          <i class="fas fa-receipt text-2xl text-blue-500"></i>
          <p class="mt-2">Phiếu thu tổng hợp</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow text-center">
          <i class="fas fa-file-alt text-2xl text-blue-500"></i>
          <p class="mt-2">Đề xuất biểu mẫu</p>
        </div> */}
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Kết quả học tập</h2>
            <select class="border rounded px-2 py-1">
              <option>Học kỳ 2 (2024-2025)</option>
            </select>
          </div>
          <div class="mt-4">
            <div class="w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
              <canvas ref={chartRef} id="myChart"></canvas>
              <div class="flex justify-center mt-4">
                  <div class="flex items-center mr-4">
                      <span class="inline-block w-3 h-3 mr-2 bg-red-500 rounded-full"></span>
                      <span>Điểm của bạn:</span>
                  </div>
                  <div class="flex items-center">
                      <span class="inline-block w-3 h-3 mr-2 bg-yellow-500 rounded-full"></span>
                      <span>Điểm TB lớp học phần:</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-xl font-bold">Tiến độ học tập</h2>
          <div class="mt-4 flex justify-center">
            <div className="w-52 h-52 relative">
              <svg className="w-full h-full" width="100" height="100" viewBox="0 0 100 100">
                <g transform="rotate(-90 50 50)">
                  <circle cx="50" cy="50" r="45" stroke="#60A5FA" stroke-width="10" fill="none" />
                  <circle cx="50" cy="50" r="30" stroke="white" stroke-width="20" fill="none"  />
                  <circle cx="50" cy="50" r="30" stroke="#10B981" stroke-width="20" fill="none" stroke-dasharray="165.96 22.48" stroke-linecap="round" />
                </g>
              </svg>
            </div>
          </div>
          <p class="text-center mt-2 text-xl font-bold">140/159</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Lớp học phần</h2>
            <select class="border rounded px-2 py-1">
              <option>Học kỳ 2 (2024-2025)</option>
            </select>
          </div>
          <div class="mt-4">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="text-left">Môn học/học phần</th>
                  <th class="text-center">Số tín chỉ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2">030100261802</td>
                  <td class="text-center">4</td>
                </tr>
                <tr>
                    <td>
                        Phát triển phần mềm
                    </td>
                </tr>
                <tr></tr>
                <tr>
                  <td class="py-2">030100225102</td>
                  <td class="text-center">6</td>
                </tr>
                <tr>
                    <td>
                        Thực tập tốt nghiệp - CNTT
                    </td>
                </tr>
                <tr></tr>
                <tr>
                  <td class="py-2">030100053602</td>
                  <td class="text-center">2</td>
                </tr>
                <tr>
                    <td>
                        Thương mại điện tử - CNTT
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
