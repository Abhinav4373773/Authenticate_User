const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res, next) =>{
    const token = req.body.token;
    if(!token)
    {
      return res.status(401).json({
        success:false,
        message:"token is missing",
      });
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(500).json({
            success:"false",
            message:"Something went wrong",
        });
    }
}

exports.isStudent = (req,res,next)=> {
    try {
        if(req.user.role !== "Student")
        {
            return res.status(200).json({
                success:false,
                message:"Sorry! You are not autherised to access this router"
            })

    }
    next();
    } catch (error) {
        return res.status(403).json({
            succes:false,
            message:"Soory! we are failed during authenticationg"
        })
    }
}

exports.isAdmin = (req,res,next) => {
    try {
        if(req.user.role !== "Admin")
        {
            return res.status(402).json({
                succes:false,
                message:"Sorry you are not authorised to access this portal"
            });
        }
        next();
    } catch (error) {
        return res.status(403).json({
            success:false,
            message:"Error occured in fetching on admin portal"
        });
    }
}