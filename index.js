const express =require("express");
const app = express();

require("dotenv").config();
const Port =process.env.PORT || 3000;

app.use(express.json());

require("./config/database").dbConnect();

const route = require("./routes/user");
app.use("/api/v1",route);

app.listen(Port,() => {
    console.log(`server started at ${Port}`);
})