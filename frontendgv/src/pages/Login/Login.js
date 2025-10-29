import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from '../../services/accountService'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Logo from "../../assets/imgs/logo.png";
import Toast from '../../components/Common/Toast/Toast'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    
    if(timeoutId){
        clearTimeout(timeoutId)
    }
    if(!formData.username){
        setError('Vui lòng nhập mã sinh viên')
        const Id = setTimeout(() => {
            setError(null)
        }, 6000)
        setTimeoutId(Id)
        return
    }
    if(!formData.password){
        setError('Vui lòng nhập mật khẩu')
        const Id = setTimeout(() => {
            setError(null)
        }, 6000)
        setTimeoutId(Id)
        return
    }
    async function goLogin(){
        const response = await login(formData)
        console.log(response)
        if(response){
            localStorage.setItem('token', response.data.token)
            navigate('/')
        }
        else {
            setError("Tài khoản mật khẩu không đúng!")
            const Id = setTimeout(() => {
                setError(null)
            }, 6000)
            setTimeoutId(Id)
            return
        }
    }
    goLogin()
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 relative overflow-hidden">
      <div className="flex w-full max-w-5xl h-full rounded-2xl shadow-2xl overflow-hidden p-12 bg-white">
        {/* Cột trái - Form đăng nhập */}
        <div className="w-2/3 p-6">
          <div className="flex justify-center">
            <img src={Logo} alt="Logo" className="h-36 w-36" />
          </div>
          <h1 className="text-2xl font-bold text-center text-blue-600">CỔNG THÔNG TIN GIÁO DỤC</h1>
          <h1 className="text-2xl font-bold text-center text-blue-600">TRƯỜNG ĐẠI HỌC HARVARD</h1>
          <h3 className="text-2xl font-bold text-center text-gray-700 mt-5">Đăng Nhập</h3>
          <form onSubmit={handleLogin} className="mt-4">
            <div>
              <label className="block text-gray-600">Mã Số Giảng Viên</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4 relative">
              <label className="block text-gray-600">Mật Khẩu</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="password"
                onChange={handleChange}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Đăng nhập
            </button>
          </form>
        </div>
        {/* Cột phải - Hình ảnh */}
        <div className="w-1/2 hidden md:block bg-blue-500 rounded-lg">
          <img
            src="https://img.freepik.com/premium-photo/3d-render-light-bulb-with-graduation-cap_979520-74554.jpg?semt=ais_hybrid"
            alt="Login"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
      {error && <Toast type="error" message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default Login;
