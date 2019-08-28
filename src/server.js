const http = require('http');

const server = http
  .createServer(require('./app'));

server.listen(process.env.PORT || 3000);
