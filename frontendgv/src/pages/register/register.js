import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import img from "../../assets/imgs/20944999.jpg"; 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }
    setError("");
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-5xl h-full bg-white rounded-2xl shadow-2xl overflow-hidden p-12">
        {/* Cột trái - Form đăng ký */}
        <div className="w-2/3 p-9">
          <h2 className="text-2xl font-bold text-center text-gray-700">Đăng ký</h2>
          <form onSubmit={handleLogin} className="mt-4">
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4 relative">
              <label className="block text-gray-600">Mật khẩu</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
            <div className="mt-4 relative">
              <label className="block text-gray-600">Nhập lại mật khẩu</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Đăng ký
            </button>
            <div className="text-center mt-4">
              <a href="#" className="text-blue-500 hover:underline float-right">Quên mật khẩu?</a>
            </div>
            <div className="text-center mt-12">
              <span className="text-gray-600">Nếu bạn đã có tài khoản? </span>
              <a href="/login" className="text-blue-500 hover:underline ">Đăng nhập ngay</a>
            </div>
          </form>
        </div>
        {/* Cột phải - Hình ảnh */}
        <div className="w-1/2 hidden md:block bg-blue-500 rounded-lg">
          <img
            src={img}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
