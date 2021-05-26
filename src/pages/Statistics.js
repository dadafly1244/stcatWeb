
//rafce 단축설정
import React from 'react'
import { useState, useEffect } from 'react'
import { Bar, Doughnut, Line } from "react-chartjs-2"
import axios from 'axios'

const  Statistics = () => {

    const [confirmedData, setConfirmedData] = useState()
    const [quarantinedData, setQuarantinedData] = useState()
    const [comparedData, setComparedData] = useState()
    
    useEffect(()=>{

        const fetchEvents = async()=>{
            const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")//이 줄이 완료된후 다음줄 실행
            makeData(res.data)
        }
        const makeData = (items) => {
            const arr = items.reduce((acc,cur)=>{ //그 달의 가장 나중 날짜에 해당하는 것만 가져올거임, 필터링
                const currentDate = new Date(cur.Date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate(); 
                const confirmed = cur.Confirmed;
                const active = cur.Active;
                const death = cur.Deaths;
                const recovered = cur.Recovered;

                const findItem = acc.find(a=> a.year === year && a.month === month);
                if(!findItem) {
                    acc.push({year, month, date, confirmed, active, death, recovered})
                } 
                if(findItem && findItem.date <date){ 
                    findItem.active = active;
                    findItem.death = death;
                    findItem.date = date;
                    findItem.year = year;
                    findItem.month = month;
                    findItem.recovered = recovered;
                    findItem.confirmed = confirmed;
                }
            
               return acc;

           }, [])

           const labels = arr.map(a=> `${a.month+1}월`);//재정의할때 씀
           setConfirmedData({
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
            });
            // items.forEach(item => console.log(item))
            console.log(arr)
        }
        fetchEvents()
    }, [])

    return (
        <section>
            <h2>Statistics page</h2>
            <div className="contents">
                <div>
                    <Bar data={confirmedData} option={
                        {title:{ display: true, text: "누적 확진자 추이", fontSize:16}},
                        {legend:{ display:true, position: "bottom" }}
                    } />
                </div>
                <div>
                    <Line data={quarantinedData} option={
                        {title:{ display: true, text: "월별 격리자 현황", fontSize:16}},
                        {legend:{ display:true, position: "bottom" }}
                    } />
                </div>
                <div>
                    <Doughnut data={comparedData} option={
                        {title:{ display: true, text: `누적 확진, 해제, 사망 (${new Date().getMonth()+1}월)`, fontSize:16}},
                        {legend:{ display:true, position: "bottom" }}
                    } />
                </div>
            </div>
        </section>
    )
}

export default Statistics