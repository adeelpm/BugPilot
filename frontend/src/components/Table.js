import {  Modal, Button, Form,Dropdown,} from 'react-bootstrap';
import axios from 'axios'
import headers from '../util/headers';
//import {Table,TableRow,TablePagination,TableHead,TableContainer,TableCell,TableBody, Paper} from '@material-ui/core';
import { XGrid } from "@material-ui/x-grid";
import EditIcon from '@material-ui/icons/Edit';
import {DropzoneArea} from 'material-ui-dropzone'




import React, {useState} from 'react'
// import Cookies from 'universal-cookie';

// const cookies=new Cookies()

// class Tablee extends Component {

//     constructor(props) {
//         super(props)
//         console.log("tablee props",props)
//         this.state = {
//             data:this.props.datas,
//             editmodal: false,
//             bid:'',
//             bugTitle:"",
//             bugDescription:'',
//             bugAssignto:'',
//             users:[],
//             rw:[]
//           }
//           // this.rw=this.rw.bind(this)
//     }

//     componentDidMount(){
//       this.filldata()
//     }
//     componentDidUpdate(props){
//       if(this.props.datas!=props.datas)
//       {
//         console.log(this.props.datas.data)
//         this.setState({data:this.props.datas},()=>{
//           this.filldata()
//         })
     

//       }
//     }

//     filldata=()=>{
//       let rw=this.state.data.map((row)=>{
//         return({
//             id:row.id,
//             title:row.title,
//             description:row.description,
//             status:row.status,
//             assigned_to:row.assigned_to,
//             assigned_by:row.assigned_by,
//             created_on:row.opened_on,
//             last_modified:row.closed_on,
//             edit:"null"
//         })
//     })
//     this.setState({rw:rw})
//     }
    
//     async dropdownhalder(bid, status)  {
//         const uri = `http://localhost:5000/api/bug/${bid}`;
//         // console.log(uri)
//         await axios.put(uri,{ status: status },headers).then(
//         (res)=>{ this.props.refresh() }
//         ).catch(
//             (err)=>{console.log("status err",err)}
//         )
//     }

//     uname=this.props.uname;
//     handleEditBug=async()=>{
//       const bid=this.state.bid
//       const title=this.state.bugTitle
//       const description=this.state.bugDescription
//       const assigned_to=this.state.bugAssignto
//       const uri = `http://localhost:5000/api/bug/update/${bid}`
//       await axios.put(uri,{title,description,assigned_to},headers).then(
//         (res)=>{
//           console.log("res",res)
//           if(res.data.data.affectedRows==1){
//             alert('Bug updated')
//             this.setState({editmodal:false})
//             this.props.refresh()
  
//           }
//         }
  
//       )
//     }
//     handleDelete=async()=>{
//       const bid=this.state.bid
//       const uri = `http://localhost:5000/api/bug/delete/${bid}`
//       axios.delete(uri,headers).then(
//         res=>{
//           console.log(res)
//           if(res.data.data.affectedRows==1){
//             alert('Bug Deleted Permanently')
//              this.props.refresh() 
//              this.setState({
//                editmodal:false
//              })
//           }
//         }
//       )


//     }

//     editSvg(props){
//         const setfieldvalue=()=>{
//             this.setState({
//             bid:props.row.id,
//             bugTitle:props.row.title,
//             bugDescription:props.row.description,
//             bugAssignto:props.row.assigned_to,
//             users:[],
//             })

//         }

//         // handleEdit=()=>{}
//         // onClick={(e)=>{console.log(props.row)}}
//         // console.log("editsvg props",props)

               
//         return(<EditIcon  onClick={(e)=>{this.setState({editmodal:true});setfieldvalue();console.log("editsug props",props)}}/>)
        
//     }



    

  
          

//     dropdown(row){
//         return(
//         <Dropdown className="posabsolute"  onSelect={(key, e) => { this.dropdownhalder(row.id,e.target.innerText) }}>
//         <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={!(this.uname===row.assigned_to || this.uname===row.assigned_by)}>
//             {row.status}
//         </Dropdown.Toggle>
//         <Dropdown.Menu>
//             <Dropdown.Item >Open</Dropdown.Item>
//             <Dropdown.Item >Closed</Dropdown.Item>
//             <Dropdown.Item >Fixed</Dropdown.Item>
//             <Dropdown.Item >Reopen</Dropdown.Item>
//         </Dropdown.Menu>
//         </Dropdown>
//         )
//     }

