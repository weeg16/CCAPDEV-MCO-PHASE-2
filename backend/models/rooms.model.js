const mongoose = require('mongoose');

const computerSchema = new mongoose.Schema({
    computerId: { type: Number, unique: true, index: true }, // Ensure no unintended index on computerId
    isAvailable: Boolean
});

const reservationSchema = new mongoose.Schema({
    reservationId: { type: Number, unique: true }, // Ensure reservationId uniqueness
    computerId: Number,
    date: String,
    timeSlot: String
});

// Add compound index for computerId, date, and timeSlot to enforce uniqueness
reservationSchema.index({ computerId: 1, date: 1, timeSlot: 1 }, { unique: true });

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true // Ensures uniqueness of room names
    },
    computers: [computerSchema],
    reservations: [reservationSchema]
});

// Remove unintended index
roomSchema.index({ number: 1 }, { unique: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
