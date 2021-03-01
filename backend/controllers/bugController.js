const con = require('../dbconn');

module.exports.
getBug =(req,resp)=>{
  console.log('getting list of project bug')
    
  let uid=req.params.uid;
  let pid=req.params.pid;
  // console.log("uid",pid);
  con.query(`Select * from bug where project_id=${pid}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      // console.log("getBug qrres",res)
      resp.send(res);
    }
  })

}

module.exports.getAllBug=(req,resp)=>{
  // console.log("getting all bug")
  con.query(`Select * from bug`,(err,res)=>{

    err?console.log("getallbug error",err):resp.send(res)
    // console.log("allbug con.query resp",res)
  
  })
}


module.exports.createBug=(req,resp)=>{
  console.log("bodyyyy",req.body,"headersssss",req.headers,)
  const {title,description,assigned_to,assigned_by,project_id}=req.body;
  console.log("assigned to ",assigned_to)
  console.log("assigned by",assigned_by)
  con.query(`INSERT INTO bug(title,description,status,assigned_to,assigned_by,project_id) VALUES("${title}","${description}","Open","${assigned_to}","${assigned_by}","${project_id}")`,(err,res)=>{
      if(err) console.log(err) 
      // console.log(res)
     return resp.json(res)
  })

}

module.exports.changeBugStatus=(req,resp)=>{
  let bid=req.params.bid;
  const {status}=req.body;
  con.query(`UPDATE bug SET status='${status}',closed_on=current_timestamp() WHERE id='${bid}'`,(err,res)=>{
    // console.log(`UPDATE bug SET status='${status}',closed_on=current_timestamp() WHERE id='${uid}'`)
    if(err) console.log(err)
    console.log("gdfg",res)
    resp.json({
      data:res,
      Message:"Status Changed Successfully"
    })
  })


}

module.exports.updateBug=(req,resp)=>{
  let bid=req.params.bid;
  const {title,description,assigned_to}=req.body;
  con.query(`UPDATE bug SET title='${title}',description='${description}',assigned_to='${assigned_to}',closed_on=current_timestamp() WHERE id='${bid}'`,(err,res)=>{
    // console.log(`UPDATE bug SET status='${status}',closed_on=current_timestamp() WHERE id='${uid}'`)
    if(err) console.log(err)
    console.log("gdfg",res)
    resp.json({
      data:res,
      Message:"Bug Changed Successfully"
    })
  })

}

module.exports.deleteBug=(req,resp)=>{
  let bid=req.params.bid;
  con.query(`Delete from bug WHERE id=${bid}`,(err,res)=>{
    if(err) return console.log(err)
    resp.json({
      data:res,
      Message:"Bug Deleted Permanently"
    })
  })
}