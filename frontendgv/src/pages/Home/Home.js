import { useRef, useEffect, useState } from 'react'
import Chart from 'chart.js/auto'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import './Home.css'
import { Day, Month, HMS } from '../../services/handleTime'

function Home(){

    const canvasRef = useRef()
    const chartInstanceRef = useRef()
    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");

        if(chartInstanceRef.current){
            chartInstanceRef.current.destroy()
        }

        if (!ctx) return; 
        chartInstanceRef.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["2020", "2021", "2022", "2023", "2024"],
                datasets: [
                    {
                        label: "Sales",
                        data: [5000, 7000, 10000, 15000, 12000],
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: "rgba(54, 162, 235, 1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 7500,
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                maintainAspectRatio: false,
            },
        })

        return () => {
            if(chartInstanceRef.current){
                chartInstanceRef.current.destroy()
                chartInstanceRef.current = null
            }
        }
    }, [])


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

    
    const timeRef = useRef()
    const [time, setTime] = useState('')
    useEffect(() => {
        const date = new Date()
        const interval = setInterval(() => {
            setTime(`
                ${HMS(date.getHours())}:${HMS(date.getMinutes())}:${HMS(date.getSeconds())} 
                | 
                ${Day(date.getDay())}, ${date.getDate()} ${Month(date.getMonth())} ${date.getFullYear()}
            `)
        }, 1000)

        return () => clearInterval(interval)
    }, [time])
    

    return (
        <div className="home">
            <div className="home__top">
                <h1>Dashboard</h1>
                <h1 ref={timeRef}>{time}</h1>
            </div>
            <div className="home__body">
                <div className="card account">
                    <div className="card__content">
                        <div className="card__content__type account">
                            <span>1200</span>
                            <span>Total Accounts</span>
                        </div>
                        <i class="bi bi-person-bounding-box"></i>
                    </div>
                    <div className="card__more">
                        <span>More info</span>  
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
                <div className="card faculty">
                    <div className="card__content">
                        <div className="card__content__type faculty">
                            <span>16</span>
                            <span>Total Faculty</span>
                        </div>
                        <i class="bi bi-laptop"></i>
                    </div>
                    <div className="card__more">
                        <span>More info</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
                <div className="card class">
                    <div className="card__content">
                        <div className="card__content__type class">
                            <span>123</span>
                            <span>Total Class</span>
                        </div>
                        <i class="bi bi-pencil"></i>
                    </div>
                    <div className="card__more">
                        <span>More info</span>  
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
                <div className="card student">
                    <div className="card__content">
                        <div className="card__content__type student">
                            <span>1243</span>
                            <span>Total Student</span>
                        </div>
                        <i class="bi bi-people"></i>
                    </div>
                    <div className="card__more">
                        <span>More info</span>  
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div className="home__bottom">
                <div className="home__bottom__chart">
                    <h2>Students <i class="fa-solid fa-list"></i></h2>
                    <div className="chart-container">
                        <canvas 
                            className="student-chart"
                            ref={canvasRef}    
                        ></canvas>
                    </div>
                </div>  
                <div className="home__bottom__map">
                    <h2>Map <i class="fa-solid fa-globe"></i></h2>
                    <div className="map-container">
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
    )
}

export default Home