//     cs = [
//         { field: 'id', headerName: 'ID', width: 70 },
//         { field: 'title', headerName: 'Title', width: 130 },
//         { field: 'description', headerName: 'Description', width: 130 },
//         { field: 'status', headerName: 'Status',/* type: 'number',*/ width: 180,renderCell:param=>this.dropdown(param.row)},
//         { field: 'assigned_to', headerName: 'Assigned to', width: 130, },
//         { field: 'assigned_by', headerName: 'Assigned by', width: 130, },
//         { field: 'created_on', headerName: 'Opened on', width: 200, },
//         { field: 'last_modified', headerName: 'Last Modified', width: 200, },
//         {field:'edit',headerName:'Edit',width:70,renderCell:(param)=>this.editSvg(param)}
       
//       ];

//       // rw=[]

  
  





//     render() {
//         return (
//             <>
            
//           <Modal  size="lg" show={this.state.editmodal}  aria-labelledby="contained-modal-title-vcenter"  centered>
//                 <Modal.Header>
//                   <Modal.Title id="contained-modal-title-vcenter">
//                     Edit Bug
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body style={{height:'75vh',}}>
//                 <Form.Group style={{margin:'15px'}}>
//                     <Form.Label>Bug Title </Form.Label>
//                     <Form.Control size="lg" type="text"  onChange={(event)=>{this.setState({bugTitle:event.target.value},()=>{console.log("bug",this.state.bugTitle)})}} value={this.state.bugTitle} placeholder=""/>           
//                 </Form.Group>
//                 <Form.Group style={{margin:'15px'}}>
//                     <Form.Label>Description </Form.Label>
//                     <Form.Control size="xl" as="textarea" onChange={(event)=>this.setState({bugDescription:event.target.value})} value={this.state.bugDescription} placeholder=""/>           
//                 </Form.Group>
//                 <Form.Group style={{margin:'15px'}} >
//                     <Form.Label>Assigned to </Form.Label>
//                     {<Dropdown  onSelect={(key,e)=>{this.setState({bugAssignto:e.target.innerText})}} >
//                       <Dropdown.Toggle>
//                          {this.state.bugAssignto?this.state.bugAssignto:'Assign to'}
//                       </Dropdown.Toggle>
//                       <Dropdown.Menu  onSelect>{
//                         this.state.users.map(element => (
//                           <Dropdown.Item eventKey={element.id} >{element.username}
//                           </Dropdown.Item> ))
//                         }
//                       </Dropdown.Menu>
//                     </Dropdown>}
//                     {/* <Form.Control  size="lg" type="text"  onChange={(event)=>this.setState({bugAssignto:event.target.value})} value={this.state.bugAssignto} placeholder=""/>            */}
//                 </Form.Group>
//                 <div style={{margin:'15px'}}> <DropzoneArea /></div>
//                   </Modal.Body>
//                 <Modal.Footer>

//                   <Button variant="success" onClick={() => {this.handleDelete()}}> Delete</Button>
//                   <Button onClick={() => { this.setState({editmodal:false}) }}>Close</Button>
//                   <Button onClick={() => { this.handleEditBug()}}>Assign</Button>
//                 </Modal.Footer>
//               </Modal>
  
  
  
  
  
  
  
  
  
  
          
//           <div style={{ height: '75vh', width: '75vw' }}>
//             <XGrid rows={this.state.rw} columns={this.cs}   />
//           </div>
//           </>
//         );
//     }
// }






