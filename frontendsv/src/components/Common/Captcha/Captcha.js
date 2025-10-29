import { useEffect, useState, useRef } from "react"
import axios from "axios"
import refresh from '../../../assets/imgs/refresh.png'

const Captcha = ({ onVerify, click, set }) => {
  const [captchaSvg, setCaptchaSvg] = useState("")
  const [captchaInput, setCaptchaInput] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    const response = await axios.get("https://23tg8v1m-3333.asse.devtunnels.ms/captcha", {
      responseType: "text",
      withCredentials: true,
    });
    setCaptchaSvg(response.data);
  };

  const handleVerify = async () => {
    const response = await axios.post(
      "https://23tg8v1m-3333.asse.devtunnels.ms/verify-captcha",
      { captchaInput },
      { withCredentials: true }
    );

    if (response.data.success) {
      onVerify(true);
      click()
    } else {
      set()
      fetchCaptcha()
      inputRef.current.value = ''
    }
  };


  return (
    <>
    <div class="flex justify-between items-center w-full">
      <div dangerouslySetInnerHTML={{ __html: captchaSvg }} />
      <img onClick={fetchCaptcha} class="w-8 cursor-pointer" src={refresh} alt="" />
      <input
        class="w-1"
        type="text"
        ref={inputRef}
        value={captchaInput}
        onChange={(e) => setCaptchaInput(e.target.value)}
        placeholder="Nhập mã"
      />
    </div>
    <div>
        <button onClick={handleVerify}>ĐĂNG NHẬP</button>
    </div>
    </>
  );
};

export default Captcha
