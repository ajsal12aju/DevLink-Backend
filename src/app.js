const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const connectDB = require("./config/database");
const Chat = require("./models/chat"); // Import Chat model
const cookieParser = require("cookie-parser");
const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat"); // New route for chat messages
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter); // Add chat route

// WebSocket Connection Handling
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Join a chat room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Handle sending messages
  socket.on("sendMessage", async ({ senderId, receiverId, message, roomId }) => {
    try {
      // Save the message to the database
      const newMessage = await Chat.create({
        senderId,
        receiverId,
        message,
      });

      // Broadcast the message to the room
      io.to(roomId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message to DB:", error);
    }
  });

  // Handle disconnection
  // Handle leaving a room
socket.on("leaveRoom", (roomId) => {
  socket.leave(roomId);
  console.log(`User left room: ${roomId}`);
});

  socket.on("disconnect", () => {
    console.log("A user disconnected: ", socket.id);
  });
});


connectDB()
  .then(() => {
    console.log("DB connected");
    server.listen(3003, () => {
      console.log("Server is started on port 3003");
    });
  })
  .catch((err) => {
    console.log(err, "===");
    console.log("DB is not connected");
  });
