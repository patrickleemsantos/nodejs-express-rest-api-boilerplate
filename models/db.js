const config = require('config');
const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createConnection({
    host     : config.get('dbHost'),
    user     : config.get('dbUsername'),
    password : config.get('dbPassword'),
    database : config.get('dbDatabase'),
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;