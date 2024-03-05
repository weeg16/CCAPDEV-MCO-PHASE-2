// slots.model.js

const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  startDateTime: {
    type: Date,
    required: true
  },
  endDateTime: {
    type: Date,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  occupied: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
