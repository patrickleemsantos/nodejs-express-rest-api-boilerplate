const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.connect(config.get('db'))
        .then(() => winston.info('Connected to MongoDB...'));
}