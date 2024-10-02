 const express = require('express')

 const app  = express()
// creatrinng new web server
// updated

// app.use will use will always take the http request other 


app.get("/user" ,(req, res)=>{
res.send({name: "ajsal"})
})

 app.use("/",(req,res)=>{
    res.send("heloo from the server")
 })

// listening the server for waiting incoming services
 app.listen(3000, ()=>{
    console.log("server is started")
 })


