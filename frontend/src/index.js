import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import SignUp  from './screens/signup';
import Home from './screens/home';
import Project from './screens/project'
const routing=(
<Router>
  <Route exact path="/" component={App}/>
  <Route exact path="/signup" component={SignUp}/>
  <Route exact path="/homescreen" component={HomeScreen}/>
  <Route exact path="/home" component={Home}/>
  <Route exact path='/project' component={Project}/>
</Router>
)




ReactDOM.render(
routing,document.getElementById('root')
);

export default routing


