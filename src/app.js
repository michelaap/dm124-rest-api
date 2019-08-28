const express = require('express');
const app = express();

app.use(express.json());

app.use('/users', require('./routes/user'));

module.exports = app;
