import React, { Component } from 'react'
import axios from 'axios'
import headers from '../util/headers';
import Cookies from 'universal-cookie';
import { Dropdown } from 'react-bootstrap';
import '../index.css'
import img from '../25.gif'

import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap'
import { XGrid } from "@material-ui/x-grid";






const cookies = new Cookies()


export class ProjectScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rw: [],
            projectName: "",
            projectDescription: "",
            modalShow: false,
        }
        this.getProjet()
    }


    getProjet = async () => {
        let uid = cookies.get('uid')

        const uri = `http://localhost:5000/api/getproject/${uid}`
        await axios.get(uri, headers).then(
            (res) => {
                console.log("resdata", res.data)
                let row=res.data.map((row)=>{
                    return({
                        id:row.id,
                        title:row.name,
                    })
                })
                this.setState({ rw:row })
            }

        )


    }

    MyVerticallyCenteredModal() {
        this.setState({
            modalShow: !this.state.modalShow

        })
    }


    cs = [
        { field: 'id', headerName: 'ID',  },
        { field: 'title', headerName: 'Title', renderCell:(param)=><Link to={{pathname:"/buglist",state:{pid:param.row.id,pname:param.row.title }}}>{param.row.title}</Link> }
    ];

    createproject=()=>{
        console.log('calling createproject')
        let uid = cookies.get('uid')

        const uri = `http://localhost:5000/api/createproject/${uid}`

        axios.post(uri,{pname:this.state.projectName,pdescription:this.state.projectDescription},headers).then(
            (res)=>{console.log("createproject res",res)}
        ).catch(
            (rej)=>{console.log("createproject error",rej)}
        )



    }





    render() {
        return (
            <div className={'flex-center'}>

                <div style={{ width: "100vh" }}>
                    <Modal size="lg" show={this.state.modalShow} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Create Project
              </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ height: '75vh', }}>
                            <Form.Group style={{ margin: '15px' }}>
                                <Form.Label>Project Title </Form.Label>
                                <Form.Control size="lg" type="text" onChange={(event) => { this.setState({ projectName: event.target.value }, () => { console.log("bug", this.state.bugTitle) }) }} value={this.state.bugTitle} placeholder="" />
                            </Form.Group>
                            <Form.Group style={{ margin: '15px' }}>
                                <Form.Label>Description </Form.Label>
                                <Form.Control size="xl" as="textarea" onChange={(event) => this.setState({ projectDescription: event.target.value })} value={this.state.bugDescription} placeholder="" />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => { this.MyVerticallyCenteredModal() }}>Close</Button>
                            <Button onClick={() => {this.createproject() }}>Assign</Button>
                        </Modal.Footer>
                    </Modal>
                </div>



                <button onClick={() => this.MyVerticallyCenteredModal()} >+{cookies.get('username')}</button>
                <div style={{ height: '100vh', width: '75vh' }}>



            
                        <XGrid rows={this.state.rw} columns={this.cs} />

                                   </div>

                {/* <table>
                 <thead>
                     <tr>
                         <th >Projects</th>  
                     </tr>
                 </thead>
                 <tbody>
                     {
                         this.state.data.map(
                             (item) => {
                                 return (
                                     <tr key={item.id}>
                                         <td><Link to={{pathname:"/buglist",state:{pid:item.id,pname:item.name}}}>{item.name}</Link></td>
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
                 */}
            </div>
        )
    }
}

export default ProjectScreen
