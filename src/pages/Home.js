import React, { useRef ,useState, useEffect} from 'react';
import { Bar, Doughnut, Line } from "react-chartjs-2"
import axios from 'axios'

const Home = () => {

    const [weightData1, setWeigihtData1] =useState();
    
    
    useEffect(()=>{

        const fetchEvents = async()=>{
            const res = await axios.get("https://t4zul88hze.execute-api.ap-northeast-2.amazonaws.com/devices/10" )//이 줄이 완료된후 다음줄 실행

            console.log(res)
            makeData(res.data.Items)


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

                const findItem = acc.find(a=> a.year === year && a.month === month);
                if(!findItem) {
                    acc.push({year, month, date, hours, minutes, id, device_data,weight_b,w_count})
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
                }
            
               return acc;

           }, [])

           const labels = arr.map(a=> `${a.month+1}월`);//재정의할때 씀
           
           const last = arr[arr.length -1]
           console.log(last);

           //const rest = last.map(a=> `${100-a.weight_b}`);//재정의
           const rest = 100-a.weight_b;
            setWeigihtData1({
                labels: ["사료통 잔량","-"],
                datasets: [
                    { 
                        label: "사료통 잔량, -",
                        backgroundColor: ["#ff3d67", "##C0C0C0"],
                        borderColor: ["#ff3d67", "##C0C0C0"],
                        fill: true,
                        data: [last.weight_b, rest]
                    },
                ]
            });
           
            // items.forEach(item => console.log(item))
            console.log(arr)
        }


        fetchEvents()
    }, [])


    return(
        <div>
            <h2>Home Page</h2>
            <section>
                <div>
                    <h3>현재 남은 사료량</h3>
                    <Doughnut data={weightData1} option={
                        {title:{ display: true, text: `현재 남은 사료량, - (${new Date().getMonth()+1}월)`, fontSize:16}},
                        {legend:{ display:true, position: "bottom" }}
                    } />
                </div>
            </section>

        </div>
    )
}

export default Home;