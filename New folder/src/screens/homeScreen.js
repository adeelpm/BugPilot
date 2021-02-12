import axios from 'axios';
import Cookies from 'universal-cookie'
import React, { Component} from 'react'
import '../App.css'
import Tablee from "../components/Table";
import headers from '../util/headers';
import img from '../25.gif'
import {  Modal, Button, Form, } from 'react-bootstrap/'

import {DropzoneArea} from 'material-ui-dropzone'
const cookies = new Cookies()





class homeScreen extends Component {



  constructor(props) {
    super(props)
    this.getbug()
    this.state = {
      data: [],
      modalShow: false,
      bugTitle:"",
      bugDescription:'',
      bugAssignto:''


    }
    
  }





  getbug = async () => {
    const uri = `http://localhost:5000/api/allbug`
    await axios.get(uri, headers).then(
      (res) => {
        this.setState({
          data: res.data
        })
      }
    )

  }

  createbug=async()=>{
    const title=this.state.bugTitle
    const description=this.state.bugDescription
    const assigned_to=this.state.bugAssignto
    const assigned_by=cookies.get('username')
    const uri = `http://localhost:5000/api/bug`
    await axios.post(uri,{title,description,assigned_to,assigned_by},headers).then(
      (res)=>{
        console.log(res)
      }

    )
  }


  MyVerticallyCenteredModal() {
    this.setState({
      modalShow: !this.state.modalShow

    })

  };





  render() {
    return (
      <>
      <div style={{width:"100vh"}}>
        <Modal  size="lg" show={this.state.modalShow}  aria-labelledby="contained-modal-title-vcenter"  centered>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Create Bug
              </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{height:'75vh',}}>
          <Form.Group style={{margin:'15px'}}>
              <Form.Label>Bug Title </Form.Label>
              <Form.Control size="lg" type="text"  onChange={(event)=>{this.setState({bugTitle:event.target.value},()=>{console.log("bug",this.state.bugTitle)})}} value={this.state.bugTitle} placeholder=""/>           
          </Form.Group>
          <Form.Group style={{margin:'15px'}}>
              <Form.Label>Description </Form.Label>
              <Form.Control size="xl" as="textarea" onChange={(event)=>this.setState({bugDescription:event.target.value})} value={this.state.bugDescription} placeholder=""/>           
          </Form.Group>
          <Form.Group style={{margin:'15px'}} >
              <Form.Label>Assigned to </Form.Label>
              <Form.Control  size="lg" type="text"  onChange={(event)=>this.setState({bugAssignto:event.target.value})} value={this.state.bugAssignto} placeholder=""/>           
          </Form.Group>
          <DropzoneArea />
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { this.MyVerticallyCenteredModal() }}>Close</Button>
            <Button onClick={() => { this.createbug() }}>Assign</Button>
          </Modal.Footer>
        </Modal>
        </div>

        <div className="flex-center">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous"></link>
          <h1>Homescreen</h1>
          <button onClick={() => { this.MyVerticallyCenteredModal() }} >+{cookies.get('username')}</button>
          <div className="tabl">
            {


              this.state.data.length > 1 ? <Tablee datas={this.state.data} uname={cookies.get('username')} refresh={this.getbug} /> : <img src={img} />
            }
          


          </div>

        </div>
      </>
    )
  }
}

export default homeScreen;


//   class App extends Component{
//     // const [modalShow, setModalShow] =useState(false);
//     constructor(props){
//     super(props)
//     this.state={
//         modalShow:false
//       }

//         }








    //  render(){
    //         return 
    //         (



    //             <div>

    //             <Button variant="primary" onClick={() => this.setState{modalShow:true}}> Launch vertically centered modal </Button>
    //             <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />

    //           </div>

    //           )
    //     }

    //     }












