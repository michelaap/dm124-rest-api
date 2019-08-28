const express = require('express');
const app = express();

app.use('/users', require('./routes/user'));

module.exports = app;
