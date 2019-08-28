const express = require('express');
const routes = express.Router();

const UserController = require('../controllers/User');

routes.get('/', UserController.getUsers);
routes.get('/:id', UserController.getUser);

routes.post('/', UserController.createUser);
routes.patch('/:id', UserController.updateUser);
routes.delete('/:id', UserController.deleteUser);

module.exports = routes;
