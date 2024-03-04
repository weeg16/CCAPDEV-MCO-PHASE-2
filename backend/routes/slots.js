const router = require('express').Router();
const Slot = require('../models/slots.model');

// Route to retrieve all slots
router.route('/').get((req, res) => {
  Slot.find()
    .then(slots => res.json(slots))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to add a new slot
router.route('/add').post((req, res) => {
  const { roomId, startDateTime, endDateTime, totalSlots } = req.body;
  const newSlot = new Slot({ roomId, startDateTime, endDateTime, totalSlots, availableSlots: totalSlots });
  newSlot.save()
    .then(() => res.json('Slot added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to retrieve a specific slot by ID
router.route('/:id').get((req, res) => {
  Slot.findById(req.params.id)
    .then(slot => res.json(slot))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to update a slot by ID
router.route('/update/:id').post((req, res) => {
  Slot.findById(req.params.id)
    .then(slot => {
      slot.roomId = req.body.roomId;
      slot.startDateTime = req.body.startDateTime;
      slot.endDateTime = req.body.endDateTime;
      slot.totalSlots = req.body.totalSlots;
      slot.availableSlots = req.body.totalSlots; // Update available slots when total slots change

      slot.save()
        .then(() => res.json('Slot updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to delete a slot by ID
router.route('/:id').delete((req, res) => {
  Slot.findByIdAndDelete(req.params.id)
    .then(() => res.json('Slot deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
