
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home, Community,Statistics, Map, User } from './pages';
import './App.css';
import Header from './components/Header'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import  AuthStateApp from './AuthStateApp'
import GreetingsApp from './GreetingsApp'
class App extends Component {

  render() {
    return (
      <div className="App">
        <AuthStateApp />
        <Router>
          <div>
            <Link to="/Home"> <Header /></Link>
             
          </div>
          
          <div>
            
           
            <div id= 'grid' >
              <div id = 'row1'>
                  <Link to="/User"><button class="myButton">관리</button></Link>
                  <Link to="/Statistics"><button class="myButton">통계</button></Link>
                  <Link to="/Map"><button class="myButton">위치</button></Link>
                  <Link to="/Community"><button class="myButton">게시판</button></Link>
              </div>
                  
                    
            </div>
          
              
            
            

            <Route exact path='/Home' component={Home}/>
            <Route path="/Community" component={Community}/>
            <Route path="/Statistics" component={Statistics}/>
            <Route path="/Map" component={Map}/>
            <Route path='/User' component={User}/>
          </div>
        </Router>
      </div> 
    );
  }
}
export default withAuthenticator(App);