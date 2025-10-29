import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getStudentById } from '../../service/studentService'

export const useInfoStudent = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            const decodedToken = jwtDecode(token)
            async function getStudent(){
                try {
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
                } catch (error) {
                    console.log('Error')
                } finally {
                    setLoading(false)
                }
            }
            getStudent()
        }
        else {
            setLoading(false)
        }
    }, [])

    return { data, loading }
}