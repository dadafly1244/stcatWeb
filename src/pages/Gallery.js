import React, { useRef ,useState, useEffect} from 'react';
import { Bar, Doughnut, Line } from "react-chartjs-2"
import axios from 'axios'




//display:true, beginAtZero : true, steps: 10, stepValue: 5, max:100
/* const optionss = {
               
    plugins:{
        title:{display:true,text: "전체 사료 잔량", fontSize:20 },
        legend :{display:true, position:"bottom"},
        scales :{ y: {suggestedMin:0, suggestedMax:100}}, 
    }, 

}; */

const Gallery = () => {

    const [deviceData, setDeviceData] =useState();
    const [weightData, setWeigihtData] =useState();
    const chartContainer = useRef(null);
   
   
    
    useEffect(()=>{

        const fetchEvents = async()=>{
            const res = await axios.get("https://t4zul88hze.execute-api.ap-northeast-2.amazonaws.com/devices/10" )//이 줄이 완료된후 다음줄 실행

            console.log(res)
            makeData(res.data.Items)

            //var ctx = document.getElementById('myChart');

            /* var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    weightData
                },
                options: {
                    scales: {
                        y: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }
                }
            }); */
           


        }
        
        const makeData = (items) => {
            const arr = items.reduce((acc,cur)=>{ //그 달의 가장 나중 날짜에 해당하는 것만 가져올거임, 필터링
                const currentDate = new Date(cur.time);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const date = currentDate.getDate(); 
                const hours = currentDate.getHours();
                const minutes = currentDate.getMinutes();
                const id = cur.id;
                const device_data = cur.device_data;
                const weight_b = device_data.weight_b;//실시간 사료통 무게
                const w_count = device_data.w_count;//0 아니면 서보모터 돌아감 
                const pir_count = device_data.pir_count; //0아니면 반응한 것



                const findItem = acc.find(a=> a.year === year && a.month === month);
                if(!findItem) {
                    acc.push({year, month, date, hours, minutes, id, device_data,weight_b,w_count,pir_count})
                } 
                if(findItem && findItem.minutes <minutes){ 
                    
                    findItem.date = date;
                    findItem.year = year;
                    findItem.month = month;
                    findItem.hours = hours;
                    findItem.minutes = minutes;
                    findItem.id = id;
                    findItem.device_data = device_data;
                    findItem.weight_b = weight_b;
                    findItem.w_count = w_count;
                    findItem.pir_count = pir_count;
                }
            
               return acc;

           }, [])

           const labels = arr.map(a=> `${a.month+1}월`);//재정의할때 씀
           
           const last = arr[arr.length -1]
           console.log(last);

           setWeigihtData({
                labels:[`${last.hours}시 ${last.minutes}분`],
                datasets:[
                    {
                        label: "전체 사료 잔량",
                        backgroundColor: "salmon",
                        fill: true,
                        data: arr.map(a=>a.weight_b)
                    }
                ]
           });
           

          
            
            // items.forEach(item => console.log(item))
            console.log(arr)
        }


        fetchEvents()
    }, [chartContainer])

    return (
        <section>
            <h2>디바이스 현황</h2>

            <div className="contents">
                <div>
               
                
                <h3>실험3</h3>

                <div>
                    <Line data={weightData} option={
                        {title:{ display: true, text: "월별 격리자 현황", fontSize:16}},
                        {legend:{ display:true, position: "bottom" }}
                    } />
                </div>

                <Bar
                    data={weightData}
                    width={400}
                    height={150}
                    options={{
                        tooltips: {
                            mode: 'point',
                            intersect: false,
                        },
                        responsive: true,
                        scales: {
                            xAxes: [{
                                stacked: true,
                            }],
                            yAxes: [{
                                max: 100,
                                stacked: false
                            }]
                        }
                    }}
                />
                </div>
            </div>
            
        </section>
    )
}

export default Gallery;
