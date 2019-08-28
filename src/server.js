const http = require('http');
const mongoose = require('mongoose');

const server = http
  .createServer(require('./app'));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-xf5rx.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  ).then(() => {
    server.listen(process.env.PORT || 3000);
  });
