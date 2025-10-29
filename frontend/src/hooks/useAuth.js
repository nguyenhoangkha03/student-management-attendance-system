import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { getManagerById } from '../services/managerService'

export default function useAuth() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decoded = jwtDecode(token)
      if(decoded.vai_tro === 'manager'){
        async function getUser(){
          const manager = await getManagerById(decoded.id_author)
          setUser(manager)
        }
        getUser()
      }
      else {
        navigate('/login')
        localStorage.removeItem("token")
        return
      }
    }
  }, [])

  return user
}
