import React from 'react'
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import mypic from '../images/home.png'
//import { Home } from '../pages';

const Header = () => {
    return (
        
        <header className="header">
                          
            <img src={mypic} alt='mypic' id="homebutton" />
               
            <h1>STCAT HOUSE</h1>
                                       
                                      
        </header>
       
        
    )
}

export default Header