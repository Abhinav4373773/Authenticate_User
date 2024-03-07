const mongoose=require("mongoose");


const User = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
      type:String,
      required:true,
    },
    role:{
        type:String,
        
        enum:["Student","Role","Admin"],
    }

});

module.exports= mongoose.model("user",User);