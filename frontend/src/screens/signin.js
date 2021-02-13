import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom"; 
import '../App.css';
import React,{useState} from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

let cookies = new Cookies();

export default function Signin() {
   const [data,setdata]=useState({})
    const [error,setError]=useState('')
  
   
  
   const history=useHistory();
    const forward=(loc)=>history.push(loc)
  
  
   
    
   const signin=async()=>{
  
    console.log("signin")
    var usrnme=data.username;
    var pwd=data.password;
    await axios.post(`http://${window.location.hostname}:5000/api/signin/`,{
      "username":usrnme,
      "password":pwd
  
    }).then(
      (res)=>{
        const {message,error}=res.data
        if(message || error) {setError(message || error)}
  
        if(res.data.status){
        console.log("sign res",res)
        // console.log("sign res",res.data.qrdata[0].username)
        cookies.set('uid',res.data.qrdata[0].id,{path:'/',sameSite:true,secure:false})
        cookies.set('username',res.data.qrdata[0].username,{path:'/',sameSite:true,secure:false})
        cookies.set('token',res.data.token,{path:'/',sameSite:true,secure:false})
        // console.log("getting cookies",cookies.get('token'))
        
        // forward('/homescreen')
         forward('/home')
        }
  
      }
      
    ).catch(rej=>{
      console.log("Error while sign in:",rej)
      setError(rej)}
      )
  }
  
    return (
      <div className="form-parent flex-center">

        
        <div className="form flex-center">
    
        <TextField className="textfiel" label="Username" variant="outlined" on onChange={(e) => {
                      const temp = data
                      temp.username = e.target.value
                      setdata(temp)
                      console.log(data)
                  }} />
               
         <TextField className="textfiel" label="Password" type="password" variant="outlined"
                      onChange={(e) => { const temp = data; temp.password = e.target.value; setdata(temp); console.log(data) }} />
        <Button variant='contained' color='default' onClick={(e)=>signin()}>SignIn</Button>
        <div style={{color:"red"}}> {error?error:''} </div>
                    
  
        </div>
        <br/>
        <Button variant='contained' color='default' onClick={()=>forward('/signup')}>SignUp</Button>
        
   
      </div>
    )}
