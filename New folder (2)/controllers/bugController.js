const con = require('../dbconn');

module.exports.getBug =(req,resp)=>{
    
  let uid=req.params.uid;
  console.log("uid",uid);
  con.query(`Select * from bug where assigned_to='${uid}'`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res)
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
  console.log("bodyyyy",req.body,"headersssss",req.headers)
  const {title,description,assigned_to,assigned_by}=req.body;
  con.query(`INSERT INTO bug(title,description,assigned_to,assigned_by) VALUES("${title}","${description}","${assigned_by}","${assigned_to}")`,(err,res)=>{
      if(err) console.log(err) 
      // console.log(res)
     return resp.json(res)
  })

}

module.exports.changeBugStatus=(req,resp)=>{
  let uid=req.params.uid;
  const {status}=req.body;
  con.query(`UPDATE bug SET status='${status}',closed_on=current_timestamp() WHERE id='${uid}'`,(err,res)=>{
    // console.log(`UPDATE bug SET status='${status}',closed_on=current_timestamp() WHERE id='${uid}'`)
    if(err) console.log(err)
    console.log("gdfg",res)
    resp.json({
      data:res,
      Message:"Status Changed Successfully"
    })
  })


}