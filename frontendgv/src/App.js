import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Layout from './components/Layout/Layout'
import Login from './pages/Login/Login'
import "./build/tailwind.css" // taiwind.css
function App() {

  const navigate = useNavigate()

  useEffect(() => {
      const token = localStorage.getItem('token')
      if(token){
        const decodedToken = jwtDecode(token)
        if(decodedToken.vai_tro !== 'teacher'){
          localStorage.removeItem('token')
          navigate('/login')
          return
        }
  
        const expirationTime = decodedToken.exp * 1000
        const currentTime = Date.now()
  
        if(currentTime > expirationTime){
          localStorage.removeItem('token')
          navigate('/login')
          return
        }
      }
      else {
        navigate('/login')
      }
  }, [])

  return (
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Layout/>}/>
      </Routes>
  )
}

export default App
