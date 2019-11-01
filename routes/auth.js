const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const { validateEmail } = require('../lib/helpers');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).send('Please enter email or password.');
    }

    if (!validateEmail(email)) {
        return res.status(400).send('Invalid email address.');
    }

    let user = await User.getUserByEmail(email);
    if (!user) return res.status(400).send('Invalid email or password.');
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken(user.id, user.user_role_id);
    res.send(token);
});

module.exports = router;