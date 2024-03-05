// rooms.model.js

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    enum: ['Individual Computer', 'Whole'],
    required: true
  },
  building: {
    type: String,
    required: true
  },
  maxSlots: {
    type: Number,
    required: true
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
