const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.")
})

const buildingsRouter = require('./routes/buildings');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const slotsRouter = require('./routes/slots');
const reservationsRouter = require('./routes/reservations');

app.use('/buildings', buildingsRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/slots', slotsRouter);
app.use('/reservations', reservationsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
