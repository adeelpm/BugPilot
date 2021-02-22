import React, { Component } from 'react'
import axios from 'axios'
import headers from '../util/headers';
import Cookies from 'universal-cookie';
import '../index.css'
import img from '../25.gif'

import { Link } from 'react-router-dom';
import { Modal, Button, Form, Navbar } from 'react-bootstrap'
import { XGrid } from "@material-ui/x-grid";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// import Navbar from '../components/navbar'

const cookies = new Cookies()


export class ProjectScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rw: [],
            projectName: "",
            projectDescription: "",
            modalShow: false,
            modaloptions:[],
            searchuser:[],
            projectmembers:[]
        }
        this.getProjet()
    }


    getProjet = async () => {
        let uid = cookies.get('uid')

        const uri = `http://localhost:5000/api/getproject/${uid}`
        await axios.get(uri, headers).then(
            (res) => {
                console.log("resdata", res)
                let row=res.data.map((row)=>{
                    console.log("list of project",row)
                    return({
                        id:row.id,
                        title:row.name,
                    })
                })
                this.setState({ rw:row })
            }

        )


    }

    toggleModal() {
        this.setState({
            modalShow: !this.state.modalShow

        })
    }


    cs = [
        { field: 'id', headerName: 'ID',  },
        { field: 'title', headerName: 'Title', renderCell:(param)=><Link to={{pathname:"/buglist",state:{pid:param.row.id,pname:param.row.title }}}>{param.row.title}</Link> }
    ];

    createProject=()=>{
        console.log('calling createproject')
        let uid = cookies.get('uid')
        let iid=this.state.projectmembers
        iid.push(Number.parseInt(uid, 10))
        this.setState({projectmembers:iid})
        const uniquearray=Array.from(new Set(this.state.projectmembers))

        const uri = `http://localhost:5000/api/createproject/${uid}`

        axios.post(uri,{pname:this.state.projectName,pdescription:this.state.projectDescription,pmembers:uniquearray},headers).then(
            (res)=>{console.log("createproject res",res);
            if(res.data[0].affectedRows==1){
                alert('Project added')
                this.toggleModal()
                this.getProjet()
      
              }}
        ).catch(
            (rej)=>{console.log("createproject error",rej)}
        )



    }
    
    getAllUser(props){
        console.log("getprops",props)
        if(props){

        const uri = `http://localhost:5000/api/createproject/getusername/${props}`

        axios.get(uri,headers).then(
            res=>{
                this.setState({searchuser:res.data})
                console.log("resdaaa",`'${res.data}'`)}
        )}
    }




    render() {
        return (
            <div className={'flex-center'}>
                
                <Navbar>
                <Navbar.Brand href="#home">Bug Pilot</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                
                <Navbar.Text>
                Signed in as: <a href="#login">{cookies.get('username')}</a>
                </Navbar.Text>
                </Navbar.Collapse>
                </Navbar>            

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
                                <Form.Control size="lg" type="text" onChange={(event) => { this.setState({ projectName: event.target.value }, () => { console.log("bug", this.state.projectName) }) }} value={this.state.bugTitle} placeholder="" />
                            </Form.Group>
                            <Form.Group style={{ margin: '15px' }}>
                                <Form.Label>Description </Form.Label>
                                <Form.Control size="xl" as="textarea" onChange={(event) => this.setState({ projectDescription: event.target.value })} value={this.state.projectDescription} placeholder="" />
                            </Form.Group>
                            <div style={{  margin: '15px', }} >
                                <label>Add Members</label>
                                    <Autocomplete
                                    onChange={(option, value) =>{this.setState({projectmembers:value.map(mem=>mem.id)},()=>{console.log(this.state.projectmembers)})}}
                                    multiple
                                    id="tags-outlined"
                                    options={this.state.searchuser}
                                    getOptionLabel={(option) => option.username}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    onChange={(e)=>{this.getAllUser(e.target.value)}}
                                    variant="outlined"
                                    // label="filterSelectedOptions"
                                    // placeholder="Favorites"
                                    />
                                    )}
                                    />
     
                            </div>

                    

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => { this.toggleModal() }}>Close</Button>
                            <Button onClick={() => {this.createProject() }}>Assign</Button>
                        </Modal.Footer>
                    </Modal>
                </div>



                <Button onClick={() => this.toggleModal()} variant="outline-success">Create Project</Button>
                <div style={{ height: '80vh', width: '75vw' }}>

                  <XGrid rows={this.state.rw} columns={this.cs} />

                 </div>
            </div>
        )
    }
}

export default ProjectScreen
