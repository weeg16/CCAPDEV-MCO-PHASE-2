const express = require('express');
const mongoose = require('mongoose');
const Room = require('../models/rooms.model');

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
  const { roomName, computerId, date, timeSlot, userId } = req.body; // Include userId from request body

  // Validate incoming data
  if (!roomName || !computerId || !date || !timeSlot || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if the user already has a reservation for the given date
    const existingReservationForDate = await Room.findOne({
      name: roomName,
      reservations: {
        $elemMatch: { 
          date: date,
          userId: userId
        }
      }
    });

    if (existingReservationForDate) {
      return res.status(400).json({ message: 'You already have a reservation for this date.' });
    }

    // Check if the computer is already reserved for the given date
    const existingReservationForComputer = await Room.findOne({
      name: roomName,
      reservations: {
        $elemMatch: {
          computerId: computerId,
          date: date,
          timeSlot: timeSlot
        }
      }
    });

    if (existingReservationForComputer) {
      return res.status(400).json({ message: 'This computer is already reserved for the given timeslot.' });
    }

    // Find the room by name and add reservation
    const updatedRoom = await Room.findOneAndUpdate(
      { name: roomName },
      { $push: { reservations: { computerId, date, timeSlot, userId } } },
      { new: true }
    );

    console.log(`Reservation added: Computer ${computerId} in room ${roomName} reserved for ${date} at ${timeSlot} by User ${userId}.`);

    res.status(200).json({ message: `Computer ${computerId} in room ${roomName} reserved for ${date} at ${timeSlot} by User ${userId}.` });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// GET request to retrieve existing reservations for a specific date
router.get('/reservations', async (req, res) => {
  const { date } = req.query;

  // Validate incoming data
  if (!date) {
    return res.status(400).json({ message: 'Missing date parameter' });
  }

  try {
    // Find reservations for the specified date
    const existingReservations = await Room.find({
      'reservations.date': date
    });

    res.status(200).json(existingReservations);
  } catch (error) {
    console.error('Error retrieving reservations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
