const mongoose = require('mongoose');
const Building = require('./buildings.model');

const roomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Individual Computer', 'Whole'],
    required: true
  },
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building', 
    required: true
  }
});

const Room = mongoose.model('Room', roomSchema);

// Define an array of room data to insert into the database
const roomData = [
  // Rooms for ST. LA SALLE HALL
  { number: 'L212', type: 'Individual Computer', building: '65e49ce0351c1224cdaf34b6' },
  { number: 'L229', type: 'Individual Computer', building: '65e49ce0351c1224cdaf34b6' },
  { number: 'L320', type: 'Whole', building: '65e49ce0351c1224cdaf34b6' },
  { number: 'L335', type: 'Whole', building: '65e49ce0351c1224cdaf34b6' },
  
  // Rooms for GOKONGWEI HALL
  { number: 'G302', type: 'Individual Computer', building: '65e49ce0351c1224cdaf34b7' },
  { number: 'G304A', type: 'Individual Computer', building: '65e49ce0351c1224cdaf34b7' },
  { number: 'G304B', type: 'Whole', building: '65e49ce0351c1224cdaf34b7' },
  { number: 'G306', type: 'Whole', building: '65e49ce0351c1224cdaf34b7' },
  { number: 'G404', type: 'Whole', building: '65e49ce0351c1224cdaf34b7' },
  
  // Rooms for YUCHENGCO HALL
  { number: 'Y602', type: 'Individual Computer', building: '65e49ce0351c1224cdaf34b8' },
  { number: 'Y603', type: 'Whole', building: '65e49ce0351c1224cdaf34b8' },

  // Rooms for VELASCO HALL
  { number: 'V103', type: 'Individual Computer', building: '65e49ce0351c1224cdaf34b9' },
  { number: 'Y211', type: 'Whole', building: '65e49ce0351c1224cdaf34b9' },
  { number: 'Y301', type: 'Whole', building: '65e49ce0351c1224cdaf34b9' },

  // Rooms for ST JOSEPH HALL
  { number: 'J212', type: 'Individual Computer', building: '65e49ce0351c1224cdaf34ba' },
  { number: 'J213', type: 'Whole', building: '65e49ce0351c1224cdaf34ba' },
];

// Insert rooms into the database
Room.insertMany(roomData)
  .then(() => console.log('Rooms added successfully'))
  .catch(err => console.error('Error adding rooms:', err));

module.exports = Room;
