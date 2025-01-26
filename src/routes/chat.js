const express = require("express");
const Chat = require("../models/chat");
const chatRouter = express.Router();

// Get chat history between two users
chatRouter.get("/chat/:userId/:connectionId", async (req, res) => {
  try {
    const { userId, connectionId } = req.params;
    const messages = await Chat.find({
      $or: [
        { senderId: userId, receiverId: connectionId },
        { senderId: connectionId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save a message (optional, for non-socket use)
chatRouter.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const newMessage = await Chat.create({ senderId, receiverId, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = chatRouter;
