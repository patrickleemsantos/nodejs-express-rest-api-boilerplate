const auth = require('../middleware/auth');
const _ = require('lodash');
const { Menu, validate, validateSubmenu } = require('../models/Menu');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const menus = await Menu.find().select('-__v');
    res.send(menus);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let menu = await Menu.findOne({ menuName: req.body.menuName });
    if (menu) return res.status(400).send('Menu already exist.');

    menu = await new Menu({
        menuName: req.body.menuName,
        subMenus: req.body.subMenus
    });

    await menu.save();
    res.send(menu);
});

router.put('/submenu/:id', async(req, res) => {
    const { error } = validateSubmenu(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const subMenu = await Menu.findByIdAndUpdate(req.params.id, { $push: { subMenus: {
                                                                                "subMenuName": req.body.subMenuName,
                                                                                "content": req.body.content 
                                                                            } }},
                                                                            { new: true });
    if (!subMenu) return res.status(400).send('The menu with the given ID was not found.');

    res.send(subMenu);
});

module.exports = router;