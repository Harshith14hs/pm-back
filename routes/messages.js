const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Add a new message
router.post('/', async (req, res) => {
  try {
    const { name, avatar, text, date } = req.body;
    const message = new Message({ name, avatar, text, date });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add message' });
  }
});

// Delete a message by id
router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete message' });
  }
});

module.exports = router; 