const router = require('express').Router();
const Building = require('../models/buildings.model');

// Route to retrieve all buildings
router.route('/').get((req, res) => {
  Building.find()
    .then(buildings => res.json(buildings))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to add a new building
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const newBuilding = new Building({ name });
  newBuilding.save()
    .then(() => res.json('Building added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to retrieve a specific building by ID
router.route('/:id').get((req, res) => {
  Building.findById(req.params.id)
    .then(building => res.json(building))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to update a building by ID
router.route('/update/:id').post((req, res) => {
  Building.findById(req.params.id)
    .then(building => {
      building.name = req.body.name;
      building.save()
        .then(() => res.json('Building updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to delete a building by ID
router.route('/:id').delete((req, res) => {
  Building.findByIdAndDelete(req.params.id)
    .then(() => res.json('Building deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
