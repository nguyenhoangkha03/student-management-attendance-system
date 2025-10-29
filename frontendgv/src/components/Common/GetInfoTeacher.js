import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getTeacherById } from '../../services/teacherService'

export const useInfoTeacher = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            const decodedToken = jwtDecode(token)
            async function getStudent(){
                try {
                    const data = await getTeacherById(decodedToken.id_author)
                    setData({
                        id_giang_vien: data.id_giang_vien,
                        msgv: data.msgv,
                        ho_ten: data.ho_ten,
                        gioi_tinh: data.gioi_tinh,
                        ngay_sinh: data.ngay_sinh,
                        dia_chi: data.dia_chi,
                        imageBase64: data.imageBase64,
                        id_khoa: data.id_khoa,
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