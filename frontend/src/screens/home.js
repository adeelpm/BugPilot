import React, { Component } from 'react'
import axios from 'axios'
import headers from '../util/headers';
import Cookies from 'universal-cookie';
import { Dropdown } from 'react-bootstrap';
import '../App.css'





const cookies = new Cookies()


export class home extends Component {
    constructor(props){
        super(props)

        this.state={
            data:[],
        }
        this.getProjet()
    }

    getProjet=async()=>{
        let uid=cookies.get('uid')
        
        const uri = `http://localhost:5000/api/getproject/${uid}`
        await axios.get(uri,headers).then(

            (res) => {
                this.setState({
                  data: res.data
                })
                console.log("statedata",this.state.data)
            }
            
        )
        

    }


    render() {
        return (
            <div className={'flex-center'}>
                 <button  >+{cookies.get('username')}</button>
          <table className="table">
                 <thead>
                     <tr>
                         <th scope="col">Projects</th>
                        
                     </tr>
                 </thead>
                 <tbody>
                     {
                         this.state.data.map(
                             (item) => {
                                 return (
                                     <tr key={item.id}>
                                         <td>{item.name}</td>
                                         <td>{item.title}</td>
                                         <td>{item.description}</td>
                                        
                                         <td>{item.assigned_to}</td>
                                         <td>{item.assigned_by}</td>
                                         <td>{item.opened_on}</td>
                                         <td>{item.closed_on}</td>
                                     </tr>)
                             }
                         )
                     }
                 </tbody>
             </table>
                
            </div>
        )
    }
}

export default home
