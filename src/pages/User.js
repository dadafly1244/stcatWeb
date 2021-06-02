import React, {useState, useEffect} from 'react';
import {Doughnut} from "react-chartjs-2"
import axios from 'axios'
import catIn from '../images/in.png'
import catOut from '../images/out.png'
//I love you dayoung
const  User = () => {
    const [weightData1, setWeigihtData1] =useState();
    const [stage, setStage] = useState(1);
    const [stagePir, setStagePir] =useState(1);
    const [currentHours, setcurrentHours] =useState(0);
    const [currentMinutes, setcurrentMinutes] =useState(0);  
    
    const fontgreen = {
        color : "#B1E26A",
        textAlign: "center",
        fontSize : 20,
    }
    const fontred = {
        color : "#F15E55",
        textAlign: "center",
        fontSize : 30,
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
                const pir_count = device_data.pir_count; //0아니면 반응한 것

                const findItem = acc.find(a=> a.year === year && a.month === month);
                if(!findItem) {
                    acc.push({year, month, date, hours, minutes, id, device_data,weight_b,w_count ,pir_count})
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
                    findItem.pir_count =pir_count;
                }
            
               return acc;

           }, [])

          
           
           const last = arr[arr.length -1]
           //console.log(last);


           if(last.pir_count >1){setStagePir(2)}
           else{setStagePir(1)};

           
            const rest = 30-last.weight_b;
            if (last.weight_b <= 6){setStage(2)}
            else{setStage(1)};

            setcurrentHours(last.hours);
            setcurrentMinutes(last.minutes);

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
            <div>
                <h1>관리</h1>
                <p>
                    실시간으로 고양이집의 상태를 알 수 있어요! 
                </p>
            </div>
            <section>

                <div>
                    <h2>고양이는 지금...</h2>
                    {stagePir ===1 && (
                        <h4> 우와! 고양이가 놀러온거 같아요! <br />
                            <img src={catIn} alt='in' /></h4>
                        
                        
                    )} 
                    {stagePir ===2 &&(
                        <h4> 움직임이 감지되지 않았어요. 지금은 고양이가 다른곳에서 놀고있나봐요...<br />
                            <img src={catOut} alt='out' /></h4>
                        
                    )}

                </div>
                <div>
                    <h2>현재 남은 사료량</h2>
                    <div>
                        {stage ===1 &&(
                            <h4 style={fontgreen}> 사료가 충분합니다 :)</h4>
                           
                            
                        )}
                        {stage ===2 &&(
                            <h4 style={fontred}> 사료가 부족합니다!! 사료를 채워주세요. :( </h4>
                        )}
                        <h5 style={fontgreen}>마지막 업데이트 시간은 {currentHours}시 {currentMinutes}분 입니다.</h5>
                
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

export default User;
