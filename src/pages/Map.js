/*global kakao*/ 
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import imgH1 from '../images/h1.png'
import imgH2 from '../images/h2.png'
import imgH22 from '../images/h22.png'



const Map = () => {
  
  useEffect( ( )=>{

    let latData, lonData;  

    const fetchEvents = async()=>{
      const res = await axios.get("https://t4zul88hze.execute-api.ap-northeast-2.amazonaws.com/devices/10" )//이 줄이 완료된후 다음줄 실행

      console.log(res)
      makeData(res.data.Items)
      console.log(latData, lonData);

      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(latData,lonData),
        level: 3
      };
      
      var map = new kakao.maps.Map(container, options);
      var markerPosition  = new kakao.maps.LatLng(latData,lonData); 
      var marker = new kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);

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
        const lat = device_data.lat;
        const lon = device_data.lon;


        const findItem = acc.find(a=> a.year === year && a.month === month);
        if(!findItem) {
          acc.push({year, month, date, hours, minutes, id, device_data, lat, lon})
        } 
        if(findItem && findItem.minutes <minutes){ 
                
          findItem.date = date;
          findItem.year = year;
          findItem.month = month;
          findItem.hours = hours;
          findItem.minutes = minutes;
          findItem.id = id;
          findItem.device_data = device_data;
          findItem.lat = lat;
          findItem.lon = lon;
          
        }
        
        return acc;

      }, [])

      const last = arr[arr.length -1]
      latData = last.lat *0.01;
      lonData = last.lon *0.01;
      console.log(last.lat, last.lon);
      console.log(latData, lonData);
     

    }
   
    fetchEvents()
    
    
   
    
  }, [])
    
  return(
    <div>
      <h1><img src={imgH1} alt='mypic' id="homebutton" />고양이집 위치<img src={imgH1} alt='mypic' id="homebutton" /></h1>
      <p>GPS로 현재 고양이집이 있는 곳을 지도에서 알 수 있어요.</p>
      <div id="map" style={{width:"500px", height:"400px", margin:"auto"}}></div>

    </div>
    )
}

export default Map;