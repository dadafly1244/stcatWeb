import React from 'react'

import mypic from '../images/home.png'

const Header = () => {
    return (
        
        <header className="header">
                          
            <img src={mypic} alt='mypic' id="homebutton" />
               
            <h1>STCAT HOUSE</h1>
                                       
                                      
        </header>
       
        
    )
}

export default Header