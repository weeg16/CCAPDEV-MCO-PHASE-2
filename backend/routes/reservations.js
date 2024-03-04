const router = require('express').Router();
const Reservation = require('../models/reservations.model');

// Route to retrieve all reservations
router.route('/').get((req, res) => {
  Reservation.find()
    .then(reservations => res.json(reservations))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to add a new reservation
router.route('/add').post((req, res) => {
  const { userId, slotId, reservationDateTime } = req.body;
  const newReservation = new Reservation({ userId, slotId, reservationDateTime });
  newReservation.save()
    .then(() => res.json('Reservation added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to retrieve a specific reservation by ID
router.route('/:id').get((req, res) => {
  Reservation.findById(req.params.id)
    .then(reservation => res.json(reservation))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to update a reservation by ID
router.route('/update/:id').post((req, res) => {
  Reservation.findById(req.params.id)
    .then(reservation => {
      reservation.userId = req.body.userId;
      reservation.slotId = req.body.slotId;
      reservation.reservationDateTime = req.body.reservationDateTime;

      reservation.save()
        .then(() => res.json('Reservation updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to delete a reservation by ID
router.route('/:id').delete((req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Reservation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
