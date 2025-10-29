import { useState } from "react"
import { login, updatePassword } from '../../../service/accountService'
import { jwtDecode } from "jwt-decode"
import Toast from '../../Common/Toast/Toast'

export default function FormPassword({ ref, status, onReset }) {

    const [formData, setFormData] = useState({})
    const [result, setResult] = useState(null)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleClick = () => {
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token)
        const password = formData.old_password
        async function check(){
            const result = await login({username: decodedToken.username, password: password})
            if(result){
                const newPassword = formData.new_password 
                const confirmPassword = formData.confirm_password
                if(newPassword === confirmPassword){
                    async function update(){
                        const result = await updatePassword({username: decodedToken.username, password: newPassword})
                        if(result) {
                            setResult(true)
                        }
                        else {
                            setResult(false)
                        }
                    }
                    update()
                }
                else {
                    setResult(false)
                }   
            }
            else {
                setResult(false)
            }
        }
        check()
    }

    return (
        <div ref={ref} class={status === 'hidden' ? 'hidden' : ''}>
            <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
                    <div class="flex justify-between items-center p-4 border-b">
                        <h3 class="text-lg font-semibold">Thay đổi mật khẩu</h3>
                        <button class="text-blue-500" onClick={() => {
                            ref.current.classList.add('hidden')
                            onReset()
                        }}>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="p-6">
                        <form>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="old-password">
                                    Mật khẩu cũ <span class="text-red-500">(*)</span>
                                </label>
                                <input onChange={handleChange} name="old_password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="old-password" type="password" placeholder="Nhập mật khẩu cũ" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="new-password">
                                    Mật khẩu mới <span class="text-red-500">(*)</span>
                                </label>
                                <input onChange={handleChange} name="new_password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="new-password" type="password" placeholder="Nhập mật khẩu mới"/>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">
                                    Xác nhận mật khẩu <span class="text-red-500">(*)</span>
                                </label>
                                <input onChange={handleChange} name="confirm_password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirm-password" type="password" placeholder="Xác nhận lại mật khẩu"/>
                            </div>
                            <div class="flex items-center justify-end">
                                <button onClick={handleClick} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {result && <Toast type="success" message="Cập nhật mật khẩu thành công!" onClose={() => setFormData(null)} />}
            {result == false ? <Toast type="error" message="Cập nhật mật khẩu thất bại!"  onClose={() => setFormData(null)} /> : ''}
        </div>
    )
}