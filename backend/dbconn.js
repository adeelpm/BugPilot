const mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bugPilot"

});

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "adeelpm_bugpilot",
//   password: "",
//   database: "adeelpm_bugPilot"

// });


con.connect((err) => {
  try {
    if (err) throw err;
    
  } catch (error) {
    console.log("caught''''''''''",error)
    
    
  }
  
  
  console.log("Connected!");
});


module.exports=con;