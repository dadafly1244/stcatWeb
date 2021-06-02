
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home, Community,Statistics, Map, Gallery, User } from './pages';
import './App.css';
import Header from './components/Header'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import  AuthStateApp from './AuthStateApp'

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
            <nav>
              <div id="grid">
                <div id="row1">
                  <Link to="/Map"><button class="myButton">Map</button></Link>
                  <Link to="/Community"><button class="myButton">Community</button></Link>
                  <Link to="/Statistics"><button class="myButton">Statistics</button></Link>
                  <Link to="/Gallery"><button class="myButton">Gallery</button></Link>
                  <Link to="/User/:name"><button class="myButton">User</button></Link>
                </div>
              </div>
            </nav>

            <Route exact path='/Home' component={Home}/>
            <Route path="/Community" component={Community}/>
            <Route path="/Statistics" component={Statistics}/>
            <Route path="/Map" component={Map}/>
            <Route path='/Gallery/' component={Gallery}/>
            <Route path='/User/:name' component={User}/>
          </div>
        </Router>
      </div> 
    );
  }
}
export default withAuthenticator(App);