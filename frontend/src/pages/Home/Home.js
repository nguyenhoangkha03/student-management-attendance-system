import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import './Home.css'
import { getAccounts } from '../../services/accountService'
import { getRooms } from '../../services/roomService'
import { getClasses } from '../../services/classService'
import { getStudents } from '../../services/studentService'
import ChartStudent from '../../components/Common/Chart/ChartStudent'

function Home(){
    const canvasRef = useRef()
    const chartInstanceRef = useRef()
    const navigate = useNavigate()
    const [inforCard, setInforCard] = useState({
        'accounts': '',
        'rooms': '',
        'classes': '',
        'students': '',
    })

    const customIcon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    })

    const [location, setLocation] = useState({ lat: null, lng: null })

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                })
            },
            () => {
                throw new Error('Error getting location')
            }
            )
        } else {
            throw new Error('Geolocation is not supported by this browser.')
        }
    }, [])

    useEffect(() => {
        async function getAllData(){
            const account = await getAccounts()
            const room = await getRooms()
            const classs = await getClasses()
            const student = await getStudents()

            setInforCard(prev => ({...prev, 'accounts': account.length}))
            setInforCard(prev => ({...prev, 'rooms': room.length}))
            setInforCard(prev => ({...prev, 'classes': classs.length}))
            setInforCard(prev => ({...prev, 'students': student.length}))
        }
        getAllData()
    }, [])




    return (
        <div className="home">
            <div class="flex gap-2 mt-2">
                <div className='flex-1 overflow-hidden '>
                    < ChartStudent />
                </div>
                <div className='flex-1'>
                    <div class="grid grid-cols-2 gap-2 bg-gradient-to-t from-[#D9AFD9] to-[#97D9E1] rounded-md p-3 mb-2">
                        <div className="card account">
                            <div className="card__content">
                                <div className="card__content__type account">
                                    <span>{inforCard.accounts}</span>
                                    <span>Tổng Tài Khoản</span>
                                </div>
                                <i class="bi bi-person-bounding-box"></i>
                            </div>
                            <div className="card__more" onClick={() => navigate('/account')}>
                                <span>Xem chi tiết</span>  
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                        <div className="card faculty">
                            <div className="card__content">
                                <div className="card__content__type faculty">
                                    <span>{inforCard.rooms}</span>
                                    <span>Tổng Phòng</span>
                                </div>
                                <i class="bi-door-closed"></i>
                            </div>
                            <div className="card__more" onClick={() => navigate('/room')}>
                                <span>Xem chi tiết</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                        <div className="card class">
                            <div className="card__content">
                                <div className="card__content__type class">
                                    <span>{inforCard.classes}</span>
                                    <span>Tổng Lớp</span>
                                </div>
                                <i class="bi bi-pencil"></i>
                            </div>
                            <div className="card__more" onClick={() => navigate('/class')}>
                                <span>Xem chi tiết</span>  
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                        <div className="card student">
                            <div className="card__content">
                                <div className="card__content__type student">
                                    <span>{inforCard.students}</span>
                                    <span>Tổng Sinh Viên</span>
                                </div>
                                <i class="bi bi-people"></i>
                            </div>
                            <div className="card__more" onClick={() => navigate('/student')}>
                                <span>Xem chi tiết</span>  
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gradient-to-t from-[#D9AFD9] to-[#97D9E1] rounded-md p-5"'>
                        <div className="map-container p-2">
                            {location.lat !== null && location.lng !== null ? (
                                <MapContainer center={[location.lat, location.lng]} zoom={13} className="map-frame">
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[location.lat, location.lng]} icon={customIcon}>
                                    <Popup>📍 Your Location</Popup>
                                    </Marker>
                                </MapContainer>
                            ) : (
                                <p>Location...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home