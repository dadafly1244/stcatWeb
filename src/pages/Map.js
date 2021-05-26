/*global kakao*/ 
import React, { useEffect } from 'react'


const Map = () => {


    useEffect(()=>{
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(35.888836,128.608111),
          level: 3
        };
    
        var map = new kakao.maps.Map(container, options);
        var markerPosition  = new kakao.maps.LatLng(35.888836,128.608111); 
        var marker = new kakao.maps.Marker({
          position: markerPosition
      });
      marker.setMap(map);
    
    }, [])
    
    return(
        <div>
            <h2>Map</h2>
            <div id="map" style={{width:"500px", height:"400px", margin:"auto"}}></div>


            
        </div>
    )
}

export default Map;