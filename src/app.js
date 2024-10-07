const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();
// this will convet the req.body data in to the js obj
app.use(express.json());
app.use(cookieParser());
// creatrinng new web server
// updated
// app.use will use will always take the http request other
//  the requset params we can pass all the thing like
//  app.get("/user/:userId/:name/:password", (req, res) => {
//    res.send("heloo from the server");
//  });
// we can pass the needed params like this
// updaeted

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

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const userData = await User.find({ email: userEmail });
    if (userData.length === 0) {
      res.status(400).send("user not found");
    } else {
      res.send(userData);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("somthing went wrong with this");
  }
});

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const userData = await User.findById(id);
    res.status(200).send(userData);
  } catch (error) {
    res.status(400).send("sonthig went wrong");
  }
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndDelete(id);
    res.status(200).send("user is deleted succsuss");
  } catch (error) {
    res.status(400).send("somthing went wrong");
  }
});

app.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const data = await User.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send("somthing went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("somthing went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("DB connectted");
    app.listen(3000, () => {
      console.log("server is started");
    });
  })
  .catch((err) => {
    console.log(err, "===");
    console.log("DB is not connected");
  });

// listening the server for waiting incoming services
