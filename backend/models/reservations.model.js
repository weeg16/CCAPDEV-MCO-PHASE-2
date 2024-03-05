// reservations.model.js

const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  reservationDateTime: {
    type: Date,
    required: true,
    default: Date.now
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
