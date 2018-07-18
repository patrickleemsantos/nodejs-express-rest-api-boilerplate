const helmet = require('helmet');
const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(helmet());
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}