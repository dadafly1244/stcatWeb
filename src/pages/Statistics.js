import React, {useState, useEffect} from 'react';
import { Bar, Line } from "react-chartjs-2"
import axios from 'axios'

const  Statistics = () => {

    const [weightData, setWeigihtData] =useState();
    const [wcountSumData, setWcountSumData] =useState();
    const [pirSumData, setPirSumData] =useState();
    
    useEffect(()=>{
        const fetchEvents = async()=>{
            const res = await axios.get("https://t4zul88hze.execute-api.ap-northeast-2.amazonaws.com/devices/10" )//이 줄이 완료된후 다음줄 실행
            //console.log(res)
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
                const pir_count = device_data.pir_count; //0아니면 반응한 것
                const pir_sum = device_data.pir_sum;
                const w_count_sum = device_data.w_count_sum;

                const findItem = acc.find(a=> a.year === year && a.month === month && a.date === date && a.hours === hours && a.minutes === minutes);
                if(!findItem) {
                    acc.push({year, month, date, hours, minutes, id, device_data,weight_b,w_count,pir_count,pir_sum,w_count_sum })
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
                    findItem.pir_sum =pir_sum;
                    findItem.w_count_sum =w_count_sum;
                }
            
               return acc;

           }, [])

           const labels = arr.map(a=> `${a.date}일 ${a.hours}시 ${a.minutes}분`);//재정의할때 씀
           
           const last = arr[arr.length -1]
           //console.log(last);

           setWeigihtData({
                labels,
                datasets:[
                    {
                        label: "전체 사료 잔량",
                        borderColor: "salmon",
                        fill: false,
                        data: arr.map(a=>a.weight_b)
                    }
                ]
           });

           setWcountSumData({
            labels,
            datasets:[
                {
                    label: "누적 사료량",
                    backgroundColor: '#FAAC58',
                    fill: true,
                    data: arr.map(a=>a.w_count_sum *5.5)
                }
            ]
            })

           setPirSumData({
                labels,
                datasets:[
                    {
                        label: "누적 방문 횟수",
                        backgroundColor: '#81BEF7',
                        fill: true,
                        data: arr.map(a=>a.pir_sum)
                    }
                ]
           })
            //console.log(arr)
        }

        fetchEvents()
    }, [])

    return (
        <div>
            <div>
                <h1>고양이집 현황</h1>
                <p>
                    실시간으로 사료통에 얼만큼 사료가 남았는지, 지금까지 사료를 얼마나 사용하였는지, 고양이가 얼마나 방문했는지 알 수 있어요!
                </p>
            </div>
            <section>
                

                <div className="contents">
                    <div>
                
                
                    <div>
                        <h2>실시간 전체 사료량</h2>
                        <Line data={weightData} />
                    </div>

                    <div>
                        <h2>누적 사료 배급량</h2>
                        <h3>고양이들이 얼만큼 밥을 먹었을까요??</h3>
                        <Bar data={wcountSumData} />
                    </div>
                    
                    <div>
                        <h2>누적 고양이 방문횟수</h2>
                        <h3>고양이들이 얼마나 자주 방문하고 있는지 확인해보세요!!</h3>
                        <Bar data={pirSumData} />
                    </div>
                    
                    </div>
                </div>
                
            </section>
        </div>
    )
}

export default Statistics