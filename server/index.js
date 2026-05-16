const express = require("express")
const {ConnectDB}= require('./utils/dbConnector');
const app = express()
require('dotenv').config()
const cors = require("cors")
app.use(cors())
const userRouter = require('./router/userRoutes.js');
app.use(express.json())//middleware

 ConnectDB();
 app.use((req, res, next) => {
  if (req.method === "GET") {
    req.body = {}; // prevent body-parser crash
  }
  next();
});
app.use('/api/user',userRouter);
app.listen(process.env.PORT,()=>{
    console.log("App is running ");
   
})