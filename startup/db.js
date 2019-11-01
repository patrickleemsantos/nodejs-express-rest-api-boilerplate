const config = require('config');
const mysql = require('mysql');
const winston = require('winston');

module.exports = function() {
    const connection = mysql.createConnection({
        host     : config.get('dbHost'),
        user     : config.get('dbUsername'),
        password : config.get('dbPassword'),
        database : config.get('dbDatabase'),
    });
    
    connection.connect(function(err) {
        if (err) {
            throw err;
        } else {
            winston.info('Connected to MySQL DB...');
        }
    });
}