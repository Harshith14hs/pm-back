const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String },
  text: { type: String, required: true },
  date: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema); 