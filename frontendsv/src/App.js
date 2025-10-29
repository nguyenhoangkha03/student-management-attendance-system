import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Login from './pages/Login/Login'
import Layout from './components/Layout/Layout'
// import Loader from './components/Common/Loader/Loader'

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      const decodedToken = jwtDecode(token)
      if(decodedToken.vai_tro !== 'student'){
        localStorage.removeItem('token')
        navigate('/login')
        setLoading(false)
        return
      }

      const expirationTime = decodedToken.exp * 1000
      const currentTime = Date.now()

      if(currentTime > expirationTime){
        localStorage.removeItem('token')
        navigate('/login')
        setLoading(false)
        return
      }
    }
    else {
      navigate('/login')
    }
    setLoading(false)
  }, [])
  
  if(loading) {
    // return <Loader />
    return <h1>h</h1>
  }

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/*' element={<Layout />} />
    </Routes>
  )
}

export default App;
