const con = require('../dbconn');


module.exports.getProject=(req,resp)=>{

    console.log('getting project')
  let uid=req.params.uid;
  con.query(`SELECT * FROM project where id in(SELECT project_id FROM user_project where user_id='${uid}')`,(err,res)=>{
      if (err) console.log(err)
      console.log(res)
      resp.json(res)

  })

}

module.exports.getProjectBug =(req,resp)=>{
    
  let uid=req.params.uid;
  console.log("uid",uid);
  con.query(`Select * from bug where assigned_to='${uid}'`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res)
      resp.json(res);
    }
  })

}

module.exports.getMembers=(req,resp)=>{
  let pid=req.params.pid
  con.query(`Select id,username from user where id in (Select user_id from user_project where project_id='${pid}')`,(err,res)=>{
    return err?console.log(err):resp.json(res)
  })

}


module.exports.createProject=(req,resp)=>{
  let uid=req.params.uid
  let {pname,pdescription}=req.body

  con.query(`Insert into project(name,description,created_by) VALUES("${pname}","${pdescription}","${uid}")`,(err,res)=>{
    // return err?console.log(err):resp.json(res)
    if(err){
      return console.log("first query err",err)
    }
    else{
      console.log(res)
      con.query(`Insert into user_project(user_id,project_id) VALUES("${uid}","${res.insertId}")`,(errr,ress)=>{
       return errr?console.log("second query err",errr):resp.json(ress)
        
      } )
    }

  })


}