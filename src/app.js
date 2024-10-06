 const express = require('express')
 const {userAuth} = require('./utils')

 const app  = express()
// creatrinng new web server
// updated

// app.use will use will always take the http request other 

app.use("/", (err,req, res, next) => {
if(err){
   res.status(500).send("somthing went wrong")
}
});


app.get("/user", userAuth ,(req, res)=>{
res.send({name: "ajsal"}) 
})

//  the requset params we can pass all the thing like 
//  app.get("/user/:userId/:name/:password", (req, res) => {
//    res.send("heloo from the server");
//  });


 // we can pass the needed params like this
// updaeted


app.use("/", (req, res) => {
  res.send("heloo from the server");
});



 app.use("/",(req,res)=>{
    res.send("heloo from the server")
 })

// listening the server for waiting incoming services
 app.listen(3000, ()=>{
    console.log("server is started")
 })


