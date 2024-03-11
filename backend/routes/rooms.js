const express = require('express');
const mongoose = require('mongoose');
const Room = require('../models/rooms.model'); // Adjust the path as necessary to where your schema is defined

const router = express.Router();

// Middleware to find a room by its name
async function findRoom(req, res, next) {
  let room;
  try {
    room = await Room.findOne({ name: req.params.name });
    if (room == null) {
      return res.status(404).json({ message: 'Room not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.room = room;
  next();
}

// GET request for listing all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/reserve', async (req, res) => {
  const { roomName, computerId, date, timeSlot } = req.body;

  // Validate incoming data
  if (!roomName || !computerId || !date || !timeSlot) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check for duplicate reservation for the same computerId, date, and timeSlot
    const existingReservation = await Room.findOne({
      name: roomName,
      reservations: {
        $elemMatch: { 
          computerId: computerId, 
          date: date, 
          timeSlot: timeSlot
        }
      }
    });

    if (existingReservation) {
      return res.status(400).json({ message: 'This computer has already reserved this time slot on this date' });
    }

    // Find the room by name and add reservation
    const updatedRoom = await Room.findOneAndUpdate(
      { name: roomName },
      { $push: { reservations: { computerId, date, timeSlot } } },
      { new: true }
    );

    console.log(`Reservation added: Computer ${computerId} in room ${roomName} reserved for ${date} at ${timeSlot}.`);

    res.status(200).json({ message: `Computer ${computerId} in room ${roomName} reserved for ${date} at ${timeSlot}.` });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
