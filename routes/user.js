const express =require("express");
const router = express.Router();

//importing controllers
const {signup} = require("../controllers/signupHandler");
const {loogin} =require("../controllers/loogin");
const {auth,isStudent,isAdmin} = require("../middleware/auth");

//mounting controllers
router.post("/signup",signup);
router.post("/login",loogin);
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"hello! Welcome to testing world",
    })
});
router.get("/student",auth,isStudent,(req,res) => {
    return res.json({
        success:true,
        message:"Welcome to the student portal",
    })
})
router.get("/admin",auth,isAdmin,(req,res) =>{
    res.json({
        success:true,
        message:"Welcome to the Admin portal",
    })
})

module.exports=router;