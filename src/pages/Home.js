import React, { useRef ,useState, useEffect} from 'react';
import { Bar, Doughnut, Line } from "react-chartjs-2"
import axios from 'axios'
import { a } from '@aws-amplify/ui';

const Home = () => {

    const [weightData1, setWeigihtData1] =useState();
    const [stage, setStage] = useState(1);
   // const [deviceId, setDeviceID] =useState(' ');
    let currentHours; 
    let currentMinutes; 
    
    const fontgreen = {
        color : "#B1E26A",
        textAlign: "center",
        fontSize : 30,
    }
    const fontred = {
        color : "#F15E55",
        textAlign: "center",
        fontSize : 40,
    }

    useEffect(()=>{
    
      
        const fetchEvents = async()=>{
            
            const res = await axios.get('https://t4zul88hze.execute-api.ap-northeast-2.amazonaws.com/devices/10' )//이 줄이 완료된후 다음줄 실행

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

          
           
           const last = arr[arr.length -1]
           console.log(last);

           
            const rest = 30-last.weight_b;
            if (last.weight_b <= 6){setStage(2)}
            else{setStage(1)};
            currentHours = last.hours;
            currentMinutes = last.minutes;
            console.log(currentHours, currentMinutes);
            
            setWeigihtData1({
                labels: ["사료통 잔량","-"],
                datasets: [
                    { 
                        label: "사료통 잔량, -",
                        backgroundColor: ["#ff3d67", "#C0C0C0"],
                        borderColor: ["#ff3d67", "#C0C0C0"],
                        fill: true,
                        data: [last.weight_b, rest]
                    },
                ]
            });
           
            
            console.log(arr)
        }
        

        fetchEvents()
    }, [])


    return(
        <div>
            <h2>Home Page</h2>
            <div>


            </div>
            <section>
                <div>
                    <h3>현재 남은 사료량</h3>
                    <div>
                        {stage ===1 &&(
                            <h4 style={fontgreen}> 사료가 충분합니다 :)</h4>
                           
                            
                        )}
                        {stage ===2 &&(
                            <h4 style={fontred}> 사료가 부족합니다!! 사료를 채워주세요. :( </h4>
                        )}
                        <h5 style={fontgreen}> @@마지막 업데이트 시간은 {currentHours}시 {currentMinutes} 입니다.</h5>,
                        <h5 style={fontgreen} > 마지막 업데이트 시간은 {new Date().getHours()}시 {new Date().getMinutes()}분 입니다.</h5>
                    </div>

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