const mongoose =require("mongoose");

require("dotenv").config();

exports.dbConnect = ()=> {
  mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  })
  .then(()=> {console.log("DB connection is Successful")})
  .catch((err)=> {
    console.error(err);
    console.log("Failed db connection");
    process.exit(1);
  })
}