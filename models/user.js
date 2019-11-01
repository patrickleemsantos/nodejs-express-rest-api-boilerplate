const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const sql = require('./db');

var User = function(data){
    this.email = data.email;
    this.password = data.password;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.user_role_id = data.user_role_id;
    this.created_at = new Date();
    this.updated_at = data.updated_at || null;
    this.deleted_at = data.deleted_at || null;
};

User.generateAuthToken = function(id, userRoleId) {
    const token = jwt.sign({ id: id, user_role_id: userRoleId }, config.get('jwtPrivateKey'));
    return token;
}

User.createUser = function createUser(data) {        
    return new Promise ((resolve, reject) => {
        sql.query("INSERT INTO users SET ?", data, function (err, res) {
            if(err) {
                reject(err);
            } else {
                resolve(res.insertId);
            }
        });      
    });
};

User.getUsers = function getUsers() {
    return new Promise ((resolve, reject) => {
        sql.query("SELECT * FROM users ORDER BY ID DESC", function (err, res) {             
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });   
    });
};

User.getUserById = function getUserById(userId) {
    return new Promise ((resolve, reject) => {
        sql.query("SELECT * FROM users WHERE id = ? LIMIT 1", userId, function (err, res) {             
            if (err) {
                reject(err);
            } else {
                resolve(res[0]);
            }
        });   
    });
};

User.getUserByEmail = function getUserByEmail(email) {    
    return new Promise ((resolve, reject) => {
        sql.query("SELECT * FROM users WHERE email = ? LIMIT 1", email, function (err, res) {             
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });    
    });
};


function validateUser(user) {
    const schema = {
        email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
        password: Joi.string().min(1).max(255).allow(null),
        first_name: Joi.string().min(1).max(255).required(),
        last_name: Joi.string().min(1).max(255).required(),
        user_role_id: Join.number().required()
    }

    return Joi.validate(user, schema);
}

exports.validateUser = validateUser;
exports.User = User;