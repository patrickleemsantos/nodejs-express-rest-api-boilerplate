const helmet = require('helmet');
const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const menu = require('../routes/menus');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use(helmet());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/menu', menu);
    app.use(error);
}