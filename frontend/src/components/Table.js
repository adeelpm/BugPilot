import { Dropdown } from 'react-bootstrap';
import axios from 'axios'
import headers from '../util/headers';
//import {Table,TableRow,TablePagination,TableHead,TableContainer,TableCell,TableBody, Paper} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';



const Tablee=(props)=> {
   

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

    const cs = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'status', headerName: 'Status',/* type: 'number',*/ width: 180,renderCell:(param)=>{ return dropdown(param.row)} },
        { field: 'assigned_to', headerName: 'Assigned to', width: 130, },
        { field: 'assigned_by', headerName: 'Assigned by', width: 130, },
        { field: 'created_on', headerName: 'Opened on', width: 200, },
        { field: 'last_modified', headerName: 'Last Modified', width: 200, },
       
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
            last_modified:row.closed_on
        })
    })
    
      return (
        <div style={{ height: '100vh', width: '75vw' }}>
          <DataGrid rows={rw} columns={cs}   />
        </div>
      );
        

    // return(
    // <TableContainer component={Paper}>
    //     <Table  aria-label="simple table">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell align="right">Id</TableCell>
    //           <TableCell align="right">Title</TableCell>
    //           <TableCell align="right">Description</TableCell>
    //           <TableCell align="right">Status</TableCell>
    //           <TableCell align="right">Assigned to</TableCell>
    //           <TableCell align="right">Assigned by</TableCell>
    //           <TableCell align="right">Created on</TableCell>
    //           <TableCell align="right">Modified on</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {props.datas.map((row) => (
    //           <TableRow key={row.id}>
    //             <TableCell align="right">{row.id}</TableCell>
    //             <TableCell component="th" scope="row"> {row.title} </TableCell>
    //             <TableCell align="right">{row.description}</TableCell>
    //             <TableCell align="right">
    //                 <Dropdown onSelect={(key, e) => { dropdownhalder(row.id,e.target.innerText) }}>
    //                                     <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={!(uid===row.assigned_to || uid===row.assigned_by)}>
    //                                         {row.status}
    //                                     </Dropdown.Toggle>
    //                                     <Dropdown.Menu>
    //                                         <Dropdown.Item >Open</Dropdown.Item>
    //                                         <Dropdown.Item >Closed</Dropdown.Item>
    //                                         <Dropdown.Item >Fixed</Dropdown.Item>
    //                                         <Dropdown.Item >Reopen</Dropdown.Item>
    //                                     </Dropdown.Menu>
    //                 </Dropdown>
    //             </TableCell>
    //             <TableCell align="right">{row.assigned_by}</TableCell>
    //             <TableCell align="right">{row.assigned_to}</TableCell>
    //             <TableCell align="right">{row.opened_on}</TableCell>
    //             <TableCell align="right">{row.closed_on}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // )

    // return (
    //     <table className="table">
    //         <thead>
    //             <tr>
    //                 <th scope="col">Id</th>
    //                 <th scope="col">Title</th>
    //                 <th scope="col">Description</th>
    //                 <th scope="col">Status</th>
    //                 <th scope="col">Assigned to</th>
    //                 <th scope="col">Assigned by</th>
    //                 <th scope="col">Opened on</th>
    //                 <th scope="col">Modified on</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {
    //                 props.datas.map(
    //                     (item) => {
    //                         return (
    //                             <tr key={item.id}>
    //                                 <td>{item.id}</td>
    //                                 <td>{item.title}</td>
    //                                 <td>{item.description}</td>
    //                                 <td><Dropdown
    //                                     onSelect={(key, e) => { dropdownhalder(item.id,e.target.innerText) }}>
    //                                     <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={!(uid===item.assigned_to || uid===item.assigned_by)}>
    //                                         {item.status}
    //                                     </Dropdown.Toggle>

    //                                     <Dropdown.Menu>
    //                                         <Dropdown.Item href="#/action-1">Open</Dropdown.Item>
    //                                         <Dropdown.Item href="#/action-2">Closed</Dropdown.Item>
    //                                         <Dropdown.Item href="#/action-3">Fixed</Dropdown.Item>
    //                                         <Dropdown.Item href="#/action-3">Reopen</Dropdown.Item>
    //                                     </Dropdown.Menu>
    //                                 </Dropdown></td>
    //                                 <td>{item.assigned_to}</td>
    //                                 <td>{item.assigned_by}</td>
    //                                 <td>{item.opened_on}</td>
    //                                 <td>{item.closed_on}</td>
    //                             </tr>)
    //                     }
    //                 )
    //             }
    //         </tbody>
    //     </table>
    // )
}

export default Tablee
