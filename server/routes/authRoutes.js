const express = require('express')
const router = express.Router()
const cors = require('cors')
const { Register, loginUser, getProfile} = require('./Controllers/authController')
const verifyToken = require('../middleware/verifyToken')
const generateToken = require('../middleware/authenticate')
// middleware
router.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}));

router.get('/',verifyToken)
router.post('/signup', Register)
router.post('/login',generateToken, loginUser)
router.get('https://travelplanner-indol.vercel.app', (req,res)=>{
res.json({message:"backend server is running"})
})
module.exports=router;