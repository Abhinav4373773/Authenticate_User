const User = require("../models/UserModel");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");

exports.loogin = async (req,res) => {
   try {
    const{userName,password} = req.body;

    if(!userName || !password)
    {
        return res.status(400).json({
            success:false,
            message:"Please! Fillup the required details"
        });
    }

    let user =await User.findOne({userName});

    if(!user)
    {
        return res.status(401).json({
            success:false,
            message:"User not registered",
        });
    }
    const payload = {
        userName:user.userName,
        id:user.id,
        role:user.role
    }

    if(await bcrypt.compare(password,user.password))
    {
       const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"2h",
       })

       user =user.toObject();
       user.token = token;
       user.password = undefined;

       const options = {
        expires: new Date(Date.now() + 3*24*60*60*1000),
        httpOnly:true
       }

        return res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user,
        message:"User logged in Successfully",
       });
    }
    else{
        return res.status(200).json({
            success:false,
            message:"Paasword didnt mactched",
        })
    }
   } catch (error) {
     console.error(error);
     return res.status(500).json({
        success:false,
        message:"Oops! Some error occured",
     });
     
   }
}