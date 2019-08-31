const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/users', require('./routes/user'));
app.use('/token', require('./routes/auth'));
app.use('/products', require('./routes/product'));
app.use('/orders', require('./routes/order'));
app.use('/deliveries', require('./routes/delivery'));

app.use(require('./middleware/not-found'));

module.exports = app;
