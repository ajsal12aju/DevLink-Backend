 const express = require('express')
const connectDB = require("./config/database")

 const app  = express()
// creatrinng new web server
// updated

// app.use will use will always take the http request other 



//  the requset params we can pass all the thing like 
//  app.get("/user/:userId/:name/:password", (req, res) => {
//    res.send("heloo from the server");
//  });


 // we can pass the needed params like this
// updaeted


 
 connectDB()
   .then(() => {
     console.log("DB connectted");
 app.listen(3000, () => {
   console.log("server is started");
 });

   })
   .catch((err) => {
     console.log("DB is not connected");
   });
 


// listening the server for waiting incoming services


