const router = require('express').Router();
const Room = require('../models/rooms.model');

// Route to retrieve all rooms
router.route('/').get((req, res) => {
  Room.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to add a new room
router.route('/add').post((req, res) => {
    const { number, type, building } = req.body; // Include the building field
    const newRoom = new Room({ number, type, building }); // Include the building field
    newRoom.save()
        .then(() => res.json('Room added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to retrieve a specific room by ID
router.route('/:id').get((req, res) => {
  Room.findById(req.params.id)
    .then(room => res.json(room))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to update a room by ID
router.route('/update/:id').post((req, res) => {
  Room.findById(req.params.id)
    .then(room => {
      room.number = req.body.number;
      room.type = req.body.type;

      room.save()
        .then(() => res.json('Room updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to delete a room by ID
router.route('/:id').delete((req, res) => {
  Room.findByIdAndDelete(req.params.id)
    .then(() => res.json('Room deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
