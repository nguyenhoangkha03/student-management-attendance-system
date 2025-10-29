function Main(){
    
    return (
        <main class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-4 rounded-lg shadow">
            <div class="flex items-center">
            <img alt="Student Photo" class="h-24 w-24 rounded-lg" height="100" src="https://storage.googleapis.com/a1aa/image/yeCVrJTQKmfP-omlI5LIr6O-bOqKwoqoyHXosgurClM.jpg" width="100"/>
            <div class="ml-4">
            <h2 class="text-xl font-bold">
                Thông tin sinh viên
            </h2>
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
            <div class="mt-4">
            <p>
            <strong>
                MSSV:
            </strong>
            217060159
            </p>
            <p>
            <strong>
                Họ tên:
            </strong>
            Nguyễn Hoàng Kha
            </p>
            <p>
            <strong>
                Giới tính:
            </strong>
            Nam
            </p>
            <p>
            <strong>
                Ngày sinh:
            </strong>
            19/10/2003
            </p>
            <p>
            <strong>
                Nơi sinh:
            </strong>
            Tỉnh Sóc Trăng
            </p>
            <p>
            <strong>
                Trạng thái:
            </strong>
            Đang học
            </p>
            <a class="text-blue-500" href="#">
            Xem chi tiết
            </a>
            </div>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
            <h2 class="text-xl font-bold">
            Nhắc nhở mới, chưa xem
            </h2>
            <div class="mt-4">
            <p class="text-2xl font-bold">
            5
            </p>
            <p>
            TRƯỜNG ĐẠI HỌC TÂY ĐÔ - Thông báo lịch học thay đổi - Lập trình web với PHP và MYSQL - Ngày 11/03/2025, Tiết 12-14, Phòng CR_VT12
            </p>
            <a class="text-blue-500" href="#">
            Xem chi tiết
            </a>
            </div>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
            <h2 class="text-xl font-bold">
            Lịch học trong tuần
            </h2>
            <div class="mt-4">
            <p class="text-2xl font-bold">
            5
            </p>
            <a class="text-blue-500" href="#">
            Xem chi tiết
            </a>
            </div>
            <h2 class="text-xl font-bold mt-6">
            Lịch thi trong tuần
            </h2>
            <div class="mt-4">
            <p class="text-2xl font-bold">
            0
            </p>
            <a class="text-orange-500" href="#">
            Xem chi tiết
            </a>
            </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div class="bg-white p-4 rounded-lg shadow">
            <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">
            Kết quả học tập
            </h2>
            <select class="border rounded px-2 py-1">
            <option>
                Học kỳ 2 (2024-2025)
            </option>
            </select>
            </div>
            <div class="mt-4">
            <img alt="Graph showing academic results" class="w-full h-48" height="200" src="https://storage.googleapis.com/a1aa/image/oeKgazyNAv_4gjsksI0MOrIgcskSaeMVs7RHqiY0P7k.jpg" width="300"/>
            </div>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
            <h2 class="text-xl font-bold">
            Tiến độ học tập
            </h2>
            <div class="mt-4 flex justify-center">
            <img alt="Circular progress chart showing study progress" class="w-48 h-48" height="200" src="https://storage.googleapis.com/a1aa/image/Jgf8sRN9TjaRL5Xz2C2YUGwjLPtHlW0DAU8-5IJKrLc.jpg" width="200"/>
            </div>
            <p class="text-center mt-2 text-xl font-bold">
            140/159
            </p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
            <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">
            Lớp học phần
            </h2>
            <select class="border rounded px-2 py-1">
            <option>
                Học kỳ 2 (2024-2025)
            </option>
            </select>
            </div>
            <div class="mt-4">
            <table class="w-full">
            <thead>
                <tr>
                <th class="text-left">
                Môn học/học phần
                </th>
                <th class="text-right">
                Số tín chỉ
                </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td class="py-2">
                030100261802 Phát triển phần mềm
                </td>
                <td class="text-right">
                4
                </td>
                </tr>
                <tr>
                <td class="py-2">
                030100225102 Thực tập tốt nghiệp - CNTT
                </td>
                <td class="text-right">
                6
                </td>
                </tr>
                <tr>
                <td class="py-2">
                030100053602 Thương mại điện tử - CNTT
                </td>
                <td class="text-right">
                2
                </td>
                </tr>
            </tbody>
            </table>
            </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-6 gap-6 mt-6">
            <div class="bg-white p-4 rounded-lg shadow text-center">
            <i class="fas fa-chart-bar text-2xl text-blue-500">
            </i>
            <p class="mt-2">
            Kết quả học tập
            </p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow text-center">
            <i class="fas fa-calendar-alt text-2xl text-blue-500">
            </i>
            <p class="mt-2">
            Lịch theo tuần
            </p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow text-center">
            <i class="fas fa-book text-2xl text-blue-500">
            </i>
            <p class="mt-2">
            Đăng ký học phần
            </p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow text-center">
            <i class="fas fa-tasks text-2xl text-blue-500">
            </i>
            <p class="mt-2">
            Lịch theo tiến độ
            </p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow text-center">
            <i class="fas fa-dollar-sign text-2xl text-blue-500">
            </i>
            <p class="mt-2">
            Tra cứu công nợ
            </p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow text-center">
            <i class="fas fa-credit-card text-2xl text-blue-500">
            </i>
            <p class="mt-2">
            Thanh toán trực tuyến
            </p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow text-center">
            <i class="fas fa-receipt text-2xl text-blue-500">
            </i>
            <p class="mt-2">
            Phiếu thu tổng hợp
            </p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow text-center">
            <i class="fas fa-file-alt text-2xl text-blue-500">
            </i>
            <p class="mt-2">
            Đề xuất biểu mẫu
            </p>
            </div>
        </div>
        </main>    
    )
}

export default Main