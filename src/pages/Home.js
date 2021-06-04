import React, {useState, useEffect} from 'react';
import {Doughnut} from "react-chartjs-2"
import axios from 'axios'

import imgH1 from '../images/h1.png'
import imgH2 from '../images/h2.png'
import imgH22 from '../images/h22.png'
import homeImg from '../images/homeimg.png'


const Home = () => {

    
   const imgcss={
    alignitems: "center",
   }

    return(
        <div >
            <img src={homeImg} alt='mypic' id="homeimg" />

        </div>
    )
}

export default Home;