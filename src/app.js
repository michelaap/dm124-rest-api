const express = require('express');
const app = express();

app.use(express.json());

app.use('/users', require('./routes/user'));
app.use('/token', require('./routes/auth'));
app.use('/products', require('./routes/product'));

module.exports = app;
