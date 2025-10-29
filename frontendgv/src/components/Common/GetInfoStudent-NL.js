import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getStudentById } from '../../service/studentService'

export const InfoStudent = () => {

    const [data, setData] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            const decodedToken = jwtDecode(token)
            console.log(decodedToken);
            async function getStudent(){
                const data = await getStudentById(decodedToken.id_author)
                setData({
                    id_sinh_vien: data.id_sinh_vien,
                    mssv: data.mssv,
                    ho_ten: data.ho_ten,
                    gioi_tinh: data.gioi_tinh,
                    ngay_sinh: data.ngay_sinh,
                    dia_chi: data.dia_chi,
                    imageBase64: data.imageBase64,
                    id_lop: data.id_lop,
                    sdt: data.sdt,
                    email: data.email
                })
            }
            getStudent()
        }
    }, [])

    return data
}