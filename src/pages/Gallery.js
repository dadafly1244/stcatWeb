import React from 'react'
import { useState, useEffect } from 'react'
import { Bar, Doughnut, Line } from "react-chartjs-2"
import axios from 'axios'

const Gallery = () => {

    const [deviceData, setDeviceData] =useState();
    /* const [confirmedData, setConfirmedData] = useState()
    const [quarantinedData, setQuarantinedData] = useState()
    const [comparedData, setComparedData] = useState() */
    
    useEffect(()=>{

        const fetchEvents = async()=>{
            const res = await axios.get("https://t4zul88hze.execute-api.ap-northeast-2.amazonaws.com/devices/10" )//이 줄이 완료된후 다음줄 실행

            console.log(res)
            makeData(res.items)
        }
        const makeData = (items) => {
            const arr = items.reduce((acc,cur)=>{ //그 달의 가장 나중 날짜에 해당하는 것만 가져올거임, 필터링
                const currentDate = new Date(cur.Date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate(); 
                const hours = currentDate.getHours();
                const minutes = currentDate.getMinutes();
                const id = cur.id;
                const device_data = cur.device_data;


                const findItem = acc.find(a=> a.year === year && a.month === month);
                if(!findItem) {
                    acc.push({year, month, date, hours, minutes, id, device_data})
                } 
                if(findItem && findItem.date <date){ 
                    
                    findItem.date = date;
                    findItem.year = year;
                    findItem.month = month;
                    findItem.hours = hours;
                    findItem.minutes = minutes;
                    findItem.id = id;
                    findItem.device_data = device_data;
                }
            
               return acc;

           }, [])

           const labels = arr.map(a=> `${a.month+1}월`);//재정의할때 씀

           const last = arr[arr.length -1]
            setDeviceData({
                labels: ["확진자","격리해제","사망"],
                datasets: [
                    { 
                        label: "기기ID,기기 데이터",
                        backgroundColor: ["#ff3d67", "#059bff"],
                        borderColor: ["#ff3d67", "#059bff"],
                        fill: false,
                        data: [last.id, last.device_data]
                    },
                ]
            }); 
           /* setConfirmedData({
                labels,
                datasets: [
                    { 
                        label: "국내 누적 확진자",
                        backgroundColor: "salmon",
                        fill: true,
                        data: arr.map(a => a.confirmed)
                    },
                ]
            });
            setQuarantinedData({
                labels,
                datasets: [
                    { 
                        label: "월별 격리자 현황",
                        borderColor: "salmon",
                        fill: false,
                        data: arr.map(a => a.active)
                    },
                ]
            });
            const last = arr[arr.length -1]
            setComparedData({
                labels: ["확진자","격리해제","사망"],
                datasets: [
                    { 
                        label: "누적 확진, 해제, 사망 비율",
                        backgroundColor: ["#ff3d67", "#059bff", "#ffc233"],
                        borderColor: ["#ff3d67", "#059bff", "#ffc233"],
                        fill: false,
                        data: [last.confirmed, last.recovered, last.death]
                    },
                ]
            }); */
            // items.forEach(item => console.log(item))
            console.log(arr)
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
