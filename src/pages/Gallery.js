import React from 'react'
import { useState, useEffect } from 'react'
import { Bar, Doughnut, Line } from "react-chartjs-2"
import axios from 'axios'

const Gallery = () => {

    const [confirmedData, setConfirmedData] = useState()
    const [quarantinedData, setQuarantinedData] = useState()
    const [comparedData, setComparedData] = useState()
    
    useEffect(()=>{

        const fetchEvents = async()=>{
            const res = await axios.get("https://t4zul88hze.execute-api.ap-northeast-2.amazonaws.com/devices/10" )//이 줄이 완료된후 다음줄 실행

            console.log(res)
        }
        fetchEvents()
    }, [])

    return (
        <section>
            <h2>디바이스 현황</h2>
            
        </section>
    )
}

export default Gallery;
