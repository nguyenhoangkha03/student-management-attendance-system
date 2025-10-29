import { useState, useEffect } from 'react'
import './App.css'
import { getStudentByIdClass } from './services/studentService'
import { addRollCall } from './services/rollCallService'
import Button from './Button/Button'
import Loader from './Loader/Loader'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    id_lich_hoc: '',
    id_sinh_vien: '',
    status: 'comat'
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const classIdParam = params.get('classId') || ''
    const scheduleIdParam = params.get('scheduleId') || ''
    setFormData(prev => ({...prev, "id_lich_hoc": scheduleIdParam}))
    async function getStudents(){
      const data = await getStudentByIdClass(classIdParam)
      setData(data)
      setLoading(false)
    }
    getStudents()
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({...prev, "id_sinh_vien": e.target.value}))
  }

  const onClick = (e) => {
    async function Save(){
      const result = await addRollCall(formData)
      console.log(result);
      if(result){
        alert("Điểm danh thành công!")
      } else {
        alert("Điểm danh thất bại!")
      }
    }
    Save()
  }

  if(loading){
    return <Loader />
  }

  return (
    <div className="w-[100%] h-[100vh] bg-[#313131] bg-custom-radial bg-custom-size bg-custom-position flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">Chọn Sinh Viên</h1>
        <div
        class="relative group rounded-lg w-64 bg-gray-50 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9]"
      >
        <svg
          y="0"
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          width="100"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          height="100"
          class="w-8 h-8 absolute right-0 -rotate-45 stroke-pink-300 top-1.5 group-hover:rotate-0 duration-300"
        >
          <path
            stroke-width="4"
            stroke-linejoin="round"
            stroke-linecap="round"
            fill="none"
            d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
            class="svg-stroke-primary"
          ></path>
        </svg>
        <select
          name="id_sinh_vien" onChange={handleChange}
          class="appearance-none hover:placeholder-shown:bg-emerald-500 relative text-pink-400 bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm font-bold rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
        >
          <option value="" key="">Chọn sinh viên</option>
          {data.map((item, index) => (
            <option value={item.id_sinh_vien} key={index}>
              {item.ho_ten}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={onClick}>Điểm Danh</Button>
    </div>
  );
}

export default App;
