const express = require('express');
const routes = express.Router();

const UserController = require('../controllers/User');
const auth = require('../middleware/auth');

const { signup } = require('../middleware/validator');

routes.get('/', UserController.getUsers);
routes.get('/:id', UserController.getUser);

routes.post('/', auth, signup, UserController.createUser);
routes.patch('/:id', auth, UserController.updateUser);
routes.delete('/:id', auth, UserController.deleteUser);

module.exports = routes;
