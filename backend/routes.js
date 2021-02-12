const express = require('express');
const router = express.Router();
const {getBug,createBug,changeBugStatus,getAllBug} = require('./controllers/bugController')
const {signUp,removeUser,signIn,isSignedIn} = require('./controllers/authController');
const { getProject } = require('./controllers/projectController');



//Bug Routes
router.get('/bug/:uid',isSignedIn,getBug)
router.get('/allbug',isSignedIn,getAllBug)
router.post('/bug',isSignedIn,createBug)
router.put('/bug/:uid',isSignedIn,changeBugStatus)
router.post('/user/adduser',signUp)


router.get('/getproject/:uid',isSignedIn,getProject)

router.get('/testroute',isSignedIn,(req,res)=>{
    res.json({
        "message":"works"
    })
})









//auth routes

router.post('/signup',signUp)
router.delete('/removeuser/:id',removeUser)
router.post('/signin/',signIn)



module.exports = router