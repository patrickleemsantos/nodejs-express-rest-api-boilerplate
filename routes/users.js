const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.getUserById(req.user.id);
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.getUserByEmail(req.body.email);
    if (user) return res.status(400).send('User already registered.'); 
    
    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    await User.createUser(user);

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['email', 'first_name', 'last_name', 'user_role_id']));
});

module.exports = router;