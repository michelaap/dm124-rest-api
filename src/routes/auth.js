const express = require('express');
const routes = express.Router();

const AuthController = require('../controllers/Auth');

routes.post('/', AuthController.token);

module.exports = routes;
