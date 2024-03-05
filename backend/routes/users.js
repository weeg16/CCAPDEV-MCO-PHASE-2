// user.js

const router = require('express').Router();
const User = require('../models/users.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const { firstName, lastName, username, password } = req.body;
    const newUser = new User({ firstName, lastName, username, password });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post(async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            throw new Error('User not found or invalid credentials');
        }
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.route('/register').post(async (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user object
    const newUser = new User({ firstName, lastName, username, password });

    // Save the user to the database
    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

module.exports = router;
