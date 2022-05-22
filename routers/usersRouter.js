const express = require('express');
const { usersController } = require('../controllers');
const route = express.Router();

route.get('/', usersController.getData);
route.post('/', usersController.addUsers);
route.patch('/:id', usersController.update);
route.delete('/:id', usersController.delete);

module.exports = route