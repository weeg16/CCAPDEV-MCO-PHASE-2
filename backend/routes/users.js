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

module.exports = router;
