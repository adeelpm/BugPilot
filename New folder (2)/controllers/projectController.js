const con = require('../dbconn');


module.exports.getProject=(req,resp)=>{

    console.log('getting project')
  let uid=req.params.uid;
  con.query(`SELECT * FROM project where id in(SELECT project_id FROM user_project where user_id='${uid}')`,(err,res)=>{
      if (err) console.log(err)
      console.log(res)
      resp.send(res)

  })

}