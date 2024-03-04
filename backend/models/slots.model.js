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
  totalSlots: {
    type: Number, // Total number of computer slots for this time slot
    required: true
  },
  availableSlots: {
    type: Number, // Number of available computer slots for this time slot
    required: true
  },
  // Other attributes specific to slots can be added here
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
