const Joi = require('joi');
const mongoose = require('mongoose');

const subMenuSchema = new mongoose.Schema({
    subMenuName: String,
    content: String
})

const menuSchema = new mongoose.Schema({
    menuName: {
        type: String,
        required: true
    },
    subMenus: [subMenuSchema]
});

const Menu = mongoose.model('Menu', menuSchema);

function validateMenu(menu) {
    const schema = {
        menuName: Joi.string().required(),
        subMenus: Joi.array()
    }

    return Joi.validate(menu, schema);
}

function validateSubMenu(submenu) {
    const schema = {
        subMenuName: Joi.string().required(),
        content: Joi.string()
    }

    return Joi.validate(submenu, schema);
}

exports.Menu = Menu;
exports.validate = validateMenu;
exports.validateSubmenu = validateSubMenu;