export default function Tablee(props)
 {
  const [sta, setSta] = useState({})
  const [use,setUser]=useState([])

  const[editModal,seteditModal]=useState(false)  

    const cs = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'title', headerName: 'Title', width: 130 },
      { field: 'description', headerName: 'Description', width: 130 },
      { field: 'status', headerName: 'Status',/* type: 'number',*/ width: 180,renderCell:param=>dropdown(param.row)},
      { field: 'assigned_to', headerName: 'Assigned to', width: 130, },
      { field: 'assigned_by', headerName: 'Assigned by', width: 130, },
      { field: 'created_on', headerName: 'Opened on', width: 200, },
      { field: 'last_modified', headerName: 'Last Modified', width: 200, },
      {field:'edit',headerName:'Edit',width:70,renderCell:(param)=>editSvg(param)}
     
    ];
     const rw=props.datas.map((row)=>{
      return({
          id:row.id,
          title:row.title,
          description:row.description,
          status:row.status,
          assigned_to:row.assigned_to,
          assigned_by:row.assigned_by,
          created_on:row.opened_on,
          last_modified:row.closed_on,
          edit:"null"
      })
  })



    const dropdownhalder = async (id, status) => {
        const uri = `http://localhost:5000/api/bug/${id}`
        // console.log(uri)
        await axios.put(uri,{ status: status },headers).then(
        (res)=>{ props.refresh() }
        ).catch(
            (err)=>{console.log("status err",err)}
        )
    }
    const uname=props.uname;
    
    const editSvg=(props)=>{
     const setfieldvalue=()=>{
       console.log("props",props.row.id)
         let temp={
          bid:props.row.id,
          bugTitle:props.row.title,
          bugDescription:props.row.description,
          bugAssignto:props.row.assigned_to,
         
        }
        console.log("temp",temp)
        setSta({...temp})
        
        
      }
      


        // handleEdit=()=>{}
        // onClick={(e)=>{console.log(props.row)}}
        return(<EditIcon  onClick={(e)=>{setfieldvalue();getMembers();seteditModal(true);}}/>)
    }


    const handleEditBug=async()=>{
            const bid=sta.bid
            const title=sta.bugTitle
            const description=sta.bugDescription
            const assigned_to=sta.bugAssignto
            const uri = `http://localhost:5000/api/bug/update/${bid}`
            await axios.put(uri,{title,description,assigned_to},headers).then(
              (res)=>{
                console.log("res",res)
                if(res.data.data.affectedRows===1){
                  alert('Bug updated')
                  setSta(false)
                  props.refresh()
        
                }
              }
        
            )
          }
        





    const dropdown=(row)=>{
        return(
        <Dropdown className="posabsolute"  onSelect={(key, e) => { dropdownhalder(row.id,e.target.innerText) }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={!(uname===row.assigned_to || uname===row.assigned_by)}>
            {row.status}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item >Open</Dropdown.Item>
            <Dropdown.Item >Closed</Dropdown.Item>
            <Dropdown.Item >Fixed</Dropdown.Item>
            <Dropdown.Item >Reopen</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        )
    }

    const handleDelete=async()=>{
            const bid=sta.bid
            const uri = `http://localhost:5000/api/bug/delete/${bid}`
            axios.delete(uri,headers).then(
              res=>{
                console.log(res)
                if(res.data.data.affectedRows===1){
                  alert('Bug Deleted Permanently')
                   props.refresh() 
                   seteditModal(false)
                }
              }
            )
    
          }

  const getMembers = async () => {
    if (use.length <= 0) {
      const uri = `http://localhost:5000/api/user/getmembers/${props.pid}`
      await axios.get(uri, headers).then(
        (res) => {
          console.log(res)
          setUser(res.data)
        }
      )
      console.log("user", use)
    }
    else return;
  }

    
    
      return (
          <>
          
        <Modal  size="lg" show={editModal}  aria-labelledby="contained-modal-title-vcenter"  centered>
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Create Bug
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{height:'75vh',}}>
              <Form.Group style={{margin:'15px'}}>
                  <Form.Label>Bug Title </Form.Label>
                  <Form.Control size="lg" type="text"  onChange={(event)=>{let temp={...sta};temp.bugTitle=event.target.value;setSta(temp)}} value={sta.bugTitle} placeholder=""/>           
              </Form.Group>
              <Form.Group style={{margin:'15px'}}>
                  <Form.Label>Description </Form.Label>
                  <Form.Control size="xl" as="textarea" onChange={(event)=>{let temp={...sta};temp.bugDescription=event.target.value;setSta(temp);console.log("sta",sta)}} value={sta.bugDescription} placeholder=""/>           
              </Form.Group>
              <Form.Group style={{margin:'15px'}} >
                  <Form.Label>Assigned to </Form.Label>
                <Dropdown onc onSelect={(key, e) => { let temp = {...sta}; temp.bugAssignto = e.target.innerText; setSta(temp) }} >
                  <Dropdown.Toggle>
                    {sta.bugAssignto ? sta.bugAssignto : 'Assign to'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu onSelect>
                  {
                    use.map(element => (
                      <Dropdown.Item eventKey={element.id} >{element.username}
                      </Dropdown.Item>))
                  }
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <div style={{margin:'15px'}}> <DropzoneArea /></div>
                </Modal.Body>
              <Modal.Footer>
               <Button variant="success" onClick={() => {handleDelete()}}> Delete</Button>
                <Button onClick={() => { seteditModal(false); }}>Close</Button>
                <Button onClick={() => { handleEditBug();seteditModal(false)}}>Assign</Button>
              </Modal.Footer>
            </Modal>










        
        <div style={{ height: '75vh', width: '75vw' }}>
          <XGrid rows={rw} columns={cs}   />
        </div>
        </>
      )
}