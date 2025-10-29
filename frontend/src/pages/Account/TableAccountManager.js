import { memo } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

function TableAccountManager({ accountManagers, handleDelete, managers }){

    const msm = (id_manager) => {
        return managers.find(manager => manager.id_manager === id_manager)?.msm || ''
    }

    const name = (id_manager) => {
        return managers.find(manager => manager.id_manager === id_manager)?.ho_ten || ''
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Mã Số Quản Lý</th> 
                    <th>Tên Quản Lý</th>
                    <th>Username</th>
                    <th>Vai Trò</th>
                    <th>Thời Gian Tạo</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                </tr>
            </thead>
            <tbody>
            {accountManagers.map((account, index) => (
                <tr key={index}>
                    <td>
                        {msm(account.id_manager)}
                    </td>
                    <td>
                        {name(account.id_manager)}
                    </td>
                    <td>{account.username}</td>
                    <td>{account.vai_tro === 'manager' ? 'Quản lý' : ''}</td>
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

export default memo(TableAccountManager)