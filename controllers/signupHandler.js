const User =require("../models/UserModel");
const bcrypt = require("bcrypt");


exports.signup = async (req,res) => {
   try {
    const {userName,email,password,role} = req.body;
     
    const exitingUser = await User.findOne({userName});

    if(exitingUser)
    {
        return res.status(400).json({
            success:false,
            message:"User already exist",
        });
    }
    let hashpassword;
    try {
        hashpassword = await  bcrypt.hash(password,10);
    } catch (error) {
        return res.json({
            success:false
            ,message:"Error in hashing the password",
        })
    }
    const user =await User.create({userName,email,password:hashpassword,role});

    return res.status(200).json({
        success:true,
        message:"User registered successfully",
    })
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Failed in registering",
    })
   }
}