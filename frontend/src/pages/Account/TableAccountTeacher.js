import { memo } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

function TableAccountTeacher({ accountTeachers, handleDelete, teachers }){

    const msgv = (id_giang_vien) => {
        return teachers.find(teacher => teacher.id_giang_vien === id_giang_vien)?.msgv || ''
    }

    const name = (id_giang_vien) => {
        return teachers.find(teacher => teacher.id_giang_vien === id_giang_vien)?.ho_ten || ''
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Mã Số Giảng Viên</th> 
                    <th>Tên Giảng Viên</th>
                    <th>Username</th>
                    <th>Vai Trò</th>
                    <th>Thời Gian Tạo</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                </tr>
            </thead>
            <tbody>
            {accountTeachers.map((account, index) => (
                <tr key={index}>
                    <td>
                        {msgv(account.id_giang_vien)}
                    </td>
                    <td>
                        {name(account.id_giang_vien)}
                    </td>
                    <td>{account.username}</td>
                    <td>{account.vai_tro === 'teacher' ? 'Giảng viên' : ''}</td>
                    <td>{format(new Date(account.create_at), "dd/MM/yyyy HH:mm:ss")}</td>
                    <td>{account.trang_thai === 1 ? 'Hoạt động' : 'Không hoạt động'}</td>
                    <td>
                        <i class="fa-solid fa-trash"
                            onClick={() => handleDelete(account.id_tai_khoan)}
                        ></i>
                        <Link to={`/account/update/${account.id_tai_khoan}`}>
                            <i class="fa-solid fa-pen"></i>
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default memo(TableAccountTeacher)