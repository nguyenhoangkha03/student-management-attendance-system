import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const StudentChart = () => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    
    if (!ctx) return;
    
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["2020", "2021", "2022", "2023", "2024"],
        datasets: [
          {
            label: "Sinh viên",
            data: [5000, 7000, 10000, 15000, 12000],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(54, 162, 235, 1)",
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 7500,
              font: {
                size: 12,
                weight: 'bold',
              }
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
            }
          },
          x: {
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold',
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 13,
            },
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        maintainAspectRatio: false,
      },
    });
    
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-t from-[#D9AFD9] to-[#97D9E1] rounded-md max-w-3xl h-full p-5">

      <div className=" rounded-md mb-4">
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-gray-500 text-sm mb-1">Tổng sinh viên</p>
            <p className="text-2xl font-bold text-gray-800">12,000</p>
            <p className="text-xs text-green-500 mt-1">↑ 20% so với năm trước</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-gray-500 text-sm mb-1">Sinh viên mới</p>
            <p className="text-2xl font-bold text-gray-800">3,500</p>
            <p className="text-xs text-red-500 mt-1">↓ 5% so với năm trước</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-gray-500 text-sm mb-1">Tỷ lệ hoàn thành</p>
            <p className="text-2xl font-bold text-gray-800">85%</p>
            <p className="text-xs text-green-500 mt-1">↑ 3% so với năm trước</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-gray-500 text-sm mb-1">Điểm trung bình</p>
            <p className="text-2xl font-bold text-gray-800">7.8</p>
            <p className="text-xs text-green-500 mt-1">↑ 0.2 so với năm trước</p>
          </div>
        </div>
      </div>
      
      <div className="relative h-80 mb-8 mt-8">
        <canvas
          className="student-chart"
          ref={canvasRef}
        ></canvas>
      </div>
      
      <div className="grid grid-cols-5 gap-4 text-center text-sm text-gray-600 mt-6">
        <div className="bg-blue-50 p-2 rounded">
          <p className="font-semibold">2020</p>
          <p className="text-lg font-bold text-gray-800">5,000</p>
        </div>
        <div className="bg-blue-50 p-2 rounded">
          <p className="font-semibold">2021</p>
          <p className="text-lg font-bold text-gray-800">7,000</p>
        </div>
        <div className="bg-blue-50 p-2 rounded">
          <p className="font-semibold">2022</p>
          <p className="text-lg font-bold text-gray-800">10,000</p>
        </div>
        <div className="bg-blue-100 p-2 rounded border-2 border-blue-300">
          <p className="font-semibold">2023</p>
          <p className="text-lg font-bold text-gray-800">15,000</p>
        </div>
        <div className="bg-blue-50 p-2 rounded">
          <p className="font-semibold">2024</p>
          <p className="text-lg font-bold text-gray-800">12,000</p>
        </div>
      </div>
    </div>
  );
};

export default StudentChart;