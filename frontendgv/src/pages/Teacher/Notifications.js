import React, { useState } from "react";
import { Bell, CheckCircle, Info, AlertTriangle } from "lucide-react";
import logo from "../../assets/imgs/logo__1_-removebg-preview (1).png";
import { Calendar, BookOpen, User } from "lucide-react";
import { Trash2 } from "lucide-react";
import Header from "../../components/Header";
const notificationsData = [
  { id: 1, type: "info", message: "Cuộc họp giáo viên vào 10h sáng mai.", time: "19/02/2025", read: false },
  { id: 2, type: "alert", message: "Hạn cuối nhập điểm là ngày 25/02/2025.", time: "18/02/2025", read: false },
  { id: 3, type: "success", message: "Lương tháng 01/2025 đã được chuyển khoản.", time: "15/02/2025", read: true },
  { id: 4, type: "info", message: "Sinh viên đã gửi yêu cầu thay đổi lịch học.", time: "14/02/2025", read: false },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  // hàm nhận kt đọc tin nhắn
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  // hàm kt thông báo
  const filteredNotifications = notifications.filter(
    (notif) => filter === "all" || (filter === "unread" && !notif.read)
  );
  // hàm xóa thông báo
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };
  // hàm phân trang 
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const displayedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen from-blue-800 to-white text-black flex flex-col mt-24 ">
        <Header />
        <div className="p-5">
        <h2 className="text-xl font-semibold text-red-500 mb-4 flex items-center gap-2">
        <Bell size={24} /> Thông báo ({filteredNotifications.length})
      </h2>

      <div className="flex justify-between mb-4">
        <button
          className={`p-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          Tất cả
        </button>
        <button
          className={`p-2 rounded ${filter === "unread" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("unread")}
        >
          Chưa đọc
        </button>
      </div>

      <div className="space-y-3">
        {displayedNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-center gap-3 p-3 rounded-lg border ${notif.read ? "bg-gray-100" : "bg-blue-50"}`}
          >
            {notif.type === "info" && <Info className="text-blue-500" />}
            {notif.type === "alert" && <AlertTriangle className="text-red-500" />}
            {notif.type === "success" && <CheckCircle className="text-green-500" />}
            <div className="w-full">
              <p className="text-lg text-gray-800 font-semibold">{notif.message}</p>
              <span className="text-sm text-gray-500 block w-40">{notif.time}</span>
            </div>
            {!notif.read && (
              <button
                className="text-blue-500 text-sm"
                onClick={() => markAsRead(notif.id)}
              >
                Đánh dấu đã đọc
              </button>
            )}
            <button
              className="text-red-500 text-sm"
              onClick={() => deleteNotification(notif.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4 fixed bottom-0 left-0 right-0">
        <button
          className="p-2 bg-green-300 rounded font-semibold"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button
          className="p-2 bg-green-300 rounded font-semibold"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Trang sau
        </button>
      </div>
          </div>
    </div>
  );
}
