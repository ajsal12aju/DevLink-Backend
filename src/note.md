  crate repo
  install the repo
 nodemodules package.json , package.lock.json
install express create server listen port write requests and what is the deipenddetancies 
-g 
 nodemon
  diff between ^ this and ~ 

  create git repository 
  git init 
  gitignore 
  create git hub remote repo
  git add .
  git commit 
  connect and remote 
  fix branch 
  and push the code of the remote repo
play with extension and routes
order of the routes is important when you use the app.use 

intall postman and ->  workspace -> collection -> testing the get api

test the get post patch and delete need to test
expolore routes and regex 
handling multiple route handles and next() res.send  play with code

what is middlewere how to handle the routes and how that work behind

create new clustur 
mogoDB atlas
the clustor string take and create new connection in to the composs
and create

example of data saving
..................
app.post("/signup", async (req, res) => {
  // creating new instance of user modal this will create new object for user using with User modal
  const user = new User({
    firstName: "rajith", 
    lastName: "k",
    age: 23,
    email: "rajith@gmail.com",
    password: "123",
  });

  try {
     await user.save();
     res.send("User added succsussfully");
  } catch (error) {
   res.status(500).send("somthing went wrog : "+ error.message)
  }
}); 
..............

install mogoose library 
connect your application

create a post api data add to the data base 
push data using postman

add the express.json 
make signup api dynamic 
