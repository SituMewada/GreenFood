const app=require("./app");
const mongoose = require("mongoose");
const dotenv=require("dotenv");

process.on('uncaughtException',(err)=>{
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
})
  
dotenv.config({ path: './config.env' });

//DATABASE CONNECTION
mongoose.set("strictQuery", false);
const DB=process.env.DATABASE.replace("<password>",process.env.DATABASE_PASSWORD);
 
mongoose.connect(DB).then((con)=>{
    console.log("DB connection successfull ✅"); 
})    
 
const port=process.env.PORT || 3000;
const server=app.listen(port,()=>{
    console.log(`Over app is running on port ${port}`);
})

process.on('unhandledRejection',(err)=>{
    console.log('UNHANDLE REJECTION! 💥 Shutting down...')
   // console.log(err.name,err.message);


    server.close(()=>{
        server.exit(1);
        })
})
