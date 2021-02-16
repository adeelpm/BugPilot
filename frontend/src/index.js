import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import BugScreen from './screens/bugScreen';
import SignUp  from './screens/signUp';
import ProjectScreen from './screens/projectScreen';
import Signin from "./screens/signIn";
const routing=(
<Router>
  <Route exact path="/" component={Signin}/>
  <Route exact path="/signup" component={SignUp}/>
  <Route exact path="/buglist" component={BugScreen}/>
  <Route exact path="/projectlist" component={ProjectScreen}/>
  </Router>
)




ReactDOM.render(
routing,document.getElementById('root')
);

export default routing


