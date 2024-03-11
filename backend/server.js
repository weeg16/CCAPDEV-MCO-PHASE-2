const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Room = require('./models/rooms.model');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Update the URI to connect to your local MongoDB instance
const uri = process.env.LOCAL_MONGODB_URI || 'mongodb://localhost:27017/mydatabase';
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
    insertOrUpdateSampleRooms(sampleRooms)
        .then(() => console.log('Done processing sample rooms'))
        .catch(err => console.error('Error processing sample rooms:', err));
});

// Function to insert or update a sample room
async function insertOrUpdateSampleRoom(sampleRoom) {
    try {
        console.log(`Inserting/updating room: ${sampleRoom.name}`); // Add this line
        const updateResult = await Room.updateOne(
            { name: sampleRoom.name }, // Filter by unique room name
            { $setOnInsert: sampleRoom }, // Set data if inserting
            { upsert: true } // Insert the document if it doesn't exist
        );

        // Log the outcome
        if (updateResult.upsertedCount > 0) {
            console.log(`Inserted room: ${sampleRoom.name}`);
        } else if (updateResult.modifiedCount > 0) {
            console.log(`Updated room: ${sampleRoom.name}`);
        } else {
            console.log(`Room already exists and is unchanged: ${sampleRoom.name}`);
        }
    } catch (err) {
        console.error(`Error inserting/updating room ${sampleRoom.name}:`, err);
    }
}


// Iterate over sample rooms and insert or update them
async function insertOrUpdateSampleRooms(sampleRooms) {
    for (const sampleRoom of sampleRooms) {
        await insertOrUpdateSampleRoom(sampleRoom);
    }
}

// Sample room data
const sampleRooms = [
    {
        name: 'LS212',
        computers: [
            { computerId: 1, isAvailable: true },
            { computerId: 2, isAvailable: true },
            { computerId: 3, isAvailable: true },
            { computerId: 4, isAvailable: true },
        ],
        reservations: []
    },
    {
        name: 'Room 2',
        computers: [
            { computerId: 1, isAvailable: true },
            { computerId: 2, isAvailable: true },
            { computerId: 3, isAvailable: true }
        ],
        reservations: []
    }
];

const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const slotsRouter = require('./routes/slots');
const reservationsRouter = require('./routes/reservations');

app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/slots', slotsRouter);
app.use('/reservations', reservationsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
