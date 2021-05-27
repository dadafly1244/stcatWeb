/*global kakao*/ 
import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Map = () => {
  const [locationData, setLocationData] = useState()
   

    useEffect(()=>{

        /* const fetchEvents = async()=>{
          const res = await axios.get("https://t4zul88hze.execute-api.ap-northeast-2.amazonaws.com/devices/10" )//이 줄이 완료된후 다음줄 실행

          //console.log(res)
          makeData(res.data)
        }
        const makeData = (items) => {
          const arr = items.reduce((acc, cur)=>{

            const currentDate = new Date(cur.Date);
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const date = currentDate.getDate(); 
            const lat = cur.lat;
            const lon = cur.lon;
            

            const findItem = acc.find(a=> a.year === year && a.month === month);
                if(!findItem) {
                    acc.push({year, month, date, lat, lon})
                } 
                if(findItem && findItem.date <date){ 
                    findItem.lat = lat;
                    findItem.lon = lon;
                    findItem.date = date;
                    findItem.year = year;
                    findItem.month = month;
                    
                }
            
               return acc;
          },[])

          const last = arr[arr.length -1]
          console.log(arr)
          console.log(last.lat,last.lon)

          setLocationData({
            data: [last.lat, last.lon]
          });
        } */

        
        


        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(35.128),
          level: 3
        };
    
        var map = new kakao.maps.Map(container, options);
        var markerPosition  = new kakao.maps.LatLng(35,128); 
        var marker = new kakao.maps.Marker({
          position: markerPosition
      });
      marker.setMap(map);
      //fetchEvents()
    
    }, [])
    
    return(
        <div>
            <h2>Map</h2>
            <div id="map" style={{width:"500px", height:"400px", margin:"auto"}}></div>


            
        </div>
    )
}

export default Map;