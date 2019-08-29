const express = require('express');
const routes = express.Router();

const AuthController = require('../controllers/Auth');
const { signin } = require('../middleware/validator');

routes.post('/', signin, AuthController.token);

module.exports = routes;
