import React, { Component } from 'react'
import axios from 'axios'
import headers from '../util/headers';
import Cookies from 'universal-cookie';
import { Dropdown } from 'react-bootstrap';
import '../App.css'
import {Link} from 'react-router-dom';
import {  Modal, Button, Form, } from 'react-bootstrap/'






const cookies = new Cookies()


export class home extends Component {
    constructor(props){
        super(props)

        this.state={
            data:[],
            projectName:"",
            projectDescription:"",
            modalShow: false,
            


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

    MyVerticallyCenteredModal() {
        this.setState({
          modalShow: !this.state.modalShow
    
        })
    }


    render() {
        return (
        <div className={'flex-center'}>

<div style={{width:"100vh"}}>
        <Modal  size="lg" show={this.state.modalShow}  aria-labelledby="contained-modal-title-vcenter"  centered>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Create Project
              </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{height:'75vh',}}>
          <Form.Group style={{margin:'15px'}}>
              <Form.Label>Project Title </Form.Label>
              <Form.Control size="lg" type="text"  onChange={(event)=>{this.setState({projectName:event.target.value},()=>{console.log("bug",this.state.bugTitle)})}} value={this.state.bugTitle} placeholder=""/>           
          </Form.Group>
          <Form.Group style={{margin:'15px'}}>
              <Form.Label>Description </Form.Label>
              <Form.Control size="xl" as="textarea" onChange={(event)=>this.setState({projectDescription:event.target.value})} value={this.state.bugDescription} placeholder=""/>           
          </Form.Group>
          
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { this.MyVerticallyCenteredModal() }}>Close</Button>
            <Button onClick={() => { this.createbug()}}>Assign</Button>
          </Modal.Footer>
        </Modal>
        </div>


       <button onClick={()=>this.MyVerticallyCenteredModal()} >+{cookies.get('username')}</button>

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
                                         <td><Link to={{pathname:"/homescreen",state:{pid:item.id,pname:item.name}}}>{item.name}</Link></td>
                                         <td>{item.created_on}</td>
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
