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

create delete api 
diff betweeen put and patch
update api
expolore mongoose doc
what are options in mongo findByidUpdate

scheema options from the document  


install cookieparser
just send a dummy cookie to user
create GET / Profile Api and check if you have the cookie back
install JWT
in login api after email and password validation create a JWT token and send it user inside the cookies
read the cookies inside your profile api and find the logged in user

-----------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password, "password");

    const user = await User.findOne({ email: email });
    console.log(password, "password");

    if (!user) {
      throw new Error("Email is not in the DB");
    }
    const isPasswordValied = await bcrypt.compare(password, user.password);
    if (isPasswordValied) {
      const token = await jwt.sign({ _id: user._id }, "key134");
      res.cookie("token", token);
      res.send("user login succsesss");
    } else {
      throw new Error("password is not currectted");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("sonthig went wrong");
  }
});

app.post("/signup", async (req, res) => {
  // creating new instance of user modal this will create new object for user using with User modal

  try {
    const user = req.body;

    if (!user) {
      throw new Error("data is not currected");
    }
    const password = user.password;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      password: hashPassword,
    });

    await newUser.save();
    res.send("User added succsussfully");
  } catch (error) {
    res.status(500).send("somthing went wrog : " + error.message);
  }
});

app.get("/profile", async (req, res) => {

  console.log(req.cookies)
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) {
      throw new Error("invalied Token");
    }

    const decoded = await jwt.verify(token, "key134");
    const { _id } = decoded;
    const user = await User.findById(_id);
    res.send(user);
  } catch (error) {
    res.status(400).send("somthing went wrong" + error.message);
  }
});

..................